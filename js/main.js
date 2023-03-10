// Event listener variables

const p1Rock = document.querySelector("#p1-rock");
const p1Paper = document.querySelector("#p1-paper");
const p1Scissors = document.querySelector("#p1-scissors");

const cpRock = document.querySelector("#cp-rock");
const cpPaper = document.querySelector("#cp-paper");
const cpScissors = document.querySelector("#cp-scissors");

const p1Announcer = document.querySelector("#p1-announcer");
const cpAnnouncer = document.querySelector("#cp-announcer");

// Session score increments
let i = 0;
let j = 0;

// All time score increments
let m = 0;
let n = 0;

// sets the all time score to 0 if this this your first time one the page or sets the all time score to what ever it was when you left if you are a returning player
if (localStorage.getItem("p1LocalScore") === null) {
  m = 0;
  localStorage.setItem("p1LocalScore", JSON.stringify(m));
} else {
  m = JSON.parse(localStorage.getItem("p1LocalScore"));
  document.querySelector("#p1-local-score").innerText = m;
}
if (localStorage.getItem("cpLocalScore") === null) {
  n = 0;
  localStorage.setItem("cpLocalScore", JSON.stringify(n));
} else {
  n = JSON.parse(localStorage.getItem("cpLocalScore"));
  document.querySelector("#cp-local-score").innerText = n;
}

// updates the score for the screen reader at the start
updateScreenReaderScore();

// Main event listeners
document.querySelector("#p1-rock").addEventListener("click", function (e) {
  playGame("rock");
});

document.querySelector("#p1-paper").addEventListener("click", function (e) {
  playGame("paper");
});

document.querySelector("#p1-scissors").addEventListener("click", function (e) {
  playGame("scissors");
});

// HELPER FUNCTIONS

function p1AnnouncerFunc(p1Choice) {
  if (p1Choice === "rock") {
    p1Announcer.innerText = "Player One Chooses... Rock";
  } else if (p1Choice === "paper") {
    p1Announcer.innerText = "Player One Chooses... Paper";
  } else {
    p1Announcer.innerText = "Player One Chooses... Scissors";
  }
}

// Animations when you click on your choice. All the timeouts were so I could hide the choices that weren't chosen so the screen reader wouldn't tab to them but after the animations had finished. I had to disable the event so after the player chose they couln't click it again until the game rest.
function p1AnimationFunc(choice) {
  if (choice === "rock") {
    p1Rock.classList.add("choice-right-center", "disable-event");
    p1Paper.classList.add("offscreen-right");
    p1Scissors.classList.add("offscreen-right");

    setTimeout(function () {
      p1Paper.style.visibility = "hidden";
      p1Scissors.style.visibility = "hidden";
    }, 1000);
  } else if (choice === "paper") {
    p1Rock.classList.add("offscreen-left");
    p1Paper.classList.add("disable-event");
    p1Scissors.classList.add("offscreen-right");

    setTimeout(function () {
      p1Rock.style.visibility = "hidden";
      p1Scissors.style.visibility = "hidden";
    }, 1000);
  } else {
    p1Rock.classList.add("offscreen-left");
    p1Paper.classList.add("offscreen-left");
    p1Scissors.classList.add("choice-left-center", "disable-event");

    setTimeout(function () {
      p1Rock.style.visibility = "hidden";
      p1Paper.style.visibility = "hidden";
    }, 1000);
  }
}

function cpChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  const myArray = ["rock", "paper", "scissors"];
  return myArray[randomNumber];
}

// replaces the Computer choices with a count down after each second after 4 seconds replaces the middle option with what the computer chose(rock, paper, or scissors) then displays the play again button
function cpAnimationFunc(cChoice) {
  setTimeout(function () {
    cpRock.innerText = "1";
    cpRock.classList.add("grow-fade-in");
  }, 1000);
  setTimeout(function () {
    cpPaper.innerText = "2";
    cpPaper.classList.add("grow-fade-in");
  }, 2000);
  setTimeout(function () {
    cpScissors.innerText = "3";
    cpScissors.classList.add("grow-fade-in");
  }, 3000);

  setTimeout(function () {
    cpRock.innerText = "";
    cpScissors.innerText = "";
    if (cChoice === "rock") {
      cpPaper.innerText = "???";
      document.querySelector("#cp-announcer").ariaLabel =
        "Computer chose rock.";
    } else if (cChoice === "paper") {
      cpPaper.innerText = "???";
      document.querySelector("#cp-announcer").ariaLabel =
        "Computer chose paper.";
    } else {
      cpPaper.innerText = "??????";
      document.querySelector("#cp-announcer").ariaLabel =
        "Computer chose scissors.";
    }
  }, 4000);

  setTimeout(function () {
    document.querySelector("#play-again").style.display = "flex";
  }, 5000);
}

