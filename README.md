# Research Council Harness

Un harness completo de Claude Code para investigaciones empresariales rigurosas, con orquestación de subagentes, verificación adversarial, trazabilidad de fuentes y reportes profesionales.

## ¿Qué es y para qué sirve?

El Research Council Harness automatiza investigaciones complejas en procurement, transformación digital, comparativas tecnológicas y análisis estratégicos. Usa la Skill `/research-council` de Claude Code para orquestar múltiples subagentes especializados:

- **Question Framer**: Refina y estructura la pregunta de investigación.
- **Web Researcher**: Busca y extrae información de fuentes públicas.
- **Academic Researcher**: Localiza papers, reportes y análisis profundos.
- **Source Quality Auditor**: Valida credibilidad, antigüedad y sesgo de fuentes.
- **Contradiction Finder**: Detecta inconsistencias en hallazgos.
- **Research Orchestrator**: Planifica estrategia de investigación y subfases.
- **Adversarial Reviewer**: Cuestiona conclusiones y detecta gaps.
- Subagentes opcionales: generadores de alternativas, jueces de torneo, escritores finales.

**Salidas garantizadas**:
- Reporte Markdown con 19 secciones: resumen ejecutivo, metodología, matriz de evidencia, contradicciones explicadas, análisis adversarial, riesgos, recomendación final, confianza, límites, anexos.
- JSON estructurado (schema validado).
- Matriz de evidencia trazable.
- Logs de iteración (máx 3 ciclos).

**Casos de uso reales**:
- Evaluar soluciones de IA/automatización empresarial (seguridad, costo, viabilidad).
- Investigar mejores prácticas de procurement y automatización de tarifarios.
- Comparar tecnologías (Claude Code vs. n8n vs. Power Automate vs. LangGraph).
- Analizar riesgos de supply chain y opciones de implementación de RAG documental.

---

## Arquitectura (componentes)

```
Research_council_harness/
├── README.md (este archivo)
├── CLAUDE.md (contexto de codebase)
├── workflows/
│   ├── research-council.md (spec canónica de orquestación)
│   ├── enterprise-ai-research.js (pseudocódigo, tipo fijo)
│   ├── procurement-research.js (pseudocódigo, tipo fijo)
│   └── technology-comparison.js (pseudocódigo, tipo fijo)
├── .claude/
│   ├── skills/
│   │   └── research-council/
│   │       ├── README.md (guía de invocación y fases)
│   │       ├── SKILL.md (spec técnica de la Skill)
│   │       ├── examples/ (4 ejemplos de uso)
│   │       │   ├── agent-design-research.md
│   │       │   ├── procurement-ai-research.md
│   │       │   ├── technology-comparison.md
│   │       │   └── supply-chain-automation.md
│   │       ├── schemas/ (JSON schemas de entrada/salida)
│   │       │   ├── research-input.schema.json
│   │       │   ├── research-finding.schema.json
│   │       │   ├── evidence-matrix.schema.json
│   │       │   └── final-report.schema.json
│   │       ├── rubrics/ (criterios de evaluación)
│   │       │   └── source-quality.md
│   │       └── workflows/ (archivo ejecutable si DW disponible)
│   │           └── research-council.md
│   ├── agents/ (subagentes especializados, no anidados)
│   │   ├── question-framer.md
│   │   ├── web-researcher.md
│   │   ├── academic-researcher.md
│   │   ├── source-quality-auditor.md
│   │   ├── contradiction-finder.md
│   │   ├── research-orchestrator.md
│   │   └── ... (más según tipo de investigación)
│   └── hooks/
│       ├── README.md (documentación de hooks opcionales)
│       └── settings.json.example (configuración de ejemplo)
├── outputs/
│   ├── README.md (explicación de carpetas de output)
│   ├── reports/ (reportes finales .md)
│   ├── json/ (reportes JSON)
│   └── evidence/ (matrices de evidencia y anexos)
└── docs/
    ├── BUILD_CHECKLIST.md
    └── IMPLEMENTATION_PLAN.md
```

