# Presenter notes - b4 Connect to real hosts

Builder track, session 4 of 8. 45 min. Medium. Goal: same daybreak-mcp running in Claude Code AND
Claude Desktop, zero code changes. Deliver the payoff moment: ask "how did March look?" -> $150.

## Run of show (45 min)

- 0-3   Welcome. "Your server works in the Inspector; tonight it works everywhere - by config, not code."
- 3-13  Part 1 Claude Code. Three-scope SVG + precedence (local>project>user). Scope decision guide
        card + the project-scope .mcp.json. Verifying: /mcp and mcp__daybreak__query_sales naming.
- 13-20 Part 2 Claude Desktop. claude_desktop_config.json, absolute --directory, restart to load.
        VS Code/Cursor as self-study.
- 20-26 Part 3 Reference servers. Hub SVG (one host, many servers). Pair filesystem next to daybreak.
        Step the "handshake" wire box - "every host runs this exact handshake, once per server."
- 26-38 Demo 1 Wire into Claude Code -> ask "how did March look?" -> query_sales -> $150.
        Demo 2 Same server, Claude Desktop, one restart, same answer.
- 38-45 Quiz + homework (reference server at user scope + write a scope policy).

## Preflight

- Claude Code installed and working in a scratch repo; you can run /mcp and see server status.
- Claude Desktop installed; know where the config file is on your OS and have it open in an editor:
  macOS ~/Library/Application Support/Claude/claude_desktop_config.json
- daybreak-mcp folder ready with server.py + seeded daybreak.db; know its ABSOLUTE path for Desktop.
- Pre-test BOTH hosts end to end before class: .mcp.json in Claude Code -> "how did March look?" ->
  confirm it calls mcp__daybreak__query_sales and answers $150.00; then Desktop the same.
- Have npx available if you demo the filesystem reference server pairing.
- Step the "handshake" wire box on the b4 page once so it is warm.

## Never cut these beats

- Precedence local>project>user - it is a quiz answer and the one rule people get wrong.
- The payoff: the SAME server.py in a second host with ZERO code changes. Say it out loud, twice.
- Ask the question in plain English ("how did March look?") and let the MODEL pick month=2026-03.
  Do not hand it the argument - the point is the model reading your docstring and deciding.
- Desktop needs a FULL restart (quit + reopen) and ABSOLUTE paths - the two failures everyone hits.
- Tool naming mcp__daybreak__query_sales is how you PROVE a server landed; server name = JSON key.

## Cuts if long

- VS Code/Cursor self-study card -> mention in one line, do not open.
- Reference-server pairing demo can be described rather than run live if npx is slow.
- The env-var expansion detail (${VAR:-default}) can be a footnote unless someone asks about secrets.
- Homework "name collision" experiment can be assigned, not demoed.

## Likely questions + answers

Q: What is the difference between project scope and user scope, really?
A: Audience. Project = .mcp.json checked into the repo root, so the whole TEAM gets the server on
   clone (great for a shared internal server). User = your personal toolbox, available in EVERY
   project you open (great for a reference filesystem/memory server). Local = just you, just here.

Q: Why did my Desktop config not load - the JSON looks right?
A: Two usual causes: (1) you did not FULLY restart Desktop (close the window is not enough - quit
   and reopen; it reads config only at startup), or (2) a relative path - Desktop does not launch
   from your project folder, so pass an absolute --directory. Check ~/Library/Logs/Claude/mcp*.log.

Q: If I add a reference server, will its tools clash with mine?
A: No. Every tool is namespaced mcp__<server>__<tool>, so mcp__daybreak__query_sales and
   mcp__filesystem__read_file coexist cleanly. A host running several servers at once is the normal
   case; the prefix is exactly what keeps them apart.
