# Rúbrica: Investigación de Compras (Procurement)

Úsala cuando la investigación apoye una decisión de compras: selección de
proveedor, negociación, análisis de precio de mercado, renovación de contrato
o búsqueda de ahorro. El foco es accionabilidad para el equipo de
procurement, no solo análisis técnico.

## Cómo usar esta rúbrica

1. Evalúa cada criterio con la escala simple.
2. Prioriza los criterios de Riesgo de proveedor, Compliance y TCO: si quedan
   en Baja, el hallazgo debe escalarse a revisión humana antes de cualquier
   recomendación de compra.
3. Si faltan datos necesarios (ver criterio 3), decláralo explícitamente en
   vez de estimar sin base.

## Escala simple

| Nivel | Significado |
|---|---|
| Alta | Evidencia sólida y específica, lista para usar en una decisión de compra. |
| Media | Evidencia razonable pero requiere validación o dato adicional antes de decidir. |
| Baja | Evidencia insuficiente, genérica o no aplicable a este caso. |

## Criterios

### 1. Aplicabilidad a compras
**Qué evaluar:** si el hallazgo responde directamente a la decisión de compra
(qué comprar, a quién, a qué precio, bajo qué condiciones), no solo
información general del mercado.

| Nivel | Señales |
|---|---|
| Alta | Conecta directamente con la categoría/SKU/servicio específico que se va a comprar. |
| Media | Información del mercado/categoría relevante pero no específica al ítem. |
| Baja | Información genérica del sector sin conexión clara a la decisión. |

### 2. Calidad del benchmark
**Qué evaluar:** comparabilidad de precios/condiciones citadas (mismo
volumen, región, momento, especificación técnica).

| Nivel | Señales |
|---|---|
| Alta | Benchmark con volumen, región y especificación comparables, y fecha reciente. |
| Media | Benchmark parcialmente comparable, requiere ajuste razonado. |
| Baja | Benchmark de contexto muy distinto (otra región/escala/especificación) sin ajuste. |

### 3. Datos necesarios
**Qué evaluar:** si están disponibles los datos mínimos para decidir (volumen
histórico, precio actual, especificación, plazos, SLA actual). Si faltan,
listarlos explícitamente.

| Nivel | Señales |
|---|---|
| Alta | Todos los datos clave disponibles y verificados. |
| Media | Datos parciales; faltantes identificados y no críticos para una primera recomendación. |
| Baja | Faltan datos críticos (ej. volumen o precio actual) que impiden cualquier conclusión confiable. |

### 4. Riesgo de precio
**Qué evaluar:** volatilidad del precio (materia prima, FX, energía),
tendencia esperada, exposición a shocks de mercado.

| Nivel | Señales |
|---|---|
| Alta (riesgo bien entendido) | Tendencia y drivers de precio identificados con fuente, incluyendo escenarios. |
| Media | Se menciona volatilidad pero sin cuantificar ni explicar drivers. |
| Baja | Sin análisis de riesgo de precio, o precio asumido como estático sin justificación. |

### 5. Riesgo de proveedor
**Qué evaluar:** salud financiera, concentración/dependencia, capacidad de
entrega, histórico de incumplimiento, riesgo geopolítico o de cadena de
suministro.

| Nivel | Señales |
|---|---|
| Alta | Evaluación de solvencia/capacidad con fuente (rating, reportes financieros, histórico de desempeño). |
| Media | Información cualitativa sobre reputación sin verificación financiera. |
| Baja | Sin ninguna evaluación del riesgo del proveedor. |

### 6. Compliance
**Qué evaluar:** cumplimiento regulatorio (sanciones, normativa sectorial,
ESG, certificaciones requeridas), riesgo legal de la relación contractual.

| Nivel | Señales |
|---|---|
| Alta | Verificación explícita de sanciones/certificaciones/regulación aplicable. |
| Media | Se asume cumplimiento sin verificación documentada. |
| Baja | No se considera compliance o hay señales de incumplimiento sin investigar. |

### 7. Contrato
**Qué evaluar:** términos clave (duración, cláusulas de salida, penalidades,
indexación de precio, SLA, propiedad intelectual) y si están identificados o
son punto ciego.

| Nivel | Señales |
|---|---|
| Alta | Términos clave identificados y comparados contra estándar de mercado/legal interno. |
| Media | Términos parcialmente conocidos, sin comparación contra estándar. |
| Baja | Términos contractuales no analizados o desconocidos. |

### 8. TCO (costo total de propiedad)
**Qué evaluar:** costo más allá del precio unitario (logística, mantenimiento,
implementación, soporte, costos de cambio de proveedor).

| Nivel | Señales |
|---|---|
| Alta | TCO calculado a 1-3+ años incluyendo costos indirectos. |
| Media | Se reconoce que existen costos indirectos pero no se cuantifican. |
| Baja | Solo se considera el precio unitario/lista. |

### 9. Trazabilidad
**Qué evaluar:** si cada cifra/afirmación de precio o condición tiene fuente
verificable (cotización, contrato, benchmark publicado).

| Nivel | Señales |
|---|---|
| Alta | Cada cifra citada tiene fuente identificable y fecha. |
| Media | Algunas cifras tienen fuente, otras son estimaciones declaradas como tales. |
| Baja | Cifras sin fuente o presentadas como hecho sin respaldo. |

### 10. SAP/documentos internos
**Qué evaluar:** si se contrastó con datos internos disponibles (histórico de
compras en SAP/ERP, contratos vigentes, facturas) en vez de basarse solo en
fuentes externas.

| Nivel | Señales |
|---|---|
| Alta | Contrastado con datos internos (histórico de gasto, contrato vigente) cuando estaban disponibles. |
| Media | Se reconoce que existen datos internos pero no se accedió a ellos en esta investigación. |
| Baja | No se consideró la necesidad de datos internos en absoluto. |

### 11. Oportunidad de ahorro
**Qué evaluar:** si la investigación cuantifica una oportunidad de ahorro
concreta (rango, supuestos, condiciones para capturarla) o se queda en
generalidades.

| Nivel | Señales |
|---|---|
| Alta | Ahorro estimado con rango numérico, supuestos explícitos y condiciones para lograrlo. |
| Media | Se sugiere que existe ahorro posible sin cuantificar. |
| Baja | No se evalúa oportunidad de ahorro. |

## Resumen para el reporte

| Criterio | Nivel | Evidencia / dato faltante |
|---|---|---|
| Aplicabilidad a compras | | |
| Calidad del benchmark | | |
| Datos necesarios | | |
| Riesgo de precio | | |
| Riesgo de proveedor | | |
| Compliance | | |
| Contrato | | |
| TCO | | |
| Trazabilidad | | |
| SAP/documentos internos | | |
| Oportunidad de ahorro | | |

**Regla de escalado:** si Riesgo de proveedor, Compliance o TCO quedan en
Baja, la recomendación debe marcarse como "requiere validación adicional
antes de proceder a negociación o firma", no como decisión lista para
ejecutar.
