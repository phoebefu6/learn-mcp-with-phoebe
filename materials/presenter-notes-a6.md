# Presenter notes - Leader session 6: The roadmap and your strategy

**Audience:** C-level, managers, curious non-engineers. **Length:** 45 min. **Tone:** deciding, forward-looking - the closing session of the leader track. No code.

**One-line promise:** "You finish able to make MCP decisions that still look smart two revisions from now."

**TIMING NOTE:** The 2026-07-28 revision finalizes just days after this course shipped. Before any live delivery on or after Jul 28 2026, re-open the official Key Changes page and confirm the four decoded themes match the published text. Flip any "coming" language to "landed" and correct anything that shifted.

---

## Run of show (45 min)

| Time | Segment | What you do |
|------|---------|-------------|
| 0-3 | Welcome | Frame the temporal skill: a standard that ships twice a year is a tailwind if you can read it. Read the ★ walk-out box. |
| 3-18 | Part 1 · How MCP evolves | Walk the five-node timeline SVG. Teach the three-question changelog read live (the executive discipline). Land "dates, not versions" as a governance signal. |
| 18-30 | Part 2 · Revision decoded | Four cards, one theme each: stateless=cost, MCP Apps=product surface, Tasks/Extensions=maturity, deprecations=budget. Business implications only - never protocol detail. |
| 30-40 | Part 3 · Fund/wait/watch | Walk the three-lane SVG. Open the 12-month horizon plan table. This is the allocation they leave with. |
| 40-45 | Demos + close | Point at Demo 1 (stress-test) and Demo 2 (position memo). Close the whole track: memo + review date. Send them to the builder track. |

---

## Preflight (2 min)

- **Re-verify the spec first** (see timing note). This session ages faster than any other.
- Open the page, **Expand all**, confirm all four Part 2 cards + both Part 3/demo cards open, then collapse.
- Projector zoom on; check the timeline SVG dates and the fund/wait/watch lanes render inside their boxes.
- Have the a5 first-server candidate ready - Demo 1 stress-tests it, so the two sessions must connect.

---

## Never-cut beats

1. **The three-question changelog read** (Part 1). This is the single reusable executive skill of the session: what got deprecated / cheaper / newly possible. If they remember one thing, it is this.
2. **Deprecations = the only entry with a deadline** (Part 2). This is where real money and risk live. Make them ask their teams about roots/sampling/logging.
3. **Fund vs wait split** (Part 3). Fund skills + governance (compounding, revision-proof); wait on MCP Apps in production. The clarity of that line is the payoff.
4. **The position memo + a named review date** (Demo 2). This turns the whole 6-session track into something their org actually holds. Do not let the session end without assigning it.

---

## Cuts if running long

- Part 1 self-study card "dates, not versions as a governance signal" can be left for reading; keep the timeline SVG and the changelog-read card.
- Part 2 deprecations card can be summarized in one line ("one year to migrate roots/sampling/logging, budget it now") if time-squeezed - but never cut the concept.
- Demo 1 (stress-test) can be homework; Demo 2 (position memo) is the one to draft in the room - it is the track's capstone.
- Do NOT cut the fund/wait/watch allocation or the memo assignment.

---

## Three likely questions + answers

**Q: "If it changes twice a year, isn't betting on MCP risky?"**
A: The opposite - the cadence is published and the governance is neutral (Linux Foundation, OpenAI and Block co-founding). You are reading a roadmap, not waiting for a vendor's surprise. And what we tell you to fund - server skills and governance - pays off under every revision. The moving parts are exactly the ones we tell you to wait and watch on.

**Q: "Should we be building on MCP Apps now? It sounds like the exciting part."**
A: It is the exciting part, and it is the least mature. Servers shipping their own UI inside someone's AI is a genuine new surface, but it only works once the hosts your customers use render it. Fund a small experiment if it maps to your product; do not promise customers a UI-in-their-AI feature yet. That is the whole reason it sits in the wait lane, not the fund lane.

**Q: "We already invested in the current spec. Does the July revision make that wasted?"**
A: No. The stateless core makes your remote servers cheaper to scale, not obsolete - it is a tailwind. The only real work is the deprecation window: if any server uses roots, sampling, or logging, you have twelve months to migrate. Put that on a roadmap now. Everything else you built stays valid; the core is deliberately kept small and stable.
