# ALFRED · Web App v0.8

Esta carpeta está preparada para publicarse directamente en GitHub Pages.

## Qué incluye
- `index.html`: versión principal responsive. Es la que debe publicarse. Se adapta automáticamente a PC y teléfono.
- `desktop.html`: vista de prueba orientada a escritorio.
- `mobile.html`: vista de prueba móvil, útil para revisar en un PC cómo se comporta la interfaz angosta.
- `manifest.webmanifest` + `sw.js`: convierten ALFRED en una PWA instalable cuando se publica mediante HTTPS (GitHub Pages lo hace).
- `assets/`: imágenes optimizadas para web.
- `data.js`: matriz y contenido actual de la aplicación.

## Publicar en GitHub Pages
1. Cree un repositorio nuevo (por ejemplo `alfred`).
2. Suba **el contenido de esta carpeta** a la raíz del repositorio.
3. En GitHub abra `Settings > Pages`.
4. En `Build and deployment`, seleccione `Deploy from a branch`.
5. Seleccione la rama `main` y la carpeta `/(root)`.
6. Guarde. GitHub generará una URL HTTPS.

La URL principal será aproximadamente:
`https://USUARIO.github.io/alfred/`

## Teléfono móvil / instalación
Abra la URL de GitHub Pages en el teléfono. La aplicación se adapta automáticamente. Al estar publicada por HTTPS, el navegador puede ofrecer `Agregar a pantalla de inicio` / `Instalar aplicación`.

## Desarrollo local
Puede abrir `index.html` directamente. El Service Worker/PWA solo se activa cuando se sirve por HTTP/HTTPS. Para ver exactamente el comportamiento de GitHub Pages puede usar un servidor local simple.

## Nota
Esta versión modifica la presentación visual y responsive, no la matriz jurídica ni el motor de decisiones de la versión anterior.
