const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const topics=require('../lesson-data.js'),B=require('../lesson-builder.js'),C=require('../session-core.js');
test('every topic has exactly 10 tasks in each method',()=>{
  assert.equal(topics.length,3);for(const t of topics){assert.equal(t.words.length,10);assert.equal(new Set(t.words.map(x=>x[0])).size,10);assert.equal(t.errors.length,10);assert.equal(t.algorithms.length,10);for(const [answer,clue] of t.words){assert(/^[A-Z]{2,20}$/.test(answer));assert(clue.length>10);}for(const q of t.errors){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(q.correct>=0&&q.correct<3);}for(const a of t.algorithms){assert(a.steps.length>=4);assert.equal(new Set(a.steps).size,a.steps.length);}}
});
test('links reproduce the same crossword and options on every open',()=>{
  for(const topic of topics)for(const seed of [0,1,333,928173,4294967295]){const a=B.create(topic.id,seed),b=B.create(topic.id,seed);assert.deepEqual(a,b);assert.equal(a.crossword.words.length,5);for(const w of a.crossword.words){assert.equal(w.keys.map(k=>a.crossword.cells.get(k).letter).join(''),w.answer);}a.initialOrders.forEach(order=>{assert(!order.every((x,i)=>x===i));assert.equal(new Set(order).size,order.length);});}
});
test('all actual answer keys produce 30/30 and mean 10',()=>{
  for(const topic of topics){const lesson=B.create(topic.id,42);let a=C.beginStage(C.createAttempt('Sinov Ismi','8-A'),0);for(const [k,cell] of lesson.crossword.cells)a=C.record(a,k,cell.letter,1);a=C.finishStage(a,lesson,2);a=C.beginStage(a,3);lesson.errors.forEach((q,i)=>a=C.record(a,i,q.correct,4));a=C.finishStage(a,lesson,5);a=C.beginStage(a,6);lesson.algorithms.forEach((q,i)=>a=C.record(a,i,q.steps.map((_,j)=>j),7));a=C.finishStage(a,lesson,8);assert.equal(C.result(a).total,30);assert.equal(C.result(a).average,10);}
});
test('bad lesson ids and seeds are rejected',()=>{for(const args of [['bad',1],['networks',-1],['networks',NaN],['networks',4294967296]])assert.throws(()=>B.create(...args));});
test('no personal-data storage or external script assets',()=>{
  const root=path.join(__dirname,'..');const source=['app.js','session-core.js','lesson-builder.js','publishing.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');assert(!/\b(localStorage|sessionStorage|indexedDB|XMLHttpRequest|WebSocket)\b|document\.cookie|sendBeacon\s*\(|\bfetch\s*\(/.test(source));const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(!/(?:src|href)=["']https?:\/\//.test(html));assert(!html.includes('qrcode'));for(const match of html.matchAll(/(?:src|href)="([\w/-]+\.(?:js|css))"/g))assert(fs.existsSync(path.join(root,match[1])));
});

test('prepared lessons contain five words, five errors and one algorithm',()=>{for(const t of topics){const l=B.create(t.id,123);assert.equal(l.crossword.words.length,5);assert.equal(l.errors.length,5);assert.equal(l.algorithms.length,1);}});
