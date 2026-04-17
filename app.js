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
  pulseMessage();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! 🎉 ${userChoice} beats ${compChoice}`;
    msg.className = "win";
    animateScore(userScorePara.parentElement);
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost 💀 ${compChoice} beats ${userChoice}`;
    msg.className = "lose";
    animateScore(compScorePara.parentElement);
  }
  pulseMessage();
};

/* Score pop animation */
const animateScore = (el) => {
  el.style.transition = "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)";
  el.style.transform = "scale(1.15)";
  setTimeout(() => {
    el.style.transform = "scale(1)";
  }, 200);
};

/* Message slide-in animation */
const pulseMessage = () => {
  msg.style.animation = "none";
  msg.offsetHeight; // reflow
  msg.style.animation = "msgPop 0.35s ease";
};

/* Create and inject msg keyframe once */
const style = document.createElement("style");
style.textContent = `
  @keyframes msgPop {
    0%   { opacity: 0; transform: translateY(8px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes rippleEffect {
    0%   { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

/* Ripple effect on choice click */
const createRipple = (element, e) => {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: rippleEffect 0.5s ease-out forwards;
    pointer-events: none;
  `;
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
};

const playGame = (userChoice) => {
  const userChoiceElement = document.getElementById(userChoice);

  // Ripple + click feedback
  createRipple(userChoiceElement);
  userChoiceElement.style.transform = "scale(0.92)";
  setTimeout(() => (userChoiceElement.style.transform = ""), 150);

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
  setTimeout(() => (resetBtn.style.transform = "scale(1)"), 100);
});