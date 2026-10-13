/* Shared territory presentation and navigation. Uses the original activity state. */
(function(){
'use strict';
var match=location.pathname.match(/\/modulos\/([1-4])\//);
if(!match)return;
var number=Number(match[1]);
var territories=[
 {name:'El Primer Despertar',guide:'orion',guideName:'Maestro Orión',goal:'Relaciona dinámica, mecánica y componente con un objetivo de aprendizaje.',gift:'3 misiones · fundamentos',lore:'Orión te recibe en el Valle. Explora las piezas del juego, descubre cómo se conectan con el aprendizaje y recupera los primeros fragmentos de tu aventura.'},
 {name:'La Forja de Herramientas',guide:'lira',guideName:'Lira',goal:'Elige herramientas y recursos por la actividad y la evidencia que necesitas.',gift:'3 misiones · aplicación',lore:'Lira abre los archivos de la Forja. Aquí transformarás ideas en actividades con propósito: combina herramientas, materiales e inteligencia artificial y pon a prueba tus decisiones.'},
 {name:'Arquitectura y Flow',guide:'valen',guideName:'Valen',goal:'Ajusta el desafío, las elecciones y los apoyos a las características de tu grupo.',gift:'3 misiones · diseño',lore:'Valen te espera ante el tablero del Arquitecto. Conoce a tus jugadores, calibra el desafío y ensambla una experiencia que invite a participar, decidir y aprender.'},
 {name:'La Consagración del Orbe',guide:'kael',guideName:'Kael',goal:'Integra fundamentos, herramientas y diseño para decidir frente a situaciones educativas.',gift:'4 guardianes · integración'}
];
var territory=territories[number-1];
function element(tag,cls,text){var el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;}
function snapshot(){try{return typeof state!=='undefined'?state:{};}catch(e){return {};}}
function doneCount(){try{return typeof countDone==='function'?countDone():0;}catch(e){return 0;}}
function navigate(id){
 if(number===4||typeof STATIONS==='undefined'||!STATIONS.some(function(s){return s.id===id;}))return;
 state.currentStation=id;saveState();renderAll();
 var heading=document.querySelector('.station-view.active h2');
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:'instant'});}
}
function codeActions(box,code){
 if(!code||box.querySelector('.fragment-actions'))return;
 var actions=element('div','fragment-actions');
 var copy=element('button','journey-button','Copiar fragmento');copy.type='button';copy.dataset.copyFragment=code;
 var register=element('a','journey-button journey-secondary','Registrar con Nexo');register.href='../../index.html#codigos';
 var status=element('span','fragment-copy-status');status.setAttribute('role','status');
 actions.append(copy,register,status);box.appendChild(actions);
}
function refresh(){
 var saved=snapshot(),total=number===4?4:3,done=doneCount();
 document.querySelectorAll('[data-territory-progress]').forEach(function(el){el.textContent=done+' / '+total+(number===4?' guardianes vencidos':' misiones superadas');});
 var start=document.getElementById('startRouteBtn');
 if(start)start.textContent=saved.currentStation&&saved.currentStation!=='portal'?'Continuar mi ruta':'Iniciar ruta';
 if(number===4){
  var final=document.getElementById('journey-final');
  if(final){final.hidden=done!==4;if(done===4)codeActions(final,'ORBE2026');}
  return;
 }
 if(typeof STATIONS==='undefined')return;
 var active=STATIONS.findIndex(function(s){return s.id===saved.currentStation;});
 document.querySelectorAll('#stationMenu .station-btn').forEach(function(btn,i){
  if(i===active)btn.setAttribute('aria-current','step');else btn.removeAttribute('aria-current');
  btn.setAttribute('aria-controls','orbe-station-'+STATIONS[i].id);
 });
 document.querySelectorAll('.station-view').forEach(function(view,i){
  view.id='orbe-station-'+STATIONS[i].id;
  if(view.querySelector('.station-flow'))return;
  var flow=element('nav','station-flow');flow.setAttribute('aria-label','Avanzar por las estaciones');
  var label=element('span','station-step','Estación '+(i+1)+' de '+STATIONS.length);
  flow.appendChild(label);
  if(i>0){var previous=element('button','journey-button journey-secondary','← Estación anterior');previous.type='button';previous.dataset.journeyStation=STATIONS[i-1].id;flow.appendChild(previous);}
  if(i<STATIONS.length-1){var next=element('button','journey-button','Siguiente estación →');next.type='button';next.dataset.journeyStation=STATIONS[i+1].id;flow.appendChild(next);}
  else{
   var register=element('a','journey-button journey-secondary','Registrar mis fragmentos');register.href='../../index.html#codigos';flow.appendChild(register);
   if(done===3){var onward=element('a','journey-button','Continuar al módulo '+(number+1)+' →');onward.href='../'+(number+1)+'/index.html';flow.appendChild(onward);}
   else{var pending=STATIONS.find(function(s){return s.key&&!saved[s.key];});if(pending){var finish=element('button','journey-button','Volver a una misión pendiente');finish.type='button';finish.dataset.journeyStation=pending.id;flow.appendChild(finish);}}
  }
  view.appendChild(flow);
 });
 document.querySelectorAll('.code-reveal').forEach(function(box){var code=box.querySelector('b');if(code)codeActions(box,code.textContent.trim());});
 document.querySelectorAll('[data-cross]').forEach(function(input,i){input.setAttribute('aria-label','Respuesta de la palabra '+(i+1));});
 document.querySelectorAll('[data-pair],[data-match]').forEach(function(input,i){input.setAttribute('aria-label','Relacionar el concepto '+(i+1));});
 document.querySelectorAll('.question').forEach(function(question,i){var h=question.querySelector('h4');if(!h)return;h.id='territory-question-'+i;question.setAttribute('role','group');question.setAttribute('aria-labelledby',h.id);});
}
function setup(){
 document.body.classList.add('orbe-journey','orbe-territory-'+number);
 var card=document.querySelector(number===4?'.intro-card':'.landing-card');
 if(!card)return;
 var compass=element('nav','module-compass');compass.setAttribute('aria-label','Territorios del curso');
 var home=element('a','compass-home','← Academia');home.href='../../index.html';compass.appendChild(home);
 territories.forEach(function(t,i){var link=element('a','compass-territory',String(i+1).padStart(2,'0'));link.href='../'+(i+1)+'/index.html';link.setAttribute('aria-label','Módulo '+(i+1)+': '+t.name);if(i+1===number)link.setAttribute('aria-current','page');compass.appendChild(link);});
 var scene=element('div','territory-scene');
 var img=element('img','territory-guide');img.src='../../assets/illustrations/'+territory.guide+'.webp';img.alt=territory.guideName+', guía de este territorio';img.width=220;img.height=220;img.decoding='async';
 var caption=element('div','territory-caption');caption.append(element('small','','TERRITORIO '+String(number).padStart(2,'0')),element('strong','',territory.guideName+' te acompaña'),element('span','',territory.gift));scene.append(img,caption);
 card.prepend(compass,scene);
 var goal=element('div','territory-goal');goal.append(element('strong','','Tu propósito en este territorio'),element('p','',territory.goal));
 var progress=element('span','territory-progress');progress.dataset.territoryProgress='';goal.appendChild(progress);
 var subtitle=card.querySelector(number===4?'.intro-lore':'.subtitle');if(territory.lore)subtitle.textContent=territory.lore;subtitle.after(goal);
 var startActions=card.querySelector('.btns');if(startActions)goal.after(startActions);
 var originalNotice=card.querySelector('.intro-notice');if(originalNotice)originalNotice.remove();
 var note=element('p','territory-save-note',GamiStorage.isPersistent()?'Tu avance se guarda en este navegador. Puedes descargar una copia desde la Academia.':'Partida temporal: descarga una copia desde la Academia antes de salir.');
 card.appendChild(note);
 if(number===4){var final=element('section','journey-final');final.id='journey-final';final.hidden=true;final.append(element('h3','','El Orbe está completo'),element('p','','Regresa con Nexo para registrar tu consagración. Este logro no entrega experiencia adicional.'));document.querySelector('#screen-hub .screen-pad').appendChild(final);}
 refresh();
}
document.addEventListener('click',async function(e){
 var station=e.target.closest('[data-journey-station]');if(station){navigate(station.dataset.journeyStation);return;}
 var copy=e.target.closest('[data-copy-fragment]');if(!copy)return;
 var status=copy.parentElement.querySelector('.fragment-copy-status');
 try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error('clipboard unavailable');await navigator.clipboard.writeText(copy.dataset.copyFragment);status.textContent='Fragmento copiado.';}
 catch(error){var field=copy.parentElement.querySelector('input');if(!field){field=element('input','fragment-copy-field');field.readOnly=true;field.setAttribute('aria-label','Fragmento para copiar manualmente');copy.parentElement.appendChild(field);}field.value=copy.dataset.copyFragment;field.focus();field.select();status.textContent='Selecciona y copia este fragmento.';}
});
window.GamiJourney={refresh:refresh};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
