# Rúbrica: IA Empresarial (Enterprise AI)

Úsala cuando la investigación evalúe la adopción, diseño o despliegue de un
sistema de IA (agentes, copilotos, LLMs, automatización) dentro de una
organización. El foco es riesgo operativo, gobernanza y viabilidad de
producción, no solo capacidad técnica del modelo.

## Cómo usar esta rúbrica

1. Evalúa cada criterio con la evidencia recopilada; si falta evidencia, márcalo
   explícitamente como "sin datos" en vez de asumir.
2. Usa la escala simple (1-5) por criterio y documenta la señal observada.
3. Los criterios de Seguridad, Gobernanza y Datos son bloqueantes: si alguno
   queda en 1-2, la recomendación final debe condicionarse a mitigación, no
   aprobarse sin reservas.

## Escala simple (todos los criterios)

| Puntaje | Significado |
|---|---|
| 5 | Cumple completamente, con evidencia verificable. |
| 4 | Cumple en su mayoría, brechas menores y mitigables. |
| 3 | Parcial; requiere trabajo adicional antes de producción. |
| 2 | Insuficiente; riesgo significativo sin plan claro. |
| 1 | No cumple o no hay evidencia de que se haya considerado. |

## Criterios

### 1. Seguridad
**Qué evaluar:** prevención de prompt injection, fuga de datos, jailbreaks,
ejecución de acciones no autorizadas, aislamiento de credenciales/secretos.

| Nivel | Señales |
|---|---|
| Alta (4-5) | Sandboxing o permisos explícitos, pruebas de red-teaming/adversariales documentadas, manejo de secretos fuera del contexto del modelo. |
| Media (3) | Controles básicos (allowlist de herramientas) pero sin pruebas adversariales documentadas. |
| Baja (1-2) | El agente puede ejecutar acciones arbitrarias sin restricción ni hay mención de mitigación de prompt injection. |

### 2. Gobernanza
**Qué evaluar:** existencia de políticas de uso, responsables (owners),
proceso de aprobación de cambios, comité o rol de supervisión.

| Nivel | Señales |
|---|---|
| Alta | Política documentada, owner identificado, proceso de cambio con aprobación. |
| Media | Hay responsable informal pero sin política escrita. |
| Baja | Nadie es responsable claro del sistema; sin proceso de cambio. |

### 3. Trazabilidad
**Qué evaluar:** logging de decisiones/acciones del agente, capacidad de
auditar qué hizo, cuándo, con qué datos y por qué.

| Nivel | Señales |
|---|---|
| Alta | Logs completos de prompts, respuestas, herramientas invocadas y resultados; retención definida. |
| Media | Logging parcial (solo entradas o solo salidas, sin contexto de herramientas). |
| Baja | Sin logging o logs no auditables/retenidos. |

### 4. Límites del agente (scope)
**Qué evaluar:** si las capacidades del agente están acotadas a lo necesario
(principio de mínimo privilegio funcional), y si hay casos de uso explícitamente
fuera de alcance.

| Nivel | Señales |
|---|---|
| Alta | Alcance documentado, casos fuera de scope identificados, fallback definido. |
| Media | Alcance implícito pero no documentado formalmente. |
| Baja | El agente puede operar sin límites claros de tarea o dominio. |

### 5. Permisos
**Qué evaluar:** modelo de permisos para herramientas/datos/acciones (RBAC,
allowlists, aprobación por acción sensible).

| Nivel | Señales |
|---|---|
| Alta | Permisos granulares por herramienta/acción, revisables y auditables. |
| Media | Permisos a nivel de "todo o nada" pero con alguna restricción base. |
| Baja | Sin modelo de permisos; acceso amplio por defecto. |

### 6. Revisión humana (human-in-the-loop)
**Qué evaluar:** puntos de control donde una persona aprueba antes de una
acción irreversible o de alto impacto.

| Nivel | Señales |
|---|---|
| Alta | Aprobación humana obligatoria para acciones críticas/irreversibles, con SLA definido. |
| Media | Revisión humana opcional o solo post-hoc (auditoría, no previa). |
| Baja | Acciones de alto impacto se ejecutan sin ningún checkpoint humano. |

### 7. Datos
**Qué evaluar:** qué datos consume/produce el sistema, clasificación de
sensibilidad, cumplimiento de privacidad, retención y residencia.

| Nivel | Señales |
|---|---|
| Alta | Clasificación de datos clara, cumplimiento de privacidad (ej. GDPR/LOPD) verificado, retención definida. |
| Media | Se conoce el tipo de datos pero falta política formal de retención/privacidad. |
| Baja | Datos sensibles usados sin clasificación ni control de acceso. |

### 8. Integración
**Qué evaluar:** compatibilidad con sistemas existentes (ERP, CRM, identidad),
esfuerzo de integración, dependencias técnicas.

| Nivel | Señales |
|---|---|
| Alta | Conectores/APIs estándar disponibles, integración probada en un piloto. |
| Media | Integración posible pero requiere desarrollo a medida significativo. |
| Baja | Sin vía de integración clara o incompatible con el stack actual. |

### 9. Costo
**Qué evaluar:** costo total (licencias, cómputo/tokens, integración,
mantenimiento) vs. valor esperado, y previsibilidad del costo a escala.

| Nivel | Señales |
|---|---|
| Alta | Modelo de costos transparente y predecible, con estimación de TCO a 1-3 años. |
| Media | Costo conocido para el piloto pero incierto al escalar. |
| Baja | Sin estimación de costo o modelo de precios opaco/variable. |

### 10. Mantenimiento
**Qué evaluar:** esfuerzo continuo requerido (actualización de prompts,
reentrenamiento, monitoreo de drift, soporte del proveedor).

| Nivel | Señales |
|---|---|
| Alta | Plan de mantenimiento definido, monitoreo de calidad/drift, soporte del proveedor con SLA. |
| Media | Mantenimiento reactivo (se atiende cuando falla) sin monitoreo proactivo. |
| Baja | Sin plan de mantenimiento ni responsable asignado. |

### 11. Escalabilidad
**Qué evaluar:** comportamiento bajo mayor carga/usuarios/casos de uso, límites
de rate, degradación esperada.

| Nivel | Señales |
|---|---|
| Alta | Probado o documentado a la escala objetivo, con límites conocidos y plan de mitigación. |
| Media | Funciona en piloto pequeño, escalabilidad no probada. |
| Baja | Limitaciones de escala conocidas sin plan de mitigación. |

### 12. Riesgos
**Qué evaluar:** riesgos identificados (alucinación, sesgo, dependencia de
proveedor, regulatorio, reputacional) y si tienen plan de mitigación.

| Nivel | Señales |
|---|---|
| Alta | Riesgos mapeados explícitamente con mitigación y dueño para cada uno. |
| Media | Riesgos mencionados pero sin plan de mitigación concreto. |
| Baja | No se identifican riesgos o se minimizan sin análisis. |

## Resumen para el reporte

| Criterio | Puntaje (1-5) | Evidencia clave | Riesgo si no se mitiga |
|---|---|---|---|
| Seguridad | | | |
| Gobernanza | | | |
| Trazabilidad | | | |
| Límites del agente | | | |
| Permisos | | | |
| Revisión humana | | | |
| Datos | | | |
| Integración | | | |
| Costo | | | |
| Mantenimiento | | | |
| Escalabilidad | | | |
| Riesgos | | | |

**Regla de bloqueo:** si Seguridad, Gobernanza o Datos puntúan 1-2, la
recomendación no puede ser "aprobar para producción" sin condicionarla a
mitigación explícita y revisión humana adicional.
