# Research Council Report: Taxonomía de gestión de categorías de Procurement para Pesquera Exalmar (flota + harina/aceite + congelado) y diseño de un Exalmar Taxonomy Council Harness

> ⚠️ **Requiere revisión humana.** Insumo de decisión, no decisión. **No existe un estándar de taxonomía de compras pesquero**: la propuesta de este reporte es una **hipótesis de diseño** a validar con datos reales de Exalmar y talleres con compradores y usuarios técnicos. Las cifras de proveedores se marcan como no auditadas. Fecha: 2026-06-18.

## 1. Resumen ejecutivo

Exalmar necesita una **taxonomía propia de compras** (procurement-operativa), no una copia de un estándar externo. La evidencia es contundente en tres puntos:

1. **No existe un estándar pesquero**; hay que construirlo por analogía con proxies maduros: **IMPA Marine Stores Guide** (50k+ códigos navales) para flota, **UNSPSC/eCl@ss** para MRO de plantas, **ISO 14224/SAP PM** para equipos, **HACCP/GSA** para insumos de contacto alimentario, y normas de amoníaco para frío.
2. **La taxonomía de COMPRAS y la taxonomía de EQUIPOS son cosas distintas y complementarias.** La de compras se organiza por **mercado proveedor + lógica de compra + unidad de negocio** (para negociar y tarifar); la de equipos (ISO 14224 / SAP PM *functional location*) se organiza por **sistema técnico** (para mantenimiento). **Se conectan con una capa de mapping, no se mezclan.**
3. **Las cuatro dimensiones deben mantenerse separadas:** **cuenta contable ≠ proveedor ≠ material ≠ categoría**. Confundirlas es el error de diseño más caro.

**Recomendación (alta confianza en el método):** construir la taxonomía propia de Exalmar como **principal** (3-4 niveles, MECE, por mercado proveedor), con **UNSPSC como mapping/benchmark externo** (gratuito), **eCl@ss como diccionario de atributos** para categorías técnicas, y la **jerarquía de equipos (ISO 14224/SAP PM) en paralelo, mapeada**. Validarla con **datos reales (5 años de OC + maestros)** mediante un pipeline semiautomático (clustering + clasificación + human-in-the-loop), y gobernarla con un **Data Council** y *category owners*. Materializar todo en un **Exalmar Taxonomy Council Harness** en Claude Code (orquestador + agentes por unidad de negocio + agente de atributos + auditor adversarial + árbitro, con revisión humana obligatoria).

**Propuesta concreta:** **16 macro categorías** (se valida la lista de 18 del usuario: se fusiona "Importaciones" en Logística, y "Categorías estratégicas especiales" se convierte en **atributo de segmentación Kraljic**, no en macro categoría; se añade "MRO transversal"). **Confianza global: media** (método y estructura = alta; la asignación fina de familias = a validar con datos).

## 2. Pregunta de investigación

¿Cuál debe ser la estructura ideal de macro categorías → categorías → subcategorías → familias de compra para una pesquera industrial integrada (flota de cerco con/sin frío RSW/CSW, plantas de harina/aceite, plantas de congelado), que sirva para category management, spend analysis, contratos marco, tarifarios, tail spend, sourcing, gestión de proveedores y automatización con IA?

## 3. Contexto y objetivo

Exalmar: 5 unidades operativas (flota sin frío, flota con frío, harina/aceite, congelado, transversal corporativo). Problema: la clasificación por cuenta contable/proveedor/grupo SAP no basta. Se requiere una taxonomía que agrupe por lógica de compra, lógica técnica, equipos/sistemas, unidad de negocio, recurrencia, proveedores, criticidad, posibilidad de tarifario/contrato marco, potencial de ahorro, riesgo operacional y relación con activos. Objetivo: obtener la propuesta conceptual y la base para un **Exalmar Taxonomy Council Harness** en Claude Code.

## 4. Tipo de investigación

`procurement` con fuerte componente metodológico/diseño (`technology_comparison` + `enterprise_ai` para el harness).

## 5. Metodología usada

Fan-out de 5 investigadores (category management; estándares de clasificación/equipos; industrias comparables; métodos algorítmicos de inducción de taxonomía; riesgos/gobernanza) con búsqueda web real → matriz de evidencia → criterios de diseño (generate&filter) → contradicciones → verificación adversarial → síntesis de la propuesta. Ponderación por calidad de evidencia. **No se inventan estándares**: lo que es propuesta se marca como propuesta.

