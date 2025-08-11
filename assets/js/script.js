// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function() {
      if (this.getAttribute("data-type") === 'submit') {
        alert("You clicked Submit!");
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    })
  }
  runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  let num1 = Math.floor(Math.random() * 26);
  let num2 = Math.floor(Math.random() * 26);

  switch (gameType) {
    case 'addition':
      displayAdditionQuestion(num1, num2);
      break;
    default: 
      alert(`Unknown game type: ${gameType}`);
      throw `Unknown gmae type: ${gameType}. Aborting!`;
  }
}

function checkAnswer() {

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
    case "+":
      return [operand1 + operand2, "addition"]
    default:
      alert(`Unimplemented operator ${operator}`);
      throw `Unimplemented operator ${operator}`;
  }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').innerText = operand1;
  document.getElementById('operand2').innerText = operand2;
  document.getElementById('operator').innerText = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}