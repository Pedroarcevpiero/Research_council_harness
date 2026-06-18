# Ejemplo — Tarifario de servicios desde SAP incompleto + cotizaciones

## Invocación
```
/research-council
Pregunta: ¿Cuáles son las mejores prácticas para crear un tarifario de servicios a partir de descripciones SAP incompletas y cotizaciones PDF/JPG/DOC?
Contexto: Las descripciones de servicios en SAP están incompletas; los precios viven en cotizaciones de formatos mixtos.
Objetivo: Definir un método confiable y trazable para construir y validar un tarifario.
Fuentes preferidas: prácticas de procurement, benchmarking, documentación SAP, archivos locales.
Restricciones: español; trazabilidad y auditoría obligatorias.
Profundidad: estándar
```

## Clasificación esperada
`procurement`.

## Agentes esperados
- procurement-researcher (tail spend, benchmark, validación de precios)
- supply-chain-researcher (SAP, datos de servicios)
- enterprise-practices-researcher
- web-researcher
- risk-and-controls-researcher (trazabilidad, auditoría)
- source-quality-auditor, synthesis-writer

## Patrón esperado
fan-out and synthesize + generate-and-filter (métodos de normalización y validación) + adversarial verification.

## Qué tendría el reporte
- Métodos para normalizar descripciones SAP incompletas y extraer precios de formatos mixtos.
- Matriz de evidencia sobre benchmarking y validación de precios.
- Riesgos: precios desactualizados, proveedor único, calidad de OCR, datos faltantes.
- Recomendación de proceso con controles de trazabilidad y nivel de confianza.
