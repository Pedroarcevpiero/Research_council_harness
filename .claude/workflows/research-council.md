---
name: research-council
description: >-
  Dynamic Workflow guardado para investigacion profunda con fan-out paralelo,
  matriz de evidencia, generate-and-filter, tournament, verificacion adversarial,
  loop-until-done y sintesis ejecutiva. Complementa /deep-research y la Skill
  /research-council. Todo con LLM de Claude; sin APIs externas.
---

# Dynamic Workflow — research-council

Workflow guardado e invocable por Claude Code (`/workflows`). Implementa la spec
canonica `workflows/research-council.md`. Cuando Dynamic Workflows NO este
disponible, la Skill `/research-council` ejecuta el mismo flujo en modo subagents
(sin paralelismo masivo).

## Cuando usar este workflow (vs Skill simple)
Usar para investigacion amplia/profunda: muchas subpreguntas paralelas, comparacion
de alternativas con torneo, verificacion adversarial y loop. Para preguntas simples,
usar el modo simple de la Skill. Para busqueda web masiva con fact-check, apoyarse en
`/deep-research`.

## Orquestacion (la ejecuta el agente principal; los subagents no anidan)

1. **Intake & clasificacion.** Normaliza entrada (`schemas/research-input.schema.json`).
   Clasifica: enterprise_ai | procurement | technology_comparison | strategic | generic.
   Si falta info critica, preguntar antes de continuar.

2. **Plan.** Invoca `research-orchestrator` (planificador puro) para subpreguntas,
   fuentes requeridas, criterios de exito y patron recomendado.

3. **Fan-out (paralelo, hasta 16 agentes concurrentes).** Lanza los investigadores
   del mapeo por tipo. Cada uno devuelve `schemas/research-finding.schema.json`.
   Variables del script retienen los hallazgos (no el contexto del agente). Los
   investigadores pueden delegar busqueda web profunda a `/deep-research`.

4. **Matriz de evidencia.** Consolida en `schemas/evidence-matrix.schema.json`.
   `source-quality-auditor` marca support_status de cada claim.

5. **Generate & filter.** Si hay soluciones/arquitecturas, `alternative-generator`
   produce opciones; filtra por valor, seguridad, facilidad, mantenimiento, costo,
   trazabilidad, escalabilidad, compatibilidad y riesgo operativo.

6. **Tournament.** Si hay alternativas comparables, defensores por opcion +
   `tournament-judge` -> ganador, segundo, combinacion recomendada, cuando elegir cada una.

7. **Contradiction finding.** `contradiction-finder`.

8. **Adversarial verification.** `adversarial-reviewer` critica el borrador.

9. **Loop until done (max 3).** Itera segun condiciones de la spec; mas iteraciones
   requieren autorizacion del usuario.

10. **Synthesis.** `synthesis-writer` redacta el reporte ponderando por calidad.

11. **Output.** Escribe MD (`schemas/final-report` -> 19 secciones) y JSON con naming
    `YYYY-MM-DD_research-council_<slug>` en `outputs/`.

## Limites de seguridad
- No ejecutar acciones externas; no modificar fuentes originales.
- No sobrescribir outputs existentes.
- Revision humana obligatoria; decision final del usuario.
- Avisar antes de corridas profundas (costo en tokens/tiempo).
