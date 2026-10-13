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
function setup(){
 var float=document.createElement("div");float.className="g-rm-float";float.innerHTML='<a class="g-rm-button g-rm-home" href="'+goHome+'" aria-label="Volver a la Academia del Orbe">← Mapa del Orbe</a><button type="button" id="g-rm-talk" class="g-rm-button"><img src="../../assets/npc/'+o.npc+'.svg" alt=""> Hablar con guía</button>';
 var modal=document.createElement("div");modal.className="g-rm-modal";modal.id="g-rm-modal";
 modal.innerHTML='<section class="g-rm-dialog" role="dialog" aria-modal="true" aria-labelledby="g-rm-title"><header><div><small style="color:#ebc480;letter-spacing:.18em">GUÍA DEL TERRITORIO</small><h2 id="g-rm-title">'+o.name+'</h2></div><button type="button" id="g-rm-close">Cerrar</button></header><div class="g-rm-body"><img class="g-rm-portrait" src="../../assets/npc/'+o.npc+'.svg" alt=""><div><p>'+o.guide+'</p><p>Si necesitas reforzar tus ideas, regresa a la estación de archivos del módulo: conserva los videos y documentos originales.</p><a href="'+goHome+'" style="color:#a6e8f8;text-decoration:underline">Regresar al mapa general</a></div></div></section>';
 document.body.appendChild(float);document.body.appendChild(modal);
 var open=document.getElementById("g-rm-talk"),close=document.getElementById("g-rm-close");
 open.addEventListener("click",function(){modal.classList.add("open");close.focus();});
 close.addEventListener("click",function(){modal.classList.remove("open");open.focus();});
 modal.addEventListener("click",function(e){if(e.target===modal)modal.classList.remove("open");});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")modal.classList.remove("open");});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup();
})();