## 6. Subpreguntas investigadas

Marcos de category management y niveles de taxonomía; estándares (UNSPSC/CPV/eCl@ss/ISO 14224/SAP PM/IMPA/NSN) y su uso; cómo taxonomizan industrias comparables; criterios de macro/sub/transversalidad; modelo de atributos; diccionario de categoría; construcción desde datos reales; métodos algorítmicos; diseño del harness; riesgos y gobernanza.

## 7. Matriz de evidencia

| Claim | Fuente | Tipo | Calidad | Fecha | Relevancia | Limitaciones |
|---|---|---|---|---|---|---|
| Spend taxonomy típica de 3-4 niveles; MECE; estructurar por mercado proveedor, no por departamento; evitar "Otros" | Sievo; Procurement Tactics | comercial | media | 2026 | Alta | Práctica de consultoría, sin estudio académico |
| Spend cube = categoría × proveedor × unidad de negocio | SpendHQ; Procurement Tactics | comercial | media | 2026 | Alta | Convergencia de marketing |
| Kraljic (1983): segmentar por valor × riesgo de suministro (4 cuadrantes) | CIPS (vía secundarias) | estandar | alta | 1983/2026 | Alta | Página CIPS no accesible (503); reconstruido de secundarias |
| No existe taxonomía universal; cada empresa construye la suya | Art of Procurement; Una | comercial | media | 2026 | Alta | Opinión de práctica |
| **No existe estándar de taxonomía de compras pesquero**; usar proxies (naval, MRO, alimentos) | búsqueda sectorial | secundaria | media | 2026 | Alta | Ausencia de evidencia, no inexistencia probada |
| IMPA Marine Stores Guide: 50k+ códigos, estándar de catálogo naval | Wikipedia; ShipServ | secundaria/comercial | media | 2026 | Alta | No se accedió a jerarquía completa (licencia) |
| Estructura MRO sustantivo-modificador-submodificador + atributos | Verdantis | comercial | media | 2026 | Media | Práctica de vendor, no estándar formal |
| HACCP obligatorio para procesadores/exportadores seafood (EE.UU.); GSA Seafood Processing Standard | folio3; GlobalSeafood | secundaria/comercial | media | 2026 | Media | Alcance EE.UU.; verificar norma local (SANIPES Perú) |
| **Taxonomía de COMPRAS (UNSPSC/CPV/eCl@ss) ≠ taxonomía de EQUIPOS (ISO 14224/SAP PM); complementarias, requieren mapping** | UNGM; eclass.eu; iso.org; SAP Help | oficial/estandar | alta | 2026 | Alta | ISO 14224 no leído completo (403) |
| UNSPSC: 4 niveles (8 dígitos), gratuito, amplia adopción, sin diccionario de atributos robusto | UNGM (ONU) | oficial | alta | 2026 | Alta | Granularidad limitada para equipos especializados |
| eCl@ss: único con diccionario de atributos certificado ISO 13584-42/IEC 61360 | eclass.eu | oficial | alta | 2026 | Alta | Requiere licencia; cifras varían por release |
| CPV: obligatorio solo en contratación pública UE | EUR-Lex | oficial | alta | 2024-2026 | Baja | No aplica a Exalmar (privado, Perú) |
| ISO 14224: taxonomía de equipos para confiabilidad (petróleo/gas); niveles industria-planta-sistema-equipo-parte + boundary | iso.org (vía secundaria) | estandar | alta | 2016 | Alta | Texto completo de pago; "5 niveles" sin verificar en primaria |
| SAP PM functional location/equipment: jerarquía configurable por cliente, alinea con ISO 14224 | SAP Help | oficial | alta | 2026 | Alta | Configurable, no estándar universal |
| Pipeline para descubrir familias: SBERT + UMAP + HDBSCAN; HDBSCAN por defecto falla en texto corto | IEEE 2021; posts técnicos | academica/comercial | media | 2021 | Alta | No validado en SAP/español |
| TaxoClass: clasificación jerárquica con solo nombres de clase (supervisión débil) → mapear a UNSPSC sin golden set grande | NAACL 2021 | academica | alta | 2021 | Alta | Inglés, dominio noticias/productos |
| Record linkage Fellegi-Sunter (1969) + extensiones para dedup de proveedores/materiales | Science Advances; JOS | academica | alta | 1969-2022 | Alta | No validado en procurement |
| Score de confianza del modelo NO predice bien la exactitud real → no basta umbral; HITL necesario | Knostic (blog) | comercial | media | 2026 | Alta | Blog de vendor; patrón plausible |
| Gobernanza MDM: Data Owner/Steward/Custodian + Data Council; versionado, audit trail; SAP MDG | Umbrex; SAP Help | comercial/oficial | media/alta | 2026 | Alta | Playbook de consultoría (no normativo) |
| Conflicto category ownership Compras vs Flota (corto plazo/ahorro vs TCO/operación) | Automotive Fleet | secundaria | media | 2018 | Alta | Fuente de 2018; patrón vigente por inferencia |
| Taxonomía sin mantenimiento degrada ~85%→60-70% en 2 años | Suplari (blog) | comercial | baja | 2026 | Media | Vendor que vende la alternativa; no auditado |

