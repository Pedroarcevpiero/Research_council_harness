# Seguridad y Controles — Research Council Harness

## 1. Límites del sistema

- El harness corre exclusivamente con el LLM de Claude y herramientas nativas de
  Claude Code (`WebSearch`, `WebFetch`, `Read`, `Write`, `Agent`). **No usa APIs
  externas, no tiene credenciales, no se conecta a sistemas empresariales en vivo**
  (SAP, ERPs, bases de datos, etc.).
- No ejecuta transacciones, no aprueba compras, no firma contratos ni toma
  decisiones vinculantes. Produce **reportes de apoyo a la decisión**; la decisión
  final siempre es del usuario.
- No tiene memoria persistente entre invocaciones más allá de lo que quede escrito
  en `outputs/`. Cada ejecución parte de la pregunta e información que el usuario
  aporta en ese momento (más archivos locales que se le indiquen explícitamente).
- Los subagents no pueden lanzar otros subagents (restricción de la plataforma).
  Esto limita la profundidad de la orquestación a lo que la Skill o el Dynamic
  Workflow coordinan explícitamente; no hay "orquestación emergente" no controlada.
- El paralelismo del fan-out tiene un techo práctico (hasta 16 agentes concurrentes
  en Dynamic Workflow); más allá de eso, el sistema secuencia o resume.

## 2. Riesgos de alucinación

Riesgo inherente a cualquier sistema basado en LLM: el modelo puede generar texto
plausible pero no respaldado por evidencia real, especialmente bajo presión por
completar una conclusión.

Mitigaciones de diseño:
- **Principio explícito #1 de la Skill: "No inventes fuentes ni datos."** Cada
  hallazgo debe venir acompañado de `source`, `source_type` y `source_quality`
  conforme a `research-finding.schema.json`; un claim sin fuente identificable no
  debería entrar a la matriz de evidencia con `used_in_conclusion: true`.
