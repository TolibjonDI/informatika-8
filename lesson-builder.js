(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./lesson-data.js'),require('./crossword.js'));else root.LessonBuilder=factory(LESSON_TOPICS,makeCrossword);})(typeof window==='undefined'?this:window,function(topics,crossword){
  function random(seed){let state=seed>>>0;return()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}
  function shuffle(array,rng){const out=array.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
  function create(id,seed){
    const topic=topics.find(t=>t.id===id);if(!topic||!Number.isInteger(seed)||seed<0||seed>4294967295)throw new Error('Dars havolasi yaroqsiz. O‘qituvchidan yangi havola oling.');
    const rng=random(seed),puzzle=crossword(shuffle(topic.words,rng),rng,5);
    const errors=shuffle(topic.errors,rng).slice(0,5).map(task=>{const ids=shuffle(task.options.map((_,i)=>i),rng);return {...task,options:ids.map(i=>task.options[i]),correct:ids.indexOf(task.correct)};});
    const algorithms=shuffle(topic.algorithms,rng).slice(0,1);
    const initialOrders=algorithms.map(task=>{const order=shuffle(task.steps.map((_,i)=>i),rng);if(order.every((x,i)=>x===i))[order[0],order[1]]=[order[1],order[0]];return order;});
    return {id,seed,title:topic.title,crossword:puzzle,errors,algorithms,initialOrders};
  }
  return {create};
});