function decisionMaker(p1Choice, cpChoice) {
  const p1 = p1Choice;
  const cp = cpChoice;
  let decision = "";

  (p1 === "rock") & (cp === "scissors")
    ? (decision = "P1 wins")
    : (p1 === "paper") & (cp === "rock")
    ? (decision = "P1 wins")
    : (p1 === "scissors") & (cp === "paper")
    ? (decision = "P1 wins")
    : (cp === "rock") & (p1 === "scissors")
    ? (decision = "CP wins")
    : (cp === "paper") & (p1 === "rock")
    ? (decision = "CP wins")
    : (cp === "scissors") & (p1 === "paper")
    ? (decision = "CP wins")
    : (decision = "");

  return decision;
}

// updates the all time and session scores
function sessionScore(decision, cpChoice) {
  const dec = decision;
  if (dec === "P1 wins") {
    i++;
    document.querySelector("#p1-session-score").innerText = i;
    p1Announcer.innerText = "??? Player One wins! ???";
    cpAnnouncer.innerText = "Computer Chooses... " + cpChoice;
    // All time score if player one wins
    m++;
    document.querySelector("#p1-local-score").innerText = m;
    localStorage.setItem("p1LocalScore", JSON.stringify(m));
  } else if (dec === "CP wins") {
    j++;
    document.querySelector("#cp-session-score").innerText = j;
    p1Announcer.innerText = "???? Computer wins! ????";
    cpAnnouncer.innerText = "Computer Chooses... " + cpChoice;
    // All time score if computer wins
    n++;
    document.querySelector("#cp-local-score").innerText = n;
    localStorage.setItem("cpLocalScore", JSON.stringify(n));
  } else {
    p1Announcer.innerText = "Tie Game";
    cpAnnouncer.innerText = "Computer Chooses... " + cpChoice;
  }
}

function enableEvents() {
  p1Rock.classList.add("enable-event");
  p1Paper.classList.add("enable-event");
  p1Scissors.classList.add("enable-event");
}

function updateScreenReaderScore() {
  document.querySelector("#p1-local-score").ariaLabel =
    "Player One has " + m + " All Time Wins";
  document.querySelector("#cp-local-score").ariaLabel =
    "Computer Player has " + n + " All Time Wins";
  document.querySelector("#p1-session-score").ariaLabel =
    "Player One has " + i + " Wins this session.";
  document.querySelector("#cp-session-score").ariaLabel =
    "Computer Player has " + j + " Wins this session.";
}

// resets the game
function playAgain() {
  document.querySelector("#play-again").addEventListener("click", function (e) {
    p1Announcer.innerText = "Player One Chooses...";

    p1Rock.classList.remove("offscreen-left", "choice-right-center");
    p1Paper.classList.remove("offscreen-left", "offscreen-right");
    p1Scissors.classList.remove("offscreen-right", "choice-left-center");

    p1Rock.style.visibility = "visible";
    p1Paper.style.visibility = "visible";
    p1Scissors.style.visibility = "visible";

    cpAnnouncer.innerText = "Computer Chooses...";

    cpRock.innerText = "???";
    cpPaper.innerText = "???";
    cpScissors.innerText = "??????";

    p1Announcer.focus();
    document.querySelector("#play-again").style.display = "none";
    e.preventDefault();
    enableEvents();
  });
}

function playGame(p1Choice) {
  p1AnnouncerFunc(p1Choice);
  p1AnimationFunc(p1Choice);
  const cChoice = cpChoice();
  cpAnimationFunc(cChoice);
  setTimeout(function () {
    sessionScore(decisionMaker(p1Choice, cChoice), cChoice);
    updateScreenReaderScore();
  }, 4000);
  playAgain();
}
