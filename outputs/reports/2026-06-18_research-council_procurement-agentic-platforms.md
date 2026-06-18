# Research Council Report: Plataformas y sistemas agénticos de Procurement (estado del mercado 2024–2026 y arquitectura de referencia para un harness propio)

> ⚠️ **Requiere revisión humana.** Este reporte es un insumo de decisión, no una decisión. Las capacidades de producto provienen mayoritariamente de fuentes de los propios proveedores (marketing); se marca explícitamente lo no verificado. Fecha: 2026-06-18.

## 1. Resumen ejecutivo

El mercado de Procurement con IA vive una transición acelerada (2024–2026) de **copilotos conversacionales** hacia **sistemas agénticos**. Hay dos pelotones claros:

- **Suites integrales S2P/P2P** (las "grandes"): **SAP Ariba + Joule**, **Coupa + Navi**, **Ivalua + IVA Studio**, **GEP SMART + Quantum Intelligence (Qi)**, **Zycus + Merlin**, **Jaggaer + JAI**, **Oracle**. Los **Leaders del Gartner Magic Quadrant Source-to-Pay 2025/2026** son **SAP, Oracle, Coupa, GEP e Ivalua** (según comunicados de los propios vendors; el informe Gartner está tras paywall).
- **Especialistas best-of-breed**: **Keelvar** y **Fairmarkit** (sourcing autónomo / tail spend), **Zip** (orquestación agéntica e intake), **Arkestro** (price intelligence predictivo), **Globality** (sourcing conversacional), **Scoutbee** (supplier discovery — **adquirida por Coupa en oct-2025**), **Sievo** (spend analytics, #1 Spend Matters varios años).

**Hallazgo central:** la mayoría de lo etiquetado como "agéntico" hoy es, con evidencia técnica verificable, **automatización avanzada + copiloto**, y buena parte de las funciones agénticas más promocionadas (Next-Gen Ariba, Ivalua IVA Studio, Zycus ANA) estaban en **beta o roadmap** —no en disponibilidad general (GA)— en el momento de su anuncio. La **autonomía real** documentada se limita a compras de bajo valor dentro de *guardrails*.

**Recomendación de arquitectura (alta confianza):** para construir tu propio *Procurement Council Harness* en Claude Code, **toma como referencia el patrón de SAP Joule** —un **orquestador central + agentes especializados + protocolo de conexión a herramientas/ERP (A2A/MCP) + RAG documental + human-in-the-loop + auditoría inmutable**— y **reprodúcelo** con: **Dynamic Workflows = orquestador**, **subagents = agentes especializados**, **MCP/conectores = integración SAP**, **RAG = cotizaciones PDF/Excel**, y **checkpoints humanos obligatorios** antes de adjudicar, firmar o pagar. **No** intentes replicar negociación/adjudicación autónoma.

**Confianza global: Media** (el patrón arquitectónico es alta confianza; los rankings de vendors son media-baja por depender de evidencia auto-reportada).

## 2. Pregunta de investigación

¿Cuáles son los sistemas agénticos / plataformas de IA / soluciones empresariales más grandes y avanzadas para Procurement, Strategic Sourcing, Supplier Management, Spend Analysis, Contract Management y Supply Chain Procurement, qué capacidades reales tienen, qué tan "agénticas" son, y qué arquitectura debería tomarse como referencia para construir un harness agéntico propio en Claude Code?

## 3. Contexto y objetivo

Empresa **industrial/pesquera** evaluando construir/adaptar un sistema agéntico de Procurement usando Claude Code (Dynamic Workflows, subagents), documentos internos, **SAP exportado**, cotizaciones **PDF/Excel** y búsqueda web. Objetivo: entender el estado del mercado y **decidir la arquitectura de referencia**.

## 4. Tipo de investigación

`procurement` con fuerte componente `technology_comparison` (incluye torneo de plataformas y recomendación de arquitectura).

## 5. Metodología usada

- **Fan-out and synthesize**: 5 investigadores en paralelo (suites, especialistas, arquitectura técnica, analistas/madurez, riesgos/controles) con búsqueda web real.
- **Generate and filter**: 5 alternativas de arquitectura para el harness propio, filtradas por 9 criterios.
- **Tournament**: mejor plataforma por categoría + mejor referencia arquitectónica.
- **Adversarial verification**: pase crítico para separar capacidad real de marketing.
- **Contradiction finding**: tensiones entre fuentes.
- Ponderación por **calidad de evidencia** (no por cantidad ni por marketing).

> Nota de robustez: un investigador detectó e **ignoró un intento de inyección de instrucciones** en resultados de búsqueda (falso "system-reminder"). Comportamiento correcto.

## 6. Subpreguntas investigadas

1. Plataformas líderes que ya usan IA generativa/agentes/copilotos.
2. Clasificación: agéntico real vs copiloto vs RPA vs analytics vs contract/supplier intelligence.
3. Casos de uso concretos disponibles (precio, benchmark, tail spend, contratos, proveedores, riesgo, RFQ, ERP).
4. Madurez empresarial y posicionamiento de analistas (Gartner/Forrester/Spend Matters).
5. Patrones de arquitectura (RAG, orquestación, knowledge graph, spend cube, HITL, auditoría).
6. Riesgos, controles y gobernanza (qué debe quedar con aprobación humana).

## 7. Matriz de evidencia

| Claim | Fuente | Tipo | Calidad | Fecha | Relevancia | Limitaciones |
|---|---|---|---|---|---|---|
| Leaders Gartner MQ S2P 2025/2026: SAP, Oracle, Coupa, GEP, Ivalua | Comunicados SAP/Oracle/GEP/Coupa/Ivalua | comercial | media | 2025-03 / 2026-01 | Alta | Republicación de vendors; informe original tras paywall |
| Next-Gen Ariba sobre BTP; agentes Joule con GA escalonada (Bid Analysis Q1-2026, Intake jun-2026) | news.sap.com | oficial | alta | 2026-03 | Alta | Vendor; mezcla GA con roadmap; sin validación de autonomía independiente |
| Coupa Navi: agentes de sourcing/intake; ~$15B ahorros acumulados Q3-FY26 | coupa.com newsroom | oficial | media | 2025-11 / 2025-12 | Media | Cifras auto-reportadas, sin metodología ni auditoría |
| Ivalua IVA Studio "fully agentic, ejecuta cualquier proceso S2P desde día uno"; soporte MCP | prnewswire / morningstar | oficial | media | 2026-06-11 | Alta | **Beta**, GA verano-2026; afirmación de autonomía = marketing no verificado |
| Keelvar Kai (orquestador) + agentes especializados; "85% de sourcing automatizado" | keelvar.com | comercial | media | 2025 | Alta | Cifra auto-reportada sin metodología |
| Keelvar en Gartner Market Guide 2026 (Advanced Sourcing Optimization + Autonomous Sourcing) | keelvar.com newsroom | secundaria | media | 2026 | Media | Market Guide ≠ Magic Quadrant (no es ranking competitivo) |
| Fairmarkit "Total Agentic Sourcing" (tail+estratégico), integración SAP Ariba/S4HANA | businesswire | comercial | media | 2026-04 | Alta | Comunicado; producto en beta privada; cifras de cliente sin metodología |
| Zip: "Agentic Procurement Orchestration", 50+ agentes, $355B spend procesado 2025 | pymnts.com; SAP partner listing | secundaria/oficial | media/alta | 2025 | Media | Cifras del propio Zip; listing SAP confirma partnership no profundidad |
| Scoutbee adquirida por Coupa | coupa.com newsroom | oficial | alta | 2025-10-06 | Alta | Hecho confirmado; deja de ser especialista independiente |
| Sievo #1 spend analytics Spend Matters (años consecutivos); enfoque >$1B ingresos | sievo.com; spendmatters | comercial | media | 2025 | Alta | Ranking de analista (más creíble) pero cifras de ahorro auto-reportadas |
| SAP Joule = orquestador central; pro-code con LangGraph/CrewAI/AG2/Smolagents; A2A | architecture.learning.sap.com | oficial | alta | 2026 | Alta | Doc cambia frecuentemente; no detalla HITL |
| MCP estándar agente-herramienta; donado a Agentic AI Foundation (Linux Foundation) dic-2025 | blog.modelcontextprotocol.io | oficial | alta | 2026 | Alta | Sin casos de procurement con métricas verificables |
| Knowledge graph para grounding de LLM (reduce alucinación) | SAP Community; arxiv | oficial/academica | media/alta | 2025 | Media | "spend cube" no aparece en literatura académica (es jerga OLAP) |
| Autonomía real limitada; supervisión humana embebida; adopción experimental | arxiv 2601.13671 (survey) | academica | alta | 2026-01 | Alta | No específico de procurement |
| Alucinaciones no eliminadas; peligrosas en pago/compliance | arxiv 2507.19183 | academica | media | 2025 | Alta | Preprint; generaliza |
| EU AI Act: alto riesgo solo Anexo III; cumplimiento pleno 2-ago-2026; B2B no automático | artificialintelligenceact.eu; ec.europa.eu | oficial | alta | 2024/2026 | Alta | Aplicabilidad a procurement B2B requiere análisis legal caso por caso |
| NIST AI RMF e ISO 42001 = voluntarios; exigen supervisión humana y registros | nist.gov; deloitte | oficial/comercial | alta/media | 2023 | Alta | Voluntarios salvo exigencia contractual/sectorial |
| Aprobación humana obligatoria en adjudicación/firma/pago; segregación de funciones | múltiples (OWASP, approveit, jaggaer) | secundaria/comercial | media | 2025 | Alta | Buenas prácticas; no norma textual única |

(Matriz extendida en el JSON adjunto.)

## 8. Hallazgos principales

1. **"Agéntico" está sobrecargado como término de marketing.** Con evidencia técnica, la mayoría de las suites son híbridos copiloto+workflow. La autonomía verificable se limita a compras de bajo valor con *guardrails* (p. ej. SAP Ariba Guided Buying).
2. **Brecha anuncio→GA de 6–12 meses.** Next-Gen Ariba (rollout 2026–2027), Ivalua IVA Studio (beta→GA verano-2026), Zycus Merlin/ANA y Jaggaer JAI Autopilot (2026) ilustran que el reconocimiento de analistas **precede** a la disponibilidad real de las funciones agénticas.
3. **Liderazgo de mercado (analistas):** SAP, Oracle, Coupa, GEP, Ivalua (S2P suites). Zycus aparece como "Visionary", no Leader.
4. **Especialistas con la mecánica agéntica más concreta:** Keelvar (agentes nombrados + orquestador Kai), Fairmarkit (tail+estratégico) y Zip (orquestación/intake). Sievo domina spend analytics. Scoutbee ya es parte de Coupa.
5. **Patrón arquitectónico convergente:** orquestador central (Joule) + agentes especializados + A2A/MCP + RAG/knowledge graph + IDP documental + HITL + auditoría inmutable. **Es directamente transferible a Claude Code.**
6. **Integración SAP:** documentación técnica más específica en **Zycus** (conector S/4HANA, 20+ escenarios, SAP Business Accelerator Hub) y **GEP** (SAP Adapter). En el resto es más genérica.
7. **Riesgos materiales reales:** alucinación no nula, fallas en cascada multiagente, fraude por agente comprometido, fuga de datos, sesgo de proveedor, vendor lock-in multicapa.

## 9. Contradicciones o tensiones entre fuentes

- **Marketing vs. evidencia académica:** vendors afirman autonomía operativa y cifras (70% reducción de ciclos, 50–100% mejoras); el survey académico (arxiv 2601.13671) y fuentes de compliance dicen que la autonomía real está acotada por supervisión humana y la adopción es **experimental**.
- **Reconocimiento de analista ≠ madurez agéntica:** Ivalua es Leader en Gartner pero su IA agéntica estaba en beta. El MQ evalúa la suite S2P global, no la madurez específica de las funciones agénticas recientes.
- **Instrumentos Gartner distintos:** Hype Cycle (Fairmarkit) y Market Guide (Keelvar) **no** son el Magic Quadrant; no implican ranking competitivo.
- **Gobernanza "obligatoria de facto" vs. realidad legal:** fuentes comerciales presentan NIST/ISO/EU AI Act como casi obligatorios para todo; las fuentes oficiales aclaran que NIST AI RMF e ISO 42001 son **voluntarios** y la EU AI Act es obligatoria solo para Anexo III.
- **SOX e IA:** algunas fuentes tratan "todo agente = riesgo SOX"; SOX no menciona IA y aplica solo si el proceso impacta materialmente el reporte financiero.

## 10. Alternativas identificadas (para construir el harness propio)

1. **Harness propio en Claude Code** (Skill + Dynamic Workflows + subagents + RAG + HITL) — *lo que ya construimos como base.*
2. **Comprar el módulo agéntico de una suite** (SAP Joule / Coupa Navi / Ivalua IVA).
3. **Especialista best-of-breed** para un caso (Keelvar/Fairmarkit en sourcing/tail; Sievo en spend).
4. **Orquestación custom con n8n/LangGraph** + LLMs + APIs.
5. **Híbrido**: suite para lo transaccional/compliance + harness propio para investigación, validación de precios, benchmark y triage de tail spend.

## 11. Comparación de alternativas

| Alternativa | Ventajas | Desventajas | Riesgo | Costo/Complejidad | Cuándo usarla |
|---|---|---|---|---|---|
| 1. Harness Claude Code propio | Máxima trazabilidad y control; barato de iterar; sin lock-in; encaja con SAP exportado + PDF/Excel; HITL nativo | No es S2P transaccional; tú mantienes; sin red de proveedores | Bajo-medio (operativo) | Bajo-medio | Investigación, validación de precios, benchmark, tail spend triage, extracción documental |
| 2. Módulo agéntico de suite | Madurez, soporte, red de proveedores, integración SAP de fábrica | Costo alto; lock-in; muchas funciones en beta/roadmap; caja negra | Medio (lock-in, GA inmadura) | Alto | Reemplazo/upgrade de la plataforma S2P completa |
| 3. Especialista best-of-breed | Profundidad en un caso (sourcing/tail/spend) | Silo; otra integración; algunos en beta; Scoutbee ya absorbido | Medio | Medio | Un dolor concreto y acotado (p. ej. tail spend) |
| 4. n8n/LangGraph custom | Flexible, código abierto | Tú construyes orquestación/seguridad/auditoría desde cero; más mantenimiento | Medio-alto | Alto | Equipo con ingeniería fuerte y necesidad multi-herramienta |
| 5. Híbrido (suite + harness) | Combina compliance transaccional con agilidad de investigación | Dos cosas que gobernar; límites de responsabilidad | Medio | Medio-alto | Empresa que ya tiene/comprará suite y quiere capa de investigación propia |

## 12. Análisis adversarial

- **¿Qué claims parecen marketing?** "Negociación autónoma" (Zycus ANA), "ejecuta cualquier proceso S2P desde el día uno" (Ivalua IVA), "orquestación agéntica total" (GEP/Coupa), y todas las cifras de ROI/ahorro/aceleración (auto-reportadas, sin metodología ni auditoría).
- **¿Qué no está suficientemente probado?** El grado real de autonomía sin intervención humana en producción; el uso **nativo** de MCP en procurement (mayormente prospectivo); las cifras de impacto; el listado completo y posiciones exactas del Gartner MQ (paywall).
- **¿Qué conclusión sería demasiado fuerte?** Decir "la plataforma X es la mejor" en abstracto. La evidencia soporta *patrones* y *posicionamiento de analistas*, no superioridad agéntica verificada.
- **¿Qué riesgos no evaluar a la ligera?** Fallas en cascada multiagente, fraude por agente comprometido, alucinación en validación de precios, fuga de datos sensibles (precios, contratos), vendor lock-in.
- **¿Qué alternativa se descartó injustamente?** Ninguna; el híbrido (5) merece más peso del que el marketing de "todo en la suite" suele conceder.
- **¿Qué requiere validación humana?** Adjudicación, firma de contrato, pago; clasificación legal bajo EU AI Act/SOX; cualquier cifra de ahorro antes de citarla en un caso de negocio.
- **¿Qué afirmación suavizar?** Toda referencia a "autonomía": usar "capacidades agénticas anunciadas, con autonomía acotada y verificación pendiente".

## 13. Riesgos y controles

| Riesgo | Impacto | Probabilidad | Control recomendado |
|---|---:|---:|---|
| Alucinación en validación de precios/datos | Alto | Media | Human-in-the-loop + validación contra PO/maestro SAP + umbral de confianza |
| Fallas en cascada entre agentes | Alto | Baja-Media | Aislar agentes, límites de alcance, verificación cruzada, kill-switch |
| Fraude por agente/proveedor comprometido | Alto | Baja | Verificación de proveedor independiente; segregación de funciones |
| Fuga de datos sensibles (precios/contratos) | Alto | Media | Datos locales, sin APIs externas, permisos mínimos, no enviar a terceros |
| Sesgo en selección de proveedores | Medio | Media | Criterios explícitos, auditoría de recomendaciones, revisión humana |
| Vendor lock-in (modelo/datos/orquestación) | Medio | Media | Lógica exportable, portabilidad de datos por contrato, estándares abiertos (MCP) |
| Decisión sin trazabilidad | Alto | Media | Logs inmutables (quién/qué/cuándo/por qué); auditoría diseñada, no añadida |
| No-cumplimiento EU AI Act / SOX | Alto | Condicional | Análisis legal de aplicabilidad; aprobación humana en hitos materiales |

## 14. Recomendación final

1. **Arquitectura de referencia = patrón "orquestador + agentes especializados + RAG + integración SAP + HITL + auditoría", al estilo SAP Joule, reproducido en Claude Code:**
   - **Dynamic Workflows** como orquestador (equivalente a Joule).
   - **Subagents especializados** por tarea (extracción documental, validación de precio, benchmark, clasificación de tail spend, riesgo de proveedor, redacción de RFQ).
   - **RAG documental** sobre cotizaciones PDF/Excel + SAP exportado (parsing/IDP + validación contra PO y maestro de proveedores).
   - **MCP/conectores** para integración con SAP cuando aplique.
   - **Checkpoints humanos obligatorios** antes de adjudicar, firmar o pagar; **segregación de funciones**; **logs inmutables**.
2. **Alcance recomendado del harness propio (fase 1):** *investigación, validación de precios, benchmark, triage de tail spend y extracción documental* — **no** negociación/adjudicación autónoma. Eso mantiene el riesgo bajo y el valor alto.
3. **Sobre comprar plataforma:** si ya hay/ habrá una suite S2P, ve por el **híbrido** (suite para transaccional/compliance + harness propio para la capa de investigación/validación). Para SAP-céntricos, **SAP (Joule) y Zycus/GEP** muestran la integración SAP más documentada.
4. **Antes de cualquier compra:** exige **demo técnica con tus datos**, **referencias de clientes en producción** (no logos), **% de transacciones gestionadas autónomamente vs. tasa de intervención humana**, fecha de **GA real** (no anuncio), y cláusulas de **portabilidad/anti-lock-in**.

## 15. Nivel de confianza

**Media.**
- **Alta** en: el patrón arquitectónico de referencia y la recomendación de mantener HITL (respaldado por fuentes oficiales y académicas).
- **Media-baja** en: rankings y superioridad de vendors específicos (evidencia auto-reportada; informes de analistas tras paywall; muchas funciones en beta/roadmap).

## 16. Qué evidencia cambiaría la conclusión

- Acceso al **informe Gartner/Forrester original** con posiciones y criterios exactos.
- **Casos de cliente auditados** (no notas de prensa) con métricas de autonomía real (% sin intervención humana).
- Evidencia de **MCP en producción** en procurement con garantías de seguridad/auditoría.
- Un **postmortem público** de un incidente agéntico en procurement (hoy inexistente en fuentes verificables).
- Confirmación de **GA** (no anuncio) de Next-Gen Ariba / IVA Studio / Merlin ANA con autonomía verificada.

## 17. Próximos pasos (para construir el harness propio)

1. **PoC de extracción documental**: subagent RAG sobre cotizaciones reales PDF/Excel; medir tasa de error vs. IDP comercial antes de asumir paridad.
2. **PoC de validación de precios**: agente que cruza cotización vs. SAP exportado + benchmark web, con HITL.
3. **Diseñar los gates humanos y la SoD** (solicitar/aprobar/recibir/pagar como roles distintos) y los **logs inmutables** desde el inicio.
4. **Definir umbrales de monto/riesgo** que disparan aprobación humana obligatoria.
5. **Análisis legal** de aplicabilidad EU AI Act/SOX a tu jurisdicción y sector (industrial/pesquero).
6. **RFI dirigido** a SAP/Coupa/Zycus/GEP solo si se considera el híbrido, exigiendo evidencia verificable.
7. Reusar este harness (`/research-council`) para profundizar cada vendor finalista.

## 18. Límites del análisis

- Evidencia de capacidades **mayoritariamente auto-reportada** por vendors; informes de analistas **tras paywall** (solo interpretaciones de vendors).
- Mercado **muy dinámico**: adquisiciones (Scoutbee→Coupa) y lanzamientos en beta cambian el cuadro en meses.
- Algunas cifras citadas por terceros (p. ej. "87% en 4 horas" de fallas en cascada; "70% reducción de ciclos" DoD) **no se pudieron verificar** en fuente primaria; tratadas como ilustrativas.
- No se investigaron en profundidad contract-intelligence puros (Icertis, Sirion) ni el detalle de Oracle.
- Sin acceso a tus datos internos reales (SAP, cotizaciones), el ajuste a tu caso es de referencia, no específico.

## 19. Anexos

- Hallazgos JSON completos por investigador y matriz de evidencia extendida: `outputs/json/2026-06-18_research-council_procurement-agentic-platforms.json`.
- Patrones y formato: `docs/workflow-patterns.md`. Rúbrica aplicada: `rubrics/procurement-research.md` + `rubrics/technology-comparison.md`.
- Investigadores: procurement, supply-chain, technical, enterprise-practices, risk-and-controls. Patrones: fan-out, generate&filter, tournament, contradiction-finding, adversarial verification.
