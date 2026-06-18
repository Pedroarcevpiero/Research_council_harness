# Manual de Operación — Research Council Harness

## 1. Instalación / copiar el harness a otro proyecto

El harness es un conjunto de archivos de Claude Code; no requiere instalación de
dependencias ni build. Para llevarlo a otro repositorio:

1. Copia estas carpetas tal cual, preservando la estructura de rutas:
   ```
   .claude/skills/research-council/        (SKILL.md, schemas/, rubrics/)
   .claude/agents/                          (los 15 subagents .md)
   .claude/workflows/research-council.md
   workflows/research-council.md
   .claude/hooks/                           (opcional, están desactivados)
   ```
2. Crea (si no existen) las carpetas de salida:
   ```
   outputs/reports/  outputs/json/  outputs/evidence/
   ```
3. Copia o adapta `CLAUDE.md` con las reglas globales (principios de evidencia,
   seguridad, cuándo usar `/research-council`).
4. Abre una sesión de Claude Code en el nuevo repo. La Skill se detecta
   automáticamente por su ubicación en `.claude/skills/`; no requiere registro
   adicional.
5. Verifica que el CLI reconoce la Skill ejecutando `/research-council` con una
   pregunta corta de prueba (ver `docs/test-plan.md`).

No hay variables de entorno, claves de API ni servicios externos que configurar:
todo corre con el LLM de Claude y herramientas nativas (`WebSearch`, `WebFetch`,
`Read`, `Write`, `Agent`).

## 2. Cómo invocar `/research-council`

### Forma corta
```
/research-council <pregunta>
```
Ejemplo:
```
/research-council ¿Qué arquitectura de agente es más segura para validar compras
en SAP: un agente con MCP, un workflow RPA o revisión humana asistida por IA?
```

### Forma estructurada (recomendada para decisiones importantes)
```
/research-council
Pregunta: <pregunta>
Contexto: <contexto>
Objetivo: <qué decisión quiero tomar>
Fuentes preferidas: <web, papers, documentación oficial, archivos locales>
Restricciones: <idioma, fecha, país, industria, presupuesto, tecnología>
Profundidad: <rapida | estandar | profunda>
```

La forma estructurada reduce el riesgo de que la Skill tenga que detenerse a
preguntar por datos críticos faltantes (Fase 0 — Intake). Si faltan datos
esenciales para clasificar o acotar la investigación, **la Skill preguntará antes
de ejecutar**; no asume valores por defecto en decisiones de alto impacto.

## 3. Cómo pedir investigación rápida / estándar / profunda

El campo `Profundidad` (o la palabra explícita en la pregunta) controla cuánto
esfuerzo se invierte:

- **`rapida`**: prioriza el modo simple o un fan-out mínimo (1–2 investigadores).
  Útil para validar una afirmación puntual o una pregunta de una sola dimensión.
  Ejemplo: *"profundidad rápida: ¿qué es MCP en términos generales?"*
- **`estandar`** (por defecto): dispara el modo subagents completo —fases 0 a 11—
  con el mapeo de agentes según el tipo de investigación detectado. Es el nivel
  adecuado para la mayoría de decisiones de compra, comparación de tecnología o
  análisis de riesgo.
- **`profunda`**: además de las fases 0–11, justifica activar **Dynamic Workflow**
  si está disponible, para fan-out masivo (hasta 16 agentes concurrentes),
  múltiples rondas de loop-until-done, y/o delegar partes de búsqueda web a
  `/deep-research`. La Skill debe avisar al usuario antes de ejecutar una
  investigación profunda, porque implica mayor costo en tokens y tiempo.

Si no se especifica profundidad, la Skill infiere el nivel según la complejidad
real de la pregunta (número de dimensiones, necesidad de comparar alternativas,
necesidad de fuentes actuales/oficiales/académicas).

## 4. Cuándo usar Dynamic Workflow

Usa (o pide a la Skill que proponga) el Dynamic Workflow guardado en
`.claude/workflows/research-council.md` cuando:

- Hay **muchas subpreguntas independientes** que conviene investigar en paralelo
  masivo (más de las ~4-7 que maneja cómodamente un fan-out simple desde la Skill).
