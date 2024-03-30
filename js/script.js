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

const initial_page_content = document.body.innerHTML;

let button_div = document.querySelector("#button-div");
let start_button = document.querySelector("#start");
start_button.addEventListener("click", startGame, { once: true });

let player_scoreboard = document.querySelector("#player-score");
let computer_scoreboard = document.querySelector("#computer-score");

setupPage();

function setupRestartedPage() {
  button_div = document.querySelector("#button-div");
  start_button = document.querySelector("#start");
  start_button.addEventListener("click", startGame, { once: true });

  player_scoreboard = document.querySelector("#player-score");
  computer_scoreboard = document.querySelector("#computer-score");
}

function setFinalMessage(object) {
  if (score > 0) {
    object.textContent = "YOU SURVIVED";
  } else if (score < 0) {
    object.textContent = "YOU DIED";
  } else {
    object.textContent = "we both survive, i guess...\nwanna try again?";
  }
}

function restartGame() {
  score = 0;
  round = 0;

  // Restore the initial content of the body
  document.body.innerHTML = initial_page_content;

  setupRestartedPage();
}

function changeBody(new_body) {
  document.body.innerHTML = "";
  document.body.appendChild(new_body);
}

function endGame() {
  const final_screen = document.createElement("div");
  const final_message = document.createElement("h1");
  const restart_button = document.createElement("button");

  final_screen.style.backgroundColor = "crimson";
  final_screen.id = "final-screen";

  final_message.classList.toggle("title");
  setFinalMessage(final_message);

  restart_button.classList.toggle("button");
  restart_button.textContent = "restart?";
  restart_button.addEventListener("click", restartGame, { once: true });

  final_screen.appendChild(final_message);
  final_screen.appendChild(restart_button);
  changeBody(final_screen);
}

function startGame() {
  console.log("ROCK-PAPER-SCISSORS 5 ROUND DEATHMATCH - START!");

  updateButtons();
  startResultDiv();
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

  if (round >= 5) endGame();
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
