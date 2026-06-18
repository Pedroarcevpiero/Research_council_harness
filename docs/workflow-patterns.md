# Patrones de Workflow — Research Council Harness

## 1. Los cinco patrones

El sistema combina cinco patrones de orquestación agéntica. Todos se ejecutan
desde el agente principal (Skill o Dynamic Workflow), nunca desde dentro de un
subagent, porque los subagents no pueden lanzar otros subagents.

### 1.1 Fan-out and synthesize
**Qué es:** lanzar varios investigadores en paralelo, cada uno cubriendo una
subpregunta o dimensión distinta, y luego consolidar sus hallazgos en una sola
estructura (la matriz de evidencia y, después, la síntesis final).

**Cuándo usarlo:** siempre que la pregunta tenga más de una dimensión relevante
(técnica, de riesgo, de mercado, regulatoria, de costos) o requiera evidencia de
fuentes de distinta naturaleza (web, académica, oficial, archivos locales). Es el
patrón base de casi toda investigación real con el harness; por eso aparece en
`patterns_used` de cualquier ejecución en modo subagents o dynamic workflow.

**Cómo se ve en el sistema:** Fase 3 del workflow. La Skill o el Dynamic Workflow
lanza, en una sola tanda, a los investigadores que correspondan según el mapeo
tipo→agentes (p. ej. `web-researcher`, `academic-researcher`,
`technical-researcher`, `risk-and-controls-researcher` para `enterprise_ai`). Cada
uno devuelve `research-finding.schema.json` de forma independiente; nadie espera a
los demás para empezar a trabajar.

### 1.2 Adversarial verification
**Qué es:** un agente dedicado (`adversarial-reviewer`) cuya única tarea es atacar
el borrador del reporte antes de que se considere terminado, buscando
debilidades: evidencia faltante, fuentes sesgadas, conclusiones demasiado fuertes,
riesgos no evaluados, alternativas descartadas injustamente, afirmaciones que
deberían suavizarse o eliminarse, y puntos que requieren validación humana
explícita.

**Cuándo usarlo:** en cualquier investigación que termine en una recomendación
(prácticamente todas, salvo el modo simple para preguntas triviales). Es
**obligatorio** antes de la síntesis final según los principios irrenunciables de
la Skill ("Usa revisión adversarial antes de concluir").

**Cómo se ve en el sistema:** Fase 8. El output de `adversarial-reviewer` alimenta
tanto la sección 12 del reporte ("Análisis adversarial") como, potencialmente, una
nueva iteración del loop (Fase 9) si la crítica revela huecos críticos.

### 1.3 Generate and filter
**Qué es:** generar muchas opciones/alternativas posibles primero (sin
autocensura prematura) y después filtrarlas con criterios explícitos, en vez de
converger directamente en "la" respuesta.

**Cuándo usarlo:** cuando la investigación implica elegir entre
soluciones/arquitecturas/proveedores/tecnologías. `alternative-generator` produce
el conjunto amplio; el filtro se aplica por valor, seguridad, facilidad,
mantenimiento, costo, trazabilidad, escalabilidad, compatibilidad y riesgo
operativo.

**Cómo se ve en el sistema:** Fase 5. Solo se activa "si aplica" — preguntas que no
involucran comparar soluciones (p. ej. una pregunta puramente fáctica) la omiten.

### 1.4 Tournament
**Qué es:** una vez filtradas las alternativas relevantes, se asigna un
"defensor" por alternativa (que articula su mejor caso) y un juez
(`tournament-judge`) que produce un ranking: ganador, segundo lugar, una posible
combinación recomendada, y en qué circunstancias elegir cada opción distinta a la
ganadora.

**Cuándo usarlo:** cuando hay alternativas genuinamente comparables (no una
opción claramente dominante desde el principio) y la decisión se beneficia de ver
el mejor argumento de cada lado antes de fallar. Tipo de investigación natural:
`technology_comparison`.

**Cómo se ve en el sistema:** Fase 6, después de generate-and-filter. El resultado
alimenta las secciones 10–11 del reporte (alternativas y tabla comparativa).

### 1.5 Loop until done
**Qué es:** iterar el ciclo de investigación/verificación hasta que se cumplan
condiciones explícitas de "terminado", en vez de declarar éxito tras una sola
pasada.