(Matriz extendida en el JSON.)

## 8. Hallazgos principales

1. **Taxonomía propia como principal, estándares como capas de apoyo.** UNSPSC = mapping/benchmark externo (gratis). eCl@ss = diccionario de atributos para categorías técnicas. ISO 14224/SAP PM = taxonomía de equipos **en paralelo**, mapeada. IMPA = catálogo de referencia para flota. CPV/NSN = no aplican a Exalmar.
2. **Dos taxonomías complementarias + mapping**, no una sola. Comprar "bomba" (categoría de compra) ≠ "bomba instalada en secador #2" (nodo de equipo). El mapping categoría↔equipo↔cuenta contable es el activo más valioso.
3. **Estructura de 3-4 niveles, MECE, por mercado proveedor.** Más de 4 niveles genera inconsistencia. Evitar "Otros/Varios".
4. **Transversalidad como atributo, no como duplicación.** Una categoría puede ser transversal a nivel macro y dividirse en subcategorías por unidad de negocio solo cuando la gestión/mercado proveedor difiere.
5. **Construir desde datos reales, no en sala de reuniones.** El error clásico es diseñar idealizado y forzar el histórico. Pipeline: limpieza → clustering (SBERT+UMAP+HDBSCAN) → propuesta de familias → clasificación a la taxonomía (estilo TaxoClass) → **human-in-the-loop** → golden set → score de confianza + clase **"no clasificable"**.
6. **Gobernanza o muerte.** Sin Data Council, *category owners*, versionado y mantenimiento, cualquier taxonomía (incluso con IA) degrada. El score de confianza **no** basta como control: se requiere revisión humana.
7. **Conflictos organizacionales reales** entre Compras, Mantenimiento, Flota y Producción sobre quién "posee" la categoría: se resuelven con un modelo de gobernanza explícito (owner + Data Council).

## 9. Contradicciones o tensiones entre fuentes

- **"La IA mantiene la taxonomía sola" (vendors) vs. "sin gobernanza/stewardship degrada" (MDM/HITL).** La evidencia favorece la segunda: la IA acelera, no sustituye la gobernanza.
- **Cifras de eCl@ss** difieren entre fuentes (31k vs 45k clases) → verificar release vigente.
- **Niveles de ISO 14224** ("5 niveles") citados por secundarias, no verificados en la norma de pago.
- **Convergencia comercial**: muchas fuentes repiten "3-4 niveles" y "spend cube de 3 dimensiones" sin estudio independiente — buena práctica consolidada, no ley.
- **direct/indirect y CAPEX/OPEX son ambiguos** en flota/transporte: no usarlos como eje primario de la taxonomía, sino como **atributos**.

## 10. Alternativas de diseño identificadas (generate & filter)

