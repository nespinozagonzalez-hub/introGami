/**
 * GAMIAULA 2.0 — Backend educativo para Google Sheets / Apps Script
 * Versión: 2.0.0-beta.1 · 13-10-2026
 *
 * INSTALACIÓN: 1) abre una hoja de cálculo nueva, 2) Extensiones > Apps Script,
 * 3) reemplaza Code.gs con este contenido, 4) guarda y ejecuta instalarGamiAula().
 * 5) Regresa a la hoja y usa menú «GamiAula 2.0» > «Generar 30 invitaciones».
 *
 * ADVERTENCIA: API de prueba. No compartir hoja ni invitaciones públicamente.
 * Ver README_INSTALACION.md antes de desplegar como aplicación web.
 */

const GAMI = Object.freeze({
  version: '2.0.0-beta.1',
  propSheetId: 'GAMIAULA_V2_SHEET_ID',
  classes: {
    'Narrador': 'narrativa',
    'Arquitecto': 'diseno',
    'Alquimista': 'creatividad',
    'Estratega': 'estrategia',
    'Guardián': 'motivacion'
  },
  skills: ['narrativa', 'diseno', 'creatividad', 'motivacion', 'estrategia'],
  levels: [ {nivel:1,xp:0}, {nivel:2,xp:60}, {nivel:3,xp:140},
            {nivel:4,xp:240}, {nivel:5,xp:360}, {nivel:6,xp:500} ],
  headers: {
    INICIO: ['Sección','Instrucción','Estado'],
    CONFIG: ['Clave','Valor','Explicación'],
    INVITACIONES: ['Invitación','Estado','Creada el','Canjeada el','Jugador ID','Nota'],
    JUGADORES: ['Jugador ID','Alias','Clase','Creado el','Última actividad','XP','Nivel','Puntos disponibles','Consentimiento','Estado','Hash token'],
    MISIONES: ['Misión ID','Módulo','Nombre','Tipo','Código canónico','Código entregado en módulo','XP','Puntos','Estado','Repositorio','Observaciones'],
    CODIGOS: ['Registro ID','Fecha','Jugador ID','Misión ID','Código ingresado','Código canónico','XP entregada','Puntos entregados','Resultado'],
    ATRIBUTOS: ['Jugador ID','Atributo','Nivel','Actualizado el'],
    VENTAJAS: ['Ventaja ID','Módulo','Atributo','Nivel requerido','Grado','Efecto pedagógico','Usos máximos','Estado','Notas de equidad'],
    EVENTOS: ['Evento ID','Fecha servidor','Jugador ID','Tipo','Módulo','Estación','Atributo','Detalle','Origen','Verificación'],
    AUDITORIA: ['Auditoría ID','Fecha','Jugador ID','Acción','Atributo','Anterior','Nuevo','Detalle'],
    TABLERO: ['Indicador','Valor','Qué significa']
  }
});

function onOpen() {
  SpreadsheetApp.getUi().createMenu('GamiAula 2.0')
    .addItem('Instalar / revisar pestañas', 'instalarGamiAula')
    .addItem('Generar 30 invitaciones', 'generar30Invitaciones')
    .addItem('Verificar configuración', 'verificarSistema')
    .addToUi();
}

/** Ejecutar SOLO desde el editor, con la hoja GamiAula abierta. Es idempotente. */
function instalarGamiAula() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Abre una Hoja de Google y usa Extensiones > Apps Script desde esa misma hoja.');
  const prop = PropertiesService.getScriptProperties();
  const previous = prop.getProperty(GAMI.propSheetId);
  if (previous && previous !== ss.getId()) {
    throw new Error('Este script ya está vinculado a otra hoja. Detenido para evitar mezclar datos.');
  }
  prop.setProperty(GAMI.propSheetId, ss.getId());
  const first = ss.getSheets()[0];
  if (first && ss.getSheets().length === 1 && first.getLastRow() === 0 && !ss.getSheetByName('INICIO')) {
    first.setName('INICIO');
  }
  Object.keys(GAMI.headers).forEach(function(name){
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    const wanted = GAMI.headers[name];
    const present = sh.getRange(1,1,1,wanted.length).getValues()[0];
    if (present.every(function(v){return v === '';})) {
      sh.getRange(1,1,1,wanted.length).setValues([wanted]);
    } else if (wanted.some(function(v,i){return present[i] !== v;})) {
      throw new Error('La pestaña '+name+' tiene encabezados distintos. No se sobrescribirá: revísala manualmente.');
    }
    estiloHoja_(sh,wanted.length,name);
  });
  rellenarIniciales_(ss);
  SpreadsheetApp.flush();
  Logger.log('Instalación completada: '+ss.getUrl());
  return ss.getUrl();
}

