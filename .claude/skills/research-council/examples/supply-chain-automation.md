# Ejemplo — RAG documental para contratos, cotizaciones y servicios

## Invocación
```
/research-council
Pregunta: ¿Cómo implementar RAG documental para contratos, cotizaciones y servicios, con trazabilidad y auditoría?
Contexto: Gran volumen de documentos (contratos, cotizaciones PDF/JPG/DOC) que hoy no son consultables de forma confiable.
Objetivo: Decidir arquitectura de RAG con trazabilidad y controles de auditoría.
Fuentes preferidas: documentación técnica, papers de RAG, prácticas de gobernanza documental.
Restricciones: español; trazabilidad de cada respuesta a su fuente; auditoría.
Profundidad: profunda
```

## Clasificación esperada
`enterprise_ai` (con componente de `procurement`/supply chain documental).

## Agentes esperados
- technical-researcher (arquitectura RAG, embeddings, indexado)
- academic-researcher (papers/benchmarks de RAG)
- enterprise-practices-researcher, supply-chain-researcher
- risk-and-controls-researcher (trazabilidad, auditoría, privacidad)
- alternative-generator → tournament-judge (vector DB vs knowledge graph vs híbrido)
- source-quality-auditor, adversarial-reviewer, synthesis-writer

## Patrón esperado
fan-out + generate-and-filter + tournament (opciones de arquitectura) + adversarial verification + loop-until-done.

## Qué tendría el reporte
- Alternativas de arquitectura RAG filtradas por trazabilidad/costo/mantenimiento.
- Matriz de evidencia (papers vs documentación de producto vs blogs).
- Riesgos: alucinación, fuga de datos, calidad de extracción, citación incorrecta.
- Recomendación con controles de auditoría y nivel de confianza.
