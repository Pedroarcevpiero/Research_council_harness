# Research Council Report: Modelos de planificación y reposición de inventario para una pesquera estacional (Exalmar/Sanmar) — clásico vs optimización, red central-satélite, e Inventory Planning Council Harness

> ⚠️ **Requiere revisión humana.** Insumo de decisión, no decisión. Los modelos citados son OR clásico bien soportado; **los parámetros finales (niveles de servicio, safety stock, umbrales) deben calibrarse con datos reales de Exalmar/Sanmar**. Cifras de proveedores marcadas como no auditadas. Fecha: 2026-06-18.

## 1. Resumen ejecutivo

La pregunta "¿clásico u optimización?" tiene una respuesta clara y respaldada por la literatura: **modelo híbrido, por segmento, empezando por políticas clásicas bien diferenciadas, y reservando la optimización (MEIO/newsvendor) para donde paga.** Tres pilares:

1. **Clasificar antes de pronosticar.** La matriz **Syntetos-Boylan-Croston (2005)** con **ADI** (intervalo medio entre demandas) y **CV²** (variabilidad del tamaño), umbrales **ADI=1.32 / CV²=0.49**, separa **smooth / erratic / intermittent / lumpy**. A esto se cruza **criticidad (VED)**, **valor (ABC)** y **regularidad (XYZ)**. Cada celda → un método distinto.
2. **Separar demanda dependiente de independiente** (el error más caro). Repuestos atados a **plan de mantenimiento preventivo + Equipment BOM** y los **insumos/empaques atados al plan de producción** son **demanda dependiente** → se planifican por **MRP/explosión de plan**, NO por forecast estadístico. Solo las fallas aleatorias y el consumo sin plan son **demanda independiente** → forecast (Croston/SBA/TSB) + safety stock por criticidad.
3. **La red central-satélite se gobierna con risk pooling.** La **square-root law (Eppen 1979)** justifica **centralizar ítems lentos, caros y variables** (mayor ahorro de safety stock) y **descentralizar los rápidos y baratos** (servicio). Los SKUs comunes (30-40%) → política central con **reabastecimiento programado**; exclusivos (5%) → política local por criticidad; transferencias laterales (transshipment) como complemento.

**Recomendación (alta confianza en método):** **híbrido por segmento**. Empezar con políticas clásicas diferenciadas (ROP/min-max/(s,Q)/(R,S)/base-stock según celda), corregir el split dependiente/independiente, y **sanear datos maestros primero** (lead times, criticidad, consumo≠demanda). Añadir **newsvendor para campañas** (insumos/empaques de temporada), análisis de **pooling/centralización** para los SKUs comunes, y considerar **MEIO (SAP IBP o Python)** solo después, para el subconjunto de alto valor donde el ahorro lo justifique. **No usar EOQ ni forecast estadístico en repuestos críticos intermitentes.** **Confianza global: media** (método/estructura = alta; parámetros = a calibrar con datos reales). Herramientas: empezar en **Python + Power BI** (control y bajo costo), apoyarse en **SAP MM** para ejecución y **SAP IBP** solo si se justifica multi-echelon.

## 2. Pregunta de investigación

¿Qué modelos de pronóstico y reposición usar por tipo de SKU en una pesquera estacional con almacén central (~6,000 SKUs) y satélites (~2,000 SKUs), y conviene un enfoque clásico, de optimización o híbrido para sincronizar la red central-satélite?

## 3. Contexto y objetivo

Exalmar/Sanmar: estacionalidad fuerte — anchoveta T1 (abr-jul) y T2 (nov-ene); mantenimiento de plantas y flota fuera de temporada; CHD/congelado pica feb-mar y parte de abr. Red: 1 central + satélites norte/sur del Callao; 30-40% SKUs comunes (reabastecidos desde central), ~5% exclusivos. Variabilidad por cuotas, vedas, permisos, paradas. Objetivo: recomendar política por familia de SKU + modelo híbrido + harness.

## 4. Tipo de investigación

`procurement`/supply-chain con fuerte componente cuantitativo (investigación de operaciones) + diseño de arquitectura.

## 5. Metodología usada