**Componentes clave**:
1. **Skill `/research-council`**: Punto de entrada, orquesta fases 0–11.
2. **Subagentes**: Especializados, paralelos, sin anidamiento.
3. **Schemas**: Validan entrada, hallazgos, matriz de evidencia, reporte final.
4. **Workflows**: Pseudocódigo (JS comentado) o Dynamic Workflows si está disponible.
5. **Hooks (opcionales)**: Validación de JSON, advertencias, registros, verificación de fuentes.
6. **Outputs**: Reportes + JSON + evidencia, nunca sobrescritos.

---

## Instalación

1. **Copia la carpeta** `Research_council_harness` a tu proyecto (o clónala):
   ```bash
   cp -r /home/user/Research_council_harness .
   ```

2. **Copia los componentes a tu proyecto de Claude Code**:
   ```bash
   cp Research_council_harness/.claude/skills/research-council ~/.claude/skills/
   cp Research_council_harness/.claude/agents/* ~/.claude/agents/
   cp Research_council_harness/.claude/hooks/settings.json.example ~/.claude/
   cp Research_council_harness/workflows/*.md ~/.claude/workflows/
   cp Research_council_harness/outputs/ <tu-proyecto>/outputs/
   cp Research_council_harness/CLAUDE.md <tu-proyecto>/
   ```

3. **(Opcional) Configura hooks** en `settings.json` (ver `.claude/hooks/README.md`):
   - Validación de JSON de outputs.
   - Advertencias antes de workflows largos.
   - Verificación de sección de fuentes.

4. **Verifica que tu proyecto tiene acceso a**:
   - Herramienta nativa `WebSearch` (búsqueda web).
   - Herramienta nativa `WebFetch` (descargar contenido).
   - Herramienta nativa `Read`, `Write`, `Glob`, `Grep`.

---

## Uso rápido

### Invocación básica
```bash
/research-council Investiga cómo implementar automatización de tarifarios con IA \
  sin perder trazabilidad en SAP. Contexto: queremos PDF→JSON + validación cruzada.
```

### Invocación con estructura
```bash
/research-council
{
  "question": "¿Es seguro usar Claude Code + Dynamic Workflows para investigaciones de compras M28?",
  "context": "Procesos de M28 requieren auditoria completa, documentación y control de cambios.",
  "objective": "Decidir arquitectura, controles obligatorios y límites de automatización.",
  "research_type": "enterprise_ai",
  "max_iterations": 2
}
```

### Invocaciones rápidas de casos de uso
```bash
# Comparativa de tecnologías
/research-council Compara Claude Code, n8n, Power Automate y LangGraph para automatizar \
  investigaciones con reportes verificados y trazabilidad.

# Procurement + IA
/research-council Investiga mejores prácticas para tarifarios dinámicos de servicios \
  a partir de cotizaciones heterogéneas (PDF, JPG, DOC, Excel) y validación SAP.

# Supply chain + RAG
/research-council ¿Cómo implementar RAG seguro para contratos y cotizaciones con \
  auditoría completa, versioning y resolución de ambigüedades?
```

---

## Ejemplos documentados

Cada ejemplo en `.claude/skills/research-council/examples/` incluye:
- **Pregunta**: La investigación que se quiere hacer.
- **Contexto**: Industria, restricciones, stakeholders.
- **Objetivo**: Qué decisión se tomará con el reporte.
- **Tipo esperado**: Clasificación automática (enterprise_ai, procurement, etc.).
- **Agentes esperados**: Quién participa.
- **Patrón esperado**: Estrategia de investigación (fan-out, torneo, iteración).
- **Qué tendría el reporte**: Estructura de secciones clave.

**Ver**:
- `examples/agent-design-research.md` — Diseño seguro de agentes para M28.
- `examples/procurement-ai-research.md` — Tarifarios dinámicos con IA.
- `examples/technology-comparison.md` — Comparativa de plataformas.
- `examples/supply-chain-automation.md` — RAG para contratos.