**Condiciones para iterar:** claims críticos sin fuente, contradicciones no
resueltas, alternativas no evaluadas, falta una fuente oficial/actual requerida,
riesgos altos sin analizar, o confianza baja sin justificación explícita.

**Condiciones para terminar:** los claims principales están soportados, las
contradicciones quedaron explicadas (no necesariamente resueltas, pero
documentadas), los riesgos críticos están documentados, las alternativas
relevantes están comparadas, y el nivel de confianza es explícito.

**Límite:** máximo 3 iteraciones sin autorización adicional del usuario — control
de costo, ver `docs/safety-and-controls.md`.

**Cómo se ve en el sistema:** Fase 9, entre la verificación adversarial (Fase 8) y
la síntesis (Fase 10). Si se decide iterar, el ciclo puede volver a Fase 3 (para
llenar un vacío de evidencia), Fase 7 (para resolver una contradicción) o Fase 8
(para re-verificar tras un ajuste).

## 2. Las 12 fases del workflow (0–11)

| Fase | Nombre | Agente(s) | Salida |
|---|---|---|---|
| 0 | Intake | Skill | `research-input.schema.json` normalizado; preguntas si falta info crítica |
| 1 | Clasificación | Skill | `research_type` (enterprise_ai, procurement, technology_comparison, strategic, generic) + rúbrica |
| 2 | Plan | `research-orchestrator` (planificador puro, sin `Agent`) | subpreguntas, fuentes requeridas, criterios de éxito, patrón recomendado |
| 3 | Fan-out research (paralelo) | investigadores según mapeo por tipo | `research-finding.schema.json` por agente |
| 4 | Matriz de evidencia | Skill + `source-quality-auditor` | `evidence-matrix.schema.json` |
| 5 | Generate & filter (si aplica) | `alternative-generator` | alternativas filtradas |
| 6 | Tournament (si hay alternativas comparables) | defensores + `tournament-judge` | ranking + recomendación |
| 7 | Contradiction finding | `contradiction-finder` | lista de contradicciones |
| 8 | Adversarial verification | `adversarial-reviewer` | crítica del borrador |
| 9 | Loop until done (máx 3) | Skill | decisión iterar / terminar |
| 10 | Synthesis | `synthesis-writer` | borrador final conforme a `final-report.schema.json` |
| 11 | Output | Skill (`Write`) | Markdown (19 secciones) + JSON (+ evidencia opcional) |

