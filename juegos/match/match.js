// match.js — versión corregida: comparaciones con URLs absolutas + recordatorio si no responde
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
  let selectedSeed = null;      // almacena URL absoluta
  let selectedFlower = null;    // almacena URL absoluta
  let score = 0;

  const plantNameEl = document.getElementById("plantName");
  const seedOptionsEl = document.getElementById("seedOptions");
  const flowerOptionsEl = document.getElementById("flowerOptions");
  const nextBtn = document.getElementById("nextBtn");
  const feedbackEl = document.getElementById("feedback");
  const exitBtn = document.getElementById("salirmenu");

  if (!plantNameEl || !seedOptionsEl || !flowerOptionsEl || !nextBtn || !feedbackEl || !exitBtn) {
    console.error("match.js: falta algún elemento DOM requerido.");
    return;
  }

  exitBtn.addEventListener("click", () => { window.location.href = "../../index.html"; });

  function shuffle(array) { return array.sort(() => Math.random() - 0.5); }

  function absUrl(rel) {
    // normaliza ruta relativa a URL absoluta coherente
    return new URL(rel, location.href).href;
  }

  function resetContainers() {
    seedOptionsEl.innerHTML = "";
    flowerOptionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    feedbackEl.style.color = "";
    selectedSeed = null;
    selectedFlower = null;
    nextBtn.disabled = false; // dejamos enabled para que el usuario vea el recordatorio si intenta avanzar sin responder
    nextBtn.removeAttribute("data-feedback");
  }

  function createOption(src, containerEl, onSelect) {
    const wrapper = document.createElement("div");
    wrapper.className = "img-container";

    const img = document.createElement("img");
    img.src = src;                 // src relativo visible
    img.dataset.abs = absUrl(src); // almacena URL absoluta para comparaciones
    img.className = "option";
    img.loading = "lazy";
    img.alt = "";

    const emoji = document.createElement("span");
    emoji.className = "emoji";

    wrapper.appendChild(img);
    wrapper.appendChild(emoji);
    containerEl.appendChild(wrapper);

    img.addEventListener("click", () => {
      // Si estamos en modo feedback (después de pulsar Next y antes de avanzar), no permitimos cambiar selección
      if (nextBtn.getAttribute("data-feedback") === "on") return;
      onSelect(img.dataset.abs, img, wrapper);
    });

    return { wrapper, img, emoji };
  }

  function loadPlant(index) {
    resetContainers();
    const plant = plants[index];
    plantNameEl.textContent = plant.label;

    // seeds
    const seedPool = [plant.seed];
    while (seedPool.length < 3) {
      const candidate = plants[Math.floor(Math.random() * plants.length)].seed;
      if (!seedPool.includes(candidate)) seedPool.push(candidate);
    }
    shuffle(seedPool).forEach(src => {
      createOption(src, seedOptionsEl, (abs, imgEl) => {
        selectedSeed = abs;                      // guardamos URL absoluta
        seedOptionsEl.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
        imgEl.classList.add("selected");
        feedbackEl.textContent = "";
      });
    });

    // flowers
    const flowerPool = [plant.flower];
    while (flowerPool.length < 3) {
      const candidate = plants[Math.floor(Math.random() * plants.length)].flower;
      if (!flowerPool.includes(candidate)) flowerPool.push(candidate);
    }
    shuffle(flowerPool).forEach(src => {
      createOption(src, flowerOptionsEl, (abs, imgEl) => {
        selectedFlower = abs;
        flowerOptionsEl.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
        imgEl.classList.add("selected");
        feedbackEl.textContent = "";
      });
    });
  }

  function showFeedbackForCurrentPlant() {
    const plant = plants[currentIndex];
    const plantSeedAbs = absUrl(plant.seed);
    const plantFlowerAbs = absUrl(plant.flower);

    let correctSeed = false;
    let correctFlower = false;

    // marcar semillas
    seedOptionsEl.querySelectorAll(".img-container").forEach(c => {
      const img = c.querySelector("img");
      const emoji = c.querySelector(".emoji");
      // limpiar posibles clases
      c.classList.remove("correct", "wrong");
      emoji.textContent = "";

      if (img.dataset.abs === plantSeedAbs) {
        c.classList.add("correct");
        emoji.textContent = "✅";
        if (selectedSeed === img.dataset.abs) correctSeed = true;
      } else if (selectedSeed === img.dataset.abs) {
        c.classList.add("wrong");
        emoji.textContent = "❌";
      }
    });

    // marcar flores
    flowerOptionsEl.querySelectorAll(".img-container").forEach(c => {
      const img = c.querySelector("img");
      const emoji = c.querySelector(".emoji");
      c.classList.remove("correct", "wrong");
      emoji.textContent = "";

      if (img.dataset.abs === plantFlowerAbs) {
        c.classList.add("correct");
        emoji.textContent = "✅";
        if (selectedFlower === img.dataset.abs) correctFlower = true;
      } else if (selectedFlower === img.dataset.abs) {
        c.classList.add("wrong");
        emoji.textContent = "❌";
      }
    });

    // texto de feedback
    if (correctSeed && correctFlower) {
      score++;
      feedbackEl.textContent = "✅ ¡Muy bien! Ambas selecciones son correctas.";
      feedbackEl.style.color = "green";
    } else if (correctSeed || correctFlower) {
      score += 0.5;
      feedbackEl.textContent = "🟡 Has acertado una de las dos.";
      feedbackEl.style.color = "orange";
    } else {
      feedbackEl.textContent = "❌ Ambas selecciones son incorrectas.";
      feedbackEl.style.color = "red";
    }
  }

  // handler nextBtn
  nextBtn.addEventListener("click", () => {
    // Si aún no ha seleccionado ambas opciones, damos recordatorio (no avanzamos)
    if (!selectedSeed || !selectedFlower) {
      feedbackEl.textContent = "Por favor, selecciona una semilla y una flor antes de continuar.";
      feedbackEl.style.color = "var(--darkbrown)" || "brown";
      // limpiamos el mensaje en 2s para que el usuario no quede atascado visualmente
      setTimeout(() => { if (feedbackEl.textContent.includes("Por favor")) feedbackEl.textContent = ""; }, 2000);
      return;
    }

    // activamos modo feedback para bloquear cambios de selección
    nextBtn.setAttribute("data-feedback", "on");
    nextBtn.disabled = true;

    // mostramos quién era correcto y quién no
    showFeedbackForCurrentPlant();

    // esperar 1.5s y avanzar
    setTimeout(() => {
      nextBtn.removeAttribute("data-feedback");
      currentIndex++;
      if (currentIndex >= plants.length) {
        plantNameEl.textContent = "🌿 ¡Juego completado!";
        seedOptionsEl.innerHTML = `<p>Tu puntuación: ${score} / ${plants.length}</p>`;
        flowerOptionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        nextBtn.style.display = "none";
      } else {
        loadPlant(currentIndex);
      }
    }, 1500);
  });

  // iniciar
  loadPlant(currentIndex);
});
