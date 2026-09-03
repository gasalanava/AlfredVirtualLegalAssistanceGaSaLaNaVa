# AUDITORÍA PREVIA A PUBLICACIÓN — ALFRED v17 · beta 0.12

**Fecha:** 3 de septiembre de 2026  
**Objeto:** verificar la integridad técnica de la v17, la consistencia de la nueva capa interna de actores y realizar una revalidación jurídica focalizada de los puntos de mayor riesgo antes de publicarla en GitHub Pages.

## 1. Dictamen de auditoría

**Resultado: APTO PARA PUBLICACIÓN COMO BETA, con una prueba breve de navegación en el navegador real después del despliegue.**

No se detectaron referencias rotas, nodos inaccesibles, recursos locales faltantes, códigos de actor inválidos ni ciclos cerrados sin salida. La lógica jurídica y de navegación visible de la v17 auditada permanece igual a la v17 original; los cambios de auditoría se limitaron a depurar la metadata interna de actores y a corregir la documentación de la versión.

La única prueba que no pudo ejecutarse en este entorno fue el recorrido automatizado en Chromium. El servidor local respondió correctamente, pero Chromium quedó bloqueado por restricciones DBus/zygote del contenedor. Por eso, después de publicar, debe hacerse un smoke test breve en Chrome/Edge real.

## 2. Hallazgo conceptual corregido

La auditoría sí encontró una inconsistencia en la capa nueva de actores: en 18 nodos, `ALFRED` aparecía dentro de la dimensión `define`. Eso era conceptualmente riesgoso porque `define` se describe como la competencia o conocimiento para definir el punto de fondo, mientras que el propio modelo declara que ALFRED es un motor y no sustituye al fiscal, juez, perito o autoridad competente.

Se corrigió sin tocar la ruta jurídica:

- `ALFRED` fue retirado de `define` en esos 18 nodos.
- se añadió `systemInference=true` para indicar cuándo el sistema deriva una clasificación o reencauzamiento a partir de hechos y reglas;
- no se modificó ninguna opción visible, destino, resultado, checklist ni enlace de navegación.

Con esto queda separada una idea central del producto: **ALFRED puede inferir; ALFRED no adquiere competencia jurídica, técnica o administrativa.**

## 3. Integridad técnica

Se verificó:

- `app.js`: sintaxis válida.
- `data.js`: sintaxis válida.
- `sw.js`: sintaxis válida.
- `data.js` y `ruta_destinos_ux.json`: sincronizados.
- 79 nodos.
- 103 resultados.
- 42 destinos/tratamientos.
- 10 rutas de destino.
- 41 grupos de requisitos/checklists.
- 46 casos de prueba documentados.
- 79/79 nodos con `actorMeta`.
- 48 nodos identificados como dependientes de una decisión o competencia externa desde la perspectiva de Policía Judicial.
- 18 nodos con `systemInference=true`.
- 0 códigos de actor inválidos.
- 0 referencias rotas en opciones navegables.
- 0 referencias rotas en resultados temporales o definitivos.
- 0 referencias inválidas a checklists.
- 79/79 nodos alcanzables desde `P01`.
- 0 ciclos cerrados sin salida.
- 0 IDs HTML duplicados.
- 0 archivos locales faltantes en `index.html`, `desktop.html` y `mobile.html`.
- todos los recursos declarados en el service worker existen.
- todos los íconos declarados en el manifest existen.
- `MATRIZ_ACTORES_v17.csv`: 79 filas, 79 IDs únicos, sin nodos faltantes ni extras.
- servidor HTTP local: respuesta 200 para `index.html`.

La referencia `emptyResultStart` que no existe estáticamente en el HTML es intencional: se crea dinámicamente desde `app.js` cuando corresponde mostrar el último resultado.

## 4. Paridad de la navegación

Al eliminar únicamente la metadata de actores y la nota de versión, la estructura funcional de la v17 auditada coincide con la v17 original. Por tanto, la corrección de auditoría **no introduce una nueva bifurcación jurídica ni altera la experiencia visible actual**.

También se había comprobado que la v17 original era funcionalmente la v16 más la capa interna de actores: `app.js`, `styles.css` y `manifest.webmanifest` no habían cambiado; el HTML solo mostraba el cambio de beta 0.11 a beta 0.12 y el service worker cambiaba el nombre del caché.

## 5. Revisión jurídica focalizada

Esta auditoría no pretende recertificar línea por línea los 79 nodos ni todos los regímenes especiales. Sí se revalidaron las reglas que actualmente tienen mayor impacto en las rutas modificadas recientemente o mayor riesgo de desactualización:

### Comiso
Se contrastó la estructura con el artículo 82 de la Ley 906 de 2004: producto directo o indirecto, utilización/destinación en delito doloso, mezcla o encubrimiento y valor equivalente. La ruta continúa separando causal, habilitación/materialización, control y decisión definitiva.

Fuente oficial: SUIN Juriscol, Ley 906 de 2004.  
https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Leyes%2F1670249

