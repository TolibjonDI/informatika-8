(function(){
  'use strict';
  const C=SessionCore,$=s=>document.querySelector(s);
  let lesson=null,attempt=null,timer=null,selectedCell=null,selectedWord=null,algorithmIndex=0,disposed=false;
  const wallBase=Date.now(),perfBase=performance.now();
  const now=()=>Math.max(Date.now(),wallBase+performance.now()-perfBase);
  const letterDialog=$('#letter-dialog'),finishDialog=$('#finish-dialog'),celebration=$('#celebration-dialog');
  const instructions=['Savollarni o‘qing va krossvord kataklariga javob yozing. To‘liq to‘g‘ri so‘z uchun 2 ball beriladi.','Har bir xato fikr uchun uni tuzatuvchi javobni tanlang. Vaqt tugaguncha tanlovni o‘zgartirishingiz mumkin.','Bitta algoritmda qadamlarni ↑ va ↓ bilan tartiblang. Butun ketma-ketlik to‘g‘ri bo‘lsa, 10 ball beriladi.'];
  function msg(id,text,type=''){const e=$(id);e.textContent=text;e.className='notice '+type;}
  function screen(id){document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);window.scrollTo(0,0);}
  function closeDialogs(){for(const d of [letterDialog,finishDialog,celebration])if(d.open)d.close();}
  function wordKeys(w){return Array.from({length:w.answer.length},(_,i)=>`${w.r+(w.dir==='down'?i:0)},${w.c+(w.dir==='across'?i:0)}`);}
  function createLesson(id,seed){return LessonBuilder.create(id,seed);}
  function readTopic(){
    const input=$('#topic-input').value.trim().toLocaleLowerCase();
    return LESSON_TOPICS.find(t=>t.title.toLocaleLowerCase()===input||t.keywords.some(k=>input.includes(k)));
  }
  function clearNotice(){$('#global-error').hidden=true;$('#global-error').textContent='';}
  function fail(error){$('#global-error').hidden=false;msg('#global-error',error.message||'Darsni ochib bo‘lmadi.','error');}
  function joinLesson(){
    $('#github-token').value='';
    clearInterval(timer);attempt=null;selectedCell=null;selectedWord=null;closeDialogs();clearNotice();disposed=false;
    $('#pupil-name').value='';$('#pupil-class').value='';msg('#join-message','');
    $('#join-topic').textContent=lesson.title;$('#role-label').textContent='O‘quvchi uchun';
    history.replaceState(null,'',location.pathname+location.search+'#student');screen('join');
  }
  function route(){
    if(location.hash.startsWith('#lesson=')){
      try{const p=new URLSearchParams(location.hash.slice(1));if(p.get('v')!=='4')throw new Error('Bu eski dars havolasi. O‘qituvchidan yangi havola oling.');const raw=p.get('seed');if(!/^\d{1,10}$/.test(raw||''))throw new Error('Dars havolasi yaroqsiz.');lesson=createLesson(p.get('lesson'),Number(raw));joinLesson();}
      catch(error){screen('home');fail(error);}
    }else if(location.hash==='#student'){
      screen('home');fail(new Error('Oldingi urinish o‘chirildi. O‘quvchi bo‘limidan qaytadan kiring.'));
    }
  }
  $('#choose-teacher').onclick=()=>{clearNotice();$('#role-label').textContent='O‘qituvchi uchun';screen('teacher-login');$('#teacher-password').value='';msg('#teacher-login-message','');$('#teacher-password').focus();};
  $('#teacher-login-form').onsubmit=event=>{
    event.preventDefault();
    const password=$('#teacher-password').value;
    $('#teacher-password').value='';
    if(password!=='12345'){msg('#teacher-login-message','Parol noto‘g‘ri. Qayta urinib ko‘ring.','error');$('#teacher-password').focus();return;}
    msg('#teacher-login-message','');screen('teacher');
  };
  $('#cancel-teacher-login').onclick=()=>{$('#teacher-password').value='';msg('#teacher-login-message','');$('#role-label').textContent='Dars laboratoriyasi';screen('home');$('#choose-teacher').focus();};
  $('#choose-student').onclick=()=>{
    clearNotice();lesson=null;attempt=null;$('#github-token').value='';
    $('#role-label').textContent='O‘quvchi uchun';$('#join-topic').textContent='Darsga kirish';
    $('#pupil-name').value='';$('#pupil-class').value='';msg('#join-message','');
    screen('join');$('#pupil-name').focus();
  };
  if(location.hostname.endsWith('.github.io')){
    $('#github-owner').value=location.hostname.split('.')[0];
    $('#github-repo').value=location.pathname.split('/').filter(Boolean)[0]||location.hostname;
  }
  $('#publish-form').onsubmit=async event=>{
    event.preventDefault();if(!lesson)return;
    const prepared=lesson;
    const config={owner:$('#github-owner').value.trim(),repo:$('#github-repo').value.trim(),branch:$('#github-branch').value.trim(),folder:$('#github-folder').value,token:$('#github-token').value.trim()};
    $('#github-token').value='';$('#publish-button').disabled=true;
    msg('#share-message','GitHub’ga yozilmoqda…');
    try{
      await Publishing.publish(config,prepared);
      if(!disposed)msg('#share-message','Dars GitHub’ga yozildi. Pages yangilanishini kuting, so‘ng “Saytda yangilanganini tekshirish”ni bosing.','success');
    }catch(error){if(!disposed)msg('#share-message',error.message,'error');}
    finally{config.token='';$('#publish-button').disabled=false;}
  };
  $('#check-published').onclick=async()=>{
    if(!lesson)return;$('#check-published').disabled=true;
    try{const data=await Publishing.load();const same=data.topic===lesson.id&&data.seed===lesson.seed;
      msg('#share-message',same?'Dars saytda tayyor! O‘quvchilar saytni ochib, O‘quvchi bo‘limiga kirishi mumkin.':'Saytda hali boshqa dars turibdi. Pages yangilanishini kuting va qayta tekshiring.',same?'success':'');
    }catch(error){msg('#share-message',error.message,'error');}
    finally{$('#check-published').disabled=false;}
  };
  for(const topic of LESSON_TOPICS){
    const option=document.createElement('option');option.value=topic.title;$('#topic-list').append(option);
    const b=document.createElement('button');b.type='button';b.textContent=topic.title;b.onclick=()=>{$('#topic-input').value=topic.title;$('#prepare-form').requestSubmit();};$('#topic-buttons').append(b);
  }
  $('#prepare-form').addEventListener('submit',event=>{
    event.preventDefault();clearNotice();
    try{
      const topic=readTopic();if(!topic)throw new Error('Bu mavzu tayyor ro‘yxatda yo‘q. Yuqoridagi 3 ta mavzudan birini tanlang.');
      const seed=crypto.getRandomValues(new Uint32Array(1))[0];lesson=createLesson(topic.id,seed);attempt=null;disposed=false;
      $('#prepared-title').textContent=lesson.title;$('#lesson-ready').hidden=false;
      msg('#teacher-message','Uchala metod tayyor: 5 ta krossvord savoli, 5 ta xatoni top savoli va 1 ta algoritm.','success');
      msg('#share-message','Darsni o‘quvchilarga ochish uchun quyidagi GitHub sozlamalarini to‘ldirib, e’lon qiling.');
    }catch(error){$('#lesson-ready').hidden=true;lesson=null;msg('#teacher-message',error.message,'error');}
  });
  $('#topic-input').addEventListener('input',()=>{$('#lesson-ready').hidden=true;lesson=null;});
  $('#enter-pupil').onclick=()=>{if(lesson)joinLesson();};
  $('#join-form').addEventListener('submit',async event=>{
    event.preventDefault();
    let candidate;
    try{candidate=C.createAttempt($('#pupil-name').value,$('#pupil-class').value);}
    catch(error){msg('#join-message',error.message,'error');return;}
    $('#join-submit').disabled=true;msg('#join-message','Dars yuklanmoqda…');
    try{
      if(!lesson){const data=await Publishing.load();lesson=createLesson(data.topic,data.seed);}
      if(disposed)return;
      attempt=candidate;$('#pupil-name').value='';$('#pupil-class').value='';msg('#join-message','');
      screen('pupil');renderStage();
    }catch(error){msg('#join-message',error.message,'error');}
    finally{$('#join-submit').disabled=false;}
  });
  function renderProgress(){
    $('#method-progress').replaceChildren();C.METHODS.forEach((name,i)=>{const li=document.createElement('li');li.className=attempt.scores[i]!==null?'done':i===attempt.stage?'current':'';if(i===attempt.stage)li.setAttribute('aria-current','step');const num=document.createElement('b');num.textContent=attempt.scores[i]!==null?'✓':String(i+1).padStart(2,'0');const label=document.createElement('span');label.textContent=name;const status=document.createElement('small');status.textContent=attempt.scores[i]!==null?'Yakunlandi':i===attempt.stage?(attempt.status==='active'?'Bajarilmoqda':'Boshlashga tayyor'):'Navbatda';label.append(status);li.append(num,label);$('#method-progress').append(li);});
  }
  function renderStage(){
    $('#pupil-person').textContent=attempt.name+' · '+attempt.classroom+' sinfi';$('#pupil-topic').textContent=lesson.title;renderProgress();
    const active=attempt.status==='active';$('#stage-ready').hidden=active;$('#stage-active').hidden=!active;$('#timer-box').hidden=!active;
    if(!active){$('#ready-count').textContent=attempt.stage===2?'1 ta algoritm':'5 ta savol';$('#ready-number').textContent=`${attempt.stage+1} / 3 METOD`;$('#ready-title').textContent=C.METHODS[attempt.stage];$('#ready-instruction').textContent=instructions[attempt.stage];$('#transition-note').textContent=attempt.stage?`${C.METHODS[attempt.stage-1]} ${attempt.reasons[attempt.stage-1]==='timeout'?'vaqti tugadi va avtomatik yakunlandi.':'yakunlandi.'} Keyingi metod uchun alohida 5 daqiqa beriladi.`:'';return;}
    $('#active-title').textContent=C.METHODS[attempt.stage];
    for(const [i,id] of ['#crossword-area','#error-area','#algorithm-area'].entries())$(id).hidden=i!==attempt.stage;
    if(attempt.stage===0)renderCrossword();else if(attempt.stage===1)renderErrors();else{algorithmIndex=0;renderAlgorithm();}
    updateCount();tick();
  }
  $('#begin-stage').onclick=()=>{if(!attempt||attempt.status!=='ready')return;attempt=C.beginStage(attempt,now());renderStage();clearInterval(timer);timer=setInterval(tick,250);};
  function tick(){
    if(!attempt||attempt.status!=='active')return;
    const secs=C.remaining(attempt,now());$('#timer').textContent=String(Math.floor(secs/60)).padStart(2,'0')+':'+String(secs%60).padStart(2,'0');$('#timer').classList.toggle('urgent',secs<=60);if(secs===0)finalizeStage();
  }
  function guard(){if(C.canEdit(attempt,now()))return true;if(attempt?.status==='active')finalizeStage();return false;}
  function updateCount(){
    const answers=attempt.answers[attempt.stage];let count;
    if(attempt.stage===0)count=lesson.crossword.words.filter(w=>wordKeys(w).every(k=>answers[k])).length;
    else count=Object.keys(answers).length;
    $('#answer-count').textContent=(attempt.stage===2?'Tartiblangan: ':'Javob berilgan: ')+count+' / '+(attempt.stage===2?1:5);
  }
  function selectWord(id){
    selectedWord=lesson.crossword.words.find(w=>w.id===id);const keys=wordKeys(selectedWord);
    document.querySelectorAll('#crossword-clues .clue').forEach(b=>b.classList.toggle('selected',Number(b.dataset.id)===id));
    document.querySelectorAll('#crossword-grid .cell').forEach(b=>b.classList.toggle('highlight',keys.includes(b.dataset.key)));
  }
  function renderCrossword(){
    const puzzle=lesson.crossword;$('#crossword-clues').replaceChildren();
    for(const word of puzzle.words){const li=document.createElement('li'),b=document.createElement('button');b.className='clue';b.dataset.id=word.id;const n=document.createElement('span');n.className='clue-number';n.textContent=word.number+(word.dir==='across'?' →':' ↓');const text=document.createElement('span');text.textContent=word.clue+` (${word.answer.length} harf)`;b.append(n,text);b.onclick=()=>selectWord(word.id);li.append(b);$('#crossword-clues').append(li);}
    const grid=$('#crossword-grid');grid.replaceChildren();grid.style.setProperty('--cols',puzzle.width);grid.style.minWidth=puzzle.width*29+'px';
    for(let r=puzzle.minR;r<puzzle.minR+puzzle.height;r++)for(let c=puzzle.minC;c<puzzle.minC+puzzle.width;c++){
      const key=`${r},${c}`,cell=puzzle.cells.get(key),b=document.createElement(cell?'button':'span');b.className=cell?'cell':'blank';
      if(cell){b.dataset.key=key;b.setAttribute('aria-label',`${r-puzzle.minR+1}-satr, ${c-puzzle.minC+1}-ustun: bo‘sh`);if(cell.number){const n=document.createElement('small');n.textContent=cell.number;b.append(n);}const letter=document.createElement('span');letter.className='cell-letter';b.append(letter);b.onclick=()=>{if(!guard())return;selectedCell=key;if(!selectedWord||!wordKeys(selectedWord).includes(key))selectWord(cell.wordIds[0]);$('#letter-clue').textContent=selectedWord.clue;letterDialog.showModal();};}
      else b.setAttribute('aria-hidden','true');grid.append(b);
    }
  }
  function putLetter(letter){
    if(!guard()||selectedCell===null)return;attempt=C.record(attempt,selectedCell,letter,now());
    const b=[...document.querySelectorAll('#crossword-grid .cell')].find(el=>el.dataset.key===selectedCell);b.querySelector('.cell-letter').textContent=letter;b.classList.toggle('filled',!!letter);b.setAttribute('aria-label',b.getAttribute('aria-label').replace(/:.*$/,': '+(letter||'bo‘sh')));letterDialog.close();b.focus();updateCount();
  }
  for(const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){const b=document.createElement('button');b.textContent=letter;b.setAttribute('aria-label',letter+' harfi');b.onclick=()=>putLetter(letter);$('#letter-choices').append(b);}
  $('#close-letter').onclick=()=>letterDialog.close();$('#erase-letter').onclick=()=>putLetter('');
  letterDialog.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey)return;if(/^[a-z]$/i.test(event.key)){event.preventDefault();putLetter(event.key.toUpperCase());}else if(['Backspace','Delete'].includes(event.key)){event.preventDefault();putLetter('');}});
  function renderErrors(){
    $('#error-area').replaceChildren();lesson.errors.forEach((q,i)=>{
      const card=document.createElement('article');card.className='error-task';const title=document.createElement('h3');title.textContent=`${i+1}. ${q.title}`;const wrong=document.createElement('p');wrong.className='false-statement';wrong.textContent='Xato fikr: “'+q.code.replace(/^[“"]|[”"]$/g,'')+'”';const hint=document.createElement('p');hint.className='small';hint.textContent='Bu fikrni qaysi javob to‘g‘rilaydi?';const options=document.createElement('div');options.className='choices';options.setAttribute('role','group');options.setAttribute('aria-label',`${i+1}-savol javoblari`);
      q.options.forEach((text,j)=>{const label=document.createElement('label');label.className='choice';const input=document.createElement('input');input.type='radio';input.name='error-'+i;input.value=j;input.checked=attempt.answers[1][i]===j;const span=document.createElement('span');span.textContent=text;input.onchange=()=>{if(!guard())return;attempt=C.record(attempt,i,j,now());updateCount();};label.append(input,span);options.append(label);});card.append(title,wrong,hint,options);$('#error-area').append(card);
    });
  }
  function renderAlgorithm(){
    $('#algorithm-buttons').replaceChildren();lesson.algorithms.forEach((q,i)=>{const b=document.createElement('button');b.textContent=i+1;b.setAttribute('aria-label',`${i+1}-topshiriq`);b.classList.toggle('active',i===algorithmIndex);b.classList.toggle('touched',Array.isArray(attempt.answers[2][i]));b.onclick=()=>{if(!guard())return;algorithmIndex=i;renderAlgorithm();};$('#algorithm-buttons').append(b);});
    $('.algorithm-nav').hidden=lesson.algorithms.length===1;
    const task=lesson.algorithms[algorithmIndex],order=attempt.answers[2][algorithmIndex]||lesson.initialOrders[algorithmIndex];
    const card=$('#algorithm-task');card.replaceChildren();const heading=document.createElement('h3');heading.textContent=`${algorithmIndex+1}. ${task.title}`;const text=document.createElement('p');text.className='small';text.textContent='Qadamlarni ↑ va ↓ tugmalari bilan tartiblang. Har bir to‘liq to‘g‘ri ketma-ketlik — 10 ball.';const list=document.createElement('ol');list.className='steps';
    order.forEach((id,index)=>{const row=document.createElement('li'),n=document.createElement('span'),label=document.createElement('span'),controls=document.createElement('div');n.className='step-number';n.textContent=index+1;label.className='step-text';label.textContent=task.steps[id];controls.className='step-controls';for(const [offset,symbol,name] of [[-1,'↑','Yuqoriga'],[1,'↓','Pastga']]){const b=document.createElement('button');b.textContent=symbol;b.setAttribute('aria-label',task.steps[id]+' — '+name);b.disabled=index+offset<0||index+offset>=order.length;b.onclick=()=>{if(!guard())return;const next=order.slice();[next[index],next[index+offset]]=[next[index+offset],next[index]];attempt=C.record(attempt,algorithmIndex,next,now());renderAlgorithm();updateCount();const moved=$('#algorithm-task .steps').children[index+offset];const same=moved.querySelectorAll('button')[offset===-1?0:1];(same.disabled?moved.querySelector('button:not(:disabled)'):same).focus();};controls.append(b);}row.append(n,label,controls);list.append(row);});
    const navigation=document.createElement('div');navigation.className='algorithm-next';for(const [delta,label] of [[-1,'← Oldingi'],[1,'Keyingi →']]){const b=document.createElement('button');b.className='secondary';b.textContent=label;b.disabled=algorithmIndex+delta<0||algorithmIndex+delta>=lesson.algorithms.length;b.onclick=()=>{if(!guard())return;algorithmIndex+=delta;renderAlgorithm();};navigation.append(b);}card.append(heading,text,list);if(lesson.algorithms.length>1)card.append(navigation);
  }
  $('#finish-stage').onclick=()=>{if(guard())finishDialog.showModal();};$('#cancel-finish').onclick=()=>finishDialog.close();$('#confirm-finish').onclick=finalizeStage;
  function finalizeStage(){
    if(!attempt||attempt.status!=='active')return;
    attempt=C.finishStage(attempt,lesson,now());clearInterval(timer);closeDialogs();selectedCell=null;selectedWord=null;
    if(attempt.status==='finished')showResult();else{renderStage();window.scrollTo(0,0);$('#begin-stage').focus();}
  }
  function showResult(){
    const r=C.result(attempt),average=r.average.toFixed(2).replace('.',',');screen('result');$('#role-label').textContent='Dars yakunlandi';
    $('#result-name').textContent=r.name;$('#result-class').textContent=r.classroom+' sinfi';$('#result-average').textContent=average;$('#result-total').textContent=`Jami: ${r.total} / 30 ball`;
    $('#result-breakdown').replaceChildren();C.METHODS.forEach((name,i)=>{const div=document.createElement('div');div.textContent=name;const score=document.createElement('strong');score.textContent=r.scores[i]+' / 10';div.append(score);$('#result-breakdown').append(div);});
    const tier=r.average>=8?2:r.average>=5?1:0;const titles=['Urinishingiz uchun rahmat!','Yaxshi natija! Davom eting!','Ajoyib! Siz uddaladingiz!'];celebration.dataset.style=['dots','confetti','stars'][tier];$('#celebration-title').textContent=titles[tier];$('#celebration-symbol').textContent=['✦','✓','★'][tier];$('#celebration-name').textContent=r.name;$('#celebration-class').textContent=r.classroom+' sinfi';$('#celebration-average').textContent=average;$('#celebration-total').textContent=`Uchala metod bo‘yicha jami ${r.total} / 30 ball`;
    $('#confetti').replaceChildren();const colors=['#d4a336','#267358','#8aafdd','#e0acbd'];for(let i=0;i<42;i++){const part=document.createElement('i');part.style.left=Math.random()*100+'%';part.style.background=colors[i%colors.length];part.style.animationDelay=Math.random()*1.5+'s';$('#confetti').append(part);}celebration.showModal();
  }
  $('#close-celebration').onclick=()=>celebration.close();
  document.addEventListener('visibilitychange',tick);
  window.addEventListener('hashchange',route);
  function dispose(){
    disposed=true;clearInterval(timer);closeDialogs();lesson=null;attempt=null;selectedCell=null;selectedWord=null;
    document.querySelectorAll('input').forEach(el=>{el.value='';el.defaultValue='';});
    for(const id of ['#crossword-clues','#crossword-grid','#error-area','#algorithm-task','#confetti','#pupil-person','#result-name','#result-class','#result-average','#result-total','#result-breakdown','#celebration-name','#celebration-class','#celebration-average','#celebration-total','#join-message','#letter-clue','#method-progress','#answer-count','#celebration-title'])$(id).replaceChildren();
    $('#lesson-ready').hidden=true;screen('home');
  }
  window.addEventListener('pagehide',dispose);
  window.addEventListener('pageshow',event=>{if(event.persisted||disposed){disposed=false;fail(new Error('Oldingi urinish o‘chirildi. Darsni qaytadan oching.'));}});
  route();
})();
