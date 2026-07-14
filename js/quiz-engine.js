/* ============================================
   First Class Spanish — Shared Quiz Engine
   Used by every quiz page (all units, all levels).
   Each quiz page provides its own `questions` array
   and `resultsMessages`, then calls initQuiz().
   ============================================ */

function initQuiz(questions, resultsMessages) {
  let current = 0;
  let score = 0;
  const container = document.getElementById('quizContainer');
  const progressFill = document.getElementById('progressFill');

  function renderQuestion() {
    const item = questions[current];
    let answered = false;
    container.innerHTML = `
      <div class="q-card">
        <div class="q-num">Question ${current + 1} of ${questions.length}</div>
        <div class="q-text">${item.q}</div>
        <div id="opts"></div>
        <div class="feedback-msg" id="feedbackMsg"></div>
        <div class="explain" id="explain">${item.explain}</div>
        <button class="check-btn" id="checkBtn" disabled>Check Answer</button>
      </div>
    `;
    const optsDiv = document.getElementById('opts');
    item.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'opt';
      label.innerHTML = `<input type="radio" name="q" value="${i}"> ${opt}`;
      label.addEventListener('click', () => {
        if (!answered) document.getElementById('checkBtn').disabled = false;
      });
      optsDiv.appendChild(label);
    });

    const checkBtn = document.getElementById('checkBtn');
    checkBtn.addEventListener('click', () => {
      if (!answered) {
        const selected = document.querySelector('input[name="q"]:checked');
        if (!selected) return;
        const selectedIdx = parseInt(selected.value);
        const opts = document.querySelectorAll('.opt');
        opts.forEach((o, i) => {
          o.querySelector('input').disabled = true;
          if (i === item.correct) o.classList.add('correct');
          else if (i === selectedIdx) o.classList.add('incorrect');
        });
        const feedback = document.getElementById('feedbackMsg');
        if (selectedIdx === item.correct) {
          score++;
          feedback.textContent = 'Correct! 🎉';
          feedback.classList.add('show', 'right');
        } else {
          feedback.textContent = 'Not quite.';
          feedback.classList.add('show', 'wrong');
        }
        document.getElementById('explain').classList.add('show');
        checkBtn.textContent = current === questions.length - 1 ? 'See Results' : 'Next Question';
        answered = true;
      } else {
        current++;
        if (current < questions.length) {
          renderQuestion();
        } else {
          showResults();
        }
        updateProgress();
      }
    });
    updateProgress();
  }

  function updateProgress() {
    progressFill.style.width = `${(current / questions.length) * 100}%`;
  }

  function showResults() {
    container.style.display = 'none';
    document.querySelector('.progress-track').style.display = 'none';
    const results = document.getElementById('results');
    results.classList.add('show');
    document.getElementById('scoreText').textContent = `${score} / ${questions.length}`;
    const pct = score / questions.length;
    let msg = '';
    let msgEs = '';
    if (pct === 1) { msg = resultsMessages.perfect; msgEs = '¡Excelente! 🎉'; }
    else if (pct >= 0.7) { msg = resultsMessages.good; msgEs = '¡Buen trabajo!'; }
    else { msg = resultsMessages.low; msgEs = '¡Sigue practicando!'; }
    document.getElementById('scoreMsg').textContent = msg;
    const esEl = document.getElementById('scoreMsgEs');
    if (esEl) esEl.textContent = msgEs;
  }

  renderQuestion();
}
