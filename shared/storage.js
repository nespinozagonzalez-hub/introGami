/* One storage boundary for the whole course. No participant data leaves this browser. */
(function(global){
  'use strict';
  var memory = new Map(), persistent = true;
  try { var probe='gamiaula_storage_probe';global.localStorage.setItem(probe,'1');global.localStorage.removeItem(probe); }
  catch(e){ persistent=false; }
  function temporary(){persistent=false;global.dispatchEvent(new Event('gami-storage-temporary'));}
  global.GamiStorage=Object.freeze({
    getItem:function(k){
      if(persistent){try{return global.localStorage.getItem(k);}catch(e){temporary();}}
      if(memory.has(k))return memory.get(k);
      return null;
    },
    setItem:function(k,v){
      memory.set(k,String(v));
      if(persistent){try{global.localStorage.setItem(k,String(v));}catch(e){temporary();}}
    },
    removeItem:function(k){memory.set(k,null);if(persistent){try{global.localStorage.removeItem(k);}catch(e){temporary();}}},
    isPersistent:function(){return persistent;},
    moduleKeys:['modulo1_valle_primer_despertar_v1','modulo2_forja_v1','modulo3_arquitectura_flow_v1','consagracion_orbe_v11_all_questions_proto']
  });
  function announce(){
    if(persistent||document.getElementById('gami-storage-note'))return;
    var note=document.createElement('aside');note.id='gami-storage-note';note.setAttribute('role','status');
    note.textContent='El navegador permite una partida temporal. Descarga tu progreso antes de salir y abre el curso en una pestaña para conservarlo.';
    note.style.cssText='position:relative;z-index:100;background:#ffe1a1;color:#18283e;padding:12px 20px;font:600 13px/1.6 system-ui';
    document.body.prepend(note);
  }
  global.addEventListener('gami-storage-temporary',announce);
  document.addEventListener('DOMContentLoaded',announce);
})(window);
