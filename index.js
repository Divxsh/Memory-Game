let images = [
  "./images/img1.png",
  "./images/img2.png",
  "./images/img3.png",
  "./images/img4.png",
  "./images/img5.png",
  "./images/img6.png",
];

let imgName = ["cool", "love", "laughing", "sad", "scared", "happy"];
images = [...images, ...images];
imgName = [...imgName, ...imgName];

let target = document.querySelectorAll(".back");
for (let item of target) {
  let len = images.length;
  let rand = Math.floor(Math.random() * len) + 0;
  item.parentElement.dataset.framework = imgName[rand];
  item.style.backgroundImage = `url(${images[rand]})`;
  images.splice(rand, 1);
  imgName.splice(rand, 1);
}
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let reaminMoves = 20;
let totalCombo = 0;
let remain = document.querySelector(".remain-moves");

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");
  this.classList.remove("active");
  reaminMoves--;
  remain.innerText = reaminMoves;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();

  if (reaminMoves == 0 || totalCombo == 6) {
    checkMoves();
  }
}

function checkForMatch() {
  lockBoard = true;
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  totalCombo++;

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.add("active");
    secondCard.classList.add("active");

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
cards.forEach((item) => item.addEventListener("click", flipCard));

function checkMoves() {
  let popup = document.querySelector(".popup");
  let result = document.querySelector(".popup > div >h2");
  if (totalCombo == 6) {
    popup.style.display = "flex";
    result.innerText = "You Won!!";
  } else {
    popup.style.display = "flex";
    result.innerText = "You Lose !!";
  }
}

let reloadbtn = document.querySelector(".popup > div > button");
reloadbtn.addEventListener("click", () => {
  window.location.reload();
});
