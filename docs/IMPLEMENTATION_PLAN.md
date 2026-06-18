# Plan de Implementación — Research Council Harness

> Estado: APROBADO por el usuario (2026-06-18). Fuente de verdad del alcance.
> El progreso vivo se rastrea en `docs/BUILD_CHECKLIST.md`.

## 0. Contexto verificado
- Claude Code v2.1.181. Todo se ejecuta con el LLM de Claude en este entorno. **Sin APIs externas.**
- **Dynamic Workflows existen** pero son JS que escribe Claude, guardados en `.claude/workflows/`, invocables con `/workflows` / `ultracode`. Existe `/deep-research` nativo.
- **Subagents NO anidan**: solo el agente principal delega. La orquestación vive en la Skill y/o en un Dynamic Workflow.

## 1. Ajustes obligatorios (aprobados)
1. Nada de `.js` ejecutable por el CLI. Canónico: `workflows/research-council.md`. Workflow real guardado: `.claude/workflows/research-council.md`. Cualquier `.js` lleva cabecera "PSEUDOCÓDIGO / NO EJECUTABLE".
2. `research-orchestrator` = **planificador puro** (devuelve plan JSON; nunca usa el tool Agent).
3. Skill `/research-council` = entrada principal; decide modo simple / subagents / dynamic workflow; funciona sin Dynamic Workflows (degradación elegante).
4. Aprovechar `/deep-research` nativo como capacidad complementaria (motor de búsqueda web profunda). Documentar cuándo usar cada uno. No reemplazarlo.
5. Hooks documentados y **desactivados**. Solo `.claude/hooks/README.md` + `settings.json.example`. No tocar `settings.json` real.
6. Validación final: schemas JSON válidos, frontmatter válido en todos los agents, consistencia nombres/rutas/Skill, **test manual** con pregunta de ejemplo.
7. Gate antes de commit/PR: mostrar árbol, archivos críticos, invocación, uso con/sin dynamic workflow, limitaciones.

## 2. Estrategia de ejecución calidad/costo
- **Opus (agente principal, contratos críticos):** CLAUDE.md, SKILL.md, 4 JSON schemas, spec del workflow + workflow guardado, agente planificador.
- **Subagents Sonnet en paralelo (contenido extenso siguiendo contratos):** 8 research agents, 6 verificación/síntesis agents, 5 rúbricas, 6 docs.
- **Haiku (plantilla/bajo riesgo):** READMEs, 4 ejemplos, specs workflows especializados.

## 3. Inventario de archivos (alcance cerrado)
### Núcleo (Opus)
- `CLAUDE.md`
- `.claude/skills/research-council/SKILL.md`
- `.claude/skills/research-council/schemas/research-input.schema.json`
- `.claude/skills/research-council/schemas/research-finding.schema.json`
- `.claude/skills/research-council/schemas/evidence-matrix.schema.json`
- `.claude/skills/research-council/schemas/final-report.schema.json`
- `workflows/research-council.md` (spec canónica)
- `.claude/workflows/research-council.md` (workflow guardado real)
- `.claude/agents/research-orchestrator.md` (planificador puro)

### Research agents (8)
- web-researcher, academic-researcher, technical-researcher, enterprise-practices-researcher, procurement-researcher, supply-chain-researcher, risk-and-controls-researcher, question-framer

### Verificación/síntesis agents (6)
- source-quality-auditor, contradiction-finder, adversarial-reviewer, alternative-generator, tournament-judge, synthesis-writer

### Rúbricas (5)
- source-quality.md, enterprise-ai.md, procurement-research.md, technology-comparison.md, generic-research.md

### Docs (6)
- architecture.md, operating-manual.md, safety-and-controls.md, workflow-patterns.md, source-quality-guide.md, test-plan.md

### Ejemplos (4)
- agent-design-research.md, procurement-ai-research.md, technology-comparison.md, supply-chain-automation.md

### Workflows especializados (3, spec/referencia)
- workflows/enterprise-ai-research.js, workflows/procurement-research.js, workflows/technology-comparison.js (marcados pseudocódigo)

### Soporte
- README.md, .claude/skills/research-council/README.md, outputs/README.md, .claude/hooks/README.md, .claude/hooks/settings.json.example
- outputs/{reports,json,evidence}/.gitkeep

## 4. Tipos de investigación y mapeo a agentes (§7 del prompt)
- enterprise_ai → web, academic, technical, risk-and-controls, source-quality-auditor, adversarial-reviewer, synthesis-writer
- procurement → procurement, supply-chain, enterprise-practices, web, risk-and-controls, source-quality-auditor, synthesis-writer
- technology_comparison → technical, enterprise-practices, alternative-generator, tournament-judge, risk-and-controls, source-quality-auditor, synthesis-writer
- strategic → question-framer, web, academic, contradiction-finder, adversarial-reviewer, synthesis-writer
- generic → question-framer, web, source-quality-auditor, adversarial-reviewer, synthesis-writer

## 5. Fases del workflow (0–11)
intake → classification → research plan → fan-out research → evidence matrix → generate&filter → tournament → contradiction finding → adversarial verification → loop until done (máx 3) → synthesis → output MD+JSON.
Naming: `outputs/reports/YYYY-MM-DD_research-council_<slug>.md`, `outputs/json/..._<slug>.json`, `outputs/evidence/..._<slug>_evidence.md`.

## 6. Validación + gate final (§6, §7 ajustes)
Ver `docs/test-plan.md` y el bloque de verificación en `docs/BUILD_CHECKLIST.md`.

## 7. Entrega
Commit(s) descriptivos en `claude/implementation-plan-review-ae7lii` → push `-u origin` (reintentos backoff) → PR en draft.
