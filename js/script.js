const ERROR = "error";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const P1_VICTORY = 1;
const P2_VICTORY = -1;
const DRAW = 0;

const button_div = document.querySelector("#button-div");
const start_button = document.querySelector("#start");
start_button.addEventListener("click", startGame);

function setupButtons() {}

function startGame() {
  console.log("ROCK-PAPER-SCISSORS 5 ROUND DEATHMATCH - START!");

  updateButtons();

  let score = 0;
}

function removeStartButton() {
  button_div.removeChild(start_button);
}

function updateButtons() {
  removeStartButton();

  let buttons = createGameButtons();

  buttons.forEach((button) => button_div.appendChild(button));
}

function createGameButtons() {
  const buttons = new Array();

  const rock_button = document.createElement("button");
  const paper_button = document.createElement("button");
  const scissors_button = document.createElement("button");

  rock_button.id = "rock";
  rock_button.classList.toggle("button");
  rock_button.textContent = "ROCK";
  paper_button.id = "paper";
  paper_button.classList.toggle("button");
  paper_button.textContent = "PAPER";
  scissors_button.id = "scissor";
  scissors_button.classList.toggle("button");
  scissors_button.textContent = "SCISSORS";

  rock_button.addEventListener("click", (e) => playRound(e));
  paper_button.addEventListener("click", (e) => playRound(e));
  scissors_button.addEventListener("click", (e) => playRound(e));

  buttons.push(...[rock_button, paper_button, scissors_button]);

  return buttons;
}

function logResults(result) {
  if (result === P1_VICTORY) {
    console.log("YOU WON THE DEATHMATCH!");
  } else if (result === P2_VICTORY) {
    console.log("YOU LOSE!");
  } else {
    console.log("YOU DRAW!");
  }
}

function playRound(player_choice_event) {
  const player_choice = player_choice_event.target.id;

  console.log(`You played ${player_choice.toUpperCase()}`);

  let computer_choice = getComputerChoice();
  console.log(`Computer played ${computer_choice.toUpperCase()}`);

  let result = getWinner(player_choice, computer_choice);

  logResults(result);
}

function getWinner(choice1, choice2) {
  switch (choice1) {
    case ROCK:
      switch (choice2) {
        case ROCK:
          return DRAW;
        case PAPER:
          return P2_VICTORY;
        case SCISSORS:
          return P1_VICTORY;
        default:
          return ERROR;
      }
    case PAPER:
      switch (choice2) {
        case ROCK:
          return P1_VICTORY;
        case PAPER:
          return DRAW;
        case SCISSORS:
          return P2_VICTORY;
        default:
          return ERROR;
      }
    case SCISSORS:
      switch (choice2) {
        case ROCK:
          return P2_VICTORY;
        case PAPER:
          return P1_VICTORY;
        case SCISSORS:
          return DRAW;
        default:
          return ERROR;
      }
  }
}

function getComputerChoice() {
  if (Math.random() < 0.3) {
    return ROCK;
  } else if (Math.random() < 0.6) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}
