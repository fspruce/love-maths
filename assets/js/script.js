// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function() {
      if (this.getAttribute("data-type") === 'submit') {
        if (document.getElementById('answer-box').value) {
          checkAnswer();
        } else {
          document.getElementById('answer-box').focus();
          document.getElementById('feedback').innerText = "Please enter your answer before submitting!";
        }
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    })
  }
  document.getElementById('answer-box').addEventListener("keydown", function(event){
    if (event.key === "Enter") {
      checkAnswer();
    }
  })
  runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  let num1 = Math.floor(Math.random() * 26);
  let num2 = Math.floor(Math.random() * 26);
  document.getElementById('answer-box').value = "";
  document.getElementById('answer-box').focus();

  switch (gameType) {
    case 'addition':
      displayAdditionQuestion(num1, num2);
      break;
    case 'multiply':
      displayMultiplyQuestion(num1, num2);
      break;
    case 'subtract':
      displaySubtractQuestion(num1, num2);
      break;
    case 'division':
      displayDivisionQuestion(num1, num2);
      break;
    default: 
      alert(`Unknown game type: ${gameType}`);
      throw `Unknown gmae type: ${gameType}. Aborting!`;
  }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];
  if (isCorrect) {
    document.getElementById('feedback').innerText = "Hey! You got it right! :D";
    incrementScore();
  } else {
    document.getElementById('feedback').innerText = `Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`;
    incrementWrongAnswer();
  }
  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the dom, adn returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').innerText);
  let operand2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  switch (operator) {
    case '+':
      return [operand1 + operand2, "addition"];
    case 'x':
      return [operand1 * operand2, "multiply"];
    case '-':
      return [operand1 - operand2, "subtract"];
    case '\u00F7':
      return [operand1 / operand2, "division"];
    default:
      alert(`Unimplemented operator ${operator}`);
      throw `Unimplemented operator ${operator}`;
  }
}

/**
 * Gets the current score from the DOM and increments it by 1.
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1;
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById('incorrect').innerText);
  document.getElementById('incorrect').innerText = ++oldScore;
}

/**
 * Displays an addition question in the DOM (positive answers only);
 * @param {*} operand1 
 * @param {*} operand2 
 */
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').innerText = operand1;
  document.getElementById('operand2').innerText = operand2;
  document.getElementById('operator').innerText = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operand1').innerText = operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').innerText = operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').innerText = "-";
}

/**
 * Displays a multiplication question in the DOM.
 * @param {*} operand1 
 * @param {*} operand2 
 */
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').innerText = operand1;
  document.getElementById('operand2').innerText = operand2;
  document.getElementById('operator').innerText = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  (operand1 === 0 && operand2 === 0) ? operand2++ : null;
  let operand3 = operand1 * operand2;
  document.getElementById('operand1').innerText = operand3;
  document.getElementById('operand2').innerText = operand2 === 0 ? operand1 : operand2;
  document.getElementById('operator').innerText = "\u00F7";
}