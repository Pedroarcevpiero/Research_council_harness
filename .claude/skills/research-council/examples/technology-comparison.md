# Ejemplo — Comparación de plataformas de automatización de investigación

## Invocación
```
/research-council
Pregunta: Compara Claude Code Dynamic Workflows, n8n, Power Automate y LangGraph para automatizar investigaciones empresariales con evidencia y reportes.
Contexto: Queremos un harness de investigación reutilizable con trazabilidad y bajo riesgo.
Objetivo: Elegir la plataforma (o combinación) más adecuada para nuestro caso.
Fuentes preferidas: documentación oficial de cada herramienta, casos de uso, análisis técnicos.
Restricciones: español; preferencia por bajo costo de mantenimiento y trazabilidad.
Profundidad: profunda
```

## Clasificación esperada
`technology_comparison`.

## Agentes esperados
- technical-researcher, enterprise-practices-researcher
- alternative-generator → tournament-judge (defensores por herramienta)
- risk-and-controls-researcher
- source-quality-auditor, synthesis-writer

## Patrón esperado
fan-out + **tournament** (cada herramienta defendida y juzgada con criterios explícitos) + generate-and-filter + adversarial verification.

## Qué tendría el reporte
- Tabla comparativa: madurez, integración, costo, seguridad, mantenibilidad, curva de aprendizaje, vendor lock-in, escalabilidad, fit.
- Ranking del torneo: ganador, segundo, combinación recomendada, cuándo elegir cada uno.
- Riesgos por opción y nivel de confianza.
