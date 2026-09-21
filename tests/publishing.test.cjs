const test=require('node:test'),assert=require('node:assert/strict');
const P=require('../publishing.js');
const lesson={id:'networks',seed:42,name:'PRIVATE',answers:{secret:true}};
test('public document includes only lesson configuration',()=>assert.deepEqual(P.document(lesson),{version:4,topic:'networks',seed:42}));
test('load validates published document',async()=>{
 assert.deepEqual(await P.load(async()=>({ok:true,json:async()=>({version:4,topic:'networks',seed:42})})),{version:4,topic:'networks',seed:42});
 await assert.rejects(P.load(async()=>({ok:false,status:404})));
 await assert.rejects(P.load(async()=>({ok:true,json:async()=>({version:3,topic:'networks',seed:42})})));
});
test('publish creates file without sha and updates existing file with sha',async()=>{
 for(const exists of [false,true]){
 const calls=[];const request=async(url,opts)=>{calls.push({url,opts});return opts.method==='PUT'?{ok:true,json:async()=>({})}:exists?{ok:true,json:async()=>({sha:'abc'})}:{ok:false,status:404};};
 await P.publish({owner:'teacher',repo:'class',branch:'main',folder:'docs',token:'test-token'},lesson,request);
 assert.equal(calls.length,2);assert(calls[0].url.startsWith('https://api.github.com/repos/teacher/class/contents/docs/current-lesson.json'));
 const body=JSON.parse(calls[1].opts.body);assert.equal(body.sha,exists?'abc':undefined);
 assert.deepEqual(JSON.parse(Buffer.from(body.content,'base64').toString()),P.document(lesson));
 assert.equal(body.branch,'main');assert(!body.content.includes('PRIVATE'));
 }
});
test('denied reads never become writes; conflicts report error',async()=>{
 let count=0;await assert.rejects(P.publish({owner:'a',repo:'b',branch:'main',folder:'',token:'x'},lesson,async()=>{count++;return {ok:false,status:403};}));assert.equal(count,1);
 await assert.rejects(P.publish({owner:'a',repo:'b',branch:'main',folder:'',token:'x'},lesson,async(u,o)=>({ok:false,status:o.method==='PUT'?409:404})),/boshqa/);
});
test('invalid config is rejected before any request',async()=>{
 await assert.rejects(P.publish({owner:'a/b',repo:'b',branch:'main',folder:'',token:'x'},lesson,()=>{throw Error('network should not run');}),/Repository/);
});
test('network and malformed data errors are safe',async()=>{
 await assert.rejects(P.load(async()=>{throw Error('secret');}),/Ulanish/);
 await assert.rejects(P.load(async()=>({ok:true,json:async()=>{throw Error('bad');}})),/yaroqsiz/);
 await assert.rejects(P.load(async()=>({ok:false,status:500})),/yuklab/);
 await assert.rejects(P.publish({owner:'a',repo:'b',branch:'main',folder:'',token:'secret'},lesson,async()=>({ok:true,json:async()=>({})})),/yaroqsiz/);
 await assert.rejects(P.publish({owner:'a',repo:'b',branch:'main',folder:'',token:'secret'},lesson,async(u,o)=>({ok:false,status:o.method==='PUT'?422:404})),/422/);
 for(const data of [null,{version:4,topic:'unknown',seed:1},{version:4,topic:'networks',seed:-1}])assert.throws(()=>P.validate(data));
});
