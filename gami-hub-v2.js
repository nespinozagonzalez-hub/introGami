/* GamiAula 2.0 — extensión del Centro de Comando v8.
 * Los códigos siguen validándose con el motor original.
 */
(function(){
'use strict';
var ALIAS={VAL214:'AXR314',VIN582:'LUM582',RES307:'VYR207',FOR214:'NEX451',ARC582:'ORB126',RIT307:'KRN693',FLW214:'ZEN248',ARC583:'ELD570',MEM307:'MIR831'};
var FIELDS=[
 ['narrativa','Narrativa','📖','Crónicas y pistas conceptuales en contexto'],
 ['diseno','Diseño','🏛','Organizadores y secuencias para analizar'],
 ['creatividad','Creatividad','✦','Retos de transferencia y creación'],
 ['motivacion','Motivación','◆','Orientaciones para perseverar y mejorar'],
 ['estrategia','Estrategia','♟','Descartar alternativas incorrectas de un quiz']
];
var EVENTS='gamiaula_v2_events', IDKEY='gamiaula_v2_player_id';
function parse(k,v){try{var x=localStorage.getItem(k);return x?JSON.parse(x):v;}catch(e){return v;}}
function getPlayer(){try{return typeof P!=='undefined'&&P&&P.skills?P:null;}catch(e){return null;}}
function getId(){var x=localStorage.getItem(IDKEY);if(!x){x='gami_'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'_'+Math.random().toString(36).slice(2));localStorage.setItem(IDKEY,x);}return x;}
function log(type,detail,skill){
 var a=parse(EVENTS,[]);if(!Array.isArray(a))a=[];
 a.push({event_id:getId()+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),player_id:getId(),at:new Date().toISOString(),type:type,module:0,station:'centro',skill:skill||'',detail:detail||''});
 try{localStorage.setItem(EVENTS,JSON.stringify(a.slice(-1500)));}catch(e){}
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function setup(){
 if(typeof window.valCode==='function'){
  var validate=window.valCode;
  window.valCode=function(input){
   var entered=String(input||'').trim().toUpperCase(),canonical=ALIAS[entered]||entered,p=getPlayer(),before=p&&p.codes?p.codes.length:0;
   var result=validate(canonical);p=getPlayer();
   if(p&&p.codes&&p.codes.length>before){
    log('code_activated',canonical);
    var el=document.getElementById('cres');
    if(el&&canonical!==entered)el.textContent+=' · Código '+entered+' vinculado a '+canonical+'.';
   }
   return result;
  };
 }
 if(typeof window.confDev==='function'){
  var assign=window.confDev;
  window.confDev=function(){
   var p=getPlayer(),before=p?Object.assign({},p.skills):{},out=assign();p=getPlayer();
   if(p)FIELDS.forEach(function(f){var a=Number(before[f[0]])||0,b=Number(p.skills[f[0]])||0;if(b>a)log('skill_upgrade',a+'>'+b,f[0]);});
   return out;
  };
 }
 var form=document.getElementById('bcreate');
 if(form)form.addEventListener('click',function(){var p=getPlayer();if(p){getId();log('character_created','class:'+p.class);}});
 var st=document.createElement('style');st.textContent=
 '#gami-v2-btn{position:fixed;right:18px;bottom:18px;z-index:200000;background:#182743;color:#ffe0a2;border:1px solid #c9a84c;border-radius:100px;padding:12px 17px;font:700 13px system-ui;cursor:pointer}' +
 '#gami-v2-layer{display:none;position:fixed;inset:0;z-index:200001;background:#02050ee9;align-items:center;justify-content:center;padding:15px}' +
 '#gami-v2-layer.open{display:flex}' +
 '#gami-v2-panel{color:#eef5ff;background:#0e1a2b;border:1px solid #c9a84c;border-radius:18px;width:min(800px,100%);max-height:90vh;overflow:auto;padding:22px;font:14px/1.6 system-ui,sans-serif}' +
 '#gami-v2-panel h2{font:700 23px system-ui;color:#eed18a;margin:0}' +
 '#gami-v2-panel p{color:#b8c8e3;margin:8px 0 13px}' +
 '#gami-v2-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}' +
 '.gami-v2-card{padding:12px;border:1px solid #345270;background:#15283d;border-radius:12px}' +
 '#gami-v2-panel a{color:#a6e5f7}' +
 '#gami-v2-panel button{background:#254469;color:#fff;border:1px solid #c9a84c;border-radius:9px;padding:8px 12px;cursor:pointer}';
 document.head.appendChild(st);
 var btn=document.createElement('button');btn.id='gami-v2-btn';btn.type='button';btn.textContent='✦ Ventajas 2.0';
 var layer=document.createElement('div');layer.id='gami-v2-layer';
 layer.innerHTML='<section id="gami-v2-panel" role="dialog" aria-modal="true" aria-label="Ventajas del aventurero"><div style="display:flex;justify-content:space-between;gap:14px"><h2>Ventajas del aventurero</h2><button id="gami-v2-x" type="button">Cerrar</button></div><p id="gami-v2-intro"></p><div id="gami-v2-cards"></div><p>Los beneficios se activan dentro de las misiones. El registro es local hasta incorporar Google Sheets.</p><button id="gami-v2-export" type="button">Exportar mi progreso (JSON)</button></section>';
 document.body.appendChild(btn);document.body.appendChild(layer);
 btn.addEventListener('click',function(){render();layer.classList.add('open');document.getElementById('gami-v2-x').focus();});
 document.getElementById('gami-v2-x').addEventListener('click',function(){layer.classList.remove('open');btn.focus();});
 layer.addEventListener('click',function(e){if(e.target===layer)layer.classList.remove('open');});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')layer.classList.remove('open');});
 document.getElementById('gami-v2-export').addEventListener('click',function(){
  var p=getPlayer();if(!p)return;
  var payload={version:2,exported_at:new Date().toISOString(),player_id:getId(),player:p,events:parse(EVENTS,[])};
  var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='gamiaula-mi-progreso-v2.json';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);log('progress_export','local_json');
 });
}
function render(){
 var p=getPlayer(), intro=document.getElementById('gami-v2-intro'),cards=document.getElementById('gami-v2-cards');
 if(!p){intro.textContent='Primero crea tu personaje en el Centro de Comando.';cards.innerHTML='';return;}
 intro.textContent=p.name+' · Clase '+p.class+'. Alcanza nivel 3 de un atributo para desbloquear su primera ventaja, nivel 5 para mejorarla y nivel 8 para dominarla.';
 cards.innerHTML=FIELDS.map(function(f){
  var n=Number(p.skills[f[0]])||0,t=n>=8?3:n>=5?2:n>=3?1:0;
  return '<div class="gami-v2-card"><strong>'+f[2]+' '+esc(f[1])+' · nivel '+n+'</strong><p>'+esc(f[3])+'</p><small>'+(t?'Dominio '+t+' disponible':'Bloqueado · requiere nivel 3')+'</small></div>';
 }).join('');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();