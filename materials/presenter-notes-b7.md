# Presenter notes - b7 Auth, security, elicitation

Track: Builder · Session 7 of 8 · 45 min · Difficulty: Hands-on
Page: courses/b7-auth-security.html
One-line promise: they can name MCP's OAuth roles, the threats that actually get exploited, and ship elicitation into monthly_report.

## Run of show (45 min)
- 0-3   Part 0 recap. b6 put Daybreak on the internet with no lock. Tonight: the lock, the threats, and the interactive primitive.
- 3-10  Part 1 OAuth 2.1. Walk the five-arrow SVG. Hammer "your server is the RESOURCE server - it verifies tokens, it does not issue them."
- 10-13 Part 1 card: the five arrows as an ordered list. Flag the 2026-07-28 hardening (RFC 9207 iss validation) once.
- 13-16 Part 1 card: what you implement vs what libraries give you. "Do not roll your own token issuance or PKCE."
- 16-24 Part 2 security. Threat-matrix SVG. Confused deputy, token passthrough (forbidden), session hijacking, then the prompt-injection Real-world callout (poisoned third-party server) - spend time here.
- 24-30 Part 3 elicitation. Open the "elicit" mcpbox: direction flips, server asks, user accept/decline/cancel. Show the ctx.elicit code.
- 30-40 Demo 1 (guided OAuth trace + Bearer curl). Demo 2 (ship the month elicitation, test accept + decline in Inspector).
- 40-45 Quiz + Q&A.

## Preflight
- MCP Inspector runs: `uv run mcp dev server.py` opens it.
- monthly_report_tool (elicitation version) already pasted into a scratch copy of server.py and tested for accept AND decline paths.
- A public authenticated MCP server URL on hand for the OAuth trace, OR the diagram-only walk (no live IdP - say so explicitly).
- Confirm the "elicit" mcpbox steps and both SVGs render.
- Have the RFC numbers straight: 9728 protected resource metadata, 9207 iss validation.

## Never cut these beats
- Server = resource server, not authorization server (quiz Q1). The single most confused point in MCP auth.
- Token passthrough is FORBIDDEN, not a tradeoff - verify audience, reject foreign tokens (quiz Q2).
- Elicitation SURVIVES 2026-07-28 while sampling/roots do not (quiz Q3) - so it is safe to build on.
- The poisoned-tool-description story. Tool descriptions are model-facing untrusted input. This lands hardest as a concrete narrative.

## Cuts if running long
- Skip the "elicitation vs error" self-study card (marked self-study; the rule of thumb is in the cheat sheet).
- Collapse the confused-deputy and token-passthrough cards into one spoken minute using the SVG matrix.
- Narrate Demo 1 from the diagram only; skip typing the Bearer curl (it is on the page).

## Three likely questions
1. "Do I have to build an OAuth server?" - No. Use a real authorization server (your IdP, or a hosted one). You implement only the resource-server half: advertise protected resource metadata, verify the Bearer token (signature, audience, expiry, issuer), and enforce scope-to-tool. Never hand-roll token issuance or PKCE.
2. "What if the client does not support elicitation?" - Check the capability agreed at initialize. If the client did not advertise elicitation, fall back to returning a JSON-RPC error asking for the argument. Never assume it is available.
3. "Is Daybreak actually vulnerable to these?" - It is read-only, so the blast radius is small - a good teaching point about least privilege. The real risk is a third-party server the founder installs: a poisoned tool description can steer the model to bridge into Daybreak. Trust, review descriptions, least privilege, human approval for consequential tools.
