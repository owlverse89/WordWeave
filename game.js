'use strict';

// ── State ──────────────────────────────────────────────────────────────────
let words = [];
let state = {
  bridge: 'sun',
  chain: [],
  usedWords: new Set(),
  hintsLeft: 2,
  timerSec: 20,
  timerMax: 20,
  timerInterval: null,
  bestScore: 0,
  running: false,
};

// ── Timer config by chain length ───────────────────────────────────────────
function getTimerForLength(len) {
  if (len < 5)  return 20;
  if (len < 10) return 15;
  if (len < 15) return 12;
  return 10;
}

function getDifficultyLabel(len) {
  if (len < 5)  return { text: 'Easy',   cls: 'diff-easy' };
  if (len < 10) return { text: 'Medium', cls: 'diff-medium' };
  if (len < 15) return { text: 'Hard',   cls: 'diff-hard' };
  return             { text: 'Expert', cls: 'diff-expert' };
}

// ── Badges ─────────────────────────────────────────────────────────────────
function getBadge(score) {
  if (score >= 20) return { icon: '👑', name: 'Weave Legend' };
  if (score >= 15) return { icon: '🌟', name: 'Chain Wizard' };
  if (score >= 10) return { icon: '🎯', name: 'Thread Master' };
  if (score >= 6)  return { icon: '🧵', name: 'Word Weaver' };
  if (score >= 3)  return { icon: '🔗', name: 'Link Maker' };
  return                  { icon: '🪢', name: 'Tangled Beginner' };
}

// ── DOM refs ───────────────────────────────────────────────────────────────
const screens = {
  home: document.getElementById('screen-home'),
  game: document.getElementById('screen-game'),
  end:  document.getElementById('screen-end'),
};
const el = {
  bridgeWord:    document.getElementById('bridge-word'),
  wordInput:     document.getElementById('word-input'),
  submitBtn:     document.getElementById('submit-btn'),
  feedback:      document.getElementById('feedback-msg'),
  chainTrail:    document.getElementById('chain-trail'),
  timerCountdown:document.getElementById('timer-countdown'),
  timerProgress: document.getElementById('timer-progress'),
  chainNum:      document.getElementById('chain-num'),
  hintBtn:       document.getElementById('hint-btn'),
  hintCount:     document.getElementById('hint-count'),
  diffLabel:     document.getElementById('diff-label'),
  bestScore:     document.getElementById('best-score'),
  headerBest:    document.getElementById('header-best'),
  // end screen
  endBadgeIcon:  document.getElementById('end-badge-icon'),
  endBadgeName:  document.getElementById('end-badge-name'),
  endScoreNum:   document.getElementById('end-score-num'),
  endChainWords: document.getElementById('end-chain-words'),
  endFeedback:   document.getElementById('feedback-msg-end'),
  shareBtn:      document.getElementById('share-btn'),
  playAgainBtn:  document.getElementById('play-again-btn'),
  shareToast:    document.getElementById('share-toast'),
};

// ── Screen routing ─────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Timer ──────────────────────────────────────────────────────────────────
const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;

function setTimerVisual(sec, max) {
  const pct = sec / max;
  el.timerProgress.style.strokeDashoffset = RING_C * (1 - pct);
  el.timerCountdown.textContent = sec;

  const urgent = pct <= 0.35;
  el.timerProgress.classList.toggle('urgent', urgent);
}

function startTimer() {
  clearInterval(state.timerInterval);
  const max = getTimerForLength(state.chain.length);
  state.timerMax = max;
  state.timerSec = max;
  setTimerVisual(max, max);

  el.timerProgress.style.transition = 'none';

  state.timerInterval = setInterval(() => {
    state.timerSec--;
    setTimerVisual(state.timerSec, state.timerMax);
    if (state.timerSec <= 0) endGame('timeout');
  }, 1000);
}

// ── Game logic ─────────────────────────────────────────────────────────────
function validOptions(bridge) {
  return words.filter(w => w.first === bridge && !state.usedWords.has(w.word));
}

function startGame() {
  state.bridge = 'sun';
  state.chain = [];
  state.usedWords = new Set();
  state.hintsLeft = 2;
  state.running = true;

  el.hintCount.textContent = '2';
  el.hintBtn.disabled = false;
  el.wordInput.value = '';
  el.wordInput.disabled = false;
  el.submitBtn.disabled = false;
  setFeedback('', '');
  renderChainTrail();
  updateChainCounter();
  updateDiffLabel();
  el.bridgeWord.textContent = state.bridge;
  el.wordInput.focus();
  showScreen('game');
  startTimer();
}

function updateChainCounter() {
  el.chainNum.textContent = state.chain.length;
}

function updateDiffLabel() {
  const d = getDifficultyLabel(state.chain.length);
  el.diffLabel.textContent = d.text;
  el.diffLabel.className = 'difficulty-tag ' + d.cls;
}

function setFeedback(msg, type) {
  el.feedback.textContent = msg;
  el.feedback.className = 'feedback-msg' + (type ? ' ' + type : '');
}