Fan-out de 5 investigadores (clasificación/forecasting; políticas clásicas+SAP; optimización/red; repuestos/mantenimiento; riesgos/datos) con búsqueda real → matriz de evidencia → comparación clásico vs optimización (generate&filter) → contradicciones → verificación adversarial → síntesis de diseño. Ponderación por calidad de evidencia.

## 6. Subpreguntas investigadas

Clasificación de demanda (SBC/ABC/XYZ/VED); forecasting por tipo; políticas clásicas de reposición e implementación SAP; optimización (MEIO/newsvendor/pooling); repuestos y vínculo mantenimiento/producción (dependiente vs independiente); riesgos/controles/calidad de datos.

## 7. Matriz de evidencia

| Claim | Fuente | Tipo | Calidad | Fecha | Relevancia | Limitaciones |
|---|---|---|---|---|---|---|
| Matriz SBC: ADI=1.32 / CV²=0.49 → smooth/erratic/intermittent/lumpy | Syntetos, Boylan & Croston, *JORS* 56 | academica | alta | 2005 | Alta | Umbrales derivados bajo supuestos de distribución |
| Croston (1972) primer método para demanda intermitente (tamaño/intervalo) | Croston, *ORQ* 23 | academica | alta | 1972 | Alta | Supuesto Bernoulli |
| Croston sesgado positivo; SBA corrige con (1-α/2) | Syntetos & Boylan 2001/2005 | academica | alta | 2001-2005 | Alta | SBA puede dejar sesgo negativo residual |
| TSB actualiza probabilidad cada período (mejor ante obsolescencia) | Teunter, Syntetos & Babai, *EJOR* 214 | academica | alta | 2011 | Alta | Empíricamente SBA lo supera en algunos casos |
| Bootstrapping (Markov 2 estados) para lumpy / distribución sobre lead time | Willemain, Smart & Schwarz, *IJF* | academica | alta | 2004 | Alta | Controversia de patente; 9 datasets |
| MAPE falla con ceros; usar MASE | Hyndman & Koehler, *IJF* 22 | academica | alta | 2006 | Alta | — |
| 4 políticas canónicas (s,Q)/(s,S)/(R,S)/(R,s,S); base stock | Silver-Pyke-Peterson | academica | alta | 1998 | Alta | Texto no leído completo |
| EOQ óptimo solo con demanda/LT constantes, sin descuentos | varios (Harris/Wilson) | academica/comercial | media | clásico | Alta | — |
| Safety stock combina variabilidad de demanda **y** de lead time | ASCM (APICS) | estandar | alta | 2026 | Alta | — |
| SAP MRP types: VB/VM/V1/V2 (ROP), VV (forecast, deprecado→PD), ND (kanban); IBP=MEIO | SAP Community/Help | oficial | media-alta | 2026 | Alta | Foros de comunidad; verificar versión |
| METRIC (Sherbrooke 1968): base MEIO repuestos (Poisson, base-stock, 2 echelons) | Springer (síntesis) | academica | alta | 1968 | Alta | Resumen secundario |
| GSM vs SSM (Graves-Willems 2003 / Clark-Scarf 1960) | EJOR | academica | alta | 2003 | Alta | Abstract |
| Newsvendor: ratio crítico Cu/(Cu+Co) para campañas/temporada | Zipkin/Snyder-Shen (vía secundaria) | academica | media | clásico | Alta | Fórmula confirmada; fuente secundaria |
| Square-root law (Eppen 1979): SS centralizado ~ √(n ubicaciones); depende de colas ligeras | ResearchGate (Eppen) | academica | alta | 1979 | Alta | Caveat de colas pesadas |
| Pooling centraliza lentos/caros/variables; descentraliza rápidos/baratos | Axsäter/Zipkin (vía secundaria) | academica | media | clásico | Alta | — |
| SAP IBP MIPO = método estocástico propietario (caja negra) | SAP Help | oficial | alta | 2026 | Media | No auditable; lock-in |
| Casos reales (Zalando) extienden (R,s,Q) en vez de MEIO completo | Zalando Eng. blog | comercial | media | 2026 | Media | Un caso |
| Insurance spares se dimensionan por costo de parada, no rotación; Poisson/Compound-Poisson/ZIP | Kennedy 2002; Omega 2017 | academica | alta | 2002-2017 | Alta | Abstracts (paywall) |
| **Repuesto atado a PM+Equipment BOM = demanda DEPENDIENTE → MRP, no forecast** | SAP PM/MM; literatura mantenimiento | oficial/academica | media-alta | 2026 | Alta | Blogs de comunidad |
| Insumos/empaques = dependientes del plan de producción + shelf life | Implement Consulting; MRP | comercial | media | 2026 | Alta | Ejemplos farma |
| Consumo histórico ≠ demanda real (censored demand, spiral-down) | arXiv 2025 | academica | alta | 2025 | Alta | Dominio retail |
| Clasificar mal + SBA: ~25% menos MSE; caso ~13.6% menos valor de inventario | Syntetos-Boylan; caso REF UK | academica | media-alta | 2005 | Alta | Caso único |
| Fallo de adopción = gobernanza/datos, no sofisticación del modelo | StockIQ; change mgmt | comercial | media | 2026 | Alta | — |

