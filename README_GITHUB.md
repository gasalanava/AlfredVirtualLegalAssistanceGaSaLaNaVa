# ALFRED

Asistente Virtual para la gestión de bienes en materia penal.

## Publicación en GitHub Pages

Copie **el contenido de esta carpeta** en la raíz del repositorio de GitHub Pages, reemplazando los archivos anteriores. No cree una subcarpeta `ALFRED_webapp_v17_AUDITADA` dentro del repositorio.

Archivos principales:
- `index.html`
- `app.js`
- `data.js`
- `styles.css`
- `sw.js`
- `manifest.webmanifest`
- carpeta `assets`

Si trabaja sobre una copia local del repositorio, no elimine la carpeta oculta `.git`.

Después de publicar, espere la actualización de GitHub Pages y, si el navegador conserva textos anteriores, recargue con `Ctrl + F5`.

## v17 · beta 0.12 — capa interna de actores

La v17 **no cambia la navegación visible ni añade todavía un selector de rol**. Policía Judicial continúa como usuario principal de la beta. El cambio está en el motor: cada nodo identifica quién observa, define, decide, ejecuta, controla, recibe, custodia y administra.

La revisión auditada introdujo una precisión conceptual importante: **ALFRED no figura como autoridad competente en la dimensión `define`**. Cuando el sistema deriva una clasificación a partir de hechos y reglas, se registra internamente mediante `systemInference=true`. Así se separa la inferencia del sistema de la competencia jurídica, técnica o administrativa de los actores reales.

La finalidad es preparar una futura experiencia por rol sin duplicar el árbol jurídico ni trasladar al usuario decisiones que correspondan a fiscales, jueces, peritos, custodios, administradores o autoridades especiales.

Archivos de apoyo:
- `ARQUITECTURA_ACTORES_v17.md`
- `MATRIZ_ACTORES_v17.csv`
- `diagnostico_v17.json`
- `AUDITORIA_V17.md`
- `diagnostico_auditoria_v17.json`

## Cambios heredados de v16

La beta conserva la depuración transversal introducida en v16: ALFRED pregunta por hechos observables, actuaciones, órdenes, conceptos o documentos verificables y evita pedir al usuario conclusiones que correspondan a otro actor. También mantiene la separación de preguntas compuestas y los resultados temporales accionables.

Véase `CAMBIOS_2026-09-03_v16.txt`. Para la reconstrucción específica del módulo de destrucción se conserva `FUENTES_DESTRUCCION_v15.md`.

## Auditoría previa a publicación

La carpeta `v17_AUDITADA` fue sometida a revisión estructural, de integridad, referencias, alcance de grafo, sincronización de datos, recursos PWA y una verificación jurídica focalizada de los puntos de mayor riesgo o actualización reciente. Consulte `AUDITORIA_V17.md` para el alcance y las limitaciones de esa revisión.