- Se requiere **comparar varias alternativas con torneo** (generate-and-filter +
  tournament) además de verificación adversarial y posible iteración.
- La investigación es de **profundidad alta** y el usuario ya aceptó el costo en
  tokens/tiempo.

No uses Dynamic Workflow para preguntas simples o de una sola dimensión: la regla
general del sistema es "usa el modo más barato que cumpla los criterios de éxito".
Si Dynamic Workflows no está disponible en el entorno actual, simplemente pide la
investigación normalmente — la Skill detecta la ausencia y degrada al modo
subagents sin que el usuario tenga que hacer nada distinto.

## 5. `/research-council` vs `/deep-research`: cuándo usar cada uno y cómo se combinan

Esta es una de las decisiones de uso más frecuentes y conviene tenerla clara.

| | `/deep-research` | `/research-council` |
|---|---|---|
| Qué es | Motor nativo de Claude Code para búsqueda web profunda + fact-checking | Marco de decisión completo construido sobre subagents, esquemas y rúbricas |
| Qué produce | Hallazgos verificados de fuentes web actuales | Reporte con clasificación, matriz de evidencia, alternativas, torneo, contradicciones, verificación adversarial, riesgos y recomendación ponderada |
| Cuándo usarlo solo | La pregunta es puramente "qué dice la web actual sobre X" y no requiere comparar alternativas, evaluar riesgos de implementación ni una recomendación estructurada | Casi nunca solo — se recomienda cuando se necesita el marco completo (compra, arquitectura, estrategia, cumplimiento) |
| Costo relativo | Menor (un solo motor de búsqueda) | Mayor (fan-out, verificación adversarial, posible loop) pero ajustable con el modo simple |

**Regla operativa:** `/deep-research` = motor de búsqueda/fact-check;
`/research-council` = marco de decisión (clasificación, alternativas, torneo,
riesgos, recomendación). `/research-council` **no reemplaza** a `/deep-research`,
**lo complementa**: cuando el cuello de botella de una investigación es
específicamente "necesito muchas fuentes web actuales verificadas", la Skill
recomienda o delega esa porción a `/deep-research` y luego envuelve esos hallazgos
en su propio marco (Fase 3 del workflow: los investigadores del fan-out pueden
apoyarse en `/deep-research` para resolver su parte de búsqueda web).

Ejemplos de cuándo usar cada uno:
- *"Dame las noticias más recientes sobre regulación de IA en la UE"* →
  `/deep-research` solo es suficiente.
- *"¿Deberíamos adoptar un agente de IA para validar compras en SAP, considerando
  riesgos, alternativas y proveedores?"* → `/research-council`, que internamente
  puede delegar la parte de "qué dicen las fuentes web actuales sobre proveedores y
  regulación" a `/deep-research`.
- *"Compara LangGraph vs n8n vs Claude Code para automatización empresarial"* →
  `/research-council` en modo `technology_comparison`, con `tournament-judge`
  decidiendo el ranking; la evidencia de mercado/actualidad puede venir de
  `/deep-research`.

## 6. Cómo leer los outputs

Cada ejecución completa (fases 0–11) produce hasta tres archivos, todos con el
mismo nombre base `YYYY-MM-DD_research-council_<slug>`:

- `outputs/reports/<nombre>.md` — el reporte para humanos, con las 19 secciones
  descritas en `docs/workflow-patterns.md` (resumen ejecutivo, matriz de evidencia,
  contradicciones, alternativas, análisis adversarial, riesgos, recomendación,
  nivel de confianza, qué evidencia cambiaría la conclusión, límites, etc.). **Es
  el documento que se debe revisar antes de decidir.**
- `outputs/json/<nombre>.json` — la misma información en formato estructurado,
  conforme a `final-report.schema.json`. Útil para integrarlo en otra herramienta,
  llevar trazabilidad o auditar programáticamente el contenido (p. ej. validar que
  el JSON parsea y que `confidence` y `recommendation` están presentes).
- `outputs/evidence/<nombre>_evidence.md` — la matriz de evidencia completa cuando
  el caso lo justifica (investigaciones con muchas fuentes o alta necesidad de
  trazabilidad).