| Opción de taxonomía base | Veredicto |
|---|---|
| A. UNSPSC como taxonomía principal | ❌ Demasiado granular en bajo gasto / amplia en alto gasto; no refleja mercado proveedor de Exalmar. Usar como mapping. |
| B. eCl@ss como principal | ❌ Excelente para atributos, pero licencia y orientación europea; usar como **diccionario de atributos**. |
| C. Taxonomía de equipos (ISO 14224/SAP PM) como principal | ❌ Es para mantenimiento, no para comprar/negociar; usar **en paralelo, mapeada**. |
| D. **Taxonomía propia por mercado proveedor + unidad de negocio, mapeada a UNSPSC/eCl@ss/equipos** | ✅ **Recomendada.** Sirve para negociar, tarifar, tail spend y SAP; conserva lógica propia. |
| E. Taxonomía por cuenta contable/proveedor | ❌ Mezcla dimensiones; inútil para sourcing. |

## 11. Comparación de uso de estándares (matriz de rol)

| Estándar | Rol recomendado para Exalmar |
|---|---|
| **Taxonomía propia** | **Principal** (negociar, tarifar, tail spend, ownership) |
| UNSPSC | Mapping externo + benchmark (gratuito) |
| eCl@ss | Diccionario de **atributos** de categorías técnicas |
| ISO 14224 / SAP PM (functional location) | Taxonomía de **equipos** en paralelo + mapping a compras |
| IMPA Marine Stores Guide | Referencia/catálogo para **MRO de flota** |
| HACCP / GSA / SANIPES (Perú) | Marco de **atributos de compliance** para insumos de contacto alimentario y sanitización |
| CPV / NSN / NIGP | No aplican (descarte) |

## 12. Propuesta inicial de taxonomía Exalmar (a validar con datos)

**Notación de transversalidad:** `T`=transversal toda Exalmar · `F`=flota · `FF`=solo flota con frío · `HA`=harina/aceite · `CG`=congelado · `CORP`=corporativo.

### Macro categorías recomendadas (16 — validación de las 18 candidatas)

| # | Macro categoría | Transv. | Driver principal | ¿Contrato marco? | ¿Tarifario? |
|---|---|---|---|---|---|
| 1 | Energía y combustibles (diésel marino, petróleo industrial, electricidad, GLP, lubricantes) | T | Commodity/precio indexado | Sí | Sí (indexado) |
| 2 | MRO Flota / Mantenimiento naval | F/FF | Equipo/sistema naval | Parcial | Sí (servicios) |
| 3 | Redes, artes de pesca y operación de flota | F | Mercado especializado pesca | Sí | Sí |
| 4 | MRO Plantas Harina y Aceite | HA | Equipo/proceso térmico | Parcial | Sí (servicios) |
| 5 | MRO Plantas Congelado / Frío industrial | CG | Equipo/proceso frío | Parcial | Sí (servicios) |
| 6 | MRO transversal / repuestos industriales comunes | T | Mercado común (rodamientos, motores, bombas genéricas) | Sí | Sí |
| 7 | Químicos e insumos productivos | T/HA/CG | Mercado químico | Sí | Sí |
| 8 | Empaque, envases y despacho | HA/CG | Contacto alimentario/material | Sí | Sí |
| 9 | Servicios industriales (mecánicos, eléctricos, limpieza, calderería) | T | Hora-hombre/especialidad | Sí | Sí (rate card HH) |
| 10 | Logística, transporte y comercio exterior (incl. aduanas) | T | Ruta/tonelaje | Sí | Sí |
| 11 | Seguridad, salud ocupacional y medio ambiente (HSE) | T | Norma/certificación | Sí | Parcial |
| 12 | Materiales generales e industriales (ferretería, acero, consumibles) | T | Catálogo/commodity | Sí | Sí |
| 13 | Infraestructura, obras y proyectos (CAPEX) | T/CORP | Proyecto | Por proyecto | No |
| 14 | Tecnología, comunicaciones y electrónica (TI/OT) | CORP | Mercado tecnológico | Sí | Parcial |
| 15 | Administración y servicios generales | CORP | Indirecto | Sí | Parcial |
| 16 | Servicios profesionales y consultorías | CORP | Especialidad | Parcial | No |

**Validación de las 18 candidatas del usuario:**
- ✅ Se conservan 16. Las macro 3-5 (MRO específico) se mantienen separadas por mercado proveedor y criticidad distintos.
- 🔄 **"Importaciones y comercio exterior"** → fusionada en **#10 Logística** (mismo mercado de operadores logísticos/aduana); se mantiene como **subcategoría** con su propio owner si el volumen lo amerita.
- ⛔ **"Categorías estratégicas especiales"** → **NO es macro categoría.** "Estratégico" es el resultado de la segmentación **Kraljic** (valor × riesgo) y debe ser un **atributo** aplicable a cualquier categoría, no un cajón.
- ➕ Se añade **#6 MRO transversal** (faltaba; captura repuestos de mercado común entre flota y plantas, clave para consolidar proveedores).

