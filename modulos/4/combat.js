/* Motor del combate: transiciones síncronas, resultado aplicado una sola vez.
 * La animación representa una transición ya registrada; nunca calcula el daño.
 */
(function(root){
 'use strict';
 const banks=root.OrbeQuestions||(typeof require==='function'?require('./questions.js'):{});
 const GUARDIANS=[
  {id:'g1',name:'Guardián del Valle',role:'Custodio de los fundamentos',theme:'valle',hp:72,playerHp:70,color:'#78d9c3',fragment:'OR',topic:'Fundamentos · propósito · reglas · experiencia',pattern:'Ataques anunciados de 8 a 10. Aprende a leer el duelo.',lore:'Reconoces los símbolos del juego… pero ¿comprendes el propósito que los une?',mid:'Has abierto una grieta en mi armadura. Ahora sostén tus decisiones con criterio.',win:'Has comprendido que cada elemento necesita un propósito. El primer fragmento es tuyo.',lose:'El Valle no cierra sus puertas. Revisa las razones de tus decisiones y vuelve a intentarlo.',taunts:['Las medallas muestran un logro. Tus razones deberán demostrarlo.','Mira las acciones que permiten las reglas. Allí comienza la experiencia.']},
  {id:'g2',name:'Maestro de la Forja',role:'Forjador de las herramientas',theme:'forja',hp:90,playerHp:72,color:'#ffc080',fragment:'BE',topic:'Herramientas · unplugged y plugged · IA · recompensas',pattern:'El calor crece: cada tercera ronda prepara un golpe de 18.',lore:'No me impresiona una herramienta reluciente. Demuestra para qué la usarás. Observa el calor: mi tercer golpe será el más fuerte.',mid:'La Forja arde. Una buena elección también considera los recursos y a quienes los utilizarán.',win:'Has elegido con intención y probado tus herramientas. Recibe el segundo fragmento.',lose:'Una forja exige nuevos intentos. Cambia la estrategia y vuelve con tus decisiones mejor fundadas.',taunts:['El calor está creciendo. Una defensa a tiempo puede cambiar el duelo.','La herramienta debe servir a tu propósito. Haz que cada ventaja cuente.']},
  {id:'g3',name:'Arquitecto del Flow',role:'Tejedor del diseño',theme:'flow',hp:102,playerHp:75,color:'#a5c7ff',fragment:'20',topic:'Flow · Bartle · HEXAD · Lazzaro · 6D · Werbach',pattern:'Alterna Estructura y Resonancia. La habilidad atraviesa su protección.',lore:'Mi estructura cambia con cada ronda. Cuando me proteja, tu habilidad atravesará la defensa. Cuando resuene, una espada bien dirigida hará más daño.',mid:'Has alterado mi equilibrio. Observa el estado del campo antes de decidir tu siguiente acción.',win:'Has conectado jugadores, desafío y diseño. El tercer fragmento responde a tu criterio.',lose:'El equilibrio puede recuperarse. Observa mis estados y utiliza los apoyos sin renunciar al desafío.',taunts:['Una ruta común puede admitir apoyos y decisiones diferentes.','La dificultad tiene sentido cuando permite aprender. Ajusta tu estrategia.']},
  {id:'g4',name:'Custodio del Caos',role:'Señor del simulador final',theme:'caos',hp:120,playerHp:80,color:'#d3afff',fragment:'26',topic:'Integración · dilemas docentes · evidencia · mejora',pattern:'Combina presión y ataques cargados. Cambia de fase al llegar a media vida.',lore:'Has llegado con herramientas, modelos y fragmentos. Aquí tendrás que unirlos. A mitad del duelo cambiaré el ritmo: ninguna decisión estará aislada.',mid:'¡El Orbe despierta! Comienza la segunda fase. Mis golpes cargados serán más fuertes; mira el aviso antes de responder.',win:'Has unido propósito, experiencia y evidencia. El último fragmento te pertenece. Consagra el Orbe.',lose:'El Caos no ha terminado contigo. Revisa tus decisiones, conserva lo aprendido y vuelve a construir tu camino.',taunts:['Un tablero atractivo no resuelve un diseño desalineado.','Cuando cambian las condiciones, el propósito debe seguir orientando tus decisiones.']}
 ];
 function shuffle(a,rng){const b=a.slice(),r=rng||Math.random;for(let i=b.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
 function guardian(id){return GUARDIANS.find(g=>g.id===id);}
 function create(id,history,rng){
  const g=guardian(id);if(!g)throw Error('Guardián desconocido');
  const pool=shuffle(banks[id],rng),missed=pool.filter(q=>history?.[q.id]?.incorrect>history?.[q.id]?.correct),other=pool.filter(q=>!missed.includes(q));
  return {version:3,attemptId:Date.now().toString(36)+'_'+Math.random().toString(36).slice(2),guardianId:id,playerHp:g.playerHp,playerHpMax:g.playerHp,enemyHp:g.hp,enemyHpMax:g.hp,turn:1,phase:'intro',nextPhase:null,finished:false,outcome:null,guardStance:false,skillCooldown:0,questionsAsked:0,questionsLimit:25,questionCursor:0,deck:missed.concat(other).map(q=>q.id),currentQuestion:null,questionMode:null,questionSelected:null,pending:null,correct:0,missed:[],talentUses:{},eliminated:[],seenMid:false,seenRounds:[],dialog:null,phaseTwo:false,reviewModeNotified:false};
 }
 function intent(b){
  let damage=8,name='Golpe del Valle',detail='Un golpe directo. Bloquear reduce el daño; recuperar restaura 8 antes de recibirlo.',state='En guardia';
  const n=(b.turn-1)%3;
  if(b.guardianId==='g1'){damage=[8,10,8][n];name=['Golpe descendente','Embate rúnico','Barrida del Valle'][n];}
  if(b.guardianId==='g2'){damage=[8,10,18][n];name=n===2?'Martillo incandescente':'Golpe de la Forja';state='Calor '+(n+1)+' / 3';detail=n===2?'Golpe cargado: defender ofrece una reducción importante.':'El horno acumula calor. En la tercera ronda golpea con 18.';}
  if(b.guardianId==='g3'){const structure=b.turn%2===1;damage=structure?10:14;state=structure?'Estructura':'Resonancia';name=structure?'Pulso estructural':'Onda resonante';detail=structure?'El ataque de espada hace 7; la habilidad atraviesa la protección y hace 18.':'El ataque de espada aprovecha la apertura y hace 15. El rival golpeará con 14.';}
  if(b.guardianId==='g4'){const p=b.enemyHp<=b.enemyHpMax/2;damage=p?[12,18,14][n]:[10,12,16][n];name=['Corte del vacío','Embate del Orbe','Descarga del Caos'][n];state=p?'Caos · fase II':'Caos · fase I';detail=damage>=16?'Ataque cargado. La defensa y tus apoyos pueden contener el impacto.':'El Custodio alterna patrones. Observa el daño anunciado antes de elegir.';}
  return {damage,name,detail,state};
 }
 function playerDamage(b,mode){if(mode==='skill')return 18;if(b.guardianId==='g3')return b.turn%2===1?7:15;return 12;}
 function present(b,mode,rng){
  if(b.finished||b.pending)return null;
  const allowed=b.phase==='player'?['attack','skill','defend','heal']:b.phase==='enemy-choice'?['react-defend','react-heal']:b.phase==='initiative'?['initiative']:[];
  if(!allowed.includes(mode)||mode==='skill'&&b.skillCooldown>0)return null;
  if(b.currentQuestion){if(b.questionMode===mode)return b.currentQuestion;return null;}
  if(b.questionCursor>=b.deck.length){const old=banks[b.guardianId];b.deck=shuffle(old.filter(q=>b.missed.includes(q.id)),rng).concat(shuffle(old.filter(q=>!b.missed.includes(q.id)),rng)).map(q=>q.id);b.questionCursor=0;b.reviewModeNotified=true;}
  const base=banks[b.guardianId].find(q=>q.id===b.deck[b.questionCursor]);if(!base)throw Error('Pregunta no disponible');
  const order=shuffle([0,1,2,3],rng);
  b.currentQuestion={id:base.id,topic:base.topic,stem:base.stem,source:base.source,options:order.map(i=>base.options[i]),feedback:order.map(i=>base.feedback[i]),answer:order.indexOf(base.answer),explain:base.explain};
  b.questionMode=mode;b.questionSelected=null;b.eliminated=[];b.phase='question';return b.currentQuestion;
 }
 function cancel(b){if(b.phase!=='question'||!['attack','skill','defend','heal'].includes(b.questionMode))return false;b.phase='player';b.questionMode=null;b.currentQuestion=null;b.questionSelected=null;b.eliminated=[];return true;}
 function grade(b,selected){
  if(b.phase!=='question'||!b.currentQuestion||b.pending||!Number.isInteger(selected)||selected<0||selected>3||b.eliminated.includes(selected))return null;
  const q=b.currentQuestion,correct=selected===q.answer;
  b.questionSelected=selected;b.pending={mode:b.questionMode,correct,id:q.id,selected,applied:false};b.questionsAsked++;b.questionCursor++;b.correct+=correct?1:0;
  if(!correct&&!b.missed.includes(q.id))b.missed.push(q.id);
  b.phase='feedback';return b.pending;
 }
 function resolve(b){
  if(b.phase!=='feedback'||!b.pending||b.pending.applied)return null;
  const p=b.pending;p.applied=true;const mode=p.mode,correct=p.correct,result={mode,correct,damage:0,heal:0,riposte:0,next:'player'};
  if(mode==='initiative')result.next=correct?'initiative-choice':'enemy-choice';
  else if(['attack','skill','defend','heal'].includes(mode)){
   result.next='enemy-choice';
   if(mode==='skill')b.skillCooldown=2;
   if((mode==='attack'||mode==='skill')&&correct){result.damage=playerDamage(b,mode);b.enemyHp=Math.max(0,b.enemyHp-result.damage);}
   if(mode==='defend'&&correct)b.guardStance=true;
   if(mode==='heal'&&correct){result.heal=Math.min(16,b.playerHpMax-b.playerHp);b.playerHp+=result.heal;}
  }else{
   const incoming=intent(b).damage,guard=b.guardStance;
   let damage=guard?Math.max(1,Math.round(incoming*.45)):incoming;
   if(mode==='react-defend'&&correct){damage=Math.max(1,Math.round(damage*.25));if(guard){result.riposte=4;b.enemyHp=Math.max(0,b.enemyHp-4);}}
   if(mode==='react-heal'&&correct){result.heal=Math.min(8,b.playerHpMax-b.playerHp);b.playerHp+=result.heal;}
   result.damage=Math.min(b.playerHp,damage);b.playerHp=Math.max(0,b.playerHp-damage);b.guardStance=false;b.turn++;b.skillCooldown=Math.max(0,b.skillCooldown-1);
  }
  if(b.playerHp<=0||b.enemyHp<=0){b.finished=true;b.outcome=b.playerHp<=0?'lose':'win';result.next='finished';}
  b.phaseTwo=b.guardianId==='g4'&&b.enemyHp<=b.enemyHpMax/2;
  b.currentQuestion=null;b.questionMode=null;b.questionSelected=null;b.eliminated=[];b.pending=null;b.nextPhase=result.next;b.phase='transition';return result;
 }
 function settle(b){if(b.phase!=='transition')return;b.phase=b.nextPhase||'player';b.nextPhase=null;}
 function restore(raw){
  if(!raw||raw.version!==3||!guardian(raw.guardianId)||!Array.isArray(raw.deck)||raw.deck.length!==25)return null;
  const g=guardian(raw.guardianId),validIds=new Set(banks[g.id].map(q=>q.id));if(raw.deck.some(id=>!validIds.has(id))||new Set(raw.deck).size!==25)return null;
  if(!Number.isInteger(raw.turn)||raw.turn<1||raw.turn>1000||!Number.isInteger(raw.questionsAsked)||raw.questionsAsked<0||raw.questionsAsked>5000||!Number.isInteger(raw.questionCursor)||raw.questionCursor<0||raw.questionCursor>25)return null;
  if(!['intro','initiative','initiative-choice','player','question','feedback','transition','enemy-choice','dialogue','finished'].includes(raw.phase))return null;
  if(!Number.isFinite(raw.playerHp)||!Number.isFinite(raw.enemyHp)||raw.playerHp<0||raw.playerHp>g.playerHp||raw.enemyHp<0||raw.enemyHp>g.hp)return null;
  const b=JSON.parse(JSON.stringify(raw));b.playerHpMax=g.playerHp;b.enemyHpMax=g.hp;
  b.talentUses=b.talentUses&&typeof b.talentUses==='object'?b.talentUses:{};b.seenRounds=Array.isArray(b.seenRounds)?b.seenRounds:[];b.missed=Array.isArray(b.missed)?b.missed.filter(id=>validIds.has(id)):[];b.eliminated=Array.isArray(b.eliminated)?b.eliminated.filter(i=>Number.isInteger(i)&&i>=0&&i<4):[];
  if(['question','feedback'].includes(b.phase)){
   const q=b.currentQuestion,original=q&&banks[g.id].find(x=>x.id===q.id);
   if(!original||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||q.options.some(x=>!original.options.includes(x)))return null;
   q.answer=q.options.indexOf(original.options[original.answer]);q.feedback=q.options.map(x=>original.feedback[original.options.indexOf(x)]);q.stem=original.stem;q.topic=original.topic;q.explain=original.explain;q.source=original.source;
   if(b.phase==='feedback'&&(!b.pending||!Number.isInteger(b.pending.selected)||b.pending.selected<0||b.pending.selected>3||b.pending.mode!==b.questionMode))return null;
   if(b.phase==='feedback')b.pending.correct=b.pending.selected===q.answer;
  }
  if(b.phase==='transition')settle(b);
  if(b.phase==='dialogue'&&(!b.dialog||!['initiative','player','enemy-choice','finished'].includes(b.dialog.next)))return null;
  return b;
 }
 const API={GUARDIANS,guardian,shuffle,create,intent,playerDamage,present,cancel,grade,resolve,settle,restore};
 root.OrbeCombat=Object.freeze(API);if(typeof module==='object'&&module.exports)module.exports=API;
})(typeof window==='object'?window:globalThis);
