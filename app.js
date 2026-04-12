let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a Draw! 🤝";
  msg.className = "draw";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! 🎉 ${userChoice} beats ${compChoice}`;
    msg.className = "win";
    userScorePara.parentElement.style.transform = "scale(1.1)";
    setTimeout(() => userScorePara.parentElement.style.transform = "scale(1)", 200);
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost. 💀 ${compChoice} beats ${userChoice}`;
    msg.className = "lose";
    compScorePara.parentElement.style.transform = "scale(1.1)";
    setTimeout(() => compScorePara.parentElement.style.transform = "scale(1)", 200);
  }
};

const playGame = (userChoice) => {
  // Add a small interaction effect
  const userChoiceElement = document.getElementById(userChoice);
  userChoiceElement.style.transform = "scale(0.9)";
  setTimeout(() => userChoiceElement.style.transform = "", 100);

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play your move to start!";
  msg.className = "";
  
  // Reset animation
  resetBtn.style.transform = "scale(0.95)";
  setTimeout(() => resetBtn.style.transform = "scale(1)", 100);
});