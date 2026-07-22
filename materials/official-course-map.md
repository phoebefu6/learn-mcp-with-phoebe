# Official course map - learn-mcp-with-phoebe

Research date: 2026-07-22. Teaching spec: **2025-11-25** (current). The **2026-07-28 revision finalizes six days after this research date** - every affected concept carries a "changes 2026-07-28" callout. Re-verify all callouts against the published spec after Jul 28, 2026.

## Sources

| # | Source | URL | Depth |
|---|--------|-----|-------|
| S1 | Official MCP docs + spec | modelcontextprotocol.io (llms.txt index) | ~100+ pages |
| S2 | Anthropic platform docs - MCP connector, remote servers | platform.claude.com/docs/en/agents-and-tools/mcp-connector | 2 pages |
| S3 | Claude Code MCP docs | code.claude.com/docs/en/mcp | 1 long page |
| S4 | DeepLearning.AI "MCP: Build Rich-Context AI Apps with Anthropic" (Schoppik) | deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic | 11 lessons, 1h58m |
| S5 | Hugging Face MCP course | huggingface.co/learn/mcp-course | 4 units + bonus |
| S6 | Anthropic Academy "Introduction to MCP" (Skilljar) | anthropic.skilljar.com/introduction-to-model-context-protocol | ~4h |
| S7 | Anthropic Academy "MCP: Advanced Topics" | anthropic.skilljar.com/model-context-protocol-advanced-topics | ~2h |

## Verified key facts (build against these)

- Current spec: **2025-11-25**. Prior: 2025-06-18, 2025-03-26, 2024-11-05. Next: **2026-07-28** (RC locked 2026-05-21).
- Transports: **stdio** + **Streamable HTTP**. The old HTTP+SSE transport was deprecated March 2025 - never teach it as current. WebSocket exists only as a Claude Code client option.
- Server-side primitives: **Tools, Resources, Prompts**. Client-side primitives: **Sampling, Roots, Elicitation** (elicitation since 2025-06-18). Utilities: logging, progress, cancellation, ping, completion, pagination, tasks.
- SDKs: 10 official, tiered. Tier 1: **TypeScript, Python, C#, Go**. Python SDK: `modelcontextprotocol/python-sdk`, docs py.sdk.modelcontextprotocol.io.
- Governance: donated to **Agentic AI Foundation (Linux Foundation), Dec 2025**; OpenAI + Block co-founders. NOT "Anthropic's protocol" anymore. SEP process governs changes.
- Adoption: OpenAI (Mar 2025), Google DeepMind Gemini (Apr 2025), Microsoft Copilot, VS Code, Cursor. ~97M monthly SDK downloads, ~10k active servers.
- Registry: launched Sept 2025; publish/versioning/moderation docs official.
- MCP connector (S2): call remote MCP servers directly from Messages API - no client app needed; Streamable HTTP + SSE only, no stdio; OAuth Bearer.
- Claude Code scopes (S3): **local / project / user**, `.mcp.json` with env-var expansion; install options: remote HTTP, remote SSE, local stdio, remote WebSocket.
- Auth: OAuth 2.1 resource-server model, hardened in 2025-11-25 and again in 2026-07-28.

## 2026-07-28 change register (callout boxes reference this table)

| Change | Affected sessions |
|--------|-------------------|
| Stateless core: initialize/initialized handshake + Mcp-Session-Id removed; capabilities in `_meta`; Mcp-Method/Mcp-Name routing headers | b1, b6, b8, a6 |
| **Roots, Sampling, Logging DEPRECATED** (12-month removal window) | b1, b7 (mention), b8, a6 |
| MCP Apps (sandboxed-iframe server UIs, SEP-1865) first-class | b8, a6 |
| Tasks graduated to extension; Extensions framework first-class | b8, a6 |
| Auth hardening: RFC 9207 iss validation, OIDC application_type in DCR | b7 |
| JSON Schema 2020-12 default; error code -32002 → -32602 | b8 |

## Per-session coverage - leader track (6 x 45 min)

| Session | Covers | S1 | S2 | S3 | S4 | S5 | S6 | S7 |
|---------|--------|----|----|----|----|----|----|----|
| a1 Why MCP | N x M problem, what-is, governance/AAIF, adoption stats | ✓ | | | ◐ | ◐ | ◐ | |
| a2 Architecture in plain English | host/client/server, 3 server primitives as business capability | ✓ | | ◐ | ◐ | ◐ | ◐ | |
| a3 The ecosystem play | registry, adoption, build-vs-buy, client matrix | ✓ | ◐ | | | ◐ | | |
| a4 Security + trust | OAuth in plain terms, data-exposure risks, vendor questions, security best practices | ✓ | ◐ | ◐ | | | | |
| a5 MCP in your org | use-case scan, connector strategy, Claude Code scopes as governance, ROI | ◐ | ✓ | ✓ | | | | |
| a6 Roadmap | 2026-07-28, MCP Apps, Tasks, extensions, deprecations, strategy implications | ✓ | | | | | | ◐ |

