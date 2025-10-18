const quizData = [
    {
        "id": 1,
        "type": "mcq",
        "question": "¿Qué materiales básicos se utilizan para hacer una bomba de semillas?",
        "options": [
            "Arcilla, compost y semillas",
            "Arena, sal y semillas",
            "Cemento, agua y tierra",
            "Barro, piedra y hojas"
        ],
        "answer": 0,
        "explain": "La mezcla tradicional incluye arcilla para proteger, compost para nutrir y semillas para germinar."
    },
    {
        "id": 2,
        "type": "mcq",
        "question": "¿Quién popularizó las bombas de semillas en los años 70?",
        "options": [
            "Wangari Maathai",
            "Masanobu Fukuoka",
            "David Attenborough",
            "Vandana Shiva"
        ],
        "answer": 1,
        "explain": "El agricultor japonés Masanobu Fukuoka promovió su uso como parte de la agricultura natural."
    },
    {
        "id": 3,
        "type": "mcq",
        "question": "¿Qué función cumple la arcilla en una bomba de semillas?",
        "options": [
            "Proteger las semillas y mantener la humedad",
            "Aportar color",
            "Acelerar la germinación por calor",
            "Fijar nitrógeno en el suelo"
        ],
        "answer": 0,
        "explain": "La arcilla protege las semillas de animales y mantiene la humedad hasta que llueve."
    },
    {
        "id": 4,
        "type": "mcq",
        "question": "¿Cuál es la proporción recomendada de materiales para hacer bombas de semillas?",
        "options": [
            "3 partes arcilla, 2 partes compost, 1 parte semillas",
            "2 partes semillas, 2 partes arcilla, 1 parte agua",
            "1 parte tierra, 1 parte agua, 1 parte arcilla",
            "5 partes compost, 1 parte semillas"
        ],
        "answer": 0,
        "explain": "Esta mezcla equilibra protección, nutrientes y capacidad de germinación."
    },
    {
        "id": 5,
        "type": "mcq",
        "question": "¿Cuándo es mejor lanzar las bombas de semillas?",
        "options": [
            "En invierno",
            "En verano seco",
            "En primavera u otoño",
            "Durante heladas"
        ],
        "answer": 2,
        "explain": "Primavera y otoño son ideales porque hay humedad y temperaturas suaves."
    },
    {
        "id": 6,
        "type": "mcq",
        "question": "¿Dónde NO se deben lanzar bombas de semillas?",
        "options": [
            "Zonas degradadas",
            "Junto a zonas de cultivo",
            "Espacios protegidos",
            "Terrenos urbanos vacíos con permiso"
        ],
        "answer": 2,
        "explain": "No deben lanzarse en áreas naturales protegidas sin autorización para evitar alterar ecosistemas."
    },
    {
        "id": 7,
        "type": "mcq",
        "question": "¿Qué beneficios aportan las bombas de semillas?",
        "options": [
            "Fomentan la biodiversidad y atraen polinizadores",
            "Reducen la lluvia",
            "Controlan plagas químicas",
            "Sirven como decoración temporal"
        ],
        "answer": 0,
        "explain": "Aumentan la biodiversidad local y favorecen abejas, mariposas y otros polinizadores."
    },
    {
        "id": 8,
        "type": "mcq",
        "question": "¿Qué especie autóctona vasca ayuda a fijar nitrógeno en el suelo?",
        "options": [
            "Lotus corniculatus (pie de pájaro / trébol de pájaro)",
            "Papaver rhoeas (amapola común)",
            "Lavandula angustifolia (lavanda)",
            "Bellis perennis (margarita común)"
        ],
        "answer": 0,
        "explain": "El pie de pájaro (Lotus corniculatus) es una leguminosa nativa que mejora el suelo fijando nitrógeno.",
        "common_names": {
            "Lotus corniculatus": "pie de pájaro / trébol de pájaro",
            "Papaver rhoeas": "amapola común",
            "Lavandula angustifolia": "lavanda",
            "Bellis perennis": "margarita común"
        }
    },
    {
        "id": 9,
        "type": "mcq",
        "question": "¿Qué flor silvestre autóctona es conocida por atraer mariposas y tener floración vistosa?",
        "options": [
            "Malva sylvestris (malva común)",
            "Centaurea nigra (aciano silvestre/centaura)",
            "Urtica dioica (ortiga)",
            "Digitalis purpurea (dedalera)"
        ],
        "answer": 1,
        "explain": "La Centaurea nigra o aciano silvestre atrae mariposas y florece durante largo tiempo.",
        "common_names": {
            "Malva sylvestris": "malva común",
            "Centaurea nigra": "aciano silvestre / centaura",
            "Urtica dioica": "ortiga",
            "Digitalis purpurea": "dedalera / digitalis (tóxica)"
        }
    },
    {
        "id": 10,
        "type": "mcq",
        "question": "¿Qué especie nativa sirve de alimento para las orugas de muchas mariposas?",
        "options": [
            "Urtica dioica (ortiga)",
            "Thymus vulgaris (tomillo)",
            "Lavandula angustifolia (lavanda)",
            "Foeniculum vulgare (hinojo)"
        ],
        "answer": 0,
        "explain": "La ortiga verde (Urtica dioica) es fundamental para varias especies de mariposas locales.",
        "common_names": {
            "Urtica dioica": "ortiga mayor",
            "Thymus vulgaris": "tomillo",
            "Lavandula angustifolia": "lavanda",
            "Foeniculum vulgare": "hinojo"
        }
    },
    {
        "id": 11,
        "type": "mcq",
        "question": "¿Qué proporción de anuales y perennes se recomienda en una mezcla equilibrada?",
        "options": [
            "60% anuales, 40% perennes",
            "50% perennes, 50% arbustos",
            "30% semillas exóticas, 70% ornamentales",
            "90% anuales, 10% árboles"
        ],
        "answer": 0,
        "explain": "Combinar anuales y perennes asegura floración continua y diversidad a largo plazo."
    },
    {
        "id": 12,
        "type": "mcq",
        "question": "¿Qué especie aromática autóctona es melífera y resistente a la sequía?",
        "options": [
            "Thymus vulgaris (tomillo)",
            "Mentha suaveolens (menta suave)",
            "Origanum vulgare (orégano silvestre)",
            "Achillea ptarmica (milenrama blanca)"
        ],
        "answer": 2,
        "explain": "El orégano silvestre atrae polinizadores y soporta bien condiciones secas.",
        "common_names": {
            "Thymus vulgaris": "tomillo",
            "Mentha suaveolens": "menta suave",
            "Origanum vulgare": "orégano silvestre",
            "Achillea ptarmica": "milenrama blanca"
        }
    },
    {
        "id": 13,
        "type": "mcq",
        "question": "¿Qué paso es importante después de formar las bombas de semillas?",
        "options": [
            "Dejarlas secar a la sombra 1–2 días",
            "Hornearlas",
            "Enterrarlas profundamente",
            "Pintarlas de colores"
        ],
        "answer": 0,
        "explain": "El secado a la sombra endurece la arcilla sin dañar las semillas."
    },
    {
        "id": 14,
        "type": "mcq",
        "question": "¿Qué principio ecológico resume la idea de las bombas de semillas?",
        "options": [
            "Sembrar también es cuidar",
            "Cuanto más, mejor",
            "Importa más el color que la especie",
            "Todas las semillas son iguales"
        ],
        "answer": 0,
        "explain": "El respeto al entorno y la selección de especies nativas son esenciales para no dañar ecosistemas."
    },
    {
        "id": 15,
        "type": "mcq",
        "question": "¿Qué material orgánico se recomienda mezclar con la arcilla para nutrir las semillas?",
        "options": [
            "Compost o vermicompost",
            "Arena fina",
            "Ceniza",
            "Turba sin tratar"
        ],
        "answer": 0,
        "explain": "El compost aporta nutrientes y mejora la textura del sustrato."
    },
    {
        "id": 16,
        "type": "mcq",
        "question": "¿Qué tamaño aproximado deben tener las bombas de semillas?",
        "options": [
            "Como una canica o una nuez",
            "Como una pelota de tenis",
            "Como un grano de arroz",
            "Como un ladrillo pequeño"
        ],
        "answer": 0,
        "explain": "El tamaño ideal es de 1–2 cm, fácil de lanzar y con buena protección para las semillas."
    },
    {
        "id": 17,
        "type": "mcq",
        "question": "¿Qué especie autóctona es resistente y produce flores comestibles?",
        "options": [
            "Malva sylvestris (malva común)",
            "Papaver rhoeas (amapola común)",
            "Bellis perennis (margarita común)",
            "Calendula officinalis (caléndula)"
        ],
        "answer": 0,
        "explain": "La malva común (Malva sylvestris) es autóctona, comestible y atractiva para polinizadores.",
        "common_names": {
            "Malva sylvestris": "malva común",
            "Papaver rhoeas": "amapola común",
            "Bellis perennis": "margarita común",
            "Calendula officinalis": "caléndula"
        }
    },
    {
        "id": 18,
        "type": "mcq",
        "question": "¿Qué parte de la bomba de semillas ayuda a retener la humedad?",
        "options": [
            "Arcilla",
            "Compost",
            "Semilla",
            "Piedra molida"
        ],
        "answer": 0,
        "explain": "La arcilla mantiene la humedad necesaria para que la semilla no se seque antes de germinar."
    },
    {
        "id": 19,
        "type": "mcq",
        "question": "¿Qué objetivo principal tienen las bombas de semillas?",
        "options": [
            "Restaurar y reverdecer espacios degradados",
            "Fabricar juguetes ecológicos",
            "Reproducir especies exóticas",
            "Decoración temporal"
        ],
        "answer": 0,
        "explain": "Su propósito es regenerar espacios y favorecer la biodiversidad local de forma sencilla y respetuosa."
    },
    {
        "id": 20,
        "type": "mcq",
        "question": "¿Qué debes evitar al seleccionar semillas para bombas de semillas?",
        "options": [
            "Semillas de especies invasoras",
            "Semillas nativas locales",
            "Semillas adaptadas a la zona",
            "Semillas de flores melíferas"
        ],
        "answer": 0,
        "explain": "Es importante no usar especies invasoras que puedan desplazar a la flora local; se recomienda seleccionar especies nativas y adaptadas al clima local."
    }
];

