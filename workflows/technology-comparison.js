/*
 * ============================================================================
 * PSEUDOCODIGO / REFERENCIA — NO EJECUTABLE POR EL CLI DE CLAUDE CODE.
 * ============================================================================
 * La fuente canonica de la orquestacion es:  workflows/research-council.md
 * El workflow guardado e invocable es:        .claude/workflows/research-council.md
 * Este archivo solo ILUSTRA la especializacion para comparar tecnologias,
 * fijando research_type = "technology_comparison" e incluyendo la fase tournament.
 * No define una API real.
 * ============================================================================
 */

// Especializacion: technology_comparison (comparar herramientas/arquitecturas/proveedores).
const spec = {
  research_type: "technology_comparison",
  base: "workflows/research-council.md",
  agents: [
    "technical-researcher",
    "enterprise-practices-researcher",
    "alternative-generator",
    "tournament-judge",
    "risk-and-controls-researcher",
    "source-quality-auditor",
    "synthesis-writer",
  ],
  // Incluye explicitamente el patron de torneo entre alternativas.
  patterns: ["fan_out_and_synthesize", "generate_and_filter", "tournament", "adversarial_verification"],
  phases: [
    "intake", "classification(technology_comparison)", "plan", "fan_out",
    "evidence_matrix", "generate_and_filter", "tournament", "contradiction_finding",
    "adversarial_verification", "loop_until_done(max 3)", "synthesis", "output",
  ],
  tournament: {
    defenders: "uno por alternativa comparable",
    judge: "tournament-judge",
    output: ["ranking", "ganador", "segundo", "combinacion_recomendada", "cuando_elegir_cada_una"],
  },
  may_delegate_to: "/deep-research",
};

module && module.exports && (module.exports = spec);
