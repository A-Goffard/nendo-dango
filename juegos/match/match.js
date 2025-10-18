document.addEventListener("DOMContentLoaded", () => {

  const plants = [
    { label: "Hinojo", seed: "../../assets/imagenes/semillas/1.png", flower: "../../assets/imagenes/flores/16.png" },
    { label: "Ajenuz", seed: "../../assets/imagenes/semillas/2.png", flower: "../../assets/imagenes/flores/21.png" },
    { label: "Lino", seed: "../../assets/imagenes/semillas/3.png", flower: "../../assets/imagenes/flores/22.png" },
    { label: "Mostaza", seed: "../../assets/imagenes/semillas/4.png", flower: "../../assets/imagenes/flores/18.png" },
    { label: "Chía", seed: "../../assets/imagenes/semillas/5.png", flower: "../../assets/imagenes/flores/28.png" },
    { label: "Amapola", seed: "../../assets/imagenes/semillas/6.png", flower: "../../assets/imagenes/flores/27.png" },
    { label: "Mungo", seed: "../../assets/imagenes/semillas/7.png", flower: "../../assets/imagenes/flores/30.png" },
    { label: "Soja", seed: "../../assets/imagenes/semillas/8.png", flower: "../../assets/imagenes/flores/29.png" },
    { label: "Maiz", seed: "../../assets/imagenes/semillas/9.png", flower: "../../assets/imagenes/flores/26.png" },
    { label: "Alpiste", seed: "../../assets/imagenes/semillas/10.png", flower: "../../assets/imagenes/flores/17.png" },
    { label: "Puerro", seed: "../../assets/imagenes/semillas/11.png", flower: "../../assets/imagenes/flores/20.png" },
    { label: "Cilantro", seed: "../../assets/imagenes/semillas/12.png", flower: "../../assets/imagenes/flores/24.png" },
    { label: "Zanahoria", seed: "../../assets/imagenes/semillas/13.png", flower: "../../assets/imagenes/flores/25.png" },
    { label: "Perejil", seed: "../../assets/imagenes/semillas/14.png", flower: "../../assets/imagenes/flores/23.png" },
    { label: "Cebollino", seed: "../../assets/imagenes/semillas/15.png", flower: "../../assets/imagenes/flores/19.png" }
  ];

  let currentIndex = 0;
  let selectedSeed = null;
  let selectedFlower = null;
  let score = 0;

  const plantNameEl = document.getElementById("plantName");
  const seedOptionsEl = document.getElementById("seedOptions");
  const flowerOptionsEl = document.getElementById("flowerOptions");
  const nextBtn = document.getElementById("nextBtn");
  const exitBtn = document.getElementById("salirmenu");

  // Botón salir al menú
  exitBtn.addEventListener("click", () => {
    window.location.href = '../../index.html';
  });

  // Función para mezclar opciones
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Cargar planta actual
  function loadPlant(index) {
    selectedSeed = null;
    selectedFlower = null;
    nextBtn.disabled = true;

    const plant = plants[index];
    plantNameEl.textContent = plant.label;

    // --- Semillas ---
    let seedChoices = [plant.seed];
    while (seedChoices.length < 3) {
      const rand = plants[Math.floor(Math.random() * plants.length)].seed;
      if (!seedChoices.includes(rand)) seedChoices.push(rand);
    }
    seedChoices = shuffle(seedChoices);

    seedOptionsEl.innerHTML = '';
    seedChoices.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.classList.add('option');
      img.addEventListener('click', () => {
        if (nextBtn.disabled === false) return; // no cambiar selección mientras se muestra feedback
        selectedSeed = src;
        seedOptionsEl.querySelectorAll('img').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        if (selectedSeed && selectedFlower) nextBtn.disabled = false;
      });
      seedOptionsEl.appendChild(img);
    });

    // --- Flores ---
    let flowerChoices = [plant.flower];
    while (flowerChoices.length < 3) {
      const rand = plants[Math.floor(Math.random() * plants.length)].flower;
      if (!flowerChoices.includes(rand)) flowerChoices.push(rand);
    }
    flowerChoices = shuffle(flowerChoices);

    flowerOptionsEl.innerHTML = '';
    flowerChoices.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.classList.add('option');
      img.addEventListener('click', () => {
        if (nextBtn.disabled === false) return;
        selectedFlower = src;
        flowerOptionsEl.querySelectorAll('img').forEach(el => el.classList.remove('selected'));
        img.classList.add('selected');
        if (selectedSeed && selectedFlower) nextBtn.disabled = false;
      });
      flowerOptionsEl.appendChild(img);
    });
  }

  // --- Botón siguiente ---
  nextBtn.addEventListener('click', () => {
    const plant = plants[currentIndex];

    // Mostrar feedback: correcto en verde, incorrecto en rojo
    seedOptionsEl.querySelectorAll('img').forEach(img => {
      img.classList.remove('selected');
      if (img.src.includes(plant.seed)) img.classList.add('correct');
      else if (img.src === selectedSeed) img.classList.add('wrong');
    });

    flowerOptionsEl.querySelectorAll('img').forEach(img => {
      img.classList.remove('selected');
      if (img.src.includes(plant.flower)) img.classList.add('correct');
      else if (img.src === selectedFlower) img.classList.add('wrong');
    });

    // Contar aciertos
    if (selectedSeed === plant.seed) score++;
    if (selectedFlower === plant.flower) score++;

    nextBtn.disabled = true;

    // Esperar 1.5 segundos antes de pasar a la siguiente planta
    setTimeout(() => {
      currentIndex++;
      if (currentIndex >= plants.length) {
        plantNameEl.textContent = '¡Has completado el juego!';
        seedOptionsEl.innerHTML = `<p>Tu puntuación: ${score} / ${plants.length*2}</p>`;
        flowerOptionsEl.innerHTML = '';
        nextBtn.style.display = 'none';
      } else {
        loadPlant(currentIndex);
      }
    }, 1500);
  });

  // Inicializar primera planta
  loadPlant(currentIndex);
});