let current = 0;
let score = 0; // contador de aciertos
const container = document.getElementById('quiz-container');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');

nextBtn.style.display = 'none'; // ocultamos inicialmente

function showQuestion() {
    resultDiv.innerHTML = '';
    nextBtn.style.display = 'none'; // ocultamos el botón hasta que respondan

    container.innerHTML = '';
    const q = quizData[current];

    const questionEl = document.createElement('h2');
    questionEl.textContent = q.question;
    container.appendChild(questionEl);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'btn option-btn';
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);
}

function checkAnswer(selected, btn) {
    const q = quizData[current];
    const buttons = document.querySelectorAll('.option-btn');

    // Deshabilitar todas las opciones
    buttons.forEach(b => b.disabled = true);

    // Mostrar correctas/incorrectas con clases CSS
    buttons.forEach((b, i) => {
        if (i === q.answer) b.classList.add('correct');
        if (i === selected && i !== q.answer) b.classList.add('wrong');
    });

    // Actualizar contador de aciertos
    if (selected === q.answer) {
        score++;
        resultDiv.innerHTML = `✅ Correcto! <br><small>${q.explain}</small>`;
    } else {
        resultDiv.innerHTML = `❌ Incorrecto. <br><small>${q.explain}</small>`;
    }

    // Mostrar botón siguiente
    nextBtn.style.display = 'inline-block';
}

// Botón "Salir al menú"
document.getElementById('exitBtn').addEventListener('click', () => {
    window.location.href = '../../index.html';
});

// Botón siguiente
nextBtn.onclick = () => {
    current++;
    if(current < quizData.length) {
        showQuestion();
    } else {
        // Mostrar resultado final
        container.innerHTML = `<h2>¡Has completado el quiz!</h2>
                               <p>Acertaste ${score} de ${quizData.length} preguntas.</p>
                               <p>Porcentaje de aciertos: ${Math.round((score / quizData.length) * 100)}%</p>`;
        resultDiv.innerHTML = '';
        nextBtn.style.display = 'none';
    }
}

showQuestion();