## Per-session coverage - builder track (8 x 45 min, Python, dual Claude/Ollama)

| Session | Covers | S1 | S2 | S3 | S4 | S5 | S6 | S7 |
|---------|--------|----|----|----|----|----|----|----|
| b1 What MCP is | architecture, primitives map (server + client side), JSON-RPC shape, inspector first look | ✓ | | | ✓ | ✓ | ✓ | |
| b2 First server | Python SDK, stdio server, tools, MCP Inspector | ✓ | | | ✓ | ✓ | ✓ | |
| b3 Resources + prompts | complete the server trio, completion, pagination | ✓ | | | ✓ | ◐ | ✓ | |
| b4 Connect real hosts | Claude Code .mcp.json + scopes, Claude Desktop config, reference servers | ✓ | | ✓ | ✓ | | | |
| b5 Build a client | Python client, sessions, chatbot loop w/ Claude API + Ollama path | ✓ | | | ✓ | ◐ | ✓ | |
| b6 Remote servers | Streamable HTTP in depth, state, deploy, MCP connector from Messages API | ✓ | ✓ | | ✓ | ◐ | | ✓ |
| b7 Auth + security + elicitation | OAuth 2.1 flow, security best practices, elicitation hands-on, notifications/progress | ✓ | ◐ | | | | | ✓ |
| b8 Registry + what's next | publish to registry, versioning, sampling/roots (as deprecated-soon), MCP Apps/Tasks/extensions, 2026-07-28 | ✓ | | | | ◐ | | ◐ |

✓ = session teaches ~80% of that source's working content for the topic. ◐ = partial/contextual.

## Overlap analysis (scoping lever)

Shared core taught ONCE (appears in 3+ sources): architecture host/client/server · tools · resources · prompts · build a Python server · build a client · stdio + Streamable HTTP · Inspector/debugging · Claude Desktop/Code connection · remote deployment. Sessions b1-b6 carry this spine.

Unique deltas: S1-only (registry, extensions, MCP Apps, tasks, security tutorials, governance) → b7/b8/a6. S7-only (sampling, roots, notifications, StreamableHTTP internals) → b6/b7/b8. S2-only (MCP connector) → b6/a5. S3-only (scopes, .mcp.json) → b4/a5.

## Open lane (nobody teaches yet - this course's differentiation)

Elicitation hands-on (b7) · 2026-07-28 stateless model (callouts + b8/a6) · Registry publishing (b8) · OAuth flow in practice (b7) · JSON-RPC live playground (mcp-live.js, all b-track).

## Not covered by design (honest list)

- TypeScript/other-SDK server authoring (Python only; TS pointed to official quickstart)
- Gradio/HF-ecosystem deployment path (S5 Unit 2-3) - HF-specific, linked not taught
- Certificates, graded quizzes, videos of S4-S7 - stay official; this course cites them
- Building MCP Apps UIs (spec too fresh; preview only in b8)
- Enterprise-managed authorization extension details (pointer only)

## Fast-moving product note

MCP spec revs ~2x/year. Before any live delivery: re-check spec "Key Changes" page + registry docs; after 2026-07-28 update all callout boxes and flip b8/a6 framing from "coming" to "landed".

## Appendix: fetched syllabi (verbatim)

- S4 lessons: Introduction / Why MCP / MCP Architecture / Chatbot Example / Creating an MCP Server / Creating an MCP Client / Connecting the MCP Chatbot to Reference Servers / Adding Prompt and Resource Features / Configuring Servers for Claude Desktop / Creating and Deploying Remote Servers / Conclusion.
- S5 units: 0 Onboarding / 1 Fundamentals, Architecture and Core Concepts / 2 End-to-end use case (Gradio) / 3 Deployed use case (HF ecosystem) / 4 Bonus.
- S6 sections: Introduction (Welcome, Introducing MCP, MCP clients) / Hands-on with MCP Servers (Project setup, Defining tools, Server inspector) / Connecting with MCP Clients (Implementing a client, Defining resources, Accessing resources, Defining prompts, Prompts in the client) / Assessment.
- S7 sections: Core MCP Features (Sampling, Log + progress notifications, Roots) / Transports (JSON message types, STDIO, StreamableHTTP, StreamableHTTP in depth, State + StreamableHTTP) / Assessment.