function estiloHoja_(sh,cols,name) {
  sh.setFrozenRows(1);
  sh.getRange(1,1,1,cols).setBackground('#10223E').setFontColor('#FFF1C5')
    .setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
  sh.setRowHeight(1,39);
  sh.getRange(1,1,Math.max(2,sh.getMaxRows()),cols).setFontFamily('Arial');
  sh.setTabColor(name === 'TABLERO' ? '#D6A44E' : name === 'INICIO' ? '#0DA4AD' : '#305486');
  for (let c=1;c<=cols;c++) sh.setColumnWidth(c,(name === 'VENTAJAS' && c === 6) || (name === 'MISIONES' && c === 3) ? 330 : 172);
  if (sh.getMaxRows() < 250) sh.insertRowsAfter(sh.getMaxRows(),250 - sh.getMaxRows());
  sh.getRange(2,1,Math.min(249,sh.getMaxRows()-1),cols).setVerticalAlignment('middle');
  if (name === 'INICIO') sh.setColumnWidth(2,660);
  if (name === 'TABLERO') {sh.setColumnWidth(1,285);sh.setColumnWidth(3,570);}
  if (name === 'EVENTOS') {sh.setColumnWidth(8,380);}
  if (name === 'JUGADORES') sh.hideColumns(11); // Hash de acceso: no mostrar en vista administrativa.
}

function rellenarIniciales_(ss) {
  agregarSiVacia_(ss,'INICIO',[
    ['1. Preparar','Este libro está pensado para administrar el curso Gamificación de 0 a 100.', 'LISTO'],
    ['2. Invitaciones','GamiAula 2.0 > Generar 30 invitaciones; comparte cada clave individualmente.', 'PENDIENTE'],
    ['3. Privacidad','Mantén este documento privado; únicamente el equipo administrador debe editarlo.', 'IMPORTANTE'],
    ['4. Apps Script','Despliega aplicación web solo cuando se hayan probado los permisos y la integración.', 'PENDIENTE'],
    ['5. Centro de Comando','El frontend g0100_v8 todavía requiere enlace y migración; no se sincroniza solo.', 'PENDIENTE'],
    ['6. Seguridad','El backend calcula XP, niveles y puntos. Nunca confíes en XP enviada por navegador.', 'LISTO'],
    ['7. Desarrollo','Módulo 4 / ORBE2026 queda marcado como PENDIENTE para no acreditar victorias no comprobadas.', 'PENDIENTE'],
    ['8. Eliminación','El usuario podrá pedir borrar todo su perfil mediante la API delete_account, una vez integrada.', 'PREPARADO']
  ]);
  agregarSiVacia_(ss,'CONFIG',[
    ['version',GAMI.version,'Versión técnica del esquema y API'],
    ['xp_niveles','1=0;2=60;3=140;4=240;5=360;6=500','Conserva los valores reales de introGami g0100_v8'],
    ['umbral_iniciado',3,'Primer desbloqueo de atributo'],
    ['umbral_experto',5,'Segundo grado de atributo'],
    ['umbral_maestro',8,'Tercer grado de atributo'],
    ['estado_backend','BETA','No publicar ni enlazar hasta verificar despliegue'],
    ['registro_por_invitacion','SI','Solo se puede registrar con invitación de un solo uso'],
    ['aviso_privacidad_version','v1-2026-10-13','Registrar qué aviso de privacidad se mostró en la interfaz antes de pedir consentimiento'],
    ['zona_horaria',Session.getScriptTimeZone(),'Zona horaria de este proyecto Apps Script']
  ]);
  agregarSiVacia_(ss,'MISIONES',catalogoMisiones_());
  agregarSiVacia_(ss,'VENTAJAS',catalogoVentajas_());
  agregarSiVacia_(ss,'TABLERO',[
    ['Jugadores registrados','=COUNTA(JUGADORES!A2:A)','Perfiles creados mediante invitación'],
    ['Jugadores activos','=COUNTIF(JUGADORES!J2:J,"ACTIVO")','Perfiles habilitados'],
    ['Consentimientos registrados','=COUNTIF(JUGADORES!I2:I,"SI")','Participantes con consentimiento informado'],
    ['Códigos validados','=COUNTIF(CODIGOS!I2:I,"ACEPTADO")','Canjes de misión acreditados por el servidor'],
    ['Eventos registrados','=COUNTA(EVENTOS!A2:A)','Uso y decisiones (no equivalen a motivación real)'],
    ['Mejoras de atributos','=COUNTIF(AUDITORIA!D2:D,"MEJORA_ATRIBUTO")','Compras de puntos por habilidad'],
    ['XP total otorgada','=SUM(JUGADORES!F2:F)','XP acumulada, no puntos gastables'],
    ['Invitaciones disponibles','=COUNTIF(INVITACIONES!B2:B,"LIBRE")','Claves listas para entregar'],
    ['Invitaciones utilizadas','=COUNTIF(INVITACIONES!B2:B,"USADA")','Claves que ya activaron una cuenta']
  ]);
  ss.getSheetByName('TABLERO').getRange('B2:B10').setNumberFormat('#,##0');
}

