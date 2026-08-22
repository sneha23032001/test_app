/* ===================================================================
   Pathfinder AI - Skill Gap Analysis View Controller
   =================================================================== */

import { store } from '../state.js';

let activeCategory = 'all';
let weeklyHours = 10;

export function renderSkillGapAnalysis() {
  const state = store.getState();
  const skills = state.skills;

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const totalGapHours = skills.reduce((acc, s) => acc + s.hoursToClose, 0);
  const weeksToClose = Math.ceil(totalGapHours / weeklyHours);

  return `
    <div class="animate-fade-in">
      <!-- Breadcrumb Header -->
      <div class="skill-gap-header">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
            <span>Analysis</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Senior Product Manager Gap Analysis</span>
          </div>
          <h2 class="text-2xl font-bold text-on-surface">Target Role Competency Matrix</h2>
        </div>

        <div class="skill-category-tabs">
          <button class="tab-btn ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">All Skills (${skills.length})</button>
          <button class="tab-btn ${activeCategory === 'technical' ? 'active' : ''}" data-cat="technical">Technical</button>
          <button class="tab-btn ${activeCategory === 'strategy' ? 'active' : ''}" data-cat="strategy">Strategy</button>
          <button class="tab-btn ${activeCategory === 'leadership' ? 'active' : ''}" data-cat="leadership">Leadership</button>
        </div>
      </div>

      <!-- Skill Gap Bento Grid -->
      <div class="gap-cards-grid">
        ${filteredSkills.map(skill => {
          let statusBadge = '';
          if (skill.status === 'critical') statusBadge = '<span class="badge badge-danger">Critical Gap</span>';
          else if (skill.status === 'moderate') statusBadge = '<span class="badge badge-warning">Moderate Gap</span>';
          else statusBadge = '<span class="badge badge-success">Mastered (100%)</span>';

          return `
            <div class="gap-card ${skill.status}">
              <div class="flex justify-between items-start">
                <span class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">${skill.category}</span>
                ${statusBadge}
              </div>

              <div>
                <h4 class="font-bold text-base text-on-surface">${skill.name}</h4>
                <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">${skill.gapDescription}</p>
              </div>

              <!-- Level Comparison -->
              <div class="space-y-1 mt-2">
                <div class="skill-level-comparison">
                  <span>Current: <strong>${skill.currentLevel}%</strong></span>
                  <span>Target: <strong>${skill.targetLevel}%</strong></span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill ${skill.status === 'mastered' ? 'progress-secondary' : 'progress-primary'}" style="width: ${skill.currentLevel}%"></div>
                </div>
              </div>

              <div class="mt-auto pt-3 border-t border-outline-variant flex justify-between items-center text-xs">
                <span class="text-on-surface-variant font-medium">
                  <span class="material-symbols-outlined text-[15px] align-middle">schedule</span>
                  ${skill.hoursToClose > 0 ? `${skill.hoursToClose} hrs to close` : 'Fully Validated'}
                </span>
                ${skill.hoursToClose > 0 ? `
                  <button class="btn btn-secondary btn-sm text-xs py-1 px-2.5 btn-bridge-gap" data-skill-id="${skill.id}" data-course-id="${skill.recommendedCourseId}">
                    Bridge Gap
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                ` : `
                  <span class="text-secondary font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    Proficient
                  </span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Interactive Gap Closure Timeline Simulator -->
      <div class="timeline-calc-card">
        <div class="flex justify-between items-start flex-wrap gap-4 mb-3">
          <div>
            <span class="badge badge-ai mb-2">Predictive AI Engine</span>
            <h3 class="text-lg font-bold text-on-surface">Dynamic Gap Closure Timeline Simulator</h3>
            <p class="text-xs text-on-surface-variant">Adjust your weekly commitment to calculate your projected target role interview readiness date.</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-black text-tertiary">${weeksToClose} Weeks</div>
            <span class="text-xs font-semibold text-on-surface-variant">Estimated to reach 95%+ Readiness</span>
          </div>
        </div>

        <div class="slider-container">
          <span class="text-xs font-bold text-on-surface">5 hrs/wk</span>
          <input type="range" min="5" max="30" step="1" value="${weeklyHours}" class="calc-slider" id="hours-slider">
          <span class="text-xs font-bold text-on-surface">30 hrs/wk</span>
        </div>

        <div class="flex justify-between items-center text-xs pt-3 border-t border-outline-variant/60 flex-wrap gap-2">
          <span>Current Commitment: <strong class="text-primary font-bold" id="hours-display">${weeklyHours} hours/week</strong></span>
          <span>Projected Readiness Date: <strong class="text-secondary font-bold">${calculateProjectedDate(weeksToClose)}</strong></span>
          <button class="btn btn-ai btn-sm" id="btn-sync-learning-path">
            <span class="material-symbols-outlined text-[16px]">auto_stories</span>
            Generate Tailored Roadmap
          </button>
        </div>
      </div>
    </div>
  `;
}

function calculateProjectedDate(weeks) {
  const d = new Date();
  d.setDate(d.getDate() + (weeks * 7));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function attachSkillGapListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat');
      const viewContainer = document.getElementById('view-container');
      if (viewContainer) {
        viewContainer.innerHTML = renderSkillGapAnalysis();
        attachSkillGapListeners();
      }
    });
  });

  const slider = document.getElementById('hours-slider');
  const hoursDisplay = document.getElementById('hours-display');
  if (slider) {
    slider.addEventListener('input', (e) => {
      weeklyHours = parseInt(e.target.value, 10);
      if (hoursDisplay) hoursDisplay.innerText = `${weeklyHours} hours/week`;
      store.setWeeklyStudyHours(weeklyHours);
    });
  }

  document.querySelectorAll('.btn-bridge-gap').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#learning';
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Opened targeted curriculum for this competency!", type: "info" }
      }));
    });
  });

  const btnSyncLearning = document.getElementById('btn-sync-learning-path');
  if (btnSyncLearning) {
    btnSyncLearning.addEventListener('click', () => {
      window.location.hash = '#learning';
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Synced custom timeline with your Learning Path!", type: "ai" }
      }));
    });
  }
}
