# Research Council Report: Tail Spend con IA/agentes y arquitectura de un Tail Spend Council Harness propio en Claude Code

> ⚠️ **Requiere revisión humana.** Insumo de decisión, no decisión. Capacidades de producto y cifras de ahorro provienen mayormente de los propios proveedores (marketing); se marca lo no verificado. Empresa: Exalmar (industrial/pesquera), entorno SAP. Fecha: 2026-06-18.

## 1. Resumen ejecutivo

El **tail spend** (compras menores, fragmentadas, de muchos proveedores) representa típicamente **~80% de las transacciones pero solo ~20% del gasto**, y la organización mediana deja **~7% del gasto sin gestionar** (Gartner, abr-2025). Es donde más se filtra valor y donde tu dolor es real: descripciones SAP incompletas, cotizaciones en PDF/JPG/DOC/Excel, proveedores fragmentados, OC tardías, HES incompletas.

**Estado del mercado:** los especialistas más maduros en sourcing autónomo de tail son **Keelvar** y **Fairmarkit** (GA real); **Zip** lidera intake-orchestration; **Zycus** (con IBM "Tailwinds") tiene el caso cuantificado más concreto; **SAP Ariba/Joule** trae agentes de intake/bid pero con GA escalonada a 2026 (roadmap/beta); **Sievo** es analítica (visibilidad, no ejecución). **Ninguna integra de forma nativa y verificable tus particularidades** (HES, cotizaciones anexas en SAP, español, sector pesquero).

**Lo técnico es factible y maduro en lo esencial:** clasificación de spend con ML clásico (**TF-IDF+SVM ~92-93%** sobre UNSPSC en estudios), extracción documental **híbrida OCR+LLM**, deduplicación con **fuzzy matching** (Jaro-Winkler), outliers de precio con **IQR**, y **RAG con Contextual Retrieval** (−49% a −67% de fallos de recuperación). **Pero no existe benchmark público de tu caso exacto** (líneas SAP cortas en español) → hay que **validar con un piloto propio**, no extrapolar cifras de marketing.

**Recomendación (alta confianza en la arquitectura):** **construir un Tail Spend Council Harness propio en Claude Code** (orquestador Dynamic Workflow + 11 subagents especializados + RAG documental + human-in-the-loop + logs/trazabilidad), en **modelo híbrido** con tu SAP (no reemplazarlo). Empezar como **copiloto analítico de decisión** (clasifica, normaliza, extrae, agrupa, compara precios, propone tarifarios y recomienda **aprobar/observar/renegociar**), con **toda decisión con compromiso real (OC, adjudicación, pago) bajo aprobación humana**. **Confianza global: media** (mercado y cifras = media-baja; viabilidad técnica y arquitectura = alta).

## 2. Pregunta de investigación

Profundizar en Tail Spend: cómo lo resuelven hoy los sistemas agénticos/copilotos/sourcing autónomo, y diseñar la arquitectura de un Tail Spend Council Harness propio en Claude Code para clasificar SAP desordenado, extraer cotizaciones, comparar precios, proponer tarifarios, consolidar proveedores, automatizar RFQs simples, auditar compliance y generar reportes de aprobar/observar/renegociar.

## 3. Contexto y objetivo

Empresa industrial/pesquera (Exalmar) con SAP. Dolor: descripciones SAP incompletas, cotizaciones PDF/JPG/DOC/Excel, proveedores fragmentados, baja estandarización, dificultad para comparar precios, control presupuestal débil, OC tardías, HES incompletas, ahorros no capturados. Objetivo: decidir **qué construir y cómo** para gestionar tail spend con IA, con plan de PoC.

## 4. Tipo de investigación

`procurement` + `technology_comparison` + diseño de arquitectura (`enterprise_ai`).

## 5. Metodología usada

