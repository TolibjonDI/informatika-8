(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.Publishing=factory();})(typeof window==='undefined'?this:window,function(){
  'use strict';
  function validate(data){
    if(!data||data.version!==4||!['networks','algorithms','hardware'].includes(data.topic)||!Number.isInteger(data.seed)||data.seed<0||data.seed>4294967295)throw new Error('Dars e’lon qilinmagan yoki fayl yaroqsiz. O‘qituvchiga murojaat qiling.');
    return {version:4,topic:data.topic,seed:data.seed};
  }
  function document(lesson){return validate({version:4,topic:lesson.id,seed:lesson.seed});}
  async function request(url,options={},transport=fetch){
    try{return await transport(url,{...options,signal:AbortSignal.timeout(15000),redirect:'error'});}
    catch{throw new Error('Ulanish amalga oshmadi. Internetni tekshirib, qayta urinib ko‘ring.');}
  }
  async function load(transport=fetch){
    const response=await request('./current-lesson.json?t='+Date.now(),{cache:'no-store',credentials:'omit'},transport);
    if(!response.ok)throw new Error(response.status===404?'O‘qituvchi hali dars e’lon qilmagan. Birozdan keyin qayta urinib ko‘ring.':'Darsni yuklab bo‘lmadi. Qayta urinib ko‘ring.');
    let data;try{data=await response.json();}catch{throw new Error('Dars fayli yaroqsiz. O‘qituvchiga murojaat qiling.');}
    return validate(data);
  }
  function apiError(status){
    if(status===401||status===403)return new Error('GitHub ruxsat bermadi. Token va Contents: Read and write huquqini tekshiring.');
    if(status===409)return new Error('Dars boshqa oynada o‘zgartirilgan. Qayta e’lon qiling.');
    return new Error('GitHub’ga yozilmadi ('+status+'). Repository, branch, token huquqi va branch cheklovlarini tekshiring.');
  }
  async function publish(config,lesson,transport=fetch){
    const {owner,repo,branch,folder,token}=config;
    if(!/^[A-Za-z0-9-]+$/.test(owner)||!(/^[A-Za-z0-9_.-]+$/.test(repo))||repo==='.'||repo==='..'||!branch||!token||!['','docs'].includes(folder))throw new Error('Repository egasi, nomi, branch va tokenni to‘liq kiriting.');
    const data=document(lesson),path=(folder?folder+'/':'')+'current-lesson.json';
    const url='https://api.github.com/repos/'+encodeURIComponent(owner)+'/'+encodeURIComponent(repo)+'/contents/'+path;
    const headers={Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'X-GitHub-Api-Version':'2026-03-10'};
    const previous=await request(url+'?ref='+encodeURIComponent(branch),{headers,cache:'no-store',credentials:'omit'},transport);
    let sha;
    if(previous.ok){const file=await previous.json();if(!file.sha)throw new Error('Dars fayli haqidagi ma’lumot yaroqsiz.');sha=file.sha;}
    else if(previous.status!==404)throw apiError(previous.status);
    const body={message:'Update classroom lesson',branch,content:btoa(JSON.stringify(data,null,2)+'\n')};
    if(sha)body.sha=sha;
    const response=await request(url,{method:'PUT',headers:{...headers,'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify(body)},transport);
    if(!response.ok)throw apiError(response.status);
    return data;
  }
  return {document,validate,load,publish};
});