function renderChainTrail() {
  if (state.chain.length === 0) {
    el.chainTrail.innerHTML = '<span class="chain-trail-empty">Your chain will appear here…</span>';
    return;
  }
  el.chainTrail.innerHTML = state.chain.map((entry, i) => {
    const arrow = i < state.chain.length - 1 ? '<span class="link-arrow">→</span>' : '';
    return `<span class="chain-link-word">
      <span class="link-first">${entry.first}</span><span class="link-connector">+</span><span class="link-second">${entry.second}</span>${arrow}
    </span>`;
  }).join('');
  el.chainTrail.scrollLeft = el.chainTrail.scrollWidth;
}

function submitWord() {
  if (!state.running) return;
  const raw = el.wordInput.value.trim().toLowerCase().replace(/\s+/g, '');
  if (!raw) return;

  if (state.usedWords.has(raw)) {
    bounce('Already used that word!', 'error');
    return;
  }

  const match = words.find(w => w.word === raw && w.first === state.bridge);
  if (!match) {
    const anyMatch = words.find(w => w.word === raw);
    if (anyMatch) {
      bounce(`"${raw}" doesn't start with "${state.bridge}"!`, 'error');
    } else {
      bounce(`"${raw}" isn't in the word list!`, 'error');
    }
    return;
  }

  // Correct!
  state.usedWords.add(raw);
  state.chain.push(match);
  state.bridge = match.second;

  el.wordInput.classList.add('correct');
  setTimeout(() => el.wordInput.classList.remove('correct'), 400);
  el.wordInput.value = '';
  setFeedback('', '');

  updateChainCounter();
  updateDiffLabel();
  renderChainTrail();
  el.bridgeWord.textContent = state.bridge;

  // Check if any valid next words exist
  const opts = validOptions(state.bridge);
  if (opts.length === 0) {
    endGame('dead-end');
    return;
  }

  startTimer();
  el.wordInput.focus();
}

function bounce(msg, type) {
  el.wordInput.classList.remove('shake');
  void el.wordInput.offsetWidth;
  el.wordInput.classList.add('shake');
  setTimeout(() => el.wordInput.classList.remove('shake'), 400);
  setFeedback(msg, type);
}

function showHint() {
  if (state.hintsLeft <= 0 || !state.running) return;
  const opts = validOptions(state.bridge);
  if (opts.length === 0) {
    setFeedback('No valid words available — chain stuck!', 'error');
    return;
  }
  const pick = opts[Math.floor(Math.random() * opts.length)];
  state.hintsLeft--;
  el.hintCount.textContent = state.hintsLeft;
  if (state.hintsLeft === 0) el.hintBtn.disabled = true;
  setFeedback(`Hint: try "${pick.word}"`, 'hint');
}

function endGame(reason) {
  clearInterval(state.timerInterval);
  state.running = false;
  el.wordInput.disabled = true;
  el.submitBtn.disabled = true;

  const score = state.chain.length;
  if (score > state.bestScore) {
    state.bestScore = score;
    el.headerBest.textContent = score;
    localStorage.setItem('ww_best', score);
  }

  const badge = getBadge(score);
  el.endBadgeIcon.textContent = badge.icon;
  el.endBadgeName.textContent = badge.name;
  el.endScoreNum.textContent = score;

  // Render end chain
  if (state.chain.length === 0) {
    el.endChainWords.innerHTML = '<span style="color:var(--text-muted);font-style:italic;">No words in chain</span>';
  } else {
    el.endChainWords.innerHTML = state.chain.map((entry, i) => {
      const arrow = i < state.chain.length - 1 ? '<span class="end-arrow">→</span>' : '';
      return `<span class="end-word-pill">${entry.word}</span>${arrow}`;
    }).join('');
  }

  let reasonMsg = '';
  let reasonType = '';
  if (reason === 'timeout') { reasonMsg = '⏱️ Time ran out!'; reasonType = 'error'; }
  else if (reason === 'dead-end') { reasonMsg = '🎉 No valid words left — chain complete!'; reasonType = 'success'; }

  el.endFeedback.textContent = reasonMsg;
  el.endFeedback.className = 'feedback-msg' + (reasonType ? ' ' + reasonType : '');
  showScreen('end');
}

// ── Share ──────────────────────────────────────────────────────────────────
function share() {
  const score = state.chain.length;
  const badge = getBadge(score);
  const chainStr = state.chain.map(w => w.word).join(' → ');
  const text = [
    `🧵 Word Weave`,
    `Chain: ${score} link${score !== 1 ? 's' : ''} | ${badge.icon} ${badge.name}`,
    chainStr ? `${chainStr}` : '',
    `Think you can beat it?`,
  ].filter(Boolean).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 2500);
  }).catch(() => {
    el.shareToast.textContent = 'Copy this: ' + text;
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 4000);
  });
}

// ── Event wiring ───────────────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', startGame);
el.submitBtn.addEventListener('click', submitWord);
el.wordInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitWord(); });
el.hintBtn.addEventListener('click', showHint);
el.shareBtn.addEventListener('click', share);
el.playAgainBtn.addEventListener('click', startGame);

// ── Init ───────────────────────────────────────────────────────────────────
async function init() {
  try {
    const res = await fetch('words.json');
    words = await res.json();
  } catch (e) {
    console.error('Failed to load words.json', e);
  }

  const saved = parseInt(localStorage.getItem('ww_best') || '0', 10);
  state.bestScore = saved;
  el.headerBest.textContent = saved;

  // Set up SVG ring
  el.timerProgress.style.strokeDasharray = RING_C;
  el.timerProgress.style.strokeDashoffset = 0;

  showScreen('home');
}

init();
