# Presenter notes - b3 Resources and prompts

Builder track, session 3 of 8. 45 min. Medium. Goal: complete the server trio - add 2 resources
and 1 prompt so server.py matches project/server.py exactly. Hammer the control triangle.

## Run of show (45 min)

- 0-3   Welcome. "b2 the server DID things; tonight it gets context to read and playbooks to pick."
- 3-14  Part 1 Resources. Anatomy SVG (uri/name/mimeType/contents), then catalog line by line,
        then URI-design taste card. Step the "resources" wire box (list then read).
- 14-25 Part 2 Prompts. monthly_report walkthrough; params -> form fields. Step "prompts" wire box.
        Cover prompt-vs-system-doc as the self-study card if time.
- 25-30 Part 3 Round out. Capability-map SVG (3+2+1 by control). Completion/pagination named only.
        Confirm server.py now matches the project reference.
- 30-40 Demo 1 Ship the catalog resource (Resources tab read). Demo 2 Ship refund policy + prompt.
- 40-45 Quiz + homework (daybreak://stats/monthly computed resource).

## Preflight

- daybreak.db seeded and next to server.py (same as b2 preflight - re-run the seed to be safe).
- server.py at its b3-complete state ready to reveal, but start from the b2 state (tools only) so
  you add resources/prompt live.
- `uv run mcp dev server.py`; confirm Resources tab lists daybreak://catalog and reading it shows
  the priced markdown; confirm Prompts tab shows monthly_report with a month field.
- Verify catalog read shows Cold Brew Kit $34.00 at top (ORDER BY price DESC) so the demo is crisp.
- Step the "resources" and "prompts" wire boxes on the b3 page once so they are warm.

## Never cut these beats

- The control triangle: model->tools, app->resources, user->prompts. Say it three times, it is the
  spine of the whole session and a quiz answer.
- Resources can be COMPUTED, not just static files - catalog runs a query every read. This surprises
  people who think "resource = file".
- monthly_report's month parameter becoming a host-rendered form field - tie it back to a tool's
  input schema (same wire mechanism).
- "Your server now matches project/server.py exactly." Learners should feel the running project close.

## Cuts if long

- Completion + pagination self-study card -> point to it, do not present. Nothing is built there.
- prompt-vs-system-doc card can be a 20-second summary instead of the full three bullets.
- Demo 2's refund_policy paste can be shown pre-written rather than typed.
- URI-design card can drop to the two headline rules (nouns not verbs; hierarchies).

## Likely questions + answers

Q: When should something be a resource vs a tool?
A: Read-only context the APP attaches = resource (catalog, policy). An ACTION the model decides to
   take = tool (query_sales). If it changes state or the model chooses when to run it, it is a tool.
   Resources are nouns you read; tools are verbs you call.

Q: Why a prompt instead of just putting the instructions in a system prompt?
A: Use a prompt when it is reusable, takes arguments, and the USER should trigger it explicitly
   (slash command). It lives on the server, so updating the report format once updates every host.
   One-off context stays a system prompt; recurring reference material is a resource.

Q: Does the catalog resource re-query the db every time it is read? Isn't that slow?
A: Yes, it re-queries each read - and for Daybreak that is instant and always fresh (add a product,
   next read shows it, no cache to invalidate). At scale you would cache, but do not prematurely;
   the caller cannot tell static from computed and should not have to.
