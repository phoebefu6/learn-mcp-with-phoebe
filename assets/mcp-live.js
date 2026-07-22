/* learn-mcp-with-phoebe - live MCP wire inspector
   Every .mcpbox on a page is a step-through of REAL JSON-RPC traffic between
   an MCP client (host app) and the Daybreak MCP server - the exact messages
   the protocol puts on the wire, one step at a time, fully in your browser.
   No server, no network. Spec: 2025-11-25.

   Markup a page uses:
     <div class="mcpbox" data-scenario="handshake" data-caption="optional line"></div>

   Scenarios: handshake · tools · call · resources · prompts · elicit · error */

(function () {
  function J(o) { return JSON.stringify(o, null, 2); }

  var SCENARIOS = {
    handshake: {
      title: "the handshake - how a session starts",
      steps: [
        { dir: "c2s", method: "initialize", note: "Client opens the conversation: which spec version it speaks, what client-side features it offers, who it is.",
          json: { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-11-25", capabilities: { elicitation: {} }, clientInfo: { name: "daybreak-client", version: "1.0.0" } } } },
        { dir: "s2c", method: "initialize (result)", note: "Server answers: agreed version, which primitives it serves (tools, resources, prompts), who it is.",
          json: { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2025-11-25", capabilities: { tools: { listChanged: true }, resources: {}, prompts: {} }, serverInfo: { name: "daybreak-mcp", version: "1.0.0" } } } },
        { dir: "c2s", method: "notifications/initialized", note: "Client confirms - no id, so it is a notification (no reply expected). Session is live.",
          json: { jsonrpc: "2.0", method: "notifications/initialized" } }
      ],
      after: "Changes 2026-07-28: the stateless core removes this handshake - capabilities travel in _meta on each request instead."
    },
    tools: {
      title: "tools/list - what can you do?",
      steps: [
        { dir: "c2s", method: "tools/list", note: "Client asks the server to enumerate its tools. This is how a host discovers capabilities at runtime - no hardcoding.",
          json: { jsonrpc: "2.0", id: 2, method: "tools/list" } },
        { dir: "s2c", method: "tools/list (result)", note: "Each tool = name + description + JSON Schema for its inputs. The model reads these descriptions to decide what to call.",
          json: { jsonrpc: "2.0", id: 2, result: { tools: [
            { name: "query_sales", description: "Order count, refunds, and completed revenue for one month (YYYY-MM).", inputSchema: { type: "object", properties: { month: { type: "string" } }, required: ["month"] } },
            { name: "top_products", description: "Best-selling products by quantity for a date range.", inputSchema: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } } } },
            { name: "subscription_status", description: "Active vs cancelled subscription counts, with monthly quantities.", inputSchema: { type: "object", properties: {} } }
          ] } } }
      ]
    },
    call: {
      title: "tools/call - doing the work",
      steps: [
        { dir: "c2s", method: "tools/call", note: "The model picked query_sales and filled the arguments from the user's question. The client sends the call.",
          json: { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "query_sales", arguments: { month: "2026-03" } } } },
        { dir: "s2c", method: "tools/call (result)", note: "Result is a content array (text here; can be images or resource links). isError:false = the call itself succeeded.",
          json: { jsonrpc: "2.0", id: 3, result: { content: [ { type: "text", text: "2026-03: 5 orders (1 refunded), completed revenue $150.00. Down from $271.00 in 2026-02 - the March dip." } ], isError: false } } }
      ]
    },
    resources: {
      title: "resources - context, not actions",
      steps: [
        { dir: "c2s", method: "resources/list", note: "Resources are read-only context the host can attach to a conversation. Client asks what is available.",
          json: { jsonrpc: "2.0", id: 4, method: "resources/list" } },
        { dir: "s2c", method: "resources/list (result)", note: "Each resource has a URI, a name, and a MIME type. URIs use whatever scheme the server defines.",
          json: { jsonrpc: "2.0", id: 4, result: { resources: [
            { uri: "daybreak://catalog", name: "catalog", title: "Daybreak product catalog + prices", mimeType: "text/markdown" },
            { uri: "daybreak://policy/refunds", name: "refund-policy", title: "Refund + cancellation policy", mimeType: "text/markdown" }
          ] } } },
        { dir: "c2s", method: "resources/read", note: "Client fetches one resource by URI - typically because the user attached it or the host decided it is relevant.",
          json: { jsonrpc: "2.0", id: 5, method: "resources/read", params: { uri: "daybreak://catalog" } } },
        { dir: "s2c", method: "resources/read (result)", note: "The content comes back inline. The host decides what goes into the model's context - the server never pushes.",
          json: { jsonrpc: "2.0", id: 5, result: { contents: [ { uri: "daybreak://catalog", mimeType: "text/markdown", text: "# Daybreak catalog\n- Sunrise Blend $16 (Light)\n- Midnight Espresso $18 (Dark)\n- Single-Origin Ethiopia $22 (Light)\n- Cold Brew Kit $34" } ] } } }
      ]
    },
    prompts: {
      title: "prompts - reusable playbooks",
      steps: [
        { dir: "c2s", method: "prompts/list", note: "Prompts are server-authored templates the USER picks (slash-command style) - user-controlled, unlike tools (model-controlled).",
          json: { jsonrpc: "2.0", id: 6, method: "prompts/list" } },
        { dir: "s2c", method: "prompts/list (result)", note: "Each prompt declares its arguments so the host can render a form or autocomplete.",
          json: { jsonrpc: "2.0", id: 6, result: { prompts: [ { name: "monthly_report", description: "Standard monthly ops report for the founder.", arguments: [ { name: "month", required: true } ] } ] } } },
        { dir: "c2s", method: "prompts/get", note: "User picked monthly_report for March. Client asks for the filled-in template.",
          json: { jsonrpc: "2.0", id: 7, method: "prompts/get", params: { name: "monthly_report", arguments: { month: "2026-03" } } } },
        { dir: "s2c", method: "prompts/get (result)", note: "Back come ready-to-send chat messages. The host drops them into the conversation.",
          json: { jsonrpc: "2.0", id: 7, result: { description: "Monthly ops report", messages: [ { role: "user", content: { type: "text", text: "Write the 2026-03 ops report: orders and revenue vs last month, refunds, subscription changes, one action for next month." } } ] } } }
      ]
    },
    elicit: {
      title: "elicitation - the server asks YOU",
      steps: [
        { dir: "s2c", method: "elicitation/create", note: "Direction flips: the SERVER needs input mid-task and asks the client to collect it from the user, with a schema for the answer.",
          json: { jsonrpc: "2.0", id: 8, method: "elicitation/create", params: { message: "Which month should this report cover?", requestedSchema: { type: "object", properties: { month: { type: "string", enum: ["2026-01", "2026-02", "2026-03"] } }, required: ["month"] } } } },
        { dir: "c2s", method: "elicitation (result)", note: "The user picked a month in the host's UI. action can be accept, decline, or cancel - the user stays in control.",
          json: { jsonrpc: "2.0", id: 8, result: { action: "accept", content: { month: "2026-03" } } } }
      ],
      after: "Elicitation is a client-side primitive (since 2025-06-18) - most courses skip it; real servers increasingly rely on it."
    },
    error: {
      title: "errors - when a call goes wrong",
      steps: [
        { dir: "c2s", method: "tools/call", note: "Client calls a tool the server never declared. Watch what comes back.",
          json: { jsonrpc: "2.0", id: 9, method: "tools/call", params: { name: "delete_everything", arguments: {} } } },
        { dir: "s2c", method: "error", note: "A protocol-level JSON-RPC error: code + message, no result. Different from isError:true, which means the TOOL ran and failed.",
          json: { jsonrpc: "2.0", id: 9, error: { code: -32602, message: "Unknown tool: delete_everything" } } }
      ]
    }
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // minimal JSON syntax tint: keys, strings, numbers, literals
  function colorJSON(src) {
    return esc(src).replace(
      /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g,
      function (m, str, colon, lit, num) {
        if (str) return colon ? '<span class="mcp-k">' + str + "</span>" + colon
                              : '<span class="mcp-s">' + str + "</span>";
        if (lit) return '<span class="mcp-l">' + lit + "</span>";
        if (num) return '<span class="mcp-n">' + num + "</span>";
        return m;
      }
    );
  }

  function messageCard(step, idx) {
    var card = document.createElement("div");
    card.className = "mcp-msg " + (step.dir === "c2s" ? "mcp-c2s" : "mcp-s2c");
    var head = document.createElement("div");
    head.className = "mcp-msg-head";
    var arrow = step.dir === "c2s" ? "client ▸ server" : "server ▸ client";
    head.innerHTML = '<span class="mcp-step-n">' + (idx + 1) + "</span>" +
      '<span class="mcp-arrow">' + arrow + "</span>" +
      '<span class="mcp-method">' + esc(step.method) + "</span>";
    var pre = document.createElement("pre");
    pre.className = "mcp-json";
    pre.innerHTML = colorJSON(J(step.json));
    var note = document.createElement("p");
    note.className = "mcp-note";
    note.textContent = step.note;
    card.appendChild(head); card.appendChild(pre); card.appendChild(note);
    return card;
  }

  function wire(block) {
    var key = block.getAttribute("data-scenario");
    var sc = SCENARIOS[key];
    if (!sc) { block.innerHTML = '<p class="sql-err">Unknown scenario: ' + esc(key) + "</p>"; return; }
    var caption = block.getAttribute("data-caption") || "";
    var shown = 0;

    block.innerHTML = "";
    block.classList.add("mcpbox-ready");

    var bar = document.createElement("div");
    bar.className = "sql-bar";
    var dot = document.createElement("span"); dot.className = "sql-dot";
    var title = document.createElement("span"); title.className = "sql-title";
    title.textContent = "live MCP wire - " + sc.title;
    var spacer = document.createElement("span"); spacer.className = "sql-spacer";
    var counter = document.createElement("span"); counter.className = "mcp-counter";
    var backBtn = document.createElement("button");
    backBtn.type = "button"; backBtn.className = "sql-btn"; backBtn.textContent = "◀ Back";
    var nextBtn = document.createElement("button");
    nextBtn.type = "button"; nextBtn.className = "sql-btn sql-run"; nextBtn.textContent = "Next ▶";
    var allBtn = document.createElement("button");
    allBtn.type = "button"; allBtn.className = "sql-btn"; allBtn.textContent = "Show all";
    bar.appendChild(dot); bar.appendChild(title); bar.appendChild(spacer);
    bar.appendChild(counter); bar.appendChild(backBtn); bar.appendChild(nextBtn); bar.appendChild(allBtn);

    var lanes = document.createElement("div");
    lanes.className = "mcp-lanes";
    lanes.innerHTML = '<span class="mcp-lane">HOST APP · MCP CLIENT</span><span class="mcp-lane mcp-lane-r">DAYBREAK MCP SERVER</span>';

    var feed = document.createElement("div");
    feed.className = "mcp-feed";
    var hint = document.createElement("p");
    hint.className = "sql-note sql-hint";
    hint.textContent = "Press Next ▶ to put the first message on the wire.";
    feed.appendChild(hint);

    var afterNote = null;
    if (sc.after) {
      afterNote = document.createElement("p");
      afterNote.className = "mcp-after";
      afterNote.textContent = sc.after;
      afterNote.style.display = "none";
    }

    block.appendChild(bar);
    block.appendChild(lanes);
    block.appendChild(feed);
    if (afterNote) block.appendChild(afterNote);
    if (caption) {
      var cap = document.createElement("div"); cap.className = "sql-cap";
      cap.textContent = caption; block.appendChild(cap);
    }

    function render() {
      feed.innerHTML = "";
      if (!shown) feed.appendChild(hint);
      for (var i = 0; i < shown; i++) feed.appendChild(messageCard(sc.steps[i], i));
      counter.textContent = shown + " / " + sc.steps.length;
      backBtn.disabled = shown === 0;
      nextBtn.disabled = shown === sc.steps.length;
      nextBtn.textContent = shown === sc.steps.length ? "Done ✓" : "Next ▶";
      if (afterNote) afterNote.style.display = shown === sc.steps.length ? "" : "none";
    }

    nextBtn.addEventListener("click", function () {
      if (shown < sc.steps.length) { shown++; render(); }
    });
    backBtn.addEventListener("click", function () {
      if (shown > 0) { shown--; render(); }
    });
    allBtn.addEventListener("click", function () {
      shown = (shown === sc.steps.length) ? 0 : sc.steps.length;
      allBtn.textContent = shown ? "Restart" : "Show all";
      render();
    });

    render();
  }

  function init() {
    Array.prototype.slice.call(document.querySelectorAll(".mcpbox")).forEach(wire);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
