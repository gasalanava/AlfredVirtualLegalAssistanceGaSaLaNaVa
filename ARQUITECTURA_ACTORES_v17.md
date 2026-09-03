# ALFRED v17 — Capa interna de actores

## Decisión de arquitectura

ALFRED continúa en beta con **Policía Judicial como usuario principal** y con estudiantes como audiencia secundaria natural. El motor queda preparado para reconocer el ciclo jurídico y operativo desde Policía Judicial, Fiscalía, juez, perito, custodio, administrador o autoridad especial, sin crear árboles jurídicos independientes.

La capa incorporada en v17 **no cambia todavía la interfaz ni las rutas visibles**. Su función es ordenar internamente cada nodo y permitir una futura personalización por rol sin rehacer el motor.

## Distinción incorporada en la auditoría

**ALFRED es el motor, no una autoridad competente.**

Por esa razón, la revisión auditada separa dos planos:

- `define`: actores humanos o institucionales que tienen competencia o conocimiento para definir el punto de fondo.
- `systemInference`: indica que ALFRED puede derivar una clasificación, advertencia o reencauzamiento a partir de los hechos suministrados y de las reglas cargadas en el motor. No atribuye competencia jurídica, técnica o administrativa al sistema.

Esta separación evita que una futura interfaz llegue a mostrar expresiones como “lo define ALFRED” cuando jurídicamente la definición corresponde al fiscal, juez, perito o autoridad sectorial.

## Dimensiones normalizadas

Cada uno de los 79 nodos contiene `actorMeta` con estas dimensiones:

- `observa`: quién puede aportar o verificar el hecho.
- `define`: quién tiene competencia o conocimiento para definir el punto de fondo.
- `decide`: quién adopta la decisión u orden jurídicamente relevante.
- `ejecuta`: quién materializa la actuación.
- `controla`: quién ejerce control de legalidad, judicial o sectorial.
- `recibe`: quién puede recibir el bien o elemento.
- `custodia`: quién puede conservarlo físicamente.
- `administra`: quién ejerce administración legal o sectorial.
- `systemInference`: si ALFRED puede derivar internamente una clasificación sin convertirse por ello en actor competente.

También se registra `pjMode`, que distingue si Policía Judicial resuelve con hechos, aporta información, verifica una decisión externa, ejecuta, coordina/remite, preserva/documenta o necesita comprender una competencia ajena para continuar.

## Principio de producto

**Una sola lógica jurídica y operativa por detrás; una experiencia sencilla por delante; el fundamento siempre disponible.**

1. Policía Judicial no debe ser obligado a adoptar conclusiones que pertenecen al fiscal, juez, perito o autoridad especial.
2. Cuando el punto dependa de otro actor, ALFRED debe convertirlo en una verificación de estado: si existe la orden, concepto, decisión o actuación correspondiente.
3. El usuario debe poder ver qué le corresponde hacer a él y, de manera desplegable, qué corresponde al actor siguiente.
4. La fuente normativa y la trazabilidad de la respuesta deben permanecer disponibles.
5. El rol del usuario será una capa de visualización y orientación; no una bifurcación que duplique todo el árbol.
6. Una inferencia de ALFRED nunca debe presentarse como una competencia legal del sistema.

## Diagnóstico auditado

- Nodos etiquetados: **79 / 79**.
- Nodos en los que la perspectiva PJ depende expresamente de una decisión o competencia externa: **48**.
- Nodos con inferencia interna del sistema separada de la competencia del actor: **18**.
- Códigos de actor inválidos: **0**.
- Referencias rotas de navegación detectadas: **0**.

## Alcance de la capa

La metadata por actor se concentra actualmente en los **nodos de decisión**. Los resultados y destinos ya contienen campos operativos propios —por ejemplo, quién decide, ejecuta, custodia o recibe—, pero una futura vista multi-rol deberá normalizar también esos objetos antes de habilitar un selector visible de rol.

## Archivos de revisión

- `MATRIZ_ACTORES_v17.csv`: revisión nodo por nodo.
- `ruta_destinos_ux.json`: espejo completo del motor con la metadata.
- `diagnostico_v17.json`: diagnóstico estructural de la capa.
- `AUDITORIA_V17.md`: auditoría previa a publicación.
