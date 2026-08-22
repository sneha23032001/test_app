/* ===================================================================
   Pathfinder AI - Reactive State Manager with LocalStorage Sync
   =================================================================== */

import { INITIAL_DATA } from './data.js';

const STORAGE_KEY = 'pathfinder_ai_state_v1';

class StateStore {
  constructor() {
    this.listeners = new Map();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load stored state, using defaults', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data, this.state));
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb(event, data, this.state));
    }
    this.saveState();
  }

  // --- Mutating Actions ---

  setTargetRole(roleId) {
    const role = this.state.roles.find(r => r.id === roleId);
    if (role) {
      this.state.user.targetRole = role.title;
      this.state.user.readinessScore = role.readiness;
      this.state.user.marketDemand = role.demandGrowth;
      this.state.user.medianSalary = role.avgSalary.split(' - ')[1] || role.avgSalary;
      this.emit('role:changed', role);
      this.emit('state:updated');
    }
  }

  applyResumeSuggestion(expId, bulletId) {
    for (const exp of this.state.resume.experiences) {
      if (exp.id === expId) {
        for (const bullet of exp.bullets) {
          if (bullet.id === bulletId && bullet.suggestedText) {
            bullet.originalText = bullet.text;
            bullet.text = bullet.suggestedText;
            bullet.applied = true;
            this.state.resume.atsScore = Math.min(98, this.state.resume.atsScore + 7);
            this.emit('resume:updated', this.state.resume);
            this.emit('state:updated');
            return true;
          }
        }
      }
    }
    return false;
  }

  undoResumeSuggestion(expId, bulletId) {
    for (const exp of this.state.resume.experiences) {
      if (exp.id === expId) {
        for (const bullet of exp.bullets) {
          if (bullet.id === bulletId && bullet.originalText) {
            bullet.text = bullet.originalText;
            bullet.applied = false;
            this.state.resume.atsScore = Math.max(82, this.state.resume.atsScore - 7);
            this.emit('resume:updated', this.state.resume);
            this.emit('state:updated');
            return true;
          }
        }
      }
    }
    return false;
  }

  updateResumeSummary(newSummary) {
    this.state.resume.summary = newSummary;
    this.emit('resume:updated', this.state.resume);
    this.emit('state:updated');
  }

  toggleMilestone(milestoneId) {
    const milestone = this.state.learningMilestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.completed = !milestone.completed;
      milestone.courses.forEach(c => c.completed = milestone.completed);
      this.recalcReadiness();
      this.emit('learning:updated', this.state.learningMilestones);
      this.emit('state:updated');
    }
  }

  toggleCourse(courseId) {
    for (const milestone of this.state.learningMilestones) {
      const course = milestone.courses.find(c => c.id === courseId);
      if (course) {
        course.completed = !course.completed;
        const allCompleted = milestone.courses.every(c => c.completed);
        milestone.completed = allCompleted;
        this.recalcReadiness();
        this.emit('learning:updated', this.state.learningMilestones);
        this.emit('state:updated');
        return;
      }
    }
  }

  recalcReadiness() {
    let totalCourses = 0;
    let completedCourses = 0;
    this.state.learningMilestones.forEach(m => {
      m.courses.forEach(c => {
        totalCourses++;
        if (c.completed) completedCourses++;
      });
    });

    const completionRate = totalCourses > 0 ? (completedCourses / totalCourses) : 0;
    const baseReadiness = 72;
    this.state.user.readinessScore = Math.min(99, Math.round(baseReadiness + (completionRate * 24)));
  }

  toggleSaveJob(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job) {
      job.saved = !job.saved;
      this.emit('jobs:updated', this.state.jobs);
      this.emit('state:updated');
    }
  }

  applyToJob(jobId) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (job) {
      job.applied = true;
      job.status = 'Applied';
      this.emit('jobs:updated', this.state.jobs);
      this.emit('state:updated');
    }
  }

  setWeeklyStudyHours(hours) {
    this.state.weeklyStudyHours = hours;
    this.emit('skillGap:updated');
  }

  resetToDefaults() {
    this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveState();
    this.emit('state:updated');
    this.emit('state:reset');
  }
}

export const store = new StateStore();