(Matriz extendida en el JSON.)

## 8. Hallazgos principales

1. **Una política por celda de la matriz**, no una política única. SBC (patrón) × VED (criticidad) × ABC (valor) × XYZ (regularidad).
2. **Métricas correctas:** para intermitente NO usar MAPE; usar **MASE** y, sobre todo, **fill rate / nivel de servicio** como métrica de negocio.
3. **Dependiente ≠ independiente** es la decisión que más impacta. Mantenimiento y producción → MRP/plan; fallas aleatorias y consumo general → forecast.
4. **Repuestos críticos = seguro, no rotación.** Se dimensionan por riesgo y costo de parada (Poisson/Compound-Poisson), con nivel de servicio alto aunque casi no roten. **EOQ aquí es un error.**
5. **Estacionalidad pesquera = campañas.** Insumos/empaques de temporada se planifican por **plan de producción + newsvendor** (single-period), no por suavizado continuo.
6. **Red: pooling.** Centralizar lentos/caros/variables; descentralizar rápidos/baratos; comunes → central con reabastecimiento programado + transshipment; exclusivos → local por criticidad.
7. **Empezar clásico, optimizar después.** MEIO comercial (SAP IBP) es caja negra y exige datos limpios; los casos reales muestran que políticas clásicas bien parametrizadas resuelven la mayoría. El cuello de botella real es **calidad de datos y adopción**, no la sofisticación del modelo.

## 9. Contradicciones o tensiones entre fuentes

- **TSB vs SBA:** TSB es teóricamente insesgado pero empíricamente SBA lo supera en algunos casos de obsolescencia → probar ambos.
- **Vendors ("MEIO superior, rápido") vs ingeniería real (extensiones de (R,s,Q)).** La práctica favorece lo clásico bien hecho primero.
- **Repuestos "demanda independiente" (manuales introductorios) vs "dependiente" (mantenimiento/SAP PM).** Se resuelve según exista o no un plan formal que ate el consumo.
- **Square-root law** se cita como universal pero depende de colas ligeras (la demanda lumpy de repuestos es de cola pesada → el ahorro de pooling puede no cumplirse).
- **Cifras comerciales** (47% MTTR, 68% quiebres, 13.6% ahorro) son ilustrativas, no auditadas.

## 10. Comparación: modelos clásicos vs optimización

| Criterio | Clásico (ROP/EOQ/(s,S)/(R,S)/Croston-SBA/DRP) | Optimización (MEIO/newsvendor/MILP/sim) |
|---|---|---|
| Facilidad de implementación | Alta | Baja-Media |
| Datos requeridos | Moderados | Altos y limpios |
| Precisión esperada | Buena si bien parametrizado | Mayor en redes complejas |
| Explicabilidad | Alta | Baja (caja negra en comercial) |
| Costo | Bajo | Alto (licencia/expertise) |
| Mantenimiento | Bajo-Medio | Alto |
| Robustez ante estacionalidad | Media (requiere perfiles) | Alta (newsvendor/estocástico) |
| Repuestos intermitentes | Buena (Croston/SBA/TSB + criticidad) | Buena (METRIC/Poisson) |
| Insumos/empaques de campaña | Media (MRP+ROP estacional) | Alta (newsvendor) |
| Red central-satélite | Media (DRP+pooling heurístico) | Alta (MEIO) |
| Riesgo de sobreingeniería | Bajo | **Alto** |
| Software especializado | No (Excel/Python) | Sí (IBP/ToolsGroup) |
| Implementable en Excel/Python/Power BI/SAP | Sí | Parcial (IBP/optimizador) |

