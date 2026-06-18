# Arquitectura — Research Council Harness

## 1. Qué es y qué no es

El Research Council Harness es un conjunto de artefactos de **Claude Code (CLI
v2.1.181)**: una Skill, subagents, esquemas JSON, rúbricas y una especificación de
workflow. No es un servicio independiente, no expone una API, no tiene backend
propio y no llama a APIs externas. Toda la "inteligencia" del sistema es el LLM de
Claude operando con sus herramientas nativas: `WebSearch`, `WebFetch`, `Read`,
`Write`, y la herramienta `Agent` para lanzar subagents.

Esto importa para la arquitectura porque significa que **no hay estado persistente
propio fuera del sistema de archivos** (`outputs/`) y **no hay orquestador externo**:
el orquestador es el propio agente principal de Claude Code ejecutando las
instrucciones de la Skill, o un Dynamic Workflow (script JS) que ese mismo agente
escribió y guardó.

## 2. Componentes

```
.claude/skills/research-council/SKILL.md     Punto de entrada (/research-council)
.claude/skills/research-council/schemas/     Contratos JSON entre fases
.claude/skills/research-council/rubrics/     Criterios de clasificación de calidad/tipo
.claude/agents/*.md                          15 subagents especializados (hoja, sin Agent tool)
workflows/research-council.md                Spec canónica del workflow (fuente de verdad)
.claude/workflows/research-council.md        Dynamic Workflow guardado (ejecutable por el CLI)
.claude/hooks/                                Hooks documentados, desactivados por defecto
outputs/{reports,json,evidence}/              Artefactos generados (versionados por fecha+slug)
CLAUDE.md                                     Reglas globales del repo para el agente principal
docs/                                         Esta documentación
```

### 2.1 Skill (`SKILL.md`)
Es el **punto de entrada y el orquestador por defecto**. Define:
- El formato de invocación (corta y estructurada).
- El árbol de decisión de modo (simple / subagents / dynamic workflow / delegar a
  `/deep-research`).
- Las 12 fases (0–11) del workflow, con qué subagent corresponde a cada una.
- El mapeo tipo de investigación → agentes mínimos requeridos.
- Las reglas de seguridad y los principios de evidencia irrenunciables.

La Skill no es un subagent: corre en el contexto del **agente principal**, que es
el único que puede invocar la herramienta `Agent` para lanzar subagents y el único
que puede coordinar un fan-out paralelo.

### 2.2 Subagents (`.claude/agents/`)
15 subagents especializados, cada uno con su propio frontmatter (`name`,
`description`, `tools` mínimas, `model`). Se agrupan en tres familias:

- **Investigadores (8):** `question-framer`, `web-researcher`,
  `academic-researcher`, `technical-researcher`,
  `enterprise-practices-researcher`, `procurement-researcher`,
  `supply-chain-researcher`, `risk-and-controls-researcher`. Producen hallazgos
  conformes a `research-finding.schema.json`. Tienen acceso a `WebSearch`,
  `WebFetch`, `Read` según corresponda; pueden apoyarse en `/deep-research` para
  búsqueda web profunda.
- **Verificación/síntesis (6):** `source-quality-auditor`, `contradiction-finder`,
  `adversarial-reviewer`, `alternative-generator`, `tournament-judge`,
  `synthesis-writer`. Consumen los hallazgos y producen matrices, críticas,
  rankings o el borrador final. Solo `synthesis-writer` tiene `Write`.
- **Planificador (1):** `research-orchestrator`. Es **planificador puro**: recibe
  la pregunta normalizada y devuelve un plan JSON (subpreguntas, fuentes
  requeridas, criterios de éxito, patrón recomendado). **Nunca usa la herramienta
  `Agent`** — esta es la restricción de diseño más importante del sistema (ver
  §4.1).

Restricción estructural de Claude Code que el diseño respeta: **los subagents no
pueden lanzar otros subagents**. Ningún `.md` de `.claude/agents/` invoca la
herramienta `Agent`.

### 2.3 Esquemas (`schemas/*.schema.json`)
Cuatro contratos JSON Schema (draft-07) que disciplinan el paso de datos entre
fases y evitan que cada subagent invente su propio formato:

