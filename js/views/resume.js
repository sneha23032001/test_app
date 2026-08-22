/* ===================================================================
   Pathfinder AI - Resume Customizer View Controller
   =================================================================== */

import { store } from '../state.js';

export function renderResumeCustomizer() {
  const state = store.getState();
  const resume = state.resume;

  return `
    <div class="animate-fade-in">
      <!-- Breadcrumb Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
            <span>Optimization Studio</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Resume Customizer</span>
          </div>
          <h2 class="text-2xl font-bold text-on-surface">Dual-Pane AI Resume Optimizer</h2>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-export-pdf" class="btn btn-secondary btn-sm">
            <span class="material-symbols-outlined text-[18px]">print</span>
            Print / Save PDF
          </button>
          <button id="btn-copy-markdown" class="btn btn-secondary btn-sm">
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
            Copy Clean Text
          </button>
          <button id="btn-ai-rewrite-all" class="btn btn-ai btn-sm">
            <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Transform All
          </button>
        </div>
      </div>

      <!-- Split Layout Container -->
      <div class="resume-layout">
        <!-- LEFT PANEL: Interactive A4 Document Canvas -->
        <div class="resume-left-panel">
          <!-- Document Toolbar -->
          <div class="resume-toolbar">
            <div class="toolbar-btn-group">
              <button class="icon-btn btn-sm" id="tb-bold" title="Bold">
                <span class="material-symbols-outlined text-[18px]">format_bold</span>
              </button>
              <button class="icon-btn btn-sm" id="tb-italic" title="Italic">
                <span class="material-symbols-outlined text-[18px]">format_italic</span>
              </button>
              <button class="icon-btn btn-sm" id="tb-list" title="Bullet List">
                <span class="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>
            </div>
            <div class="flex items-center gap-3">
              <span class="badge badge-success text-[11px]">
                <span class="material-symbols-outlined text-[14px]">cloud_done</span>
                Auto-saved
              </span>
            </div>
          </div>

          <!-- Document Canvas Scroll Area -->
          <div class="resume-canvas-scroll">
            <div class="resume-paper" id="resume-paper-doc">
              <!-- Header Section -->
              <div class="mb-6">
                <h1 class="resume-header-name" contenteditable="true">${resume.fullName}</h1>
                <p class="resume-header-title" contenteditable="true">${resume.currentTitle}</p>
                <div class="resume-contact-row">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">location_on</span> ${resume.location}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">mail</span> ${resume.email}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">link</span> ${resume.linkedin}</span>
                </div>
              </div>

              <!-- Professional Summary -->
              <div class="mb-6">
                <h3 class="resume-section-title">Professional Summary</h3>
                <div class="resume-ai-highlight" contenteditable="true" id="resume-summary-text">
                  <span class="material-symbols-outlined resume-ai-sparkle-tag" title="AI Enhanced Summary">auto_awesome</span>
                  ${resume.summary}
                </div>
              </div>

              <!-- Experience Section -->
              <div class="mb-6">
                <h3 class="resume-section-title">Professional Experience</h3>
                ${resume.experiences.map((exp, expIdx) => `
                  <div class="mb-5">
                    <div class="flex justify-between items-baseline">
                      <strong class="text-base text-on-surface">${exp.company}</strong>
                      <span class="text-xs text-outline font-medium">${exp.dates}</span>
                    </div>
                    <div class="text-sm font-semibold text-primary mb-2">${exp.role}</div>
                    <ul class="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                      ${exp.bullets.map((b, bIdx) => `
                        <li class="relative leading-relaxed ${b.applied ? 'text-primary font-medium bg-primary-fixed/20 p-1 rounded' : ''}" contenteditable="true" data-exp-id="${exp.id}" data-bullet-id="${b.id}">
                          ${b.text}
                          ${b.hasSuggestion ? `
                            <span class="absolute -left-6 top-1 text-tertiary cursor-pointer" title="AI optimization available">
                              <span class="material-symbols-outlined text-[16px] animate-pulse">auto_awesome</span>
                            </span>
                          ` : ''}
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>

              <!-- Core Competencies / Skills -->
              <div>
                <h3 class="resume-section-title">Key Competencies & Technologies</h3>
                <div class="flex flex-wrap gap-2 pt-1">
                  ${resume.skills.map(s => `
                    <span class="badge badge-primary text-xs">${s}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: AI Optimization Bento Sidebar -->
        <div class="resume-right-panel">
          <!-- ATS Score Gauge Widget -->
          <div class="card ats-score-meter">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-tertiary">speed</span>
                <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Target ATS Compatibility</span>
              </div>
              <p class="text-xs text-on-surface-variant">Matched against <strong>${resume.targetCompany}</strong> Senior PM job specs.</p>
            </div>
            <div class="text-right">
              <span class="ats-score-num" id="ats-score-display">${resume.atsScore}</span>
              <span class="text-xs font-bold text-on-surface-variant">/100</span>
            </div>
          </div>

          <!-- Target Alignment Configuration -->
          <div class="card">
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-outline-variant">
              <span class="material-symbols-outlined text-primary text-[20px]">target</span>
              <h4 class="font-bold text-sm text-on-surface">Target Alignment</h4>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="form-group mb-2">
                <label class="form-label">Target Employer</label>
                <input class="form-input text-xs py-1.5" id="target-company-input" value="${resume.targetCompany}" />
              </div>
              <div class="form-group mb-2">
                <label class="form-label">Target Role</label>
                <input class="form-input text-xs py-1.5" id="target-role-input" value="${resume.targetRole}" />
              </div>
            </div>
          </div>

          <!-- AI Optimization Suggestions Feed -->
          <div class="card flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-3 pb-2 border-b border-outline-variant">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-tertiary text-[20px]">auto_fix_high</span>
                <h4 class="font-bold text-sm text-on-surface">AI Suggested Enhancements</h4>
              </div>
              <span class="badge badge-ai text-[11px]">2 Optimizations</span>
            </div>

            <div class="space-y-3 overflow-y-auto flex-1 pr-1">
              ${resume.experiences.flatMap(exp => exp.bullets.filter(b => b.hasSuggestion).map(bullet => `
                <div class="ai-suggestion-box">
                  <div class="flex justify-between items-start mb-2">
                    <span class="badge badge-tertiary text-[10px]">Impact & Metric Booster</span>
                    <span class="text-[11px] font-bold text-tertiary">+7 ATS pts</span>
                  </div>

                  <div class="suggestion-diff-old">
                    <strong>Before:</strong> ${bullet.originalText || bullet.text}
                  </div>
                  <div class="suggestion-diff-new">
                    <strong>AI Enhanced:</strong> ${bullet.suggestedText}
                  </div>

                  <div class="flex justify-end gap-2 mt-3">
                    ${bullet.applied ? `
                      <button class="btn btn-secondary btn-sm text-xs py-1 px-3 btn-undo-suggestion" data-exp-id="${exp.id}" data-bullet-id="${bullet.id}">
                        <span class="material-symbols-outlined text-[14px]">undo</span>
                        Revert Original
                      </button>
                    ` : `
                      <button class="btn btn-primary btn-sm text-xs py-1 px-3 btn-apply-suggestion" data-exp-id="${exp.id}" data-bullet-id="${bullet.id}">
                        <span class="material-symbols-outlined text-[14px]">check</span>
                        Accept Suggestion
                      </button>
                    `}
                  </div>
                </div>
              `)).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachResumeListeners() {
  // Suggestion buttons
  document.querySelectorAll('.btn-apply-suggestion').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expId = btn.getAttribute('data-exp-id');
      const bulletId = btn.getAttribute('data-bullet-id');
      store.applyResumeSuggestion(expId, bulletId);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "AI resume enhancement applied! ATS Score increased.", type: "success" }
      }));
    });
  });

  document.querySelectorAll('.btn-undo-suggestion').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expId = btn.getAttribute('data-exp-id');
      const bulletId = btn.getAttribute('data-bullet-id');
      store.undoResumeSuggestion(expId, bulletId);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Reverted to original text.", type: "info" }
      }));
    });
  });

  // Export PDF
  const btnExport = document.getElementById('btn-export-pdf');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Markdown
  const btnCopy = document.getElementById('btn-copy-markdown');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const resume = store.getState().resume;
      const cleanText = `${resume.fullName}\n${resume.currentTitle} - ${resume.location}\n\nSUMMARY:\n${resume.summary}\n\nEXPERIENCE:\n` +
        resume.experiences.map(e => `${e.company} | ${e.role} (${e.dates})\n` + e.bullets.map(b => `• ${b.text}`).join('\n')).join('\n\n') +
        `\n\nSKILLS:\n` + resume.skills.join(', ');

      navigator.clipboard.writeText(cleanText).then(() => {
        window.dispatchEvent(new CustomEvent('show-toast', {
          detail: { message: "Resume formatted text copied to clipboard!", type: "success" }
        }));
      });
    });
  }

  // AI Transform All
  const btnAiAll = document.getElementById('btn-ai-rewrite-all');
  if (btnAiAll) {
    btnAiAll.addEventListener('click', () => {
      const state = store.getState();
      state.resume.experiences.forEach(exp => {
        exp.bullets.forEach(b => {
          if (b.hasSuggestion) {
            store.applyResumeSuggestion(exp.id, b.id);
          }
        });
      });
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "All AI optimizations accepted! ATS Score is now 96/100.", type: "ai" }
      }));
    });
  }
}
