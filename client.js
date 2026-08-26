
const operandAEl = document.getElementById('operandA');
const operandBEl = document.getElementById('operandB');
const operatorEl = document.getElementById('operator');
const answerInput = document.getElementById('answerInput');

let currentAnswer = 0;
let locked = false; 
let Streak = 0;
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newProblem() {
  const a = randomInt(1, 50);
  const b = randomInt(1, 50);

  operandAEl.textContent = a;
  operandBEl.textContent = b;
  operatorEl.textContent = '+';
  currentAnswer = a + b;

  answerInput.value = '';
  answerInput.classList.remove('correct', 'wrong');

  locked = false;
  answerInput.focus();
}

function handleInput() {
  if (locked) return;

  const raw = answerInput.value;
  const expectedDigits = String(currentAnswer).length;


  const typedDigits = raw.replace(/[^0-9]/g, '').length;
  if (typedDigits < expectedDigits) return;

  locked = true;
  const isCorrect = Number(raw) === currentAnswer;
  answerInput.classList.add(isCorrect ? 'correct' : 'wrong');

  setTimeout(newProblem, isCorrect ? 400 : 900);
}

answerInput.addEventListener('input', handleInput);
document.addEventListener('click', () => answerInput.focus());

newProblem();