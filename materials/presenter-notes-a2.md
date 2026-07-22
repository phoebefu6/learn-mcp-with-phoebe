# Presenter notes - a2 · The architecture in plain English

**Track:** Leader (6 x 45 min) · **Session:** 2 of 6 · **Difficulty:** Easy (green)
**Audience:** C-level, managers, curious minds · **No code, no terminal.**
**One-sentence goal:** leaders leave able to draw host/client/server on a napkin and sort any capability into tool/resource/prompt by who controls it.

---

## Run of show (45 min)

| Time | Segment | What you do | Slide/asset |
|------|---------|-------------|-------------|
| 0-3 | Recap a1 | One line: "MCP turns M x N connectors into M + N." Ask for one integration pain from homework. | Masthead |
| 3-12 | Part 1 · three roles | Walk the restaurant SVG. Host = restaurant, client = waiter (one per kitchen), server = kitchen with a menu. | Restaurant SVG |
| 12-16 | one-to-one rule | Open card 1. Sell isolation as a governance feature, not a technicality. | Card: one-waiter-per-kitchen |
| 16-24 | Part 2 · three offers | Walk the control-triangle SVG. Tools=action, resources=reading, prompts=playbook. | Control-triangle SVG |
| 24-28 | Daybreak menu | The three step cards: query_sales / catalog / monthly_report. Land "the one-line test." | Steps + tip callout |
| 28-32 | Part 3 · commissioning | Reading a listing; local vs remote in risk terms. | Two Part-3 cards |
| 32-40 | Demos | Demo 1 spec-a-server (paper), Demo 2 sort-the-menu. Do Demo 2 live as a group. | Demo sections |
| 40-45 | Quiz + Q&A | Run the 3-question quiz on screen; take questions. | Quiz |

---

## Preflight (do before the room fills)

- Open a2 in the browser; click **Projector zoom: on** and confirm both SVGs are legible from the back.
- **Expand all** once to check every card opens, then collapse.
- Zoom-test both figures (click to zoom) - the restaurant and the triangle are the two things they must see clearly.
- Have a1's N x M worksheet handy; several will not have done homework - have a blank to hand out.
- Pen and paper on every seat for Demo 1.

---

## Never-cut beats (the session fails without these)

1. **The three roles in restaurant language.** If they only remember one thing, it is host/client/server as restaurant/waiter/kitchen.
2. **The control triangle.** Tools are model-controlled actions; that is the safety story. Say "only tools let the AI act" out loud.
3. **The one-line test.** "Action, reading, or playbook?" - this is the reusable tool they take to every future vendor conversation.
4. **Demo 2 sorted answer**, especially gating `refund_order`. It proves they can reason about risk with zero technical knowledge.

## Cuts if running long

- Drop the Part 1 self-study card (who-plays-each-role) - it is labeled self-study anyway.
- Shorten Demo 1 to "name two tools and mark who controls each"; assign the rest as homework.
- Skip the local-vs-remote card live and point them to it as reading (a4 revisits it).
- Never cut the control triangle or Demo 2 to save time - cut elsewhere.

---

## Three likely audience questions + answers

**Q1: "If the AI can call tools on its own, what stops it doing something destructive?"**
A: Three layers. The server author decides which tools exist and whether they only read. The host enforces permissions and can require human approval. And you scope credentials so even a called tool can only touch what you allowed. Session a4 is entirely about this - today's takeaway is just to notice that tools are the risky primitive and gate them.

**Q2: "Do we build servers ourselves or buy them?"**
A: Both, and a3 gives you the decision matrix. Short version: buy the commodity connections (calendar, help desk), build the servers that sit on your proprietary data. Today just note that a server is a bundle of tools, resources, and prompts around one system - that is the unit you commission.

**Q3: "Is 'local vs remote' a security question or a convenience question?"**
A: Both, and they pull in opposite directions. Local is convenient for one person but hard to govern; remote is what you standardize on because central hosting is where auditing and access control live. For anything more than one person's experiment, prefer remote. a4 covers the security specifics.

---

*Leader session 2 of 6 · learn-mcp-with-phoebe · by Phoebe Fu*