Fan-out de 5 investigadores (fundamentos/prácticas, plataformas tail-spend, pipeline algorítmico/documental, literatura académica, riesgos/controles) con búsqueda web real → matriz de evidencia → generate&filter → **tournament** de alternativas → contradicciones → **verificación adversarial** → síntesis de arquitectura. Ponderación por calidad de evidencia.

## 6. Subpreguntas investigadas

Definición/métricas de tail spend; mejores prácticas; plataformas y su estado real (GA/beta/roadmap); pipeline algorítmico (clasificación, embeddings, clustering, dedup, outliers); procesamiento documental (OCR/IDP, validación SAP, cadena cotización→SOLPED→OC→HES→factura); literatura/benchmarks; riesgos y controles.

## 7. Matriz de evidencia

| Claim | Fuente | Tipo | Calidad | Fecha | Relevancia | Limitaciones |
|---|---|---|---|---|---|---|
| Tail spend ≈ 80% transacciones / 20% gasto; mediana deja ~7% sin gestionar; 60% adopción de tech tail para 2030 | Gartner Innovation Insight (vía Keelvar) | secundaria | alta | 2025-04 | Alta | Informe original tras paywall |
| No hay definición única de tail spend; umbrales propios por organización | Spendesk; Fairmarkit; Coupa; Keelvar | comercial | media | 2025-2026 | Alta | Marketing; heurística repetida sin estudio primario |
| Ahorro por gestión activa de tail ~7.1% (Hackett); solo 4% gestiona la mayoría de su tail | Hackett 2025 (vía Zycus) | comercial | media | 2025 | Media | Acceso solo vía intermediario comercial |
| Tail ≠ maverick ≠ spot ≠ táctico (distinción conceptual) | Zycus; CIPS (vía secundaria) | secundaria | media | 2025-2026 | Alta | CIPS citado de segunda mano; hay matices entre fuentes |
| UNSPSC: taxonomía jerárquica 4 niveles (~100k commodities) | GS1/UNECE | estandar | alta | 2005-2026 | Alta | Guía base de 2005 puede estar desactualizada |
| Keelvar/Fairmarkit: sourcing autónomo de tail en GA (MRO, spot, logística) | keelvar.com; fairmarkit.com | comercial | media | 2025 | Alta | Marketing; sin cliente nombrado con métricas auditadas; ambos reclaman exclusividad (incompatible) |
| Zycus+IBM "Tailwinds": $520M ahorro sobre $1.2B de tail en 5 años | zycus.com; procurementmag | comercial | media | 2025 | Media | Caso conjunto sin auditoría independiente |
| Zip: intake orchestration; $355B procesado/$6B ahorro (agregado, no solo tail) | businesswire | comercial | media | 2025-12 | Media | Cifras agregadas de toda la plataforma |
| SAP Joule: Bid Analysis Agent GA Q1-2026, Intake Agent GA jun-2026 | savictech (partner SAP) | secundaria | media | 2025-2026 | Alta | Fechas futuras; verificar release notes SAP |
| Sievo = spend analytics (visibilidad), no ejecuta sourcing/RFQ | sievo.com | comercial | media | 2025-2026 | Media | Marketing propio |
| Clasificación spend UNSPSC: TF-IDF+SVM ~92-93% accuracy | ResearchGate (paper) | academica | media | 2024 | Alta | Solo abstract; granularidad UNSPSC no confirmada |
| No hay benchmark público UNSPSC+LLM ni de líneas SAP en español | búsqueda arXiv/Scholar | academica | alta | 2026 | Alta | Ausencia de evidencia; exige piloto propio |
| Extracción documental: OCR ~99% en formularios estándar; LLM mejor en layout variable pero con "errores silenciosos"; híbrido recomendado | Vellum (blog técnico) | secundaria | media | 2025 | Alta | Blog de vendor; sin benchmark académico |
| LayoutLM/Donut F1 ~0.95-0.98 en CORD/SROIE (recibos inglés/coreano) | arXiv (KDD2020/ECCV2022) | academica | alta | 2019-2022 | Media | Dominio y layout distintos a líneas SAP en español |
| Contextual Retrieval (Anthropic) reduce fallos de RAG 49-67% | anthropic.com | oficial | alta | 2024 | Alta | Medido en casos generales, no en cotizaciones en español |
| IQR robusto para outliers en datos sesgados (típico de spend) | material estadístico | secundaria | media | s/f | Media | No validado en datos de compras reales |
| Alucinación en extracción financiera 15-25% sin salvaguardas; error tipo "$2,500/mes"→"$2,500" | Maxim AI; Vellum | comercial | baja-media | 2025 | Alta | Cifra comercial sin metodología; el patrón de error es real |
| EU AI Act art. 26: supervisión humana documentada para alto riesgo (pleno ago-2026) | artificialintelligenceact.eu | oficial | alta | 2024-2026 | Alta | Aplica si califica alto riesgo y opera en UE |
| SOX: segregación de funciones en P2P (crear proveedor / aprobar / pagar separados) | ramp; securityboulevard | secundaria | media | 2024-2026 | Alta | Obligatorio solo bajo SOX/equivalente |
| "Erosión del juicio del comprador" / checkbox approval en tail automatizado | Hackett (vía SupplyChain360) | secundaria | media | 2024-2025 | Alta | Fuente primaria no verificada (403) |

