/* One storage boundary for the whole course. No participant data leaves this browser. */
(function(global){
  'use strict';
  var memory = new Map(), persistent = true, session=false, backing=null;
  try { var probe='gamiaula_storage_probe';global.localStorage.setItem(probe,'1');global.localStorage.removeItem(probe); }
  catch(e){ persistent=false; }
  function temporary(){persistent=false;global.dispatchEvent(new Event('gami-storage-temporary'));}
  var moduleKeys=['modulo1_valle_primer_despertar_v1','modulo2_forja_v1','modulo3_arquitectura_flow_v1','consagracion_orbe_v11_all_questions_proto'];
  function allowed(k){return ['g0100_v8','gamiaula_orbe_notebook','gamiaula_v2_events','gamiaula_v2_player_id'].concat(moduleKeys).includes(k)||/^gamiaula_v2_(strat_[1-3]_|guardian_)[A-Za-z0-9_-]+$/.test(k);}
  function changed(k,v){if(allowed(k))global.dispatchEvent(new CustomEvent('gami-storage-change',{detail:{key:k,value:v}}));}
  global.GamiStorage=Object.freeze({
    getItem:function(k){
      if(persistent&&!session){try{return global.localStorage.getItem(k);}catch(e){temporary();}}
      if(memory.has(k))return memory.get(k);
      return null;
    },
    setItem:function(k,v){
      var before=global.GamiStorage.getItem(k);memory.set(k,String(v));
      if(persistent&&!session){try{global.localStorage.setItem(k,String(v));}catch(e){temporary();}}
      if(before!==String(v))changed(k,String(v));
    },
    removeItem:function(k){var before=global.GamiStorage.getItem(k);memory.set(k,null);if(persistent&&!session){try{global.localStorage.removeItem(k);}catch(e){temporary();}}if(before!==null)changed(k,null);},
    isPersistent:function(){if(session){try{return Boolean(backing&&backing());}catch(e){return false;}}return persistent;},
    useSession:function(provider){session=true;backing=provider;},
    moduleKeys:moduleKeys,
    allowedKey:allowed,
    snapshot:function(){
      var keys=new Set(['g0100_v8','gamiaula_orbe_notebook','gamiaula_v2_events','gamiaula_v2_player_id'].concat(moduleKeys));
      memory.forEach(function(v,k){if(allowed(k))keys.add(k);});
      if(persistent&&!session){try{for(var i=0;i<global.localStorage.length;i++){var key=global.localStorage.key(i);if(allowed(key))keys.add(key);}}catch(e){temporary();}}
      var result={};keys.forEach(function(k){result[k]=global.GamiStorage.getItem(k);});return result;
    },
    restore:function(snapshot){if(!snapshot||typeof snapshot!=='object'||Array.isArray(snapshot))throw Error('Invalid game snapshot');Object.keys(snapshot).forEach(function(k){if(!allowed(k))return;var v=snapshot[k];if(v===null)global.GamiStorage.removeItem(k);else if(typeof v==='string'&&v.length<=2000000)global.GamiStorage.setItem(k,v);});}
  });
  function announce(){
    if(global.GamiStorage.isPersistent()||document.getElementById('gami-storage-note'))return;
    var note=document.createElement('aside');note.id='gami-storage-note';note.setAttribute('role','status');
    note.textContent='El navegador permite una partida temporal. Descarga tu progreso antes de salir y abre el curso en una pestaña para conservarlo.';
    note.style.cssText='position:relative;z-index:100;background:#ffe1a1;color:#18283e;padding:12px 20px;font:600 13px/1.6 system-ui';
    document.body.prepend(note);
  }
  global.addEventListener('gami-storage-temporary',announce);
  document.addEventListener('DOMContentLoaded',announce);
})(window);