Las fases 5 y 6 son condicionales ("si aplica" / "si hay alternativas
comparables"); el resto se ejecuta siempre en modo subagents o dynamic workflow.
En modo simple, el sistema no recorre estas fases: responde directo con la
evidencia disponible y registra `patterns_used: ["simple_analysis"]`.

## 3. Estructura completa del reporte Markdown (19 secciones)

1. **Resumen ejecutivo** — la conclusión y el por qué, en pocos párrafos, para
   quien no va a leer el resto.
2. **Pregunta de investigación** — la pregunta principal, ya reformulada como
   investigable.
3. **Contexto y objetivo** — contexto aportado por el usuario y qué decisión
   busca tomar con el resultado.
4. **Tipo de investigación** — `enterprise_ai | procurement |
   technology_comparison | strategic | generic`, con la rúbrica aplicada.
5. **Metodología (patrones usados)** — qué patrones de la sección 1 se aplicaron
   (`patterns_used`) y por qué (modo simple/subagents/dynamic workflow,
   delegación a `/deep-research` si aplicó).
6. **Subpreguntas** — el desglose producido en la Fase 2.
7. **Matriz de evidencia (tabla)** — claim, fuente, tipo de fuente, calidad,
   actualidad, relevancia, limitaciones, contradicciones, estado de soporte,
   si se usó en la conclusión.
8. **Hallazgos principales** — síntesis de los `key_findings` de cada
   investigador, separando hechos de inferencias.
9. **Contradicciones** — qué fuentes o claims discrepan entre sí, y cómo se
   resolvió o por qué no se pudo resolver.
10. **Alternativas** — cada alternativa evaluada con ventajas, desventajas,
    riesgo, costo/complejidad y cuándo usarla.
11. **Comparación de alternativas (tabla)** — vista comparativa lado a lado,
    típicamente con el resultado del torneo si se ejecutó.
12. **Análisis adversarial** — la crítica de `adversarial-reviewer`: qué evidencia
    falta, qué fuentes son sesgadas, qué se suavizó o eliminó del borrador.
13. **Riesgos y controles (tabla)** — riesgo, impacto (alto/medio/bajo),
    probabilidad (alta/media/baja), control propuesto.
14. **Recomendación final** — la respuesta directa a la pregunta de
    investigación, ponderada por calidad de evidencia.
15. **Nivel de confianza** — `alta | media | baja`, explícito y justificado.
16. **Qué evidencia cambiaría la conclusión** — para que la revisión humana sepa
    qué buscar si quiere cuestionar el resultado.
17. **Próximos pasos** — acciones recomendadas, normalmente incluyendo
    validaciones humanas pendientes.
18. **Límites** — qué no se investigó, qué no se pudo verificar, qué queda fuera
    de alcance.
19. **Anexos** — material de soporte adicional (listas largas, detalle de fuentes,
    notas metodológicas extensas).

## 4. Estructura del JSON final (`final-report.schema.json`)

Campos obligatorios: `title`, `date` (YYYY-MM-DD), `research_type`,
`main_question`, `recommendation`, `confidence`.

Campos adicionales relevantes:
- `context`, `objective` — espejo de las secciones 3 del Markdown.
- `patterns_used` — array con los valores: `fan_out_and_synthesize`,
  `adversarial_verification`, `generate_and_filter`, `tournament`,
  `loop_until_done`, `simple_analysis`, `dynamic_workflow`,
  `deep_research_delegation`.
- `subquestions` — array de strings (Fase 2).
- `evidence_matrix` — array de filas conformes a `evidence-matrix.schema.json`.
- `key_findings`, `contradictions` — arrays de strings.
- `alternatives` — array de objetos `{ name, advantages[], disadvantages[], risk,
  cost_complexity, when_to_use }`.
- `comparison_matrix` — array de objetos libres para la tabla comparativa.
- `adversarial_review` — array de strings con la crítica adversarial.
- `risks_and_controls` — array de objetos `{ risk, impact: alto|medio|bajo,
  probability: alta|media|baja, control }`.
- `confidence` — `alta | media | baja`.
- `what_would_change_the_conclusion`, `next_steps`, `limitations` — arrays de
  strings.

El JSON y el Markdown deben ser consistentes entre sí: el JSON es la versión
estructurada de las mismas 19 secciones, no un documento independiente.

## 5. `/research-council` vs `/deep-research`

Resumen operativo (ver también `docs/architecture.md` §4.3 y
`docs/operating-manual.md` §5 para el detalle completo):

- `/deep-research` es el **motor de búsqueda web profunda y fact-checking**
  nativo de Claude Code. Resuelve bien preguntas que dependen de "qué dice la
  evidencia web actual", pero no clasifica tipos de investigación, no genera ni
  filtra alternativas, no corre torneo, no produce matriz de evidencia con
  calidad por fuente, ni reporte de 19 secciones con riesgos y controles.
- `/research-council` es el **marco de decisión**: clasifica, planea, hace
  fan-out, construye la matriz de evidencia, genera y filtra alternativas, corre
  torneo, detecta contradicciones, verifica adversarialmente, itera si es
  necesario y sintetiza una recomendación ponderada con nivel de confianza
  explícito.
- **No son sustitutos, son complementarios.** Dentro de la Fase 3 (fan-out), un
  investigador del harness puede delegar su porción de búsqueda web actual a
  `/deep-research` y envolver el resultado en `research-finding.schema.json`. El
  `patterns_used` de la ejecución debe incluir `deep_research_delegation` cuando
  esto ocurra, para que quede trazado en el reporte.
- Regla de bolsillo: si la pregunta es solo "busca y verifica en la web", usa
  `/deep-research`. Si la pregunta implica decidir entre opciones, evaluar riesgos
  o producir una recomendación defendible, usa `/research-council` (que puede
  usar `/deep-research` por debajo).
