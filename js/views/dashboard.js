/* ===================================================================
   Pathfinder AI - AI Dashboard View Controller
   =================================================================== */

import { store } from '../state.js';

export function renderDashboard() {
  const state = store.getState();
  const user = state.user;
  const roles = state.roles;
  const currentRoleObj = roles.find(r => r.title === user.targetRole) || roles[0];

  return `
    <div class="animate-fade-in">
      <!-- Welcome Hero Header -->
      <div class="dashboard-hero">
        <div>
          <h2 class="dashboard-hero-title">Welcome back, ${user.name.split(' ')[0]}.</h2>
          <p class="dashboard-hero-subtitle">Here is your strategic career orchestration summary for today.</p>
        </div>
        <div class="flex gap-3">
          <button id="btn-refresh-insights" class="btn btn-secondary btn-sm">
            <span class="material-symbols-outlined text-[18px]">sync</span>
            Sync Real-time Signals
          </button>
          <button id="btn-open-assistant-hero" class="btn btn-ai btn-sm">
            <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Copilot Audit
          </button>
        </div>
      </div>

      <!-- Top Bento Grid -->
      <div class="dashboard-grid">
        <!-- Circular Readiness Card -->
        <div class="card readiness-card">
          <div class="flex justify-between items-center w-full mb-2">
            <h3 class="font-bold text-lg text-left">Career Readiness</h3>
            <span class="badge badge-ai">AI Evaluated</span>
          </div>

          <div class="readiness-gauge-wrapper">
            <svg class="circular-chart" viewBox="0 0 36 36">
              <path class="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle-progress"
                id="dashboard-gauge-circle"
                stroke-dasharray="${user.readinessScore}, 100"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="readiness-gauge-content">
              <span class="readiness-score-value" id="dashboard-gauge-val">${user.readinessScore}%</span>
              <span class="readiness-score-label">OPTIMIZED</span>
            </div>
          </div>

          <p class="text-sm text-center text-on-surface-variant px-4">
            You are strongly aligned with <strong>${user.targetRole}</strong> requirements.
            <span class="text-success font-semibold">+3% progress</span> achieved this week.
          </p>

          <div class="w-full mt-6 pt-4 border-t border-outline-variant flex justify-around text-center">
            <div>
              <div class="text-xs text-on-surface-variant font-medium">Core Skills</div>
              <div class="font-bold text-primary text-base">${currentRoleObj.masteredSkillsCount}/${currentRoleObj.requiredSkillsCount}</div>
            </div>
            <div class="h-8 w-px bg-outline-variant"></div>
            <div>
              <div class="text-xs text-on-surface-variant font-medium">ATS Resume</div>
              <div class="font-bold text-tertiary text-base">${state.resume.atsScore}/100</div>
            </div>
            <div class="h-8 w-px bg-outline-variant"></div>
            <div>
              <div class="text-xs text-on-surface-variant font-medium">Job Matches</div>
              <div class="font-bold text-secondary text-base">14 High Fit</div>
            </div>
          </div>
        </div>

        <!-- Right Side Bento Tiles -->
        <div class="dashboard-subgrid">
          <!-- Target Role Tracker -->
          <div class="card card-ai-accent">
            <div class="target-role-header">
              <span class="badge badge-primary">Active Target</span>
              <select id="role-switcher-select" class="form-select text-xs py-1 px-2 w-auto bg-surface">
                ${roles.map(r => `
                  <option value="${r.id}" ${r.title === user.targetRole ? 'selected' : ''}>
                    ${r.title}
                  </option>
                `).join('')}
              </select>
            </div>
            <h4 class="role-title-large">${currentRoleObj.title}</h4>
            <p class="text-xs text-on-surface-variant mt-1">${currentRoleObj.description}</p>
            
            <div class="role-meta-list mt-4">
              <div class="role-meta-item">
                <span class="material-symbols-outlined text-[18px] text-primary">payments</span>
                <span>Compensation Range: <strong>${currentRoleObj.avgSalary}</strong></span>
              </div>
              <div class="role-meta-item">
                <span class="material-symbols-outlined text-[18px] text-secondary">trending_up</span>
                <span>Hiring Velocity: <strong>${currentRoleObj.demandGrowth}</strong></span>
              </div>
              <div class="role-meta-item">
                <span class="material-symbols-outlined text-[18px] text-tertiary">flag</span>
                <span>Target Horizon: <strong>${user.horizon} (${user.targetCompany})</strong></span>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
              <span class="text-xs font-semibold text-on-surface-variant">Competency Match</span>
              <span class="text-xs font-bold text-primary">${currentRoleObj.readiness}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill progress-primary" style="width: ${currentRoleObj.readiness}%"></div>
            </div>
          </div>

          <!-- Market Demand & Hiring Signals -->
          <div class="card">
            <div class="flex justify-between items-start mb-3">
              <h4 class="font-bold text-base text-on-surface">Market Intelligence</h4>
              <span class="badge badge-secondary">Live Pulse</span>
            </div>
            <p class="text-xs text-on-surface-variant">Real-time talent supply & demand signals aggregated across top tech ecosystems.</p>

            <div class="mt-4 space-y-3">
              <div class="flex justify-between items-center p-2 rounded-lg bg-surface-container-low">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[20px]">corporate_fare</span>
                  <span class="text-xs font-semibold">Tier-1 Open Roles</span>
                </div>
                <span class="text-xs font-bold text-on-surface">${currentRoleObj.openRolesCount} positions</span>
              </div>

              <div class="flex justify-between items-center p-2 rounded-lg bg-surface-container-low">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-tertiary text-[20px]">psychology</span>
                  <span class="text-xs font-semibold">Highest Surge Skill</span>
                </div>
                <span class="text-xs font-bold text-tertiary">GenAI Systems (+48%)</span>
              </div>

              <div class="flex justify-between items-center p-2 rounded-lg bg-surface-container-low">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                  <span class="text-xs font-semibold">Interview Pass Rate</span>
                </div>
                <span class="text-xs font-bold text-primary">74.2% Estimated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Items & Strategic Next Steps -->
      <div class="card mb-8">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="font-bold text-lg text-on-surface">Recommended Strategic Actions</h3>
            <p class="text-xs text-on-surface-variant">High-impact tasks curated by Pathfinder AI to elevate your candidacy score.</p>
          </div>
          <span class="badge badge-ai">3 Active Tasks</span>
        </div>

        <div class="action-feed-list">
          <div class="action-feed-item card-interactive" onclick="window.location.hash = '#resume'">
            <div class="action-item-left">
              <div class="action-icon-pill ai">
                <span class="material-symbols-outlined">edit_document</span>
              </div>
              <div>
                <h5 class="font-bold text-sm text-on-surface">Accept 2 AI Resume Enhancements for Google</h5>
                <p class="text-xs text-on-surface-variant">Boost ATS alignment score from 82 to 96 by quantifying PLG velocity.</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm">
              Review Diff
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div class="action-feed-item card-interactive" onclick="window.location.hash = '#skills'">
            <div class="action-item-left">
              <div class="action-icon-pill">
                <span class="material-symbols-outlined">analytics</span>
              </div>
              <div>
                <h5 class="font-bold text-sm text-on-surface">Bridge Critical Gap: System Design & Cloud APIs</h5>
                <p class="text-xs text-on-surface-variant">Recommended 4-week module with Google Cloud architecture certification.</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm">
              View Gap Analysis
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div class="action-feed-item card-interactive" onclick="window.location.hash = '#jobs'">
            <div class="action-item-left">
              <div class="action-icon-pill" style="background-color: var(--color-secondary-container); color: var(--color-on-secondary-container)">
                <span class="material-symbols-outlined">work</span>
              </div>
              <div>
                <h5 class="font-bold text-sm text-on-surface">1-Click Apply to 95% Match Senior PM at Google</h5>
                <p class="text-xs text-on-surface-variant">Customized resume & cover highlights ready for London Core AI Team.</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm">
              Inspect Opportunity
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachDashboardListeners() {
  const roleSelect = document.getElementById('role-switcher-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      store.setTargetRole(e.target.value);
    });
  }

  const btnRefresh = document.getElementById('btn-refresh-insights');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      btnRefresh.disabled = true;
      btnRefresh.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">sync</span> Syncing...`;
      setTimeout(() => {
        store.recalcReadiness();
        btnRefresh.disabled = false;
        btnRefresh.innerHTML = `<span class="material-symbols-outlined text-[18px]">check</span> Synced!`;
        setTimeout(() => {
          btnRefresh.innerHTML = `<span class="material-symbols-outlined text-[18px]">sync</span> Sync Real-time Signals`;
        }, 1500);
      }, 600);
    });
  }

  const btnAssistantHero = document.getElementById('btn-open-assistant-hero');
  if (btnAssistantHero) {
    btnAssistantHero.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-ai-copilot', {
        detail: { prompt: "Analyze my overall career trajectory for the Senior Product Manager role at Google and give me a 3-step action plan." }
      }));
    });
  }
}
