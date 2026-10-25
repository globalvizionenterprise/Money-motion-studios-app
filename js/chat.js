// MONEY MOTION STUDIOS - AI Chat page (public, OpenRouter free models via mm-chat)
(function () {
  var cfg = window.MM_CONFIG || {};
  var history = [];
  var box = document.getElementById("ai-messages");

  function append(role, text) {
    var div = document.createElement("div");
    div.className = "ai-msg " + role;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  document.getElementById("ai-send").addEventListener("click", async function () {
    var errEl = document.getElementById("ai-error");
    errEl.textContent = "";
    var input = document.getElementById("ai-input");
    var text = input.value.trim();
    if (!text) { errEl.textContent = "Write a message first."; return; }
    history.push({ role: "user", content: text });
    while (history.length > 20) history.shift();
    var userBubble = append("user", text);
    input.value = "";
    var btn = this;
    btn.disabled = true; btn.textContent = "Thinking...";
    try {
      var res = await fetch(cfg.SUPABASE_URL + "/functions/v1/mm-chat", {
        method: "POST",
        headers: {
          "apikey": cfg.SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + cfg.SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: history.slice(),
          model: document.getElementById("ai-model").value
        })
      });
      var out = await res.json().catch(function () { return {}; });
      if (!res.ok) throw new Error(out.error || ("HTTP " + res.status));
      history.push({ role: "assistant", content: out.reply });
      append("assistant", out.reply);
    } catch (ex) {
      history.pop();
      if (userBubble) userBubble.remove();
      append("system", ex.message);
    } finally {
      btn.disabled = false; btn.textContent = "Send";
    }
  });
})();
