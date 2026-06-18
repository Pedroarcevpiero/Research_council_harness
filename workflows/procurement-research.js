/*
 * ============================================================================
 * PSEUDOCODIGO / REFERENCIA — NO EJECUTABLE POR EL CLI DE CLAUDE CODE.
 * ============================================================================
 * La fuente canonica de la orquestacion es:  workflows/research-council.md
 * El workflow guardado e invocable es:        .claude/workflows/research-council.md
 * Este archivo solo ILUSTRA la especializacion para investigacion de compras,
 * fijando research_type = "procurement". No define una API real.
 * ============================================================================
 */

// Especializacion: procurement (compras, sourcing, benchmark, tarifarios,
// contratos, tail spend, SAP, validacion de precios).
const spec = {
  research_type: "procurement",
  base: "workflows/research-council.md",
  agents: [
    "procurement-researcher",
    "supply-chain-researcher",
    "enterprise-practices-researcher",
    "web-researcher",
    "risk-and-controls-researcher",
    "source-quality-auditor",
    "synthesis-writer",
  ],
  patterns: ["fan_out_and_synthesize", "generate_and_filter", "adversarial_verification"],
  phases: [
    "intake", "classification(procurement)", "plan", "fan_out",
    "evidence_matrix", "generate_and_filter", "contradiction_finding",
    "adversarial_verification", "loop_until_done(max 3)", "synthesis", "output",
  ],
  may_delegate_to: "/deep-research",
};

module && module.exports && (module.exports = spec);
