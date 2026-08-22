/* ===================================================================
   Pathfinder AI - AI Career Copilot Assistant Controller
   =================================================================== */

import { INITIAL_DATA } from './data.js';
import { store } from './state.js';

let conversation = [
  {
    sender: 'ai',
    text: "Hello Alex! I am your **Pathfinder AI Career Copilot**. I've analyzed your background against the **Senior Product Manager** bar at Google. How can I accelerate your trajectory today?"
  }
];

export function initAiCopilot() {
  const drawer = document.getElementById('ai-copilot-drawer');
  const backdrop = document.getElementById('copilot-backdrop');
  const closeBtn = document.getElementById('btn-close-copilot');
  const sendBtn = document.getElementById('btn-send-copilot');
  const input = document.getElementById('copilot-input');
  const body = document.getElementById('copilot-chat-body');

  function openDrawer(initialPrompt = null) {
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      renderMessages();
      if (initialPrompt) {
        handleUserMessage(initialPrompt);
      }
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('open-ai-copilot', (e) => {
    openDrawer(e.detail ? e.detail.prompt : null);
  });

  // Global AI triggers
  document.querySelectorAll('.btn-trigger-copilot').forEach(btn => {
    btn.addEventListener('click', () => openDrawer());
  });

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (text) {
        input.value = '';
        handleUserMessage(text);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = input.value.trim();
        if (text) {
          input.value = '';
          handleUserMessage(text);
        }
      }
    });
  }

  // Quick prompt chips
  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleUserMessage(prompt);
    });
  });

  function renderMessages() {
    if (!body) return;
    body.innerHTML = conversation.map(msg => `
      <div class="chat-message ${msg.sender}">
        <div class="chat-bubble">
          ${formatMarkdown(msg.text)}
        </div>
      </div>
    `).join('') + `
      <div class="copilot-prompt-chips">
        <button class="prompt-chip" data-prompt="How do I get an ATS score above 95?">⚡ Boost ATS to 95+</button>
        <button class="prompt-chip" data-prompt="What are my top 2 critical skill gaps?">🎯 Top Skill Gaps</button>
        <button class="prompt-chip" data-prompt="Give me 3 Google SPM interview questions">💡 Mock Interview Prep</button>
      </div>
    `;

    // Re-bind dynamic chips
    body.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) handleUserMessage(prompt);
      });
    });

    body.scrollTop = body.scrollHeight;
  }

  function handleUserMessage(userText) {
    conversation.push({ sender: 'user', text: userText });
    renderMessages();

    // Show typing placeholder
    setTimeout(() => {
      const response = generateAiResponse(userText);
      conversation.push({ sender: 'ai', text: response });
      renderMessages();
    }, 500);
  }

  function generateAiResponse(text) {
    const lower = text.toLowerCase();
    for (const kb of INITIAL_DATA.aiAssistantKnowledge) {
      if (kb.keywords.some(k => lower.includes(k))) {
        return kb.response;
      }
    }
    return `Based on your profile as **${store.getState().user.currentTitle}**, focusing on **${store.getState().user.targetRole}** readiness:\n\n1. I recommend validating your **System Design & Cloud APIs** competency in the Learning Path.\n2. Apply the AI bullet optimizations in your Resume Customizer to raise your match score to 96%.\n3. Check the **95% Matched Google AI Platform** listing in the Jobs tab.`;
  }

  function formatMarkdown(md) {
    return md
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
      .replace(/•/g, '&bull;');
  }

  renderMessages();
}
