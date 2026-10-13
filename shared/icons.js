(function(global){
 'use strict';
 var paths={book:'M4 5h6l2 2 2-2h6v14h-6l-2 2-2-2H4z M12 7v14',map:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16',spark:'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',tool:'M5 4l8 8 M3 6l4-4 4 4-4 4z M13 12l7 7-2 2-7-7 M17 3l4 4-10 10-4-4z',flow:'M3 8c4-7 6 7 10 0s6 7 8 0 M3 16c4-7 6 7 10 0s6 7 8 0',card:'M5 3h14v18H5z M8 7h8 M8 11h8 M8 15h5',compass:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M16 8l-3 5-5 3 3-5z',code:'M8 5L2 12l6 7 M16 5l6 7-6 7 M14 3l-4 18'};
 function svg(name){return '<svg class="g-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[name]||paths.spark)+'"/></svg>';}
 function apply(){
  document.querySelectorAll('.station-icon').forEach(function(el){if(el.querySelector('svg'))return;var text=el.parentElement.textContent.toLowerCase(),name=/archivo/.test(text)?'book':/portal/.test(text)?'map':/memoria|memor|resonancia/.test(text)?'card':/altar/.test(text)?'spark':/palabra|vínculo|aplicación/.test(text)?'code':'compass';el.innerHTML=svg(name);});
  document.querySelectorAll('.mini-sigil').forEach(function(el){if(!el.querySelector('svg'))el.innerHTML=svg(el.closest('.status')?'spark':'compass');});
  document.querySelectorAll('.route-pill,.seal').forEach(function(el){if(el.querySelector('svg')||!/[\p{Extended_Pictographic}\u2600-\u27ff]/u.test(el.textContent))return;el.textContent=el.textContent.replace(/[\p{Extended_Pictographic}\u2600-\u27ff\uFE0F]/gu,'').trim();el.insertAdjacentHTML('afterbegin',svg('spark'));});
 }
 function setup(){apply();var menu=document.getElementById('stationMenu');if(menu)new MutationObserver(apply).observe(menu,{childList:true});var views=document.getElementById('viewWrap');if(views)new MutationObserver(apply).observe(views,{childList:true});}
 global.GamiIcons=Object.freeze({svg:svg});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})(window);
