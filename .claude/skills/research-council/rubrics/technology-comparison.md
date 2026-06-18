# Rúbrica: Comparación de Tecnologías

Úsala cuando la investigación compare herramientas, frameworks, plataformas o
arquitecturas alternativas para un caso de uso concreto. Está pensada para
alimentar un torneo (tournament-judge) entre alternativas, no solo describir
cada opción de forma aislada.

## Cómo usar esta rúbrica

1. Aplica los 10 criterios a **cada alternativa** evaluada, no solo a la
   favorita.
2. Usa la escala simple (1-5) y registra evidencia concreta, no impresión
   general.
3. Pondera los criterios según el caso de uso: si el contexto no entrega un
   peso explícito, documenta el peso por defecto usado (ver "Ponderación
   sugerida") y avisa que es un supuesto.
4. El criterio "Fit con el caso de uso" actúa como filtro: una tecnología con
   Fit bajo (1-2) no debería ganar el torneo aunque puntúe alto en el resto.

## Escala simple (todos los criterios)

| Puntaje | Significado |
|---|---|
| 5 | Excelente; sin reservas para este caso de uso. |
| 4 | Bueno; reservas menores y manejables. |
| 3 | Aceptable; requiere mitigación o trabajo adicional. |
| 2 | Débil; riesgo relevante para el caso de uso. |
| 1 | Inadecuado o sin evidencia que respalde su uso aquí. |

## Criterios

### 1. Madurez
**Qué evaluar:** tiempo en producción, adopción real (no solo hype), historial
de versiones, estabilidad de la API/contrato.

| Nivel | Señales |
|---|---|
| Alta (4-5) | Múltiples versiones mayores estables, adopción documentada en producción a escala. |
| Media (3) | Adoptada pero relativamente nueva o con cambios de API frecuentes. |
| Baja (1-2) | Beta/experimental, sin casos de producción documentados. |

### 2. Facilidad de implementación
**Qué evaluar:** esfuerzo y tiempo para llevarla de cero a funcionando, calidad
de la documentación, claridad del setup.

| Nivel | Señales |
|---|---|
| Alta | Documentación clara, quickstart funcional, tiempo de implementación bajo. |
| Media | Documentación incompleta o requiere expertise previo no trivial. |
| Baja | Documentación pobre o implementación requiere esfuerzo desproporcionado. |

### 3. Integración
**Qué evaluar:** compatibilidad con el stack existente, disponibilidad de
conectores/SDKs/APIs, esfuerzo de interoperabilidad.

| Nivel | Señales |
|---|---|
| Alta | Conectores oficiales para el stack actual, API estándar (REST/gRPC/SDK maduro). |
| Media | Integración posible pero requiere adaptadores propios. |
| Baja | Sin vía de integración clara o incompatibilidades conocidas. |

### 4. Costo
**Qué evaluar:** licenciamiento, costo de infraestructura asociado, costo por
uso/escala, costo oculto (soporte, certificaciones).

| Nivel | Señales |
|---|---|
| Alta | Modelo de costo transparente y favorable para el volumen esperado. |
| Media | Costo razonable pero con incertidumbre a mayor escala. |
| Baja | Costo alto, opaco, o con saltos abruptos por tier. |

### 5. Seguridad
**Qué evaluar:** historial de vulnerabilidades (CVEs), prácticas de
seguridad del proyecto/proveedor, certificaciones (SOC2, ISO 27001),
superficie de ataque.

| Nivel | Señales |
|---|---|
| Alta | Sin vulnerabilidades críticas recientes sin parchear, certificaciones relevantes, proceso de disclosure responsable. |
| Media | Vulnerabilidades menores ya resueltas, sin certificación formal pero con buenas prácticas visibles. |
| Baja | Vulnerabilidades críticas recientes sin resolver, o sin ninguna política de seguridad visible. |

### 6. Mantenibilidad
**Qué evaluar:** actividad del proyecto (commits, releases), tamaño y salud
de la comunidad/equipo, facilidad de debugging y actualización.

| Nivel | Señales |
|---|---|
| Alta | Actividad reciente y constante, comunidad/equipo activo, releases regulares. |
| Media | Actividad esporádica pero el proyecto no está abandonado. |
| Baja | Sin actividad reciente, issues sin respuesta, señales de abandono. |

### 7. Curva de aprendizaje
**Qué evaluar:** tiempo para que el equipo actual alcance productividad,
disponibilidad de talento en el mercado con esa habilidad.

| Nivel | Señales |
|---|---|
| Alta (curva baja) | Conceptos familiares para el equipo, talento disponible en el mercado. |
| Media | Requiere capacitación moderada o conceptos parcialmente nuevos. |
| Baja (curva alta) | Paradigma muy distinto al actual, talento escaso en el mercado. |

### 8. Vendor lock-in
**Qué evaluar:** facilidad de migrar a otra alternativa después, uso de
estándares abiertos vs. formatos/APIs propietarias, portabilidad de datos.

| Nivel | Señales |
|---|---|
| Alta (bajo lock-in) | Estándares abiertos, exportación de datos sencilla, múltiples proveedores compatibles. |
| Media | Parcialmente propietario pero con rutas de migración conocidas. |
| Baja (alto lock-in) | Formato/API propietaria sin alternativa de migración razonable. |

### 9. Escalabilidad
**Qué evaluar:** comportamiento documentado o probado a la escala objetivo
(usuarios, datos, throughput), límites conocidos.

| Nivel | Señales |
|---|---|
| Alta | Casos documentados a escala igual o mayor que la objetivo. |
| Media | Escalabilidad razonable pero no probada al nivel objetivo. |
| Baja | Límites conocidos por debajo de la escala objetivo, o sin información. |

### 10. Fit con el caso de uso
**Qué evaluar:** si la tecnología resuelve el problema específico planteado,
no solo si es buena "en general". Actúa como filtro de descalificación.

| Nivel | Señales |
|---|---|
| Alta | Diseñada o ampliamente usada para exactamente este tipo de problema. |
| Media | Aplicable con adaptaciones razonables. |
| Baja | Requiere forzar la herramienta fuera de su propósito principal. |

## Ponderación sugerida (ajustar según contexto)

| Criterio | Peso por defecto |
|---|---|
| Fit con el caso de uso | Filtro (descalifica si es Baja) |
| Madurez | Alto |
| Seguridad | Alto |
| Integración | Alto |
| Costo | Medio |
| Escalabilidad | Medio |
| Mantenibilidad | Medio |
| Facilidad de implementación | Medio |
| Vendor lock-in | Medio-bajo (sube si hay estrategia multi-cloud/multi-vendor) |
| Curva de aprendizaje | Bajo (sube si el equipo es pequeño o hay rotación alta) |

## Tabla comparativa para el reporte

| Criterio | Alternativa A | Alternativa B | Alternativa C |
|---|---|---|---|
| Madurez | | | |
| Facilidad de implementación | | | |
| Integración | | | |
| Costo | | | |
| Seguridad | | | |
| Mantenibilidad | | | |
| Curva de aprendizaje | | | |
| Vendor lock-in | | | |
| Escalabilidad | | | |
| Fit con el caso de uso | | | |
| **Total ponderado** | | | |

**Nota:** documenta siempre "cuándo elegir cada opción" en vez de declarar un
único ganador absoluto — distintos contextos (presupuesto, equipo, escala)
pueden cambiar el resultado.
