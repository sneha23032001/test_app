/* ===================================================================
   Pathfinder AI - Personalized Learning Path View Controller
   =================================================================== */

import { store } from '../state.js';

export function renderLearningPath() {
  const state = store.getState();
  const milestones = state.learningMilestones;

  let totalModules = 0;
  let completedModules = 0;
  milestones.forEach(m => {
    m.courses.forEach(c => {
      totalModules++;
      if (c.completed) completedModules++;
    });
  });
  const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return `
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-1">
            <span>Development Plan</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-primary font-bold">Personalized Learning Path</span>
          </div>
          <h2 class="text-2xl font-bold text-on-surface">AI-Tailored Skill Acquisition Curriculum</h2>
        </div>

        <div class="flex items-center gap-3">
          <button id="btn-take-quiz" class="btn btn-ai btn-sm">
            <span class="material-symbols-outlined text-[18px]">quiz</span>
            Take Skill Validation Quiz
          </button>
        </div>
      </div>

      <!-- Curriculum Progress Card -->
      <div class="card mb-6 bg-gradient-to-r from-surface-container to-surface-container-high border-outline-variant">
        <div class="flex justify-between items-center mb-3">
          <div>
            <h3 class="font-bold text-base text-on-surface">Curriculum Completion Progress</h3>
            <p class="text-xs text-on-surface-variant">${completedModules} of ${totalModules} high-impact modules mastered</p>
          </div>
          <div class="text-2xl font-black text-primary">${progressPercent}%</div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill progress-primary" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <!-- Milestone Timeline -->
      <div class="learning-timeline">
        ${milestones.map((milestone, idx) => `
          <div class="timeline-milestone">
            <!-- Bullet -->
            <div class="milestone-bullet ${milestone.completed ? 'completed' : ''}">
              <span class="material-symbols-outlined text-[16px]">${milestone.completed ? 'check' : `${idx + 1}`}</span>
            </div>

            <!-- Milestone Card -->
            <div class="card p-5">
              <div class="flex justify-between items-start flex-wrap gap-2 mb-2">
                <div>
                  <span class="badge ${milestone.completed ? 'badge-success' : 'badge-primary'} text-[11px] mb-1">${milestone.timeline}</span>
                  <h3 class="font-bold text-lg text-on-surface">${milestone.title}</h3>
                  <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">${milestone.description}</p>
                </div>
                <button class="btn btn-secondary btn-sm text-xs btn-toggle-milestone" data-milestone-id="${milestone.id}">
                  <span class="material-symbols-outlined text-[16px]">${milestone.completed ? 'undo' : 'check_circle'}</span>
                  ${milestone.completed ? 'Mark Incomplete' : 'Mark Milestone Complete'}
                </button>
              </div>

              <!-- Nested Course Cards -->
              <div class="course-modules-grid">
                ${milestone.courses.map(course => `
                  <div class="course-card ${course.completed ? 'bg-surface-container-low/60 border-success/40' : ''}">
                    <div class="flex justify-between items-start">
                      <span class="course-provider-tag text-primary">${course.provider}</span>
                      <span class="badge ${course.completed ? 'badge-success' : 'badge-secondary'} text-[10px]">
                        ${course.completed ? 'Completed' : course.level}
                      </span>
                    </div>

                    <div>
                      <h4 class="font-bold text-sm text-on-surface">${course.title}</h4>
                      <div class="flex items-center gap-3 text-xs text-on-surface-variant mt-2">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">schedule</span> ${course.duration}</span>
                        <span class="flex items-center gap-1 text-warning font-semibold"><span class="material-symbols-outlined text-[15px] fill-1">star</span> ${course.rating}</span>
                      </div>
                    </div>

                    <div class="mt-auto pt-3 border-t border-outline-variant flex justify-between items-center">
                      <button class="btn ${course.completed ? 'btn-secondary' : 'btn-primary'} btn-sm text-xs w-full btn-toggle-course" data-course-id="${course.id}">
                        <span class="material-symbols-outlined text-[14px]">${course.completed ? 'check' : 'play_arrow'}</span>
                        ${course.completed ? 'Module Mastered' : 'Launch Module'}
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Skill Assessment Modal Container (Hidden by default) -->
      <div id="quiz-modal" class="modal-overlay">
        <div class="modal-container p-6">
          <div class="flex justify-between items-center pb-3 border-b border-outline-variant">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary">psychology</span>
              <h3 class="font-bold text-base text-on-surface">GenAI Product Architecture Assessment</h3>
            </div>
            <button id="btn-close-quiz" class="icon-btn btn-sm">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="py-4 space-y-4 text-sm text-on-surface">
            <p class="font-semibold">Question 1 of 3:</p>
            <p class="text-on-surface-variant">When designing an LLM product pipeline with real-time user latency SLA under 600ms, which architectural strategy yields the optimal cost-to-speed ratio?</p>
            
            <div class="space-y-2">
              <label class="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container cursor-pointer">
                <input type="radio" name="quiz_opt" value="1" />
                <span>Speculative decoding with a compact quantized draft model and semantic caching</span>
              </label>
              <label class="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container cursor-pointer">
                <input type="radio" name="quiz_opt" value="2" />
                <span>Synchronous monolithic chain querying with full context retry</span>
              </label>
              <label class="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container cursor-pointer">
                <input type="radio" name="quiz_opt" value="3" />
                <span>Client-side raw embedding clustering without backend vector indexing</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-outline-variant">
            <button id="btn-submit-quiz" class="btn btn-ai btn-sm">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              Submit Answer & Validate Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachLearningPathListeners() {
  document.querySelectorAll('.btn-toggle-milestone').forEach(btn => {
    btn.addEventListener('click', () => {
      const milestoneId = btn.getAttribute('data-milestone-id');
      store.toggleMilestone(milestoneId);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Milestone status updated and readiness recalculated!", type: "success" }
      }));
    });
  });

  document.querySelectorAll('.btn-toggle-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-course-id');
      store.toggleCourse(courseId);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Module progress saved!", type: "info" }
      }));
    });
  });

  // Quiz Modal
  const quizModal = document.getElementById('quiz-modal');
  const btnTakeQuiz = document.getElementById('btn-take-quiz');
  const btnCloseQuiz = document.getElementById('btn-close-quiz');
  const btnSubmitQuiz = document.getElementById('btn-submit-quiz');

  if (btnTakeQuiz && quizModal) {
    btnTakeQuiz.addEventListener('click', () => {
      quizModal.classList.add('open');
    });
  }

  if (btnCloseQuiz && quizModal) {
    btnCloseQuiz.addEventListener('click', () => {
      quizModal.classList.remove('open');
    });
  }

  if (btnSubmitQuiz && quizModal) {
    btnSubmitQuiz.addEventListener('click', () => {
      quizModal.classList.remove('open');
      store.recalcReadiness();
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "🎉 Correct! Speculative decoding verified. Skill score increased!", type: "success" }
      }));
    });
  }
}
