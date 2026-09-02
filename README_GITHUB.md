# ALFRED · Beta 0.9

Asistente Virtual para la gestión de bienes en materia penal.

## Qué cambia en esta revisión

Esta revisión ajusta tanto la arquitectura de información como una parte concreta de la navegación jurídica inicial, sin alterar las demás ramas que todavía no han sido revisadas en esta etapa.

- Identificar, Destino, Requisitos y Resultado quedan claramente diferenciados.
- Los accesos de inicio usan A, B, C y D para no confundirse con las etapas 1–4.
- Se elimina el falso resultado al responder que el objeto no tiene función probatoria.
- Después de descartar función probatoria, ALFRED pregunta si estamos frente a un bien.
- Si existe función probatoria, se verifica también si el objeto es simultáneamente un bien.
- Identificado un bien, se analiza su posible susceptibilidad de comiso.
- “Alfred, explícame cómo decidir” desarrolla el concepto de bien y las causales de comiso sin exigir que el usuario memorice la norma.
- Se distingue susceptibilidad de comiso, materialización de incautación/ocupación con fines de comiso, control posterior y comiso definitivo.
- Si no se identifica causal de comiso, la ruta continúa hacia manejo especial u otras finalidades patrimoniales.
- El acceso directo “Identificar” determina EMP y EF / bien / concurrencia antes de mostrar su resultado.

## GitHub Pages

Sube **todo el contenido de esta carpeta** a la raíz del repositorio. Deben verse directamente `index.html`, `app.js`, `styles.css`, `data.js`, `assets/`, etc.

En GitHub: `Settings → Pages → Deploy from a branch → main → /(root)`.

La entrada principal es `index.html`. `desktop.html` y `mobile.html` son vistas de prueba.