### Deep dive Flota (#2 y #3)

| Subcategoría | Transv. | Notas |
|---|---|---|
| Motores principales y auxiliares | T (con plantas) | Motor de combustión es transversal flota↔plantas (grupos electrógenos) → candidato a MRO transversal #6 |
| Grupos electrógenos | T | Igual que arriba |
| Sistemas hidráulicos / eléctricos de a bordo | F | |
| Navegación y electrónica pesquera (sonar, ecosonda, GPS) | F | Mercado naval especializado |
| **Sistemas de frío RSW/CSW** | **FF** | Solo flota con frío; comparte mercado proveedor con #5 congelado (compresores/refrigerante) → mapear |
| Bombas y válvulas marinas | T | Genéricas → #6; especializadas → #2 |
| Casco, cubierta y estructura; servicios de varadero | F | Varadero = servicio (rate card) |
| **Redes de cerco, cables, anillas, grilletes, jarcias, pangas, paños** | **F** | Mercado 100% pesquero → macro #3 |
| Combustibles y lubricantes | T | → macro #1 Energía |
| Seguridad marítima (balsas, chalecos, pirotecnia) | F | Compliance marítimo; parte mapea a #11 HSE |

### Deep dive Harina y Aceite (#4)

Subcategorías por proceso: recepción MP · cocción · prensado · secado (secadores, refractarios/térmicos) · centrifugado/decanter · evaporación (planta de agua de cola) · ensaque · **calderas y vapor** · tratamiento de efluentes · automatización/instrumentación · bombas/válvulas de proceso · rodamientos y transmisión. Servicios: mantenimiento mecánico/eléctrico, limpieza industrial. **Calderas/secadores = específicos HA.** Bombas/rodamientos genéricos → #6 transversal.

### Deep dive Congelado / Frío (#5)

