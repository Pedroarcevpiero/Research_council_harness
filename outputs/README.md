# Outputs del Research Council Harness

Estructura y convenciones de almacenamiento de reportes, matrices de evidencia y anexos.

## Estructura de carpetas

```
outputs/
├── reports/          # Reportes finales en Markdown (19 secciones)
├── json/             # Reportes estructurados en JSON (validados contra schema)
└── evidence/         # Matrices de evidencia y anexos detallados
```

## Convención de nombres

Todos los archivos usan la convención:

```
YYYY-MM-DD_research-council_<slug>.[md|json|evidence.md]
```

**Ejemplo**:
```
2026-06-18_research-council_ai-agents-m28.md
2026-06-18_research-council_ai-agents-m28.json
2026-06-18_research-council_ai-agents-m28_evidence.md
```

El `<slug>` se deriva automáticamente de los primeros 2–3 términos significativos de la pregunta (sin acentos, minúsculas, guiones).

---

## Carpeta: reports/

**Contenido**: Reporte final en Markdown, 19 secciones.

**Formato**:
- Encabezado: Metadata (fecha, tipo, versión, autor).
- Secciones numeradas 1–19 (ver abajo).
- Markdown estándar (listas, tablas, blockquotes).
- Footnotes y referencias numeradas.

**Estructura canónica** (19 secciones):

1. **Resumen ejecutivo**
   - 3–5 puntos clave.
   - Recomendación principal.
   - Nivel de confianza (%).
   - Lectura rápida: < 2 minutos.

2. **Pregunta de investigación**
   - Enunciado exacto de la pregunta.
   - Palabras clave.

3. **Contexto y objetivo**
   - Industria / dominio.
   - Stakeholders.
   - Qué decisión se tomará.
   - Restricciones (timeframe, budget, compliance).

4. **Tipo de investigación**
   - Clasificación automática: `enterprise_ai`, `procurement`, `technology_comparison`, `strategic`, `generic`.
   - Justificación de la clasificación.

5. **Metodología**
   - Patrones usados: fan-out, torneo, iteración, adversarial.
   - Herramientas: WebSearch, WebFetch, Grep.
   - Número de iteraciones realizadas.
   - Fecha de finalización.

6. **Subpreguntas**
   - Desglose lógico de la pregunta principal.
   - Dependencias entre subpreguntas.

7. **Matriz de evidencia**
   - Tabla: Subpregunta | Hallazgos | Fuentes | Confianza | Notas.
   - Trazabilidad completa: URL, título, fecha, autor.

8. **Hallazgos principales**
   - Por subpregunta.
   - Claims con citas y referencias.
   - Contexto de cada hallazgo.

9. **Contradicciones**
   - Si existen: listado.
   - Origen: cuál hallazgo vs. cuál otro.
   - Resolución o explicación de coexistencia.

10. **Alternativas**
    - Opciones identificadas.
    - Viabilidad inicial.

11. **Comparación de alternativas**
    - Tabla: Criterio | Opción A | Opción B | ... | Recomendación.
    - Scoring (si aplica).

12. **Análisis adversarial**
    - Crítica sistemática.
    - Gaps en la investigación.
    - Suposiciones no validadas.
    - Posibles sesgos.

13. **Riesgos y controles**
    - Tabla: Riesgo | Probabilidad | Impacto | Control | Owner.
    - Riesgos de decisión / implementación.

14. **Recomendación final**
    - Opción elegida.
    - Por qué (top 3 razones).
    - Próximos hitos.

15. **Nivel de confianza**
    - Porcentaje (0–100%).
    - Justificación breve.
    - Factores limitantes.

16. **Qué evidencia cambiaría la conclusión**
    - Análisis de sensibilidad.
    - Escenarios alternativos.

17. **Próximos pasos**
    - Validación piloto.
    - Escalas.
    - Monitoreo.

18. **Límites**
    - Qué NO se investigó.
    - Por qué (scope, acceso, tiempo).
    - Recomendaciones para investigación futura.

19. **Anexos**
    - Logs de iteración (qué cambió en cada ciclo).
    - Fuentes completas (URL, título, fecha, credibilidad, resumen).
    - Credenciales de auditoría de calidad de fuentes.
    - Tabla de agentes participantes + timestamps.