### Destrucción — artículo 87
Se confirmó la secuencia crítica: reglas de cadena de custodia, informe de perito oficial que establece ilegitimidad, destrucción material por Policía Judicial y presencia del fiscal y del agente del Ministerio Público. Para laboratorios rústicos y cultivos ilícitos se confirmó la toma previa de muestras, registro fotográfico o en video y sometimiento de esas evidencias a cadena de custodia.

Fuentes oficiales: Secretaría del Senado y SUIN Juriscol.  
https://www.secretariasenado.gov.co/senado/basedoc/ley_0906_2004_pr001.html  
https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Leyes%2F1670249

### Macroelementos y explosivos
Se verificaron los artículos 256 y 266 de la Ley 906 de 2004. El artículo 256 mantiene la regla según la cual el fiscal, y en su defecto Policía Judicial, ordena la destrucción de materiales explosivos en el lugar del hallazgo cuando las condiciones de seguridad lo permitan.

Fuente oficial: Secretaría del Senado.  
https://www.secretariasenado.gov.co/senado/basedoc/ley_0906_2004_pr006.html

### Remanentes
Se confirmó el artículo 262: los remanentes del material analizado permanecen en el almacén del laboratorio destinado para ese fin, identificados para permitir recuperación posterior o destrucción cuando lo disponga la autoridad judicial competente.

Fuente oficial: Secretaría del Senado.  
https://www.secretariasenado.gov.co/senado/basedoc/ley_0906_2004_pr006.html

### Armas — artículo 563
Se confirmó la secuencia vigente: cadena de custodia, examen pericial, que el arma ya no sea requerida en la actuación y orden previa del fiscal de conocimiento para la destrucción.

Fuente oficial: Secretaría del Senado.  
https://www.secretariasenado.gov.co/senado/basedoc/ley_0906_2004_pr013.html

### Armas, elementos y dispositivos menos letales
Se verificó el artículo 34 de la Ley 2197 de 2022: elementos incautados y posteriormente decomisados por incumplimiento de requisitos legales de porte; destrucción por INDUMIL previo concepto del DCCAE o quien haga sus veces.

Fuente oficial: Secretaría del Senado.  
https://www.secretariasenado.gov.co/senado/basedoc/ley_2197_2022.html

### Régimen aduanero — DIAN
Se confirmó que la referencia vigente es la Ley 2586 de 2026 y que el Decreto Ley 920 de 2023 no se está usando como régimen actual. La ruta mantiene separada la actuación administrativa aduanera de la recolección penal de EMP y EF cuando corresponda.

Fuente oficial: Normograma DIAN.  
https://normograma.dian.gov.co/dian/compilacion/docs/ley_2586_2026.htm

### FEAB — destrucción y chatarrización
Se revalidaron los artículos 11 y 12 de la Ley 1615 de 2013 en su texto vigente: destrucción y chatarrización como sistemas de administración y potestad del Fondo respecto de bienes que han ingresado a su administración, con las garantías previas allí previstas.

Fuente oficial: SUIN Juriscol.  
https://www.suin-juriscol.gov.co/viewDocument.asp?id=1685088

## 6. Observaciones no bloqueantes

### Casos de prueba del pie de página
El botón visible como **“Validación técnica”** muestra una matriz de 46 casos documentados. Los estados `PASS` y `PASS ESTRUCTURAL` están almacenados en los datos; no son el resultado de un framework automático que se ejecute cada vez que el usuario abre la aplicación. No afecta las rutas, pero convendría en una versión posterior denominarlo “Casos de prueba” o aclarar que se trata de una matriz de validación documentada.

### Capa multi-actor aún incompleta por diseño
Los 79 nodos ya tienen metadata normalizada por actor. Los objetos de resultado y destino contienen información operativa propia sobre quién decide, ejecuta, recibe o custodia, pero todavía no utilizan exactamente el mismo esquema `actorMeta`. Esto no afecta la beta actual; deberá normalizarse antes de habilitar un selector visible de rol.

### Prueba real de navegador
El análisis estático y el servidor local pasaron. El navegador headless no pudo completar la prueba por una limitación del entorno de ejecución, no por un error detectado en ALFRED. Después de publicar se recomienda comprobar manualmente, como mínimo:

1. inicio → `P01`;
2. ruta EMP y EF → conocimiento especializado → `P02A`;
3. una ruta de comiso;
4. una ruta de destrucción art. 87;
5. una ruta de régimen especial;
6. apertura de un checklist;
7. reinicio de la consulta;
8. vista móvil y recarga forzada (`Ctrl + F5`).

## 7. Conclusión

La v17 auditada queda técnicamente consistente para despliegue como **beta 0.12**. La auditoría no encontró un defecto bloqueante. Además, corrigió una inconsistencia conceptual de la nueva capa de actores sin modificar la lógica visible de decisión.

El paquete debe seguir presentándose como herramienta orientadora en beta y no como sustituto de la valoración o decisión del operador competente. La revisión jurídica focalizada confirma los anclajes de mayor riesgo señalados, pero la expansión futura de regímenes especiales debe continuar con verificación fuente por fuente.