(Matriz extendida en el JSON.)

## 8. Hallazgos principales

1. **El tail spend es el caso de uso ideal para IA** por volumen/repetitividad, pero su valor real depende de la **calidad de los datos SAP** (garbage-in/garbage-out).
2. **Las plataformas comerciales no encajan llave-en-mano** en tus particularidades (HES, cotizaciones anexas en SAP, español, pesca). Lo "autónomo" que prometen es, con evidencia, **automatización + copiloto**; mucha función estrella está en roadmap/beta.
3. **La tubería técnica es construible hoy** con piezas maduras: normalización + clasificación (ML clásico o LLM), embeddings/clustering para familias, fuzzy matching para dedup, IDP híbrido para cotizaciones, IQR para precios atípicos, RAG con contextual retrieval.
4. **No hay benchmark público de tu caso** (líneas SAP cortas en español) → la decisión de enfoque (LLM vs ML clásico) debe salir de un **piloto medido con tu data etiquetada**.
5. **Los riesgos exigen human-in-the-loop**: alucinación en extracción (montos/moneda), clasificación errónea, deduplicación que fusiona proveedores distintos, recomendación sesgada, y la "erosión del juicio" si todo se vuelve un checkbox.
6. **Construir propio da máxima trazabilidad y encaje**, con bajo costo de iteración y sin lock-in; lo razonable es **híbrido con SAP** y arrancar como **copiloto de decisión**, no como ejecutor autónomo.

## 9. Contradicciones o tensiones entre fuentes

- **Definición 80/20**: unas fuentes lo aplican a proveedores, otras a transacciones (no equivalente).
- **Tail vs maverick**: CIPS (vía secundaria) los trata casi como sinónimos; Zycus/Ivalua los distinguen (tamaño/gestión vs incumplimiento de política).
- **Exclusividad de mercado**: Keelvar y Fairmarkit **ambos** afirman ser "el único" que une optimización+automatización end-to-end → marketing competitivo, no hecho.
- **OCR vs LLM**: blogs de IA presentan LLM como reemplazo total de OCR; la evidencia equilibrada dice **híbrido** (LLM tiene "errores silenciosos" y costo variable).
- **Cifras de accuracy de clasificación**: fuentes comerciales citan 60-70% hasta >95% sin metodología → no comparables.

## 10. Alternativas identificadas

1. **Comprar plataforma especialista de tail** (Keelvar/Fairmarkit/Zycus).
2. **Usar el módulo de tu suite S2P** (SAP Ariba/Joule, si lo tienes/tendrás).
3. **Construir harness propio en Claude Code** (Dynamic Workflows + subagents + RAG).
4. **Orquestación custom n8n/LangGraph** + LLMs + APIs.
5. **Híbrido**: harness propio (clasificación, extracción, benchmark, tarifarios, recomendación) + SAP para lo transaccional/compliance.

