const NUMBER_OF_ROUNDS = 5;
const ERROR = "error";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const VICTORY = 1;
const LOSS = -1;
const DRAW = 0;

let score = 0;
let round = 0;

const button_div = document.querySelector("#button-div");
const start_button = document.querySelector("#start");
start_button.addEventListener("click", startGame, { once: true });

const player_scoreboard = document.querySelector("#player-score");
const computer_scoreboard = document.querySelector("#computer-score");

function runGame() {
  while (true) {
    if (round < 5) {
      return;
    }
  }
}

function startGame() {
  console.log("ROCK-PAPER-SCISSORS 5 ROUND DEATHMATCH - START!");

  updateButtons();
  startResultDiv();

  runGame();
}

function startResultDiv() {
  const result_div = document.querySelector("#result-div");
  result_div.style.opacity = "1";
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
  scissors_button.id = "scissors";
  scissors_button.classList.toggle("button");
  scissors_button.textContent = "SCISSORS";

  rock_button.addEventListener("click", (e) => playRound(e));
  paper_button.addEventListener("click", (e) => playRound(e));
  scissors_button.addEventListener("click", (e) => playRound(e));

  buttons.push(...[rock_button, paper_button, scissors_button]);

  return buttons;
}

function createPoint() {
  const point = document.createElement("img");
  point.src = "img/coin.png";
  point.classList.toggle("point");

  return point;
}

function addPointToPlayer() {
  const point = createPoint();

  player_scoreboard.appendChild(point);
}

function addPointToComputer() {
  const point = createPoint();

  computer_scoreboard.appendChild(point);
}

function setResults(result) {
  console.log(result);
  if (result === VICTORY) {
    console.log("YOU WON!");
    addPointToPlayer();
  } else if (result === LOSS) {
    console.log("YOU LOSE!");
    addPointToComputer();
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

  setResults(result);

  score += result;
  round += 1;

  console.log(`score:${score} round:${round}`);
}

function getWinner(choice1, choice2) {
  switch (choice1) {
    case ROCK:
      switch (choice2) {
        case ROCK:
          return DRAW;
        case PAPER:
          return LOSS;
        case SCISSORS:
          return VICTORY;
      }
    case PAPER:
      switch (choice2) {
        case ROCK:
          return VICTORY;
        case PAPER:
          return DRAW;
        case SCISSORS:
          return LOSS;
      }
    case SCISSORS:
      switch (choice2) {
        case ROCK:
          return LOSS;
        case PAPER:
          return VICTORY;
        case SCISSORS:
          return DRAW;
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
