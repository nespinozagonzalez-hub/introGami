(function(){
"use strict";
var config={
 "1":{name:"Valle del Primer Despertar",npc:"orion",guide:"Soy Orión, el primer guardián. Recuerda distinguir dinámica, mecánica y componente; el objetivo pedagógico debe dar sentido a la experiencia."},
 "2":{name:"Forja de Herramientas",npc:"lira",guide:"Soy Lira. Antes de elegir una plataforma, piensa qué harán los jugadores y qué evidencia de aprendizaje esperas observar."},
 "3":{name:"Arquitectura y Flow",npc:"valen",guide:"Soy Valen. El desafío más complejo no siempre es el más interesante: calibrar el reto requiere comprender a tus estudiantes."},
 "4":{name:"Consagración del Orbe",npc:"kael",guide:"Soy Kael. En esta batalla necesitarás precisión, calma y decisiones bien pensadas. Los combates pueden repetirse."}
};
var m=location.pathname.match(/\/modulos\/([1-4])\//),n=m?m[1]:"1",o=config[n];
var goHome="../../index.html";
var prompts={
 "1":["¿Qué aprendizaje de tu aula quieres transformar y por qué?","¿Cómo conectarías una narrativa, una regla y un componente con ese aprendizaje?","¿Qué evidencia te permitiría saber si tu propuesta ayudó a aprender?"],
 "2":["¿Qué harán los participantes antes de escoger una herramienta?","¿Cómo funcionaría la misma misión con y sin conexión?","¿Qué retroalimentación y evidencia acompañarán la actividad?"],
 "3":["¿Qué necesitas conocer de tu grupo para ajustar el desafío?","¿Qué elecciones reales ofrecerás a jugadores con intereses diferentes?","¿Qué cambiarías si observas aburrimiento o ansiedad?"],
 "4":["¿Cómo se relacionan las decisiones de tu experiencia con el aprendizaje?","¿Qué apoyo resultó útil y cómo lo aplicarías en tu aula?","¿Qué revisarás después de la primera implementación?"]
};
function readNotebook(){try{return JSON.parse(GamiStorage.getItem('gamiaula_orbe_notebook')||'{}');}catch(e){return {};}}
function escape(value){return String(value||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function setup(){
 document.body.classList.add('orbe-module','orbe-module-'+n);
 var sigil=document.querySelector('#landing .sigil');if(sigil)sigil.innerHTML='<img src="../../assets/illustrations/'+o.npc+'.webp" alt="Tu guía del territorio">';

 var float=document.createElement("div");float.className="g-rm-float";float.innerHTML='<a class="g-rm-button g-rm-home" href="'+goHome+'" aria-label="Volver a la Academia del Orbe">← Mapa del Orbe</a><button type="button" id="g-rm-talk" class="g-rm-button"><img src="../../assets/illustrations/'+o.npc+'.webp" alt=""> Hablar con guía</button>';
 var modal=document.createElement("div");modal.className="g-rm-modal";modal.id="g-rm-modal";
 modal.innerHTML='<section class="g-rm-dialog" role="dialog" aria-modal="true" aria-labelledby="g-rm-title"><header><div><small style="color:#ebc480;letter-spacing:.18em">GUÍA DEL TERRITORIO</small><h2 id="g-rm-title">'+o.name+'</h2></div><button type="button" id="g-rm-close">Cerrar</button></header><div id="g-rm-content"><div class="g-rm-body"><img class="g-rm-portrait" src="../../assets/illustrations/'+o.npc+'.webp" alt=""><div><p>'+o.guide+'</p><p>Regresa a los archivos cuando necesites reforzar una idea. Lleva a tu aula lo que descubras en este territorio.</p><button type="button" id="g-rm-notebook">Abrir mi bitácora</button></div></div></div></section>';
 document.body.appendChild(float);document.body.appendChild(modal);
 var open=document.getElementById("g-rm-talk"),close=document.getElementById("g-rm-close");
 var originalContent=document.getElementById('g-rm-content').innerHTML;
 function bindNotebook(){document.getElementById('g-rm-notebook').addEventListener('click',notebook);}
 function notebook(){
  var notes=readNotebook(),answers=notes[n]||['','',''];
  document.getElementById('g-rm-content').innerHTML='<p>Relaciona lo que aprendiste con una propuesta para tu grupo. Tu bitácora se guarda en este navegador y se incluye cuando descargas tu partida.</p>'+prompts[n].map(function(q,i){return '<label class="g-rm-prompt" for="g-rm-answer-'+i+'">'+q+'</label><textarea id="g-rm-answer-'+i+'" data-notebook="'+i+'" maxlength="3000" rows="3">'+escape(answers[i])+'</textarea>';}).join('')+'<p id="g-rm-saved" role="status">Puedes escribir a tu ritmo.</p>';
  document.querySelectorAll('[data-notebook]').forEach(function(input){input.addEventListener('input',function(){var book=readNotebook();if(!Array.isArray(book[n]))book[n]=['','',''];book[n][Number(input.dataset.notebook)]=input.value;GamiStorage.setItem('gamiaula_orbe_notebook',JSON.stringify(book));document.getElementById('g-rm-saved').textContent=GamiStorage.isPersistent()?'Bitácora guardada en este navegador.':'Bitácora temporal: descarga tu partida antes de salir.';});input.addEventListener('change',function(){var events;try{events=JSON.parse(GamiStorage.getItem('gamiaula_v2_events')||'[]');}catch(e){events=[];}if(!Array.isArray(events))events=[];events.push({event_id:'note_'+Date.now()+'_'+Math.random().toString(36).slice(2),at:new Date().toISOString(),type:'decision_changed',module:Number(n),station:'bitacora',detail:'reflection_'+input.dataset.notebook});GamiStorage.setItem('gamiaula_v2_events',JSON.stringify(events.slice(-1000)));});});
  document.getElementById('g-rm-answer-0').focus();
 }
 open.addEventListener("click",function(){document.getElementById('g-rm-content').innerHTML=originalContent;bindNotebook();modal.classList.add("open");close.focus();});
 bindNotebook();
 close.addEventListener("click",function(){modal.classList.remove("open");open.focus();});
 modal.addEventListener("click",function(e){if(e.target===modal)modal.classList.remove("open");});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")modal.classList.remove("open");});
}
document.addEventListener('click',function(e){if(e.target.closest('#startRouteBtn'))window.scrollTo({top:0,behavior:'instant'});});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup();
})();
