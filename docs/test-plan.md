# Plan de Pruebas — Research Council Harness

Este plan verifica que el harness está correctamente instalado, que su lógica de
decisión funciona como se diseñó, y que sus outputs cumplen el contrato esperado.
No requiere herramientas externas: todas las verificaciones se hacen dentro de una
sesión de Claude Code o con comandos de shell estándar sobre los archivos del
repositorio.

## 1. Verificaciones estructurales (estáticas, sin ejecutar investigación)

### 1.1 La Skill existe y puede invocarse
- Verificar que `.claude/skills/research-council/SKILL.md` existe y tiene
  frontmatter YAML válido con `name: research-council` y una `description` no
  vacía.
- Dentro de una sesión de Claude Code, comprobar que `/research-council` aparece
  como comando disponible (autocompletado o listado de skills).
- **Resultado esperado:** la Skill se reconoce sin errores de parseo de
  frontmatter.

### 1.2 Los subagents existen
- Listar `.claude/agents/*.md` y verificar que cada uno tiene frontmatter válido
  con `name`, `description`, `tools` y `model`.
- Verificar que **ningún** agente declara la herramienta `Agent` en `tools` (los
  subagents no pueden anidar).
- Verificar que `research-orchestrator.md` específicamente no incluye `Agent` ni
  `Write` en sus `tools` (es planificador puro).
- Verificar que el nombre de archivo de cada agente coincide con el nombre
  referenciado en el "Mapeo tipo de investigación → agentes" de `SKILL.md`.
- **Resultado esperado:** todos los nombres referenciados en `SKILL.md` tienen un
  archivo `.md` correspondiente en `.claude/agents/`; cero agentes con `Agent` en
  `tools`.

### 1.3 El workflow principal está definido
- Verificar que `workflows/research-council.md` (spec canónica) y
  `.claude/workflows/research-council.md` (workflow guardado) existen.
- Verificar que las 12 fases (0–11) descritas en ambos archivos son consistentes
  entre sí y con `SKILL.md`.
- Verificar que cualquier archivo `.js` presente en el repo lleva una marca
  explícita de "pseudocódigo / no ejecutable" — no debe haber un `.js` que se
  presente como ejecutable por el CLI.
- **Resultado esperado:** spec, workflow guardado y SKILL.md cuentan la misma
  historia de 12 fases sin contradicciones de nombres de agentes o de orden.

### 1.4 Los esquemas JSON son válidos
- Ejecutar `python -m json.tool` (o equivalente) sobre cada archivo en
  `.claude/skills/research-council/schemas/*.json`.
- **Resultado esperado:** los 4 esquemas (`research-input`, `research-finding`,
  `evidence-matrix`, `final-report`) parsean sin error.

Comando de referencia:
```bash
for f in .claude/skills/research-council/schemas/*.json; do
  python3 -m json.tool "$f" > /dev/null && echo "OK: $f" || echo "FAIL: $f"
done
```

## 2. Verificaciones de comportamiento (requieren ejecutar la Skill)

### 2.1 Una investigación simple NO dispara workflow innecesario
- **Entrada de prueba:** `/research-council ¿Qué significa la sigla MCP en el
  contexto de Claude Code?`
- **Resultado esperado:** la Skill detecta una pregunta acotada, de una sola
  dimensión, sin necesidad de comparar alternativas ni verificación adversarial
  extensa. Debe responder en **modo simple**, sin lanzar subagents, con
  `patterns_used: ["simple_analysis"]`. No debe proponer Dynamic Workflow.

### 2.2 Una investigación compleja SÍ recomienda Dynamic Workflow (cuando aplica)
- **Entrada de prueba:** `/research-council` con profundidad `profunda`,
  comparando 4+ alternativas tecnológicas con necesidad de fuentes actuales,
  académicas y oficiales, y pidiendo análisis de riesgo.
- **Resultado esperado:** la Skill identifica múltiples dimensiones y alternativas
  comparables, y al menos **propone** Dynamic Workflow (si está disponible en el
  entorno) o, si no está disponible, declara explícitamente la degradación al modo
  subagents avisando al usuario. `patterns_used` debe incluir como mínimo
  `fan_out_and_synthesize`, `generate_and_filter`, `tournament` y
  `adversarial_verification`.

