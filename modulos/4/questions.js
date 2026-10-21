/* Casos de integración del curso. Cada alternativa contiene una devolución propia.
 * La posición de la respuesta se mezcla de nuevo al presentar cada pregunta.
 * Fuente curricular: archivos y actividades vigentes de los módulos 1, 2 y 3.
 */
(function(root){
 'use strict';
 function Q(id,topic,stem,right,reason,others){
  const choices=[{text:right,why:reason,ok:true},...others.map(x=>({text:x[0],why:x[1],ok:false}))];
  const rotation=Number(id.slice(-2))%4;
  for(let i=0;i<rotation;i++)choices.push(choices.shift());
  return {id,topic,stem,options:choices.map(x=>x.text),answer:choices.findIndex(x=>x.ok),feedback:choices.map(x=>x.why),explain:reason,source:'Módulo '+(id[1]==='4'?'1–3':id[1])};
 }
 const B={
 g1:[
 Q('m1-01','Propósito pedagógico','Una unidad con insignias aumenta las entregas, pero las justificaciones siguen siendo débiles. El objetivo es argumentar con evidencia. ¿Qué cambio actuaría más directamente sobre esa dificultad?',
 'Vincular el avance a revisar argumentos con criterios y volver a fundamentarlos.',
 'El problema está en la argumentación. Revisar con criterios y reelaborar hace que la progresión dependa de ese aprendizaje.',[
 ['Reconocer la constancia con insignias semanales y nuevas metas de participación.','Puede sostener las entregas; no trabaja directamente la calidad de los argumentos.'],
 ['Incorporar una historia de investigación con capítulos al completar cada entrega.','Puede dar contexto, pero completar entregas sigue sin exigir mejorar la fundamentación.'],
 ['Ofrecer distintos formatos de entrega para que cada participante elija uno.','Amplía la elección de formato; falta actuar sobre la justificación con evidencia.']]),
 Q('m1-02','Componentes y reglas','Un tablero muestra medallas. Para obtenerlas, cada equipo debe contrastar dos explicaciones y defender una. Si se retiran las imágenes, la tarea continúa igual. ¿Qué se ha retirado principalmente?',
 'Un componente visible que representa el logro alcanzado en la actividad.',
 'Las medallas representan el logro. La regla de contrastar y defender explicaciones puede seguir funcionando sin esas imágenes.',[
 ['Una regla que organiza cómo se comparan las explicaciones de los equipos.','La comparación continúa; su regla no depende de la imagen de la medalla.'],
 ['La dinámica de colaboración que aparece al discutir las explicaciones.','La colaboración puede mantenerse con la misma interacción, aunque cambie su representación.'],
 ['El objetivo que orienta la selección de evidencias para la explicación.','El objetivo de argumentar sigue vigente al retirar las medallas.']]),
 Q('m1-03','Mecánicas','Dos cursos usan las mismas cartas. En uno pueden intercambiarlas con una justificación; en el otro las recibe cada estudiante por sorteo. ¿Qué diferencia de diseño explica mejor las interacciones distintas?',
 'Las reglas de obtención e intercambio ofrecen acciones distintas al grupo.',
 'El recurso visual coincide, pero las acciones permitidas cambian la interacción que puede surgir.',[
 ['El conjunto de cartas introduce componentes visuales diferentes en cada curso.','El caso indica que las cartas son las mismas; cambia su uso.'],
 ['La motivación individual determina de antemano el efecto de ambas actividades.','La motivación importa, pero aquí hay una diferencia observable en las reglas.'],
 ['El tema de las cartas establece objetivos curriculares distintos para cada grupo.','No se han descrito objetivos distintos; sí reglas diferentes.']]),
 Q('m1-04','Dinámicas','El docente diseñó una misión cooperativa, pero los equipos ocultan pistas para conservar su ventaja. ¿Qué evidencia ayuda más a analizar la dinámica que realmente emerge?',
 'Observar cómo negocian y comparten o retienen información al decidir.',
 'La dinámica se reconoce en la interacción efectiva; la intención declarada no demuestra cooperación.',[
 ['Contar las insignias cooperativas que aparecen en el tablero de la misión.','Cuenta componentes previstos, no cómo se relacionan los equipos.'],
 ['Revisar si la introducción presenta con claridad la historia de colaboración.','Permite revisar la intención narrativa; falta observar la interacción real.'],
 ['Comparar las metas de participación escritas en la planificación inicial.','Las metas orientan el diseño, pero no muestran la dinámica que ocurrió.']]),
 Q('m1-05','Experiencia de juego','Una misión propone explorar, pero todas las decisiones conducen al mismo texto y recompensa. El grupo percibe que sus elecciones no importan. ¿Qué ajuste responde mejor a esa percepción?',
 'Dar consecuencias distintas a rutas con un aprendizaje central común.',
 'Una elección adquiere sentido cuando cambia algo relevante del recorrido sin perder la alineación con el aprendizaje.',[
 ['Añadir más rutas con nuevos nombres y conservar el desenlace compartido.','Aumenta opciones nominales, pero no las consecuencias que el grupo echa en falta.'],
 ['Explicar con mayor detalle la ambientación de cada una de las rutas.','Enriquece el contexto; no modifica el efecto de decidir.'],
 ['Aumentar la recompensa final para reconocer la exploración de las rutas.','Premia el recorrido, pero la elección puede seguir sintiéndose irrelevante.']]),
 Q('m1-06','Narrativa','La historia pide actuar como investigadores, pero los retos consisten en copiar definiciones. Se busca interpretar pruebas. ¿Qué cambio conecta mejor historia y aprendizaje?',
 'Pedir una explicación que relacione las evidencias incompletas del caso.',
 'Investigar cobra sentido al interpretar evidencias y justificar relaciones, en coherencia con el objetivo indicado.',[
 ['Convertir las definiciones en mensajes secretos que deban transcribirse.','La ambientación cambia; la operación principal continúa siendo copiar.'],
 ['Repartir roles de detectives antes de copiar las definiciones del archivo.','Los roles aportan contexto, pero no aseguran interpretar pruebas.'],
 ['Entregar un expediente ilustrado con las mismas definiciones organizadas.','Mejora el soporte sin cambiar la demanda cognitiva del reto.']]),
 Q('m1-07','Recompensas','Una insignia de investigación se entrega por abrir todos los documentos. El objetivo es seleccionar fuentes pertinentes. ¿Qué criterio de obtención sería más coherente?',
 'Justificar qué fuente aporta evidencia útil para resolver el caso.',
 'Seleccionar fuentes requiere valorar su aporte. Abrirlas o recorrerlas no demuestra esa decisión.',[
 ['Registrar el tiempo dedicado a cada documento antes de completar el caso.','El tiempo es una señal de actividad, no de pertinencia de la fuente.'],
 ['Completar una ficha con los títulos de todos los documentos consultados.','Documenta consulta; no exige valorar qué evidencia resulta útil.'],
 ['Compartir con el equipo la mayor cantidad posible de documentos revisados.','La cantidad compartida no distingue la relevancia de esas fuentes.']]),
 Q('m1-08','Progreso','Dos estudiantes muestran el mismo total de puntos, aunque uno mejoró mucho y otro repite los mismos errores. Se quiere hacer visible la mejora. ¿Qué añadirías al progreso?',
 'Hitos por criterio que muestren el desempeño inicial y su mejora.',
 'Los hitos por criterio permiten interpretar qué cambió; el total de puntos por sí solo puede ocultarlo.',[
 ['Un nivel adicional que se alcance al acumular más puntos en las tareas.','Puede ampliar la escala, pero sigue sin mostrar en qué mejoró cada persona.'],
 ['Una tabla ordenada por el total de puntos alcanzados durante la unidad.','Compara acumulación entre personas, no evolución de los errores.'],
 ['Una insignia general por completar todas las actividades de la unidad.','Reconoce finalización, pero no diferencia las mejoras observadas.']]),
 Q('m1-09','Retroalimentación','Después de fallar una misión, un equipo recibe «Inténtenlo otra vez» y repite la misma estrategia. ¿Qué devolución ayudaría más a revisar su procedimiento?',
 'Pedir contrastar una relación mal justificada con un dato del caso.',
 'La devolución identifica dónde actuar y orienta una revisión sin sustituir el razonamiento del equipo.',[
 ['Recordar que la misión admite varios intentos y valorar la perseverancia.','Acompaña el esfuerzo, pero falta información para cambiar el procedimiento.'],
 ['Mostrar la puntuación necesaria y recordar el tiempo disponible para reintentar.','Aclara condiciones de juego; no explica la dificultad conceptual.'],
 ['Ofrecer un nuevo escenario con una recompensa mayor por resolverlo.','Cambia el incentivo y contexto, pero puede mantener el mismo error.']]),
 Q('m1-10','Gamificación y juego','Un docente adapta una actividad de análisis con misiones, progresión y feedback. Otro utiliza un juego completo como actividad de estudio. ¿Qué dato distingue mejor la primera propuesta?',
 'Integra elementos de diseño de juegos a una actividad con propósito educativo.',
 'La distinción está en integrar elementos a una actividad, frente a usar un juego completo; ambas propuestas pueden ser educativas.',[
 ['Presenta una historia original que no pertenece a un videojuego comercial.','La originalidad de la historia no distingue por sí sola gamificación y uso de un juego.'],
 ['Incluye decisiones y desafíos durante la resolución de las tareas propuestas.','Un juego completo también puede incluir decisiones y desafíos.'],
 ['Permite participar en equipos y conversar sobre las respuestas de la actividad.','La colaboración puede estar presente en las dos propuestas.']]),
 Q('m1-11','Reglas claras','En una misión se anuncia «gana el mejor argumento», pero los equipos no saben qué se considera mejor. ¿Qué conviene incorporar antes del siguiente intento?',
 'Criterios de calidad compartidos y un ejemplo para interpretarlos.',
 'Los criterios y un ejemplo vuelven comprensible la condición de logro antes de decidir y reintentar.',[
 ['Una votación abierta para elegir el argumento favorito al terminar la ronda.','Puede incorporar participación, pero popularidad y calidad argumentativa pueden diferir.'],
 ['Un reconocimiento adicional para los equipos que expliquen con más seguridad.','La seguridad expositiva no aclara qué hace mejor al argumento.'],
 ['Una nueva ronda con más tiempo para preparar argumentos más desarrollados.','El tiempo puede ayudar, pero la condición de calidad sigue sin estar clara.']]),
 Q('m1-12','Cooperación','Una misión requiere reunir cuatro piezas, pero una persona puede resolverlo todo y repartir las respuestas. Se busca discusión entre integrantes. ¿Qué regla ayudaría más?',
 'Repartir evidencias complementarias y pedir una justificación común.',
 'La información complementaria y la explicación común dan una razón para intercambiar y construir una respuesta.',[
 ['Entregar cuatro copias del mismo reto y sumar los puntajes individuales.','Puede repartir trabajo, pero no exige discutir evidencias distintas.'],
 ['Nombrar a una persona portavoz para comunicar la respuesta del equipo.','La representación no asegura que los demás hayan participado en la discusión.'],
 ['Otorgar una medalla colectiva al primer equipo que termine la actividad.','La recompensa colectiva puede obtenerse aun con el mismo reparto desigual.']]),
 Q('m1-13','Componentes','Se quiere reconocer una capacidad demostrada, sin comparar estudiantes entre sí. ¿Qué uso de una insignia sería más apropiado?',
 'Otorgarla al justificar una solución con los criterios publicados del desafío.',
 'La insignia representa un logro referido a criterios, accesible a quienes lo demuestren sin depender de un ranking.',[
 ['Otorgarla a quienes acumulen las tres mayores puntuaciones de la semana.','Reconoce posición relativa, que es lo que se quiere evitar.'],
 ['Otorgarla al equipo que consiga más votos en una elección de favoritos.','La preferencia de pares no equivale necesariamente a demostrar la capacidad.'],
 ['Otorgarla por completar antes que los demás la misma secuencia de tareas.','El criterio pasa a ser velocidad comparada, no la capacidad definida.']]),
 Q('m1-14','Diseño de experiencia','La misma tarea genera debate en un curso y respuestas breves en otro. Tienen iguales puntos e imágenes. ¿Qué explicación conviene explorar primero?',
 'Cómo las reglas, el contexto y las interacciones cambiaron la experiencia vivida.',
 'Tener componentes iguales no garantiza dinámicas iguales. Conviene observar el sistema en cada contexto.',[
 ['Qué conjunto de imágenes ofrece mayor variedad visual a cada grupo.','Las imágenes coinciden y el problema descrito se refiere a la interacción.'],
 ['Cuántos puntos adicionales harían falta para igualar las respuestas del grupo.','Supone que el incentivo resolverá la diferencia antes de comprenderla.'],
 ['Qué curso tiene una mayor preferencia general por actividades con tecnología.','Puede aportar contexto, pero no explica por sí sola lo ocurrido en la tarea.']]),
 Q('m1-15','Motivación','Al terminar los premios semanales disminuye la participación. El grupo valoraba antes resolver problemas relevantes. ¿Qué ajuste conviene probar?',
 'Recuperar problemas relevantes con decisiones y progreso visible.',
 'El caso orienta a recuperar relevancia, elección y percepción de mejora, en lugar de depender solo del premio.',[
 ['Mantener la tarea y espaciar gradualmente las entregas de premios semanales.','Puede gestionar la transición, pero no recupera el interés por resolver problemas relevantes.'],
 ['Cambiar los premios por insignias más visibles dentro del tablero del curso.','Cambia el formato de reconocimiento sin atender la relevancia de la actividad.'],
 ['Crear un premio colectivo cuando aumente el número total de participaciones.','Puede movilizar al grupo, pero mantiene el foco en obtener una recompensa.']]),
 Q('m1-16','Desafío con sentido','Un escape room exige descifrar un código por ensayo y error, aunque el objetivo es interpretar un gráfico. ¿Qué ajuste mantendría mejor el vínculo con ese objetivo?',
 'Derivar el código de una interpretación del gráfico que deba justificarse.',
 'La interpretación pasa a ser necesaria para avanzar y puede observarse mediante la justificación.',[
 ['Entregar el código después de permanecer un tiempo mínimo frente al gráfico.','El tiempo de exposición no demuestra interpretación.'],
 ['Añadir pistas narrativas para que el código admita menos combinaciones posibles.','Reduce el ensayo y error, pero aún puede evitarse la interpretación del gráfico.'],
 ['Premiar al equipo que encuentre antes la combinación correcta de salida.','Refuerza velocidad de resolución sin asegurar el aprendizaje previsto.']]),
 Q('m1-17','Experiencia emocional','La narrativa busca curiosidad, pero una penalización pública hace que el grupo evite probar ideas. ¿Qué revisarías para recuperar la exploración?',
 'Las consecuencias del error y las opciones de probar sin exponerse.',
 'La conducta observada está relacionada con el riesgo de equivocarse. Revisar esas consecuencias puede habilitar exploración.',[
 ['La cantidad de misterios que aparecen en la introducción de cada misión.','Puede enriquecer la curiosidad narrativa, pero mantiene el costo de equivocarse.'],
 ['La frecuencia con que se recuerdan las recompensas de la exploración.','El incentivo puede seguir siendo insuficiente si el error expone públicamente.'],
 ['El número de actividades de exploración incluidas en el calendario del curso.','Multiplica oportunidades, pero no cambia la razón para evitarlas.']]),
 Q('m1-18','Evidencia de aprendizaje','Un curso registra más clics y visitas después de gamificar. Se quiere saber si mejoró la aplicación de conceptos. ¿Qué evidencia falta principalmente?',
 'Comparar soluciones justificadas de tareas de aplicación con criterios equivalentes.',
 'Los clics describen uso. Las soluciones evaluadas con criterios permiten examinar la aplicación de conceptos.',[
 ['Comparar la cantidad de páginas abiertas durante el desarrollo de cada misión.','Sigue siendo una medida de uso, no de aplicación conceptual.'],
 ['Revisar las valoraciones sobre el atractivo de los personajes de la experiencia.','Informa percepción del diseño visual, no desempeño en aplicación.'],
 ['Contabilizar las insignias que se entregaron por ingresar durante la semana.','Mide reconocimiento de acceso, sin demostrar el aprendizaje buscado.']]),
 Q('m1-19','Narrativa y autonomía','Una historia tiene un destino común, pero se quiere permitir elección sin cambiar los criterios de aprendizaje. ¿Qué decisión ofrecería autonomía con coherencia?',
 'Elegir entre casos equivalentes y defender una solución con los mismos criterios.',
 'La elección cambia el caso trabajado y mantiene una exigencia común de aprendizaje y evaluación.',[
 ['Elegir el color del tablero manteniendo idéntico caso y procedimiento obligatorio.','Ofrece personalización visual, con poco efecto sobre el trabajo que se decide.'],
 ['Elegir la recompensa de una lista después de seguir el mismo procedimiento.','La elección se sitúa al final y no amplía la decisión sobre la tarea.'],
 ['Elegir una ruta que suprima parte del aprendizaje exigido en los otros casos.','La elección cambia los criterios que debían mantenerse equivalentes.']]),
 Q('m1-20','Reglas e interacción','Una misión permite enviar una respuesta y revisarla después de una objeción. ¿Qué función cumple principalmente esa regla?',
 'Organiza un ciclo de intento, retroalimentación y mejora dentro del desafío.',
 'La regla establece acciones y una secuencia de revisión que puede sostener aprendizaje.',[
 ['Representa visualmente el reconocimiento del logro obtenido al final del reto.','Eso describe un componente de reconocimiento, no la secuencia de revisión.'],
 ['Determina la emoción que todas las personas sentirán durante la actividad.','Puede influir en la experiencia, pero no garantiza una misma emoción.'],
 ['Sustituye el criterio que permite valorar la calidad de la respuesta entregada.','Permitir revisión no reemplaza los criterios para valorar la respuesta.']]),
 Q('m1-21','Progresión','Para avanzar al segundo reto basta con entregar el primero, aunque contenga un error central. Se busca dominio progresivo. ¿Qué condición de avance convendría revisar?',
 'Pedir corregir el error central con una pista y criterios del reto.',
 'La progresión se vincula a una mejora relevante y mantiene apoyo para alcanzarla.',[
 ['Solicitar una entrega adicional con el mismo formato del primer reto.','Una entrega más no garantiza corregir la dificultad detectada.'],
 ['Solicitar un mínimo de tiempo dedicado antes de abrir el segundo reto.','El tiempo puede ser necesario, pero no demuestra dominio progresivo.'],
 ['Solicitar que otro equipo confirme que la tarea ya fue enviada completa.','Verifica finalización administrativa, no la corrección del error central.']]),
 Q('m1-22','Competencia','Una clasificación por rapidez favorece respuestas poco justificadas. La meta es analizar con cuidado. ¿Qué regla de puntuación sería más coherente?',
 'Reconocer la calidad de la justificación y su mejora después de contrastarla.',
 'La puntuación debe orientar la conducta que se busca: analizar y justificar, no únicamente responder rápido.',[
 ['Mantener la rapidez y aumentar los puntos de las preguntas más difíciles.','La presión por velocidad sigue presente aunque cambien los puntos.'],
 ['Mantener la rapidez y mostrar los resultados solamente al final del desafío.','Oculta la comparación durante la tarea, pero conserva el incentivo por velocidad.'],
 ['Mantener la rapidez y permitir que los equipos elijan nombres para el ranking.','Cambia la identificación pública, no la conducta recompensada.']]),
 Q('m1-23','Sentido del logro','Se entrega «Experto» por completar la primera actividad guiada. Después, una tarea autónoma revela dificultades. ¿Qué ajuste haría más interpretable ese reconocimiento?',
 'Nombrar el logro según la capacidad demostrada y distinguir el apoyo recibido.',
 'El reconocimiento debe comunicar qué se ha demostrado, sin equiparar una primera práctica guiada con dominio autónomo.',[
 ['Conservar el nombre y aumentar la cantidad de actividades de la siguiente etapa.','Aumentar práctica no aclara qué representaba el reconocimiento anterior.'],
 ['Conservar el nombre y entregar una insignia diferente al terminar la unidad.','Puede añadir niveles, pero el primer reconocimiento continúa sobreestimando el logro.'],
 ['Conservar el nombre y comparar los resultados obtenidos por todos los equipos.','Comparar resultados no hace más precisa la interpretación de la insignia.']]),
 Q('m1-24','Componentes y experiencia','Un docente quiere adaptar una gamificación observada en otro curso. ¿Qué revisión debería preceder a copiar sus puntos, niveles y personajes?',
 'Precisar el aprendizaje y las acciones que esos elementos ayudarían a sostener.',
 'La adaptación necesita una intención pedagógica y acciones coherentes; copiar componentes no garantiza la misma experiencia.',[
 ['Reunir los archivos gráficos para conservar la identidad visual del recorrido.','Puede ser útil después, pero no establece su pertinencia para el nuevo aprendizaje.'],
 ['Calcular cuántos puntos equivaldrían a cada tarea ya existente en la unidad.','Asigna puntuación sin revisar primero qué acciones conviene promover.'],
 ['Elegir una plataforma que reproduzca todas las funciones del ejemplo original.','Replica funciones antes de determinar cuáles necesita el nuevo contexto.']]),
 Q('m1-25','Integración de fundamentos','Dos diseños persiguen la misma meta. Uno premia entregar; otro permite intentar, recibir una objeción y mejorar la explicación. Si la meta es argumentar, ¿qué criterio favorece al segundo?',
 'Sus reglas hacen necesaria la revisión de razones para avanzar en la actividad.',
 'El vínculo entre acción y aprendizaje es explícito: revisar razones forma parte del avance, no solo de la entrega.',[
 ['Su mayor cantidad de pasos hace que el recorrido dure más tiempo de trabajo.','La duración por sí sola no demuestra una mejor alineación.'],
 ['Su estructura admite más personajes y una mayor variedad de reconocimientos.','Los personajes y premios posibles no explican la ventaja pedagógica del caso.'],
 ['Su secuencia permite registrar más interacciones en el tablero de la unidad.','El registro aporta seguimiento, pero no es la razón central para preferir el diseño.']])
 ],
 g2:[
 Q('m2-01','Unplugged y plugged','Un colegio tiene pocos dispositivos y conexión intermitente. La misión exige negociar recursos y justificar acuerdos. ¿Qué implementación conserva mejor esa interacción?',
 'Usar cartas físicas, acuerdos escritos y roles con las mismas reglas.',
 'El propósito requiere negociación y justificación, que pueden mantenerse sin depender de conexión permanente.',[
 ['Compartir una pantalla y dejar que el docente ejecute las decisiones por cada equipo.','Centraliza acciones y puede reducir la negociación entre participantes.'],
 ['Esperar a disponer de conexión estable para aplicar el tablero digital completo.','Conserva el soporte, pero posterga una interacción que no necesita ese soporte.'],
 ['Reemplazar la misión por un cuestionario individual descargable de los conceptos.','Resuelve acceso, pero cambia la negociación por una tarea individual.']]),
 Q('m2-02','Elegir herramientas','Un docente busca discutir por qué dos respuestas parecen correctas. Ya dispone de una pizarra y tarjetas. ¿Qué criterio debería orientar la incorporación de una plataforma?',
 'Que ayude a comparar razones y a dar feedback sobre las decisiones.',
 'La herramienta se justifica por su contribución a la actividad y evidencia deseadas, no por su novedad.',[
 ['Que tenga más plantillas y personajes que los recursos disponibles en el aula.','La variedad visual no demuestra que ayude a comparar razones.'],
 ['Que genere una clasificación automática al responder cada una de las preguntas.','La clasificación puede ser útil para otro propósito; no aborda la discusión de razones.'],
 ['Que reúna todos los materiales del curso aunque la discusión continúe igual.','Centralizar materiales no asegura una mejora en la interacción que se busca.']]),
 Q('m2-03','IA y revisión docente','Una IA genera cuatro opciones, pero la correcta es mucho más larga y los distractores son inverosímiles. ¿Qué revisión mejora más la calidad del desafío?',
 'Equilibrar la extensión y plausibilidad de las opciones y justificar la clave.',
 'La pregunta debe exigir discriminar por el contenido del caso. La extensión y la plausibilidad no deberían revelar la respuesta.',[
 ['Cambiar el orden de las alternativas y mantener la redacción generada por la IA.','Oculta la posición, pero mantiene las pistas por extensión y plausibilidad.'],
 ['Agregar una ilustración al caso para que resulte más inmersivo al responder.','Enriquece la presentación, sin corregir el problema de las alternativas.'],
 ['Aumentar la puntuación del ítem para reconocer que requiere una lectura más larga.','Cambiar puntos no mejora la validez de la decisión que se evalúa.']]),
 Q('m2-04','Prompts con contexto','Se pide a una IA «crea una gamificación entretenida» y el resultado no encaja con el grupo. ¿Qué información conviene añadir al encargo?',
 'Objetivo, características del grupo, recursos y evidencia esperada.',
 'Estos datos permiten orientar el diseño hacia una necesidad concreta y establecer cómo valorar su pertinencia.',[
 ['Nombre del mundo, colores principales, personajes y cantidad de escenas narrativas.','Define ambientación, pero deja sin precisar la necesidad pedagógica.'],
 ['Lista de plataformas populares, premios posibles y número de niveles deseado.','Especifica soluciones antes de describir el problema y el contexto.'],
 ['Duración de cada animación, estilo del tablero y música para las recompensas.','Detalla presentación sin orientar la actividad y la evidencia que se necesitan.']]),
 Q('m2-05','Octalysis','En una misión, el grupo se implica porque siente que contribuye a resolver una necesidad de su comunidad. ¿Qué decisión mantendría mejor ese impulso?',
 'Mostrar quién utilizará las propuestas y qué aportará el grupo.',
 'El impulso descrito se vincula al significado y propósito. Mostrar el aporte conserva esa relación.',[
 ['Crear un premio escaso que reciba únicamente la propuesta con mayor puntuación.','Desplaza el foco hacia escasez y comparación, diferentes del impulso descrito.'],
 ['Ocultar el tema de la próxima misión para aumentar la curiosidad del recorrido.','Trabaja curiosidad, pero no refuerza directamente la contribución comunitaria.'],
 ['Aumentar los puntos individuales por cada tarea completada durante la misión.','Refuerza acumulación personal sin hacer más visible el aporte comunitario.']]),
 Q('m2-06','Recompensas con intención','Se diseñan cartas que permiten saltarse la tarea de argumentación, que es el aprendizaje central. ¿Cómo modificarías la ventaja de esas cartas?',
 'Ofrecer una pista o una revisión adicional que ayude a argumentar sin omitir la tarea.',
 'Una ventaja puede reducir una barrera o dar apoyo, manteniendo la oportunidad de demostrar el aprendizaje.',[
 ['Limitar el número de cartas para que pocas personas puedan omitir la tarea central.','Reduce el alcance de la omisión, pero mantiene la desalineación de la ventaja.'],
 ['Aumentar el costo de la carta para que saltarse la tarea requiera más puntos.','El costo no resuelve que la recompensa suprima el aprendizaje central.'],
 ['Reservar la carta para el final y canjearla por la tarea de mayor dificultad.','Puede eliminar precisamente la evidencia de integración que interesa observar.']]),
 Q('m2-07','Gimkit y propósito','Un grupo disfruta gestionar recursos en un quiz, pero responde al azar para ganar más. ¿Qué ajuste conviene ensayar antes de cambiar de plataforma?',
 'Revisar qué se recompensa y pedir justificar algunas decisiones.',
 'El uso del azar parece incentivado por las reglas. Cambiarlas y observar razones permite evaluar un ajuste pertinente.',[
 ['Añadir más preguntas al banco para que resulte más difícil memorizar sus respuestas.','Puede aumentar variedad; no cambia el incentivo a responder sin analizar.'],
 ['Aumentar la velocidad de las rondas para sostener la atención de todo el grupo.','Puede intensificar la conducta apresurada que se quiere revisar.'],
 ['Entregar más recursos iniciales para que todos participen con iguales oportunidades.','Puede mejorar las condiciones iniciales, pero no la calidad del razonamiento.']]),
 Q('m2-08','Genially y secuencia','Un escape room tiene botones ocultos que se descubren por azar. El objetivo es relacionar conceptos. ¿Qué diseño del desbloqueo sería más coherente?',
 'Abrir la siguiente escena al justificar una relación entre las evidencias del caso.',
 'La relación conceptual se vuelve necesaria para avanzar y deja una evidencia interpretable.',[
 ['Cambiar la ubicación de los botones en cada intento para renovar la exploración.','Renueva la búsqueda visual, pero la relación conceptual puede seguir sin utilizarse.'],
 ['Agregar más objetos interactivos que entreguen puntos al ser descubiertos.','Amplía la exploración de objetos, no la evidencia de relación entre conceptos.'],
 ['Mostrar una cuenta regresiva para motivar la búsqueda de la salida del escenario.','Añade presión temporal sin alinear el desbloqueo con el objetivo.']]),
 Q('m2-09','HearthCards','Se preparan cartas de recompensa con HearthCards para una actividad de revisión. ¿Qué información resulta más importante que su apariencia de juego?',
 'Qué ventaja ofrecen, cuándo pueden usarse y cómo conservan la exigencia de aprendizaje.',
 'La carta necesita reglas de uso comprensibles y una ventaja alineada con la tarea; el diseño visual las representa.',[
 ['Qué rareza tiene cada carta y qué combinación de colores distingue su categoría.','Puede facilitar identificación, pero falta definir su función pedagógica y de juego.'],
 ['Qué personaje aparece en la carta y cómo se relaciona con la historia del mundo.','Aporta coherencia narrativa, pero no establece qué permite hacer la carta.'],
 ['Qué equipo diseñó la carta y cuántos ejemplares circulan durante la actividad.','Puede apoyar organización, pero no reemplaza la definición de la ventaja y sus límites.']]),
 Q('m2-10','Contingencia','Durante una misión digital se cae la conexión. Los equipos ya tienen los datos del caso y deben defender una decisión. ¿Qué alternativa conserva mejor el propósito?',
 'Continuar con tarjetas de decisión y registrar las razones usando los mismos criterios.',
 'La defensa de una decisión puede continuar con los datos disponibles y criterios equivalentes, aunque cambie el soporte.',[
 ['Pedir un resumen individual de los conceptos hasta que se restablezca la conexión.','Mantiene trabajo académico, pero cambia la tarea de defender una decisión.'],
 ['Dedicar el tiempo restante a explicar los resultados que mostraba la plataforma.','Puede informar, pero sustituye la elaboración de razones por una explicación docente.'],
 ['Reprogramar toda la misión para conservar cada una de las funciones digitales.','Protege el soporte completo, aunque la actividad central ya puede realizarse.']]),
 Q('m2-11','Dependencia de premios','Cada semana se necesitan premios mayores para sostener una misma tarea. ¿Qué conviene revisar primero en el diseño?',
 'La relevancia del reto, las elecciones y el feedback sobre el progreso.',
 'El aumento continuo del premio puede estar compensando una experiencia poco significativa. Conviene revisar el diseño de la actividad.',[
 ['La frecuencia de entrega para que los mismos premios aparezcan con más regularidad.','Cambia la administración del incentivo sin revisar la experiencia que depende de él.'],
 ['El catálogo de recompensas para incluir opciones de mayor variedad y rareza.','Puede renovar interés temporal, pero sostiene la misma dependencia.'],
 ['La escala de puntos para distribuir premios mayores durante más semanas del curso.','Redistribuye el incentivo sin examinar la relevancia de la tarea.']]),
 Q('m2-12','Fatiga','Una unidad incluye puntos, cinco monedas, cartas y tres rankings. El grupo consulta constantemente cómo avanzar. ¿Qué ajuste probarías primero?',
 'Simplificar los recursos y hacer explícita una ruta de progreso vinculada a las tareas.',
 'Las consultas sugieren una carga de reglas difícil de interpretar. Simplificar permite recuperar claridad sin quitar el propósito.',[
 ['Añadir un nuevo rol de experto que recuerde todas las reglas durante cada ronda.','Puede dar apoyo, pero mantiene una complejidad que conviene revisar primero.'],
 ['Crear un video separado para explicar cada una de las monedas y clasificaciones.','Documenta el sistema, aunque la carga de reglas continúa intacta.'],
 ['Aumentar las recompensas por utilizar correctamente las distintas monedas del tablero.','Premia gestionar la complejidad, desplazando más atención hacia el sistema.']]),
 Q('m2-13','IA y control de calidad','Una narrativa generada por IA es atractiva, pero contradice los conceptos del material del curso. ¿Qué paso debe preceder a incorporarla?',
 'Contrastar el contenido con los materiales y corregir las contradicciones detectadas.',
 'La calidad narrativa no garantiza exactitud. La revisión docente debe verificar la coherencia conceptual antes del uso.',[
 ['Pedir otra versión a la misma IA y elegir la que tenga una narración más clara.','Puede mejorar el texto, pero no sustituye el contraste conceptual.'],
 ['Presentarla como una historia opcional para reducir su peso en la evaluación.','La opcionalidad no evita que se comuniquen conceptos contradictorios.'],
 ['Conservar la historia y añadir un cuestionario de comprensión al finalizar su lectura.','Se podría evaluar comprensión de un contenido que todavía contiene errores.']]),
 Q('m2-14','Equivalencia de soportes','Se ofrece una misión en tablero físico y otra en plataforma digital. ¿Qué conviene mantener equivalente para valorar el mismo aprendizaje?',
 'La demanda de la tarea, los criterios de logro y las oportunidades de recibir apoyo.',
 'La equivalencia pedagógica depende de qué se exige y cómo se valora, no de reproducir exactamente cada efecto del soporte.',[
 ['La cantidad de animaciones y el tamaño de las imágenes usadas en los dos tableros.','La apariencia puede variar sin alterar el aprendizaje exigido.'],
 ['El número exacto de clics y movimientos necesarios para completar cada estación.','Las acciones operativas cambian entre soportes; no definen por sí solas equivalencia.'],
 ['La duración idéntica de cada intervención y la ubicación de todos los recursos.','El ritmo y distribución pueden adaptarse manteniendo criterios y demanda.']]),
 Q('m2-15','Creatividad y feedback','En una misión se buscan soluciones diversas. Solo se premia reproducir el ejemplo del docente. ¿Qué ajuste sería más pertinente?',
 'Definir criterios de pertinencia que admitan distintas soluciones.',
 'La diversidad requiere criterios que valoren el propósito y la fundamentación, sin exigir una réplica del ejemplo.',[
 ['Mostrar más ejemplos resueltos para que los equipos elijan cuál reproducir.','Amplía los modelos disponibles, pero mantiene la reproducción como condición de logro.'],
 ['Dar una recompensa adicional por terminar con rapidez la solución esperada.','Refuerza la reproducción rápida y no la diversidad de soluciones.'],
 ['Mantener el criterio y permitir elegir la apariencia del producto presentado.','Ofrece variedad visual, sin abrir posibilidades en la solución central.']]),
 Q('m2-16','Alineación estratégica','Una plataforma nueva tiene funciones atractivas, pero no permite explicar ni revisar respuestas. La meta de la unidad es mejorar argumentos. ¿Qué decisión está mejor fundamentada?',
 'Elegir otro recurso que permita argumentar, recibir objeciones y revisar la respuesta.',
 'Las funciones necesarias se deducen del objetivo. La elección debe sostener el ciclo de argumentación y mejora.',[
 ['Usar la plataforma y sustituir la argumentación por preguntas de reconocimiento rápido.','Adapta la meta al recurso y reduce la exigencia que se buscaba.'],
 ['Usar la plataforma y compensar la falta de revisión con más puntos por respuesta.','La puntuación no incorpora la práctica de revisar argumentos.'],
 ['Usar la plataforma y reservar la revisión para una unidad futura del programa.','Posterga un componente central del aprendizaje previsto para esta unidad.']]),
 Q('m2-17','Octalysis y elección','Dos rutas permiten elegir un caso y construir una solución propia. El grupo valora esa posibilidad más que la clasificación. ¿Qué conviene cuidar al ampliar la misión?',
 'Mantener decisiones con consecuencias y espacio para probar soluciones con feedback.',
 'El caso muestra interés por decidir y crear. La ampliación debería conservar esas oportunidades, observando cómo responden los participantes.',[
 ['Aumentar la visibilidad del ranking para equilibrar el interés por las dos rutas.','Introduce comparación que el grupo no identifica como principal valor de la experiencia.'],
 ['Convertir cada solución en un premio aleatorio que se desbloquee al finalizar.','Cambia creación por obtención de una recompensa imprevisible.'],
 ['Cerrar las rutas en una secuencia única para asegurar la misma duración del trabajo.','Puede facilitar gestión, pero reduce precisamente la elección valorada.']]),
 Q('m2-18','Recursos y evidencia','El tablero registra quién abrió una pista. Se quiere saber si esa ayuda mejoró la solución. ¿Qué registro sería más útil?',
 'Relacionar la pista consultada con la revisión de la respuesta y sus razones.',
 'Relacionar uso y revisión permite examinar cómo se aprovechó la ayuda; el acceso aislado no muestra ese efecto.',[
 ['Contar cuántas veces se abrió la pista durante cada sesión de la misión.','Mide frecuencia de uso sin mostrar qué cambió en la solución.'],
 ['Registrar qué dispositivo se utilizó para acceder al tablero de la actividad.','Describe condiciones de acceso, no el aprovechamiento de la pista.'],
 ['Mostrar una insignia a quienes consultaron al menos una pista del desafío.','Reconoce consulta sin aportar evidencia de mejora posterior.']]),
 Q('m2-19','Tecnología e interacción','Una actividad presencial permite negociar decisiones. Al digitalizarla, cada persona responde en silencio y recibe puntos. ¿Qué se necesita revisar?',
 'Si las nuevas reglas conservan la interacción que contribuía al aprendizaje buscado.',
 'Cambiar de soporte puede cambiar la actividad. La negociación descrita era una parte relevante del diseño original.',[
 ['Si la plataforma muestra suficientes puntos para compensar la falta de conversación.','La puntuación no reemplaza necesariamente el aprendizaje derivado de negociar.'],
 ['Si el tablero utiliza la misma paleta y los mismos personajes de la actividad original.','Conservar identidad visual no conserva por sí solo las interacciones.'],
 ['Si las preguntas digitales son más numerosas que las decisiones del tablero físico.','La cantidad de preguntas no informa sobre la calidad de la interacción perdida.']]),
 Q('m2-20','IA y dificultad','La IA propone un banco de preguntas correctas, pero casi todas se resuelven por una palabra clave. ¿Qué encargo de revisión resultaría más útil?',
 'Pedir casos con restricciones y opciones plausibles que se deban comparar.',
 'Las restricciones del caso permiten justificar una opción sobre otras razonables, aumentando la demanda de aplicación.',[
 ['Pedir enunciados más largos con nuevos personajes y detalles de ambientación.','La longitud y ambientación no aseguran una decisión más exigente.'],
 ['Pedir términos más técnicos para que las opciones requieran mayor vocabulario.','Puede aumentar dificultad lingüística sin mejorar el razonamiento evaluado.'],
 ['Pedir que cambie la posición de la respuesta correcta en todas las preguntas.','Mezclar posiciones evita un patrón, pero no elimina la pista por palabra clave.']]),
 Q('m2-21','Cartas de apoyo','Un equipo con dificultades obtiene una carta que permite consultar un ejemplo. ¿Qué uso mantendría mejor el reto?',
 'Comparar el ejemplo con el caso y explicar qué puede adaptarse antes de reintentar.',
 'El ejemplo sirve de apoyo cuando se procesa y adapta; la explicación mantiene una decisión propia del equipo.',[
 ['Copiar el procedimiento del ejemplo y recibir automáticamente la recompensa del reto.','Evita demostrar que el procedimiento es pertinente para el caso.'],
 ['Consultar el ejemplo después de canjear la recompensa por completar el intento.','La ayuda llega después de la decisión y su aprovechamiento no se observa.'],
 ['Reemplazar el caso por otro idéntico al ejemplo para asegurar la respuesta correcta.','Puede facilitar práctica inicial, pero elimina la adaptación que se buscaba.']]),
 Q('m2-22','Uso de tiempo','Quedan veinte minutos y una herramienta requiere quince de registro y explicación. El objetivo es comparar decisiones. ¿Qué conviene priorizar?',
 'Un recurso ya conocido que permita dedicar el tiempo a comparar y fundamentar.',
 'Con el tiempo disponible, el costo operativo de la herramienta desplazaría la actividad central.',[
 ['Completar el registro para que la plataforma quede preparada para la próxima sesión.','Puede tener valor futuro, pero no atiende la meta de esta sesión.'],
 ['Mostrar las funciones principales y dejar la comparación para trabajo posterior.','Prioriza aprender la herramienta sobre la comparación prevista para el encuentro.'],
 ['Reducir la comparación a una votación rápida al terminar la explicación del recurso.','Mantiene una elección breve, pero pierde la fundamentación que se necesita.']]),
 Q('m2-23','Prueba de prototipo','Antes de aplicar un tablero con todo el curso, se prueba con un grupo pequeño. ¿Qué observación permitiría mejorar más su funcionamiento?',
 'Dónde se detienen, cómo interpretan las reglas y qué decisiones logran justificar.',
 'Estas observaciones relacionan usabilidad, interacción y aprendizaje, y permiten localizar ajustes concretos.',[
 ['Qué personajes eligen con más frecuencia y qué colores prefieren para sus equipos.','Aporta preferencias visuales, pero no permite valorar el funcionamiento central.'],
 ['Cuánto entusiasmo muestran al conocer las recompensas finales del recorrido.','Describe una reacción inicial que no asegura comprensión ni aplicación.'],
 ['Qué cantidad de pantallas recorren durante los primeros minutos de exploración.','El recorrido indica uso, sin explicar dificultades ni calidad de las decisiones.']]),
 Q('m2-24','Recompensa y apoyo','Se quiere reconocer una mejora después de un error sin hacer que equivocarse resulte una estrategia para ganar más puntos. ¿Qué criterio sería más coherente?',
 'Reconocer la revisión lograda una sola vez con criterios comunes de calidad.',
 'Se reconoce la mejora demostrada, evitando premiar repetidamente el mismo ciclo de error y corrección.',[
 ['Dar puntos nuevos por cada error y otros puntos por volver a responder la pregunta.','Puede incentivar acumular intentos erróneos para obtener más puntos.'],
 ['Reservar toda recompensa para quienes respondan correctamente en el primer intento.','Evita explotación, pero deja de reconocer la revisión que se quería promover.'],
 ['Entregar premios aleatorios después de cada reintento para mantener la expectativa.','La recompensa se separa de la calidad de la mejora realizada.']]),
 Q('m2-25','Integración de herramientas','Un equipo debe escoger entre dos plataformas. Una ofrece más efectos; la otra permite revisión y evidencia de razonamiento. La meta es fundamentar decisiones. ¿Qué argumento debería pesar más?',
 'Poder observar razones, dar feedback y revisar la solución presentada.',
 'La elección se fundamenta en las funciones que sostienen el aprendizaje, considerando también acceso y viabilidad.',[
 ['La cantidad de efectos que puedan asociarse a los aciertos del equipo durante la misión.','Puede enriquecer la experiencia, pero no asegura práctica de fundamentación.'],
 ['La novedad del entorno y el interés que provoca durante la primera demostración del curso.','La reacción inicial no demuestra su aporte al objetivo de aprendizaje.'],
 ['La similitud del tablero con los videojuegos que el grupo dice conocer desde antes.','La familiaridad puede facilitar acceso, pero no determina la función pedagógica necesaria.']])
 ],
 g3:[
 Q('m3-01','Flow','Un grupo resuelve sin esfuerzo y otro no logra comenzar el mismo reto. El objetivo es común. ¿Qué ajuste atendería mejor ambas situaciones?',
 'Ofrecer apoyos graduados y extensiones que mantengan el mismo objetivo de aprendizaje.',
 'El equilibrio entre reto y habilidad exige ajustar apoyos y complejidad según lo observado, conservando el propósito común.',[
 ['Aumentar la dificultad del mismo reto para que represente un desafío para todo el curso.','Puede atender a quienes avanzan rápido, pero agravar el bloqueo del otro grupo.'],
 ['Reducir la dificultad del mismo reto hasta que ambos grupos lo completen con facilidad.','Puede facilitar el inicio, pero mantener aburrimiento en quienes ya lo dominan.'],
 ['Mantener el reto y aumentar los puntos disponibles para los grupos que lo terminen.','El incentivo no ajusta el desajuste entre dificultad y habilidad.']]),
 Q('m3-02','Describir jugadores','Se planifica una ruta con ranking obligatorio porque el curso anterior disfrutó competir. ¿Qué información conviene recoger antes de mantener esa decisión?',
 'Intereses, experiencia previa y disposición del nuevo grupo ante distintas formas de participar.',
 'Describir jugadores requiere conocer al grupo actual; una respuesta favorable de otro curso no basta para decidir.',[
 ['Resultados del ranking anterior para reproducir la misma distribución de puntos y posiciones.','Describe otro grupo y mantiene la suposición que se necesita revisar.'],
 ['Cantidad de recompensas competitivas que admite la plataforma elegida para el tablero.','Describe funciones del recurso, no características de quienes participarán.'],
 ['Preferencias visuales del nuevo grupo para conservar el ranking con otra apariencia.','Personaliza la presentación sin revisar la pertinencia de competir obligatoriamente.']]),
 Q('m3-03','Bartle','Una participante invierte tiempo en descubrir rutas y relaciones que no dan puntos. ¿Qué propuesta responde mejor a la orientación exploradora descrita?',
 'Una ruta de descubrimiento con hallazgos que deba conectar y explicar al grupo.',
 'La curiosidad y el descubrimiento son centrales en la orientación exploradora; la explicación conecta ese interés con aprender.',[
 ['Una clasificación visible para reconocer a quien complete más tareas de la semana.','Se centra en acumulación y logro comparado, no en descubrir relaciones.'],
 ['Una arena para confrontar directamente a otros participantes por una posición superior.','Introduce confrontación interpersonal que no corresponde a la conducta descrita.'],
 ['Una secuencia cerrada de tareas que entregue puntos por seguir el orden previsto.','Puede apoyar organización, pero limita la exploración valorada por la participante.']]),
 Q('m3-04','HEXAD','Un participante disfruta apoyar a otros equipos aunque no reciba puntos. Según HEXAD, ¿qué oportunidad resulta más coherente con ese interés?',
 'Aportar recursos o asesoría que ayuden a otros a mejorar sus propias soluciones.',
 'La orientación filantrópica se relaciona con contribuir y ayudar con propósito, sin requerir una recompensa externa directa.',[
 ['Acceder a un premio exclusivo por acumular más ayudas registradas que sus compañeros.','Introduce comparación y premio como foco de una ayuda que ya tenía propósito.'],
 ['Obtener ventajas para alterar las reglas del tablero y reorganizar las posiciones del grupo.','Se aproxima a intervenir el sistema; no describe principalmente contribuir a otros.'],
 ['Resolver desafíos individuales de máxima dificultad para demostrar dominio de los contenidos.','Se centra en maestría personal, diferente de la motivación de ayuda descrita.']]),
 Q('m3-05','Lazzaro','Un equipo disfruta insistir en un problema exigente y celebrar cuando domina el procedimiento. ¿Qué experiencia de Lazzaro describe mejor ese disfrute?',
 'Hard Fun: satisfacción asociada a superar un reto y desarrollar maestría.',
 'La satisfacción está vinculada al esfuerzo por dominar un problema, característica de Hard Fun.',[
 ['People Fun: satisfacción centrada principalmente en la interacción con otras personas.','Trabajar en equipo no vuelve social el foco principal del disfrute descrito.'],
 ['Easy Fun: satisfacción centrada principalmente en explorar y descubrir con curiosidad.','Hay curiosidad posible, pero el caso destaca superar una dificultad exigente.'],
 ['Serious Fun: satisfacción centrada principalmente en un cambio personal significativo.','Podría aparecer, pero la evidencia del caso se refiere específicamente a dominio del reto.']]),
 Q('m3-06','6D y objetivo','En un diseño 6D se propone como objetivo «tener más puntos en la plataforma». Se busca que el curso mejore su análisis de casos. ¿Qué reformulación orienta mejor el diseño?',
 'Justificar una decisión con evidencias pertinentes y revisar sus limitaciones en el caso.',
 'Define un desempeño de aprendizaje observable. Los puntos pueden representarlo, pero no reemplazarlo.',[
 ['Completar todas las pantallas de la plataforma antes del cierre de la unidad.','Describe finalización del recorrido, sin precisar la calidad del análisis.'],
 ['Acceder con regularidad a los recursos digitales que se publican para cada misión.','Describe acceso, que puede apoyar el aprendizaje pero no demostrarlo.'],
 ['Obtener una insignia de analista al reunir la cantidad de puntos requerida por el tablero.','Reformula el reconocimiento, pero mantiene sin definir el análisis esperado.']]),
 Q('m3-07','Conductas objetivo','Se quiere promover revisión de soluciones. ¿Qué conducta conviene observar y reconocer dentro del diseño?',
 'Modificar una decisión inicial y justificar el cambio a partir de una objeción recibida.',
 'La conducta hace visible el uso de feedback para revisar, en coherencia con el propósito indicado.',[
 ['Abrir todas las pantallas de retroalimentación antes de finalizar el recorrido del módulo.','Abrir la devolución no demuestra que se utilice para revisar.'],
 ['Enviar la primera respuesta antes que los otros equipos y acumular puntos de rapidez.','Promueve velocidad de entrega, no revisión de la solución.'],
 ['Valorar positivamente la utilidad de los comentarios en una encuesta de cierre de la unidad.','Aporta percepción, pero no evidencia la modificación fundamentada de una decisión.']]),
 Q('m3-08','Ciclo de actividad','Una misión termina al enviar la primera respuesta. El grupo no sabe cómo mejorar. ¿Qué ciclo conviene incorporar?',
 'Intento, información sobre el desempeño y una oportunidad de revisar la respuesta.',
 'El ciclo conecta actuación, feedback y nueva actuación, permitiendo avanzar a partir de información útil.',[
 ['Entrega, premio por participación y apertura automática del siguiente desafío del recorrido.','Sostiene avance, pero no ofrece información ni revisión de la respuesta.'],
 ['Entrega, comparación de velocidades y publicación de la posición final de cada equipo.','Añade comparación temporal, no un ciclo para mejorar el desempeño.'],
 ['Entrega, presentación de nuevos conceptos y una tarea de otro tema en la próxima misión.','Amplía contenidos, pero deja sin atender la revisión de la respuesta actual.']]),
 Q('m3-09','Autoimagen','Un ranking público hace que quienes van atrás dejen de participar. ¿Qué ajuste permitiría conservar información de progreso con menor exposición?',
 'Mostrar hitos personales y feedback referido a criterios, con metas de mejora alcanzables.',
 'Hace visible el progreso sin convertir una posición pública desfavorable en el centro de la experiencia.',[
 ['Mantener el ranking y aumentar la cantidad de puestos que reciben un premio al finalizar.','Puede ampliar premios, pero conserva la exposición que se asocia al retiro.'],
 ['Mantener el ranking y cambiar los nombres reales por apodos conocidos por todo el grupo.','Si las identidades siguen siendo reconocibles, la exposición puede continuar.'],
 ['Mantener el ranking y recordar que las posiciones cambiarán en las siguientes rondas.','Puede dar perspectiva, pero no modifica el mecanismo que afecta la participación.']]),
 Q('m3-10','Perfiles flexibles','Un test sugiere que una estudiante es exploradora. Luego disfruta colaborar y resolver retos exigentes. ¿Qué uso del perfil sería más adecuado?',
 'Tomarlo como una orientación revisable y ofrecer elecciones según su participación observada.',
 'Los perfiles ayudan a diseñar oportunidades; no deben convertirse en etiquetas que impidan otras formas de participar.',[
 ['Asignarle únicamente misiones de exploración para respetar el resultado inicial del test.','Convierte una orientación en una restricción pese a nueva evidencia.'],
 ['Repetir el test hasta obtener un perfil único que explique todas sus preferencias de juego.','Supone una clasificación única y fija que el caso no justifica.'],
 ['Mantener su perfil inicial y valorar solo los desempeños de exploración durante el curso.','Restringe las evidencias de aprendizaje por una etiqueta de preferencia.']]),
 Q('m3-11','Autonomía','Dos productos permiten demostrar el mismo aprendizaje con criterios comunes. ¿Qué elección ofrece autonomía preservando la exigencia?',
 'Elegir el formato y justificar cómo comunica la evidencia que requieren los criterios.',
 'La elección permite una vía propia sin reducir el aprendizaje ni los criterios de evaluación.',[
 ['Elegir el formato que permita omitir los criterios que resulten más difíciles al equipo.','La elección cambia la exigencia común que debía preservarse.'],
 ['Elegir un color y un nombre antes de producir el mismo formato obligatorio para todos.','Ofrece personalización, pero no la decisión relevante sobre cómo comunicar la evidencia.'],
 ['Elegir el producto que entregue más puntos aunque evalúe otro aprendizaje de la unidad.','Desvía la decisión hacia recompensa y modifica el aprendizaje que se debía demostrar.']]),
 Q('m3-12','Flow y apoyo','Un grupo conoce el contenido, pero no entiende la interfaz y abandona el desafío. ¿Qué apoyo atendería mejor la barrera descrita?',
 'Un ejemplo breve de navegación y una primera acción guiada antes de retomar el reto.',
 'La barrera es operativa. Aclarar la interfaz permite recuperar el desafío conceptual sin simplificarlo innecesariamente.',[
 ['Un resumen adicional del contenido disciplinar antes de responder las preguntas del tablero.','El grupo conoce el contenido; falta resolver la barrera de uso.'],
 ['Una reducción de la complejidad conceptual de todas las preguntas de la misión.','Puede bajar el reto cognitivo sin aclarar cómo usar la interfaz.'],
 ['Una recompensa mayor para quienes permanezcan hasta terminar el desafío de la plataforma.','Aumenta el incentivo sin eliminar la barrera que impide participar.']]),
 Q('m3-13','Werbach','Un diseño incorpora puntos e insignias, pero no define cómo se obtienen ni qué acciones permiten avanzar. ¿Qué nivel necesita concretar principalmente?',
 'Las mecánicas que organizan las acciones y las reglas para obtener esos componentes.',
 'En la pirámide revisada, los componentes necesitan reglas de interacción y avance para funcionar dentro de un sistema.',[
 ['Los componentes que representan visualmente cada uno de los logros de la experiencia.','Ya se han previsto puntos e insignias; falta definir su funcionamiento.'],
 ['Las emociones que todas las personas deberán experimentar al recibir una recompensa.','Las emociones no pueden fijarse como una respuesta uniforme por medio de componentes.'],
 ['La apariencia narrativa que permite reconocer al personaje principal del recorrido.','Puede enriquecer la experiencia, pero no concreta la regla de obtención y avance.']]),
 Q('m3-14','PET','Un curso incorpora puntos, emblemas y tablas de clasificación. ¿Qué revisión permitiría valorar su aporte más allá de constatar que están presentes?',
 'Examinar qué acciones incentivan y cómo se relacionan con los aprendizajes del curso.',
 'La presencia de PET no asegura un diseño pertinente; importa cómo orientan las acciones en ese contexto.',[
 ['Comprobar que las tres representaciones usen una misma paleta y estilo de iconos.','La coherencia visual ayuda a leer el sistema, pero no demuestra aporte al aprendizaje.'],
 ['Comprobar que el número de puntos aumente en cada una de las semanas de trabajo.','La acumulación no indica por sí misma qué aprendizaje se está promoviendo.'],
 ['Comprobar que todos los participantes reciban el mismo número de emblemas del tablero.','La igualdad de cantidades no demuestra pertinencia de los criterios de obtención.']]),
 Q('m3-15','Diversión y aprendizaje','Un grupo disfruta conversar, pero necesita también profundizar la calidad de sus soluciones. ¿Qué misión integraría mejor ambas necesidades?',
 'Resolver un caso en roles complementarios y defender una solución ante objeciones de pares.',
 'La interacción social se vincula a una tarea de razonamiento que exige explicar y revisar decisiones.',[
 ['Conversar libremente sobre los personajes y recibir puntos por cada intervención del grupo.','Favorece interacción, pero no conecta necesariamente con profundizar soluciones.'],
 ['Resolver en silencio un cuestionario y comparar después las puntuaciones obtenidas por el equipo.','Puede practicar contenidos, pero aprovecha poco el interés por conversar.'],
 ['Repartir tareas idénticas entre integrantes y sumar sus respuestas al finalizar la misión.','Divide trabajo sin asegurar intercambio de razones ni construcción compartida.']]),
 Q('m3-16','Andamiaje','Un equipo está cerca de resolver, pero confunde dos criterios. ¿Qué pista graduada mantendría mejor su responsabilidad sobre la decisión?',
 'Pedir que compare un dato del caso con ambos criterios y explique cuál resulta pertinente.',
 'La pista focaliza la comparación que falta sin entregar directamente la respuesta.',[
 ['Indicar cuál criterio debe elegir y pedir que copie su definición antes de avanzar al reto.','Entrega la elección y reduce la oportunidad de discriminar por cuenta propia.'],
 ['Dar un nuevo caso más sencillo y marcar en él la respuesta que corresponde seleccionar.','Puede modelar, pero cambia el caso y hace explícita la elección.'],
 ['Repetir las instrucciones completas y recordar que dispone de varios intentos para resolver.','Puede acompañar, pero no focaliza la confusión concreta entre criterios.']]),
 Q('m3-17','6D y herramientas','Un equipo ya definió objetivo, conductas, jugadores y ciclos de revisión. ¿Qué pregunta debe orientar ahora la elección de recursos?',
 'Qué herramienta permite ejecutar esas acciones de forma accesible y recoger la evidencia prevista.',
 'La herramienta debe servir al diseño ya fundamentado y ser viable para el grupo.',[
 ['Qué herramienta ofrece mayor cantidad de plantillas para ampliar el número de actividades.','La cantidad de plantillas no asegura las funciones necesarias para el diseño.'],
 ['Qué herramienta utiliza el mayor número de docentes en experiencias de otras asignaturas.','La popularidad no determina su pertinencia para este grupo y estas acciones.'],
 ['Qué herramienta exige menos cambios en la narrativa que el equipo ya escribió para el mundo.','La compatibilidad narrativa aporta coherencia, pero no basta para ejecutar y observar la tarea.']]),
 Q('m3-18','Desafío opcional','Un grupo domina el procedimiento y termina antes. ¿Qué extensión mantendría mejor el aprendizaje y el desafío?',
 'Analizar un caso con una restricción nueva y justificar cómo cambia la solución inicial.',
 'La nueva restricción aumenta la demanda de transferencia y exige revisar el procedimiento ya dominado.',[
 ['Completar una lista más larga de ejercicios idénticos con el mismo procedimiento de respuesta.','Añade volumen, pero puede no aumentar el desafío para quienes ya lo dominan.'],
 ['Esperar a los demás grupos para que todos abran juntos la siguiente pantalla de la ruta.','Puede facilitar coordinación, pero deja sin tarea desafiante al grupo que terminó.'],
 ['Decorar el tablero del equipo mientras los demás terminan de resolver el procedimiento.','Puede ocupar tiempo, pero no extiende el aprendizaje que se busca profundizar.']]),
 Q('m3-19','Revisión del diseño','En una prueba piloto el grupo comprende la historia, pero no sabe qué hacer después de fallar. ¿Qué parte del diseño conviene revisar primero?',
 'El ciclo de feedback, los apoyos disponibles y las condiciones para reintentar la tarea.',
 'La dificultad surge después del error. El diseño necesita orientar la acción siguiente con información útil y posibilidades de revisión.',[
 ['La cantidad de capítulos narrativos que se presentan antes de abrir el primer desafío.','La historia se comprende; la dificultad descrita corresponde al reintento.'],
 ['El nivel de rareza de las recompensas que se entregan al terminar todas las misiones.','Las recompensas finales no explican cómo actuar frente a un error actual.'],
 ['La frecuencia con que los personajes recuerdan la importancia de completar el recorrido.','Puede reforzar propósito, pero no ofrece una vía concreta para revisar.']]),
 Q('m3-20','Elecciones significativas','Se ofrece elegir entre cuatro puertas, pero siempre aparece la misma tarea con igual ayuda. ¿Qué cambio haría más sustantiva la elección?',
 'Ofrecer enfoques o apoyos diferentes para resolver una tarea con criterios equivalentes.',
 'La elección afecta el modo de abordar la tarea, manteniendo una expectativa común de aprendizaje.',[
 ['Cambiar la ilustración que se muestra al atravesar cada una de las puertas del recorrido.','Aporta variedad visual sin modificar la decisión sobre el trabajo.'],
 ['Aumentar el número de puertas y mantener una misma tarea al ingresar por cualquiera.','Multiplica opciones nominales, sin consecuencias relevantes para la tarea.'],
 ['Permitir que cada equipo ponga un nombre a la puerta antes de iniciar la tarea común.','Añade personalización, pero no una diferencia en cómo se aborda el desafío.']]),
 Q('m3-21','Diagnóstico de jugadores','Un test inicial sugiere interés por competir, pero durante la misión aparecen ansiedad y retiro. ¿Qué evidencia debe pesar al ajustar el diseño?',
 'La participación observada y las razones del grupo, junto con el diagnóstico inicial revisable.',
 'El diagnóstico orienta, pero debe contrastarse con la experiencia real y la voz de los participantes.',[
 ['El resultado del test inicial, porque permite conservar una decisión estable durante toda la unidad.','Trata el diagnóstico como definitivo a pesar de evidencia posterior relevante.'],
 ['La preferencia del equipo que encabeza el ranking, porque conoce mejor las reglas del sistema.','La experiencia de quienes lideran no representa a quienes se retiran.'],
 ['El número total de puntos entregados, porque indica cuánto se ha participado en la misión.','La acumulación puede ocultar ansiedad, retiro y diferencias entre personas.']]),
 Q('m3-22','Recompensas y criterio','Una medalla se entrega por revisar una respuesta, aunque la nueva versión no mejora. Se quiere reconocer progreso. ¿Qué conviene cambiar?',
 'Exigir una mejora identificable en un criterio y una explicación de la revisión realizada.',
 'Revisar formalmente no garantiza mejorar. El criterio hace interpretable qué progreso representa la medalla.',[
 ['Exigir dos versiones adicionales aunque repitan las mismas dificultades de la respuesta inicial.','Aumenta entregas sin definir la mejora que se quiere reconocer.'],
 ['Exigir que la nueva versión sea más extensa que la respuesta presentada en el primer intento.','La extensión no equivale a una mejor calidad de respuesta.'],
 ['Exigir que otro equipo confirme que la respuesta cambió respecto del primer intento.','Constatar un cambio no demuestra que se haya producido una mejora.']]),
 Q('m3-23','Autoimagen y error','En una misión se muestran públicamente todas las respuestas incorrectas con nombres. Se quiere analizar errores sin inhibir la participación. ¿Qué alternativa sería más pertinente?',
 'Discutir ejemplos anonimizados y ofrecer feedback individual sobre la revisión de cada persona.',
 'Permite aprender de errores y orientar mejoras, reduciendo la exposición personal innecesaria.',[
 ['Conservar los nombres y mostrar únicamente los errores más frecuentes al terminar cada ronda.','Reduce cantidad, pero mantiene la exposición de personas concretas.'],
 ['Conservar los nombres y añadir un premio al error que resulte más llamativo para el grupo.','Puede convertir el error personal en foco público, sin atender la inhibición.'],
 ['Conservar los nombres y recordar al inicio que todos pueden equivocarse en las actividades.','El mensaje puede acompañar, pero no modifica la condición de exposición.']]),
 Q('m3-24','Diseño y evaluación','El objetivo es diseñar una experiencia coherente. El cierre solo pregunta nombres de autores. ¿Qué evidencia complementaria conviene incorporar?',
 'Un prototipo explicado que conecte objetivo, jugadores, reglas, apoyos y evidencia de aprendizaje.',
 'Diseñar requiere articular decisiones. Reconocer autores puede aportar base, pero no demuestra esa integración.',[
 ['Un cuestionario adicional con más definiciones de los modelos revisados durante la unidad.','Amplía reconocimiento conceptual, pero sigue sin observar decisiones de diseño.'],
 ['Una clasificación de quienes recuerdan más autores y fechas de los recursos del módulo.','Compara recuerdo, que no equivale a diseñar una experiencia coherente.'],
 ['Una encuesta sobre qué modelo resultó más atractivo después de revisar las presentaciones.','Describe preferencias, sin aportar evidencia del desempeño de diseño esperado.']]),
 Q('m3-25','Integración del diseño','El tablero es accesible y atractivo, pero sus premios incentivan velocidad mientras el objetivo exige reflexión. ¿Qué revisión debería tener prioridad?',
 'Alinear las condiciones de avance con la calidad de las decisiones y su revisión fundamentada.',
 'La accesibilidad y presentación son valiosas; la discrepancia central está en la conducta que el sistema recompensa.',[
 ['Añadir más explicaciones sobre el significado narrativo de los premios dentro del mundo.','Explica las recompensas, pero mantiene la discrepancia con la reflexión esperada.'],
 ['Reducir el número de imágenes para que haya menos elementos simultáneos en cada pantalla.','Puede mejorar lectura, pero no corrige qué conducta permite avanzar.'],
 ['Aumentar las alternativas de personalización del personaje antes de cada misión de la ruta.','Amplía elección estética sin cambiar la condición de avance desalineada.']])
 ],
 g4:[
 Q('m4-01','Integración y evidencia','Una misión genera entusiasmo y muchas entregas, pero las soluciones no usan los datos del caso. El objetivo es decidir con evidencia. ¿Qué cambio conviene probar primero?',
 'Condicionar el avance a relacionar datos con la decisión y revisar esa relación con feedback.',
 'Actúa sobre el aprendizaje que falta, conectando regla, evidencia y revisión en vez de aumentar solo la actividad.',[
 ['Ampliar la historia para sostener el entusiasmo a lo largo de la unidad.','Puede mantener inmersión, pero no hace necesario utilizar datos en las soluciones.'],
 ['Aumentar los puntos por entrega para que el grupo practique una mayor cantidad de casos.','Puede aumentar práctica, pero la misma regla permite seguir entregando sin evidencias.'],
 ['Mostrar una clasificación semanal para que los equipos comparen su nivel de participación.','Compara actividad; no informa sobre la fundamentación de decisiones.']]),
 Q('m4-02','Conflicto entre metas','El equipo líder responde rápido y otro analiza con cuidado, pero obtiene menos puntos. El curso pretende valorar fundamentación. ¿Qué modificación es más coherente?',
 'Recalibrar la puntuación con criterios de justificación y permitir revisar las respuestas entregadas.',
 'La regla debe reforzar la calidad de fundamentación y la mejora, que son los desempeños buscados.',[
 ['Dar más puntos por rapidez en casos complejos para reconocer su dificultad.','Conserva la rapidez como criterio dominante en los casos que requieren analizar.'],
 ['Aumentar el tiempo de respuesta y conservar intacta la clasificación por velocidad de entrega.','Puede aliviar presión, pero mantiene la misma prioridad de puntuación.'],
 ['Mantener el ranking y ofrecer una insignia opcional al equipo que explique con más detalle.','Añade reconocimiento, pero deja la condición principal de éxito desalineada.']]),
 Q('m4-03','Acceso y objetivo','Parte del curso usa teléfono con datos limitados. La misión exige contrastar argumentos. ¿Qué adaptación preserva mejor el aprendizaje y la participación?',
 'Ofrecer casos ligeros o impresos y una misma tarea de contraste con criterios comunes.',
 'Cambia la vía de acceso conservando la operación cognitiva y la expectativa de calidad.',[
 ['Extender el plazo y mantener los videos como única vía de acceso al caso.','Da más tiempo, pero puede mantener la barrera de conectividad y datos.'],
 ['Asignar a ese grupo un cuestionario breve de definiciones en lugar del contraste de argumentos.','Facilita acceso reduciendo el aprendizaje que debía demostrarse.'],
 ['Pedir que una persona conectada represente a todo el equipo en las decisiones de la plataforma.','Puede facilitar envío, pero no asegura participación en el contraste.']]),
 Q('m4-04','Error y reintento','Tras un fallo, el sistema muestra la respuesta correcta y abre de inmediato la siguiente pregunta. El grupo repite el error en otro caso. ¿Qué ajuste ayudaría más?',
 'Explicar el criterio de decisión y pedir aplicarlo a un nuevo caso antes de continuar.',
 'La transferencia del criterio requiere procesar la devolución y utilizarla; ver la clave no garantiza comprenderla.',[
 ['Repetir la misma pregunta hasta que todo el grupo elija la clave correcta.','Puede consolidar recuerdo de la clave sin verificar aplicación del criterio.'],
 ['Aumentar la duración de la animación de error para que se recuerde mejor el resultado del intento.','Refuerza la señal de error, pero no ofrece información conceptual para corregirlo.'],
 ['Restar menos puntos por equivocarse para que el grupo acepte completar más intentos de la misión.','Puede favorecer persistencia, sin explicar por qué la decisión debe cambiar.']]),
 Q('m4-05','Competencia y convivencia','La disputa por posiciones hace que algunos equipos oculten recursos necesarios para otros. La meta requiere construir una solución común. ¿Qué cambio probarías?',
 'Establecer un logro compartido que dependa de integrar aportes y justificar acuerdos entre equipos.',
 'La estructura de éxito pasa a requerir cooperación relevante para el producto común, en lugar de retener información.',[
 ['Premiar al primer equipo que termine antes de compartir sus recursos.','Puede reforzar la ventaja de retener información durante más tiempo.'],
 ['Mantener la competencia y pedir a un portavoz que recuerde la importancia de colaborar entre grupos.','El recordatorio no modifica las condiciones que incentivan ocultar recursos.'],
 ['Ocultar temporalmente el ranking y mantener los mismos puntos por terminar antes que los otros equipos.','Reduce visibilidad de posiciones, pero conserva el incentivo competitivo de fondo.']]),
 Q('m4-06','Motivaciones diferentes','Una persona disfruta explorar y otra ayudar a sus pares. Ambas deben demostrar el mismo aprendizaje. ¿Qué diseño integra mejor esas preferencias?',
 'Ofrecer roles y rutas distintos que conduzcan a una explicación evaluada con criterios comunes.',
 'Permite participar de maneras diferentes sin convertir las preferencias en aprendizajes o criterios desiguales.',[
 ['Asignar distinta dificultad según el perfil inicial del test de jugadores.','El perfil no justifica por sí solo cambiar la exigencia de aprendizaje.'],
 ['Dar a todas las personas la misma misión competitiva para que la recompensa sea idéntica al finalizar.','La igualdad de recompensa no atiende las formas diferentes de implicarse.'],
 ['Permitir que cada participante elija qué criterios de aprendizaje quedarán fuera de su ruta de trabajo.','Confunde elección de participación con reducción de los criterios comunes.']]),
 Q('m4-07','Escalamiento','El prototipo funciona con seis personas, pero al aplicarlo con cuarenta se acumulan consultas sobre reglas y turnos. ¿Qué revisión conviene priorizar?',
 'Simplificar la gestión de turnos, probar instrucciones y distribuir apoyos antes de escalar de nuevo.',
 'La evidencia señala problemas de funcionamiento al aumentar el grupo; conviene ajustar esas condiciones y volver a probar.',[
 ['Aumentar los premios para compensar las esperas por consultas sobre reglas.','Compensa la espera sin resolver la causa operativa.'],
 ['Añadir más reglas para cubrir cada una de las dudas posibles que surgieron al ampliar el grupo.','Puede aumentar la carga que ya dificulta comprender y gestionar el sistema.'],
 ['Reducir el número de preguntas del contenido y mantener intacta la organización de turnos del prototipo.','Reduce práctica, pero no necesariamente las dudas sobre reglas y gestión.']]),
 Q('m4-08','IA y coherencia curricular','Un banco generado por IA incluye conceptos que no aparecen en los módulos anteriores. La batalla debe integrar lo trabajado. ¿Qué decisión corresponde?',
 'Revisar la correspondencia curricular y reformular los casos usando los conceptos ya abordados.',
 'Una integración debe ofrecer oportunidad de aplicar lo aprendido. Agregar conceptos nuevos exige enseñanza previa, no introducirlos como requisito oculto.',[
 ['Mantener los conceptos nuevos y puntuar más las preguntas difíciles.','La puntuación no sustituye una oportunidad previa de aprender esos conceptos.'],
 ['Mantener el banco y permitir consultar una definición breve después de entregar cada respuesta del reto.','Puede aportar feedback, pero la evaluación inicial sigue exigiendo contenido no trabajado.'],
 ['Mantener el banco y advertir que la batalla final incluye terminología más avanzada que los módulos anteriores.','La advertencia no resuelve la falta de preparación para ese contenido.']]),
 Q('m4-09','Calidad de distractores','En una pregunta, tres opciones proponen decisiones razonables. Una es mejor por una restricción concreta del caso. ¿Qué debe asegurar la revisión docente?',
 'Que la restricción permita fundamentar una respuesta preferible y explicar los límites de las otras.',
 'La plausibilidad debe acompañarse de información suficiente para una decisión defendible, sin crear ambigüedad arbitraria.',[
 ['Que todas las opciones parezcan igualmente correctas incluso después de considerar la restricción del caso.','Eso eliminaría una base clara para justificar una única respuesta preferible.'],
 ['Que la correcta tenga más detalles técnicos para distinguirla de las decisiones menos adecuadas del caso.','La forma daría una pista ajena al razonamiento que se quiere evaluar.'],
 ['Que los distractores incluyan errores muy evidentes para asegurar que se identifique la clave esperada.','Permite descartar sin analizar la restricción relevante del caso.']]),
 Q('m4-10','Cambio de soporte','Una misión digital deja de estar disponible. Su valor estaba en negociar recursos y defender decisiones. ¿Qué adaptación mantiene mejor su lógica?',
 'Trasladar recursos y reglas a tarjetas, conservando negociación, criterios y revisión de las decisiones.',
 'Se preservan las acciones y evidencias que daban sentido a la misión, aunque cambie la representación.',[
 ['Mostrar capturas y pedir recordar los nombres de sus recursos y personajes.','Conserva referencias visuales, pero cambia el aprendizaje y la interacción.'],
 ['Sustituir la negociación por una explicación del docente sobre la solución que habrían elegido los equipos.','Comunica una respuesta, pero elimina la toma de decisiones del grupo.'],
 ['Aplicar un cuestionario individual de los conceptos y entregar las mismas recompensas de la misión original.','Mantiene premios, pero no la lógica de negociación y defensa compartida.']]),
 Q('m4-11','Revisión con evidencia','Una encuesta indica alta satisfacción, pero las producciones muestran uso superficial de conceptos. ¿Qué conclusión está mejor fundamentada?',
 'La experiencia resulta valorada, pero necesita ajustes para profundizar el aprendizaje que muestran las producciones.',
 'Satisfacción y desempeño aportan evidencias diferentes. Una valoración positiva no resuelve la dificultad observada en el trabajo.',[
 ['El diseño logró su propósito porque el grupo valoró positivamente la experiencia de participar en las misiones.','Equipara valoración de la experiencia con el aprendizaje que aún presenta dificultades.'],
 ['El diseño debe descartarse porque cualquier dificultad en las producciones demuestra que la gamificación no funciona.','Generaliza más allá de la evidencia y no considera la posibilidad de ajustes.'],
 ['El diseño necesita más recompensas porque el aprendizaje depende de mantener el entusiasmo inicial del grupo.','Atribuye la dificultad al incentivo sin analizar la demanda de las tareas.']]),
 Q('m4-12','Seguridad para aprender','Un estudiante deja de intentar después de varias derrotas públicas. Se quiere sostener un desafío exigente. ¿Qué modificación responde mejor al caso?',
 'Dar feedback privado, apoyos graduados y oportunidades de demostrar mejora con el mismo objetivo.',
 'Se puede mantener la exigencia conceptual reduciendo exposición innecesaria y haciendo viable el reintento.',[
 ['Mantener la exposición y reducir los retos hasta que gane una ronda.','Puede reducir el desafío sin atender la condición pública vinculada al retiro.'],
 ['Mantener la exposición y entregar una recompensa mayor por participar después de cada una de las derrotas.','Aumenta el incentivo, pero puede continuar la experiencia de exposición.'],
 ['Mantener las reglas y asignar al estudiante un rol sin preguntas durante el resto de la experiencia del curso.','Puede apartarlo de la oportunidad de demostrar el aprendizaje central.']]),
 Q('m4-13','Recompensas y evaluación','Una ventaja permite comprar la aprobación de un reto con puntos obtenidos por asistencia. El reto evalúa una capacidad central. ¿Qué ajuste conviene realizar?',
 'Canjear los puntos por apoyos o revisión adicional y mantener la demostración de esa capacidad.',
 'La ventaja puede facilitar aprender, sin confundir asistencia o acumulación de puntos con demostrar el aprendizaje.',[
 ['Aumentar el precio para reservar la ventaja a quienes mantienen su asistencia.','Mantiene la sustitución de evidencia de capacidad por puntos de asistencia.'],
 ['Limitar la compra a una ocasión por unidad para que su efecto en el curso sea menos frecuente y visible.','Reduce frecuencia, pero no corrige la equivalencia inadecuada entre puntos y aprendizaje.'],
 ['Reservar la compra para el reto más difícil para reconocer el esfuerzo acumulado durante la unidad del curso.','Podría eliminar una evidencia especialmente importante de integración y desempeño.']]),
 Q('m4-14','Roles y participación','Un equipo tiene buenos resultados, pero una persona toma todas las decisiones. Se busca argumentación de sus integrantes. ¿Qué regla permitiría observarla mejor?',
 'Rotar roles y pedir que cada integrante explique una razón que el equipo haya contrastado.',
 'La regla distribuye la responsabilidad de explicar y permite observar participación en la construcción de razones.',[
 ['Mantener el portavoz y repartir tareas de decoración a los demás integrantes.','Distribuye tareas, pero mantiene concentrada la argumentación central.'],
 ['Repartir el mismo puntaje entre integrantes para reconocer que el producto del equipo fue exitoso al finalizar.','La puntuación compartida no demuestra participación de cada integrante.'],
 ['Registrar cuántas veces interviene el portavoz para determinar el nivel de participación total del equipo.','La actividad de una persona no representa necesariamente la del conjunto.']]),
 Q('m4-15','Flow y tiempo','La misión exige reflexión, pero una cuenta regresiva corta induce respuestas al azar. ¿Qué ajuste conserva mejor la demanda del reto?',
 'Ampliar el tiempo de análisis y usar hitos de progreso en lugar de premiar respuestas apresuradas.',
 'La presión temporal está interfiriendo con el razonamiento. El progreso puede organizarse sin reemplazar reflexión por velocidad.',[
 ['Acortar el caso y conservar la competencia por responder antes que otros.','Puede mejorar lectura, pero mantiene la prioridad por rapidez que afecta la reflexión.'],
 ['Aumentar los puntos de las respuestas rápidas para que el grupo mantenga atención durante toda la cuenta regresiva.','Refuerza la conducta apresurada que el caso identifica como problema.'],
 ['Conservar la cuenta regresiva y añadir una animación más intensa que avise cuando queden pocos segundos de la ronda.','Hace más visible la presión temporal sin atender la necesidad de analizar.']]),
 Q('m4-16','Información para mejorar','El tablero solo muestra «fallaste» y la vida perdida. ¿Qué añadido ofrece información útil sin decidir por el jugador el próximo caso?',
 'Explicar el criterio usado y por qué la alternativa elegida no responde a la condición del caso.',
 'La explicación permite comprender la decisión y transferir el criterio; evita limitar la devolución al resultado del juego.',[
 ['Mostrar quién acertó primero para comparar las posiciones de la ronda.','Aporta comparación social, sin explicar la decisión conceptual.'],
 ['Repetir el mensaje de fallo con una animación distinta para cada uno de los errores posibles del desafío.','Distingue señales visuales, pero no el fundamento de las respuestas.'],
 ['Restituir automáticamente la vida perdida al abrir de nuevo la misma pantalla de la pregunta del combate.','Cambia la consecuencia de juego sin ofrecer información para aprender.']]),
 Q('m4-17','Reconocimiento de mejora','Un equipo resuelve después de usar una pista y revisar su argumento. ¿Qué devolución comunica mejor el logro sin exagerarlo?',
 'Reconocer qué criterio mejoró y cómo la pista ayudó a revisar la solución presentada.',
 'Describe la mejora demostrada y el apoyo utilizado, haciendo interpretable el avance sin equipararlo a dominio general.',[
 ['Declarar dominio experto del módulo por haber resuelto este desafío.','Extrapola una respuesta final a un dominio más amplio que la evidencia.'],
 ['Destacar únicamente que necesitó una pista para mantener diferencia con quienes acertaron sin ayuda en la primera ronda.','Centra la devolución en la comparación y oculta la mejora que sí se observó.'],
 ['Entregar los puntos previstos sin comentar la revisión para que todos los resultados se presenten de la misma manera.','Mantiene un registro común, pero pierde información sobre el aprendizaje realizado.']]),
 Q('m4-18','Coherencia narrativa','El villano plantea un dilema docente, pero para vencer basta encontrar un botón oculto. ¿Qué cambio alinea mejor la batalla con el dilema?',
 'Hacer que el ataque dependa de elegir y justificar una decisión pertinente para las condiciones del caso.',
 'La acción de juego se vincula al razonamiento que el dilema propone, manteniendo una consecuencia visible en combate.',[
 ['Ocultar más botones y dar pistas del villano para aumentar el misterio.','Intensifica búsqueda, pero no vuelve necesario resolver el dilema docente.'],
 ['Añadir una escena más larga antes de la búsqueda para explicar por qué el villano protege el botón del escenario.','Mejora la conexión narrativa del objeto, sin cambiar la demanda cognitiva de vencer.'],
 ['Aumentar el daño del ataque cuando el botón se encuentra en menos tiempo que en el intento anterior del combate.','Reconoce velocidad de búsqueda, no pertinencia de la decisión frente al caso.']]),
 Q('m4-19','Evaluación del sistema','Tras una unidad, quienes más puntos tienen no siempre argumentan mejor. ¿Qué revisión permitiría interpretar esa diferencia?',
 'Contrastar las reglas de puntuación con los desempeños que evalúan los criterios de argumentación.',
 'Los puntos pueden estar reconociendo otras conductas. La comparación permite determinar qué representan antes de interpretarlos como aprendizaje.',[
 ['Ampliar la escala de puntos para diferenciar mejor las posiciones finales.','Refina una escala sin saber todavía qué desempeño mide.'],
 ['Convertir los puntos en una nota para que el grupo otorgue más importancia al sistema de recompensas del curso.','Puede aumentar consecuencias de una puntuación cuya correspondencia no está revisada.'],
 ['Eliminar los criterios de argumentación y utilizar solo los puntos porque registran todas las acciones del tablero.','Reemplaza la evidencia del aprendizaje por una medida de actividad no equivalente.']]),
 Q('m4-20','Transferencia','Un participante responde bien definiciones, pero elige herramientas sin considerar acceso ni objetivos. ¿Qué tarea daría mejor información sobre esa dificultad?',
 'Comparar dos diseños con restricciones de acceso y fundamentar cuál conservaría el aprendizaje esperado.',
 'Exige aplicar los conceptos a una decisión con condiciones concretas, que es donde aparece la dificultad.',[
 ['Reconocer más definiciones de herramientas y modelos de los tres módulos.','Puede reforzar reconocimiento, pero no observa la aplicación que está fallando.'],
 ['Elegir la plataforma con más funciones después de revisar sus presentaciones y los ejemplos de sus páginas iniciales.','Mantiene la elección por funciones sin exigir considerar objetivos y acceso.'],
 ['Diseñar la apariencia de un tablero y explicar qué personajes harían más atractiva la actividad para el grupo.','Observa decisiones visuales, sin focalizar el problema de elegir herramientas con criterio.']]),
 Q('m4-21','Dificultad y ambigüedad','Dos revisores expertos defienden respuestas distintas porque el caso omite el objetivo del docente. ¿Qué cambio mejoraría el ítem?',
 'Precisar el objetivo y las restricciones que permitan fundamentar una alternativa como más pertinente.',
 'La dificultad debe provenir de comparar decisiones con información suficiente, no de adivinar condiciones ausentes.',[
 ['Conservar el enunciado y elegir como clave la alternativa que haya sido seleccionada por más revisores del banco.','El acuerdo por mayoría no elimina la información que falta para decidir.'],
 ['Conservar la ambigüedad y aumentar el valor del ítem para reconocer que exige un razonamiento más avanzado del curso.','La falta de información no equivale a una mayor demanda cognitiva válida.'],
 ['Conservar el caso y agregar términos más técnicos a la alternativa que el autor había previsto como correcta en el banco.','Introduce una pista formal, sin resolver la ausencia del objetivo.']]),
 Q('m4-22','Autonomía y apoyos','Una ruta permite pedir pistas, pero castiga públicamente cada consulta. El grupo evita usarlas aunque se bloquee. ¿Qué conviene revisar?',
 'El costo social de solicitar apoyo y las condiciones para usarlo sin perder el desafío central.',
 'La barrera descrita es la exposición al pedir ayuda. El apoyo debe resultar utilizable, manteniendo responsabilidad sobre la decisión.',[
 ['La extensión de las pistas para que ofrezcan más información a quienes acepten recibir la penalización pública del tablero.','Mejora contenido de ayuda sin cambiar el costo social que impide consultarla.'],
 ['La frecuencia de recordatorios que invitan a pedir ayuda mientras se conserva el mismo castigo por hacerlo en la misión.','El mensaje contradice una consecuencia del sistema que sigue desalentando consultar.'],
 ['La cantidad de puntos disponibles para compensar después el costo de aparecer en la lista de quienes utilizaron pistas.','Compensa puntos, pero mantiene la exposición que el grupo evita.']]),
 Q('m4-23','Cierre de experiencia','Al terminar el RPG, el grupo recibe un código final. Se busca que transfiera lo aprendido a su aula. ¿Qué cierre complementario sería más pertinente?',
 'Elegir una decisión de diseño propia, fundamentarla y señalar cómo evaluaría su primera aplicación.',
 'El código registra avance. Fundamentar y anticipar evaluación conecta ese recorrido con una propuesta para el contexto docente.',[
 ['Volver a responder todas las preguntas en el mismo orden para recordar las claves antes de registrar el código final del curso.','Refuerza recuerdo del banco, pero no exige una decisión de aplicación propia.'],
 ['Comparar la cantidad de rondas que necesitó cada persona para derrotar a los cuatro guardianes de la experiencia final.','Describe desempeño de juego y velocidad, sin demostrar transferencia al aula.'],
 ['Elegir el personaje favorito y diseñar una insignia de cierre con los colores que se utilizaron durante todo el recorrido.','Puede dar cierre expresivo, pero no focaliza fundamentación ni evaluación de una propuesta.']]),
 Q('m4-24','Mejora iterativa','La primera aplicación muestra buen acceso y claridad, pero poca discusión entre pares. El objetivo requiere contrastar soluciones. ¿Qué ajuste conviene probar y observar?',
 'Introducir objeciones entre equipos y registrar cómo cambian las razones después del intercambio.',
 'Actúa sobre la interacción que falta y produce evidencia de su contribución a la revisión de soluciones.',[
 ['Añadir nuevas imágenes a las preguntas y preguntar si aumenta la valoración estética del entorno durante la próxima aplicación.','Mejora presentación, que no aparece como la dificultad central del caso.'],
 ['Aumentar el número de tareas individuales y comparar el total de respuestas recibidas en la nueva aplicación de la unidad.','Puede aumentar actividad sin incorporar contraste entre pares.'],
 ['Mantener la misión y añadir puntos por ingresar al tablero antes del comienzo de cada sesión programada con el grupo.','Reconoce acceso, que ya funciona bien, sin promover discusión de soluciones.']]),
 Q('m4-25','Consagración','Un diseño final combina historia, puntos, IA y un tablero atractivo. ¿Qué argumento permitiría defender mejor su coherencia pedagógica?',
 'Explicar cómo las acciones, los apoyos y la evaluación permiten alcanzar el objetivo con ese grupo concreto.',
 'La coherencia se sostiene en las relaciones entre propósito, participantes, acciones, apoyos y evidencias; la suma de elementos no basta.',[
 ['Mostrar que incorpora más elementos de juego que los ejemplos revisados durante los módulos anteriores de la formación docente.','La cantidad de elementos no demuestra que estén relacionados con el propósito.'],
 ['Señalar que la narrativa y los personajes fueron creados especialmente para que la experiencia resulte original para sus participantes.','La originalidad puede aportar identidad, pero no fundamenta por sí sola el aprendizaje.'],
 ['Demostrar que la plataforma permite automatizar puntos y registrar cada ingreso realizado por los participantes durante toda la experiencia.','La automatización y los accesos facilitan gestión, sin demostrar alineación de las decisiones.']])
 ]};
 root.OrbeQuestions=Object.freeze(B);
 if(typeof module==='object'&&module.exports)module.exports=B;
})(typeof window==='object'?window:globalThis);
