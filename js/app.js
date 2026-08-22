/* ===================================================================
   Pathfinder AI - Core SPA Application Entrypoint & Router
   =================================================================== */

import { store } from './state.js';
import { renderDashboard, attachDashboardListeners } from './views/dashboard.js';
import { renderResumeCustomizer, attachResumeListeners } from './views/resume.js';
import { renderSkillGapAnalysis, attachSkillGapListeners } from './views/skillGap.js';
import { renderLearningPath, attachLearningPathListeners } from './views/learningPath.js';
import { renderJobOpportunities, attachJobListeners } from './views/jobs.js';
import { renderLandingPlatform, attachLandingListeners } from './views/landing.js';
import { initAiCopilot } from './assistant.js';

const routes = {
  '#dashboard': { render: renderDashboard, attach: attachDashboardListeners, title: 'AI Dashboard' },
  '#resume': { render: renderResumeCustomizer, attach: attachResumeListeners, title: 'Resume Customizer' },
  '#skills': { render: renderSkillGapAnalysis, attach: attachSkillGapListeners, title: 'Skill Gap Analysis' },
  '#learning': { render: renderLearningPath, attach: attachLearningPathListeners, title: 'Personalized Learning Path' },
  '#jobs': { render: renderJobOpportunities, attach: attachJobListeners, title: 'Job Opportunities' },
  '#overview': { render: renderLandingPlatform, attach: attachLandingListeners, title: 'Platform Overview' }
};

function navigate() {
  const hash = window.location.hash || '#dashboard';
  const route = routes[hash] || routes['#dashboard'];
  const viewContainer = document.getElementById('view-container');

  if (viewContainer) {
    viewContainer.innerHTML = route.render();
    route.attach();
  }

  // Update navigation active state
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  window.scrollTo(0, 0);
}

function initTheme() {
  const savedTheme = localStorage.getItem('pathfinder_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pathfinder_theme', next);
      themeBtn.innerHTML = `<span class="material-symbols-outlined">${next === 'dark' ? 'light_mode' : 'dark_mode'}</span>`;
      showToast(`Switched to ${next} theme`, 'info');
    });

    themeBtn.innerHTML = `<span class="material-symbols-outlined">${savedTheme === 'dark' ? 'light_mode' : 'dark_mode'}</span>`;
  }
}

function initSearchModal() {
  const modal = document.getElementById('search-modal');
  const trigger = document.getElementById('global-search-btn');
  const closeBtn = document.getElementById('btn-close-search');
  const input = document.getElementById('search-modal-input');
  const resultsContainer = document.getElementById('search-modal-results');

  function open() {
    if (modal) {
      modal.classList.add('open');
      if (input) {
        input.value = '';
        input.focus();
        renderResults('');
      }
    }
  }

  function close() {
    if (modal) modal.classList.remove('open');
  }

  if (trigger) trigger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open();
    }
    if (e.key === 'Escape') close();
  });

  if (input) {
    input.addEventListener('input', (e) => {
      renderResults(e.target.value.trim());
    });
  }

  function renderResults(q) {
    if (!resultsContainer) return;
    const state = store.getState();
    const query = q.toLowerCase();

    const matchedJobs = state.jobs.filter(j => j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query));
    const matchedSkills = state.skills.filter(s => s.name.toLowerCase().includes(query));
    const matchedCourses = state.learningMilestones.flatMap(m => m.courses).filter(c => c.title.toLowerCase().includes(query));

    let html = '';

    if (matchedJobs.length > 0) {
      html += `<div class="text-xs font-bold text-on-surface-variant px-3 py-1 uppercase">Jobs</div>`;
      html += matchedJobs.map(j => `
        <div class="search-result-item" onclick="window.location.hash='#jobs'; document.getElementById('search-modal').classList.remove('open');">
          <span class="material-symbols-outlined text-primary">work</span>
          <div>
            <div class="font-bold text-sm text-on-surface">${j.title}</div>
            <div class="text-xs text-on-surface-variant">${j.company} • ${j.location} (${j.matchScore}% Match)</div>
          </div>
        </div>
      `).join('');
    }

    if (matchedSkills.length > 0) {
      html += `<div class="text-xs font-bold text-on-surface-variant px-3 py-1 uppercase mt-2">Skills & Gaps</div>`;
      html += matchedSkills.map(s => `
        <div class="search-result-item" onclick="window.location.hash='#skills'; document.getElementById('search-modal').classList.remove('open');">
          <span class="material-symbols-outlined text-tertiary">analytics</span>
          <div>
            <div class="font-bold text-sm text-on-surface">${s.name}</div>
            <div class="text-xs text-on-surface-variant">Level ${s.currentLevel}% / Target ${s.targetLevel}%</div>
          </div>
        </div>
      `).join('');
    }

    if (matchedCourses.length > 0) {
      html += `<div class="text-xs font-bold text-on-surface-variant px-3 py-1 uppercase mt-2">Courses</div>`;
      html += matchedCourses.map(c => `
        <div class="search-result-item" onclick="window.location.hash='#learning'; document.getElementById('search-modal').classList.remove('open');">
          <span class="material-symbols-outlined text-secondary">school</span>
          <div>
            <div class="font-bold text-sm text-on-surface">${c.title}</div>
            <div class="text-xs text-on-surface-variant">${c.provider} • ${c.duration}</div>
          </div>
        </div>
      `).join('');
    }

    if (!html) {
      html = `<div class="p-6 text-center text-xs text-on-surface-variant">No matching results for "${q}"</div>`;
    }

    resultsContainer.innerHTML = html;
  }
}

function initNotifications() {
  const btn = document.getElementById('btn-notifications');
  if (btn) {
    btn.addEventListener('click', () => {
      showToast("🔔 2 new high-fit senior roles posted by Google & Stripe!", "ai");
    });
  }
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px]">
      ${type === 'success' ? 'check_circle' : type === 'ai' ? 'auto_awesome' : 'info'}
    </span>
    <div class="text-xs font-medium">${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initMobileMenu() {
  const btn = document.getElementById('btn-mobile-menu');
  const sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
      });
    });
  }
}

// Global Custom Event Listeners
window.addEventListener('show-toast', (e) => {
  if (e.detail) showToast(e.detail.message, e.detail.type);
});

// App Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearchModal();
  initNotifications();
  initMobileMenu();
  initAiCopilot();

  window.addEventListener('hashchange', navigate);
  store.subscribe('state:updated', () => {
    navigate();
  });

  navigate();
});
