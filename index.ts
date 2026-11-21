<!-- === FILE: index.html === -->
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Subtexta × Vibex — CMTE v5.1 Analyzer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #070B14; color: #F1F5F9; font-family: system-ui, -apple-system, sans-serif; }
    .card { background: #0E1525; border: 1px solid rgba(56, 189, 248, 0.16); }
    .btn-tap { min-height: 44px; }
    .tab-active { background: #06B6D4; color: #04101B; font-weight: 700; }
    .tab-idle { background: #111B30; color: #94A3B8; }
  </style>
</head>
<body class="min-h-screen p-3 sm:p-6">
  <div class="max-w-3xl mx-auto space-y-5">

    <!-- HEADER -->
    <header class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-cyan-400">Subtexta × Vibex</h1>
        <p class="text-xs font-mono text-slate-400">CMTE v5.1 Math-First Engine • Wolf-Jolion + Chamfer + Cartesian Tensor + AC-Stack</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button onclick="runMathSelfTest()" class="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300">
          Run 6-Point Self-Test
        </button>
        <span id="baselinePill" class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300">
          B₀: Uncalibrated
        </span>
        <label class="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg cursor-pointer">
          <input id="deepToggle" type="checkbox" class="accent-cyan-400" />
          <span>Deep (3.8)</span>
        </label>
      </div>
    </header>

    <!-- SELF-TEST BANNER -->
    <div id="selfTestBanner" class="hidden rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-[11px] font-mono text-emerald-200 space-y-1"></div>

    <!-- 2-TAB NAVIGATION -->
    <nav class="grid grid-cols-2 gap-2">
      <button id="tabTextBtn" onclick="switchTab('text')" class="btn-tap rounded-xl text-sm transition tab-active">
        Tab 1: Text &amp; Chat Analysis
      </button>
      <button id="tabPhotoBtn" onclick="switchTab('photo')" class="btn-tap rounded-xl text-sm transition tab-idle">
        Tab 2: Handwriting Photo
      </button>
    </nav>

    <!-- ==================== TAB 1: TEXT & SCREENSHOT ANALYSIS ==================== -->
    <section id="panelText" class="card rounded-2xl p-4 sm:p-5 space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Sender / Relationship (Optional)</label>
          <input id="textContext" type="text" placeholder="e.g. Partner, Boss, Friend, Ex..."
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400" />
        </div>
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Or Attach Chat Screenshot (Optional)</label>
          <input id="screenshotInput" type="file" accept="image/*" onchange="handleScreenshotSelect(event)"
            class="w-full text-xs text-slate-300 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-cyan-300" />
        </div>
      </div>

      <div id="screenshotPreviewWrap" class="hidden space-y-2 bg-slate-950 border border-cyan-500/30 rounded-xl p-3">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <img id="screenshotThumb" class="w-12 h-12 object-cover rounded-lg border border-slate-700" alt="Screenshot preview" />
            <div>
              <p class="text-xs font-semibold text-cyan-300">Screenshot Mode Active</p>
              <p id="screenshotMeta" class="text-[11px] text-slate-400">EXIF-corrected JPEG ready for OCR</p>
            </div>
          </div>
          <button onclick="clearScreenshot()" class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-rose-300">Remove</button>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-[11px] font-mono text-slate-400">Target Speaker:</label>
          <select id="speakerIsolation" class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200">
            <option value="full_dyadic_thread">Full Dyadic Thread</option>
            <option value="left_white_only">Left / Incoming Bubbles Only</option>
            <option value="right_green_only">Right / Outgoing Bubbles Only</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
          Preceding Message (Optional — unlocks Active LSM &amp; JS Divergence)
        </label>
        <textarea id="precedingInput" rows="2" placeholder="Paste the message sent right before theirs..."
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"></textarea>
      </div>

      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <label class="text-[11px] uppercase tracking-wider text-slate-400">Target Message (or Pasted WhatsApp Thread)</label>
          <div class="flex items-center gap-2">
            <span id="acTraceBadge" class="text-[10px] font-mono text-slate-400">AC-Stack: 0 edits</span>
            <button onclick="parseWhatsAppPaste()" type="button"
              class="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300">
              Parse Chat Timestamps
            </button>
          </div>
        </div>
        <textarea id="messageInput" rows="4" oninput="trackLexicalRevisions()"
          placeholder="Paste their text message or a multi-line WhatsApp export here..."
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400"></textarea>
        <div id="threadParseNote" class="hidden text-[11px] font-mono text-emerald-300 mt-1"></div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button id="analyzeTextBtn" onclick="runTextAnalysis()"
          class="btn-tap flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl px-4 text-sm transition">
          Analyze Text Subtext
        </button>
        <button onclick="lockSessionBaselineFromLast()" id="lockBaseBtn" disabled
          class="btn-tap px-4 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300 disabled:opacity-40">
          Lock B₀ Baseline
        </button>
      </div>
    </section>

    <!-- ==================== TAB 2: HANDWRITING PHOTO ANALYSIS ==================== -->
    <section id="panelPhoto" class="hidden card rounded-2xl p-4 sm:p-5 space-y-4">
      <div class="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-5 text-center space-y-2 bg-slate-950/60">
        <p class="text-sm font-semibold text-slate-200">Take or Upload a Photo of Handwriting on Paper</p>
        <p class="text-xs text-slate-400">EXIF-corrected local 2D engine: Wolf-Jolion, Chamfer 3–4 DT, Cartesian Stem Tensor, Theil-Sen, Agmon H¹/H², Ramsey K₃ &amp; Menger H(κ)</p>
        <input id="photoInput" type="file" accept="image/*" onchange="handleHandwritingSelect(event)"
          class="mx-auto block text-xs text-slate-300 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-500 file:text-slate-950 file:font-bold" />
      </div>

      <div id="photoPreviewWrap" class="hidden space-y-3">
        <div class="grid sm:grid-cols-2 gap-3 items-start bg-slate-950 border border-slate-800 rounded-xl p-3">
          <img id="photoPreview" class="w-full max-h-60 object-contain rounded-lg bg-black" alt="Handwriting preview" />
          <div class="space-y-1.5 font-mono text-[11px]">
            <div class="text-cyan-400 font-bold uppercase">Local 2D Ink Geometry (<span id="geomTimeMs">0</span> ms)</div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Stem Slant / Aniso:</span><span id="gSlant">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Theil-Sen Slope (β₁):</span><span id="gSlope">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Agmon Tremor / Spike:</span><span id="gTremor">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Chamfer Width / Opt CV:</span><span id="gWidth">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Zones (U / M / L):</span><span id="gZones">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Ramsey K₃ / Menger H(κ):</span><span id="gRamsey">--</span></div>
            <div class="flex justify-between border-b border-slate-800 pb-1"><span class="text-slate-400">Gap Burst / Spatial χ²:</span><span id="gBurst">--</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Lines / Fatigue βₕ:</span><span id="gLines">--</span></div>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Dominant Hand</label>
          <select id="metaHand" onchange="recomputePhotoGeometry()"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm">
            <option value="unsure">Unsure</option>
            <option value="right">Right-Handed</option>
            <option value="left">Left-Handed (0.78× Discount)</option>
          </select>
        </div>
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Date of Birth (Optional)</label>
          <input id="metaDob" type="date"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Gender Context (Optional)</label>
          <input id="metaGender" type="text" placeholder="Optional prior"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label class="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Context Notes (Optional)</label>
        <input id="metaNotes" type="text" placeholder="e.g. Written quickly on unlined paper, ballpoint pen..."
          class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm" />
      </div>

      <label class="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-pointer">
        <input id="gdprConsent" type="checkbox" class="mt-0.5 accent-cyan-400" />
        <span>I consent to processing this uploaded handwriting photo for geometric &amp; psycholinguistic analysis (UK GDPR / non-clinical assessment).</span>
      </label>

      <button id="analyzePhotoBtn" onclick="runPhotoAnalysis()"
        class="btn-tap w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl px-4 text-sm transition">
        Analyze Handwriting Photo
      </button>
    </section>

    <!-- ERROR BANNER -->
    <div id="errorBox" class="hidden rounded-xl border border-rose-500/40 bg-rose-950/50 p-3.5 text-xs text-rose-200 font-mono"></div>

    <!-- ==================== UNIFIED RESULTS DASHBOARD ==================== -->
    <section id="resultsSection" class="hidden space-y-4">

      <!-- TOP STATUS STRIP -->
      <div class="card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <span id="resGateBadge" class="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">--</span>
          <span id="resModelBadge" class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700">--</span>
        </div>
        <span id="resConfBadge" class="text-xs font-mono text-emerald-300">Confidence: --</span>
      </div>

      <!-- OCR TRANSCRIPTION (PHOTO/SCREENSHOT ONLY) -->
      <div id="ocrCard" class="hidden card rounded-2xl p-4 space-y-1">
        <h2 class="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">Vision OCR Transcription</h2>
        <p id="resOcrText" class="text-sm text-slate-200 whitespace-pre-wrap"></p>
      </div>

      <!-- CORE PSYCHOANALYTIC BREAKDOWN -->
      <div class="card rounded-2xl p-5 space-y-4">
        <div>
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Surface Meaning</h2>
          <p id="resSurface" class="text-sm text-slate-200 mt-1 leading-relaxed"></p>
        </div>
        <div>
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Emotional Subtext</h2>
          <p id="resSubtext" class="text-sm text-slate-200 mt-1 leading-relaxed"></p>
        </div>
        <div>
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Hidden Meanings &amp; Signals</h2>
          <ul id="resHidden" class="list-disc list-inside text-sm text-slate-200 mt-1 space-y-1"></ul>
        </div>
        <div>
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Psychological Lens</h2>
          <p id="resLens" class="text-sm text-slate-200 mt-1 leading-relaxed"></p>
        </div>
      </div>

      <!-- AFFECTIVE CIRCUMPLEX + DASS BARS -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="card rounded-2xl p-4 space-y-2">
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Russell Valence–Arousal Space</h2>
          <svg id="vadSvg" viewBox="0 0 200 200" class="w-full max-w-[210px] mx-auto bg-slate-950 rounded-xl border border-slate-800">
            <line x1="100" y1="12" x2="100" y2="188" stroke="#334155" stroke-dasharray="3 3" />
            <line x1="12" y1="100" x2="188" y2="100" stroke="#334155" stroke-dasharray="3 3" />
            <text x="100" y="22" fill="#94A3B8" font-size="8" text-anchor="middle">HIGH AROUSAL</text>
            <text x="100" y="194" fill="#94A3B8" font-size="8" text-anchor="middle">LOW AROUSAL</text>
            <text x="16" y="96" fill="#94A3B8" font-size="8">NEG</text>
            <text x="184" y="96" fill="#94A3B8" font-size="8" text-anchor="end">POS</text>
            <circle id="vadDot" cx="100" cy="100" r="7" fill="#06B6D4" stroke="#FFFFFF" stroke-width="2" />
          </svg>
          <div id="vadNumbers" class="text-center font-mono text-[11px] text-slate-300"></div>
        </div>

        <div class="card rounded-2xl p-4 space-y-3">
          <h2 class="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">DASS-Aligned Load &amp; Epistemic Audit</h2>
          <div class="space-y-2 text-xs">
            <div>
              <div class="flex justify-between font-mono mb-0.5"><span>Stress Load</span><span id="barStressVal">0%</span></div>
              <div class="h-2 bg-slate-950 rounded-full overflow-hidden"><div id="barStress" class="h-full bg-rose-400" style="width:0%"></div></div>
            </div>
            <div>
              <div class="flex justify-between font-mono mb-0.5"><span>Anxiety / Tension</span><span id="barAnxVal">0%</span></div>
              <div class="h-2 bg-slate-950 rounded-full overflow-hidden"><div id="barAnx" class="h-full bg-amber-400" style="width:0%"></div></div>
            </div>
            <div>
              <div class="flex justify-between font-mono mb-0.5"><span>Low Mood / Fatigue</span><span id="barFatVal">0%</span></div>
              <div class="h-2 bg-slate-950 rounded-full overflow-hidden"><div id="barFat" class="h-full bg-indigo-400" style="width:0%"></div></div>
            </div>
          </div>
          <div class="pt-2 border-t border-slate-800 space-y-1">
            <div class="text-[10px] font-mono uppercase text-slate-400">Observed Anomalies</div>
            <ul id="resAnomalies" class="text-[11px] text-slate-300 list-disc list-inside space-y-0.5"></ul>
          </div>
        </div>
      </div>

      <!-- 3 CALIBRATED REPLIES -->
      <div class="card rounded-2xl p-5 space-y-3">
        <h2 class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Suggested Replies (Tap to Copy)</h2>
        <div id="repliesGrid" class="grid sm:grid-cols-3 gap-2.5"></div>
      </div>

      <!-- ACTIONABLE CLOSING GUIDANCE -->
      <div class="card rounded-2xl p-5 space-y-2.5">
        <h2 class="text-[11px] font-mono uppercase tracking-wider text-teal-300 font-bold">Actionable Guidance</h2>
        <div class="text-xs text-slate-200"><strong class="text-slate-400">Somatic Reset:</strong> <span id="sugSomatic"></span></div>
        <div class="text-xs text-slate-200"><strong class="text-slate-400">Reflective Prompt:</strong> <span id="sugReframe"></span></div>
        <div class="text-xs text-slate-200"><strong class="text-slate-400">Signal Tip:</strong> <span id="sugWorkspace"></span></div>
      </div>

      <!-- DETERMINISTIC CMTE v5.1 MATH TELEMETRY -->
      <details class="card rounded-2xl p-4">
        <summary class="cursor-pointer text-xs font-mono font-bold text-cyan-400">
          Inspect Verified CMTE v5.1 Deterministic Vector &amp; Extended Geometry JSON
        </summary>
        <pre id="rawTelemetryJson" class="mt-3 text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-xl overflow-x-auto"></pre>
      </details>
    </section>

  </div>

  <script>
    // === LIVE APP 1 SUPABASE ENDPOINT (clever-handler — 100% Contract Compatible) ===
    const FUNCTION_URL = "https://riluyoqwgepbliqgqnho.supabase.co/functions/v1/clever-handler";

    let activeTab = "text";
    let sessionBaseline = null;
    let lastDeterministicMetrics = null;
    let screenshotData = null;      // { base64, mimeType }
    let photoState = null;          // { bitmapCanvas, base64, mimeType, geometry }
    let parsedReplyDelays = null;   // number[] in seconds for server-side Goh-Barabasi burstiness
    let activeAbortCtrl = null;

    // Non-biometric lexical-class Andrews-Curtis free-group trace (ZERO keystroke timestamps)
    let prevLexCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let lexicalRevisionTrace = [];

    const AC_LEX = {
      1: /\b(love|great|thanks|happy|warm|no worries|all good|xx+|x)\b/gi,     // warmth / positive
      2: /\b(fine|whatever|up to you|never mind|leave it|busy|annoyed|angry|upset)\b/gi, // defensive / negative
      3: /\b(maybe|probably|just|sort of|kind of|idk|guess|might|perhaps)\b/gi, // hedge
      4: /\b(i|me|my|mine|myself|i'm|i've)\b/gi,                               // 1st-person singular
    };

    function trackLexicalRevisions() {
      const txt = document.getElementById("messageInput").value || "";
      if (!txt.trim()) {
        prevLexCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        lexicalRevisionTrace = [];
        document.getElementById("acTraceBadge").textContent = "AC-Stack: 0 edits";
        return;
      }
      for (const cls of [1, 2, 3, 4]) {
        const count = (txt.match(AC_LEX[cls]) || []).length;
        const delta = count - prevLexCounts[cls];
        if (delta > 0) {
          for (let i = 0; i < Math.min(delta, 4); i++) lexicalRevisionTrace.push(cls);
        } else if (delta < 0) {
          for (let i = 0; i < Math.min(-delta, 4); i++) lexicalRevisionTrace.push(-cls);
        }
        prevLexCounts[cls] = count;
      }
      if (lexicalRevisionTrace.length > 128) {
        lexicalRevisionTrace = lexicalRevisionTrace.slice(-128);
      }
      document.getElementById("acTraceBadge").textContent = `AC-Stack: ${lexicalRevisionTrace.length} ops`;
    }

    // Parse WhatsApp/Chat timestamps -> strips timestamps, extracts replyDelays (sec), splits last 2 turns
    function parseWhatsAppPaste() {
      const raw = (document.getElementById("messageInput").value || "").replace(/\u200E|\u202A|\u202C|\uFEFF/g, "").replace(/\u202F/g, " ");
      const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const headerRe = /^\[?(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?\]?\s*(?:-\s*)?([^:]{1,60}):\s+(.*)$/;
      const turns = [];
      for (const line of lines) {
        const m = line.match(headerRe);
        if (m) {
          const d1 = parseInt(m[1], 10), d2 = parseInt(m[2], 10);
          let yr = parseInt(m[3], 10); if (yr < 100) yr += 2000;
          let hr = parseInt(m[4], 10); const min = parseInt(m[5], 10); const sec = parseInt(m[6] || "0", 10);
          const mer = (m[7] || "").toLowerCase();
          if (mer === "pm" && hr < 12) hr += 12;
          if (mer === "am" && hr === 12) hr = 0;
          // UK DD/MM default unless d2 > 12
          const day = d2 > 12 ? d2 : d1;
          const mon = (d2 > 12 ? d1 : d2) - 1;
          const tsMs = Date.UTC(yr, mon, day, hr, min, sec);
          turns.push({ tsMs, speaker: m[8].trim(), text: m[9].trim() });
        } else if (turns.length > 0) {
          turns[turns.length - 1].text += "\n" + line;
        }
      }

      const note = document.getElementById("threadParseNote");
      if (turns.length < 2) {
        note.textContent = "No multi-turn WhatsApp timestamps detected — stripped stray Unicode marks only.";
        note.classList.remove("hidden");
        document.getElementById("messageInput").value = raw;
        return;
      }

      const delays = [];
      for (let i = 1; i < turns.length; i++) {
        const dtSec = Math.round((turns[i].tsMs - turns[i - 1].tsMs) / 1000);
        if (dtSec >= 0 && dtSec < 604800) delays.push(dtSec);
      }
      parsedReplyDelays = delays.length >= 3 ? delays : null;

      const lastTurn = turns[turns.length - 1];
      const prevTurn = turns[turns.length - 2];
      document.getElementById("precedingInput").value = prevTurn.text;
      document.getElementById("messageInput").value = lastTurn.text;
      prevLexCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
      lexicalRevisionTrace = [];
      trackLexicalRevisions();

      note.textContent = `Parsed ${turns.length} turns • Loaded penultimate turn into Preceding & latest into Target` +
        (parsedReplyDelays ? ` • Captured ${parsedReplyDelays.length} timestamp delays for Burstiness.` : ".");
      note.classList.remove("hidden");
    }

    function switchTab(tab) {
      activeTab = tab;
      document.getElementById("panelText").classList.toggle("hidden", tab !== "text");
      document.getElementById("panelPhoto").classList.toggle("hidden", tab !== "photo");
      document.getElementById("tabTextBtn").className = "btn-tap rounded-xl text-sm transition " + (tab === "text" ? "tab-active" : "tab-idle");
      document.getElementById("tabPhotoBtn").className = "btn-tap rounded-xl text-sm transition " + (tab === "photo" ? "tab-active" : "tab-idle");
      hideError();
    }

    function showError(msg) {
      const box = document.getElementById("errorBox");
      box.textContent = msg;
      box.classList.remove("hidden");
    }
    function hideError() {
      document.getElementById("errorBox").classList.add("hidden");
    }

    // Handles both [-1..1]/[0..1] floats AND [0..100] integers seamlessly
    function normalizePct(val, signed = false) {
      const n = Number(val);
      if (!Number.isFinite(n)) return 50;
      if (signed && n >= -1.05 && n <= 1.05) return Math.max(0, Math.min(100, Math.round((n + 1) * 50)));
      if (!signed && n >= 0 && n <= 1.05) return Math.max(0, Math.min(100, Math.round(n * 100)));
      if (signed && n < 0) return Math.max(0, Math.min(100, Math.round((n + 100) / 2)));
      return Math.max(0, Math.min(100, Math.round(n)));
    }

    function lockSessionBaselineFromLast() {
      if (!lastDeterministicMetrics) return;
      const st = lastDeterministicMetrics.stylometry || {};
      const lc = lastDeterministicMetrics.liwcCoreC || {};
      sessionBaseline = {
        lp: st.lpSmooth ?? 5.0,
        sa: st.saSmooth ?? 4.5,
        cm: st.cmSmooth ?? 5.0,
        vPersona: lc.vPersona ?? 0,
        rHedge: lc.rHedge ?? 0.04,
      };
      const pill = document.getElementById("baselinePill");
      pill.textContent = "B₀: Session Locked ✓";
      pill.className = "text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300";
    }

    // =========================================================================
    // EXIF-SAFE MOBILE IMAGE LOADER (Fixes iOS/Android Portrait Rotation + RAM Cleanup)
    // =========================================================================
    async function loadOrientedCanvas(file, maxDim = 1280) {
      let source = null;
      let shouldCloseBitmap = false;
      try {
        if (typeof createImageBitmap === "function") {
          source = await createImageBitmap(file, { imageOrientation: "from-image" });
          shouldCloseBitmap = true;
        }
      } catch {
        source = null;
      }

      if (!source) {
        source = await new Promise((resolve, reject) => {
          const url = URL.createObjectURL(file);
          const img = new Image();
          img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
          img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
          img.src = url;
        });
      }

      const sw = source.width || source.naturalWidth;
      const sh = source.height || source.naturalHeight;
      const scale = Math.min(1, maxDim / Math.max(sw, sh));
      const w = Math.max(1, Math.round(sw * scale));
      const h = Math.max(1, Math.round(sh * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(source, 0, 0, w, h);
      if (shouldCloseBitmap && typeof source.close === "function") source.close();

      // Always JPEG (avoids iOS Safari WebP -> uncompressed PNG fallback)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      return { canvas, dataUrl, base64: dataUrl.split(",")[1], width: w, height: h };
    }

    async function handleScreenshotSelect(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      hideError();
      try {
        const out = await loadOrientedCanvas(file, 1280);
        out.canvas.width = 0; out.canvas.height = 0; // immediate iOS RAM release
        screenshotData = { base64: out.base64, mimeType: "image/jpeg" };
        document.getElementById("screenshotThumb").src = out.dataUrl;
        document.getElementById("screenshotMeta").textContent = `${out.width}×${out.height} EXIF-corrected JPEG`;
        document.getElementById("screenshotPreviewWrap").classList.remove("hidden");
      } catch (err) {
        showError("Could not read screenshot: " + err.message);
      }
    }

    function clearScreenshot() {
      screenshotData = null;
      document.getElementById("screenshotInput").value = "";
      document.getElementById("screenshotPreviewWrap").classList.add("hidden");
    }

    // =========================================================================
    // DETERMINISTIC 2D HANDWRITING MATH PRIMITIVES (AUDIT-VERIFIED & SELF-TESTED)
    // =========================================================================
    function computeCartesianStemTensor(segments) {
      let jxx = 0, jxy = 0, jyy = 0, stemCount = 0;
      let axx = 0, axy = 0, ayy = 0;
      for (let i = 0; i < segments.length; i++) {
        const vx = segments[i].dx;
        const vy = -segments[i].dy; // Convert downward screen-Y to upward Cartesian-Y
        axx += vx * vx; axy += vx * vy; ayy += vy * vy;
        // Isolate vertical/near-vertical stems (within +-53 deg of vertical) for true slant
        if (Math.abs(vy) >= Math.abs(vx) * 0.75) {
          jxx += vx * vx; jxy += vx * vy; jyy += vy * vy;
          stemCount++;
        }
      }
      const useX = stemCount >= 8 ? jxx : axx;
      const useXY = stemCount >= 8 ? jxy : axy;
      const useY = stemCount >= 8 ? jyy : ayy;
      const principalDeg = (0.5 * Math.atan2(2 * useXY, useX - useY) * 180) / Math.PI;
      const rawSlant = 90 - principalDeg;
      let slantDeg = ((rawSlant + 90) % 180 + 180) % 180 - 90;
      if (Math.abs(slantDeg) < 0.01) slantDeg = 0;

      const tr = axx + ayy;
      const df = axx - ayy;
      const disc = Math.sqrt(df * df + 4 * axy * axy);
      const l1 = 0.5 * (tr + disc), l2 = 0.5 * (tr - disc);
      const anisotropy = Number(((l1 - l2) / (l1 + l2 + 1e-6)).toFixed(4));
      return { slantDeg: Number(slantDeg.toFixed(2)), anisotropy, stemSamples: stemCount };
    }

    function chamferDistance34(mask, w, h) {
      const N = w * h;
      const dt = new Uint16Array(N);
      for (let i = 0; i < N; i++) dt[i] = mask[i] ? 60000 : 0;
      // Pass 1: Top-Left -> Bottom-Right
      for (let y = 1; y < h - 1; y++) {
        const row = y * w;
        for (let x = 1; x < w - 1; x++) {
          const p = row + x;
          if (!dt[p]) continue;
          let m = dt[p];
          const a = dt[p - 1] + 3; if (a < m) m = a;
          const b = dt[p - w] + 3; if (b < m) m = b;
          const c = dt[p - w - 1] + 4; if (c < m) m = c;
          const d = dt[p - w + 1] + 4; if (d < m) m = d;
          dt[p] = m;
        }
      }
      // Pass 2: Bottom-Right -> Top-Left
      for (let y = h - 2; y >= 1; y--) {
        const row = y * w;
        for (let x = w - 2; x >= 1; x--) {
          const p = row + x;
          if (!dt[p]) continue;
          let m = dt[p];
          const a = dt[p + 1] + 3; if (a < m) m = a;
          const b = dt[p + w] + 3; if (b < m) m = b;
          const c = dt[p + w - 1] + 4; if (c < m) m = c;
          const d = dt[p + w + 1] + 4; if (d < m) m = d;
          dt[p] = m;
        }
      }
      return dt;
    }

    function theilSenSlopeFromPoints(pts) {
      const slopes = [];
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - pts[i].x;
          if (Math.abs(dx) > 1e-3) slopes.push((-pts[j].y - (-pts[i].y)) / dx);
        }
      }
      if (!slopes.length) return 0;
      slopes.sort((a, b) => a - b);
      return Number(((Math.atan(slopes[Math.floor(slopes.length / 2)]) * 180) / Math.PI).toFixed(2));
    }

    function agmonTremorFromAngles(dThetas, isLeft) {
      if (dThetas.length < 3) return { somaticTremor: 0, angularitySpike: 0 };
      let e1 = 0, e2 = 0, maxD = 0;
      for (let i = 0; i < dThetas.length; i++) {
        const a = Math.abs(dThetas[i]);
        e1 += a * a;
        if (a > maxD) maxD = a;
        if (i > 0) { const d2 = dThetas[i] - dThetas[i - 1]; e2 += d2 * d2; }
      }
      const angularitySpike = Number((maxD / (Math.pow(e1 * e2, 0.25) + 1e-4)).toFixed(3));
      const cornerDiscount = 1 / (1 + Math.exp(2.2 * (angularitySpike - 1.35)));
      const rawDist = Math.sqrt(e2 / dThetas.length) * cornerDiscount;
      const somaticTremor = Number((isLeft ? rawDist * 0.78 : rawDist).toFixed(4));
      return { somaticTremor, angularitySpike };
    }

    function ramseyK3Partition(adj) {
      const n = Math.min(64, adj.length);
      const inTri = new Uint8Array(n);
      for (let u = 0; u < n; u++) {
        for (let v = u + 1; v < n; v++) {
          if (((adj[u] >> BigInt(v)) & 1n) === 1n && (adj[u] & adj[v]) !== 0n) {
            inTri[u] = 1; inTri[v] = 1;
          }
        }
      }
      let k3Count = 0;
      const cleanIdx = [];
      for (let i = 0; i < n; i++) {
        if (inTri[i]) k3Count++; else cleanIdx.push(i);
      }
      return { k3ClusterRatio: Number((k3Count / Math.max(1, n)).toFixed(4)), cleanIdx };
    }

    // =========================================================================
    // FULL PHOTO GEOMETRY PIPELINE (v5.1)
    // =========================================================================
    function computePhotoGeometryFromCanvas(srcCanvas, handedness) {
      const t0 = performance.now();
      const maxDim = 640;
      const scale = Math.min(1, maxDim / Math.max(srcCanvas.width, srcCanvas.height));
      const w = Math.max(32, Math.round(srcCanvas.width * scale));
      const h = Math.max(32, Math.round(srcCanvas.height * scale));

      const work = document.createElement("canvas");
      work.width = w; work.height = h;
      const ctx = work.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(srcCanvas, 0, 0, w, h);
      const rgba = ctx.getImageData(0, 0, w, h).data;
      work.width = 0; work.height = 0; // release canvas memory immediately

      // 1. Grayscale + Integral Images + 1st-Percentile Dark Floor (M) for Wolf-Jolion
      const N = w * h;
      const gray = new Uint8Array(N);
      const hist = new Uint32Array(256);
      const sum = new Float64Array((w + 1) * (h + 1));
      const sumSq = new Float64Array((w + 1) * (h + 1));
      const stride = w + 1;

      for (let y = 0; y < h; y++) {
        let rowS = 0, rowSq = 0;
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const g = Math.round(0.299 * rgba[idx] + 0.587 * rgba[idx + 1] + 0.114 * rgba[idx + 2]);
          gray[y * w + x] = g;
          hist[g]++;
          rowS += g; rowSq += g * g;
          const ii = (y + 1) * stride + (x + 1);
          sum[ii] = sum[y * stride + (x + 1)] + rowS;
          sumSq[ii] = sumSq[y * stride + (x + 1)] + rowSq;
        }
      }

      // Robust global dark floor M (0.5th percentile avoids single dead pixels)
      let cum = 0, M = 0;
      const targetDark = Math.max(1, Math.floor(N * 0.005));
      for (let i = 0; i < 256; i++) {
        cum += hist[i];
        if (cum >= targetDark) { M = i; break; }
      }

      const localMean = new Float32Array(N);
      const localStd = new Float32Array(N);
      let maxStd = 16;
      const rad = 12;
      for (let y = 2; y < h - 2; y++) {
        const y1 = Math.max(0, y - rad), y2 = Math.min(h - 1, y + rad);
        for (let x = 2; x < w - 2; x++) {
          const x1 = Math.max(0, x - rad), x2 = Math.min(w - 1, x + rad);
          const area = (x2 - x1 + 1) * (y2 - y1 + 1);
          const s = sum[(y2 + 1) * stride + (x2 + 1)] - sum[y1 * stride + (x2 + 1)] - sum[(y2 + 1) * stride + x1] + sum[y1 * stride + x1];
          const sq = sumSq[(y2 + 1) * stride + (x2 + 1)] - sumSq[y1 * stride + (x2 + 1)] - sumSq[(y2 + 1) * stride + x1] + sumSq[y1 * stride + x1];
          const mean = s / area;
          const std = Math.sqrt(Math.max(0, sq / area - mean * mean));
          const p = y * w + x;
          localMean[p] = mean;
          localStd[p] = std;
          if (std > maxStd) maxStd = std;
        }
      }

      // 2. Wolf-Jolion Adaptive Binarization + Umbral Crease/Glare Guard
      const mask = new Uint8Array(N);
      const inkDarkness = [];
      let inkCount = 0;
      let inkMinX = w, inkMaxX = 0, inkMinY = h, inkMaxY = 0;
      const kWolf = 0.25;
      const R = Math.max(24, maxStd);

      for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
          const p = y * w + x;
          const mean = localMean[p], std = localStd[p], g = gray[p];
          const thresh = (1 - kWolf) * mean + kWolf * M + kWolf * (std / R) * (mean - M);
          if (g < thresh && (mean - g) > 14) {
            mask[p] = 1;
            inkCount++;
            if (x < inkMinX) inkMinX = x; if (x > inkMaxX) inkMaxX = x;
            if (y < inkMinY) inkMinY = y; if (y > inkMaxY) inkMaxY = y;
            if (std < R * 0.72) inkDarkness.push(mean - g);
          }
        }
      }

      const inkCoverageRatio = Number((inkCount / N).toFixed(4));
      let opticalDensityCV = 0.25;
      if (inkDarkness.length > 20) {
        const mD = inkDarkness.reduce((a, b) => a + b, 0) / inkDarkness.length;
        const sD = Math.sqrt(inkDarkness.reduce((a, v) => a + (v - mD) ** 2, 0) / inkDarkness.length);
        opticalDensityCV = Number((sD / Math.max(1, mD)).toFixed(4));
      }

      // Spatial 3x3 Grid Pearson Chi-Square Uniformity (Verified Math Compendium §5.3)
      let spatialChiSquare = 0;
      if (inkCount > 30 && inkMaxX > inkMinX + 6 && inkMaxY > inkMinY + 6) {
        const grid = new Float64Array(9);
        const gw = (inkMaxX - inkMinX + 1) / 3;
        const gh = (inkMaxY - inkMinY + 1) / 3;
        for (let y = inkMinY; y <= inkMaxY; y++) {
          const gy = Math.min(2, Math.floor((y - inkMinY) / gh));
          for (let x = inkMinX; x <= inkMaxX; x++) {
            if (mask[y * w + x]) {
              const gx = Math.min(2, Math.floor((x - inkMinX) / gw));
              grid[gy * 3 + gx]++;
            }
          }
        }
        const exp = inkCount / 9;
        let chi = 0;
        for (let i = 0; i < 9; i++) chi += ((grid[i] - exp) ** 2) / exp;
        spatialChiSquare = Number((chi / inkCount).toFixed(4)); // normalized [0..8]
      }

      // 3. Connected Components -> 64-Bit BigInt Ramsey K3 Cluster Isolation
      const visited = new Uint8Array(N);
      const clusters = [];
      const queue = new Int32Array(N);
      for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
          const start = y * w + x;
          if (!mask[start] || visited[start]) continue;
          let head = 0, tail = 0;
          queue[tail++] = start;
          visited[start] = 1;
          let minX = x, maxX = x, minY = y, maxY = y, sumX = 0, sumY = 0, area = 0;
          while (head < tail) {
            const p = queue[head++];
            const px = p % w, py = (p - px) / w;
            area++; sumX += px; sumY += py;
            if (px < minX) minX = px; if (px > maxX) maxX = px;
            if (py < minY) minY = py; if (py > maxY) maxY = py;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue;
                const nx = px + dx, ny = py + dy;
                if (nx >= 1 && nx < w - 1 && ny >= 1 && ny < h - 1) {
                  const np = ny * w + nx;
                  if (mask[np] && !visited[np]) { visited[np] = 1; queue[tail++] = np; }
                }
              }
            }
          }
          const bw = maxX - minX + 1, bh = maxY - minY + 1;
          if (area >= 8 && area < N * 0.25 && bh >= 4 && bw < w * 0.9) {
            clusters.push({ minX, maxX, minY, maxY, bw, bh, area, cx: sumX / area, cy: sumY / area });
          }
        }
      }

      const heights = clusters.map((c) => c.bh).sort((a, b) => a - b);
      const medianH = heights.length ? heights[Math.floor(heights.length * 0.5)] : 16;

      const top64 = [...clusters].sort((a, b) => b.area - a.area).slice(0, 64);
      const n64 = top64.length;
      const adj = new Array(n64).fill(0n);
      const proxThresh = Math.max(4, medianH * 0.42);
      for (let i = 0; i < n64; i++) {
        for (let j = i + 1; j < n64; j++) {
          const a = top64[i], b = top64[j];
          const gx = Math.max(0, Math.max(a.minX - b.maxX, b.minX - a.maxX));
          const gy = Math.max(0, Math.max(a.minY - b.maxY, b.minY - a.maxY));
          if (gx <= proxThresh && gy <= proxThresh * 0.8) {
            adj[i] |= (1n << BigInt(j));
            adj[j] |= (1n << BigInt(i));
          }
        }
      }
      const { k3ClusterRatio, cleanIdx } = ramseyK3Partition(adj);
      const cleanClusters = cleanIdx.map((i) => top64[i]);
      const lineSource = cleanClusters.length >= 4 ? cleanClusters : clusters;

      // 4. Line Grouping -> Theil-Sen Baseline Slope, Zone Ratios (U/M/L), Height Fatigue βh & Gap Burstiness
      const sortedY = [...lineSource].sort((a, b) => a.cy - b.cy);
      const lines = [];
      for (const cl of sortedY) {
        const match = lines.find((ln) => Math.abs(ln.meanY - cl.cy) < Math.max(12, medianH * 0.95));
        if (match) {
          match.items.push(cl);
          match.meanY = match.items.reduce((s, c) => s + c.cy, 0) / match.items.length;
        } else {
          lines.push({ meanY: cl.cy, items: [cl] });
        }
      }

      const lineSlopes = [];
      const wordGaps = [];
      const lineHeightMeans = [];
      let zoneUp = 0, zoneMid = 0, zoneLow = 0;

      for (const ln of lines) {
        ln.items.sort((a, b) => a.cx - b.cx);
        let lMinX = w, lMaxX = 0, lMinY = h, lMaxY = 0;
        let hSum = 0;
        for (let i = 0; i < ln.items.length; i++) {
          const c = ln.items[i];
          hSum += c.bh;
          if (c.minX < lMinX) lMinX = c.minX; if (c.maxX > lMaxX) lMaxX = c.maxX;
          if (c.minY < lMinY) lMinY = c.minY; if (c.maxY > lMaxY) lMaxY = c.maxY;
          if (i > 0) {
            const gap = c.minX - ln.items[i - 1].maxX;
            if (gap > medianH * 0.25 && gap < medianH * 6) wordGaps.push(gap);
          }
        }
        lineHeightMeans.push(hSum / ln.items.length);

        if (ln.items.length >= 2) {
          lineSlopes.push(theilSenSlopeFromPoints(ln.items.map((c) => ({ x: c.cx, y: c.cy }))));
        }

        // Exact Vertical Zone Ratios (Upper / Middle x-height / Lower) via Row Ink Projection
        const rowSpan = lMaxY - lMinY + 1;
        if (rowSpan >= 6 && lMaxX > lMinX + 8) {
          const proj = new Uint32Array(rowSpan);
          let maxRow = 0;
          for (let y = lMinY; y <= lMaxY; y++) {
            let cnt = 0;
            for (let x = lMinX; x <= lMaxX; x++) if (mask[y * w + x]) cnt++;
            proj[y - lMinY] = cnt;
            if (cnt > maxRow) maxRow = cnt;
          }
          const coreCut = Math.max(1, maxRow * 0.35);
          let midTop = 0, midBot = rowSpan - 1;
          while (midTop < rowSpan && proj[midTop] < coreCut) midTop++;
          while (midBot > midTop && proj[midBot] < coreCut) midBot--;
          for (let r = 0; r < rowSpan; r++) {
            if (r < midTop) zoneUp += proj[r];
            else if (r > midBot) zoneLow += proj[r];
            else zoneMid += proj[r];
          }
        }
      }

      lineSlopes.sort((a, b) => a - b);
      const baselineSlopeDeg = lineSlopes.length ? lineSlopes[Math.floor(lineSlopes.length / 2)] : 0;

      // Top-to-bottom micrographia / height fatigue slope βh (normalized per line)
      let heightFatigueSlope = 0;
      if (lineHeightMeans.length >= 3) {
        const hPts = lineHeightMeans.map((hv, idx) => ({ x: idx, y: -hv / Math.max(1, medianH) }));
        const hSlopes = [];
        for (let i = 0; i < hPts.length; i++) {
          for (let j = i + 1; j < hPts.length; j++) {
            hSlopes.push((lineHeightMeans[j] - lineHeightMeans[i]) / ((j - i) * Math.max(1, medianH)));
          }
        }
        hSlopes.sort((a, b) => a - b);
        heightFatigueSlope = Number(hSlopes[Math.floor(hSlopes.length / 2)].toFixed(4));
      }

      const zTot = Math.max(1, zoneUp + zoneMid + zoneLow);
      const zoneRatios = {
        upper: Number((zoneUp / zTot).toFixed(3)),
        middle: Number((zoneMid / zTot).toFixed(3)),
        lower: Number((zoneLow / zTot).toFixed(3)),
      };

      let wordGapBurstiness = 0;
      if (wordGaps.length >= 3) {
        const muG = wordGaps.reduce((a, b) => a + b, 0) / wordGaps.length;
        const sdG = Math.sqrt(wordGaps.reduce((a, v) => a + (v - muG) ** 2, 0) / wordGaps.length);
        wordGapBurstiness = Number(((sdG - muG) / (sdG + muG + 1e-6)).toFixed(4));
      }

      // 5. Exact 2-Pass Chamfer 3-4 Distance Transform (Rotation-Invariant Stroke Width)
      const chamferDT = chamferDistance34(mask, w, h);

      // 6. Zhang-Suen Thinning (capped at 14 passes)
      const skel = new Uint8Array(mask);
      const toRemove = [];
      for (let iter = 0; iter < 14; iter++) {
        let changed = false;
        for (let step = 0; step < 2; step++) {
          toRemove.length = 0;
          for (let y = 2; y < h - 2; y++) {
            for (let x = 2; x < w - 2; x++) {
              const p = y * w + x;
              if (!skel[p]) continue;
              const p2 = skel[p - w], p3 = skel[p - w + 1], p4 = skel[p + 1], p5 = skel[p + w + 1];
              const p6 = skel[p + w], p7 = skel[p + w - 1], p8 = skel[p - 1], p9 = skel[p - w - 1];
              const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
              if (B < 2 || B > 6) continue;
              const A =
                (!p2 && p3 ? 1 : 0) + (!p3 && p4 ? 1 : 0) + (!p4 && p5 ? 1 : 0) + (!p5 && p6 ? 1 : 0) +
                (!p6 && p7 ? 1 : 0) + (!p7 && p8 ? 1 : 0) + (!p8 && p9 ? 1 : 0) + (!p9 && p2 ? 1 : 0);
              if (A !== 1) continue;
              if (step === 0 ? (p2 * p4 * p6 === 0 && p4 * p6 * p8 === 0) : (p2 * p4 * p8 === 0 && p2 * p6 * p8 === 0)) {
                toRemove.push(p);
              }
            }
          }
          if (toRemove.length) {
            changed = true;
            for (let i = 0; i < toRemove.length; i++) skel[toRemove[i]] = 0;
          }
        }
        if (!changed) break;
      }

      // 7. Trace Skeleton -> Cartesian Stem Tensor + Agmon H1/H2 + Chamfer Width + Menger Curvature Entropy
      const seen = new Uint8Array(N);
      const segments = [];
      const dThetas = [];
      const strokeWidths = [];
      const kappaBins = new Uint32Array(8);
      let kappaTotal = 0;

      for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
          const start = y * w + x;
          if (!skel[start] || seen[start]) continue;
          const chain = [];
          let curr = start;
          while (curr !== -1 && chain.length < 300) {
            seen[curr] = 1;
            const cx = curr % w, cy = (curr - cx) / w;
            chain.push({ x: cx, y: cy });
            if (chamferDT[curr] > 0) strokeWidths.push((2 * chamferDT[curr]) / 3);
            let next = -1;
            for (let dy = -1; dy <= 1 && next === -1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue;
                const np = (cy + dy) * w + (cx + dx);
                if (skel[np] && !seen[np]) { next = np; break; }
              }
            }
            curr = next;
          }

          if (chain.length >= 6) {
            let prevAng = null;
            for (let i = 2; i < chain.length; i += 2) {
              const dx = chain[i].x - chain[i - 2].x;
              const dy = chain[i].y - chain[i - 2].y;
              segments.push({ dx, dy });
              const ang = Math.atan2(dy, dx);
              if (prevAng !== null) {
                let dt = Math.abs(ang - prevAng);
                if (dt > Math.PI) dt = 2 * Math.PI - dt;
                dThetas.push(dt);
              }
              prevAng = ang;

              // Scale-invariant Menger curvature (kappa * medianH)
              if (i >= 6) {
                const pA = chain[i - 6], pB = chain[i - 3], pC = chain[i];
                const a = Math.hypot(pB.x - pA.x, pB.y - pA.y);
                const b = Math.hypot(pC.x - pB.x, pC.y - pB.y);
                const c = Math.hypot(pC.x - pA.x, pC.y - pA.y);
                const area2 = Math.abs((pB.x - pA.x) * (pC.y - pA.y) - (pB.y - pA.y) * (pC.x - pA.x));
                if (a > 1.2 && b > 1.2 && c > 2.0) {
                  const kappaNorm = ((2 * area2) / (a * b * c)) * medianH;
                  const bin = Math.min(7, Math.floor((kappaNorm / 4.0) * 8));
                  kappaBins[bin]++;
                  kappaTotal++;
                }
              }
            }
          }
        }
      }

      const { slantDeg, anisotropy } = computeCartesianStemTensor(segments);
      const isLeft = handedness === "left";
      const { somaticTremor, angularitySpike } = agmonTremorFromAngles(dThetas, isLeft);

      let strokeWidthCV = 0.2;
      if (strokeWidths.length > 10) {
        const mW = strokeWidths.reduce((a, b) => a + b, 0) / strokeWidths.length;
        const sW = Math.sqrt(strokeWidths.reduce((a, v) => a + (v - mW) ** 2, 0) / strokeWidths.length);
        strokeWidthCV = Number((sW / Math.max(1, mW)).toFixed(4));
      }

      // Shannon entropy of scale-invariant Menger curvature H(kappa) in bits [0..3]
      let mengerEntropyBits = 0;
      if (kappaTotal > 0) {
        for (let i = 0; i < 8; i++) {
          if (kappaBins[i] > 0) {
            const p = kappaBins[i] / kappaTotal;
            mengerEntropyBits -= p * Math.log2(p);
          }
        }
        mengerEntropyBits = Number(mengerEntropyBits.toFixed(3));
      }

      return {
        elapsedMs: Math.round(performance.now() - t0),
        slantDeg,
        anisotropy,
        baselineSlopeDeg,
        somaticTremor,
        angularitySpike,
        southpawDiscountApplied: isLeft,
        strokeWidthCV,
        opticalDensityCV,
        inkCoverageRatio,
        k3ClusterRatio,
        wordGapBurstiness,
        lineCount: lines.length,
        zoneRatios,
        // Extended diagnostics displayed locally & preserved in telemetry JSON
        mengerEntropyBits,
        spatialChiSquare,
        heightFatigueSlope,
      };
    }

    async function handleHandwritingSelect(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      hideError();
      try {
        if (photoState?.bitmapCanvas) {
          photoState.bitmapCanvas.width = 0;
          photoState.bitmapCanvas.height = 0;
        }
        const out = await loadOrientedCanvas(file, 1280);
        const handedness = document.getElementById("metaHand").value;
        const geometry = computePhotoGeometryFromCanvas(out.canvas, handedness);
        photoState = { bitmapCanvas: out.canvas, base64: out.base64, mimeType: "image/jpeg", geometry };
        document.getElementById("photoPreview").src = out.dataUrl;
        document.getElementById("photoPreviewWrap").classList.remove("hidden");
        renderLocalGeometryPreview(geometry);
      } catch (err) {
        showError("Could not process handwriting photo: " + err.message);
      }
    }

    function recomputePhotoGeometry() {
      if (!photoState?.bitmapCanvas) return;
      const handedness = document.getElementById("metaHand").value;
      photoState.geometry = computePhotoGeometryFromCanvas(photoState.bitmapCanvas, handedness);
      renderLocalGeometryPreview(photoState.geometry);
    }

    function renderLocalGeometryPreview(g) {
      document.getElementById("geomTimeMs").textContent = g.elapsedMs;
      document.getElementById("gSlant").textContent = `${g.slantDeg >= 0 ? "+" : ""}${g.slantDeg}° / ${g.anisotropy}`;
      document.getElementById("gSlope").textContent = `${g.baselineSlopeDeg >= 0 ? "+" : ""}${g.baselineSlopeDeg}°`;
      document.getElementById("gTremor").textContent = `${g.somaticTremor} (A=${g.angularitySpike}${g.southpawDiscountApplied ? " • 0.78×" : ""})`;
      document.getElementById("gWidth").textContent = `W-CV ${g.strokeWidthCV} / Opt ${g.opticalDensityCV}`;
      document.getElementById("gZones").textContent = `${Math.round(g.zoneRatios.upper * 100)} / ${Math.round(g.zoneRatios.middle * 100)} / ${Math.round(g.zoneRatios.lower * 100)}%`;
      document.getElementById("gRamsey").textContent = `${Math.round(g.k3ClusterRatio * 100)}% K₃ / H=${g.mengerEntropyBits}b`;
      document.getElementById("gBurst").textContent = `B=${g.wordGapBurstiness} / χ²=${g.spatialChiSquare}`;
      document.getElementById("gLines").textContent = `${g.lineCount} lines / βₕ=${g.heightFatigueSlope}`;
    }

    // =========================================================================
    // 1-TAP 6-POINT DETERMINISTIC MATH SELF-TEST HARNESS (RUNS LIVE ON DEVICE)
    // =========================================================================
    function runMathSelfTest() {
      const checks = [];
      const assert = (name, pass, detail) => checks.push({ name, pass, detail });

      // T1: Cartesian Stem Tensor Slant (+15 deg right-italic vs -15 deg left-slant)
      const rad15 = (15 * Math.PI) / 180;
      const segRight = Array.from({ length: 12 }, () => ({ dx: Math.sin(rad15) * 10, dy: -Math.cos(rad15) * 10 }));
      const segLeft = Array.from({ length: 12 }, () => ({ dx: -Math.sin(rad15) * 10, dy: -Math.cos(rad15) * 10 }));
      const rSlant = computeCartesianStemTensor(segRight).slantDeg;
      const lSlant = computeCartesianStemTensor(segLeft).slantDeg;
      assert("T1 Cartesian Stem Slant (±15°)", Math.abs(rSlant - 15) < 0.2 && Math.abs(lSlant + 15) < 0.2, `R=${rSlant}°, L=${lSlant}°`);

      // T2: Chamfer 3-4 Exact Rotation-Invariant Width (3px horizontal bar vs 3px vertical bar)
      const w = 15, h = 15, mH = new Uint8Array(w * h), mV = new Uint8Array(w * h);
      for (let x = 2; x <= 12; x++) for (let y = 6; y <= 8; y++) mH[y * w + x] = 1;
      for (let y = 2; y <= 12; y++) for (let x = 6; x <= 8; x++) mV[y * w + x] = 1;
      const dH = chamferDistance34(mH, w, h)[7 * w + 7];
      const dV = chamferDistance34(mV, w, h)[7 * w + 7];
      assert("T2 Chamfer 3-4 Isotropic Width", dH === 6 && dV === 6, `H-center=${dH}, V-center=${dV}`);

      // T3: Theil-Sen Slope Immunity to 25% Corrupted Outlier
      const pts = [{ x: 0, y: 100 }, { x: 10, y: 100 }, { x: 20, y: 100 }, { x: 30, y: 100 }, { x: 40, y: 20 }];
      const ts = theilSenSlopeFromPoints(pts);
      assert("T3 Theil-Sen Outlier Immunity", Math.abs(ts) < 0.5, `slope=${ts}° (outlier at y=20 ignored)`);

      // T4: Agmon H1/H2 Corner-vs-Tremor + 0.78x Southpaw Discount
      const crispCorner = [0, 0, 0, 1.5, 0, 0, 0, 1.5, 0, 0];
      const shakyTremor = [0.45, 0.5, 0.42, 0.55, 0.48, 0.51, 0.44, 0.53, 0.47, 0.5];
      const aC = agmonTremorFromAngles(crispCorner, false);
      const aT = agmonTremorFromAngles(shakyTremor, false);
      const aTL = agmonTremorFromAngles(shakyTremor, true);
      assert("T4 Agmon Corner/Tremor + 0.78×", aC.angularitySpike > aT.angularitySpike && aTL.somaticTremor < aT.somaticTremor,
        `cornerA=${aC.angularitySpike}, tremorA=${aT.angularitySpike}, R=${aT.somaticTremor}, L=${aTL.somaticTremor}`);

      // T5: 64-Bit BigInt Ramsey K3 Triangle Isolation
      // Nodes 0-1-2 form K3 triangle; nodes 3-4 form clean pair
      const adj = [0b00110n, 0b00101n, 0b00011n, 0b10000n, 0b01000n];
      const rp = ramseyK3Partition(adj);
      assert("T5 BigInt Ramsey K3 Partition", rp.k3ClusterRatio === 0.6 && rp.cleanIdx.length === 2,
        `K3=${rp.k3ClusterRatio}, clean=[${rp.cleanIdx.join(",")}]`);

      // T6: Decimal & Percentage VAD Normalization
      const n1 = normalizePct(-0.35, true), n2 = normalizePct(0.65, false), n3 = normalizePct(74, false);
      assert("T6 VAD/DASS Scale Normalizer", n1 === 33 && n2 === 65 && n3 === 74, `(-0.35->${n1}, 0.65->${n2}, 74->${n3})`);

      const passed = checks.filter((c) => c.pass).length;
      const el = document.getElementById("selfTestBanner");
      el.textContent = "";
      el.className = passed === checks.length
        ? "rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-[11px] font-mono text-emerald-200 space-y-1"
        : "rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-[11px] font-mono text-rose-200 space-y-1";
      const hdr = document.createElement("div");
      hdr.className = "font-bold";
      hdr.textContent = `DETERMINISTIC MATH SELF-TEST: ${passed}/${checks.length} PASSED`;
      el.appendChild(hdr);
      for (const c of checks) {
        const row = document.createElement("div");
        row.textContent = `[${c.pass ? "PASS" : "FAIL"}] ${c.name} — ${c.detail}`;
        el.appendChild(row);
      }
      el.classList.remove("hidden");
    }

    // =========================================================================
    // EDGE FUNCTION CALLER (WITH ABORT TIMEOUT) & XSS-SAFE RENDERER
    // =========================================================================
    async function invokeCleverHandler(payload, btnEl, idleLabel) {
      hideError();
      if (activeAbortCtrl) activeAbortCtrl.abort();
      activeAbortCtrl = new AbortController();
      const timeoutId = setTimeout(() => activeAbortCtrl.abort(), 45000);

      btnEl.disabled = true;
      btnEl.textContent = "Computing Deterministic Math & Analyzing...";
      try {
        const res = await fetch(FUNCTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: activeAbortCtrl.signal,
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
        renderResults(data);
      } catch (err) {
        const msg = err.name === "AbortError" ? "Request timed out after 45s. Please try again." : err.message;
        showError("Request Error: " + msg);
      } finally {
        clearTimeout(timeoutId);
        btnEl.disabled = false;
        btnEl.textContent = idleLabel;
      }
    }

    function runTextAnalysis() {
      const message = document.getElementById("messageInput").value.trim();
      const precedingMessage = document.getElementById("precedingInput").value.trim();
      const context = document.getElementById("textContext").value.trim();
      const deep = document.getElementById("deepToggle").checked;

      if (!message && !screenshotData) {
        return showError("Paste a text message or attach a chat screenshot first.");
      }

      const payload = {
        mode: screenshotData ? "screenshot" : "text",
        message,
        precedingMessage,
        context,
        deep,
        speakerIsolation: screenshotData ? document.getElementById("speakerIsolation").value : undefined,
        baseline: sessionBaseline || undefined,
        revisionTrace: lexicalRevisionTrace.length >= 2 ? lexicalRevisionTrace : undefined,
        replyDelays: parsedReplyDelays || undefined,
        imageBase64: screenshotData?.base64,
        imageMimeType: screenshotData?.mimeType,
      };
      invokeCleverHandler(payload, document.getElementById("analyzeTextBtn"), "Analyze Text Subtext");
    }

    function runPhotoAnalysis() {
      if (!photoState) return showError("Upload or capture a handwriting photo first.");
      if (!document.getElementById("gdprConsent").checked) {
        return showError("Please tick the UK GDPR consent checkbox before analyzing handwriting.");
      }
      const payload = {
        mode: "handwriting_photo",
        imageBase64: photoState.base64,
        imageMimeType: photoState.mimeType,
        photoGeometry: photoState.geometry,
        writerMeta: {
          handedness: document.getElementById("metaHand").value,
          dob: document.getElementById("metaDob").value || undefined,
          gender: document.getElementById("metaGender").value.trim() || undefined,
          notes: document.getElementById("metaNotes").value.trim() || undefined,
        },
        context: document.getElementById("metaNotes").value.trim() || "Handwritten note",
        deep: document.getElementById("deepToggle").checked,
        baseline: sessionBaseline || undefined,
      };
      invokeCleverHandler(payload, document.getElementById("analyzePhotoBtn"), "Analyze Handwriting Photo");
    }

    function renderResults(data) {
      lastDeterministicMetrics = data.deterministic_metrics || null;
      document.getElementById("lockBaseBtn").disabled = !lastDeterministicMetrics;

      const gate = data.deterministic_metrics?.pragmaticSignals?.gateState || "VERIFIED";
      const div = data.deterministic_metrics?.pragmaticSignals?.divergenceScore;
      document.getElementById("resGateBadge").textContent = div !== undefined ? `${gate} (${div})` : gate;
      document.getElementById("resModelBadge").textContent = `${data.mode || "text"} • ${data.model_used || "unknown"}`;

      const conf = data.epistemic_audit?.signal_confidence;
      document.getElementById("resConfBadge").textContent =
        conf !== undefined ? `Confidence: ${Math.round(normalizePct(conf, false))}%` : "Confidence: --";

      if (data.ocr_transcription) {
        document.getElementById("resOcrText").textContent = data.ocr_transcription;
        document.getElementById("ocrCard").classList.remove("hidden");
      } else {
        document.getElementById("ocrCard").classList.add("hidden");
      }

      document.getElementById("resSurface").textContent = data.surface_meaning || "";
      document.getElementById("resSubtext").textContent = data.emotional_subtext || "";
      document.getElementById("resLens").textContent = data.psychological_lens || "";

      const hiddenUl = document.getElementById("resHidden");
      hiddenUl.textContent = "";
      (data.hidden_meanings || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = String(item);
        hiddenUl.appendChild(li);
      });

      // Normalize Affective Coordinates & Plot SVG Circumplex
      const ac = data.affective_coordinates || {};
      const vPct = normalizePct(ac.valence, true);
      const aPct = normalizePct(ac.arousal, false);
      const dPct = normalizePct(ac.dominance_agency, true);
      const cx = 16 + (vPct / 100) * 168;
      const cy = 184 - (aPct / 100) * 168;
      document.getElementById("vadDot").setAttribute("cx", cx.toFixed(1));
      document.getElementById("vadDot").setAttribute("cy", cy.toFixed(1));
      document.getElementById("vadNumbers").textContent = `Valence: ${vPct} • Arousal: ${aPct} • Agency: ${dPct}`;

      const dass = ac.dass_alignment || {};
      const sPct = normalizePct(dass.stress_load ?? 0, false);
      const axPct = normalizePct(dass.anxiety_tension ?? 0, false);
      const fPct = normalizePct(dass.low_mood_fatigue ?? 0, false);
      document.getElementById("barStressVal").textContent = sPct + "%";
      document.getElementById("barStress").style.width = sPct + "%";
      document.getElementById("barAnxVal").textContent = axPct + "%";
      document.getElementById("barAnx").style.width = axPct + "%";
      document.getElementById("barFatVal").textContent = fPct + "%";
      document.getElementById("barFat").style.width = fPct + "%";

      const anomUl = document.getElementById("resAnomalies");
      anomUl.textContent = "";
      (data.epistemic_audit?.observed_anomalies || ["No anomalies flagged."]).forEach((a) => {
        const li = document.createElement("li");
        li.textContent = String(a);
        anomUl.appendChild(li);
      });

      // XSS-Safe DOM Construction for 3 Calibrated Replies
      const replies = data.suggested_replies || { grounded: data.suggested_reply || "" };
      const rGrid = document.getElementById("repliesGrid");
      rGrid.textContent = "";
      [
        ["Grounded", replies.grounded, "text-cyan-300"],
        ["Direct", replies.direct, "text-amber-300"],
        ["Warm", replies.warm, "text-emerald-300"],
      ].forEach(([label, txt, color]) => {
        if (!txt) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1 transition";

        const hdr = document.createElement("div");
        hdr.className = `text-[10px] font-mono uppercase font-bold ${color}`;
        hdr.textContent = `${label} (Tap to Copy)`;

        const body = document.createElement("div");
        body.className = "text-xs text-slate-200 leading-snug";
        body.textContent = String(txt);

        btn.appendChild(hdr);
        btn.appendChild(body);
        btn.onclick = () => {
          navigator.clipboard?.writeText(String(txt));
          hdr.textContent = `${label} — Copied ✓`;
          setTimeout(() => { hdr.textContent = `${label} (Tap to Copy)`; }, 1500);
        };
        rGrid.appendChild(btn);
      });

      const sug = data.user_suggestions || {};
      document.getElementById("sugSomatic").textContent = sug.immediate_somatic_reset || "None.";
      document.getElementById("sugReframe").textContent = sug.reflective_reframe_prompt || "None.";
      document.getElementById("sugWorkspace").textContent = sug.workspace_adjustment || "None.";

      document.getElementById("rawTelemetryJson").textContent = JSON.stringify(
        {
          deterministic_metrics: data.deterministic_metrics,
          photo_geometry_audit: data.photo_geometry_audit,
          extended_local_geometry: photoState?.geometry || null,
          epistemic_audit: data.epistemic_audit,
        },
        null,
        2,
      );

      const sec = document.getElementById("resultsSection");
      sec.classList.remove("hidden");
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  </script>
</body>
</html>
