/* ===================================================================
   Pathfinder AI - Domain Data Store
   =================================================================== */

export const INITIAL_DATA = {
  user: {
    name: "Alex Vance",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0DTR9PSpODYPJt9zPJ8qXCu_5dXoM9r4vNcRQtY4XYc8BmVXbrCIDzrQ6-YFhR1p_e943paAwggq9Ac9kJacHffLHHgsyvvo0arAHvw7CDkMsWFT3f6_OXzBZxExiA96-4nStRtkuB2bgZrljBa-3mCRf3ca1J-R4RT6r3y-M60lJpkx_vUwxHbgFFeBLTszOYk1gnZKyI8ugOHBW5VpWAuCl2P1k8F_puIwwScLirD_sJbUO-Vpl",
    email: "alex.vance@pathfinder.ai",
    currentTitle: "Product Marketing Manager",
    targetRole: "Senior Product Manager",
    horizon: "Q4 2026",
    targetCompany: "Google",
    targetLocation: "London, UK / Remote",
    targetIndustry: "Enterprise AI / SaaS",
    readinessScore: 78,
    marketDemand: "+18% YoY",
    medianSalary: "$185,000"
  },

  roles: [
    {
      id: "spm",
      title: "Senior Product Manager",
      department: "Product & Engineering",
      avgSalary: "$175k - $210k",
      demandGrowth: "+18% YoY",
      openRolesCount: 1420,
      description: "Own end-to-end product strategy, AI system design, cross-functional execution, and go-to-market scaling for flagship platforms.",
      requiredSkillsCount: 12,
      masteredSkillsCount: 9,
      readiness: 78
    },
    {
      id: "ai_lead",
      title: "AI Product Lead",
      department: "AI & Innovation",
      avgSalary: "$210k - $260k",
      demandGrowth: "+34% YoY",
      openRolesCount: 890,
      description: "Direct GenAI foundation models, agentic workflows, LLM evaluation pipelines, and strategic AI enterprise solutions.",
      requiredSkillsCount: 14,
      masteredSkillsCount: 8,
      readiness: 64
    },
    {
      id: "enterprise_arch",
      title: "Principal Solutions Architect",
      department: "Engineering & Architecture",
      avgSalary: "$220k - $280k",
      demandGrowth: "+14% YoY",
      openRolesCount: 650,
      description: "Design fault-tolerant distributed cloud topologies, data governance frameworks, and mission-critical multi-cloud integrations.",
      requiredSkillsCount: 15,
      masteredSkillsCount: 10,
      readiness: 72
    }
  ],

  skills: [
    {
      id: "sk_1",
      name: "GenAI Product Strategy",
      category: "technical",
      currentLevel: 65,
      targetLevel: 90,
      status: "critical", // critical, moderate, mastered
      impact: "High",
      gapDescription: "Need deeper understanding of LLM latency vs cost trade-offs and agentic orchestration patterns.",
      hoursToClose: 24,
      provider: "Stanford Online",
      recommendedCourseId: "c_1"
    },
    {
      id: "sk_2",
      name: "Data Analytics & SQL Modeling",
      category: "technical",
      currentLevel: 85,
      targetLevel: 85,
      status: "mastered",
      impact: "Medium",
      gapDescription: "Proficient in BigQuery, cohort retention analysis, and predictive funnels.",
      hoursToClose: 0,
      provider: "Google Cloud",
      recommendedCourseId: "c_2"
    },
    {
      id: "sk_3",
      name: "Enterprise Go-To-Market (GTM)",
      category: "strategy",
      currentLevel: 92,
      targetLevel: 90,
      status: "mastered",
      impact: "High",
      gapDescription: "Strong proven track record with $2.4M+ ARR multi-channel launches.",
      hoursToClose: 0,
      provider: "Coursera",
      recommendedCourseId: "c_3"
    },
    {
      id: "sk_4",
      name: "System Design & Cloud APIs",
      category: "technical",
      currentLevel: 55,
      targetLevel: 85,
      status: "critical",
      impact: "High",
      gapDescription: "Need architectural familiarity with microservices, event queues, and REST/gRPC latency SLAs.",
      hoursToClose: 35,
      provider: "Google Cloud Platform",
      recommendedCourseId: "c_4"
    },
    {
      id: "sk_5",
      name: "Cross-Functional Leadership",
      category: "leadership",
      currentLevel: 75,
      targetLevel: 90,
      status: "moderate",
      impact: "Medium",
      gapDescription: "Managing cross-discipline stakeholder alignment across engineering, legal, and sales leadership.",
      hoursToClose: 16,
      provider: "Harvard Executive",
      recommendedCourseId: "c_5"
    },
    {
      id: "sk_6",
      name: "A/B Experimentation & Metrics",
      category: "strategy",
      currentLevel: 70,
      targetLevel: 85,
      status: "moderate",
      impact: "Medium",
      gapDescription: "Statistical power analysis, hypothesis test design, and guardrail metric definitions.",
      hoursToClose: 18,
      provider: "Reforge",
      recommendedCourseId: "c_6"
    }
  ],

  learningMilestones: [
    {
      id: "m_1",
      title: "Phase 1: Foundation & LLM Architecture",
      timeline: "Weeks 1 - 3",
      completed: true,
      description: "Master foundational GenAI model capabilities, latency economics, and prompt evaluation architectures.",
      courses: [
        {
          id: "c_1",
          title: "Generative AI Systems & Agentic Orchestration",
          provider: "Stanford Online",
          duration: "14 hours",
          rating: 4.9,
          level: "Intermediate",
          completed: true,
          link: "#"
        },
        {
          id: "c_2",
          title: "Advanced SQL & BigQuery Analytics for Product",
          provider: "Google Cloud",
          duration: "10 hours",
          rating: 4.8,
          level: "Intermediate",
          completed: true,
          link: "#"
        }
      ]
    },
    {
      id: "m_2",
      title: "Phase 2: System Design & Technical Trade-offs",
      timeline: "Weeks 4 - 7",
      completed: false,
      description: "Deepen understanding of distributed architectures, high-throughput microservices, and API performance contracts.",
      courses: [
        {
          id: "c_4",
          title: "Technical System Design for Product Leaders",
          provider: "Google Cloud Platform",
          duration: "20 hours",
          rating: 4.95,
          level: "Advanced",
          completed: false,
          link: "#"
        },
        {
          id: "c_6",
          title: "Statistical Experimentation & Growth Loops",
          provider: "Reforge",
          duration: "12 hours",
          rating: 4.7,
          level: "Advanced",
          completed: false,
          link: "#"
        }
      ]
    },
    {
      id: "m_3",
      title: "Phase 3: Executive GTM & Board-Level Strategy",
      timeline: "Weeks 8 - 10",
      completed: false,
      description: "Sharpen C-suite presentation capabilities, pricing optimization models, and AI ethical governance frameworks.",
      courses: [
        {
          id: "c_5",
          title: "Strategic Cross-Functional Leadership",
          provider: "Harvard Business School",
          duration: "16 hours",
          rating: 4.9,
          level: "Executive",
          completed: false,
          link: "#"
        }
      ]
    }
  ],

  resume: {
    fullName: "Eleanor Vance",
    currentTitle: "Senior Product Marketing Manager",
    location: "London, UK",
    email: "evance@professional.com",
    linkedin: "linkedin.com/in/evance",
    atsScore: 82,
    targetCompany: "Google",
    targetRole: "Product Marketing Lead / Senior PM",
    summary: "Strategic Product Marketing Manager with 8+ years of experience driving go-to-market strategies for B2B SaaS platforms. Proven track record in orchestrating product launches that increase market penetration by 35% YoY. Adept at translating complex technical features into compelling business value propositions.",
    experiences: [
      {
        id: "exp_1",
        company: "TechFlow Solutions",
        role: "Lead Product Marketer",
        dates: "2020 - Present",
        bullets: [
          {
            id: "b_1",
            text: "Spearheaded the GTM strategy for 'FlowAI', resulting in $2.4M ARR within the first two quarters.",
            hasSuggestion: false
          },
          {
            id: "b_2",
            text: "Managed cross-functional teams across sales, product, and customer success to align messaging.",
            hasSuggestion: true,
            suggestedText: "Orchestrated cross-functional alignment across 45+ engineers, designers, and sales leads, cutting time-to-market by 28% and ensuring 100% messaging consistency."
          },
          {
            id: "b_3",
            text: "Conducted competitive intelligence gathering, repositioning core offerings to increase win-rate by 18%.",
            hasSuggestion: false
          }
        ]
      },
      {
        id: "exp_2",
        company: "Apex Enterprise Cloud",
        role: "Senior Growth Strategist",
        dates: "2017 - 2020",
        bullets: [
          {
            id: "b_4",
            text: "Led product-led growth initiatives boosting enterprise self-serve conversions by 42%.",
            hasSuggestion: true,
            suggestedText: "Engineered scalable PLG onboarding funnels leveraging predictive behavioral analytics, accelerating enterprise pipeline velocity by 42% ($5.1M value)."
          },
          {
            id: "b_5",
            text: "Established key customer advisory boards and quarterly product roadmap feedback loops.",
            hasSuggestion: false
          }
        ]
      }
    ],
    skills: ["GenAI Strategy", "Enterprise GTM", "Product Analytics", "System Design", "SQL Modeling", "A/B Testing", "Pricing Optimization"]
  },

  jobs: [
    {
      id: "j_1",
      title: "Senior Product Manager - AI Platform",
      company: "Google",
      location: "London, UK (Hybrid)",
      salary: "£165,000 - £195,000 + Equity",
      matchScore: 95,
      posted: "2 days ago",
      type: "Full-Time",
      description: "Join Google's Core AI Platform group to drive next-generation developer tooling, multi-modal foundation services, and scalable inference infrastructure.",
      matchedSkills: ["GenAI Strategy", "Enterprise GTM", "System Design", "SQL Modeling"],
      missingSkills: ["gRPC Infrastructure"],
      saved: true,
      applied: false,
      status: "Saved"
    },
    {
      id: "j_2",
      title: "Lead AI Product Manager",
      company: "DeepMind / Google Cloud",
      location: "London / Remote (UK)",
      salary: "£180,000 - £220,000 + Bonus",
      matchScore: 92,
      posted: "Just now",
      type: "Full-Time",
      description: "Shape the product vision for autonomous coding agents, developer interaction frameworks, and enterprise model evaluation pipelines.",
      matchedSkills: ["GenAI Strategy", "Product Analytics", "A/B Testing", "Leadership"],
      missingSkills: ["Reinforcement Learning Principles"],
      saved: false,
      applied: true,
      status: "Interview Scheduled"
    },
    {
      id: "j_3",
      title: "Product Lead - Enterprise Workspace",
      company: "Stripe",
      location: "Dublin / London (Hybrid)",
      salary: "€170,000 - €210,000",
      matchScore: 88,
      posted: "4 days ago",
      type: "Full-Time",
      description: "Own the developer experience and enterprise dashboard suites for millions of global merchant partners.",
      matchedSkills: ["Enterprise GTM", "SQL Modeling", "A/B Testing"],
      missingSkills: ["FinTech Compliance"],
      saved: false,
      applied: false,
      status: "Explore"
    },
    {
      id: "j_4",
      title: "Senior Director of Product Marketing",
      company: "Databricks",
      location: "London / Remote",
      salary: "£190,000 - £230,000",
      matchScore: 96,
      posted: "1 day ago",
      type: "Full-Time",
      description: "Lead our Lakehouse and Generative AI positioning strategy across global EMEA enterprise tier customers.",
      matchedSkills: ["Enterprise GTM", "Product Analytics", "GenAI Strategy", "Leadership"],
      missingSkills: [],
      saved: true,
      applied: false,
      status: "Saved"
    }
  ],

  aiAssistantKnowledge: [
    {
      keywords: ["resume", "rewrite", "bullet", "ats", "improve"],
      response: "I've reviewed your resume against the **Senior Product Manager** role at **Google**. Here are 3 high-impact recommendations:\n\n1. **Quantify Operational Velocity**: Your TechFlow bullets can highlight cross-functional speedup (e.g. 'reduced GTM cycle by 28%').\n2. **Incorporate AI System Keywords**: Add explicit mentions of *LLM Latency Trade-offs*, *Prompt Evaluation*, and *Multi-modal Systems*.\n3. **Elevate Scope**: Frame achievements in terms of direct P&L / ARR ownership."
    },
    {
      keywords: ["skill", "gap", "readiness", "score", "learn"],
      response: "Your current readiness is **78%** for Senior Product Manager.\n\n- **Top Mastered Strengths**: Enterprise GTM (92%), Data Modeling (85%).\n- **Critical Gaps to Bridge**: System Design & Cloud APIs (55%), GenAI Product Strategy (65%).\n- **Estimated Closure Time**: ~40 hours of focused project work over 4 weeks."
    },
    {
      keywords: ["job", "interview", "google", "prepare"],
      response: "For your upcoming **Google AI Platform** interview, anticipate questions around:\n\n- **Product Design**: 'How would you design an enterprise evaluation benchmark for multimodal reasoning?'\n- **Technical Trade-offs**: 'How do you balance model quality vs inference cost and p99 latency?'\n- **Strategic Vision**: 'Where will AI agents deliver the highest ROI in developer workflows over the next 3 years?'"
    }
  ]
};