Subcategorías: recepción y proceso · **frío industrial (compresores, evaporadores, condensadores)** · túneles de congelado · cámaras frigoríficas · **refrigerantes (amoníaco — atributo de pureza/compliance)** · líneas de proceso · tratamiento de agua · sanitización (seguridad alimentaria) · empaque (→ #8). **Comparte mercado de frío con RSW/CSW de flota (FF)** → consolidación de proveedores de refrigeración como oportunidad.

### Criterios de transversalidad (cuándo una categoría es T / específica)
- **Transversal toda Exalmar:** mismo mercado proveedor y misma gestión en ≥3 unidades (energía, EPP, ferretería, servicios mecánicos genéricos, rodamientos).
- **Transversal 2 unidades:** sistemas de frío (FF + congelado); empaque (HA + congelado).
- **Específica de unidad:** mercado proveedor propio + criticidad propia (redes=flota; calderas/secadores=harina; túneles=congelado).
- **Corporativa:** TI, administración, profesionales.
- **Estratégica:** atributo Kraljic, transversal a la estructura.

### Criterios para macro categoría / subcategoría
- **Macro** si: volumen relevante + mercado proveedor propio + estrategia de sourcing distinta + riesgos propios + atributos técnicos específicos + potencial de contrato marco/tarifario + necesita *owner*.
- **Subcategoría** si: permite comparar precios + agrupar proveedores + crear tarifario + definir especificaciones estándar + diferenciar criticidad/tecnología + separar unidad de negocio cuando la gestión difiere.

## 12-bis. Modelo de atributos y diccionario de categoría

**Atributos por tipo de categoría** (capturados desde eCl@ss donde exista; propios donde no):
- Combustibles: tipo, azufre, unidad, planta/embarcación, contrato, proveedor, índice de precio.
- Electricidad: sede, kWh, potencia, tarifa, activa/reactiva.
- Motores: marca, modelo, potencia, serie, aplicación, equipo asociado (→ functional location).
- Bombas: tipo, caudal, presión, material, aplicación.
- Redes: tipo, medida, paño, material, embarcación, temporada.
- Servicios industriales: alcance, unidad (HH/global), equipo, sede, especialidad.
- Transporte: origen, destino, tipo de carga, tonelaje, distancia, equipo.
- HSE/Seguridad: norma, certificación, talla, tipo, uso.
- Empaque: material, dimensión, resistencia, **contacto alimentario (sí/no)**, presentación.
- Frío: refrigerante, capacidad, presión, **pureza NH3**, equipo asociado.

**Plantilla de diccionario de categoría** (cada categoría tendrá): definición · qué incluye · qué excluye · ejemplos materiales · ejemplos servicios · unidades de negocio aplicables · proveedores típicos · atributos mínimos · criterios de clasificación · **riesgos de confusión** · potencial de contrato marco · potencial de tarifario · *owner* sugerido.

## 13. Riesgos y controles

| Riesgo | Impacto | Probabilidad | Control recomendado |
|---|---:|---:|---|
| Mezclar las 4 dimensiones (cuenta/proveedor/material/categoría) | Alto | Alta | Modelo de datos que las separa; SAP MDG; reglas explícitas |
| Categorías demasiado amplias o técnicas (no sirven para negociar/tarifar) | Alto | Media | Criterios MECE + validación con spend real + revisión de compradores |
| Sobreajuste a la data histórica (perpetuar el desorden) | Medio | Media | Combinar bottom-up (datos) + top-down (lógica de mercado) |
| Dependencia excesiva de UNSPSC | Medio | Media | UNSPSC solo como mapping; taxonomía propia como principal |
| Mezclar mercados proveedores incompatibles en una categoría | Alto | Media | Driver = mercado proveedor; separar subcategorías |
| Conflicto de ownership (Compras/Mantenimiento/Flota/Producción) | Alto | Alta | Category owner designado + Data Council + RACI |
| Clasificación automática errónea en masa | Alto | Media | HITL; golden set; **no basta el score de confianza**; muestreo de auditoría |
| Degradación sin mantenimiento | Medio | Alta | Gobernanza viva: revisión periódica, versionado, stewardship |
| Categoría "no clasificable" mal gestionada | Medio | Alta | Clase explícita "no clasificable" + cola de revisión humana |
| Confusión taxonomía de compra vs de equipo | Alto | Media | Dos taxonomías + tabla de mapping; no fusionarlas |

## 14. Recomendación final

1. **Taxonomía propia como principal** (16 macro categorías propuestas, 3-4 niveles, MECE, por mercado proveedor), validada con **5 años de datos reales**.
2. **Estándares como capas:** UNSPSC (mapping/benchmark), eCl@ss (atributos), ISO 14224/SAP PM (equipos, mapeada), IMPA (flota), HACCP/SANIPES (compliance alimentario).
3. **Mantener separadas las 4 dimensiones** y construir la **tabla de mapping** categoría↔equipo↔cuenta↔proveedor.
4. **Gobernanza desde el día 1:** Data Council + category owners + versionado + clase "no clasificable" + métricas de salud.
5. **Construcción semiautomática con HITL** (clustering + clasificación + golden set), nunca clasificación masiva ciega.
6. **Materializar en el Exalmar Taxonomy Council Harness** (abajo).

### Diseño del Exalmar Taxonomy Council Harness (agentes)
- **Orquestador** (Dynamic Workflow) — coordina; degrada a modo subagents.
- **Agentes investigadores de categoría** (uno por macro categoría o grupo).
- **Agentes técnicos por unidad de negocio** (Flota, Harina/Aceite, Congelado).
- **Agente de equipos** (mapea a ISO 14224 / SAP PM functional location).
- **Agente de mercado proveedor** (valida que la categoría agrupe un mercado negociable).
- **Agente de atributos** (deriva atributos por categoría; mapea a eCl@ss).
- **Agente de taxonomía** (ensambla macro→categoría→subcategoría→familia; mapping a UNSPSC).
- **Auditor adversarial** (categorías amplias/técnicas, mezcla de mercados, no tarifa­bles, sobreajuste, confusión de dimensiones).
- **Árbitro final** (consolida y propone; **recomendación, no decisión**).
- **Revisión humana obligatoria** (compradores + usuarios técnicos validan).

## 15. Nivel de confianza

**Media.** Alta en el **método, la estructura de estándares y los criterios de diseño** (bien soportados). Media-baja en la **asignación fina de familias y la lista exacta de subcategorías**, que **debe validarse con datos reales de Exalmar** (no hay estándar pesquero ni benchmark del caso).

## 16. Qué evidencia cambiaría la conclusión

- El **spend cube real** de Exalmar (volúmenes por categoría/proveedor/unidad) — puede fusionar/dividir macro categorías.
- La **estructura SAP actual** (grupos de materiales, clases de equipo, functional locations) — define el mapping.
- Un **piloto de clasificación** que mida cobertura/pureza/tasa de "no clasificable" sobre texto SAP real en español.
- Normativa local **SANIPES/Perú** que ajuste los atributos de compliance alimentario.

## 17. Próximos pasos — Plan 30/60/90

**Días 0-30 — Datos y diseño base:**
- Reunir datos: 5 años de OC, SOLPED, HES, maestros (material/servicio/proveedor/equipo), functional locations, contratos, cotizaciones, cuentas, centros/planta/embarcación, UoM, solicitantes.
- Construir el **spend cube** real y la versión 0 de las 16 macro categorías validada con compradores.
- Definir gobernanza (Data Council, owners, RACI) y la **clase "no clasificable"**.
- Entregables: `macro_category_map.md`, `category_governance_model.md`.

**Días 31-60 — Inducción semiautomática + diccionario:**
- Pipeline: limpieza/normalización → embeddings (SBERT) + UMAP + HDBSCAN → propuesta de familias → clasificación a taxonomía (estilo TaxoClass) → **HITL** → golden set etiquetado.
- Talleres por unidad de negocio (Flota, Harina/Aceite, Congelado) para validar subcategorías y atributos.
- Entregables: `taxonomy_master.csv` (v1), `category_dictionary.md`, `category_attribute_model.csv`, `cross_business_unit_categories.md`, `mro_transversal_report.md`.

**Días 61-90 — Mapping, calidad y harness:**
- Mapping a UNSPSC (cross-walk), atributos a eCl@ss, y tabla compras↔equipos (ISO 14224/SAP PM).
- Métricas de calidad (cobertura nivel 2/3 con alta confianza, tasa de duplicados, tasa de no clasificable) y `ambiguous_categories.csv`.
- Versión inicial del **Exalmar Taxonomy Council Harness** (agentes) operando como copiloto.
- Entregables: `mapping_rules.md`, `ambiguous_categories.csv`, `implementation_plan.md`.

### Outputs finales propuestos (10 archivos)
`taxonomy_master.csv` · `macro_category_map.md` · `category_dictionary.md` · `category_attribute_model.csv` · `mapping_rules.md` · `ambiguous_categories.csv` · `cross_business_unit_categories.md` · `mro_transversal_report.md` · `category_governance_model.md` · `implementation_plan.md`.

### Cómo se conecta con lo anterior
Esta taxonomía es la **capa base** que habilita los harness previos: **tail spend** (clasificar lo fragmentado), **tarifarios** (familias tarifables), **contratos marco** (categorías consolidables) y **agentes de compras** (clasificación automática con HITL).

## 18. Límites del análisis

- **No existe estándar pesquero**: la propuesta es hipótesis a validar; sin datos reales de Exalmar, las familias finas son referenciales.
- Evidencia mayormente **comercial/consultoría**; informes de analistas y normas (ISO 14224, eCl@ss completo) **tras paywall**.
- **Sin benchmark** de clasificación de texto SAP en español → medir con piloto propio.
- Cifras de degradación (85%→60-70%) y de ahorro son **de proveedores, no auditadas**.
- Normativa peruana (SANIPES, aduanas) no investigada en profundidad; verificar localmente.

## 19. Anexos

- Hallazgos JSON por investigador y matriz extendida: `outputs/json/2026-06-18_research-council_exalmar-category-taxonomy.json`.
- Reportes relacionados: `..._procurement-agentic-platforms.md`, `..._tail-spend-agentic-procurement.md`.
- Rúbricas: `rubrics/procurement-research.md`, `rubrics/technology-comparison.md`, `rubrics/source-quality.md`.
- Investigadores: procurement, technical, supply-chain, academic, risk-and-controls. Patrones: fan-out, generate&filter, contradiction-finding, adversarial verification.
