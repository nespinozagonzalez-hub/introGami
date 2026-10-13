/* GamiAula 2.0: conexión preparada, DESACTIVADA por defecto.
   No almacena secretos y no envía datos hasta que se configure un /exec real. */
(function(global){
"use strict";
var endpoint = "";
function configure(url){
  var value=String(url||"").trim();
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[-\w]+\/exec(?:\?.*)?$/.test(value)) throw new Error("Se requiere URL /exec original de Google Apps Script.");
  endpoint=value.split("?")[0]; return true;
}
async function ping(){
  if(!endpoint)throw new Error("Falta URL /exec.");
  var res;
  try{res=await fetch(endpoint,{method:"GET",mode:"cors",credentials:"omit",redirect:"follow",signal:AbortSignal.timeout(15000)});}
  catch(e){throw new Error("La URL no pudo consultarse desde el navegador: posible restricción CORS/redirect; se requiere puente o proxy antes de producción.");}
  if(!res.ok)throw new Error("Error HTTP "+res.status);
  var data=await res.json();if(!data.ok)throw new Error("El servicio no respondió correctamente.");return data;
}
async function call(action,payload){
  if(!endpoint)throw new Error("Falta URL /exec.");
  if(!["register","profile","advantages","redeem","allocate","event","delete_account"].includes(action))throw new Error("Acción no admitida.");
  var res;
  try{res=await fetch(endpoint,{method:"POST",mode:"cors",credentials:"omit",redirect:"follow",signal:AbortSignal.timeout(15000),headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify(Object.assign({},payload||{},{action:action}))});}
  catch(e){throw new Error("No pudimos leer la respuesta del servidor. La operación puede haberse aplicado: consulta el perfil antes de volver a enviarla.");}
  if(!res.ok)throw new Error("Error HTTP "+res.status);
  var data=await res.json();if(!data.ok)throw new Error(data.error||"Operación rechazada.");return data;
}
global.GamiAulaSheetAPI=Object.freeze({configure:configure,ping:ping,call:call});
})(window);
