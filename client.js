const operandAEl = document.getElementById('operandA');
const operandBEl = document.getElementById('operandB');
const operatorEl = document.getElementById('operator');
const answerInput = document.getElementById('answerInput');
const streakText = document.getElementById('StreakText');
const TotalDoneText = document.getElementById('TotalDoneText');

let currentAnswer = 0;
let streak = 0;
let TotalDone = 0;

let isChecking = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStreak() {

  streakText.textContent = `Streak = ${streak}`;

  if (streak == 0)
  {
  streakText.textContent = ``;
  }

  if (TotalDone != 0)
  {
  TotalDoneText.textContent = `Total Done = ${TotalDone}`;
  }

}

function newProblem() {
  const a = randomInt(1, 5);
  const b = randomInt(1, 5);

  operandAEl.textContent = a;
  operandBEl.textContent = b;
  operatorEl.textContent = '+';

  currentAnswer = a + b;

  answerInput.value = '';
  answerInput.classList.remove('correct', 'wrong');

  isChecking = false;
  answerInput.focus();
}

function handleInput() {
  if (isChecking) return;

  const value = answerInput.value.trim();

  if (!/^\d+$/.test(value)) return;
  if (value.length < String(currentAnswer).length) return;

  isChecking = true;

  const isCorrect = Number(value) === currentAnswer;

  answerInput.classList.add(isCorrect ? 'correct' : 'wrong');

  if (isCorrect) {
    streak++;
    TotalDone++;
  } else if (isCorrect == false){
    streak = 0;
  }

  updateStreak();

  setTimeout(newProblem, isCorrect ? 400 : 900);
}

answerInput.addEventListener('input', handleInput);

document.addEventListener('click', () => {
  answerInput.focus();
});

newProblem();