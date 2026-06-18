# Guía de Calidad de Fuentes — Research Council Harness

Esta guía explica cómo aplicar la rúbrica `rubrics/source-quality.md` (referenciada
también desde `SKILL.md` y desde los esquemas `research-finding.schema.json` y
`evidence-matrix.schema.json`). Toda evidencia que entra al sistema debe pasar por
esta clasificación antes de poder sustentar una conclusión.

## 1. Escala de calidad

El sistema usa cuatro niveles, definidos en el `enum` `quality` /
`source_quality` de los esquemas:

### Alta
Fuente oficial, primaria, estándar reconocido o paper académico sólido (revisado
por pares, metodología explícita, datos reproducibles). Ejemplos: documentación
oficial de un vendor sobre su propio producto, un estándar publicado (ISO, NIST,
RFC), un paper peer-reviewed con metodología clara, un dato de una autoridad
regulatoria sobre su propia normativa.

### Media
Consultora reconocida con metodología razonable, medio especializado con
trayectoria, análisis bien documentado pero sin el rigor de una fuente primaria u
oficial. Ejemplos: un reporte de Gartner/Forrester (con sus propios sesgos
metodológicos conocidos), un artículo técnico detallado de una publicación
especializada, un benchmark independiente con metodología descrita pero no
auditada externamente.

### Baja
Blog sin evidencia que lo respalde, fuente comercial no verificada (marketing de
un proveedor sobre sí mismo sin datos), opinión sin datos de soporte. Ejemplos:
una entrada de blog personal sin citas, un comunicado de prensa que afirma
superioridad sin benchmark, un foro o red social sin verificación.

### No usar
Fuente dudosa, no verificable, o que no se puede ubicar de forma específica
(no hay URL, título o referencia localizable). Cualquier claim que dependa
exclusivamente de una fuente `no_usar` **no debe** marcarse
`used_in_conclusion: true` en la matriz de evidencia.

## 2. Tipos de fuente

El `enum` `source_type` distingue la **naturaleza** de la fuente, independiente de
su calidad (una fuente oficial puede ser de baja calidad si está desactualizada;
una fuente comercial puede aportar un dato verificable de alta calidad si viene
con evidencia técnica concreta):

- **`primaria`** — el dato viene directamente del origen (un estudio original, un
  registro oficial, un documento fuente sin intermediarios).
- **`secundaria`** — interpreta o resume fuentes primarias (un artículo que cita
  estudios, un análisis de mercado).
- **`academica`** — papers, journals, conferencias revisadas por pares.
- **`comercial`** — material producido por un proveedor sobre su propio
  producto/servicio (sitio web, datasheet, comunicado de prensa). Requiere
  escrutinio especial de sesgo (ver §4).
- **`oficial`** — gobiernos, reguladores, organismos normativos, documentación
  oficial de un estándar.
- **`opinion`** — análisis o comentario sin datos duros de respaldo (columnas,
  posts de opinión).
- **`estandar`** — normas técnicas publicadas (ISO, IEEE, RFC, NIST, etc.).
- **`local_file`** — documento aportado por el usuario (contrato, política
  interna, hoja de cálculo). Debe evaluarse con el mismo rigor que cualquier otra
  fuente: ¿es vigente?, ¿es oficial dentro de la organización?, ¿tiene
  limitaciones conocidas?

## 3. Cómo citar y ubicar evidencia

Cada fila de evidencia (en `research-finding.schema.json` o
`evidence-matrix.schema.json`) debe incluir, como mínimo:

- **`claim`** — la afirmación exacta que la fuente sustenta (no una paráfrasis
  vaga; debe poder verificarse contra la fuente).
- **`source`** — identificación específica: título + URL para fuentes web, o
  nombre de archivo + sección/página para archivos locales. Una fuente como
  "internet" o "varios artículos" no es aceptable.
- **`source_type`** y **`source_quality`** — siempre explícitos, nunca omitidos.
- **`date`** — fecha de la fuente (año o fecha completa). La actualidad
  (`recency`) es un factor de calidad independiente del tipo de fuente: un
  estándar oficial de hace 10 años puede seguir siendo de alta calidad si sigue
  vigente, pero un dato de mercado de hace 3 años probablemente no.
- **`quote_or_location`** — cita textual o ubicación exacta del dato dentro de la
  fuente (página, sección, párrafo), para que un humano pueda verificar
  rápidamente sin tener que releer el documento completo.
- **`limitations`** — qué limita la fiabilidad de esta evidencia específica (es un
  solo caso, es autoreportado por el proveedor, la muestra es pequeña, etc.).

Una afirmación sin estos elementos no debe pasar a la matriz de evidencia
consolidada de la Fase 4.

## 4. Cómo detectar sesgo comercial

Señales de alerta al evaluar una fuente `comercial`:

- El proveedor evalúa su **propio** producto sin comparación independiente.
- Se usan superlativos sin datos ("el más rápido", "líder del mercado") sin
  benchmark verificable que lo respalde.
- Los casos de éxito citados no incluyen metodología, tamaño de muestra ni
  condiciones de la prueba.
- El documento es simultáneamente la única fuente del claim y la parte interesada
  en que el claim sea cierto (p. ej. el propio vendor afirmando que su solución no
  tiene vulnerabilidades conocidas).
- Fecha de publicación coincide con una campaña de lanzamiento o ronda de
  financiamiento (mayor incentivo a la promoción que a la precisión).

Tratamiento recomendado: una fuente comercial no se descarta automáticamente
(puede tener datos técnicos correctos), pero **su calidad baja** a menos que el
claim esté corroborado por una fuente independiente (un benchmark de terceros, un
estándar, una fuente académica, o documentación técnica verificable). El
`contradiction-finder` y el `adversarial-reviewer` deben señalar explícitamente
cuando la única fuente de un claim relevante es comercial y no está corroborada.

## 5. Cómo registrar limitaciones

Las limitaciones se registran en dos niveles:

1. **Por fila de evidencia** (`limitations` en `research-finding.schema.json` /
   `evidence-matrix.schema.json`): qué limita esa pieza específica de evidencia
   (muestra pequeña, autoreportado, desactualizado, fuente única).
2. **Por reporte** (sección 18 "Límites" del Markdown, campo `limitations` del
   JSON): qué no se investigó, qué no se pudo verificar con la profundidad
   solicitada, qué fuentes deseables no estaban disponibles (p. ej. "no se pudo
   acceder a benchmarks internos de la organización del usuario").

Una limitación bien registrada no es una disculpa genérica ("la información puede
cambiar"), sino algo específico y accionable: qué dato exacto falta, y qué tipo de
fuente lo resolvería si apareciera. Esto alimenta directamente la sección 16 del
reporte ("qué evidencia cambiaría la conclusión").

## 6. Relación con `support_status`

Además de la calidad de la fuente, `evidence-matrix.schema.json` registra un
veredicto `support_status` por claim, asignado por `source-quality-auditor`:

- `supported` — el claim tiene al menos una fuente de calidad alta o media,
  verificable.
- `partially_supported` — hay evidencia, pero incompleta o de calidad mixta.
- `unsupported` — no hay evidencia suficiente para sostener el claim tal como está
  formulado.
- `contradicted` — otra fuente de calidad comparable o mayor lo contradice.
- `needs_human_validation` — el claim depende de información que el sistema no
  puede verificar de forma independiente (p. ej. una cifra interna de la
  organización del usuario) y requiere que un humano la confirme.

Solo los claims `supported` (o `partially_supported` con la limitación
explícita) deberían usarse con `used_in_conclusion: true`.
