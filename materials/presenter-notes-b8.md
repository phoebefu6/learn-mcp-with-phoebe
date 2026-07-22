# Presenter notes - b8 Registry and what's next

Track: Builder · Session 8 of 8 · 45 min · Difficulty: Hardest · CAPSTONE
Page: courses/b8-registry-whats-next.html
One-line promise: they publish a server under their own namespace, understand the 2026-07-28 delta before it finalizes, and can narrate every byte of an MCP conversation.

## Run of show (45 min)
- 0-3   Part 0 recap of the whole track (built, connected, client, remote, secured). Two things left: discoverable + the future.
- 3-9   Part 1 publish. Publish-pipeline SVG. "Registry hosts METADATA, not code." Namespace locked by GitHub auth.
- 9-13  Part 1 cards: server.json walkthrough (read it field by field) + the three publish commands + good-listing tips.
- 13-15 Transition: "the next line changes what you just learned - and it lands in 6 days."
- 15-28 Part 2 the 2026-07-28 delta. Stateless-core card FIRST (open the "handshake" mcpbox: "this is what disappears"). Then deprecations, MCP Apps/Extensions/Tasks, schema/error changes. Old-vs-new SVG.
- 28-33 Part 3 migration checklist (6 steps) + ecosystem trajectory + timeline SVG.
- 33-43 Demo 1 (write the manifest) briefly; Demo 2 (graduation trace) is the emotional close - open the "call" mcpbox and have THEM narrate it.
- 43-45 Quiz + send-off to the next course.

## Preflight
- RE-VERIFY the 2026-07-28 content against the published spec if delivering ON or AFTER Jul 28, 2026. Before that date, frame it as "release candidate, decoded ahead of finalization."
- Confirm mcp-publisher is installed if demoing live: `mcp-publisher --help`. Otherwise walk the commands from the page.
- Have a real GitHub account ready for the login demo, or pre-record it.
- server.json for Daybreak uses registryType "pypi" + transport stdio - sanity-check the schema URL still resolves.
- Confirm the "handshake" and "call" mcpboxes step and all THREE SVGs render.

## Never cut these beats
- Registry stores metadata only; package lives on PyPI/npm; name must match mcpName; namespace is io.github.you/* (quiz Q1).
- Stateless core removes the handshake + Mcp-Session-Id; capabilities move to _meta (quiz Q2). Use the "handshake" mcpbox as the visual.
- Roots/sampling/logging deprecated (12-month window); elicitation stays (quiz Q3).
- The graduation trace. Make at least one learner narrate handshake -> list -> call -> answer out loud. That is the whole course landing.

## Cuts if running long
- Skip the schema/error-code self-study card (marked self-study; it is in the capstone cheat sheet).
- Skip the ecosystem-trajectory self-study card.
- Do Demo 1 as a read-through of the manifest + commands rather than a live publish (publishing a real package mid-class is risky).

## Three likely questions
1. "The spec changes twice a year - is this obsolete already?" - The stability is the point now: MCP is Linux-Foundation (AAIF) governed with a public SEP process. Server/client primitives, JSON-RPC, and the two transports are stable. What moves is at the edges (session model, extensions). You learned the durable core plus how to track the deltas.
2. "Do I have to publish to PyPI to use the registry?" - Yes for a package-based listing: the registry holds metadata and points at the artifact on PyPI/npm, verified via mcpName. Remote servers can be listed by URL instead - see the registry's remote-servers docs.
3. "Should I adopt MCP Apps now?" - Treat it as preview. The spec (SEP-1865) is fresh and host support is early. Build a lean, standard core server; watch which hosts actually render Apps before you ship iframe UIs. Extensions are how these features arrive without bloating the base.

## Send-off
Next course: learn-ai-agents-with-phoebe - the Daybreak server becomes an agent's toolbox. Tell them the server they built this term is the foundation for the next one.