### 2.3 Se genera matriz de evidencia
- En cualquier ejecución en modo subagents o dynamic workflow, verificar que el
  reporte final incluye la sección 7 ("Matriz de evidencia") con filas que tienen
  `claim`, `source`, `source_type`, `quality` y `used_in_conclusion`.
- **Resultado esperado:** la matriz no está vacía y cada fila es trazable a un
  hallazgo de algún investigador.

### 2.4 Se detectan fuentes débiles
- **Caso de prueba:** incluir deliberadamente en el contexto una fuente de tipo
  `comercial` sin corroboración (p. ej. una afirmación de marketing de un
  proveedor sin benchmark independiente).
- **Resultado esperado:** `source-quality-auditor` clasifica esa fuente como
  `baja` (o `no_usar` si no es verificable), y el claim correspondiente no se
  marca `used_in_conclusion: true` salvo que exista corroboración independiente.

### 2.5 Se ejecuta revisión adversarial
- Verificar que la sección 12 ("Análisis adversarial") del reporte no está vacía
  en ninguna ejecución que termine en una recomendación (modo subagents o dynamic
  workflow).
- **Resultado esperado:** `adversarial_review` en el JSON contiene al menos una
  observación concreta (evidencia faltante, riesgo no evaluado, o similar) — un
  array vacío en una investigación no trivial es señal de que la fase se omitió
  incorrectamente.

### 2.6 Se generan Markdown y JSON, y el JSON es válido
- Tras una ejecución completa, verificar que existen:
  - `outputs/reports/YYYY-MM-DD_research-council_<slug>.md`
  - `outputs/json/YYYY-MM-DD_research-council_<slug>.json`
- Ejecutar `python3 -m json.tool` sobre el JSON generado.
- Verificar que el JSON contiene los campos obligatorios de
  `final-report.schema.json`: `title`, `date`, `research_type`, `main_question`,
  `recommendation`, `confidence`.
- **Resultado esperado:** ambos archivos existen, el JSON parsea sin error y
  cumple el esquema (campos obligatorios presentes, valores de `enum` válidos).

### 2.7 El reporte separa hechos, supuestos e inferencias
- Revisar manualmente la sección 8 ("Hallazgos principales") del Markdown
  generado.
- **Resultado esperado:** el texto distingue explícitamente (con lenguaje o
  estructura) qué es un hecho verificado con fuente, qué es un supuesto del
  usuario, y qué es una inferencia del sistema. No debe presentarse una inferencia
  con la misma certeza que un hecho con fuente oficial.

### 2.8 La conclusión no usa claims no soportados
- Revisar la sección 14 ("Recomendación final") contra la matriz de evidencia
  (sección 7).
- **Resultado esperado:** cada afirmación fuerte de la recomendación debe poder
  rastrearse a al menos una fila de la matriz con `support_status` en
  `supported` o `partially_supported` (con su limitación declarada). Ninguna
  afirmación de la recomendación debe depender únicamente de una fuente
  `no_usar` o de un claim `unsupported`/`contradicted` sin advertencia explícita.

## 3. Caso de prueba manual concreto

**Pregunta de prueba:**
> "Agente seguro para validar compras M28 con SAP, Excel, PDF y web."

**Pasos:**
1. Invocar `/research-council` (forma corta) con esa pregunta, o la forma
   estructurada aportando como contexto: sistema SAP módulo M28 (gestión de
   compras), fuentes de datos Excel y PDF internos, necesidad de validar contra
   información web (precios de mercado, proveedores).
2. Observar la Fase 0 (Intake): si falta información crítica (p. ej. qué significa
   exactamente "validar" — duplicidad, precio, autorización, fraude — o qué
   volumen de compras), la Skill debería preguntar antes de continuar. Si el
   usuario no aclara, el sistema puede proceder con supuestos explícitos
   documentados como tales.
3. Observar la Fase 1 (Clasificación).

**Resultados esperados:**
- **Clasificación (`research_type`):** `enterprise_ai` (es fundamentalmente una
  pregunta sobre diseño de un agente/sistema de IA seguro) o `procurement` (si el
  foco se interpreta como el proceso de compras en sí). Ambas clasificaciones son
  defendibles; lo que **no** es aceptable es `generic` o `strategic`, dado que hay
  dimensiones técnicas y de riesgo claras y un dominio de compras explícito.
