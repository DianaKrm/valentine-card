const intro = document.getElementById("envelope-container");
const game = document.getElementById("game-container");

const screenStart = document.getElementById("screen-start");
const screenPlayers = document.getElementById("screen-players");
const screenCards = document.getElementById("screen-cards");

const screenCongrats = document.getElementById("screen-congrats");
const screenLetter = document.getElementById("screen-letter");
const screenRizz = document.getElementById("screen-rizz");
const screenQuestion = document.getElementById("screen-question");
const screenEnd = document.getElementById("screen-end");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const backToPlayers = document.getElementById("backToPlayers");
const backFromCongrats = document.getElementById("backFromCongrats");
const backFromLetter = document.getElementById("backFromLetter");
const backFromRizz = document.getElementById("backFromRizz");
const backFromQuestion = document.getElementById("backFromQuestion");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const dateBtn = document.getElementById("dateBtn");

const env1 = document.getElementById("env1");
const env2 = document.getElementById("env2");
const env3 = document.getElementById("env3");

const answerRow = document.getElementById("answerRow");

// Track which envelopes have been viewed
let viewedEnvelopes = {
  env1: false,
  env2: false,
  env3: false
};

/* Helpful: log broken assets */
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    console.warn("Image failed to load:", img.getAttribute("src"));
  });
});

function showScreen(screenEl) {
  [
    screenStart,
    screenPlayers,
    screenCards,
    screenCongrats,
    screenLetter,
    screenRizz,
    screenQuestion,
    screenEnd
  ].forEach(s => s.classList.remove("active"));

  screenEl.classList.add("active");
}

function resetEnvelopes() {
  [env1, env2, env3].forEach((img) => {
    img.src = "purple closed.png";
    img.dataset.state = "closed";
  });
}

function goToCards() {
  resetEnvelopes();
  showScreen(screenCards);
  checkAllEnvelopesViewed();
}

function checkAllEnvelopesViewed() {
  // Show Date? button only if all 3 envelopes have been viewed
  if (viewedEnvelopes.env1 && viewedEnvelopes.env2 && viewedEnvelopes.env3) {
    dateBtn.style.display = "block";
  }
}

function resetAllToBeginning() {
  resetEnvelopes();
  viewedEnvelopes = { env1: false, env2: false, env3: false };
  dateBtn.style.display = "none";
  game.style.display = "none";
  intro.style.display = "block";
}

/* Intro click => open game + show start */
intro.addEventListener("click", () => {
  intro.style.display = "none";
  game.style.display = "flex";
  showScreen(screenStart);
});

/* Start => players */
startBtn.addEventListener("click", () => {
  showScreen(screenPlayers);
});

/* Next => pick envelopes */
nextBtn.addEventListener("click", () => {
  goToCards();
});

/* Back buttons */
backToPlayers.addEventListener("click", () => showScreen(screenPlayers));

backFromCongrats.addEventListener("click", () => {
  viewedEnvelopes.env1 = true;
  goToCards();
});

backFromLetter.addEventListener("click", () => {
  viewedEnvelopes.env2 = true;
  goToCards();
});

backFromRizz.addEventListener("click", () => {
  viewedEnvelopes.env3 = true;
  goToCards();
});

backFromQuestion.addEventListener("click", () => {
  showScreen(screenCards);
});

/* Envelope double-click behavior:
   1st click: open (closed -> opened)
   2nd click: go to screen
*/
function bindEnvelope(img, onSecondClick) {
  img.dataset.state = "closed";

  img.addEventListener("click", () => {
    if (img.dataset.state === "closed") {
      img.src = "purple open.png";
      img.dataset.state = "opened";
      return;
    }
    onSecondClick();
  });
}

bindEnvelope(env1, () => showScreen(screenCongrats));
bindEnvelope(env2, () => showScreen(screenLetter));
bindEnvelope(env3, () => showScreen(screenRizz));

/* Date? button => question screen */
dateBtn.addEventListener("click", () => {
  showScreen(screenQuestion);
});

/* YES => end */
yesBtn.addEventListener("click", () => {
  showScreen(screenEnd);
});

/* NO button runs away */
function moveNoButton() {
  const min = 200;
  const max = 200;

  const distance = Math.random() * (max - min) + min;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.25s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", moveNoButton);

noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

/* Play again => reset to very beginning */
playAgainBtn.addEventListener("click", resetAllToBeginning);