**Cuándo cada uno:** clásico simple (min-max/two-bin) para bajo valor/alta frecuencia; clásico especializado (Croston/SBA/TSB, newsvendor) para intermitente y campañas; optimización (MEIO) solo para el subconjunto de alto valor multi-echelon con datos limpios; **híbrido = recomendado**.

## 11. Segmentación de SKUs propuesta (5 dimensiones)

- **A — Patrón (SBC):** smooth · seasonal · intermittent · erratic · lumpy · non-moving · new.
- **B — Criticidad (VED):** crítico continuidad · importante · normal · bajo impacto · obsoleto/depurar.
- **C — Valor (ABC):** A (alto) · B (medio) · C (bajo) · C-alta-frecuencia.
- **D — Red:** común central+satélites · exclusivo de centro · compartido 2+ · solo central · solo flota · solo planta · CHD/congelado · harina/aceite · MRO transversal.
- **E — Abastecimiento:** LT corto · LT largo · importado · proveedor único · contrato marco · local · fabricación bajo pedido.

La **matriz primaria accionable = SBC (eje patrón) × VED (eje criticidad)**, con ABC/red/abastecimiento como modificadores de la política.

## 12. Políticas por segmento (matriz de decisión)

| Segmento (patrón + criticidad/valor) | Pronóstico | Reposición | Revisión | Nivel servicio |
|---|---|---|---|---|
| Smooth + bajo valor + alta frecuencia | Media móvil/SES | **min-max / two-bin / ROP** | Continua/visual | 90-95% |
| Smooth/seasonal + insumo producción | Plan de producción (dependiente) | **MRP/DRP + ROP estacional** | Por campaña | 95-98% |
| Seasonal + empaque de campaña | Plan + **newsvendor** (single-period) | Order-up-to por campaña | Pre-temporada | Ratio crítico |
| Intermittent MRO (independiente) | **Croston/SBA/TSB** | (s,Q) o (s,S) + SS por criticidad | Periódica | Según VED |
| Lumpy crítico | **Bootstrapping/Poisson** + revisión técnica | **Base-stock / insurance stock por riesgo de parada** | Periódica + HITL | 98-99% |
| Repuesto atado a PM (dependiente) | **NO forecast** → explosión de Equipment BOM vs plan PM | Reserva/MRP por evento | Por plan de mantenimiento | Por evento |
| Alto valor + lento movimiento | Revisión humana | **Buy-to-order** salvo criticidad | Bajo demanda | — |
| SKU común central-satélite | Agregado en central | **Central + reabastecimiento programado (DRP)**; transshipment | Periódica | Servicio satélite |
| SKU exclusivo de centro | Local | Min-max local por criticidad | Local | Según VED |
| Non-moving/obsoleto | — | **Depurar**; bloquear compra si hay stock en otro centro | Anual | — |

Reglas operativas: **consolidar compra** en contratos marco para C-alta-frecuencia; **VMI** para consumibles de alto volumen con proveedor colaborativo; **bloquear compra** si hay stock disponible en otro centro (visibilidad de red); **escalar a mantenimiento/operaciones** cualquier cambio de stock de repuesto crítico.

## 13. Modelo central-satélite

- **En central:** lentos, caros, variables, importados/LT largo, comunes a varios centros (pooling). Safety stock central dimensionado sobre demanda agregada.
- **En satélite:** rápidos, baratos, alta frecuencia, críticos locales de respuesta inmediata. Safety stock local mínimo.
- **En ambos:** comunes de alto consumo → central abastece con **reabastecimiento programado**; satélite mantiene buffer corto.
- **30-40% comunes:** política central (pooling) + DRP; evitar duplicar safety stock en cada satélite.
- **5% exclusivos:** política local por criticidad.
- **Transferencias (transshipment):** permitidas como complemento ante quiebres; con umbral de stock position y registro.
- **Mover SKU central↔satélite:** decisión por rotación + criticidad + LT (si la demanda local crece y es rápida → descentralizar; si es lenta/cara → centralizar).