function agregarSiVacia_(ss,name,rows) {
  const sh=ss.getSheetByName(name);
  if (sh.getLastRow() > 1) return; // No destruye datos si se ejecuta de nuevo.
  if (rows.length) sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
}

function catalogoMisiones_(){
  const raw=[
    [1,'AXR314','VAL214','La llamada del viajero','PRINCIPAL','modulo-1-GamiV2'],
    [1,'LUM582','VIN582','Ecos del camino olvidado','SECUNDARIA','modulo-1-GamiV2'],
    [1,'VYR207','RES307','La primera bifurcación','SECUNDARIA','modulo-1-GamiV2'],
    [2,'NEX451','FOR214','El pulso de los sistemas','PRINCIPAL','modulo-2-gami'],
    [2,'ORB126','ARC582','Fragmentos del Orbe','SECUNDARIA','modulo-2-gami'],
    [2,'KRN693','RIT307','Guardianes del equilibrio','SECUNDARIA','modulo-2-gami'],
    [3,'ZEN248','FLW214','El mapa de lo posible','PRINCIPAL','modulo-3-gami'],
    [3,'ELD570','ARC583','Ruinas de lo convencional','SECUNDARIA','modulo-3-gami'],
    [3,'MIR831','MEM307','El espejo del jugador','SECUNDARIA','modulo-3-gami'],
    [4,'ARC419','','Ascenso a la montaña sagrada','PRINCIPAL','introGami/modulo-4'],
    [4,'NEB264','','Niebla antes del umbral','SECUNDARIA','introGami/modulo-4'],
    [4,'CYR905','','El nacimiento de lo lúdico','SECUNDARIA','introGami/modulo-4']
  ];
  const arr=raw.map(function(r){return [r[1],r[0],r[3],r[4],r[1],r[2],r[4]==='PRINCIPAL'?60:25,r[4]==='PRINCIPAL'?5:2,r[0]===4?'PENDIENTE':'ACTIVA',r[5],r[0]===4?'Conectar a los cuatro guardianes y al código maestro':'Código antiguo + equivalente; una sola recompensa'];});
  arr.push(['ORBE2026',4,'La Consagración del Orbe','FINAL','ORBE2026','',0,0,'PENDIENTE','introGami/modulo-4','Código final de 8 caracteres: requiere 4 guardianes verificados. No canjeable todavía.']);
  return arr;
}

