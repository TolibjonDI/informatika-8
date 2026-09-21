/* Pure rules for one temporary three-method attempt. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.SessionCore=factory();})(typeof window==='undefined'?this:window,function(){
  'use strict';
  const METHODS=['Krossvord','Xatoni top','Algoritmni yig‘'];
  function createAttempt(name,classroom){
    name=String(name).trim().replace(/\s+/g,' ');classroom=String(classroom).trim().toUpperCase();
    if(name.length<2||name.length>70)throw new Error('Ism va familiyangizni kiriting (2–70 belgi).');
    if(!classroom||classroom.length>30)throw new Error('Sinfingizni kiriting (masalan, 8-A).');
    return {name,classroom,stage:0,status:'ready',deadline:null,scores:[null,null,null],reasons:[null,null,null],answers:[{},{},{}]};
  }
  function beginStage(a,now){if(a.status!=='ready')return a;return {...a,status:'active',startedAt:now,deadline:now+300000};}
  function remaining(a,now){return a.status==='active'?Math.max(0,Math.min(300,Math.ceil((a.deadline-now)/1000))):0;}
  function canEdit(a,now){return !!a&&a.status==='active'&&now<a.deadline;}
  function record(a,key,value,now){
    if(!canEdit(a,now))return a;
    const answers=a.answers.slice();answers[a.stage]={...answers[a.stage],[key]:Array.isArray(value)?value.slice():value};return {...a,answers};
  }
  function grade(lesson,stage,answers){
    if(stage===0)return lesson.crossword.words.reduce((score,w)=>{
      let answer='';for(let i=0;i<w.answer.length;i++)answer+=answers[`${w.r+(w.dir==='down'?i:0)},${w.c+(w.dir==='across'?i:0)}`]||' ';
      return score+(answer===w.answer?2:0);
    },0);
    if(stage===1)return lesson.errors.reduce((score,q,i)=>score+(answers[i]===q.correct?2:0),0);
    return lesson.algorithms.reduce((score,q,i)=>{const order=answers[i];return score+(Array.isArray(order)&&order.length===q.steps.length&&order.every((id,index)=>id===index)?10:0);},0);
  }
  function finishStage(a,lesson,now){
    if(a.status!=='active')return a;
    const scores=a.scores.slice(),reasons=a.reasons.slice();scores[a.stage]=grade(lesson,a.stage,a.answers[a.stage]);reasons[a.stage]=now>=a.deadline?'timeout':'submitted';
    return {...a,scores,reasons,status:a.stage===2?'finished':'ready',stage:Math.min(2,a.stage+1),deadline:null};
  }
  function result(a){
    if(a.status!=='finished')throw new Error('Avval uchala metodni yakunlang.');
    const total=a.scores.reduce((sum,score)=>sum+score,0);
    return {name:a.name,classroom:a.classroom,scores:a.scores.slice(),total,average:total/3,maxTotal:30,maxAverage:10};
  }
  return {METHODS,createAttempt,beginStage,remaining,canEdit,record,grade,finishStage,result};
});