| Esquema | Quién lo produce | Quién lo consume |
|---|---|---|
| `research-input.schema.json` | Skill (Fase 0, intake) | research-orchestrator, investigadores |
| `research-finding.schema.json` | cada investigador (Fase 3) | Skill / source-quality-auditor (Fase 4) |
| `evidence-matrix.schema.json` | Skill + source-quality-auditor (Fase 4) | contradiction-finder, adversarial-reviewer, synthesis-writer |
| `final-report.schema.json` | synthesis-writer (Fase 10) | Output (Fase 11), usuario |

### 2.4 Rúbricas (`rubrics/`)
Documentos de criterios (no código) que los subagents siguen al clasificar tipo de
investigación o calidad de fuente: `source-quality.md`, `enterprise-ai.md`,
`procurement-research.md`, `technology-comparison.md`, `generic-research.md`. Son
texto que el LLM lee e interpreta, no un motor de reglas ejecutable.

### 2.5 Workflows
- `workflows/research-council.md`: **spec canónica**, fuente de verdad legible por
  humanos. Cualquier archivo `.js` que exista en el repo es pseudocódigo de
  referencia, **no ejecutable por el CLI**.
- `.claude/workflows/research-council.md`: el **Dynamic Workflow real**, guardado e
  invocable por Claude Code. Implementa la misma spec, pero en el formato que el
  CLI sabe ejecutar (orquestación por el agente principal, hasta 16 agentes
  concurrentes en el fan-out).

### 2.6 Outputs (`outputs/`)
Tres subcarpetas con naming por fecha real + slug del tema, para no pisar
ejecuciones anteriores:
```
outputs/reports/YYYY-MM-DD_research-council_<slug>.md
outputs/json/YYYY-MM-DD_research-council_<slug>.json
outputs/evidence/YYYY-MM-DD_research-council_<slug>_evidence.md   (si aplica)
```

### 2.7 Hooks (`.claude/hooks/`)
Documentados en `.claude/hooks/README.md` y `.claude/hooks/settings.json.example`,
pero **desactivados por defecto**. No forman parte del flujo de orquestación; son
un mecanismo opcional para quien quiera, por ejemplo, validar el JSON de salida
automáticamente. El harness no depende de ellos para funcionar.

## 3. Flujo de datos entre fases

```
Usuario
  │  /research-council <pregunta>  (o forma estructurada)
  ▼
┌─────────────────────────── SKILL (agente principal) ───────────────────────────┐
│ Fase 0  Intake            → research-input.schema.json                          │
│ Fase 1  Clasificación      → research_type + rúbrica asociada                   │
│ Fase 2  Plan               → research-orchestrator (planificador, sin Agent)    │
│                               devuelve: subpreguntas, fuentes, criterios, patrón │
│ Fase 3  Fan-out (paralelo) → investigadores (mapeo por tipo)                    │
│                               cada uno devuelve research-finding.schema.json    │
│ Fase 4  Matriz de evidencia → Skill + source-quality-auditor                    │
│                               consolida en evidence-matrix.schema.json          │
│ Fase 5  Generate & filter  → alternative-generator (si hay alternativas)        │
│ Fase 6  Tournament         → defensores + tournament-judge (si comparables)     │
│ Fase 7  Contradiction find → contradiction-finder                               │
│ Fase 8  Adversarial verif. → adversarial-reviewer critica el borrador           │
│ Fase 9  Loop until done    → Skill decide iterar (máx 3) o terminar             │
│         (vuelve a Fase 3/7/8 si faltan claims, contradicciones sin resolver,    │
│          fuentes oficiales faltantes, riesgos altos sin analizar)               │
│ Fase 10 Synthesis          → synthesis-writer → borrador conforme               │
│                               final-report.schema.json                         │
│ Fase 11 Output              → Write: reports/*.md, json/*.json, evidence/*.md   │
└───────────────────────────────────────────────────────────────────────────────┘
  │
  ▼
outputs/reports/..., outputs/json/..., outputs/evidence/...
  │
  ▼
Revisión humana obligatoria → decisión del usuario
```

Los investigadores en Fase 3 pueden, dentro de su propio turno, delegar la parte
de "buscar y verificar en la web actual" al motor nativo `/deep-research`; el
resultado regresa como evidencia dentro de su `research-finding.schema.json`. Esto
no rompe la regla de no anidamiento: `/deep-research` es una capacidad del agente
principal o del subagent dentro de su propio turno, no un subagent adicional que
lance otros subagents.

## 4. Decisiones de diseño

### 4.1 Por qué la orquestación vive en la Skill (o en el Dynamic Workflow) y no en un subagent

