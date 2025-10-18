document.addEventListener("DOMContentLoaded", () => {

  const levels = [
    { pairs: 2, size: "large" },
    { pairs: 4, size: "medium" },
    { pairs: 6, size: "small" },
    { pairs: 9, size: "xsmall" },
  ];

  let currentLevel = 0;
  let firstCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  const board = document.getElementById("memory-board");
  const messageBox = document.getElementById("message-box");
  const messageText = document.getElementById("message-text");
  const nextButton = document.getElementById("next-level");
  const menuButton = document.getElementById("menu-button");

const flowerImages = [
  16, 21, 22, 18, 28, 27, 30, 29, 26, 17, 20, 24, 25, 23, 19
].map(num => `../../assets/imagenes/flores/${num}.png`);

  // Botón menú
  menuButton.addEventListener("click", () => {
    window.location.href = "../../index.html";
  });

  function startLevel() {
    const { pairs, size } = levels[currentLevel];
    matchedPairs = 0;
    firstCard = null;
    lockBoard = false;
    board.innerHTML = "";
    board.className = `board ${size}`;

    const selectedImages = flowerImages.slice(0, pairs);
    const cards = shuffle([...selectedImages, ...selectedImages]);

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
        if (matchedPairs === levels[currentLevel].pairs) {
          setTimeout(() => showMessage("¡Nivel superado! 🌸"), 600);
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

  function showMessage(text) {
    messageText.textContent = text;
    messageBox.classList.add("show");
    nextButton.style.display = "block";
  }

  nextButton.addEventListener("click", () => {
    messageBox.classList.remove("show");
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      startLevel();
    } else {
      messageText.textContent = "🎉 ¡Has completado el juego de las flores! 🌼";
      nextButton.style.display = "none";
      messageBox.classList.add("show");
    }
  });

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  startLevel();

});
