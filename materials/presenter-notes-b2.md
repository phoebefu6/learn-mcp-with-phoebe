# Presenter notes - b2 Your first MCP server

Builder track, session 2 of 8. 45 min. Easy. Goal: every learner leaves with a running
daybreak-mcp stdio server (3 tools) and the Inspector open on it, having seen $150.00 for March.

## Run of show (45 min)

- 0-3   Welcome + the arc: "b1 you read the wire, tonight you write the thing that speaks it."
- 3-9   Part 1 Setup. Run the three prompt-boxes live: uv init/venv, uv add "mcp[cli]", seed.
- 9-16  Part 2 FastMCP + first tool. Walk the decorator-to-wire SVG, then query_sales line by line.
        Land the craft point: the docstring IS the interface the model reads.
- 16-28 Demo 1 Build query_sales end to end. Everyone types along; finish on month=2026-03 -> $150.00.
- 28-38 Demo 2 Add top_products + subscription_status. Show how defaults vs no-args change the form.
- 38-42 Part 3 Inspector recap + the three failure modes (path, unseeded db, stdout).
- 42-45 Quiz (3 Qs) + homework pointer.

## Preflight (do BEFORE the room fills)

- uv installed and on PATH (`uv --version`). Have the pip fallback line ready for anyone without uv.
- Fresh clone of project/: server.py + seed_daybreak.py present.
- Run `python seed_daybreak.py` yourself; confirm "daybreak.db created ... (33 orders)".
- Run `uv run mcp dev server.py` once; confirm the Inspector opens and the Tools tab lists all three.
- Call query_sales(2026-03) yourself and SEE $150.00 before class. Call 2026-02 -> $271.00.
- Have the b2 page open; step the "tools" and "call" wire boxes once so they cache.
- Terminal font large enough to read from the back; browser zoom ready for the Inspector.

## Never cut these beats

- The docstring = interface point (Part 2, second card). It is the transferable skill of the session.
- Everyone personally calls query_sales(2026-03) and reads $150.00 with their own eyes. Non-negotiable.
- The stdout warning: a stray print() in a stdio server kills the connection. Saves them an afternoon.
- Results are strings. Every Daybreak tool returns str - set the expectation now, it holds all track.

## Cuts if running long

- Demo 2's subscription_status can be assigned as read-along rather than typed live.
- The "connector team that disappeared" style example can be summarized in one line.
- Part 3 self-study card (common failures) -> tell them to read it; keep only the stdout beat live.
- Skip re-stepping the tools wire box if b1 is fresh in their minds.

## Likely questions + answers

Q: Do I have to use uv? Can I just pip install?
A: Yes - `pip install "mcp[cli]"` inside any venv works identically. uv is what the official
   quickstart standardizes on and it is faster, so we teach it, but nothing here depends on uv.

Q: Why does the tool return a string and not a dict/JSON? Isn't that lossy?
A: For this course, tool results are strings by design - it is the simplest content type and what
   the model consumes as text. MCP supports structured/typed content too, but string results keep
   b2-b5 focused; we are teaching the server shape, not output schemas.

Q: My tool shows up but returns "No orders found for 2026-03". What did I do wrong?
A: Almost always the db is unseeded or not next to server.py. Re-run `python seed_daybreak.py`
   and confirm daybreak.db sits in the same folder - DB_PATH is built from __file__, so keep them
   together. If it still fails, open the Inspector; it surfaces the traceback.
