const ERROR = "error";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const P1_VICTORY = 1;
const P2_VICTORY = -1;
const DRAW = 0;

function main() {
  console.log("ROCK-PAPER-SCISSORS 5 ROUND DEATHMATCH - START!");

  let score = 0;

  for (let i = 0; i < 5; i++) {
    let player_choice = prompt(`What is your ${i + 1}° choice?`).toLowerCase();

    if (![ROCK, PAPER, SCISSORS].includes(player_choice)) {
      console.log(
        `invalid choice! You chose ${player_choice}\nWrite 'rock','paper' or 'scissors'`
      );
      i -= 1;
      continue;
    }

    score += Round(player_choice);

    console.log(`Score: ${score}`);
  }
  if (score == 5 || score == -5) {
    console.log("PERFECT");
  }
  if (score > 0) {
    console.log("YOU WON THE DEATHMATCH!");
  }
  if (score < 0) {
    console.log("YOU LOSE!");
  } else {
    console.log("YOU BOOOORING");
  }
}

function Round(player_choice) {
  let computer_choice = getComputerChoice();
  console.log(`Computer played ${computer_choice}`);

  let result = getWinner(player_choice, computer_choice);

  if (result == P1_VICTORY)
    console.log(
      `You won the round! ${player_choice} wins over ${computer_choice}\n+1 point!`
    );
  if (result == P2_VICTORY)
    console.log(
      `You lost the round! ${player_choice} losses to ${computer_choice}\n-1 point!`
    );
  if (result == DRAW) console.log("Its a Draw!");

  return result;
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

main();
