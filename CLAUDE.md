# CLAUDE.md — Research Council Harness

## Proposito
Harness agentico reutilizable para investigar preguntas complejas con rigor,
evidencia, verificacion adversarial y sintesis ejecutiva. Produce reportes
profesionales en Markdown + JSON con matriz de evidencia, contradicciones,
alternativas, riesgos y recomendacion ponderada por calidad de evidencia.

Todo corre con el LLM de Claude y herramientas nativas del entorno
(WebSearch, WebFetch, Read, Write). **No usar APIs externas.**

## Cuando usar /research-council
- Investigar agentes de IA, MCP, Claude Code, automatizacion, seguridad y gobernanza.
- Comprar/sourcing, benchmark, tarifarios, contratos, supply chain, validacion de precios.
- Comparar tecnologias o arquitecturas (Claude Code vs n8n vs LangGraph vs Power Automate, etc.).
- Temas estrategicos, economicos o de negocio que requieran evidencia.
- Identificar riesgos, limites y controles antes de implementar una solucion.

Invocacion: `/research-council <pregunta>` (o la forma estructurada de la Skill).

## /research-council vs /deep-research
- `/deep-research` = motor nativo de busqueda web profunda y fact-checking.
- `/research-council` = marco de decision (clasificacion, alternativas, torneo,
  riesgos, recomendacion). Puede delegar busqueda a `/deep-research` y envolver sus
  hallazgos en la matriz de evidencia y la verificacion adversarial.

## Reglas de evidencia
- No inventar fuentes ni datos. Citar o ubicar toda evidencia.
- Separar hechos, supuestos, inferencias y recomendaciones.
- Clasificar calidad de fuente: alta / media / baja / no usar.
- Detectar contradicciones, marcar incertidumbre, indicar evidencia faltante.
- Verificacion adversarial obligatoria antes de concluir.
- Ponderar por calidad de evidencia; nunca promediar opiniones.

## Reglas de seguridad
- Outputs siempre requieren revision humana; la decision final es del usuario.
- No ejecutar acciones externas peligrosas. No modificar archivos fuente originales.
- No sobrescribir reportes existentes (versionar por fecha + slug).
- Preguntar antes de investigaciones largas o costosas.
- Subagents NO lanzan otros subagents: la orquestacion vive en la Skill o en el
  Dynamic Workflow (agente principal).

## Outputs
- `outputs/reports/YYYY-MM-DD_research-council_<slug>.md`
- `outputs/json/YYYY-MM-DD_research-council_<slug>.json`
- `outputs/evidence/YYYY-MM-DD_research-council_<slug>_evidence.md` (si aplica)

## Hooks
Documentados y DESACTIVADOS por defecto. Ver `.claude/hooks/README.md` y
`.claude/hooks/settings.json.example`. No modificar `settings.json` real sin
aprobacion del usuario.

## Referencia
- Skill principal: `.claude/skills/research-council/SKILL.md`
- Agentes: `.claude/agents/`
- Manual de operacion: `docs/operating-manual.md`
- Seguridad y controles: `docs/safety-and-controls.md`
- Plan de construccion / progreso: `docs/IMPLEMENTATION_PLAN.md`, `docs/BUILD_CHECKLIST.md`
