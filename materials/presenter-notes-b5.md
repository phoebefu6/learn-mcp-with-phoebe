# Presenter notes - b5 Build a client

Track: Builder · Session 5 of 8 · 45 min · Difficulty: Medium
Page: courses/b5-build-a-client.html
One-line promise: they leave with a working client.py that answers "how did March look?" with $150.00 - on Claude, then on Ollama.

## Run of show (45 min)
- 0-3   Part 0 recap. Callback to b1 (they watched the wire) and b4 (hosts hid the client). Tonight they ARE the client.
- 3-10  Part 1 the other side of the wire. Walk the client-internals SVG. Open the "call" mcpbox and say: the client SENDS these.
- 10-13 Part 1 card: ClientSession + stdio_client minimum viable client. Read the 12 lines aloud; this is the whole client in miniature.
- 13-18 Part 1 session lifecycle card. Hammer "the client always starts the handshake". Flag the 2026-07-28 change once, lightly.
- 18-28 Part 2 the chatbot loop. Claude path card first, then Ollama. Draw the loop on the board: user -> model+tools -> tool_use -> call_tool -> tool_result -> answer.
- 28-33 Part 2 close: emphasize the loop is IDENTICAL for both models; only the middle SDK call changes.
- 33-40 Demo 1 (Chat with Daybreak) live if you can; Demo 2 (Ollama) narrated if time is short.
- 40-45 Quiz (3 Q) + Q&A.

## Preflight (do before class)
- `uv add mcp anthropic python-dotenv`; `.env` has a real ANTHROPIC_API_KEY; `.env` in `.gitignore`.
- project/server.py runs and answers query_sales for 2026-03 = $150.00 (sanity-check the DB is seeded).
- For the Ollama demo: `ollama pull llama3.2` done, `pip install ollama`, ollama daemon running.
- Have client.py already written so a live typo does not eat 10 minutes; type only the interesting lines.
- Open the page once; confirm mcpbox "call" and "error" step through and the SVGs render.

## Never cut these beats
- "The client always initiates the handshake." This is quiz Q1 and the #1 misconception.
- The tool_use -> session.call_tool -> tool_result mapping (quiz Q2). Say it three times, three ways.
- The three failure layers (protocol error / isError:true / transport drop) and that retries only help layer 3 (quiz Q3).
- Run the March question live at least once so they SEE $150.00 come from their own code.

## Cuts if running long
- Drop the multi-server self-study card (it is marked self-study anyway).
- Narrate Demo 2 (Ollama) instead of running it; the code card carries it.
- Shorten Part 3 to just the SVG + the "retries only on layer 3" line; skip reading the defensive-call snippet.

## Three likely questions
1. "Why async everywhere?" - The MCP Python SDK is async; stdio_client and ClientSession are async context managers, and call_tool is awaitable. Wrap the whole thing in asyncio.run(main()). Sync wrappers exist but the official pattern is async.
2. "Does the model ever talk to the server directly?" - No. The model only talks to YOUR client. The client is the only thing on the JSON-RPC wire. tool_use is the model asking the client to make a call; the client decides whether/how to make it.
3. "Ollama gave a wrong answer / didn't call the tool." - That is model quality, not MCP. Small local models sometimes guess instead of calling. Tighten the tool description, keep the question concrete, use a tool-tuned model. The wire traffic is identical to Claude's.
