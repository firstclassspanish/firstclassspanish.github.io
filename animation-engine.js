/* ============================================
   First Class Spanish — Shared Animation Engine
   Used by every unit's intro animation. Each page
   calls initAnimation(durations, lessonUrl, onBeatShow)
   — onBeatShow is optional, for unit-specific per-beat
   logic (like Unit 1's syllable reveal).
   ============================================ */

function initAnimation(durations, lessonUrl, onBeatShow) {
  const beats = document.querySelectorAll('.beat');
  const dotsContainer = document.getElementById('dots');
  let timers = [];

  beats.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = 'dot-' + i;
    dotsContainer.appendChild(dot);
  });

  function clearTimers() { timers.forEach(t => clearTimeout(t)); timers = []; }

  function showBeat(i) {
    beats.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.dot').forEach((d, idx) => {
      d.classList.toggle('done', idx <= i);
    });
    const current = document.querySelector(`.beat[data-beat="${i}"]`);
    if (current) current.classList.add('active');

    if (current) {
      const animated = current.querySelectorAll(
        '.messy-word, .box-cell, .vowel-item, .flash-words span, .sentence-line, .word-block, .tag, .category-chip'
      );
      animated.forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = null;
      });
    }

    if (typeof onBeatShow === 'function') onBeatShow(i);

    if (i < beats.length - 1) {
      const t = setTimeout(() => showBeat(i + 1), durations[i]);
      timers.push(t);
    }
  }

  const skipBtn = document.getElementById('skipBtn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => { window.location.href = lessonUrl; });
  }

  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => { clearTimers(); showBeat(0); });
  }

  showBeat(0);
}
