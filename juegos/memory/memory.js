const levels = [4, 8, 12, 16, 20, 24]; // cartas por nivel

let currentLevel = 0;
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

const board = document.getElementById("memory-board");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");
const nextButton = document.getElementById("next-level");

// Botón OK para final del juego
const popupOk = document.createElement("button");
popupOk.textContent = "OK";
popupOk.classList.add("menu-button");
popupOk.style.display = "none";
messageBox.appendChild(popupOk);

const flowerImages = Array.from({ length: 15 }, (_, i) => `../../assets/imagenes/flores/${i + 16}.png`);

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startLevel() {
  matchedPairs = 0;
  firstCard = null;
  lockBoard = false;
  board.innerHTML = "";
  board.style.gridTemplateColumns = "repeat(4, 1fr)"; // 4 cartas por fila

  let numCards = levels[currentLevel];
  let selectedImages = shuffle(flowerImages).slice(0, numCards / 2);
  let cards = shuffle([...selectedImages, ...selectedImages]);

  cards.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="${img}" alt="Flor" /></div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, img));
    board.appendChild(card);
  });
}

function flipCard(card, img) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, img };
  } else {
    if (firstCard.img === img) {
      matchedPairs++;
      firstCard = null;
      if (matchedPairs === levels[currentLevel] / 2) {
        if (currentLevel < levels.length - 1) {
          setTimeout(() => showMessage("¡Nivel superado! 🌸"), 600);
        } else {
          setTimeout(() => showMessage("🎉 ¡Has completado el juego de las flores! 🌼", true), 600);
        }
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        card.classList.remove("flipped");
        firstCard.card.classList.remove("flipped");
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}

function showMessage(text, isLastLevel = false) {
  messageText.textContent = text;
  messageBox.classList.add("show");

  if (isLastLevel) {
    nextButton.style.display = "none";
    popupOk.style.display = "inline-block";
    popupOk.onclick = () => window.location.href = "../../index.html";
  } else {
    nextButton.style.display = "inline-block";
    popupOk.style.display = "none";
  }
}

nextButton.addEventListener("click", () => {
  messageBox.classList.remove("show");
  currentLevel++;
  startLevel();
});

const menuButton = document.getElementById("menu-button");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    window.location.href = "../../index.html";
  });
}

// Iniciar primer nivel
startLevel();