- **Separación obligatoria de hechos, supuestos, inferencias y recomendaciones**
  (principio #2). Esto evita que una inferencia razonable se presente con la misma
  fuerza que un hecho verificado.
- **Verificación adversarial obligatoria** (Fase 8): `adversarial-reviewer` ataca
  el borrador buscando específicamente afirmaciones demasiado fuertes, evidencia
  faltante y conclusiones no soportadas, antes de que el reporte se considere
  final.
- **Detección de contradicciones** (Fase 7): `contradiction-finder` identifica
  fuentes que se contradicen, lo que reduce el riesgo de que el sistema "elija" la
  fuente que más le conviene a una narrativa sin señalar el conflicto.
- **Nivel de confianza explícito** (`confidence: alta|media|baja` en
  `final-report.schema.json`) y sección dedicada a "qué evidencia cambiaría la
  conclusión", que obliga a hacer explícita la incertidumbre residual en lugar de
  esconderla detrás de un tono seguro.

Ninguna de estas mitigaciones elimina el riesgo de alucinación; lo reducen y lo
hacen **visible** para que la revisión humana pueda detectarlo.

## 3. Revisión humana

- **Obligatoria antes de actuar sobre cualquier output.** La Skill y el
  `CLAUDE.md` del repo declaran explícitamente que "los outputs siempre requieren
  revisión humana antes de decidir" y que "la decisión final es del usuario".
- El reporte Markdown está diseñado para facilitar esa revisión: incluye secciones
  específicas de **límites** (qué no se investigó o no se pudo verificar), **qué
  evidencia cambiaría la conclusión** (para que un humano sepa qué buscar si quiere
  cuestionar el resultado) y **próximos pasos** (que normalmente incluyen
  validaciones humanas pendientes, no acciones automáticas).
- Para investigaciones largas o costosas (profundidad `profunda`, Dynamic
  Workflow), el sistema debe **avisar antes de ejecutar**, dando al humano la
  oportunidad de frenar o acotar el alcance antes de gastar tokens/tiempo.
- Más de 3 iteraciones del loop-until-done (Fase 9) requieren autorización
  explícita del usuario — el sistema no escala su propio esfuerzo sin que un humano
  lo apruebe.

## 4. Privacidad de documentos y manejo de archivos locales

- El harness solo lee archivos locales que el usuario indique explícitamente
  (campo `local_files` de `research-input.schema.json`). No escanea el repositorio
  ni el sistema de archivos en busca de documentos por iniciativa propia.
- Los archivos locales se tratan como una fuente más dentro de la matriz de
  evidencia, con `source_type: local_file`; deben recibir el mismo escrutinio de
  calidad (¿es información oficial?, ¿está actualizada?, ¿tiene limitaciones?) que
  cualquier otra fuente.
- El sistema **no modifica los archivos fuente originales** del usuario (principio
  #8 de la Skill). Los archivos locales se leen, nunca se escriben ni se editan
  como parte de la investigación.
- Si los documentos contienen información sensible (datos de compras reales,
  contratos, cifras financieras), esa sensibilidad debe gestionarla el usuario al
  decidir qué archivos aportar al contexto; el harness no tiene un mecanismo propio
  de clasificación de sensibilidad ni de redacción de datos.

## 5. Manejo de fuentes

- Toda fuente debe clasificarse por **tipo** (`primaria`, `secundaria`,
  `academica`, `comercial`, `oficial`, `opinion`, `estandar`, `local_file`) y por
  **calidad** (`alta`, `media`, `baja`, `no_usar`), según
  `rubrics/source-quality.md` (ver también `docs/source-quality-guide.md`).
- Las fuentes de calidad `no_usar` no deben sustentar ningún claim que llegue a la
  recomendación final.
- El sistema debe **ponderar por calidad de evidencia, nunca promediar opiniones**
  (principio #7): diez blogs de baja calidad no superan a una fuente oficial de
  alta calidad.
- Toda evidencia debe ser citable o ubicable (URL, título, archivo + sección);
  evidencia que no se puede ubicar no entra a la matriz.

## 6. Uso de la web

- El acceso a la web ocurre únicamente a través de `WebSearch` / `WebFetch`
  nativas de Claude Code, o delegando a `/deep-research` para búsqueda profunda con
  fact-checking. No hay scraping no autorizado ni acceso a sitios que requieran
  credenciales del usuario.
- El sistema no realiza acciones en la web (no llena formularios, no envía
  solicitudes, no se autentica en servicios) — solo lee y cita.
- La actualidad de las fuentes web debe registrarse (`date`, `recency`) porque la
  vigencia de la información es un factor de calidad, no solo el tipo de fuente.

## 7. Uso de archivos locales

Ver §4. Adicionalmente:
- El harness no debe asumir que un archivo local es verdadero o autoritativo solo
  por ser provisto por el usuario; debe evaluarse con los mismos criterios de
  calidad que cualquier otra fuente (¿es un documento oficial?, ¿está vigente?,
  ¿tiene limitaciones conocidas?).
- No se generan archivos nuevos dentro de las carpetas de entrada del usuario; toda
  escritura ocurre exclusivamente en `outputs/`.

## 8. Control de costos y tokens

- El árbol de decisión de modos (simple / subagents / dynamic workflow) existe
  explícitamente para controlar costo: se debe usar **el modo más barato que
  cumpla los criterios de éxito** de la investigación, no el más exhaustivo por
  defecto.
- Dynamic Workflow (fan-out masivo, hasta 16 agentes concurrentes) solo se
  justifica para investigación de alta complejidad/profundidad, y el sistema debe
  **avisar antes de ejecutar** dado el costo en tokens y tiempo.
- El loop-until-done tiene un **tope de 3 iteraciones** sin autorización adicional,
  para evitar bucles de refinamiento sin límite que consuman tokens
  indefinidamente.
- Para preguntas acotadas de una sola dimensión, el modo simple evita lanzar
  subagents innecesarios.

## 9. Permisos

- Los subagents declaran en su frontmatter las herramientas mínimas que necesitan
  (`tools`); investigadores con necesidad de web tienen `WebSearch, WebFetch, Read`,
  los de verificación/síntesis típicamente solo `Read` (y `Write` únicamente para
  `synthesis-writer`, que es quien genera los archivos finales).
- Ningún subagent tiene la herramienta `Agent` — es una restricción de la
  plataforma, no solo una convención, pero el diseño la refuerza explícitamente en
  cada agente.
- Los hooks de `.claude/hooks/` están **documentados pero desactivados por
  defecto**; activar hooks reales (modificar `settings.json`) requiere aprobación
  explícita del usuario y no debe hacerse de forma automática por el harness.

## 10. No ejecutar acciones externas

El harness **no ejecuta acciones externas peligrosas**: no envía correos, no
realiza compras, no modifica sistemas de terceros, no cambia configuraciones fuera
del propio repositorio de outputs. Su única salida es texto e información
estructurada en `outputs/`. Cualquier acción derivada de la recomendación (por
ejemplo, "implementar el agente X para validar compras") la ejecuta el usuario por
fuera del harness, con sus propios controles y aprobaciones.

## 11. No modificar fuentes originales

Tanto las fuentes web citadas como los archivos locales del usuario son de solo
lectura para el harness. No se editan, no se "limpian", no se reescriben. Si una
fuente necesita corrección o aclaración, eso se documenta como una limitación o
nota en la matriz de evidencia, nunca alterando el material original.

## 12. Resumen de controles por fase (referencia rápida)

| Fase | Control de seguridad asociado |
|---|---|
| 0 Intake | Pregunta antes de ejecutar si falta información crítica |
| 1 Clasificación | Selecciona rúbrica correcta; evita aplicar criterios de un dominio a otro |
| 3 Fan-out | Solo lee/busca; no ejecuta acciones externas |
| 4 Matriz de evidencia | Clasifica calidad; descarta `no_usar` de la conclusión |
| 7 Contradicciones | Hace visibles los conflictos en vez de ocultarlos |
| 8 Adversarial | Última línea de defensa contra afirmaciones no soportadas |
| 9 Loop until done | Tope de 3 iteraciones sin autorización |
| 11 Output | No sobrescribe outputs existentes; versiona por fecha+slug |
| Todas | Revisión humana obligatoria; decisión final del usuario |
