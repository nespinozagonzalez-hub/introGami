/* Centro de Comando: remaster del perfil g0100_v8.
 * Los códigos aquí funcionan en modo local; la sincronización con Sheets requiere validación adicional.
 */
(function(){
"use strict";
const KEY="g0100_v8", EKEY="gamiaula_v2_events";
const CLS=[
 {id:"Narrador",icon:GamiIcons.svg("book"),skill:"narrativa",desc:"Das propósito a la historia y a cada decisión."},
 {id:"Arquitecto",icon:"◇",skill:"diseno",desc:"Conectas objetivos, retos, secuencias y evidencias."},
 {id:"Alquimista",icon:"✧",skill:"creatividad",desc:"Transformas las ideas en experiencias inesperadas."},
 {id:"Guardián",icon:"◆",skill:"motivacion",desc:"Sostienes el avance y acompañas la superación."},
 {id:"Estratega",icon:"♟",skill:"estrategia",desc:"Encuentras caminos, reconoces patrones y eliges."}
];
const SKILLS=[
 {id:"narrativa",label:"Narrativa",icon:GamiIcons.svg("book"),desc:"Pistas contextualizadas e historias de apoyo."},
 {id:"diseno",label:"Diseño",icon:"◇",desc:"Organizadores, rutas y protecciones."},
 {id:"creatividad",label:"Creatividad",icon:"✦",desc:"Opciones y alternativas de diseño."},
 {id:"motivacion",label:"Motivación",icon:"◆",desc:"Feedback, acompañamiento y recuperación."},
 {id:"estrategia",label:"Estrategia",icon:"♟",desc:"Descartes y decisiones tácticas."}
];
const LVLS=[{l:1,x:0},{l:2,x:60},{l:3,x:140},{l:4,x:240},{l:5,x:360},{l:6,x:500}];
const MISSIONS=[
 {id:"AXR314",alias:"VAL214",module:1,type:"Principal",name:"La llamada del viajero",xp:60,pts:5},
 {id:"LUM582",alias:"VIN582",module:1,type:"Secundaria",name:"Ecos del camino olvidado",xp:25,pts:2},
 {id:"VYR207",alias:"RES307",module:1,type:"Secundaria",name:"La primera bifurcación",xp:25,pts:2},
 {id:"NEX451",alias:"FOR214",module:2,type:"Principal",name:"El pulso de los sistemas",xp:60,pts:5},
 {id:"ORB126",alias:"ARC582",module:2,type:"Secundaria",name:"Fragmentos del Orbe",xp:25,pts:2},
 {id:"KRN693",alias:"RIT307",module:2,type:"Secundaria",name:"Guardianes del equilibrio",xp:25,pts:2},
 {id:"ZEN248",alias:"FLW214",module:3,type:"Principal",name:"El mapa de lo posible",xp:60,pts:5},
 {id:"ELD570",alias:"ARC583",module:3,type:"Secundaria",name:"Ruinas de lo convencional",xp:25,pts:2},
 {id:"MIR831",alias:"MEM307",module:3,type:"Secundaria",name:"El espejo del jugador",xp:25,pts:2},
 {id:"ARC419",module:4,type:"Principal",name:"Ascenso a la montaña sagrada",xp:60,pts:5},
 {id:"NEB264",module:4,type:"Secundaria",name:"Niebla antes del umbral",xp:25,pts:2},
 {id:"CYR905",module:4,type:"Secundaria",name:"El nacimiento de lo lúdico",xp:25,pts:2}
];
const NPCS={
 orion:{name:"Maestro Orión",role:"Guía de la Academia",image:"orion",lines:["No necesitas dominar todas las herramientas para comenzar. Una gran aventura inicia con una pregunta: ¿qué aprendizaje quieres transformar?","Has encontrado fragmentos del Orbe. Recuerda: las mecánicas solo tienen sentido cuando acompañan una intención pedagógica.","El Orbe responde a quien diseña con propósito. Tu progreso habla de decisiones, no solo de puntos."]},
 lira:{name:"Lira",role:"Archivista del Orbe",image:"lira",lines:["En los archivos del Valle encontrarás las ideas que sostienen nuestra travesía. Puedes revisar los videos y las guías originales siempre que lo necesites.","La mejor herramienta no es necesariamente la más llamativa: es la que ayuda a tu grupo a aprender con mayor claridad.","Lleva un registro de tus decisiones. La reflexión transforma una actividad entretenida en una propuesta de enseñanza."]},
 kael:{name:"Kael",role:"Maestro de Atributos",image:"kael",lines:["Tus talentos no te definen para siempre: representan las herramientas que eliges fortalecer durante el viaje.","Narrativa, Diseño, Creatividad, Motivación y Estrategia ofrecen apoyos diferentes. Ninguna clase debe impedirte alcanzar el aprendizaje.","Tus puntos se pueden distribuir en el Centro de Comando. Los desafíos te ayudarán a descubrir cuándo usar cada talento."]},
 nexo:{name:"Nexo",role:"Custodio de los Códigos",image:"nexo",lines:["Soy Nexo, custodio de las claves. Al superar una misión encontrarás un código: guárdalo en el Centro de Comando.","Las claves de la versión anterior también sirven. Un fragmento solo puede canjearse una vez, aunque uses su nombre antiguo.","Los secretos del Orbe pertenecen a quienes exploran. Eso sí: canjear un código no sustituye el trabajo realizado en la misión."]},
 valen:{name:"Valen",role:"Estratega de Misiones",image:"valen",lines:["No existe un único camino para construir una buena experiencia. Observa a tus jugadores antes de elegir una mecánica.","Un desafío demasiado fácil aburre; uno demasiado difícil puede frustrar. El equilibrio entre reto y habilidad importa.","Antes de la batalla final, revisa tus recursos. Perseverar también significa saber cuándo cambiar de estrategia."]}
};
const $=s=>document.querySelector(s);
const back=$("#dialog-backdrop"), content=$("#dialog-content"),title=$("#dialog-title"), eyebrow=$("#dialog-eyebrow");
let P=null,activeCls="Narrador",activeAvatar="kael",lastFocus=null,toastTimer;
const AVATARS=["orion","lira","kael","nexo","valen"];
const npcTurns={};
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function getJSON(key,fallback){try{const raw=GamiStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch(e){return fallback;}}
function save(){try{GamiStorage.setItem(KEY,JSON.stringify(P));return true;}catch(e){notify("No se pudo guardar. Descarga una copia de tu progreso.");return false;}}
function log(type,detail){const data=getJSON(EKEY,[]);if(!Array.isArray(data))return;data.push({event_id:"evt_"+Date.now()+"_"+Math.random().toString(36).slice(2),at:new Date().toISOString(),type,module:0,station:"centro",detail});try{GamiStorage.setItem(EKEY,JSON.stringify(data.slice(-1000)));}catch(e){}}
function level(xp){let v=1;LVLS.forEach(x=>{if(xp>=x.x)v=x.l;});return v;}
function nextXP(xp){const i=LVLS.findIndex(x=>x.l===level(xp));return i===LVLS.length-1?null:LVLS[i+1].x;}
function create(name,cls){const skills=Object.fromEntries(SKILLS.map(s=>[s.id,1]));let c=CLS.find(c=>c.id===cls)||CLS[0];skills[c.skill]++;return {name,class:cls,avatar:activeAvatar,skills,pending:Object.fromEntries(SKILLS.map(s=>[s.id,0])),points:0,xp:0,level:1,codes:[],missions:[],nodes:[],achs:["primer_paso"],tutSeen:true};}
function hasChar(){return Boolean(P && P.name && P.skills);}
function notify(s){const t=$("#toast");t.textContent=s;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.hidden=true,4300);}
function refresh(){
 const n=hasChar(),xp=n?(+P.xp||0):0,lvl=level(xp),next=nextXP(xp),base=LVLS.find(x=>x.l===lvl).x;
 $("#player-name").textContent=n?P.name:"Un destino por escribir";
 $("#player-class").textContent=n?(P.class+" · Aventurero del Orbe"):"Elige una clase para iniciar tu historia.";
 $("#mini-name").textContent=n?P.name:"Crear personaje";
 $("#mini-level").textContent="N. "+lvl;
 $("#xp-text").textContent=xp+" XP";
 $("#xp-fill").style.width=(next?Math.max(0,Math.min(100,((xp-base)/(next-base))*100)):100)+"%";
 $("#level-next").textContent=next?"Nivel "+lvl+" · Próximo nivel a "+next+" XP":"Nivel "+lvl+" · Máximo actual";
 $("#stat-codes").textContent=n?(P.codes||[]).length:0;
 $("#stat-points").textContent=n?(P.points||0):0;
 const final=getJSON(GamiStorage.moduleKeys[3],{});
 const guardianCount=['g1','g2','g3','g4'].filter(g=>final[g]?.done).length;
 const finished=(n?P.codes.filter(c=>MISSIONS.some(m=>m.id===c&&m.module<4)).length:0)+guardianCount;
 $("#journey-text").textContent=finished+' de 13 retos completados';$("#journey-fill").style.width=(finished/13*100)+'%';
 $("#profile-picture").src='assets/illustrations/'+(n?P.avatar||'kael':'kael')+'.webp';
 $("#hero-start").textContent=n?'Gestionar mi personaje':'Crear mi personaje';
 $("#save-location").textContent=GamiStorage.isPersistent()?'Partida guardada en este navegador':'Partida temporal: descarga una copia antes de salir';

}
function open(name,head,html){if(back.hidden)lastFocus=document.activeElement;eyebrow.textContent=name||"ACADEMIA DEL ORBE";title.textContent=head||"Centro de Comando";content.innerHTML=html;back.hidden=false;document.body.style.overflow="hidden";$("#dialog-close").focus();}
function close(){back.hidden=true;document.body.style.overflow="";content.innerHTML="";if(lastFocus&&lastFocus.focus)lastFocus.focus();}
function character(){
 if(!hasChar()){
  const choices=CLS.map(c=>'<button type="button" class="class-choice" data-class="'+c.id+'" aria-pressed="'+(activeCls===c.id)+'"><strong>'+c.icon+" "+c.id+'</strong><small>'+esc(c.desc)+'</small></button>').join("");
  const avatars=AVATARS.map(id=>'<button type="button" class="avatar-choice" data-avatar="'+id+'" aria-pressed="'+(id===activeAvatar)+'" aria-label="Elegir retrato de '+NPCS[id].name+'"><img src="assets/illustrations/'+id+'.webp" alt=""><span>'+NPCS[id].name+'</span></button>').join("");
  open("FORJA DEL VIAJERO","Crea tu personaje",'<p>Escoge una clase y define con qué identidad comenzarás la aventura. Todas las clases pueden aprender los mismos contenidos.</p><div class="form-field"><label for="char-name">Alias del aventurero</label><input id="char-name" type="text" maxlength="45" placeholder="¿Cómo te reconocerá el Orbe?" autocomplete="off"></div><h3>Elige una clase</h3><div class="class-grid">'+choices+'</div><h3>Elige tu retrato</h3><p>La apariencia es independiente de tu clase y sus talentos.</p><div class="avatar-grid">'+avatars+'</div><div class="note">La clase aporta +1 al atributo inicial correspondiente. Tu partida y tus decisiones se guardan en este navegador. Puedes usar un alias y descargar tu progreso.</div><div class="modal-actions"><button class="button primary" id="create-char">Forjar personaje</button><button class="button outline" data-import>Recuperar mi partida</button></div>');
 }else{
  const rows=SKILLS.map(s=>{const v=Number(P.skills[s.id]||0),next=[3,5,8].find(t=>t>v);return '<div class="skill-row"><div><strong>'+s.icon+" "+s.label+" · "+v+'</strong><small>'+esc(GamiPedagogy.summary(s.id))+'</small><span class="talent-state">'+(next?'Próximo talento en nivel '+next:'Todos los talentos disponibles')+'</span></div><button data-upgrade="'+s.id+'" '+((P.points||0)<1||v>=20?"disabled":"")+' aria-label="Mejorar '+s.label+'">+1 punto</button></div>';}).join("");
  open("CENTRO DE COMANDO",P.name+' · '+P.class,'<div class="character-heading"><img src="assets/illustrations/'+(P.avatar||'kael')+'.webp" alt="Tu retrato"><p>Experiencia: <strong>'+P.xp+' XP</strong> · Nivel '+level(P.xp)+' · Puntos por distribuir: <strong>'+P.points+'</strong></p></div>'+rows+'<div class="note">Los talentos se activan en niveles 3, 5 y 8. La experiencia acumulada no se gasta; cada mejora consume un punto de desarrollo.</div><div class="modal-actions"><button class="button outline" data-export>Descargar mi partida</button><button class="button outline" data-import>Recuperar una copia</button><button class="button outline" data-panel="codigos">Ingresar un código</button></div>');
 }
}
function discovered(){
 const flags=[['principal','pairs','memory'],['principal','sec1','sec2'],['principal','cross','memory']];
 return MISSIONS.filter(m=>m.module<4&&!P?.codes.includes(m.id)&&getJSON(GamiStorage.moduleKeys[m.module-1],{})?.revealedCodes?.[flags[m.module-1][MISSIONS.filter(x=>x.module===m.module).indexOf(m)]]);
}
function codes(){
 const found=discovered();
 const ready=found.length?'<h3>Fragmentos que has descubierto</h3>'+found.map(m=>'<button class="found-reward" data-recovered-code="'+m.alias+'">Registrar '+esc(m.name)+'<small>'+m.alias+' · +'+m.xp+' XP · +'+m.pts+' puntos</small></button>').join(''):'';
 const missionList=MISSIONS.filter(m=>m.module<4||P?.codes.includes(m.id)).map(m=>'<div class="mission-chip" title="'+esc(m.name)+'">'+(P&&P.codes.includes(m.id)?"✓ ":"◇ ")+"M"+m.module+" "+esc(m.name)+'</div>').join("");
 open("BÓVEDA DEL ORBE","Canjear códigos",ready+'<p>Las misiones entregan códigos al completarse. Las claves de la edición anterior también sirven; cada misión entrega su recompensa una vez.</p><div class="form-field"><label for="code-value">Código de misión</label><input id="code-value" type="text" placeholder="ABC123" maxlength="8" autocomplete="off" spellcheck="false"></div><div class="modal-actions"><button class="button primary" id="code-submit">Canjear fragmento</button></div><div class="note">La clave final registra la Consagración cuando has vencido a los cuatro guardianes. Tu bitácora conserva los fragmentos de la edición anterior.</div><h3>Bitácora de fragmentos</h3>'+missionList);
}
function redeem(){
 if(!hasChar()){notify("Primero crea tu personaje.");return;}
 const s=String($("#code-value")?.value||"").trim().toUpperCase();
 if(s==="ORBE2026"){
  const final=getJSON(GamiStorage.moduleKeys[3],{});
  if(!['g1','g2','g3','g4'].every(g=>final[g]?.done)){notify("Vence a los cuatro guardianes para registrar la Consagración del Orbe.");return;}
  if(!Array.isArray(P.achs))P.achs=[];
  if(P.achs.includes("orbe_consagrado")){notify("Ya registraste la Consagración del Orbe.");return;}
  P.achs.push("orbe_consagrado");save();log("orbe_final_registered","ORBE2026");refresh();notify("Consagración del Orbe registrada en tu inventario.");inventory();return;
 }
 const md=MISSIONS.find(m=>m.id===s||m.alias===s);
 if(!md){notify("Código no reconocido. Comprueba la clave.");return;}
 if(P.codes.includes(md.id)){notify("Este fragmento ya está registrado.");return;}
 if(md.module===4){notify("Esta clave pertenece a la edición anterior. El cierre actual se completa en la batalla de los cuatro guardianes.");return;}
 P.codes.push(md.id);if(!Array.isArray(P.missions))P.missions=[];if(!P.missions.includes(md.id))P.missions.push(md.id);
 P.xp=(+P.xp||0)+md.xp;P.points=(+P.points||0)+md.pts;P.level=level(P.xp);
 updateAchievements();save();log("code_activated",md.id);refresh();notify(md.name+": +"+md.xp+" XP y +"+md.pts+" puntos.");codes();
}
function talentName(id){const m=String(id).match(/^(narrativa|diseno|creatividad|motivacion|estrategia)_([123])$/);return m?SKILLS.find(s=>s.id===m[1]).label+' '+['I','II','III'][Number(m[2])-1]:String(id).replaceAll('_',' ');}
function inventory(){
 if(!hasChar()){character();return;}
 let tags=(P.codes||[]).map(c=>'<span class="mission-chip">✦ '+esc(c)+'</span>').join("")||"<p>Aún no has recuperado fragmentos.</p>";
 open("MOCHILA DEL AVENTURERO","Tu inventario",'<p>Cada fragmento recuerda una misión completada. Aquí se reúnen tus códigos y logros.</p><h3>Fragmentos recuperados</h3>'+tags+'<h3>Logros</h3>'+(P.achs||[]).map(a=>'<span class="mission-chip">★ '+esc(a.replaceAll("_"," "))+'</span>').join("")+'<h3>Talentos desbloqueados</h3>'+(P.nodes||[]).map(a=>'<span class="mission-chip">◇ '+esc(talentName(a))+'</span>').join("")+'<div class="modal-actions"><button data-export class="button outline">Descargar progreso (JSON)</button></div>');
}
function npc(id,advance){
 let n=NPCS[id];if(!n)return;
 if(npcTurns[id]===undefined)npcTurns[id]=!hasChar()?0:(P.codes.length>=5?2:P.codes.length>=1?1:0);
 if(advance)npcTurns[id]=(npcTurns[id]+1)%n.lines.length;
 const idx=npcTurns[id];
 open(n.role,n.name,'<div class="npc-dialog"><img style="width:100%;max-height:220px;object-fit:contain" src="assets/illustrations/'+n.image+'.webp" alt="Retrato ilustrado de '+n.name+'"><div><p style="font-size:17px;line-height:1.8;color:#e3edf8">'+esc(n.lines[idx])+'</p><span class="overline">UN CONSEJO PARA TU VIAJE</span></div></div><div class="modal-actions"><button class="button primary" id="npc-next" data-npc="'+id+'">Escuchar otro consejo</button><button class="button outline" data-panel="'+(id==="nexo"?"codigos":"personaje")+'">'+(id==="nexo"?"Ir a la bóveda":"Ver mi personaje")+'</button></div>');
}
function exportSave(){
 if(!hasChar()){notify("Primero crea un personaje.");return;}
 const data={version:"GamiAulaRemaster-2.0.2",exported:new Date().toISOString(),player:P,events:getJSON(EKEY,[]),notebook:getJSON('gamiaula_orbe_notebook',{}),modules:Object.fromEntries(GamiStorage.moduleKeys.map(k=>[k,getJSON(k,null)])),local_supports:{}};
 const id=GamiStorage.getItem('gamiaula_v2_player_id');
 if(id){data.local_player_id=id;[1,2,3].forEach(m=>{const k='gamiaula_v2_strat_'+m+'_'+id;data.local_supports[k]=getJSON(k,[]);});['g1','g2','g3','g4'].forEach(g=>SKILLS.forEach(s=>{const k='gamiaula_v2_guardian_'+id+'_'+g+'_'+s.id;data.local_supports[k]=getJSON(k,0);}));}
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="gamiaula-orbe-progreso.json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
 notify("Archivo de progreso preparado.");
}
function normalizePlayer(raw){
 if(!raw||typeof raw!=='object'||typeof raw.name!=='string'||raw.name.trim().length<2||raw.name.length>45||!CLS.some(c=>c.id===raw.class)||!Array.isArray(raw.codes)||!raw.skills)return null;
 const p=JSON.parse(JSON.stringify(raw));p.avatar=AVATARS.includes(p.avatar)?p.avatar:"kael";
 if(!Number.isFinite(p.xp)||p.xp<0||!Number.isInteger(p.points)||p.points<0)return null;
 if(SKILLS.some(s=>!Number.isInteger(p.skills[s.id])||p.skills[s.id]<0||p.skills[s.id]>20))return null;
 p.codes=[...new Set(p.codes.map(c=>MISSIONS.find(m=>m.id===c||m.alias===c)?.id||c))];
 p.missions=Array.isArray(p.missions)?p.missions:[];p.achs=Array.isArray(p.achs)?p.achs:[];p.nodes=Array.isArray(p.nodes)?p.nodes:[];
 p.level=level(p.xp);return p;
}
function updateAchievements(){
 if(!hasChar())return;
 const add=a=>{if(!P.achs.includes(a))P.achs.push(a);};
 if(P.codes.length)add('codigo_activado');
 if(MISSIONS.some(m=>m.type==='Principal'&&P.codes.includes(m.id)))add('mision_central');
 if(MISSIONS.some(m=>m.type==='Secundaria'&&P.codes.includes(m.id)))add('explorador');
 if([1,2,3].some(n=>MISSIONS.filter(m=>m.module===n).every(m=>P.codes.includes(m.id))))add('ruta_completa');
 SKILLS.forEach(s=>[3,5,8].forEach((v,i)=>{const node=s.id+'_'+(i+1);if(P.skills[s.id]>=v&&!P.nodes.includes(node))P.nodes.push(node);}));
 if(P.nodes.length)add('nodo_despierto');
 if(SKILLS.some(s=>P.skills[s.id]>=5))add('especialista');
 if(SKILLS.every(s=>P.skills[s.id]>=3))add('equilibrado');
 if(level(P.xp)>=5)add('constructor_epico');
}
function importSave(){
 open('BITÁCORA DEL VIAJERO','Recuperar tu partida','<p>Selecciona una copia descargada desde la Academia. Puedes revisar el personaje antes de recuperar sus módulos.</p><div class="form-field"><label for="save-file">Copia de progreso (JSON)</label><input type="file" id="save-file" accept=".json,application/json"></div><div id="import-preview" role="status"></div>');
 $('#save-file').addEventListener('change',async function(){
  try{
   const file=this.files[0];if(!file||file.size>2000000)throw Error('Selecciona una copia JSON de menos de 2 MB.');
   const d=JSON.parse(await file.text()),player=normalizePlayer(d.player||d);
   if(!player)throw Error('La copia no contiene un personaje compatible.');
   const modules=d.modules||{};
   for(const [index,k] of GamiStorage.moduleKeys.entries()){
    const m=modules[k];if(m===undefined||m===null)continue;
    if(typeof m!=='object'||Array.isArray(m))throw Error('La copia contiene un módulo incompatible.');
    if(index<3){
      if(typeof m.currentStation!=='string'||!Array.isArray(m.visitedResources)||!m.quizAnswers||!m.revealedCodes)throw Error('La copia contiene una actividad incompleta.');
      if(index!==1&&!Array.isArray(m.memoryMatched))throw Error('La copia contiene un memorice incompatible.');
      if(index===0&&!m.pairAnswers||index===1&&(!m.matchAnswers||!m.vfAnswers)||index===2&&!m.crosswordInputs)throw Error('La copia contiene respuestas incompatibles.');
    }else if(!m.fragments||!['g1','g2','g3','g4'].every(g=>m[g]&&typeof m[g].done==='boolean'))throw Error('La copia contiene una batalla incompatible.');
   }
   const notebook=d.notebook||{};
   if(typeof notebook!=='object'||Array.isArray(notebook))throw Error('La bitácora no es compatible.');
   for(const answers of Object.values(notebook)){if(!Array.isArray(answers)||answers.length>3||answers.some(x=>typeof x!=='string'||x.length>3000))throw Error('La bitácora no es compatible.');}
   for(const [k,v] of Object.entries(d.local_supports||{})){
    if(k.startsWith('gamiaula_v2_strat_')&&(!Array.isArray(v)||v.some(x=>!Number.isInteger(x.q)||x.q<0||x.q>20||!Number.isInteger(x.option)||x.option<0||x.option>3)))throw Error('Los usos de Estrategia no son compatibles.');
    if(k.startsWith('gamiaula_v2_guardian_')&&(!Number.isInteger(v)||v<0||v>3))throw Error('Los talentos de batalla no son compatibles.');
   }
   const preview=$('#import-preview');preview.innerHTML='<p><strong>'+esc(player.name)+'</strong> · '+esc(player.class)+' · '+player.xp+' XP · '+player.codes.length+' fragmentos.</p><p>La copia sustituirá la partida local. Descarga tu partida actual si quieres conservarla.</p><button class="button outline" data-export>Descargar partida actual</button> <button class="button primary" id="confirm-import">Recuperar esta partida</button>';
   $('#confirm-import').addEventListener('click',()=>{
    if(d.modules)GamiStorage.moduleKeys.forEach(k=>{if(modules[k])GamiStorage.setItem(k,JSON.stringify(modules[k]));else GamiStorage.removeItem(k);});
    if(typeof d.local_player_id==='string'&&/^gami_[A-Za-z0-9_-]{1,100}$/.test(d.local_player_id)){
      GamiStorage.setItem('gamiaula_v2_player_id',d.local_player_id);
      const supports=d.local_supports||{};
      Object.entries(supports).forEach(([k,v])=>{if(k.startsWith('gamiaula_v2_strat_')||k.startsWith('gamiaula_v2_guardian_')){if(k.endsWith(d.local_player_id)||k.includes('_'+d.local_player_id+'_'))GamiStorage.setItem(k,JSON.stringify(v));}});
    }
    P=player;GamiStorage.setItem('gamiaula_orbe_notebook',JSON.stringify(notebook));GamiStorage.setItem(EKEY,JSON.stringify(Array.isArray(d.events)?d.events.slice(-1000):[]));updateAchievements();save();log('save_imported',file.name);refresh();character();notify('Tu partida está lista para continuar.');
   });
  }catch(e){const preview=$('#import-preview');if(preview)preview.textContent=e.message||'No se pudo recuperar la copia.';}
 });
}
document.addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 if(b.dataset.recoveredCode){$("#code-value").value=b.dataset.recoveredCode;redeem();return;}
 if(b.dataset.avatar){activeAvatar=b.dataset.avatar;document.querySelectorAll("[data-avatar]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.avatar===activeAvatar));return;}
 if(b.dataset.panel){({personaje:character,inventario:inventory,codigos:codes}[b.dataset.panel]||(()=>{}))();return;}
 if(b.dataset.npc){npc(b.dataset.npc,b.id==='npc-next');return;}
 if(b.dataset.class){activeCls=b.dataset.class;document.querySelectorAll("[data-class]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.class===activeCls));return;}
 if(b.id==="create-char"){const name=$("#char-name")?.value.trim();if(!name||name.length<2){notify("Escribe un nombre de al menos dos caracteres.");return;}P=create(name,activeCls);if(save()){log("character_created",activeCls);close();refresh();notify("Tu aventura en la Academia del Orbe ha comenzado.");}return;}
 if(b.id==="code-submit"){redeem();return;}
 if(b.dataset.upgrade){const k=b.dataset.upgrade;if(!hasChar()||+P.points<1)return;if(+P.skills[k]>=20){notify("Este atributo ha alcanzado el nivel máximo.");return;}const before=P.skills[k];P.skills[k]++;P.points--;if(!P.achs.includes('primer_dev'))P.achs.push('primer_dev');updateAchievements();save();log("skill_upgrade",{skill:k,before,after:P.skills[k],points:P.points});refresh();character();notify("Atributo fortalecido.");return;}
 if(b.hasAttribute('data-import')){importSave();return;}
 if(b.hasAttribute("data-export"))exportSave();
});
$("#dialog-close").addEventListener("click",close);
back.addEventListener("click",e=>{if(e.target===back)close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!back.hidden)close();if(e.key==="Enter"&&e.target?.id==="code-value")redeem();});
const stored=getJSON(KEY,null);P=normalizePlayer(stored);
if(P){updateAchievements();save();}
window.addEventListener('pageshow',()=>{P=normalizePlayer(getJSON(KEY,null));refresh();});
window.addEventListener('storage',e=>{if(e.key===KEY||GamiStorage.moduleKeys.includes(e.key)){P=normalizePlayer(getJSON(KEY,null));refresh();}});
refresh();
if(location.hash==='#codigos')codes();
window.addEventListener('hashchange',()=>{if(location.hash==='#codigos')codes();});
})();
