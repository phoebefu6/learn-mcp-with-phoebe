# Presenter notes - b6 Remote servers

Track: Builder · Session 6 of 8 · 45 min · Difficulty: Hands-on
Page: courses/b6-remote-servers.html
One-line promise: they flip Daybreak to a web service with one line, curl it, and get the March answer from the Messages API with zero client code.

## Run of show (45 min)
- 0-3   Part 0 recap. b6 crosses machines: stdio was local-only; tonight Daybreak goes remote.
- 3-11  Part 1 Streamable HTTP in depth. Walk the sequence SVG: one endpoint, POST in, optional SSE upgrade per request. Kill the HTTP+SSE zombie ("if a tutorial teaches two endpoints, close it").
- 11-15 Part 1 request-lifecycle card (the HTTP-flavored wire) + the "call" is the same JSON-RPC inside HTTP.
- 15-18 Part 1 STATE card - the differentiator. Open the "handshake" mcpbox and say "this is what the 2026-07-28 stateless core removes." Capabilities move to _meta; routing headers appear.
- 18-24 Part 2 take Daybreak remote. Show the one-line transport flip. Walk the provider-neutral deploy checklist.
- 24-30 Part 3 the MCP connector. Three-modes SVG (host app / your client / connector). Read the curl body; point out the allowlist pattern.
- 30-40 Demo 1 (flip + curl initialize, capture Mcp-Session-Id, tools/call). Demo 2 (connector request -> March answer).
- 40-45 Quiz + Q&A.

## Preflight
- project/server.py runs on stdio AND with transport="streamable-http" (test both before class).
- Have curl ready; know your local endpoint (default http://127.0.0.1:8000/mcp).
- If demoing the connector live: a deployed HTTPS instance + a valid OAuth token, OR pre-capture the response to show. Do NOT try to stand up OAuth live.
- Beta header is mcp-client-2025-11-20 (current). Double-check it has not moved before class - the connector version changes.
- Confirm the "handshake" mcpbox steps and both SVGs render.

## Never cut these beats
- One endpoint, POST per message, SSE upgrade is per-request and server-chosen (quiz Q1).
- Session tracked by Mcp-Session-Id TODAY; stateless core removes it 2026-07-28 and puts capabilities in _meta (quiz Q2). This is the course's signature content.
- Connector is remote-only + tool-only: no stdio, no resources/prompts (quiz Q3).
- Actually run one curl so they see the raw JSON-RPC come back over HTTP.

## Cuts if running long
- Skip the stateless-friendly-design self-study card (marked self-study).
- Narrate Demo 2 with the pre-captured response instead of a live API call.
- Compress the deploy checklist to one sentence ("bind 0.0.0.0 + PORT, expose /mcp over HTTPS, add auth in b7").

## Three likely questions
1. "Which host should I deploy to?" - Deliberately provider-neutral. Any platform that runs a long-lived Python process works: read PORT from env, bind 0.0.0.0, pin mcp[cli]. Do not let the class turn into a hosting-vendor debate.
2. "If sessions go away on 2026-07-28, is my b6 work wasted?" - No. Same transport, same tools, same results - only how the session is carried changes. Keep handlers pure (everything from arguments) and the switch is a non-event.
3. "Connector vs my own client - which should I build?" - Connector when the server is remote, you only need tools, and Claude is your model (zero client code, built-in allowlists). Your own client (b5) for stdio, resources/prompts, non-Claude models, or custom orchestration.
