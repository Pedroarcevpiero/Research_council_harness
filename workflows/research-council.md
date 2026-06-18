# Workflow Spec (canónica) — research-council

> **Fuente de verdad** de la orquestación del Research Council. Portátil y legible
> por humanos. El workflow guardado y ejecutable por Claude Code vive en
> `.claude/workflows/research-council.md`. Cualquier archivo `.js` de este repo es
> **pseudocódigo / referencia**, NO un runtime ejecutable por el CLI.

## Contrato de orquestación
- La orquestación la ejecuta el **agente principal** (vía la Skill `/research-council`)
  o un **Dynamic Workflow** que Claude escribe. Los **subagents NO anidan**.
- Todo con LLM de Claude + herramientas nativas. Sin APIs externas.
- Modos: simple · subagents (por defecto) · dynamic workflow · delegación a `/deep-research`.

## Entradas / salidas
- Entrada: `schemas/research-input.schema.json`
- Hallazgos de cada investigador: `schemas/research-finding.schema.json`
- Matriz de evidencia: `schemas/evidence-matrix.schema.json`
- Reporte final JSON: `schemas/final-report.schema.json`
- Reporte final Markdown: estructura de 19 secciones (abajo)

## Fases (0–11)
| Fase | Nombre | Agente(s) | Salida |
|---|---|---|---|
| 0 | Intake | Skill | research-input normalizado; preguntas si falta info crítica |
| 1 | Clasificación | Skill | research_type + rúbrica |
| 2 | Plan | research-orchestrator (planificador) | subpreguntas, fuentes, criterios, patrón |
| 3 | Fan-out research | researchers (paralelo) | research-finding[] |
| 4 | Matriz de evidencia | Skill + source-quality-auditor | evidence-matrix |
| 5 | Generate & filter | alternative-generator | alternativas filtradas |
| 6 | Tournament | defensores + tournament-judge | ranking + recomendación |
| 7 | Contradiction finding | contradiction-finder | contradicciones |
| 8 | Adversarial verification | adversarial-reviewer | crítica del borrador |
| 9 | Loop until done (máx 3) | Skill | decisión iterar/terminar |
| 10 | Synthesis | synthesis-writer | borrador final |
| 11 | Output | Skill | MD + JSON (+ evidence) |

## Condiciones de iteración (Fase 9)
Iterar si: claims críticos sin fuente · contradicciones no resueltas · alternativas
no evaluadas · falta fuente oficial/actual · riesgos altos sin analizar · baja
confianza. Terminar cuando: claims soportados · contradicciones explicadas · riesgos
documentados · alternativas comparadas · confianza explícita. Límite: 3 iteraciones
salvo autorización del usuario.

## Mapeo tipo → agentes
Ver `.claude/skills/research-council/SKILL.md` (sección "Mapeo tipo de investigación").

## Estructura del reporte Markdown (19 secciones)
1. Resumen ejecutivo · 2. Pregunta de investigación · 3. Contexto y objetivo ·
4. Tipo de investigación · 5. Metodología (patrones usados) · 6. Subpreguntas ·
7. Matriz de evidencia (tabla) · 8. Hallazgos principales · 9. Contradicciones ·
10. Alternativas · 11. Comparación de alternativas (tabla) · 12. Análisis adversarial ·
13. Riesgos y controles (tabla) · 14. Recomendación final · 15. Nivel de confianza ·
16. Qué evidencia cambiaría la conclusión · 17. Próximos pasos · 18. Límites ·
19. Anexos.

## Naming de outputs
`outputs/reports/YYYY-MM-DD_research-council_<slug>.md`
`outputs/json/YYYY-MM-DD_research-council_<slug>.json`
`outputs/evidence/YYYY-MM-DD_research-council_<slug>_evidence.md`

## Cómo convertir esto en un Dynamic Workflow real
Si Dynamic Workflows está disponible: pide a Claude en sesión "escribe un workflow
para research-council siguiendo workflows/research-council.md" (palabra clave
`ultracode` o `/effort ultracode`). Claude generará/guardará el script en
`.claude/workflows/` y quedará invocable. Si NO está disponible, la Skill ejecuta el
modo subagents (mismo resultado, sin paralelismo masivo).
