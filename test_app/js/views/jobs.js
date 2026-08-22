/* ===================================================================
   Pathfinder AI - Job Opportunities View Controller
   =================================================================== */

import { store } from '../state.js';

let searchQuery = '';
let filterMatch = 'all';

export function renderJobOpportunities() {
  const state = store.getState();
  const jobs = state.jobs;

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = filterMatch === 'all' || 
                         (filterMatch === '90' && j.matchScore >= 90) || 
                         (filterMatch === 'saved' && j.saved);
    return matchesSearch && matchesScore;
  });

  return `
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
            <span>Market Navigator</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Job Opportunities</span>
          </div>
          <h2 class="text-2xl font-bold text-on-surface">AI-Ranked Career Opportunities</h2>
        </div>

        <div class="flex items-center gap-2">
          <span class="badge badge-secondary text-xs">
            <span class="material-symbols-outlined text-[14px]">radar</span>
            4 Active Matches
          </span>
        </div>
      </div>

      <!-- Filter / Search Bar -->
      <div class="jobs-filter-bar">
        <div class="flex items-center bg-surface px-3 py-2 rounded-lg border border-outline-variant flex-1 min-w-[240px]">
          <span class="material-symbols-outlined text-outline mr-2 text-[18px]">search</span>
          <input id="job-search-input" class="bg-transparent border-none outline-none text-xs w-full text-on-surface" placeholder="Search roles or companies..." value="${searchQuery}" />
        </div>

        <div class="flex items-center gap-2 text-xs">
          <button class="btn ${filterMatch === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm job-filter-btn" data-filter="all">All Roles</button>
          <button class="btn ${filterMatch === '90' ? 'btn-primary' : 'btn-secondary'} btn-sm job-filter-btn" data-filter="90">90%+ High Match</button>
          <button class="btn ${filterMatch === 'saved' ? 'btn-primary' : 'btn-secondary'} btn-sm job-filter-btn" data-filter="saved">Saved (${jobs.filter(j => j.saved).length})</button>
        </div>
      </div>

      <!-- Jobs Grid -->
      <div class="jobs-grid">
        ${filteredJobs.map(job => `
          <div class="job-card" data-job-id="${job.id}">
            <div class="job-match-badge">
              ${job.matchScore}% Match
            </div>

            <div class="job-card-company">
              <div class="company-logo-box">
                ${job.company.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 class="font-bold text-base text-on-surface">${job.title}</h3>
                <p class="text-xs text-primary font-semibold">${job.company} • ${job.location}</p>
              </div>
            </div>

            <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
              ${job.description}
            </p>

            <div class="flex items-center justify-between text-xs py-2 border-y border-outline-variant">
              <span class="font-bold text-on-surface">${job.salary}</span>
              <span class="text-outline font-medium">${job.posted}</span>
            </div>

            <!-- Matched Skills Chips -->
            <div>
              <div class="text-[11px] font-semibold text-on-surface-variant mb-1">Aligned Core Competencies:</div>
              <div class="flex flex-wrap gap-1">
                ${job.matchedSkills.map(s => `
                  <span class="badge badge-success text-[10px]">${s}</span>
                `).join('')}
                ${job.missingSkills.map(s => `
                  <span class="badge badge-warning text-[10px]">+ ${s} needed</span>
                `).join('')}
              </div>
            </div>

            <div class="flex justify-between items-center gap-2 pt-2 mt-auto">
              <button class="icon-btn btn-toggle-save-job" data-job-id="${job.id}" title="${job.saved ? 'Unsave Job' : 'Save Job'}">
                <span class="material-symbols-outlined text-[20px] ${job.saved ? 'fill-1 text-primary' : ''}">bookmark</span>
              </button>

              <button class="btn btn-secondary btn-sm text-xs btn-tailor-resume" data-company="${job.company}" data-role="${job.title}">
                <span class="material-symbols-outlined text-[15px]">edit_document</span>
                Tailor Resume
              </button>

              <button class="btn ${job.applied ? 'btn-secondary' : 'btn-primary'} btn-sm text-xs btn-apply-job" data-job-id="${job.id}">
                <span class="material-symbols-outlined text-[15px]">${job.applied ? 'check' : 'send'}</span>
                ${job.applied ? 'Applied' : '1-Click Apply'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachJobListeners() {
  const searchInput = document.getElementById('job-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      const viewContainer = document.getElementById('view-container');
      if (viewContainer) {
        viewContainer.innerHTML = renderJobOpportunities();
        attachJobListeners();
      }
    });
  }

  document.querySelectorAll('.job-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterMatch = btn.getAttribute('data-filter');
      const viewContainer = document.getElementById('view-container');
      if (viewContainer) {
        viewContainer.innerHTML = renderJobOpportunities();
        attachJobListeners();
      }
    });
  });

  document.querySelectorAll('.btn-toggle-save-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.getAttribute('data-job-id');
      store.toggleSaveJob(jobId);
    });
  });

  document.querySelectorAll('.btn-apply-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.getAttribute('data-job-id');
      store.applyToJob(jobId);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Application submitted with your tailored profile & ATS score!", type: "success" }
      }));
    });
  });

  document.querySelectorAll('.btn-tailor-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const company = btn.getAttribute('data-company');
      const role = btn.getAttribute('data-role');
      const state = store.getState();
      state.resume.targetCompany = company;
      state.resume.targetRole = role;
      window.location.hash = '#resume';
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: `Loaded ${company} targeting parameters into Resume Customizer!`, type: "ai" }
      }));
    });
  });
}
