# ALFRED

Asistente Virtual para la gestión de bienes en materia penal.

## Publicación en GitHub Pages

Copie **el contenido de esta carpeta** en la raíz del repositorio de GitHub Pages, reemplazando los archivos anteriores. No cree una subcarpeta `ALFRED_webapp_v16` dentro del repositorio.

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

## Ajuste principal de esta versión

La versión **beta 0.11** hace una depuración transversal de la navegación.

La regla de diseño pasa a ser:

**ALFRED pregunta por hechos observables, actuaciones, órdenes, conceptos o documentos que el usuario pueda verificar; no le pide sustituir al perito, al fiscal, al juez o a otra autoridad.**

Se corrigieron especialmente:
- definición técnico-científica del examen;
- identificación de posibles causales de comiso;
- reconocimiento de regímenes especiales;
- reparación, destrucción y títulos residuales;
- macroelementos;
- requisitos previos de destrucción del artículo 87;
- laboratorios y cultivos;
- armas del artículo 563;
- menos letales;
- coordinación DIAN–investigación penal.

Las preguntas compuestas más críticas fueron divididas para que, cuando falte un requisito, ALFRED indique exactamente cuál es y produzca un resultado temporal accionable.

Véase `CAMBIOS_2026-09-03_v16.txt`. Para la reconstrucción específica del módulo de destrucción se conserva `FUENTES_DESTRUCCION_v15.md`.
