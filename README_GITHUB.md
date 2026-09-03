# ALFRED

Asistente Virtual para la gestión de bienes en materia penal.

## Publicación en GitHub Pages

Copie **el contenido de esta carpeta** en la raíz del repositorio de GitHub Pages, reemplazando los archivos anteriores. No cree una subcarpeta `ALFRED_webapp_v15` dentro del repositorio.

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

La versión beta 0.10 reconstruye el módulo de **destrucción**. La destrucción deja de tratarse como un simple “destino” y pasa a una arquitectura propia que separa:

1. fundamento o régimen de destrucción;
2. custodia mientras el bien o elemento todavía existe;
3. preservación probatoria previa;
4. autoridad que decide o autoriza;
5. ejecutor material de la destrucción;
6. requisitos específicos del régimen; y
7. cierre documental y custodia de muestras o registros que subsisten.

Se incorporaron rutas específicas para artículo 87 CPP, laboratorios/cultivos, remanentes, FEAB, DIAN, armas del artículo 563, menos letales, explosivos, ambiental y minería.

Véase `CAMBIOS_2026-09-03_v15.txt` y `FUENTES_DESTRUCCION_v15.md`.