Recomendación de lectura: primero el **resumen ejecutivo** y la **recomendación
final** (secciones 1 y 14), después el **nivel de confianza** y **qué evidencia
cambiaría la conclusión** (secciones 15–16) para entender qué tan sólida es la
conclusión, y solo después el detalle de evidencia y alternativas si se necesita
auditar el razonamiento. Los outputs nunca se sobrescriben (se versionan por
fecha+slug) y siempre requieren revisión humana antes de actuar sobre ellos.

## 7. Cómo agregar nuevos agentes

1. Crea `.claude/agents/<nombre-agente>.md` con frontmatter mínimo: `name`,
   `description` (cuándo usarlo), `tools` (la lista mínima necesaria — nunca
   incluyas `Agent`, los subagents no anidan), y `model`.
2. Define claramente si es un **investigador** (debe devolver
   `research-finding.schema.json`), un agente de **verificación/síntesis** (consume
   la matriz de evidencia y devuelve su análisis específico), o un **planificador**
   (como `research-orchestrator`: nunca usa `Agent`, solo devuelve un plan).
3. Si el nuevo agente debe participar en el fan-out, agrégalo al mapeo
   "tipo de investigación → agentes mínimos" en `SKILL.md` y en
   `workflows/research-council.md`, para el/los tipos de investigación donde
   aplique.
4. Si introduce un nuevo tipo de fuente o criterio de calidad, actualiza
   `rubrics/source-quality.md` y los `enum` correspondientes en
   `schemas/research-finding.schema.json` / `evidence-matrix.schema.json` (los
   esquemas usan `additionalProperties: false`, así que un campo nuevo requiere
   editar el esquema, no solo el agente).
5. Prueba el agente de forma aislada con una entrada de ejemplo antes de
   integrarlo al flujo completo.

## 8. Cómo agregar nuevas rúbricas

1. Crea `rubrics/<nombre>.md` siguiendo el formato de
   `rubrics/source-quality.md` (criterios explícitos, ejemplos positivos y
   negativos, escala de calidad).
2. Si la rúbrica corresponde a un nuevo **tipo de investigación**, añade el valor
   al `enum` de `research_type` en `research-input.schema.json` y
   `final-report.schema.json`, y documenta el mapeo de agentes en `SKILL.md`.
3. Referencia la rúbrica desde los agentes que deban aplicarla (investigadores que
   clasifican fuentes, `source-quality-auditor`, `adversarial-reviewer`).

## 9. Cómo adaptar el harness a otros dominios

El diseño es deliberadamente genérico en las fases (0–11) y específico solo en
**rúbricas** y **mapeo de agentes por tipo**. Para adaptarlo:

- **Compras (procurement):** ya cubierto por el tipo `procurement` —
  `procurement-researcher`, `supply-chain-researcher`,
  `enterprise-practices-researcher`. Para casos concretos (p. ej. validación de
  compras en SAP), aporta como contexto los sistemas involucrados (SAP, Excel,
  PDF, web) en el campo `Contexto` de la invocación estructurada; el harness no se
  conecta a SAP directamente, pero puede investigar patrones de control,
  arquitecturas de agentes seguros y riesgos conocidos para ese tipo de
  integración.
- **Contratos:** trátalo como `procurement` o `risk_and_controls` según el foco;
  si se repite con frecuencia, considera crear una rúbrica `contract-review.md` y
  un tipo `contract_review` dedicado, con su propio mapeo de agentes.
- **Inversiones:** usa `strategic` o `technology_comparison` según si la decisión
  es "invertir o no" (estratégico) o "elegir entre opciones de inversión"
  (comparación con torneo). Si el volumen de este tipo de consultas lo justifica,
  vale la pena crear una rúbrica y tipo dedicados (`investment-analysis.md`).
- **Procesos internos (revisión de procesos, automatización):** normalmente caen
  en `enterprise_ai` o `technology_comparison`. Aporta como contexto el proceso
  actual, las herramientas involucradas y los criterios de éxito esperados.

En todos los casos, el patrón de extensión es el mismo: (a) decide si el dominio
nuevo necesita un `research_type` propio o reutiliza uno existente; (b) si necesita
uno propio, crea la rúbrica y actualiza los `enum` de los esquemas y el mapeo en
`SKILL.md`; (c) verifica con un caso de prueba manual (ver `docs/test-plan.md`).
