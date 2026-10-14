/* Native fullscreen when available; otherwise expand only this activity in a new tab. */
(function(){
'use strict';
var busy=false,rejected=false,expandedWindow=null;
function active(){return Boolean(document.fullscreenElement||document.webkitFullscreenElement);}
function embedded(){return window.self!==window.top;}
function available(){var root=document.documentElement;return Boolean(root.requestFullscreen||root.webkitRequestFullscreen)&&document.fullscreenEnabled!==false&&document.webkitFullscreenEnabled!==false&&!rejected;}
function sync(){document.querySelectorAll('[data-gami-fullscreen]').forEach(function(button){
 var expanded=window.GamiExpanded&&window.GamiExpanded.ready;
 button.disabled=Boolean(window.GamiExpanded&&!window.GamiExpanded.ready);
 button.textContent=active()?'Salir de pantalla completa':available()?'Pantalla completa':expanded?'Volver al curso':embedded()?'Abrir vista amplia':'Vista amplia activa';
 button.setAttribute('aria-pressed',String(active()));
 if(!available()&&!expanded&&!embedded())button.disabled=true;
});}
function notice(message,offer){
 var status=document.getElementById('gami-fullscreen-status');
 if(!status){status=document.createElement('div');status.id='gami-fullscreen-status';status.setAttribute('role','status');status.style.cssText='position:fixed;left:50%;bottom:110px;transform:translateX(-50%);z-index:2147482500;width:min(480px,90vw);padding:15px 18px;border:1px solid #d4ad6c;border-radius:12px;background:#10263c;color:#edf6ff;font:14px/1.6 system-ui;box-shadow:0 10px 35px #0008';document.body.appendChild(status);}
 status.replaceChildren();var text=document.createElement('p');text.style.margin='0 0 12px';text.textContent=message;
 var close=document.createElement('button');close.type='button';close.textContent='Entendido';close.style.cssText='padding:8px 12px;background:#203e57;border:1px solid #b6a06e;color:#fff0cb;border-radius:8px';close.onclick=function(){status.hidden=true;};status.append(text,close);
 if(offer&&embedded()){var expand=document.createElement('button');expand.type='button';expand.textContent='Abrir vista amplia';expand.dataset.gamiExpand='';expand.style.cssText=close.style.cssText+';margin-left:8px';status.appendChild(expand);}
 status.hidden=false;
}
function expand(){
 if(window.GamiExpanded&&window.GamiExpanded.ready){window.GamiExpanded.returnToCourse();return;}
 if(document.body.classList.contains('in-battle')){notice('En este navegador, abre la vista amplia desde la cámara de guardianes antes de iniciar el combate. Puedes continuar este duelo dentro de Moodle.');return;}
 if(!embedded())return;
 if(expandedWindow&&!expandedWindow.closed){expandedWindow.focus();return;}
 var url=new URL(location.href);url.searchParams.set('gami_view','expanded');
 expandedWindow=window.open(url.href,'_blank');
 if(!expandedWindow){notice('El navegador bloqueó la nueva pestaña. Permite abrirla para usar la vista amplia; tu partida sigue en esta actividad.');return;}
 notice('La misma actividad se abrió en vista amplia. Su progreso se devuelve a esta pestaña del curso.');
}
async function toggle(){
 if(busy)return;
 var status=document.getElementById('gami-fullscreen-status');if(status)status.hidden=true;
 if(!active()&&!available()){expand();sync();return;}
 busy=true;
 try{
  if(active()){var exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);}
  else{var root=document.documentElement,request=root.requestFullscreen||root.webkitRequestFullscreen;await request.call(root);}
 }catch(error){rejected=true;notice('Este navegador no permitió la pantalla completa. Puedes abrir esta misma actividad en una vista más amplia.',true);}
 finally{busy=false;sync();}
}
document.addEventListener('click',function(event){if(event.target.closest('[data-gami-fullscreen]'))toggle();else if(event.target.closest('[data-gami-expand]'))expand();});
document.addEventListener('fullscreenchange',sync);document.addEventListener('webkitfullscreenchange',sync);
window.GamiFullscreen={toggle:toggle,sync:sync,notice:notice};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync);else sync();
})();
