(function(){
  'use strict';
  var selector='[role="dialog"]';
  function visible(el){return Boolean(el.getClientRects().length);}
  document.addEventListener('keydown',function(e){
    if(e.key!=='Tab')return;
    var dialogs=Array.from(document.querySelectorAll(selector)).filter(visible),dialog=dialogs.at(-1);
    if(!dialog)return;
    var items=Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(visible);
    if(!items.length)return;
    var first=items[0],last=items.at(-1),outside=!dialog.contains(document.activeElement);
    if(e.shiftKey&&(document.activeElement===first||outside)){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&(document.activeElement===last||outside)){e.preventDefault();first.focus();}
  });
})();