## 14. Vínculo con mantenimiento y producción

- **Mantenimiento:** preventivo (PM) + Equipment BOM → demanda **dependiente** proyectable 3-6 meses → MRP/reserva por evento; paradas/overhaul → kits por evento; repuestos por falla aleatoria → independiente (Croston/SBA + insurance stock). Integrar **SAP PM (planes, BOM de equipo) ↔ SAP MM (reservas, MRP)**.
- **Producción:** insumos y empaques → **dependientes del plan de producción** (consumo por tonelada/caja/bolsa) → MRP por campaña; safety stock por variabilidad de proceso y LT; vigilar **shelf-life/obsolescencia** de empaques e insumos.

## 15. Riesgos y controles

| Riesgo | Impacto | Probabilidad | Control |
|---|---:|---:|---|
| Clasificar mal un SKU (crítico intermitente como smooth) | Alto | Media | Matriz SBC×VED auditada; revisión de muestras |
| Aplicar EOQ/forecast a repuesto crítico o demanda dependiente | Alto | Media | Split dependiente/independiente explícito; MRP para PM/producción |
| Confundir consumo histórico con demanda (censored) | Alto | Alta | Registrar quiebres; corregir censura; no leer demanda solo del consumo |
| Optimizar sobre datos sucios | Alto | Alta | **Saneo de datos maestros como prerrequisito** (LT, criticidad, UoM) |
| Reducir stock de repuesto crítico → parada | Alto | Media | HITL obligatorio; escalar a mantenimiento; nivel de servicio por criticidad |
| Duplicar stock en satélites | Medio | Alta | Pooling/centralización; visibilidad de red; bloqueo de compra cruzada |
| Ignorar variabilidad de lead time | Medio | Alta | Safety stock con σ(demanda) **y** σ(LT) |
| Sobreingeniería sin adopción | Alto | Media | Empezar simple; gestión del cambio; ownership del forecast |
| No separar mantenimiento/producción/emergencia | Alto | Media | Etiquetar origen de demanda; tres flujos distintos |
| Tratar todos los centros igual | Medio | Media | Política por centro según rol y demanda local |
| Gobernanza de parámetros débil | Medio | Media | Quién aprueba cambios de min-max/SS (estilo COSO); versionado |

## 16. Recomendación final (responde las 12 preguntas)

1. **¿Clásico, optimización o híbrido?** → **Híbrido**, empezando clásico diferenciado; optimización donde paga.
2. **¿Método por tipo de SKU?** → tabla §12.
3. **¿Cómo clasificar?** → **SBC (ADI/CV²) × VED × ABC × XYZ**, + red + abastecimiento.
4. **Demanda constante** → SES/Holt-Winters + **min-max/ROP/(s,Q)**.
5. **Repuestos intermitentes** → **Croston/SBA/TSB** + (s,S)/base-stock + SS por criticidad.
6. **Demanda estacional** → perfil por campaña + **MRP/DRP** + **newsvendor** para empaques de temporada.
7. **Materiales críticos** → **insurance stock por riesgo de parada** (Poisson/Compound-Poisson), 98-99%, HITL.
8. **Red central-satélite** → pooling: central para lentos/caros/comunes (DRP + reabastecimiento programado), satélite para rápidos/locales, transshipment como complemento.
9. **¿Qué datos internos?** → 5 años de consumos con fecha/centro; quiebres registrados; maestros (material/servicio/proveedor/equipo); functional locations + Equipment BOM; planes PM y de producción; lead times (y su variabilidad); costos (holding, parada); UoM; clasificación criticidad.
10. **¿Qué PoC primero?** → 1 familia estacional (insumo/empaque) + 1 familia de repuestos MRO intermitentes en 1 centro: clasificar (SBC), corregir dependiente/independiente, parametrizar políticas, simular fill rate vs capital.
11. **¿Herramientas?** → **Python (statsmodels, scikit, simulación) + Power BI** para análisis; **SAP MM** para ejecución; **SAP IBP** solo si se justifica MEIO. Excel para prototipo/comunicación.
12. **¿Roadmap?** → §17.

