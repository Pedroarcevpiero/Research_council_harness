# Build Checklist — Research Council Harness (compliance + handoff)

> **Propósito doble:** (1) garantizar que el plan se cumple al pie de la letra;
> (2) si nos quedamos sin tokens, este archivo dice exactamente DÓNDE nos quedamos
> y QUÉ FALTA, para que cualquier implementador retome sin perder contexto.
>
> Estados: `[ ]` pendiente · `[~]` en progreso · `[x]` hecho · `[!]` bloqueado
>
> **Reanudación rápida:** busca el primer `[ ]` o `[~]` de arriba a abajo y continúa ahí.
> Cada item incluye su contrato/dependencia. Los archivos del núcleo deben existir
> ANTES de que los subagents de contenido los referencien.

## Última actualización
- Fecha: 2026-06-18
- Punto actual: COMPLETO. Fases A-H hechas. Commit + push + PR #1 (draft) creados. Auditor: CUMPLE.
- Siguiente acción: al completar B–F, validar (Fase G: schemas, frontmatter, consistencia, test manual + auditor de cumplimiento), luego entrega (Fase H).
- IDs de agentes en background: B=research agents, C=verif/síntesis, D=rúbricas, E=docs, F=soporte/ejemplos/workflows.

---

## FASE A — Núcleo / contratos (Opus, agente principal) — hacer PRIMERO
- [x] Estructura de directorios
- [x] docs/IMPLEMENTATION_PLAN.md
- [x] docs/BUILD_CHECKLIST.md (este archivo)
- [x] schemas/research-input.schema.json
- [x] schemas/research-finding.schema.json
- [x] schemas/evidence-matrix.schema.json
- [x] schemas/final-report.schema.json
- [x] .claude/skills/research-council/SKILL.md  (entrada principal; árbol de decisión simple/subagents/workflow/deep-research)
- [x] CLAUDE.md  (<200 líneas)
- [x] workflows/research-council.md  (spec canónica, fases 0–11)
- [x] .claude/workflows/research-council.md  (workflow guardado real)
- [x] .claude/agents/research-orchestrator.md  (planificador puro — NUNCA usa tool Agent)

## FASE B — Research agents (8) — Sonnet paralelo (dependen de schemas)
- [x] .claude/agents/question-framer.md
- [x] .claude/agents/web-researcher.md
- [x] .claude/agents/academic-researcher.md
- [x] .claude/agents/technical-researcher.md
- [x] .claude/agents/enterprise-practices-researcher.md
- [x] .claude/agents/procurement-researcher.md
- [x] .claude/agents/supply-chain-researcher.md
- [x] .claude/agents/risk-and-controls-researcher.md

## FASE C — Verificación/síntesis agents (6) — Sonnet paralelo
- [x] .claude/agents/source-quality-auditor.md
- [x] .claude/agents/contradiction-finder.md
- [x] .claude/agents/adversarial-reviewer.md
- [x] .claude/agents/alternative-generator.md
- [x] .claude/agents/tournament-judge.md
- [x] .claude/agents/synthesis-writer.md

## FASE D — Rúbricas (5) — Sonnet paralelo
- [x] rubrics/source-quality.md
- [x] rubrics/enterprise-ai.md
- [x] rubrics/procurement-research.md
- [x] rubrics/technology-comparison.md
- [x] rubrics/generic-research.md

## FASE E — Docs (6) — Sonnet paralelo
- [x] docs/architecture.md
- [x] docs/operating-manual.md  (incluye: /research-council vs /deep-research)
- [x] docs/safety-and-controls.md
- [x] docs/workflow-patterns.md  (incluye: /research-council vs /deep-research)
- [x] docs/source-quality-guide.md
- [x] docs/test-plan.md

## FASE F — Soporte/plantilla (Haiku) — paralelo
- [x] README.md (principal)
- [x] .claude/skills/research-council/README.md
- [x] outputs/README.md
- [x] .claude/hooks/README.md
- [x] .claude/hooks/settings.json.example  (hooks DESACTIVADOS)
- [x] examples/agent-design-research.md
- [x] examples/procurement-ai-research.md
- [x] examples/technology-comparison.md
- [x] examples/supply-chain-automation.md
- [x] workflows/enterprise-ai-research.js  (pseudocódigo marcado)
- [x] workflows/procurement-research.js  (pseudocódigo marcado)
- [x] workflows/technology-comparison.js  (pseudocódigo marcado)

## FASE G — Validación final
- [x] Los 4 JSON schemas parsean (python -m json.tool)
- [x] Frontmatter YAML válido en los 15 agents + SKILL.md
- [x] Consistencia: nombres de agentes referenciados en SKILL == archivos en .claude/agents
- [x] Mapeo tipo→agentes coherente con el plan §4
- [x] Test manual: clasificación + selección de patrón con pregunta de ejemplo (sin investigación real)
- [x] Agente auditor de cumplimiento ejecutado contra el plan

## FASE H — Entrega (gate antes de commit)
- [x] Mostrar al usuario: árbol, archivos críticos, invocación, uso con/sin dynamic workflow, limitaciones
- [x] Commit descriptivo
- [x] Push -u origin claude/implementation-plan-review-ae7lii
- [x] PR en draft (#1)

---

## Contratos compartidos (para implementadores)
- **Idioma de contenido:** español (el usuario escribe en español).
- **Frontmatter de agents:** `name`, `description`, `tools` (mínimas), `model`. Researchers con web: `WebSearch, WebFetch, Read`. Auditores/síntesis/judge/framer: `Read` (+ `Write` solo synthesis-writer). orchestrator: `Read` (NO Agent, NO Write).
- **Salida JSON de cada research agent:** según `schemas/research-finding.schema.json`.
- **Principios:** no inventar fuentes/datos; separar hechos/supuestos/inferencias; marcar incertidumbre; ponderar por calidad de evidencia; decisión final humana.
- **Naming de outputs:** `YYYY-MM-DD_research-council_<slug>`.
