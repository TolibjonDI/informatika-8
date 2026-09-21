function makeCrossword(items, random=Math.random,targetCount=items.length){
  const key=(r,c)=>r+','+c;
  for(let attempt=0;attempt<700;attempt++){
    const cells=new Map(),words=[];
    const order=items.map(([answer,clue],id)=>({answer,clue,id})).sort((a,b)=>b.answer.length-a.answer.length);
    if(attempt)for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
    function place(word,r,c,dir){
      const dr=dir==='down'?1:0,dc=1-dr;
      const w={...word,r,c,dir,keys:[]};
      for(let i=0;i<word.answer.length;i++){
        const k=key(r+dr*i,c+dc*i);let cell=cells.get(k);
        if(!cell){cell={r:r+dr*i,c:c+dc*i,letter:word.answer[i],dirs:[],wordIds:[]};cells.set(k,cell);}
        cell.dirs.push(dir);cell.wordIds.push(word.id);w.keys.push(k);
      }
      words.push(w);
    }
    function valid(word,r,c,dir){
      const dr=dir==='down'?1:0,dc=1-dr,n=word.answer.length;
      if(cells.has(key(r-dr,c-dc))||cells.has(key(r+dr*n,c+dc*n)))return false;
      let crosses=0;
      for(let i=0;i<n;i++){
        const rr=r+dr*i,cc=c+dc*i,cell=cells.get(key(rr,cc));
        if(cell){if(cell.letter!==word.answer[i]||cell.dirs.includes(dir))return false;crosses++;}
        else if(cells.has(key(rr-dc,cc-dr))||cells.has(key(rr+dc,cc+dr)))return false;
      }
      return crosses>0;
    }
    place(order.shift(),0,0,'across');
    while(order.length&&words.length<targetCount){
      let added=false;
      for(let wi=0;wi<order.length;wi++){
        const word=order[wi],candidates=[];
        for(const cell of cells.values())for(let i=0;i<word.answer.length;i++)if(word.answer[i]===cell.letter){
          for(const dir of ['across','down']){
            const r=cell.r-(dir==='down'?i:0),c=cell.c-(dir==='across'?i:0);
            if(valid(word,r,c,dir)){
              const all=[...cells.values()];
              const height=Math.max(...all.map(x=>x.r),r+(dir==='down'?word.answer.length-1:0))-Math.min(...all.map(x=>x.r),r)+1;
              const width=Math.max(...all.map(x=>x.c),c+(dir==='across'?word.answer.length-1:0))-Math.min(...all.map(x=>x.c),c)+1;
              candidates.push({r,c,dir,score:height*width+random()*50});
            }
          }
        }
        if(candidates.length){candidates.sort((a,b)=>a.score-b.score);const p=candidates[0];place(word,p.r,p.c,p.dir);order.splice(wi,1);added=true;break;}
      }
      if(!added)break;
    }
    if(words.length===targetCount){
      const all=[...cells.values()],minR=Math.min(...all.map(x=>x.r)),minC=Math.min(...all.map(x=>x.c));
      const height=Math.max(...all.map(x=>x.r))-minR+1,width=Math.max(...all.map(x=>x.c))-minC+1;
      if(Math.max(width,height)>24&&attempt<699)continue;
      words.sort((a,b)=>a.r-b.r||a.c-b.c);let number=0,last='';
      for(const w of words){const k=key(w.r,w.c);if(k!==last){number++;last=k;}w.number=number;cells.get(k).number=number;}
      return {cells,words,minR,minC,height,width,entries:new Map()};
    }
  }
  throw new Error('Krossvordni tuzib bo‘lmadi. Yana urinib ko‘ring.');
}

if(typeof module === "object" && module.exports) module.exports = makeCrossword;