**Arquitectura — Inventory Planning Council Harness (14 subagents):** Demand Pattern Classifier · Seasonality Analyst · SKU Criticality Analyst · MRO Spare Parts Analyst · Production Inputs Analyst · Packaging Analyst · Multi-Echelon Inventory Analyst · Forecasting Model Selector · Replenishment Policy Designer · Optimization Analyst · Safety Stock Analyst · Inventory Simulation Agent · SAP Data Quality Auditor · Final Inventory Arbiter. Orquestador = Dynamic Workflow; **HITL** en críticos; logs/trazabilidad; outputs para SAP/Excel/Power BI.

## 17. Próximos pasos — Roadmap

**Días 0-30 — Datos y clasificación:**
- Cargar 5 años de consumos; **SAP Data Quality Auditor** (LT, criticidad, UoM, quiebres).
- Calcular **ADI y CV²** por SKU; clasificar SBC; cruzar VED/ABC; detectar estacionalidad; marcar dependiente vs independiente.
- Entregables: `demand_classification.csv`, `sku_segmentation.csv`, `data_requirements.md`.

**Días 31-60 — Políticas y simulación (PoC):**
- Selección de forecast por segmento; diseño de políticas; **safety stock** con variabilidad de LT; **newsvendor** para empaques de campaña.
- Simular fill rate y capital inmovilizado (clásico vs optimización) en la familia piloto.
- Entregables: `inventory_policy_by_sku.csv`, `forecast_model_recommendation.csv`, `safety_stock_parameters.csv`, `seasonal_profile_by_sku.csv`, `critical_spares_report.md`.

**Días 61-90 — Red, optimización y gobernanza:**
- `central_satellite_policy.csv`; análisis de pooling/centralización; reglas de transshipment.
- `optimization_feasibility_report.md` (¿MEIO sí/no?); `dashboard_metrics.md`; gobernanza de parámetros.
- Versión inicial del **Inventory Planning Council Harness** como copiloto.
- Entregable: `implementation_plan_30_60_90.md`.

**Meses 4-12:** escalar por familias; integrar SAP PM↔MM (demanda dependiente); evaluar SAP IBP/MEIO para alto valor; consolidar contratos marco/VMI; institucionalizar S&OP estacional.

### Métricas de éxito
Fill rate · nivel de servicio · stockout rate · inventory turnover · días de inventario · valor de inventario · stock obsoleto/lento · compras de emergencia · transferencias inter-almacén · **forecast accuracy con MASE/WAPE (no MAPE para intermitente)** · forecast bias · accuracy por patrón · reducción de quiebres · reducción de capital inmovilizado · reducción de compras urgentes · cumplimiento de mantenimiento programado.

## 18. Límites del análisis

- **No hay evidencia pesquera específica**; proxies de minería, oil&gas, manufactura, food, retail. Las cuotas/vedas como evento no fueron cubiertas por la literatura → modelar como eventos con el plan.
- Parámetros (niveles de servicio, costos de parada, LT) **deben venir de datos reales**; las cifras comerciales son ilustrativas, no auditadas.
- Varios textos clásicos (Silver-Pyke-Peterson, Axsäter, Zipkin) y papers tras **paywall**: fórmulas vía fuentes secundarias, verificar en primarias antes de codificar.
- SAP: comportamiento exacto de MRP types/IBP depende de versión (ECC vs S/4HANA) y configuración.
- Sin auditoría de calidad de datos, la viabilidad de MEIO no puede afirmarse.

## 19. Anexos

- Hallazgos JSON por investigador y matriz extendida: `outputs/json/2026-06-18_research-council_inventory-replenishment-fishery-seasonal-demand.json`.
- Reportes relacionados: `..._exalmar-category-taxonomy.md` (la taxonomía es prerrequisito de la segmentación), `..._tail-spend-agentic-procurement.md`.
- Rúbricas: `rubrics/procurement-research.md`, `rubrics/technology-comparison.md`, `rubrics/source-quality.md`.
- Investigadores: academic, supply-chain, technical, procurement, risk-and-controls. Patrones: fan-out, generate&filter, contradiction-finding, adversarial verification.