---

## Carpeta: json/

**Contenido**: Reporte estructurado en JSON, validado contra `schemas/final-report.schema.json`.

**Estructura**:
```json
{
  "metadata": {
    "version": "1.0",
    "timestamp": "2026-06-18T10:30:00Z",
    "research_type": "enterprise_ai",
    "slug": "ai-agents-m28",
    "question": "¿Es seguro usar Claude Code + Dynamic Workflows para M28?",
    "iterations_executed": 2,
    "status": "completed"
  },
  "summary": {
    "executive_summary": "...",
    "recommendation": "...",
    "confidence": 85,
    "key_findings": [ ... ]
  },
  "research": {
    "subquestions": [ ... ],
    "findings": [ ... ],
    "evidence_matrix": [ ... ],
    "contradictions": [ ... ],
    "alternatives": [ ... ],
    "comparison_table": [ ... ]
  },
  "analysis": {
    "adversarial_review": "...",
    "risks": [ ... ],
    "sensitivity": { ... }
  },
  "decision": {
    "recommendation": "...",
    "next_steps": [ ... ],
    "limitations": [ ... ]
  }
}
```

**Uso**: Importable en herramientas de análisis, dashboards, pipelines de automatización.

---

## Carpeta: evidence/

**Contenido**: Matriz de evidencia detallada y anexos técnicos.

**Estructura**:
1. **Matriz de evidencia completa** (tabla larga).
   - Subpregunta.
   - Hallazgo.
   - Fuente URL.
   - Autor / publicador.
   - Fecha de publicación.
   - Credibilidad (rúbrica).
   - Antigüedad (tag: `current`, `recent`, `historical`).
   - Sesgo observado.
   - Notas de validación.

2. **Logs de iteración** (si hay múltiples ciclos).
   - Iteración 1 → Iteración 2 → Iteración 3.
   - Qué cambió (claims, fuentes, contradicciones).
   - Por qué se iteró.

3. **Fuentes en detalle**.
   - URL completa.
   - Título exacto.
   - Autor / editor.
   - Fecha de acceso.
   - Snippet de 200 caracteres.
   - Relevancia score.

4. **Auditoría de agentes**.
   - Agentes participantes.
   - Timestamps de inicio/fin.
   - Hallazgos por agente.
   - Consenso / desacuerdos.

---

## Protecciones de sobrescritura

**Importante**: Los outputs NUNCA se sobrescriben automáticamente.

Si ya existe `2026-06-18_research-council_ai-agents-m28.md`:
1. Se genera con timestamp más granular: `2026-06-18_research-council_ai-agents-m28_v2.md`.
2. Se registra en un archivo de control `outputs/.index.json`:
   ```json
   {
     "ai-agents-m28": [
       { "version": 1, "file": "..._v1.md", "timestamp": "...", "iterations": 2 },
       { "version": 2, "file": "..._v2.md", "timestamp": "...", "iterations": 3 }
     ]
   }
   ```
3. El usuario es notificado: "Reporte ya existe. Guardado como v2."

---

## Revisión y uso humano

Cada reporte generado requiere **revisión humana** antes de decisión:

- ✓ Validar claims contra fuentes.
- ✓ Revisar análisis adversarial.
- ✓ Confirmar riesgos identificados.
- ✓ Ajustar recomendación según criterios internos.
- ✓ Documentar decisión tomada.

---

## Acceso a outputs

Desde la CLI de Claude Code:
```bash
# Listar reportes
ls outputs/reports/

# Ver reporte específico
cat outputs/reports/2026-06-18_research-council_*.md

# Ver JSON
cat outputs/json/2026-06-18_research-council_*.json

# Ver matriz de evidencia
cat outputs/evidence/2026-06-18_research-council_*_evidence.md
```

Desde Python / scripts:
```python
import json
import glob

# Cargar último reporte JSON
latest_json = sorted(glob.glob('outputs/json/*.json'))[-1]
with open(latest_json) as f:
    report = json.load(f)
    print(report['metadata']['slug'])
    print(report['summary']['confidence'])
```

---

**Última actualización**: 2026-06-18  
**Versión**: 1.0
