const operandAEl = document.getElementById('operandA');
const operandBEl = document.getElementById('operandB');
const operatorEl = document.getElementById('operator');
const answerInput = document.getElementById('answerInput');
const streakText = document.getElementById('StreakText');
const TotalDoneText = document.getElementById('TotalDoneText');

let currentAnswer = 0;
let streak = 0;
let TotalDone = 0;
let XP = 0;
let bestStreak = 0;
let isChecking = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStreak() {

  streakText.textContent = `${streak} Streak`;

  if (streak == 0)
  {
  streakText.textContent = ``;
  }

  if (TotalDone != 0)
  {
  TotalDoneText.textContent = `${TotalDone} Total Done`;
  }

  if (XP != 0)
  {
  document.getElementById('XPText').textContent = `${XP} XP`;
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
    else if (difficultySelectvalue == "easy")
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
  operandAEl.textContent = a;     
  operandBEl.textContent = b;      

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
  operandAEl.textContent = a;      
  operandBEl.textContent = b;      

} else if (typeofmath === 'division') {
  operatorEl.textContent = '÷';
  currentAnswer = Math.floor(a / b);
  operandAEl.textContent = a;     
  operandBEl.textContent = b;      
}





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
    GiveXP();
if (streak > bestStreak) {bestStreak = streak;}
  } else if (isCorrect == false){
    streak = 0;
  }

  updateStreak();

  setTimeout(newProblem, isCorrect ? 200 : 800);
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

function GiveXP() {

  const difficulty = document.getElementById('difficultySelect').value;
  
  let baseXP = 10;
  let typeMultiplier = 1;

  if (difficulty === 'easy++') baseXP = 10;
  else if (difficulty === 'easy') baseXP = 15;
  else if (difficulty === 'medium') baseXP = 25;
  else if (difficulty === 'hard') baseXP = 40;
  else if (difficulty === 'hard++') baseXP = 60;
  else if (difficulty === 'HARDER') baseXP = 100;
  const typeofmath = document.getElementById('typeSelect').value;


if (typeofmath === 'multiplication') typeMultiplier = 2;
else if (typeofmath === 'division') typeMultiplier = 4;

XP += Math.floor(baseXP * typeMultiplier);
  
  updateStreak();
}
function generateChecksum(stats) {
  const data = `${stats.totalDone}${stats.totalXP}${stats.bestStreak}`;
  
  let hash = 0;
  for (let char of data) {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
  }
  
  return Math.abs(hash).toString(36).toUpperCase().slice(0, 8);
}

function generateReport() {
  const stats = {
    totalDone: TotalDone,
    totalXP: XP,
    bestStreak: bestStreak,
    currentDifficulty: document.getElementById('difficultySelect').value,
    currentType: document.getElementById('typeSelect').value,
    streak: streak
  };

  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FAF8FF';  
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#6C5CE7';  
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('QuickMath Lite Report', 300, 60);

  ctx.font = '24px Arial';
  ctx.fillStyle = '#1F1B3A';  
  ctx.textAlign = 'left';
  
  ctx.fillText(`Total Done: ${stats.totalDone}`, 50, 150);
  ctx.fillText(`Total XP: ${stats.totalXP}`, 50, 200);
  ctx.fillText(`Streak: ${stats.streak}`, 50, 250);
  ctx.fillText(`Best Streak: ${stats.bestStreak}`, 50, 300);
  const checksum = generateChecksum(stats);  
  ctx.fillText(`Checksum: ${checksum}`, 50, 350);  


  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  `;

  const img = document.createElement('img');
  img.src = canvas.toDataURL();
  img.style.maxWidth = '100%';

  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = 'Download PNG';
  downloadBtn.style.cssText = `
    margin-top: 15px;
    padding: 10px 20px;
    background: #6C5CE7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  `;

  downloadBtn.onclick = () => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quickmath-lite-report.png';
      a.click();
    });
  };

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Close';
  closeBtn.style.cssText = `
    margin-left: 10px;
    padding: 10px 20px;
    background: #FF5C5C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  `;

  closeBtn.onclick = () => modal.remove();

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.marginTop = '15px';
  buttonsDiv.appendChild(downloadBtn);
  buttonsDiv.appendChild(closeBtn);

  modalContent.appendChild(img);
  modalContent.appendChild(buttonsDiv);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}












//form thing

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