/* GamiAula 2.0 — Prototipo de atributos en La Consagración del Orbe.
 * Beneficios opcionales: no modifica las respuestas ni los requisitos pedagógicos.
 */
(function(){
'use strict';
var KEY='g0100_v8',EVENTS='gamiaula_v2_events',IDKEY='gamiaula_v2_player_id',USE='gamiaula_v2_guardian_';
var AB=[
 ['narrativa','Crónica del guardián','📖'],
 ['diseno','Escudo estructural','🏛'],
 ['creatividad','Inspiración de habilidad','✦'],
 ['motivacion','Aliento restaurador','◆'],
 ['estrategia','Análisis táctico','♟']
];
var GUIDES={
 g1:'El Valle examina fundamentos: distingue componentes visibles, reglas de interacción y experiencias motivacionales.',
 g2:'La Forja valora elegir recursos con intención. La herramienta no sustituye los objetivos pedagógicos.',
 g3:'El Arquitecto pone a prueba el equilibrio entre reto y habilidad, el conocimiento de los jugadores y el diseño.',
 g4:'El Custodio del Caos requiere integrar fundamentos, herramientas, motivación, decisiones y evaluación.'
};
function read(k,d){try{var s=GamiStorage.getItem(k);return s?JSON.parse(s):d;}catch(e){return d;}}
function write(k,v){try{GamiStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}}
function p(){var x=read(KEY,null);return x&&x.skills&&x.class?x:null;}
function getId(){var id=GamiStorage.getItem(IDKEY);if(!id){id='gami_'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'_'+Math.random().toString(36).slice(2));GamiStorage.setItem(IDKEY,id);}return id;}
function guardian(){try{return typeof battle!=='undefined'&&battle.guardianId?String(battle.guardianId):null;}catch(e){return null;}}
function alive(){try{return !!(battle.guardianId&&!battle.finished);}catch(e){return false;}}
function lv(skill){var x=p();return x?Number(x.skills[skill]||0):0;}
function max(skill){var n=lv(skill);return n>=8?3:n>=5?2:n>=3?1:0;}
function uses(skill){var gid=guardian();return read(USE+getId()+'_'+gid+'_'+skill,0)||0;}
function addUse(skill){write(USE+getId()+'_'+guardian()+'_'+skill,uses(skill)+1);}
function log(type,skill,detail){
 var a=read(EVENTS,[]);if(!Array.isArray(a))a=[];
 a.push({event_id:getId()+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),player_id:getId(),at:new Date().toISOString(),type:type,module:4,station:guardian()||'camara',skill:skill||'',detail:detail||''});
 write(EVENTS,a.slice(-1500));
}
function execute(skill){
 var n=lv(skill);
 if(n<3)return 'Este talento requiere atributo nivel 3.';
 if(!alive())return 'Primero inicia un combate contra uno de los cuatro guardianes.';
 if(skill==='narrativa'){log('advantage_consulted',skill,'guardian_lore');return GUIDES[guardian()]||'El Orbe aún guarda secretos.';}
 if(uses(skill)>=max(skill))return 'Has agotado los usos de esta ventaja frente a este guardián.';
 var message='';
 if(skill==='estrategia'){
   if(!battle.currentQuestion)return 'Espera a que aparezca una pregunta de combate.';
   var q=battle.currentQuestion,choices=Array.prototype.slice.call(document.querySelectorAll('#qOptions .q-option'));
   var options=choices.filter(function(el){return Number(el.getAttribute('data-opt'))!==Number(q.answer) && !el.disabled && Number(el.getAttribute('data-opt'))!==Number(battle.questionSelected);});
   if(!options.length)return 'No quedan alternativas descartables en la pregunta actual.';
   var btn=options[(battle.questionsAsked+uses(skill))%options.length];btn.disabled=true;btn.style.opacity='.28';btn.style.textDecoration='line-through';btn.setAttribute('aria-disabled','true');
   message='Has descartado una alternativa incorrecta. La respuesta correcta sigue siendo una decisión tuya.';
 }else if(skill==='motivacion'){
   if(battle.playerHp>=battle.playerHpMax)return 'Tu energía ya está completa; reserva el aliento para cuando te haga falta.';
   var heal=n>=8?16:n>=5?12:8,old=battle.playerHp;
   battle.playerHp=Math.min(battle.playerHpMax,battle.playerHp+heal);
   updateHpBars();message='Recuperaste '+(battle.playerHp-old)+' puntos de vida. ¡Continúa con tu estrategia!';
 }else if(skill==='creatividad'){
   if(battle.skillCooldown<=0)return 'La habilidad de combate ya está lista. Utiliza este talento cuando entre en enfriamiento.';
   battle.skillCooldown=0;refreshCommandDescriptions();
   message='Tu inspiración ha restaurado la habilidad especial para el próximo turno disponible.';
 }else if(skill==='diseno'){
   if(battle.guardStance)return 'Ya tienes un escudo de protección activo.';
   battle.guardStance=true;message='Activaste una protección estructural que se aplicará según las reglas de defensa del combate.';
 }
 if(message){addUse(skill);log('advantage_activated',skill,message);}
 return message||'Consulta el estado del combate antes de activar la ventaja.';
}
function setup(){
 var st=document.createElement('style');st.textContent=
 '#gami-final-v2-btn{position:static;z-index:18000;background:#203550;color:#ffdb94;border:1px solid #f0b347;border-radius:99px;padding:12px 16px;font:700 13px system-ui;cursor:pointer}' +
 '#gami-final-v2-overlay{display:none;position:fixed;inset:0;z-index:18001;background:#020713e9;align-items:center;justify-content:center;padding:12px}' +
 '#gami-final-v2-overlay.open{display:flex}' +
 '#gami-final-v2-card{max-height:88vh;overflow:auto;width:min(740px,100%);background:#152338;border:1px solid #f0b347;border-radius:19px;padding:22px;color:#f3f6ff;font:14px/1.6 system-ui}' +
 '#gami-final-v2-card h2{color:#ffdb94;font:700 23px system-ui;margin:0}' +
 '#gami-final-v2-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin:14px 0}' +
 '.gami-final-v2-tile{background:#1d3048;padding:13px;border:1px solid #385675;border-radius:12px}' +
 '.gami-final-v2-tile p{color:#c9d7e7;font-size:13px;margin:7px 0}' +
 '#gami-final-v2-card button{padding:8px 12px;border:1px solid #e0b66a;color:#fff;background:#355271;border-radius:8px;cursor:pointer}' +
 '#gami-final-v2-card button[disabled]{opacity:.4;cursor:not-allowed}' +
 '#gami-final-v2-status{border-left:3px solid #e0b66a;background:#263c56;padding:10px;border-radius:6px;white-space:pre-wrap}@media(max-width:620px){#gami-final-v2-btn{bottom:76px;right:9px;font-size:11px;padding:10px 12px}}';
 document.head.appendChild(st);
 var btn=document.createElement('button');btn.type='button';btn.id='gami-final-v2-btn';btn.textContent='✦ Talentos del Orbe';
 var layer=document.createElement('div');layer.id='gami-final-v2-overlay';
 layer.innerHTML='<section id="gami-final-v2-card" role="dialog" aria-modal="true" aria-label="Talentos del Orbe"><div style="display:flex;justify-content:space-between;gap:14px"><h2>Talentos del Orbe</h2><button id="gami-final-v2-close" type="button">Cerrar</button></div><p id="gami-final-v2-player"></p><div id="gami-final-v2-grid"></div><div id="gami-final-v2-status" role="status">Las ventajas pueden activarse dentro de un combate.</div></section>';
 document.querySelector('.battle-meta').appendChild(btn);document.body.appendChild(layer);
 btn.addEventListener('click',function(){render();layer.classList.add('open');document.getElementById('gami-final-v2-close').focus();});
 document.getElementById('gami-final-v2-close').addEventListener('click',function(){layer.classList.remove('open');btn.focus();});
 layer.addEventListener('click',function(e){if(e.target===layer)layer.classList.remove('open');});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')layer.classList.remove('open');});
 var inp=document.getElementById('playerName'),person=p();if(person&&inp&&!inp.value)inp.value=person.name||'';
 if(typeof window.onBattleWin==='function'){
  var original=window.onBattleWin;
  window.onBattleWin=function(){var gid=guardian(),already=false;try{already=!!state[gid].done;}catch(e){}var result=original();if(!already)log('guardian_defeated','',gid);return result;};
 }
 document.addEventListener('error',function(e){
  var img=e.target;if(!img||img.tagName!=='IMG'||!img.classList.contains('battle-sprite-img'))return;
  var match=(img.className||'').match(/guardian-(g[1-4])/),g=match&&typeof getGuardian==='function'?getGuardian(match[1]):null;
  var parent=img.parentElement;if(!parent)return;
  if(g&&g.silhouetteSvg)parent.innerHTML=g.silhouetteSvg;
  else {img.style.display='none';parent.setAttribute('aria-label','Aventurero');parent.style.background='radial-gradient(circle,#e9c57b44,transparent)';}
 },true);
}
function render(){
 var person=p(),grid=document.getElementById('gami-final-v2-grid'),header=document.getElementById('gami-final-v2-player');
 if(!person){header.textContent='Abre el Centro de Comando y crea tu personaje antes de usar talentos.';grid.innerHTML='';return;}
 header.textContent=(person.name||'Aventurero')+' · '+person.class+' · Guardián: '+(guardian()||'sin combate');
 grid.innerHTML=AB.map(function(a){var n=lv(a[0]),limit=max(a[0]),left=Math.max(0,limit-uses(a[0])),help=a[0]==='narrativa'?'Una orientación contextual sobre el guardián.':a[0]==='diseno'?'Activa una defensa estructural adicional.':a[0]==='creatividad'?'Anula el enfriamiento de la habilidad especial.':a[0]==='motivacion'?'Recupera vida sin saltarte preguntas.':'Descarta una respuesta incorrecta de la pregunta actual.';
 return '<div class="gami-final-v2-tile"><strong>'+a[2]+' '+a[1]+' · nivel '+n+'</strong><p>'+help+'</p><p>'+(n<3?'Requiere nivel 3':a[0]==='narrativa'?'Consulta libre':left+' usos disponibles contra este guardián')+'</p><button data-gami-final="'+a[0]+'" '+(n<3?'disabled':'')+'>Activar ventaja</button></div>';
 }).join('');
 grid.querySelectorAll('[data-gami-final]').forEach(function(el){el.addEventListener('click',function(){
  var message=execute(el.getAttribute('data-gami-final'));render();document.getElementById('gami-final-v2-status').textContent=message;
 });});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();