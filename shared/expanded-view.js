/* Runs before activity scripts. Only the same-origin, same-activity opener can transfer a save. */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('gami_view')!=='expanded')return;
var original=null,timer;
function valid(){try{return original&&!original.closed&&original.location.origin===location.origin&&original.location.pathname===location.pathname;}catch(error){return false;}}
try{
 original=window.opener;
 if(!valid()||!original.GamiStorage)throw Error('Missing activity opener');
 GamiStorage.useSession(function(){return valid()&&original.GamiStorage.isPersistent();});
 GamiStorage.restore(original.GamiStorage.snapshot());
 window.GamiExpanded={ready:true,returnToCourse:function(){
  if(document.body.classList.contains('in-battle')){show('Completa el combate antes de volver al curso. Los guardianes vencidos sí quedan guardados.');return;}
  if(valid()){clearTimeout(timer);original.dispatchEvent(new CustomEvent('gami-expanded-update'));var status=original.document.getElementById('gami-fullscreen-status');if(status)status.hidden=true;original.focus();window.close();}
  else show('La pestaña del curso ya no está disponible. Tu partida sigue en esta vista; puedes descargarla desde el Centro de Comando.');
 }};
 window.addEventListener('gami-storage-change',function(event){
  if(!GamiStorage.allowedKey(event.detail.key))return;
  if(!valid()){window.dispatchEvent(new Event('gami-storage-temporary'));show('La pestaña del curso se cerró. Conserva esta vista y descarga tu partida antes de salir.');return;}
  try{
   if(event.detail.value===null)original.GamiStorage.removeItem(event.detail.key);else original.GamiStorage.setItem(event.detail.key,event.detail.value);
   clearTimeout(timer);timer=setTimeout(function(){if(valid())original.dispatchEvent(new CustomEvent('gami-expanded-update'));},80);
  }catch(error){show('No pudimos actualizar la pestaña del curso. Conserva esta vista y descarga tu partida antes de cerrarla.');}
 });
}catch(error){
 window.GamiExpanded={ready:false};
 document.addEventListener('DOMContentLoaded',function(){
  var panel=document.createElement('section');panel.id='gami-expanded-blocked';panel.setAttribute('role','alert');
  panel.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#0c2032;color:#e5f3ff;padding:30px;display:grid;align-content:center;gap:18px;font:16px/1.7 system-ui';
  var title=document.createElement('h1');title.textContent='Vuelve a la actividad de Moodle';
  var text=document.createElement('p');text.textContent='El navegador no permitió transferir tu partida. Para evitar que continúes con un personaje diferente, abre la vista amplia desde el botón de la actividad original. Tu partida original no se ha borrado.';
  var close=document.createElement('button');close.textContent='Cerrar esta vista';close.type='button';close.onclick=function(){window.close();};
  panel.append(title,text,close);document.body.appendChild(panel);
 });
}
function show(message){if(window.GamiFullscreen)GamiFullscreen.notice(message);}
document.addEventListener('DOMContentLoaded',function(){
 if(!window.GamiExpanded.ready)return;
 document.body.classList.add('gami-expanded-enabled');
 var style=document.createElement('style');style.textContent='.gami-expanded-enabled{padding-top:var(--gami-expanded-height,60px)!important}.gami-expanded-enabled .topbar{top:var(--gami-expanded-height,60px)}.gami-expanded-enabled .landing{top:var(--gami-expanded-height,60px)!important;min-height:calc(100dvh - var(--gami-expanded-height,60px))!important}.gami-expanded-enabled .app{height:calc(100dvh - var(--gami-expanded-height,60px))!important;min-height:calc(100dvh - var(--gami-expanded-height,60px))!important}@media(max-width:980px){.gami-expanded-enabled .app{height:auto!important}}';document.head.appendChild(style);
 var bar=document.createElement('aside');bar.id='gami-expanded-bar';bar.setAttribute('aria-label','Vista amplia de la actividad');
 bar.style.cssText='position:fixed;top:0;left:0;right:0;z-index:201;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:12px 16px;background:#102c43;color:#e4f3ff;border-bottom:1px solid #79b4cc;font:12px/1.6 system-ui';
 var text=document.createElement('span');text.textContent='Vista amplia · misma actividad y partida';
 var back=document.createElement('button');back.id='gami-return-course';back.type='button';back.textContent='Volver al curso';back.style.cssText='border:1px solid #e8c181;border-radius:9px;background:#17384f;color:#ffe5b4;padding:9px 13px;font:700 12px system-ui';back.onclick=window.GamiExpanded.returnToCourse;
 bar.append(text,back);document.body.prepend(bar);
 function fit(){document.body.style.setProperty('--gami-expanded-height',bar.offsetHeight+'px');}fit();window.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(bar);
});
})();
