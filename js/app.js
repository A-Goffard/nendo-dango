// app.js — lógica mínima para el quiz
(function () {
    const root = document.getElementById('quiz-root');
    if (!root) return;

    async function loadQuestions() {
        try {
            const res = await fetch('data/questions.json');
            if (!res.ok) throw new Error('No se pudo cargar questions.json');
            return await res.json();
        } catch (e) {
            console.error(e);
            root.innerHTML = '<p>Error al cargar preguntas. Comprueba que existe <code>data/questions.json</code>.</p>';
            return [];
        }
    }

    function renderQuiz(questions) {
        if (!questions || !questions.length) {
            root.innerHTML = '<p>No hay preguntas configuradas.</p>';
            return;
        }

        let current = 0;
        let score = 0;

        const qEl = document.createElement('div');
        const nav = document.createElement('div');

        function showQuestion(i) {
            qEl.innerHTML = '';
            const q = questions[i];
            const qBox = document.createElement('div');
            qBox.className = 'question';
            const title = document.createElement('div');
            title.innerHTML = `<strong>${i + 1}.</strong> ${q.question}`;
            qBox.appendChild(title);

            if (q.type === 'mcq') {
                const opts = document.createElement('div');
                opts.className = 'options';
                q.options.forEach((opt, idx) => {
                    const but = document.createElement('button');
                    but.type = 'button';
                    but.className = 'option';
                    // Si hay mapeo de nombres comunes, mostrar el nombre común junto al nombre científico
                    let label = opt;
                    try {
                        if (q.common_names && q.common_names[opt]) {
                            label = `${opt} (${q.common_names[opt]})`;
                        }
                    } catch (e) { /* ignore */ }
                    but.textContent = label;
                    but.addEventListener('click', () => {
                        const correct = idx === q.answer;
                        if (correct) score++;
                        // show feedback
                        opts.querySelectorAll('.option').forEach(o => o.disabled = true);
                        const explain = document.createElement('div');
                        explain.className = 'results';
                        // Si existe nombre común para la respuesta, mostrarlo también
                        let correctLabel = q.options[q.answer];
                        if (q.common_names && q.common_names[correctLabel]) {
                            correctLabel = `${correctLabel} (${q.common_names[correctLabel]})`;
                        }
                        explain.innerHTML = correct ? '<strong>Correcto ✅</strong><div>' + (q.explain || '') + '</div>' : '<strong>Incorrecto ❌</strong><div>Respuesta: ' + correctLabel + '</div>' + '<div>' + (q.explain || '') + '</div>';
                        qBox.appendChild(explain);
                    });
                    opts.appendChild(but);
                });
                qBox.appendChild(opts);
            }

            qEl.appendChild(qBox);
            // nav
            nav.innerHTML = '';
            const prev = document.createElement('button'); prev.textContent = 'Anterior'; prev.disabled = i === 0;
            const next = document.createElement('button'); next.textContent = i === questions.length - 1 ? 'Finalizar' : 'Siguiente';
            prev.addEventListener('click', () => { current = Math.max(0, current - 1); showQuestion(current); });
            next.addEventListener('click', () => {
                if (current < questions.length - 1) { current++; showQuestion(current); }
                else showResults();
            });
            nav.appendChild(prev); nav.appendChild(next);
        }

        function showResults() {
            root.innerHTML = '';
            const out = document.createElement('div');
            out.innerHTML = `<h2>Resultados</h2><p>Has acertado ${score} de ${questions.length} (${Math.round(score / questions.length * 100)}%)</p><p><a href="index.html">Volver al inicio</a></p>`;
            root.appendChild(out);
        }

        root.innerHTML = '';
        root.appendChild(qEl);
        root.appendChild(nav);
        showQuestion(0);
    }

    loadQuestions().then(renderQuiz);
})();