---

## Outputs

### Archivos generados

Los reportes se guardan en `outputs/` sin sobrescritura:

```
outputs/reports/
  2026-06-18_research-council_ai-agents-m28.md
  2026-06-18_research-council_procurement-tariffs.md

outputs/json/
  2026-06-18_research-council_ai-agents-m28.json
  2026-06-18_research-council_procurement-tariffs.json

outputs/evidence/
  2026-06-18_research-council_ai-agents-m28_evidence.md
  2026-06-18_research-council_procurement-tariffs_evidence.md
```

### Estructura del reporte Markdown (19 secciones)

1. **Resumen ejecutivo** — 3–5 puntos clave, recomendación, confianza.
2. **Pregunta de investigación** — Enunciado exacto de la pregunta.
3. **Contexto y objetivo** — Qué se quiere decidir.
4. **Tipo de investigación** — Clasificación automática.
5. **Metodología** — Patrones usados (fan-out, torneo, iteración).
6. **Subpreguntas** — Desglose de la pregunta principal.
7. **Matriz de evidencia** — Tabla: Subpregunta | Fuentes | Confianza | Hallazgos.
8. **Hallazgos principales** — Por subpregunta, con citas.
9. **Contradicciones** — Inconsistencias, origen, resolución.
10. **Alternativas** — Opciones identificadas.
11. **Comparación de alternativas** — Tabla: Criterio | Opción A | Opción B | ...
12. **Análisis adversarial** — Crítica, gaps, suposiciones.
13. **Riesgos y controles** — Tabla: Riesgo | Probabilidad | Impacto | Control.
14. **Recomendación final** — Opción elegida, por qué.
15. **Nivel de confianza** — % con justificación.
16. **Qué evidencia cambiaría la conclusión** — Sensibilidad del reporte.
17. **Próximos pasos** — Validación, pilots, escalas.
18. **Límites** — Qué NO se investigó.
19. **Anexos** — Logs de iteración, fuentes completas, credenciales de auditoría.

### Formato JSON

Ver `schemas/final-report.schema.json`. Incluye:
- Metadata (fecha, tipo, versión).
- Resumen estructurado.
- Array de hallazgos.
- Matriz de evidencia.
- Comparativas.
- Riesgos.
- Confianza + sensibilidad.

---

## Limitaciones

1. **No es búsqueda de tiempo real**: Usa WebSearch/WebFetch nativa de Claude Code; información pública.
2. **No accede datos privados**: SAP, bases de datos internas, se deben proporcionar como contexto en la pregunta.
3. **Máx 3 iteraciones por defecto**: Se puede autorizar más en la invocación.
4. **Requiere revisión humana**: El reporte es insumo para decisión, no decisión automática.
5. **Dynamic Workflows opcional**: Si no está disponible en tu instalación de Claude Code, el harness funciona en modo subagentes (sin paralelismo masivo, mismo resultado).
6. **Fuentes públicas**: No descarga libros, papers pagos, ni contenido con copyright restringido.

---

## Roadmap

- [x] Skill `/research-council` funcional.
- [x] Subagentes base (7 roles).
- [x] Schemas JSON (entrada, hallazgos, evidencia, reporte).
- [x] Rubrics de calidad de fuentes.
- [x] Ejemplos de casos de uso (4).
- [x] Specs de workflows especializados (3 JS).
- [x] Documentación completa (README, SKILL.md, examples, hooks).
- [ ] Tests automáticos de schemas.
- [ ] Hook para validación previa de reportes.
- [ ] Integración con `/deep-research` nativa (complementaria, no reemplazante).
- [ ] UI de reporte (HTML + CSS).
- [ ] Soporte para datos privados (integración SAP/Excel en contexto).

---

## Contribuciones / Feedback

Este harness es de código abierto. Propuestas, mejoras y casos de uso bienvenidos.

---

**Última actualización**: 2026-06-18  
**Versión**: 1.0  
**Autor**: Research Council Team  
**Licencia**: MIT