## 11. Comparación de alternativas

| Alternativa | Ventajas | Desventajas | Riesgo | Costo/Complejidad | Cuándo usarla |
|---|---|---|---|---|---|
| 1. Plataforma especialista tail | Madurez en sourcing autónomo; rápido | Costo alto; lock-in; no encaja HES/español/pesca; integración SAP a validar | Medio | Alto | Si el dolor es sourcing/RFQ de alto volumen y hay presupuesto |
| 2. Módulo de suite S2P | Integración SAP nativa; soporte | Muchas funciones en roadmap/beta; caja negra; caro | Medio | Alto | Si ya hay/ habrá Ariba y se quiere todo integrado |
| 3. **Harness propio Claude Code** | **Máxima trazabilidad y encaje; barato de iterar; sin lock-in; HITL nativo; usa SAP exportado + PDF/Excel** | Tú lo mantienes; no es S2P transaccional | **Bajo-medio** | **Bajo-medio** | **Investigación, clasificación, tarifarios, validación de precios, triage de tail** |
| 4. n8n/LangGraph custom | Flexible, open | Construir seguridad/auditoría/orquestación desde cero | Medio-alto | Alto | Equipo con ingeniería fuerte y muchas integraciones |
| 5. **Híbrido (harness + SAP)** | **Combina encaje y agilidad con lo transaccional/compliance** | Dos cosas que gobernar | **Bajo-medio** | Medio | **Recomendado para Exalmar** |

## 12. Análisis adversarial

- **Qué puede salir mal:** clasificación errónea de familias; extracción que lee mal monto/moneda/cantidad/plazo ("$2,500/mes"→"$2,500"); dedup que fusiona dos proveedores/materiales distintos; precio referencial calculado sobre datos sucios; recomendación de proveedor sesgada por histórico incompleto; "tarifario" que legitima precios malos.
- **Dónde alucina el modelo:** campos no presentes en la cotización (los inventa), unidades/moneda ambiguas, condiciones comerciales en texto libre, OCR de JPG de baja calidad.
- **Datos incompletos:** descripciones SAP truncadas, HES faltantes, cotizaciones sin fecha/moneda, proveedores con múltiples grafías.
- **Qué NUNCA debe ser autónomo:** crear/aprobar OC con compromiso real, adjudicar, firmar, pagar, cambiar proveedor crítico, publicar un tarifario oficial.
- **Controles humanos obligatorios:** validación humana de toda recomendación con impacto económico; segregación de funciones; umbrales de monto; doble aprobación sobre umbral; revisión de muestras de extracción.
- **Conclusión a suavizar:** nada de "ahorro de X%" sin medirlo en tu data; las cifras de mercado son referenciales.

## 13. Riesgos y controles

| Riesgo | Impacto | Probabilidad | Control recomendado |
|---|---:|---:|---|
| Extracción errónea de monto/moneda/cantidad | Alto | Media-Alta | HITL + validación contra SAP/PO + doble lectura (OCR+LLM) + flag de baja confianza |
| Clasificación de spend incorrecta | Medio | Media | Revisión humana de muestras; umbral de confianza; familia "sin clasificar" |
| Deduplicación que fusiona entidades distintas | Alto | Media | Fuzzy matching con umbral conservador + confirmación humana antes de fusionar |
| Precio referencial sobre datos sucios | Alto | Media | Limpiar antes de calcular; marcar n y dispersión; IQR para outliers; no publicar sin revisión |
| Recomendación de proveedor sesgada | Medio | Media | Criterios explícitos; mostrar evidencia; humano decide |
| "Erosión del juicio" (checkbox approval) | Alto | Media | Mantener decisión humana real; mostrar el "por qué"; rotación/auditoría de aprobaciones |
| Fraude/colusión proveedor-empleado | Alto | Baja | Segregación de funciones; alertas de anomalía; trazabilidad |
| Fuga de datos de precios/contratos | Alto | Media | Datos locales, sin APIs externas, permisos mínimos |
| HES incompletas que invalidan el caso | Medio | Alta | HES/Service Evidence Auditor; bloquear conclusión si falta evidencia |
| No-cumplimiento SOX/EU AI Act | Alto | Condicional | Análisis legal; supervisión humana documentada; logs inmutables |