- **Patrón recomendado:** `fan_out_and_synthesize` (siempre) +
  `adversarial_verification` (siempre, por ser una decisión de
  arquitectura/seguridad) y muy probablemente `generate_and_filter` +
  `tournament` si se identifican varias arquitecturas posibles (p. ej. agente con
  MCP conectando SAP/Excel/PDF vs. workflow RPA vs. revisión humana asistida).
  Dado que combina múltiples fuentes (SAP, Excel, PDF, web) y seguridad, es
  razonable que la Skill sugiera `dynamic_workflow` si la profundidad solicitada
  es `profunda`; en profundidad `estandar` basta el modo subagents.
- **Agentes esperados en el fan-out** (según el mapeo de `SKILL.md`):
  - Si se clasifica `enterprise_ai`: `web-researcher`, `academic-researcher`,
    `technical-researcher`, `risk-and-controls-researcher`,
    `source-quality-auditor`, `adversarial-reviewer`, `synthesis-writer`.
  - Si se clasifica `procurement`: `procurement-researcher`,
    `supply-chain-researcher`, `enterprise-practices-researcher`,
    `web-researcher`, `risk-and-controls-researcher`,
    `source-quality-auditor`, `synthesis-writer`.
  - En ambos casos, `risk-and-controls-researcher` debe estar presente — es
    central dado que la pregunta es explícitamente sobre seguridad ("agente
    seguro").
- **Contenido esperado del reporte:**
  - La sección de riesgos y controles debe cubrir, como mínimo: control de acceso
    a SAP (permisos mínimos necesarios), validación de datos provenientes de
    fuentes no estructuradas (PDF, Excel) antes de usarlas para decisiones,
    riesgo de alucinación en la extracción de datos de PDF, necesidad de
    aprobación humana para acciones de compra, y separación entre "agente que
    sugiere/valida" y "agente que ejecuta la compra".
  - La recomendación final debe declarar explícitamente que cualquier acción de
    compra real requiere aprobación humana — coherente con el principio de
    "decisión final del usuario" del propio harness.
  - El nivel de confianza debería ser `media` salvo que existan fuentes oficiales
    sólidas (documentación de SAP, estándares de control interno) que sustenten
    una arquitectura específica con `alta` confianza.
- **Validación negativa:** si el reporte resultante recomienda una arquitectura
  sin mencionar ningún control de seguridad, o sin marcar la necesidad de
  aprobación humana, la prueba debe considerarse **fallida** — sería una señal de
  que el principio de seguridad no se está aplicando pese a que la pregunta lo
  pide explícitamente ("agente seguro").

## 4. Checklist resumido de aceptación

- [ ] `/research-council` se reconoce como Skill invocable.
- [ ] Los subagents referenciados en `SKILL.md` existen como archivos en
      `.claude/agents/` y ninguno tiene `Agent` en `tools`.
- [ ] `workflows/research-council.md` y `.claude/workflows/research-council.md`
      son consistentes entre sí y con `SKILL.md`.
- [ ] Los 4 esquemas JSON parsean correctamente.
- [ ] Pregunta simple → modo simple, sin fan-out innecesario.
- [ ] Pregunta compleja → recomienda/usa Dynamic Workflow o degrada
      explícitamente avisando al usuario.
- [ ] Se genera matriz de evidencia no vacía y trazable.
- [ ] Fuentes comerciales no corroboradas se marcan `baja`/`no_usar` y no
      sustentan la conclusión.
- [ ] La fase de verificación adversarial produce al menos una observación.
- [ ] Se generan Markdown y JSON; el JSON parsea y cumple los campos
      obligatorios de `final-report.schema.json`.
- [ ] El reporte separa hechos, supuestos e inferencias.
- [ ] La recomendación final no depende de claims no soportados.
- [ ] Caso "agente seguro para compras M28" clasifica como `enterprise_ai` o
      `procurement`, incluye `risk-and-controls-researcher`, y exige aprobación
      humana antes de cualquier compra real.