Claude Code impone una restricción dura: **un subagent no puede invocar la
herramienta `Agent`**. Solo el agente principal (la sesión que el usuario ve)
puede lanzar subagents, incluyendo lanzarlos en paralelo para un fan-out.

Si la orquestación se hubiera puesto dentro de un subagent (por ejemplo, un
"research-orchestrator" que coordinara a los demás), el sistema se habría quedado
sin capacidad real de fan-out: ese subagent no podría lanzar a `web-researcher`,
`academic-researcher`, etc. Por eso:

- `research-orchestrator` se diseñó explícitamente como **planificador puro**: solo
  piensa el plan (subpreguntas, fuentes, criterios, patrón) y lo devuelve como JSON.
  Nunca usa `Agent`.
- La orquestación real — decidir modo, lanzar el fan-out, consolidar la matriz de
  evidencia, decidir si iterar, escribir los outputs — vive en la **Skill**, que se
  ejecuta en el contexto del agente principal, o en el **Dynamic Workflow**
  guardado, que también lo ejecuta el agente principal (como script).

Esta decisión hace el sistema robusto a la disponibilidad de Dynamic Workflows: si
no están disponibles en el entorno, la Skill ejecuta exactamente las mismas fases
en modo subagents, simplemente sin el paralelismo masivo (hasta 16 agentes
concurrentes) que permite un Dynamic Workflow.

### 4.2 Tres modos de ejecución, no uno

El árbol de decisión de la Skill obliga a elegir el modo **más barato** que cumpla
los criterios de éxito, en vez de siempre disparar el flujo completo:

1. **Simple (sin fan-out).** Preguntas acotadas y de una sola dimensión. Responde
   con evidencia directa, sin lanzar subagents. Evita gastar tokens y tiempo en
   preguntas que no lo requieren.
2. **Subagents (modo por defecto para investigación real).** Ejecuta las fases 0–11
   lanzando subagents desde la Skill. Es el modo que **siempre funciona**, exista o
   no Dynamic Workflows en el entorno — es el "mínimo común denominador" robusto.
3. **Dynamic Workflow.** Para investigación amplia, con muchas subpreguntas
   paralelas, comparación de alternativas con torneo y loop. Requiere que Dynamic
   Workflows esté disponible; si no lo está, degrada elegantemente al modo
   subagents y avisa al usuario. No se usa para preguntas simples: el costo en
   tokens/tiempo solo se justifica con la complejidad.

Esta separación evita dos errores opuestos: sobre-ingeniería (lanzar 7 subagents
para una pregunta trivial) y sub-ingeniería (intentar comparar 5 alternativas con
verificación adversarial en modo simple, sin evidencia suficiente).

### 4.3 Relación con `/deep-research`

`/deep-research` es una capacidad **nativa** de Claude Code: un motor de búsqueda
web profunda con fact-checking. El Research Council Harness no la reimplementa ni
la reemplaza; la trata como una fuente de evidencia que puede invocarse dentro de
la Fase 3 (fan-out) cuando el cuello de botella es específicamente "necesito
buscar y verificar muchas fuentes web actuales".

La distinción de responsabilidades es:
- `/deep-research` = motor de búsqueda/fact-check.
- `/research-council` = marco de decisión completo: clasificación del tipo de
  investigación, generación y filtrado de alternativas, torneo entre alternativas,
  matriz de evidencia con calidad por fuente, detección de contradicciones,
  verificación adversarial, riesgos y controles, y recomendación final ponderada.

En la práctica, un investigador del fan-out (p. ej. `web-researcher`) puede usar
`/deep-research` para resolver su porción de búsqueda web y luego envolver esos
hallazgos en el formato `research-finding.schema.json` que el resto del sistema
espera. Ver también `docs/workflow-patterns.md` (sección dedicada) y
`docs/operating-manual.md`.

## 5. Por qué no hay APIs externas

Todo el procesamiento —búsqueda, lectura, síntesis, redacción— corre con el LLM de
Claude y las herramientas nativas del entorno de Claude Code. No hay llamadas a
servicios de terceros, bases de datos externas ni claves de API que gestionar. Esto
simplifica la superficie de seguridad (ver `docs/safety-and-controls.md`) pero
también acota lo que el sistema puede hacer: no puede consultar sistemas
empresariales en vivo (SAP, ERPs, etc.) salvo que el usuario provea esos datos como
archivos locales o contexto de texto.
