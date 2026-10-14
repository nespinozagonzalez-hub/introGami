/* Fullscreen belongs to the current iframe; it never changes the course route. */
(function(){
'use strict';
var busy=false;
function active(){return Boolean(document.fullscreenElement||document.webkitFullscreenElement);}
function sync(){document.querySelectorAll('[data-gami-fullscreen]').forEach(function(button){button.textContent=active()?'Salir de pantalla completa':'Pantalla completa';button.setAttribute('aria-pressed',String(active()));});}
function notice(message){
 var status=document.getElementById('gami-fullscreen-status');
 if(!status){status=document.createElement('div');status.id='gami-fullscreen-status';status.setAttribute('role','status');status.style.cssText='position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:2147482500;width:min(480px,90vw);padding:15px 18px;border:1px solid #d4ad6c;border-radius:12px;background:#10263c;color:#edf6ff;font:14px/1.6 system-ui;box-shadow:0 10px 35px #0008';document.body.appendChild(status);}
 status.textContent=message;status.hidden=false;
}
async function toggle(){
 if(busy)return;
 busy=true;
 var status=document.getElementById('gami-fullscreen-status');if(status)status.hidden=true;
 try{
  if(active()){var exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);}
  else{
   var root=document.documentElement,request=root.requestFullscreen||root.webkitRequestFullscreen;
   if(!request){notice('Este navegador no ofrece pantalla completa para esta actividad. Puedes seguir usando el marco de Moodle.');return;}
   await request.call(root);
  }
 }catch(error){notice('El navegador o Moodle no permitió activar la pantalla completa. Puedes continuar en el marco de la actividad.');}
 finally{busy=false;sync();}
}
document.addEventListener('click',function(event){if(event.target.closest('[data-gami-fullscreen]'))toggle();});
document.addEventListener('fullscreenchange',sync);document.addEventListener('webkitfullscreenchange',sync);
window.GamiFullscreen={toggle:toggle,sync:sync};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync);else sync();
})();
