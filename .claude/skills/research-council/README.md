# Skill /research-council

Guía breve de invocación, fases y referencias técnicas.

## Invocación

```bash
/research-council <pregunta>
```

O con estructura JSON (para control fino):

```bash
/research-council
{
  "question": "...",
  "context": "...",
  "objective": "...",
  "research_type": "enterprise_ai|procurement|technology_comparison|strategic|generic",
  "max_iterations": 2,
  "require_academic_sources": true,
  "require_contradictions_analysis": true
}
```

## Qué hace en cada fase

| Fase | Nombre | Duración típica | Salida |
|------|--------|---|---|
| 0 | **Intake** | <1m | Pregunta normalizada, contexto validado |
| 1 | **Clasificación** | <1m | `research_type` automático + selección de agentes |
| 2 | **Plan** | 1–2m | Subpreguntas, fuentes objetivo, criterios de éxito |
| 3 | **Fan-out research** | 5–15m | Hallazgos paralelos de 3–5 investigadores |
| 4 | **Matriz de evidencia** | 2–3m | Tabla: hallazgos × confianza × trazabilidad |
| 5 | **Alternativas** (si aplica) | 2–3m | Generación y filtrado de opciones |
| 6 | **Tournament** (si aplica) | 3–5m | Torneo entre alternativas, ranking |
| 7 | **Contradicciones** | 2–3m | Detección, análisis de origen, resolución |
| 8 | **Adversarial review** | 3–5m | Crítica sistemática del borrador |
| 9 | **Iteración?** | <1m | Decisión: iterar (máx 3 veces) o terminar |
| 10 | **Síntesis final** | 3–5m | Reporte Markdown de 19 secciones |
| 11 | **Output** | <1m | Guardar MD + JSON + evidencia |

**Tiempo total típico**: 25–50 minutos (1 iteración), 60–120 minutos (2–3 iteraciones).

## Mapeo tipo de investigación → agentes

La Skill clasifica automáticamente según palabras clave y contexto:

| `research_type` | Uso | Agentes típicos | Fases especiales |
|---|---|---|---|
| `enterprise_ai` | Evaluación de soluciones IA, automatización, riesgos | Web Researcher, Academic, Source Auditor, Adversarial | Análisis adversarial + riesgos |
| `procurement` | Mejores prácticas de compra, tarifarios, proveedores | Web Researcher, Source Auditor, Contradiction Finder | Matriz de criterios + comparativa |
| `technology_comparison` | Comparativa de plataformas/herramientas | Web Researcher, Academic, Tournament Judge | Tournament + ranking |
| `strategic` | Decisiones de negocio, roadmap, riesgos altos | Academic, Source Auditor, Adversarial, Orchestrator | 3+ iteraciones, análisis adversarial profundo |
| `generic` | Cualquier otra investigación | Web Researcher, Source Auditor | Fan-out simple |

## Esquemas de entrada y salida

Referencia rápida:

- **Input**: `schemas/research-input.schema.json`
  - `question` (string, requerido)
  - `context` (string, opcional)
  - `objective` (string, opcional)
  - `research_type` (enum, opcional; se autodetecta)
  - `max_iterations` (int, default 2)

- **Research Finding**: `schemas/research-finding.schema.json`
  - Generado por cada investigador
  - Incluye: `claim`, `evidence[]`, `confidence`, `source_quality_audit`, `timestamp`

- **Evidence Matrix**: `schemas/evidence-matrix.schema.json`
  - Tabla estructurada: `subquestion | finding | sources | confidence | notes`
  - Usada en sección 7 del reporte

- **Final Report JSON**: `schemas/final-report.schema.json`
  - Reporte estructurado con todas las secciones
  - Validable contra schema

## Rúbricas y criterios

- **Calidad de fuentes**: `rubrics/source-quality.md`
  - Credibilidad (académica, corporate, news, blogs)
  - Antigüedad (actual, reciente, histórica)
  - Sesgo declarado
  - Trazabilidad

## Ejemplos de uso

Ver `.claude/skills/research-council/examples/`:

1. **agent-design-research.md** — Evaluar seguridad de agentes para M28.
2. **procurement-ai-research.md** — Tarifarios dinámicos.
3. **technology-comparison.md** — Comparativa n8n vs. Power Automate vs. LangGraph.
4. **supply-chain-automation.md** — RAG para contratos.

Cada ejemplo incluye pregunta, contexto, tipo esperado, agentes esperados, patrón de investigación y qué tendría el reporte.

## Estructura canónica del workflow

Ver `workflows/research-council.md` (fuente de verdad).

Resumen: 12 fases (0–11) orquestadas por la Skill o un Dynamic Workflow:
- Fases 0–2: Preparación.
- Fase 3–6: Investigación y análisis.
- Fase 7–9: Verificación y ajuste.
- Fase 10–11: Síntesis y output.

## Dynamic Workflows

Si tu instalación de Claude Code tiene Dynamic Workflows disponible:
1. Pídele a Claude (en sesión): "Escribe un workflow para `/research-council` siguiendo `workflows/research-council.md`".
2. Claude generará y guardará el script en `.claude/workflows/research-council.md`.
3. El workflow quedará invocable desde la CLI.

Si **no está disponible**: La Skill ejecuta el mismo flujo en modo subagentes (sin paralelismo masivo).

## Outputs

Guardados en `outputs/` con convención:
```
outputs/reports/YYYY-MM-DD_research-council_<slug>.md
outputs/json/YYYY-MM-DD_research-council_<slug>.json
outputs/evidence/YYYY-MM-DD_research-council_<slug>_evidence.md
```

Ver `outputs/README.md` para detalles.

## Troubleshooting

### "La investigación es demasiado amplia"
→ Refina la pregunta, añade criterios, reduce `max_iterations`.

### "Contradictiones no se resolvieron"
→ La Skill iterará automáticamente (hasta `max_iterations`). Aumenta si es necesario.

### "No encontró fuentes académicas"
→ Usa `"require_academic_sources": true` en la invocación.

### "El reporte dice 'draft' / no tiene síntesis final"
→ El workflow quedó interrumpido. Re-invoca o revisa logs de fase 9 (decisión de iteración).

---

**Última actualización**: 2026-06-18  
**Versión**: 1.0
