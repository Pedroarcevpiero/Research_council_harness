# Rúbrica: Calidad de Fuentes

Evalúa cada fuente individual antes de incorporarla a la matriz de evidencia.
El objetivo es decidir cuánto peso darle, no descartarla por defecto: una
fuente de baja calidad puede usarse como señal débil si se etiqueta como tal.

## Cómo usar esta rúbrica

1. Aplica los 8 criterios a cada fuente relevante.
2. Asigna una calidad global usando la escala de la sección "Escala de calidad global".
3. Registra el tipo de fuente (ver "Mapeo de tipos de fuente").
4. Si dos fuentes se contradicen, compara sus calidades antes de decidir cuál pesa más.

## Criterios

### 1. Autoridad
**Qué evaluar:** quién publica, su credencial/posición, si es la entidad
competente sobre el tema (ej. el propio fabricante, regulador, autor del
estándar).

| Nivel | Señales |
|---|---|
| Alta | Autor/organización con expertise directo y reconocido; entidad oficial o creadora del estándar/producto/dato. |
| Media | Profesional o medio con experiencia relevante pero no es la fuente primaria del tema. |
| Baja | Autor anónimo, sin credenciales verificables, o fuera de su área de expertise. |

### 2. Actualidad
**Qué evaluar:** fecha de publicación/última actualización vs. velocidad de
cambio del tema (tecnología, precios, regulación cambian rápido; principios
matemáticos no).

| Nivel | Señales |
|---|---|
| Alta | Reciente respecto al ritmo de cambio del dominio; fecha explícita y verificable. |
| Media | Algo desactualizada pero el contenido sigue siendo mayormente válido; o sin fecha pero con contexto que permite inferirla. |
| Baja | Claramente obsoleta para un dominio de cambio rápido; sin fecha y sin forma de inferirla. |

### 3. Independencia
**Qué evaluar:** si quien escribe tiene incentivo financiero, comercial o
ideológico en el resultado.

| Nivel | Señales |
|---|---|
| Alta | Sin relación comercial con el tema evaluado; financiamiento transparente o inexistente. |
| Media | Relación indirecta (ej. consultora que vende servicios adyacentes) pero con metodología visible. |
| Baja | Quien publica vende directamente lo que recomienda, sin declarar el conflicto. |

### 4. Metodología
**Qué evaluar:** si explica cómo se obtuvieron los datos/conclusiones
(muestra, proceso, herramientas, supuestos).

| Nivel | Señales |
|---|---|
| Alta | Metodología explícita, reproducible, con tamaño de muestra/alcance declarado. |
| Media | Menciona el enfoque general pero sin detalle suficiente para reproducir. |
| Baja | Conclusiones sin ninguna explicación de cómo se llegó a ellas. |

### 5. Trazabilidad
**Qué evaluar:** si se puede verificar el dato en la fuente original (enlace,
cita, número de versión, DOI, página).

| Nivel | Señales |
|---|---|
| Alta | Enlace directo o cita verificable a la fuente primaria. |
| Media | Referencia indirecta (menciona la fuente pero sin enlace exacto). |
| Baja | Afirmación sin ninguna referencia rastreable. |

### 6. Sesgo comercial
**Qué evaluar:** lenguaje promocional, ausencia de limitaciones/contras,
llamados a la acción de venta.

| Nivel | Señales |
|---|---|
| Alta (bajo sesgo) | Presenta pros y contras, reconoce limitaciones, sin CTA de venta. |
| Media | Tono favorable pero con algo de balance. |
| Baja (alto sesgo) | Solo ventajas, lenguaje de marketing, omite alternativas o riesgos. |

### 7. Aplicabilidad
**Qué evaluar:** si el contexto de la fuente (país, industria, escala, versión
de producto) coincide con el contexto de la pregunta de investigación.

| Nivel | Señales |
|---|---|
| Alta | Mismo contexto (geografía, industria, escala, versión) que la pregunta. |
| Media | Contexto parcialmente comparable, requiere extrapolación razonable. |
| Baja | Contexto muy distinto; la extrapolación es especulativa. |

### 8. Consistencia con otras fuentes
**Qué evaluar:** si lo que dice coincide, complementa o contradice a otras
fuentes ya recopiladas.

| Nivel | Señales |
|---|---|
| Alta | Corroborada por al menos una fuente independiente de calidad comparable o superior. |
| Media | Sin corroborar pero sin contradicción tampoco (tema poco cubierto). |
| Baja | Contradice a fuentes de mayor calidad sin explicación razonable. |

## Escala de calidad global

| Nivel | Definición | Ejemplos |
|---|---|---|
| **Alta** | Fuente confiable, verificable y vigente. | Documentación oficial del producto/estándar, paper académico con metodología sólida y revisión por pares, estándar reconocido (ISO, NIST, RFC), fuente primaria (datos, código fuente, ley, comunicado oficial). |
| **Media** | Fuente útil pero no primaria; requiere corroboración. | Consultora reconocida (Gartner, McKinsey, Forrester), medio especializado del sector, análisis técnico documentado con metodología visible. |
| **Baja** | Señal débil; usar solo como indicio, nunca como base única de una conclusión. | Blog sin evidencia ni metodología, contenido comercial no verificado, opinión personal sin datos de respaldo. |
| **No usar** | Excluir de la matriz de evidencia o citar solo para advertir que existe pero es inválida. | Fuente dudosa (clickbait, desinformación conocida), no verificable (sin autor, sin fecha, sin enlace), o conflictiva sin ningún soporte que permita resolver la contradicción. |

## Mapeo de tipos de fuente

| Tipo | Descripción | Ejemplos |
|---|---|---|
| Primaria | Origen directo del dato/evento. | Código fuente, dataset original, comunicado de la empresa, transcripción de earnings call, texto legal. |
| Secundaria | Interpreta o resume fuentes primarias. | Artículo de prensa, resumen de un reporte, blog técnico que cita estudios. |
| Académica | Producida bajo método científico, idealmente revisada por pares. | Paper, tesis, preprint con metodología explícita. |
| Comercial | Producida por o para una entidad con interés de venta. | Whitepaper de proveedor, landing page, caso de éxito patrocinado. |
| Oficial | Emitida por una autoridad competente sobre el tema. | Documentación de producto del fabricante, normativa de un regulador, especificación de un estándar. |
| Opinión | Punto de vista personal, no verificado empíricamente. | Post de LinkedIn/X, columna editorial, comentario en foro. |
| Estándar | Norma o especificación de referencia consensuada. | ISO, NIST, RFC, OWASP, IEEE. |

## Checklist rápido al cerrar la evaluación de una fuente

- [ ] Asigné un nivel a cada uno de los 8 criterios.
- [ ] Determiné la calidad global (Alta/Media/Baja/No usar) con justificación breve.
- [ ] Etiqueté el tipo de fuente.
- [ ] Si la fuente es "No usar", documenté por qué se excluyó (no la borré silenciosamente).
- [ ] Si contradice a otra fuente, anoté la contradicción para la fase de detección de contradicciones.
