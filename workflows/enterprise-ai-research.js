/*
 * ============================================================================
 * PSEUDOCODIGO / REFERENCIA — NO EJECUTABLE POR EL CLI DE CLAUDE CODE.
 * ============================================================================
 * La fuente canonica de la orquestacion es:  workflows/research-council.md
 * El workflow guardado e invocable es:        .claude/workflows/research-council.md
 * Este archivo solo ILUSTRA como se especializaria el Research Council para
 * investigacion de IA empresarial, fijando research_type = "enterprise_ai".
 * No define una API real; sirve como documentacion de intencion.
 * ============================================================================
 */

// Especializacion: enterprise_ai (agentes de IA, MCP, Claude Code, automatizacion,
// seguridad, gobernanza, limites).
const spec = {
  research_type: "enterprise_ai",
  // Reutiliza el workflow principal con el tipo fijado.
  base: "workflows/research-council.md",
  agents: [
    "web-researcher",
    "academic-researcher",
    "technical-researcher",
    "risk-and-controls-researcher",
    "source-quality-auditor",
    "adversarial-reviewer",
    "synthesis-writer",
  ],
  patterns: ["fan_out_and_synthesize", "generate_and_filter", "adversarial_verification", "loop_until_done"],
  phases: [
    "intake", "classification(enterprise_ai)", "plan", "fan_out",
    "evidence_matrix", "generate_and_filter", "contradiction_finding",
    "adversarial_verification", "loop_until_done(max 3)", "synthesis", "output",
  ],
  // Puede delegar busqueda web profunda al comando nativo /deep-research.
  may_delegate_to: "/deep-research",
};

// En la practica: invoca /research-council y el sistema clasifica como enterprise_ai,
// o pide a Claude (ultracode) escribir el dynamic workflow a partir de la spec.
module && module.exports && (module.exports = spec);
