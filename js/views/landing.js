/* ===================================================================
   Pathfinder AI - Platform Overview & Tour View Controller
   =================================================================== */

export function renderLandingPlatform() {
  return `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <div class="landing-hero">
        <span class="badge badge-ai landing-hero-badge">
          <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
          Next-Gen AI Career Orchestration
        </span>
        <h1 class="landing-hero-title">
          Navigate your path to <span>Tier-1 Tech Leadership</span> with AI precision.
        </h1>
        <p class="text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Pathfinder AI analyzes your professional trajectory, maps live competency gaps against Fortune 500 job specs, and crafts custom learning paths to maximize compensation and title acceleration.
        </p>

        <div class="flex justify-center gap-4 mt-8">
          <button class="btn btn-ai btn-lg" onclick="window.location.hash = '#dashboard'">
            <span class="material-symbols-outlined text-[20px]">explore</span>
            Enter Interactive Dashboard
          </button>
          <button class="btn btn-secondary btn-lg" onclick="window.location.hash = '#resume'">
            <span class="material-symbols-outlined text-[20px]">edit_document</span>
            Test Resume Optimizer
          </button>
        </div>
      </div>

      <!-- Feature Bento Grid -->
      <div class="landing-features-grid">
        <div class="feature-bento-card">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[26px]">analytics</span>
          </div>
          <h3 class="font-bold text-lg text-on-surface">Precision Gap Radar</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Instantly diagnose technical, strategic, and leadership competency deficits against live market hiring bars.
          </p>
          <a href="#skills" class="text-xs font-bold text-primary flex items-center gap-1 mt-auto">
            Explore Skill Matrix <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        <div class="feature-bento-card">
          <div class="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span class="material-symbols-outlined text-[26px]">auto_fix_high</span>
          </div>
          <h3 class="font-bold text-lg text-on-surface">Dual-Pane AI Resume Optimizer</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Real-time ATS scoring, keyword alignment injection, and executive bullet-point metric quantification.
          </p>
          <a href="#resume" class="text-xs font-bold text-tertiary flex items-center gap-1 mt-auto">
            Optimize Resume <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        <div class="feature-bento-card">
          <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[26px]">school</span>
          </div>
          <h3 class="font-bold text-lg text-on-surface">Personalized Learning Roadmap</h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Curated week-by-week tracks from Stanford, Google Cloud, and Harvard with interactive competency validation.
          </p>
          <a href="#learning" class="text-xs font-bold text-secondary flex items-center gap-1 mt-auto">
            View Curriculum <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function attachLandingListeners() {
  // Simple interactive links handled via hashes
}