## 14. Recomendación final

**Construir un Tail Spend Council Harness propio en Claude Code, en modelo híbrido con SAP, operando primero como copiloto de decisión (no ejecutor autónomo).**

### Arquitectura del harness
- **Orquestador:** Dynamic Workflow `tail-spend-council` (equivalente a Joule) que coordina los subagents; degrada a modo subagents si Dynamic Workflows no está disponible.
- **RAG documental** sobre cotizaciones (PDF/JPG/DOC/Excel) + SAP exportado, con **Contextual Retrieval**.
- **Almacén estructurado** que modela la cadena **cotización → SOLPED → OC → HES → factura** con claves de trazabilidad a SAP.
- **Human-in-the-loop** en cada salida con impacto económico; **logs inmutables** (quién/qué/cuándo/por qué).

### 11 subagents propuestos (concretos)
1. **Description Normalizer** — limpia/normaliza descripciones SAP (abreviaturas, unidades, ruido). *tools: Read.*
2. **Tail Spend Classifier** — clasifica líneas a categoría/UNSPSC (familia/clase). *Read.*
3. **Document Extractor** — IDP de cotizaciones: ítems, alcance, unidad, cantidad, moneda, plazo, garantía, condiciones. *Read (multimodal).*
4. **Service Family Builder** — embeddings + clustering → familias tarifables. *Read.*
5. **Price Benchmark Analyst** — precio histórico, outliers (IQR), precio referencial con n y dispersión. *Read.*
6. **Supplier Consolidation Analyst** — similitud/dedup de proveedores, fragmentación, candidatos a consolidar. *Read.*
7. **RFQ Automation Agent** — **borrador** de RFQ simple (lo envía un humano). *Read.*
8. **Compliance Auditor** — política, maverick, umbrales, segregación de funciones. *Read.*
9. **HES/Service Evidence Auditor** — completitud de HES vs OC/cotización; bloquea si falta evidencia. *Read.*
10. **Savings Estimator** — ahorro potencial (identificado vs realizado), con supuestos explícitos. *Read.*
11. **Final Procurement Arbiter** — consolida y emite veredicto por caso: **aprobar / observar / renegociar** (recomendación; humano decide). *Read, Write (reporte).*

### Flujo operativo
Carga data SAP → **normalización** → **clasificación** → **enriquecimiento documental** (extracción de cotizaciones) → **agrupación en familias** → **detección de oportunidades** (precio atípico, fragmentación, repetición) → **priorización** → **validación humana** → **generación de tarifarios** → **seguimiento de ahorros**.

### Matriz de priorización (qué atacar primero)
Puntuar cada familia/categoría (1-5) y ponderar:

| Criterio | Peso sugerido |
|---|---:|
| Valor económico | 20% |
| Potencial de ahorro | 20% |
| Frecuencia / repetitividad | 15% |
| Variabilidad de precio | 10% |
| Nº de proveedores (fragmentación) | 10% |
| Facilidad de automatización | 10% |
| Calidad de datos | 5% |
| Criticidad operacional | 5% (alta criticidad = más cautela) |
| Riesgo de compliance | 5% (alto = más control humano) |

Empezar por familias de **alto valor + alta repetitividad + alta variabilidad de precio + buena calidad de datos** (típicamente mantenimiento, transporte, repuestos recurrentes).

### Qué NO automatizar todavía
Adjudicación, creación/aprobación de OC con compromiso, firma, pago, cambio de proveedor crítico, publicación de tarifario oficial. Todo eso = recomendación + aprobación humana.

