// match.js — juego de emparejar (drag & drop)
(async function(){
  const root = document.getElementById('gameRoot');
  const startBtn = document.getElementById('startBtn');
  // pagination state for mobile
  let page = 0;
  const PAGE_SIZE = 5;

  async function loadData(){
    try{
      const res = await fetch('data/match.json');
      if(!res.ok) throw new Error('No se pudo cargar data/match.json');
      return await res.json();
    }catch(e){
      console.error(e);
      root.innerHTML = '<p>Error al cargar el juego. Comprueba que existe <code>data/match.json</code>.</p>';
      return null;
    }
  }

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
  }

  function createBoard(items){
    root.innerHTML='';
    const board = document.createElement('div'); board.className='match-board';

    const imagesCol = document.createElement('div'); imagesCol.className='images-col';
    const labelsCol = document.createElement('div'); labelsCol.className='labels-col';

    // pagination controls (mobile)
    const pager = document.createElement('div'); pager.className='pager-controls';
    const prevBtn = document.createElement('button'); prevBtn.className='btn'; prevBtn.textContent='‹ Anteriores';
    const nextBtn = document.createElement('button'); nextBtn.className='btn'; nextBtn.textContent='Siguientes ›';
    pager.appendChild(prevBtn); pager.appendChild(nextBtn);
    root.appendChild(pager);

    // draggable images
      // determine slice based on page
      let imagesToShow = items.images;
      if(items.images.length > PAGE_SIZE){
        const start = page * PAGE_SIZE;
        imagesToShow = items.images.slice(start, start + PAGE_SIZE);
      }

      imagesToShow.forEach(img=>{
        const d = document.createElement('div'); d.className='draggable'; d.draggable=true; d.dataset.key=img.key;
        const image = document.createElement('img'); image.src = img.src; image.alt = img.key;
        d.appendChild(image);
        imagesCol.appendChild(d);

        // Drag start (desktop)
        d.addEventListener('dragstart', (ev)=>{
          try{ ev.dataTransfer.setData('text/plain', img.key); ev.dataTransfer.effectAllowed = 'move'; }catch(e){}
          // mark as dragging
          d.classList.add('dragging');
        });

        d.addEventListener('dragend', ()=>{
          d.classList.remove('dragging');
        });

        // Click to select (touch-friendly): click once to pick, click target to drop
          d.addEventListener('click', ()=>{
            // toggle selection
            const already = d.classList.contains('selected-for-drop');
            document.querySelectorAll('.draggable.selected-for-drop').forEach(el=>el.classList.remove('selected-for-drop'));
            if(!already) d.classList.add('selected-for-drop');
          });

          // Touch support: create a floating clone that follows the finger
          let touchClone = null;
          d.addEventListener('touchstart', (ev)=>{
            ev.preventDefault();
            document.querySelectorAll('.draggable.selected-for-drop').forEach(el=>el.classList.remove('selected-for-drop'));
            d.classList.add('selected-for-drop');
            const touch = ev.touches[0];
            touchClone = d.cloneNode(true);
            touchClone.style.position='fixed';
            touchClone.style.pointerEvents='none';
            touchClone.style.opacity='0.9';
            touchClone.style.transform='translate(-50%,-50%)';
            touchClone.style.left = touch.clientX + 'px';
            touchClone.style.top = touch.clientY + 'px';
            touchClone.classList.add('dragging');
            document.body.appendChild(touchClone);
          }, {passive:false});

          d.addEventListener('touchmove', (ev)=>{
            if(!touchClone) return;
            const touch = ev.touches[0];
            touchClone.style.left = touch.clientX + 'px';
            touchClone.style.top = touch.clientY + 'px';
          }, {passive:true});

          d.addEventListener('touchend', (ev)=>{
            if(!touchClone) return;
            const touch = ev.changedTouches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            if(el){
              const target = el.closest('.drop-target');
              if(target){
                // perform drop logic
                const key = d.dataset.key;
                if(target.dataset.filled === 'true'){
                  const prevKey = target.dataset.value;
                  const prevEl = document.querySelector(`.draggable[data-key="${prevKey}"]`);
                  if(prevEl) document.querySelector('.images-col').appendChild(prevEl);
                }
                target.dataset.filled='true';
                target.dataset.value=key;
                target.classList.add('filled');
                d.classList.remove('selected-for-drop');
                d.style.opacity='0.85';
                d.remove();
                target.appendChild(d);
              }
            }
            touchClone.remove();
            touchClone = null;
          }, {passive:false});
      });

    // drop targets
    items.labels.forEach(lbl=>{
      const t = document.createElement('div'); t.className='drop-target'; t.dataset.key=lbl.key; t.textContent = lbl.label;
      labelsCol.appendChild(t);

      t.addEventListener('dragover',(ev)=>{ ev.preventDefault(); });
      t.addEventListener('drop',(ev)=>{
        ev.preventDefault();
        const key = ev.dataTransfer.getData('text/plain');
        // mover el draggable a este target
        const dragged = document.querySelector(`.draggable[data-key="${key}"]`);
        if(!dragged) return;
        // si target ya tiene un hijo, devolverlo
        if(t.dataset.filled === 'true'){
          const prevKey = t.dataset.value;
          const prevEl = document.querySelector(`.draggable[data-key="${prevKey}"]`);
          if(prevEl) document.querySelector('.images-col').appendChild(prevEl);
        }
        t.dataset.filled='true';
        t.dataset.value=key;
        t.classList.add('filled');
        dragged.style.opacity='0.85';
        // mover elemento visualmente dentro del target
        dragged.remove();
        const small = document.createElement('div'); small.style.fontSize='12px'; small.textContent='(imagen)';
        t.appendChild(dragged);
      });
      // allow click-to-drop when an element is selected
      t.addEventListener('click', ()=>{
        const sel = document.querySelector('.draggable.selected-for-drop');
        if(!sel) return;
        const key = sel.dataset.key;
        // same logic as drop
        if(t.dataset.filled === 'true'){
          const prevKey = t.dataset.value;
          const prevEl = document.querySelector(`.draggable[data-key="${prevKey}"]`);
          if(prevEl) document.querySelector('.images-col').appendChild(prevEl);
        }
        t.dataset.filled='true';
        t.dataset.value=key;
        t.classList.add('filled');
        sel.classList.remove('selected-for-drop');
        sel.style.opacity='0.85';
        sel.remove();
        t.appendChild(sel);
      });
    });

    board.appendChild(imagesCol);
    board.appendChild(labelsCol);
    root.appendChild(board);

  // pager actions
  prevBtn.disabled = page === 0;
  nextBtn.disabled = (page+1)*PAGE_SIZE >= items.images.length;
  prevBtn.addEventListener('click', ()=>{ if(page>0){ page--; createBoard(items); } });
  nextBtn.addEventListener('click', ()=>{ if((page+1)*PAGE_SIZE < items.images.length){ page++; createBoard(items); } });
  }

  function grade(items){
    const targets = Array.from(document.querySelectorAll('.drop-target'));
    let correct = 0;
    targets.forEach(t=>{
      if(t.dataset.filled === 'true'){
        if(t.dataset.value === t.dataset.key) correct++;
      }
    });
    return {correct,total:targets.length};
  }

  async function start(){
    const data = await loadData();
    if(!data) return;
    // Prepare items: map images and labels
    const images = data.map(i=>({key:i.key, src:i.src}));
    const labels = data.map(i=>({key:i.key, label:i.label}));
    shuffle(images); shuffle(labels);
    createBoard({images,labels});

    // attach end game button
    const endBtn = document.createElement('button'); endBtn.className='btn'; endBtn.textContent='Comprobar';
    endBtn.addEventListener('click', ()=>{
      const res = grade(data);
      alert(`Has acertado ${res.correct} de ${res.total}`);
    });
    root.appendChild(endBtn);
  }

  startBtn.addEventListener('click', start);
  // reset handled by reloading via navigation; no reset button

  // auto start
  //start();
})();
