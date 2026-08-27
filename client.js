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
let a = randomInt(1, 10);
let b = randomInt(1, 10);
const difficultySelectvalue = document.getElementById('difficultySelect').value ;
  const typeofmath = document.getElementById('typeSelect').value;

  if (difficultySelectvalue == "easy++")
  {
a = randomInt(1, 10);
b = randomInt(1, 10);
  }
    if (difficultySelectvalue == "easy")
  {
a = randomInt(1, 50);
b = randomInt(1, 50);
  }
  else if (difficultySelectvalue == "medium")
  {
a = randomInt(10, 100);
b = randomInt(10, 100);
  }
    else if (difficultySelectvalue == "hard")
  {
a = randomInt(50, 500);
b = randomInt(50, 500);
  }
      else if (difficultySelectvalue == "hard++")
  {
a = randomInt(100, 1000);
b = randomInt(100, 1000);
  }
      else if (difficultySelectvalue == "HARDER")
  {
a = randomInt(1000, 10000);
b = randomInt(1000, 10000);
  }


if (typeofmath === 'addition') {
  operatorEl.textContent = '+';
  currentAnswer = a + b;


} else if (typeofmath === 'subtraction') {
  operatorEl.textContent = '−';
  const larger = Math.max(a, b);
  const smaller = Math.min(a, b);
  currentAnswer = larger - smaller;
  operandAEl.textContent = larger;
  operandBEl.textContent = smaller;



} else if (typeofmath === 'multiplication') {
  operatorEl.textContent = '×';
  currentAnswer = a * b;
} else if (typeofmath === 'division') {
  operatorEl.textContent = '÷';
  currentAnswer = Math.floor(a / b);
}

  operandAEl.textContent = a;
  operandBEl.textContent = b;



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
function ReRollOnClick()
{
 newProblem();
 return;
}

answerInput.addEventListener('input', handleInput);

document.addEventListener('click', () => {
  answerInput.focus();
});

newProblem();

const difficultySelect = document.getElementById('difficultySelect');
const typeSelect = document.getElementById('typeSelect');

difficultySelect.addEventListener('change', () => {
  newProblem();
});

typeSelect.addEventListener('change', () => {
  newProblem();
});


var formSubmitting = false;
var setFormSubmitting = function() { formSubmitting = true; };

window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (formSubmitting) {
            return undefined;
        }

        var confirmationMessage = 'its looks like you have been playing the game. '
                                + 'If you leave before saving, your statistics will be lost.';
        
        (e || window.event).returnValue = confirmationMessage; 
        return confirmationMessage; 
    });
};