function catalogoVentajas_(){
  const abilityNames={
    narrativa:['Crónica contextual','Comparación de perspectivas','Pista narrativa avanzada'],
    diseno:['Plantilla de secuencia','Mapa de decisiones','Planificador experto'],
    creatividad:['Reto de transferencia','Ruta de soluciones alternativas','Prototipado con restricciones'],
    motivacion:['Recordatorio de autonomía y feedback','Apoyo progresivo','Plan de reintento autónomo'],
    estrategia:['Descartar 1 respuesta incorrecta','Descartar 2 respuestas incorrectas','Descartar 3 respuestas incorrectas']
  };
  const final={
    narrativa:'Orientación sobre el guardián sin revelar la respuesta',
    diseno:'Activar escudo estructural durante el combate',
    creatividad:'Recargar habilidad especial en combate',
    motivacion:'Restaurar vida sin omitir preguntas',
    estrategia:'Descartar respuesta incorrecta en la pregunta actual'
  };
  const rows=[];
  [1,2,3,4].forEach(function(modulo){
    GAMI.skills.forEach(function(skill){
      [3,5,8].forEach(function(n,index){
        const isBattle=modulo===4;
        const effect=isBattle?final[skill]+' · dominio '+(index+1):abilityNames[skill][index];
        const limit=skill==='narrativa' ? 'CONSULTA' : skill==='estrategia' ? index+1 : isBattle ? index+1 : 'CONSULTA';
        rows.push([ 'M'+modulo+'_'+skill.toUpperCase()+'_L'+n,modulo,skill,n,index+1,effect,limit,
          (skill==='estrategia'||isBattle)?'BETA':'GUIA',
          'Apoyo opcional; mantener mismos resultados de aprendizaje. No sustituye evidencias de logro.' ]);
      });
    });
  });
  return rows;
}

/** Menú: genera códigos de invitación individuales de un solo uso. */
function generar30Invitaciones(){return generarInvitaciones_(30);}
function generarInvitaciones_(qty){
  if (!Number.isInteger(qty)||qty<1||qty>100) throw new Error('Cantidad admitida: 1 a 100.');
  const ss=hojaLibro_();const sh=ss.getSheetByName('INVITACIONES');
  const rows=[],now=new Date(),existing=new Set(valores_(sh).map(function(r){return r[0];}));
  for(let i=0;i<qty;i++){
    let code;do{code='GA-'+Utilities.getUuid().replace(/-/g,'').slice(0,16).toUpperCase();}while(existing.has(code));
    existing.add(code);rows.push([code,'LIBRE',now,'','','Entrega esta clave individualmente']);
  }
  sh.getRange(sh.getLastRow()+1,1,rows.length,6).setValues(rows);
  Logger.log('Invitaciones creadas: '+qty+'; ver pestaña INVITACIONES.');
  return qty;
}

