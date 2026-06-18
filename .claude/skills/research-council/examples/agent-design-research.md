# Ejemplo — Diseño de agente seguro para validar compras (M28)

## Invocación
```
/research-council
Pregunta: ¿Cómo construir un agente seguro para validar compras M28 usando SAP, Excel, cotizaciones PDF y búsqueda web?
Contexto: Equipo de compras valida precios y condiciones contra cotizaciones y datos SAP. Hoy es manual.
Objetivo: Decidir arquitectura, controles y límites del agente antes de implementarlo.
Fuentes preferidas: documentación oficial (Claude Code, MCP, SAP), prácticas de gobernanza de IA, archivos locales.
Restricciones: español; debe respetar revisión humana; no ejecutar compras automáticamente.
Profundidad: profunda
```

## Clasificación esperada
`enterprise_ai` (con fuerte componente de `procurement` y riesgo/controles).

## Agentes esperados
- research-orchestrator (plan)
- web-researcher, technical-researcher, academic-researcher
- risk-and-controls-researcher (clave: revisión humana, trazabilidad, permisos)
- procurement-researcher (validación de precios, SAP)
- source-quality-auditor, adversarial-reviewer
- synthesis-writer

## Patrón esperado
fan-out and synthesize + generate-and-filter (arquitecturas) + adversarial verification + loop-until-done. Posible delegación a `/deep-research` para fuentes actuales sobre seguridad de agentes.

## Qué tendría el reporte
- Alternativas de arquitectura (Skill simple, subagents, MCP+Claude Code, n8n, etc.) filtradas por seguridad/costo/trazabilidad.
- Matriz de evidencia con documentación oficial vs. blogs.
- Riesgos y controles: límites del agente, permisos mínimos, revisión humana obligatoria, manejo de datos sensibles, auditoría.
- Recomendación con nivel de confianza y qué evidencia la cambiaría.