## 15. Nivel de confianza

**Media.** Alta en la **viabilidad técnica y la arquitectura** (piezas maduras, patrón probado, riesgos mitigables con HITL). Media-baja en **cifras de mercado y de ahorro** (heurísticas y datos auto-reportados; sin benchmark de tu caso exacto).

## 16. Qué evidencia cambiaría la conclusión

- Un **piloto propio** que mida accuracy de clasificación y extracción sobre tu data real (podría favorecer comprar vs construir según resultado/costo).
- Evidencia de una plataforma con **integración SAP nativa + manejo de HES + español** verificable en cliente real.
- Un benchmark público de **clasificación de líneas SAP en español**.
- Costos reales de LLM a tu volumen mensual de cotizaciones (viabilidad económica).

## 17. Próximos pasos — Plan de PoC 30/60/90

**Días 0-30 — Datos y extracción (probar lo más incierto primero):**
- Exportar muestra SAP (p. ej. 12-24 meses de una categoría) + 50-100 cotizaciones reales (PDF/JPG/DOC/Excel).
- Construir Description Normalizer + Tail Spend Classifier; **etiquetar a mano** 200-500 líneas para medir accuracy (ML clásico vs LLM).
- Document Extractor sobre las cotizaciones; medir **precisión por campo** (ítem, cantidad, unidad, moneda, plazo) y tasa de "errores silenciosos".
- Entregable: informe de viabilidad con accuracy real + costo por documento.

**Días 31-60 — Familias, precios y consolidación (1 categoría piloto):**
- Service Family Builder + Price Benchmark Analyst (IQR) + Supplier Consolidation Analyst.
- Generar **1-2 tarifarios** validados por humano; lista de candidatos a consolidación.
- Definir el **almacén estructurado** cotización→SOLPED→OC→HES→factura y los **gates HITL** + logs.
- Entregable: tarifario piloto + oportunidades priorizadas.

**Días 61-90 — Recomendación, compliance y ahorros:**
- RFQ Automation Agent (borradores) + Compliance Auditor + HES Auditor + Savings Estimator + Final Procurement Arbiter.
- Dashboard de seguimiento (ahorro identificado vs realizado).
- Definir umbrales de monto y segregación de funciones; análisis legal SOX/EU AI Act si aplica.
- Entregable: harness piloto end-to-end (copiloto) sobre 1 categoría + caso de negocio para escalar.

### Métricas de éxito
% de gasto clasificado · accuracy de clasificación vs humano · precisión de extracción por campo · nº de familias tarifables creadas · % de tail bajo gestión · ahorro identificado vs realizado · tiempo de ciclo de OC · % de HES completas · **tasa de override humano** (señal de calidad del copiloto) · costo por documento procesado.

## 18. Límites del análisis

- Cifras de mercado/ahorro mayormente **comerciales auto-reportadas**; informes de analistas tras paywall.
- **No hay benchmark público** de clasificación de líneas SAP en español ni de extracción de cotizaciones en español → exige validación propia.
- Algunas fuentes (Hackett, McKinsey) **no verificadas en primaria** (403/segunda mano).
- Sin acceso a tu data real, los pesos de priorización y el alcance son de **referencia**, ajustables con el PoC.
- No se evaluó costo total de propiedad detallado de cada plataforma comercial.

## 19. Anexos

- Hallazgos JSON por investigador y matriz extendida: `outputs/json/2026-06-18_research-council_tail-spend-agentic-procurement.json`.
- Reporte previo relacionado: `outputs/reports/2026-06-18_research-council_procurement-agentic-platforms.md`.
- Rúbricas aplicadas: `rubrics/procurement-research.md`, `rubrics/technology-comparison.md`, `rubrics/source-quality.md`.
- Investigadores: procurement, supply-chain, technical, academic, risk-and-controls. Patrones: fan-out, generate&filter, tournament, contradiction-finding, adversarial verification.