/** Acceso solo interno al libro. doGet NO expone sus datos. */
function hojaLibro_(){
  const id=PropertiesService.getScriptProperties().getProperty(GAMI.propSheetId);
  if(!id)throw new Error('Primero ejecuta instalarGamiAula() desde la hoja de cálculo.');
  return SpreadsheetApp.openById(id);
}
function valores_(sh){const last=sh.getLastRow();return last<=1?[]:sh.getRange(2,1,last-1,sh.getLastColumn()).getValues();}
function encontrar_(sh,col,value){const rows=valores_(sh);for(let i=0;i<rows.length;i++)if(String(rows[i][col])===String(value))return {row:i+2,values:rows[i]};return null;}
function ahora_(){return new Date();}
function uuid_(){return Utilities.getUuid();}
function limpiar_(input,max){
  let s=String(input===undefined||input===null?'':input).replace(/[\u0000-\u001F\u007F]/g,' ').trim().slice(0,max||160);
  // Evita inyecciones de fórmulas en hojas de cálculo.
  if (/^[=+@-]/.test(s)) s="'"+s;
  return s;
}
function hash_(s){const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(s),Utilities.Charset.UTF_8);return bytes.map(function(b){return ('0'+(b&255).toString(16)).slice(-2);}).join('');}
function igualSeguro_(a,b){if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
function nivel_(xp){let n=1;GAMI.levels.forEach(function(l){if(xp>=l.xp)n=l.nivel;});return n;}
function n_(value){const num=Number(value);return Number.isFinite(num)?num:0;}
function locked_(callback){const lock=LockService.getScriptLock();lock.waitLock(15000);try{return callback();}finally{lock.releaseLock();}}
function fechaActualizar_(sh,row){sh.getRange(row,5).setValue(ahora_());}

function encontrarJugador_(ss,payload){
  const id=limpiar_(payload.player_id,100),token=String(payload.token||'');
  if(!id || token.length<32 || token.length>300)throw new Error('Credenciales incompletas.');
  const sh=ss.getSheetByName('JUGADORES'),found=encontrar_(sh,0,id);
  if(!found||found.values[9]!=='ACTIVO'||!igualSeguro_(hash_(token),String(found.values[10])))throw new Error('Credenciales incorrectas o cuenta inactiva.');
  if(found.values[8]!=='SI')throw new Error('Falta consentimiento para registrar el progreso.');
  return {sh:sh,row:found.row,data:found.values,id:id};
}
function atributosJugador_(ss,id){
  const m={};GAMI.skills.forEach(function(s){m[s]=0;});
  valores_(ss.getSheetByName('ATRIBUTOS')).forEach(function(r){if(String(r[0])===id&&GAMI.skills.indexOf(r[1])!==-1)m[r[1]]=n_(r[2]);});
  return m;
}
function registroEvento_(ss,playerId,type,module,station,skill,detail,origin,verification,eventId){
  const id=eventId||uuid_();
  ss.getSheetByName('EVENTOS').appendRow([id,ahora_(),playerId,limpiar_(type,50),module||0,limpiar_(station,80),limpiar_(skill,50),limpiar_(detail,250),limpiar_(origin,50),verification||'SERVIDOR']);
  return id;
}
function auditoria_(ss,id,action,skill,before,after,detail){
  ss.getSheetByName('AUDITORIA').appendRow([uuid_(),ahora_(),id,action,skill||'',before,after,limpiar_(detail,250)]);
}

/** API interna: alta con invitación de un uso; devuelve token UNA sola vez. */
function registrar_(ss,p){
  const invite=limpiar_(p.invitation,80).toUpperCase(),alias=limpiar_(p.alias,32),cls=limpiar_(p.player_class,30);
  if(p.consent!==true)throw new Error('Debe aceptar el registro del progreso.');
  if(!alias||alias.length<2)throw new Error('Ingresa un alias de al menos dos caracteres.');
  if(!Object.prototype.hasOwnProperty.call(GAMI.classes,cls))throw new Error('Clase no válida.');
  const invites=ss.getSheetByName('INVITACIONES'),record=encontrar_(invites,0,invite);
  if(!record||record.values[1]!=='LIBRE')throw new Error('Invitación no válida o ya utilizada.');
  const id='ga_'+uuid_(),token=uuid_().replace(/-/g,'')+uuid_().replace(/-/g,''),now=ahora_();
  ss.getSheetByName('JUGADORES').appendRow([id,alias,cls,now,now,0,1,0,'SI','ACTIVO',hash_(token)]);
  const levels=GAMI.skills.map(function(s){return [id,s,s===GAMI.classes[cls]?2:1,now];});
  ss.getSheetByName('ATRIBUTOS').getRange(ss.getSheetByName('ATRIBUTOS').getLastRow()+1,1,levels.length,4).setValues(levels);
  invites.getRange(record.row,2,1,4).setValues([['USADA',record.values[2],now,id]]);
  registroEvento_(ss,id,'character_created',0,'centro',GAMI.classes[cls],cls,'servidor','SERVIDOR');
  return {ok:true,player_id:id,token:token,alias:alias,player_class:cls,xp:0,level:1,points:0,skills:atributosJugador_(ss,id)};
}

/** API interna: perfil propio, sin acceso a otros participantes. */
function perfil_(ss,p){
  const player=encontrarJugador_(ss,p),d=player.data;
  const completadas=valores_(ss.getSheetByName('CODIGOS')).filter(function(r){return r[2]===player.id&&r[8]==='ACEPTADO';}).map(function(r){return r[3];});
  return {ok:true,player_id:player.id,alias:d[1],player_class:d[2],xp:n_(d[5]),level:n_(d[6]),points:n_(d[7]),skills:atributosJugador_(ss,player.id),completed_missions:completadas};
}

/** API interna: canje idempotente por misión y participante. */
function canjear_(ss,p){
  const player=encontrarJugador_(ss,p),entered=limpiar_(p.code,30).toUpperCase();
  if(!/^[A-Z]{3}[0-9]{3}$/.test(entered))throw new Error('Código inválido. Formato requerido: tres letras y tres números.');
  const sh=ss.getSheetByName('MISIONES'),found=valores_(sh).find(function(r){return r[4]===entered||r[5]===entered;});
  if(!found)throw new Error('Código no reconocido.');
  if(found[8]!=='ACTIVA')throw new Error('Esta misión todavía no está habilitada para canjear puntos.');
  const missionId=String(found[0]);
  const prior=valores_(ss.getSheetByName('CODIGOS')).some(function(r){return r[2]===player.id&&r[3]===missionId&&r[8]==='ACEPTADO';});
  if(prior) return {ok:true,already_redeemed:true,mission_id:missionId,message:'Misión ya acreditada. No se otorgarán puntos duplicados.'};
  const prevXp=n_(player.data[5]),prevPoints=n_(player.data[7]);
  const xp=n_(found[6]),points=n_(found[7]),totalXp=prevXp+xp,lv=nivel_(totalXp),totalPoints=prevPoints+points;
  ss.getSheetByName('CODIGOS').appendRow([uuid_(),ahora_(),player.id,missionId,entered,found[4],xp,points,'ACEPTADO']);
  player.sh.getRange(player.row,5,1,4).setValues([[ahora_(),totalXp,lv,totalPoints]]);
  registroEvento_(ss,player.id,'mission_completed',n_(found[1]),missionId,'',missionId,'servidor','SERVIDOR');
  auditoria_(ss,player.id,'CANJE','',prevXp,totalXp,missionId+' · XP +'+xp+' · puntos +'+points);
  return {ok:true,already_redeemed:false,mission_id:missionId,canonical_code:found[4],xp_awarded:xp,points_awarded:points,xp:totalXp,level:lv,points:totalPoints};
}

/** API interna: la compra descuenta puntos; no permite habilidades negativas. */
function mejorar_(ss,p){
  const player=encontrarJugador_(ss,p),skill=limpiar_(p.skill,30),quantity=Number(p.quantity);
  if(GAMI.skills.indexOf(skill)===-1)throw new Error('Atributo no reconocido.');
  if(!Number.isInteger(quantity)||quantity<1||quantity>10)throw new Error('Cantidad permitida: 1 a 10 puntos.');
  const available=n_(player.data[7]);if(available<quantity)throw new Error('No tienes puntos de desarrollo suficientes.');
  const sh=ss.getSheetByName('ATRIBUTOS'),rows=valores_(sh),idx=rows.findIndex(function(r){return r[0]===player.id&&r[1]===skill;});
  if(idx<0)throw new Error('No existe la ficha de este atributo.');
  const before=n_(rows[idx][2]),after=before+quantity;
  if(after>20)throw new Error('Límite beta de nivel 20 por atributo.');
  sh.getRange(idx+2,3,1,2).setValues([[after,ahora_()]]);
  player.sh.getRange(player.row,5).setValue(ahora_());
  player.sh.getRange(player.row,8).setValue(available-quantity);
  auditoria_(ss,player.id,'MEJORA_ATRIBUTO',skill,before,after,'Coste: '+quantity+' puntos');
  registroEvento_(ss,player.id,'skill_upgrade',0,'centro',skill,before+'>'+after,'servidor','SERVIDOR');
  return {ok:true,skill:skill,before:before,after:after,points:available-quantity,unlocked:[3,5,8].filter(function(t){return before<t&&after>=t;})};
}

/** Registros declarados por el cliente se identifican como SIN_VERIFICAR. */
function evento_(ss,p){
  const player=encontrarJugador_(ss,p),types=['module_opened','advantage_consulted','advantage_activated','decision_changed','guardian_defeated'];
  const type=limpiar_(p.type,50),eventId=limpiar_(p.event_id,100),skill=limpiar_(p.skill,40),module=Number(p.module||0);
  if(types.indexOf(type)<0)throw new Error('Tipo de evento no permitido.');
  if(!/^[A-Za-z0-9_-]{8,100}$/.test(eventId))throw new Error('Identificador de evento no válido.');
  if(!Number.isInteger(module)||module<1||module>4)throw new Error('Módulo inválido.');
  if(skill && GAMI.skills.indexOf(skill)===-1)throw new Error('Atributo inválido.');
  if(type==='advantage_activated' && (!skill||n_(atributosJugador_(ss,player.id)[skill])<3))throw new Error('Este atributo aún no habilita ventajas.');
  if(encontrar_(ss.getSheetByName('EVENTOS'),0,eventId))return {ok:true,duplicate:true,event_id:eventId};
  registroEvento_(ss,player.id,type,module,p.station,skill,p.detail,'cliente','SIN_VERIFICAR',eventId);
  player.sh.getRange(player.row,5).setValue(ahora_());
  return {ok:true,duplicate:false,event_id:eventId,verification:'SIN_VERIFICAR'};
}

/** Borrado a solicitud del titular, confirmado con su token de acceso. */
function borrarCuenta_(ss,p){
  if(String(p.confirm||'')!=='ELIMINAR')throw new Error('Confirma escribiendo ELIMINAR.');
  const person=encontrarJugador_(ss,p),id=person.id;
  ['CODIGOS','ATRIBUTOS','EVENTOS','AUDITORIA'].forEach(function(tab){
    const sh=ss.getSheetByName(tab),rows=valores_(sh);
    for(let i=rows.length-1;i>=0;i--){
      const playerIndex=tab==='ATRIBUTOS'?0:2;
      if(String(rows[i][playerIndex])===id)sh.deleteRow(i+2);
    }
  });
  // Conservar la invitación consumida sin vincularla a una identidad borrada.
  const invites=ss.getSheetByName('INVITACIONES'),invRows=valores_(invites);
  invRows.forEach(function(row,i){if(row[4]===id)invites.getRange(i+2,2,1,4).setValues([['REVOCADA',row[2],row[3],'']]);});
  person.sh.deleteRow(person.row);
  return {ok:true,deleted:true,message:'La cuenta y sus registros asociados se han eliminado del libro.'};
}

/** Se pueden consultar las ventajas propias sin revelar los tokens de otros usuarios. */
function ventajas_(ss,p){
  const player=encontrarJugador_(ss,p),skills=atributosJugador_(ss,player.id),mod=Number(p.module||0);
  const rows=valores_(ss.getSheetByName('VENTAJAS')).filter(function(r){return r[1]===mod&&n_(skills[r[2]])>=n_(r[3]);});
  return {ok:true,advantages:rows.map(function(r){return {id:r[0],module:r[1],skill:r[2],required_level:r[3],tier:r[4],effect:r[5],uses:r[6],status:r[7]};})};
}

/** Punto de entrada para futuras integraciones. Controles propios en cada operación. */
function manejarSolicitud_(p){
  if (!p||typeof p!=='object'||Array.isArray(p))throw new Error('Solicitud inválida.');
  const action=String(p.action||'');
  if(action==='ping')return {ok:true,version:GAMI.version,backend:'GamiAula Sheets'};
  const ss=hojaLibro_();
  if(action==='register')return locked_(function(){return registrar_(ss,p);});
  if(action==='profile')return perfil_(ss,p);
  if(action==='advantages')return ventajas_(ss,p);
  if(action==='redeem')return locked_(function(){return canjear_(ss,p);});
  if(action==='allocate')return locked_(function(){return mejorar_(ss,p);});
  if(action==='event')return locked_(function(){return evento_(ss,p);});
  if(action==='delete_account')return locked_(function(){return borrarCuenta_(ss,p);});
  throw new Error('Acción no permitida.');
}

function json_(object){return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);}
function doGet(){return json_({ok:true,service:'GamiAula 2.0',version:GAMI.version,health:'online'});} // No datos privados por GET.
function doPost(e){
  try{
    if(!e||!e.postData||!e.postData.contents||e.postData.contents.length>12000)throw new Error('Solicitud incompleta o demasiado grande.');
    const p=JSON.parse(e.postData.contents);
    return json_(manejarSolicitud_(p));
  }catch(err){return json_({ok:false,error:String(err&&err.message||'Error de servidor').slice(0,220)});}
}

/** Comprobación local SIN generar usuarios ni consumir invitaciones. */
function verificarSistema(){
  const ss=hojaLibro_();
  Object.keys(GAMI.headers).forEach(function(name){
    const sh=ss.getSheetByName(name);if(!sh)throw new Error('Falta '+name);
    GAMI.headers[name].forEach(function(h,i){if(sh.getRange(1,i+1).getValue()!==h)throw new Error('Encabezado incorrecto: '+name+' '+h);});
  });
  if(catalogoMisiones_().length!==13)throw new Error('Deben existir 12 misiones y 1 código maestro pendiente.');
  if(catalogoVentajas_().length!==60)throw new Error('Deben existir 60 reglas de ventajas.');
  const alias=valores_(ss.getSheetByName('MISIONES')).filter(function(r){return r[5]!==''&&r[8]==='ACTIVA';});
  if(alias.length!==9)throw new Error('Se esperaban 9 equivalencias activas en módulos 1–3.');
  Logger.log('OK. Hoja: '+ss.getUrl()+'; misiones: 13; reglas: 60; equivalencias: 9.');
  return {ok:true,url:ss.getUrl(),missions:13,advantages:60,aliases:9,version:GAMI.version};
}
