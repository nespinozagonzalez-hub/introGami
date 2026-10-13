/* Progression describes actual supports offered by the interface. */
(function(global){
  'use strict';
  var extra={
    1:{
      narrativa:['Imagina una expedición: la historia invita a explorar; las reglas indican qué hacer y cómo avanzar.','Revisa tu relato: ¿hay un propósito claro, una decisión del jugador y evidencia de aprendizaje?'],
      diseno:['Objetivo: distinguir conceptos. Reto: clasificar casos. Regla: justificar la clasificación. Evidencia: explicación del participante.','Comprueba que cada componente sostiene una acción y que cada acción ayuda al objetivo.'],
      creatividad:['Una pregunta inicial puede ser un mensaje incompleto que el grupo reconstruye con sus conocimientos previos.','Diseña otra versión con papel. Mantén el objetivo y cambia solamente el recurso.'],
      motivacion:['Ofrece elegir entre dos contextos, retroalimentación concreta y una revisión con un compañero.','Identifica una decisión autónoma, una oportunidad de mejora y una interacción de apoyo.']
    },
    2:{
      narrativa:['Un mapa en papel y un tablero digital pueden sostener la misma misión: recuperar evidencias y justificar decisiones.','Comprueba si la historia conserva su sentido cuando cambia la plataforma.'],
      diseno:['Necesidad: respuestas superficiales. Objetivo: justificar. Herramienta: cartas de casos. Feedback: pistas. Evidencia: revisión explicada.','Revisa accesibilidad, tiempo de trabajo, privacidad y alternativa sin conexión.'],
      creatividad:['Combina tarjetas de dilemas con una encuesta; sin conexión, vota con fichas y conserva la discusión.','Compara dos herramientas por su contribución al aprendizaje y elige la que tu grupo pueda usar.'],
      motivacion:['Un indicador de avance ayuda cuando comunica qué falta y permite revisar una decisión sin penalización excesiva.','Revisa metas claras, feedback útil y reintentos con orientación concreta.']
    },
    3:{
      narrativa:['Ofrece explorar fuentes, construir una propuesta o ayudar a un compañero; todos explican el mismo concepto.','Utiliza los perfiles como hipótesis para escuchar al grupo, sin etiquetar permanentemente a sus integrantes.'],
      diseno:['Objetivo: analizar un caso. Comportamiento: argumentar. Jugadores: grupo heterogéneo. Ciclo: intento, feedback y revisión.','Comprueba la conexión entre las seis decisiones del modelo 6D; cambia una si contradice tu objetivo.'],
      creatividad:['Ruta de exploración: comparar casos. Ruta de construcción: crear y explicar un caso propio.','Define una evidencia equivalente para ambas rutas y verifica que la elección sea real.'],
      motivacion:['Si el reto genera ansiedad, divide la tarea y ofrece una pista; si aburre, añade una decisión que requiera justificar.','Observa necesidades del grupo y ajusta apoyos, desafío y cooperación según lo que ocurra.']
    }
  };
  var summaries={
    narrativa:'Orientación situada (3), ejemplo aplicado (5) y preguntas de transferencia (8). En batalla: contexto del guardián.',
    diseno:'Organizador de decisiones (3), ejemplo de secuencia (5) y revisión de coherencia (8). En batalla: 1, 2 o 3 escudos.',
    creatividad:'Propuesta alternativa (3), ejemplo de adaptación (5) y transferencia al aula (8). En batalla: 1, 2 o 3 recargas.',
    motivacion:'Orientación para mejorar (3), ejemplo de acompañamiento (5) y revisión del reto (8). En batalla: curación de 8, 12 o 16 de vida.',
    estrategia:'Descarta una opción incorrecta sin resolver la pregunta: 1 uso en nivel 3, 2 en nivel 5 y 3 en nivel 8, por módulo o guardián.'
  };
  global.GamiPedagogy=Object.freeze({
    summary:function(skill){return summaries[skill]||'';},
    extend:function(module,skill,level,base){
      var entries=extra[module]&&extra[module][skill];
      if(!entries)return base;
      return base+(level>=5?'\n\nEjemplo aplicado: '+entries[0]:'')+(level>=8?'\n\nTransferencia: '+entries[1]:'');
    }
  });
})(window);
