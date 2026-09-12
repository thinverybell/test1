/* =========================================================
   Habitat_ Portfolio — script.js
   ========================================================= */
(function () {
    "use strict";

    /* =====================================================
       0. DEVTOOLS PROTECTION
       ===================================================== */
    (function devtoolsProtection() {

        // --- Block keyboard shortcuts ---
        document.addEventListener("keydown", function (e) {
            // F12
            if (e.key === "F12" || e.keyCode === 123) { e.preventDefault(); return false; }

            // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / Ctrl+Shift+K
            if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c" || e.key === "K" || e.key === "k")) {
                e.preventDefault(); return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && (e.key === "U" || e.key === "u")) { e.preventDefault(); return false; }

            // Ctrl+S (Save Page)
            if (e.ctrlKey && (e.key === "S" || e.key === "s")) { e.preventDefault(); return false; }

            // Cmd+Option+I / Cmd+Option+J / Cmd+Option+U (Mac)
            if (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "U")) {
                e.preventDefault(); return false;
            }

            // Ctrl+Shift+Delete (DevTools clear)
            if (e.ctrlKey && e.shiftKey && (e.key === "Delete" || e.key === "Backspace")) {
                e.preventDefault(); return false;
            }
        });

        // --- Block right-click / context menu ---
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            return false;
        });

        // --- Block drag on images ---
        document.addEventListener("dragstart", function (e) {
            if (e.target.tagName === "IMG") { e.preventDefault(); return false; }
        });

        // --- Disable text selection on sensitive elements (optional) ---
        document.addEventListener("selectstart", function (e) {
            if (e.target.tagName === "IMG") { e.preventDefault(); }
        });

        // --- Console warning ---
        var warnStyles = [
            "color: #ff4757",
            "font-size: 28px",
            "font-weight: bold",
            "text-shadow: 0 0 10px #ff4757",
            "padding: 10px"
        ].join(";");
        var warnStyles2 = [
            "color: #38bdf8",
            "font-size: 14px",
            "padding: 5px"
        ].join(";");

        console.log("%c⚠️ STOP!", warnStyles);
        console.log("%cConsole này dành cho DEVELOPER.\nSource code được bảo vệ.\nĐừng cố hack 😊", warnStyles2);

        // --- Disable toString() on functions to slow down string extraction ---
        // (lightweight, doesn't break anything)
        try {
            var origToString = Function.prototype.toString;
            var funcStr = "function toString() { [native code] }";
            Function.prototype.toString = function () {
                if (this === Function.prototype.toString) return funcStr;
                return origToString.call(this);
            };
        } catch (e) {}

        // --- Detect DevTools open via debugger timing (optional, mild) ---
        var devToolsOpened = false;
        function detectDevTools() {
            var threshold = 100;
            var start = performance.now();
            debugger; // This pauses ONLY if devtools is open
            if (performance.now() - start > threshold) {
                if (!devToolsOpened) {
                    devToolsOpened = true;
                    // Option: show a warning overlay
                    var overlay = document.createElement("div");
                    overlay.innerHTML = '<div style="position:fixed;inset:0;z-index:99999;background:rgba(7,11,24,.97);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;font-family:Inter,sans-serif;text-align:center;padding:30px"><div style="font-size:48px">⛔</div><div style="font-size:22px;font-weight:700;color:#ff4757">DevTools Đã Bị Phát Hiện</div><div style="font-size:14px;color:#9aa7c4;max-width:360px">Trang này bảo vệ source code.<br>Vui lòng đóng DevTools và tải lại trang.</div><button onclick="location.reload()" style="margin-top:8px;padding:10px 28px;border-radius:100px;border:1px solid #38bdf8;background:transparent;color:#38bdf8;font-size:13px;font-weight:600;cursor:pointer">🔄 Tải lại trang</button></div>';
                    document.body.appendChild(overlay);
                }
            }
        }

        // Only run detector if not already reduced-motion or headless
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Check on timer (lightweight, won't freeze)
            setInterval(detectDevTools, 3000);
        }

    })();

    /* =====================================================
       End protection — rest of application
       ===================================================== */

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isTouch = window.matchMedia("(hover: none)").matches;

    function $(id) { return document.getElementById(id); }

    /* =====================================================
       1. TOAST
       ===================================================== */
    var toastEl = $("toast");
    var toastMsg = $("toast-msg");
    var toastTimer = null;

    function toast(msg) {
        toastMsg.textContent = msg;
        toastEl.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
    }

    /* =====================================================
       2. PRELOADER
       ===================================================== */
    var preloader = $("preloader");
    var preFill = $("preloader-fill");
    var preProgress = 0;

    var preTimer = setInterval(function () {
        preProgress += Math.random() * 18 + 8;
        if (preProgress > 92) preProgress = 92;
        preFill.style.width = preProgress + "%";
    }, 130);

    function finishPreloader() {
        clearInterval(preTimer);
        preFill.style.width = "100%";
        setTimeout(function () {
            preloader.classList.add("done");
            preloader.setAttribute("aria-hidden", "true");
            startReveals();
        }, 380);
    }

    window.addEventListener("load", function () { setTimeout(finishPreloader, 260); });
    // Safety net if load never fires
    setTimeout(function () { if (!preloader.classList.contains("done")) finishPreloader(); }, 3800);

    /* =====================================================
       3. PARTICLE BACKGROUND
       ===================================================== */
    var canvas = $("particles-canvas");
    var ctx = canvas.getContext("2d");
    var particles = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    // RGB spectrum for particles
    var palette = [
        { r: 37,  g: 99,  b: 235 },  // blue
        { r: 34,  g: 211, b: 238 },  // cyan
        { r: 139, g: 92,  b: 246 },  // violet
        { r: 236, g: 72,  b: 153 },  // pink
        { r: 56,  g: 189, b: 248 }   // sky
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    var resizeTO;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTO);
        resizeTO = setTimeout(function () {
            resizeCanvas();
            rebuildParticles();
        }, 180);
    });

    function vw() { return window.innerWidth; }
    function vh() { return window.innerHeight; }

    function Particle() { this.reset(true); }

    Particle.prototype.reset = function (anywhere) {
        this.x = Math.random() * vw();
        this.y = anywhere ? Math.random() * vh() : vh() + 12;
        this.size = Math.random() * 2.6 + 0.8;
        this.speedY = -(Math.random() * 0.32 + 0.09);
        this.speedX = (Math.random() - 0.5) * 0.24;
        this.maxOpacity = Math.random() * 0.5 + 0.18;
        this.opacity = anywhere ? Math.random() * this.maxOpacity : 0;
        this.fadeIn = true;
        this.fadeSpeed = Math.random() * 0.0035 + 0.0016;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.04 + 0.012;
        this.square = Math.random() > 0.35; // mostly pixel squares (Minecraft feel)
    };

    Particle.prototype.update = function () {
        this.y += this.speedY;
        this.x += this.speedX;
        this.twinkle += this.twinkleSpeed;

        if (this.fadeIn) {
            this.opacity += this.fadeSpeed * 2;
            if (this.opacity >= this.maxOpacity) { this.opacity = this.maxOpacity; this.fadeIn = false; }
        } else {
            this.opacity -= this.fadeSpeed;
        }

        if (this.opacity <= 0 || this.y < -14) this.reset(false);
        if (this.x < -14) this.x = vw() + 14;
        if (this.x > vw() + 14) this.x = -14;
    };

    Particle.prototype.draw = function () {
        var flicker = 0.72 + Math.sin(this.twinkle) * 0.28;
        var a = Math.max(0, this.opacity * flicker);
        var c = this.color;
        ctx.fillStyle = "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")";
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = "rgba(" + c.r + "," + c.g + "," + c.b + "," + (a * 0.8) + ")";
        if (this.square) {
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    };

    function rebuildParticles() {
        var target = Math.min(vw() < 640 ? 34 : 84, Math.floor(vw() / 15));
        particles = [];
        for (var i = 0; i < target; i++) particles.push(new Particle());
    }
    rebuildParticles();

    var rafId = null;
    function animateParticles() {
        ctx.clearRect(0, 0, vw(), vh());
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        rafId = requestAnimationFrame(animateParticles);
    }
    if (!reduceMotion) animateParticles();

    // Pause the canvas loop when the tab is hidden
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        } else if (!rafId && !reduceMotion) {
            animateParticles();
        }
    });

    /* =====================================================
       4. THEME TOGGLE
       ===================================================== */
    var themeToggleBtn = $("theme-toggle");
    var themeIconEl = $("theme-icon");

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        themeIconEl.textContent = theme === "dark" ? "🌙" : "☀️";
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", theme === "dark" ? "#070b18" : "#f4f7ff");
        try { localStorage.setItem("theme", theme); } catch (e) {}
    }

    themeToggleBtn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
        toast(next === "dark" ? "🌙 Dark mode" : "☀️ Light mode");
    });

    (function () {
        var saved = "dark";
        try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
        setTheme(saved);
    })();

    /* =====================================================
       5. CURSOR GLOW (desktop only)
       ===================================================== */
    var cursorGlow = $("cursor-glow");
    if (!isTouch && !reduceMotion) {
        var cgX = 0, cgY = 0, curX = 0, curY = 0, cgOn = false;

        window.addEventListener("mousemove", function (e) {
            cgX = e.clientX; cgY = e.clientY;
            if (!cgOn) { cgOn = true; cursorGlow.classList.add("on"); curX = cgX; curY = cgY; }
        });
        window.addEventListener("mouseleave", function () { cursorGlow.classList.remove("on"); cgOn = false; });

        (function loopGlow() {
            curX += (cgX - curX) * 0.09;
            curY += (cgY - curY) * 0.09;
            cursorGlow.style.transform = "translate(" + curX + "px," + curY + "px) translate(-50%,-50%)";
            requestAnimationFrame(loopGlow);
        })();
    }

    /* =====================================================
       6. CARD TILT + SHINE (desktop only)
       ===================================================== */
    if (!isTouch && !reduceMotion) {
        var tiltCards = document.querySelectorAll("[data-tilt], .server-card");

        Array.prototype.forEach.call(tiltCards, function (card) {
            card.addEventListener("mousemove", function (e) {
                var r = card.getBoundingClientRect();
                var px = (e.clientX - r.left) / r.width;
                var py = (e.clientY - r.top) / r.height;
                card.style.setProperty("--mx", (px * 100) + "%");
                card.style.setProperty("--my", (py * 100) + "%");
                var rx = (py - 0.5) * -5;
                var ry = (px - 0.5) * 6;
                card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-5px)";
            });
            card.addEventListener("mouseleave", function () { card.style.transform = ""; });
        });
    }

    /* =====================================================
       7. TYPING EFFECT
       ===================================================== */
    var typingPhrases = [
        "Minecraft File Maker ⛏",
        "Creative Configer ⚙️",
        "Server Admin 🖥️",
        "Plugin Developer 🧩"
    ];
    var phraseIdx = 0, charIdx = 0, deleting = false;
    var typingEl = $("typing-text");

    function typeEffect() {
        var phrase = typingPhrases[phraseIdx];
        if (!deleting) {
            typingEl.textContent = phrase.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx >= phrase.length) {
                deleting = true;
                setTimeout(typeEffect, 2100);
                return;
            }
            setTimeout(typeEffect, 72);
        } else {
            typingEl.textContent = phrase.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx <= 0) {
                charIdx = 0;
                deleting = false;
                phraseIdx = (phraseIdx + 1) % typingPhrases.length;
                setTimeout(typeEffect, 420);
                return;
            }
            setTimeout(typeEffect, 34);
        }
    }
    typeEffect();

    /* =====================================================
       8. HEADER / SCROLL PROGRESS / ACTIVE NAV / TO-TOP
       ===================================================== */
    var header = $("header");
    var progressBar = $("scroll-progress");
    var toTopBtn = $("to-top");
    var navLinks = document.querySelectorAll(".nav-link");
    var drawerLinks = document.querySelectorAll(".drawer-link");
    var sections = ["about", "skills", "plugins", "server"];

    var scrollQueued = false;

    function applyScrollState() {
        scrollQueued = false;

        var y = window.pageYOffset || document.documentElement.scrollTop;
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? (y / docH) * 100 : 0;

        progressBar.style.width = pct + "%";
        header.classList.toggle("scrolled", y > 24);
        toTopBtn.classList.toggle("show", y > 420);

        // Active section
        var active = sections[0];
        for (var i = 0; i < sections.length; i++) {
            var el = $(sections[i]);
            if (el && el.getBoundingClientRect().top <= 140) active = sections[i];
        }
        setActiveNav(active);
    }

    function onScroll() {
        if (scrollQueued) return;
        scrollQueued = true;
        // Fall back to a timer if rAF is suspended (background tab), so the
        // header/progress never get stuck behind an un-cleared flag.
        var done = false;
        requestAnimationFrame(function () {
            if (done) return;
            done = true;
            applyScrollState();
        });
        setTimeout(function () {
            if (done) return;
            done = true;
            applyScrollState();
        }, 120);
    }

    function setActiveNav(id) {
        Array.prototype.forEach.call(navLinks, function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
        Array.prototype.forEach.call(drawerLinks, function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    /* =====================================================
       9. MOBILE DRAWER
       ===================================================== */
    var menuToggle = $("menu-toggle");
    var drawer = $("drawer");
    var drawerBackdrop = $("drawer-backdrop");
    var drawerClose = $("drawer-close");

    function openDrawer() {
        drawer.classList.add("open");
        drawer.removeAttribute("aria-hidden");
        drawerBackdrop.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("no-scroll");
        drawerClose.focus();
    }
    function closeDrawer() {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        drawerBackdrop.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
    }
    drawer.setAttribute("aria-hidden", "true");

    menuToggle.addEventListener("click", function () {
        drawer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
    drawerClose.addEventListener("click", closeDrawer);
    drawerBackdrop.addEventListener("click", closeDrawer);
    Array.prototype.forEach.call(drawerLinks, function (a) {
        a.addEventListener("click", closeDrawer);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
    });

    /* =====================================================
       10. REVEAL ON SCROLL + COUNTERS + SKILL BARS
       ===================================================== */
    var revealEls = document.querySelectorAll(".reveal");
    var revealStarted = false;

    function animateCount(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        if (isNaN(target)) return;
        if (reduceMotion) { el.textContent = target + suffix; return; }

        var dur = 1300;
        var t0 = Date.now();
        var finished = false;

        function frame() {
            if (finished) return;
            var p = Math.min((Date.now() - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) {
                requestAnimationFrame(frame);
            } else {
                finished = true;
            }
        }
        requestAnimationFrame(frame);

        // If rAF is suspended, make sure the final value still lands.
        setTimeout(function () {
            if (!finished) { finished = true; el.textContent = target + suffix; }
        }, dur + 260);
    }

    function activateReveal(el) {
        el.classList.add("in");

        var counters = el.querySelectorAll("[data-count]");
        Array.prototype.forEach.call(counters, function (c, i) {
            setTimeout(function () { animateCount(c); }, i * 110);
        });

        var fills = el.querySelectorAll(".skill-fill");
        Array.prototype.forEach.call(fills, function (f) {
            setTimeout(function () { f.style.width = f.getAttribute("data-fill") + "%"; }, 180);
        });
    }

    var revealObserver = null;
    if ("IntersectionObserver" in window) {
        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    activateReveal(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }

    function startReveals() {
        if (revealStarted) return;
        revealStarted = true;

        if (!revealObserver) {
            Array.prototype.forEach.call(revealEls, activateReveal);
            return;
        }

        // Stagger elements already in view, observe the rest
        var visibleIdx = 0;
        Array.prototype.forEach.call(revealEls, function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.92) {
                var delay = visibleIdx * 120;
                visibleIdx++;
                setTimeout(function () { activateReveal(el); }, delay);
            } else {
                revealObserver.observe(el);
            }
        });
    }

    /* =====================================================
       11. COPY SERVER IP
       ===================================================== */
    var DISPLAY_IP = "Soulmc.vn";
    var FETCH_URL = "https://api.mcsrvstat.us/3/soulmc.vn";

    function copyIP() {
        var text = DISPLAY_IP;
        function done() { toast("✅ Đã copy IP: " + text); }
        function fail() { toast("⚠️ Không copy được, IP: " + text); }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text) ? done() : fail(); });
        } else {
            legacyCopy(text) ? done() : fail();
        }
    }

    function legacyCopy(text) {
        try {
            var ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            var ok = document.execCommand("copy");
            document.body.removeChild(ta);
            return ok;
        } catch (e) { return false; }
    }

    ["copy-ip-hero", "copy-ip-card", "drawer-ip"].forEach(function (id) {
        var el = $(id);
        if (el) el.addEventListener("click", function (e) { e.preventDefault(); copyIP(); });
    });

    /* =====================================================
       12. MINECRAFT SERVER STATUS
       ===================================================== */
    var MAX_SLOTS = 2026;

    var sIp = $("server-ip");
    var sPlayers = $("server-players");
    var sSoftware = $("server-software");
    var sVersion = $("server-version");
    var sPing = $("server-ping");
    var sMotd = $("server-motd");
    var sIcon = $("server-icon");
    var sIconPh = $("server-icon-placeholder");
    var sDot = document.querySelector(".status-dot");
    var sText = document.querySelector(".status-text");
    var sBarFill = $("player-bar-fill");
    var sBarText = $("player-bar-text");
    var sUpdated = $("last-updated");
    var statPlayers = $("stat-players");
    var refreshBtn = $("refresh-btn");
    var fetching = false;

    function fetchServer(manual) {
        if (fetching) return;
        fetching = true;
        if (manual) refreshBtn.classList.add("spinning");

        var t0 = Date.now();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", FETCH_URL, true);
        xhr.timeout = 12000;

        function finish() {
            fetching = false;
            refreshBtn.classList.remove("spinning");
        }

        xhr.onload = function () {
            finish();
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    renderServer(JSON.parse(xhr.responseText), Date.now() - t0);
                    if (manual) toast("🔄 Đã cập nhật trạng thái server");
                } catch (e) {
                    showServerError("Parse error");
                }
            } else {
                showServerError("HTTP " + xhr.status);
            }
        };
        xhr.onerror = function () { finish(); showServerError("Network error"); };
        xhr.ontimeout = function () { finish(); showServerError("Timeout"); };
        xhr.send();
    }

    function renderServer(data, latency) {
        var online = data.online === true;

        sDot.className = "status-dot " + (online ? "online" : "offline");
        sText.textContent = online ? "Online" : "Offline";
        sText.style.color = online ? "var(--ok)" : "var(--danger)";
        sIp.textContent = DISPLAY_IP;

        if (data.motd && data.motd.clean && data.motd.clean.length) {
            sMotd.textContent = data.motd.clean.join("\n");
        } else {
            sMotd.textContent = online ? "Minecraft Server" : "Server is offline";
        }

        if (data.icon) {
            sIcon.src = data.icon;
            sIcon.style.display = "block";
            sIconPh.style.display = "none";
        } else {
            sIcon.style.display = "none";
            sIconPh.style.display = "block";
        }

        if (online) {
            var on = (data.players && data.players.online) ? data.players.online : 0;
            sPlayers.textContent = on + " / " + MAX_SLOTS;
            sSoftware.textContent = data.software || "Unknown";
            sVersion.textContent = data.version || "Unknown";
            sPing.textContent = latency ? latency + "ms" : "—";
            if (statPlayers) statPlayers.textContent = on;

            var pct = Math.max(1.5, (on / MAX_SLOTS) * 100);
            sBarFill.style.width = pct + "%";
            sBarText.textContent = on + " / " + MAX_SLOTS;
        } else {
            sPlayers.textContent = "—";
            sSoftware.textContent = "—";
            sVersion.textContent = "—";
            sPing.textContent = "—";
            if (statPlayers) statPlayers.textContent = "0";
            sBarFill.style.width = "0%";
            sBarText.textContent = "0 / " + MAX_SLOTS;
        }

        sUpdated.textContent = "Cập nhật lần cuối: " + new Date().toLocaleTimeString("vi-VN");
    }

    function showServerError(reason) {
        sDot.className = "status-dot offline";
        sText.textContent = "Error";
        sText.style.color = "var(--danger)";
        sIp.textContent = DISPLAY_IP;
        sMotd.textContent = "Không thể kết nối (" + (reason || "unknown") + ")";
        sPlayers.textContent = "—";
        sSoftware.textContent = "—";
        sVersion.textContent = "—";
        sPing.textContent = "—";
        if (statPlayers) statPlayers.textContent = "—";
        sBarFill.style.width = "0%";
        sBarText.textContent = "0 / " + MAX_SLOTS;
        sUpdated.textContent = "Cập nhật lần cuối: Lỗi kết nối";
    }

    refreshBtn.addEventListener("click", function () { fetchServer(true); });
    fetchServer(false);
    setInterval(function () { if (!document.hidden) fetchServer(false); }, 60000);

    /* =====================================================
       13. MUSIC PLAYER
       ===================================================== */
    var songs = [
        { title: "[Reply Kidchoi] Little Homie — B Ray", src: "assets/audio/music.mp3" },
        { title: "B.S.N.L 1 | B RAY x YOUNG H", src: "assets/audio/music2.mp3" },
        { title: "Em — Binz", src: "assets/audio/music3.mp3" }
    ];

    var currentSong = 0;
    var playing = false;
    var audio = new Audio();
    audio.volume = 0.5;
    audio.preload = "metadata";

    var playBtn = $("music-play");
    var prevBtn = $("music-prev");
    var nextBtn = $("music-next");
    var nowName = $("now-playing-name");
    var volSlider = $("volume-slider");
    var volValue = $("volume-value");
    var volIcon = $("volume-icon");
    var plContainer = $("music-playlist");
    var mPlayer = $("music-player");
    var mHeader = $("music-header");
    var mMinBtn = $("music-minimize");
    var mMinIcon = $("music-minimize-icon");
    var mCloseBtn = $("music-close");
    var musicFab = $("music-fab");
    var eqEl = $("eq");
    var artDisc = document.querySelector(".art-disc");
    var seekTrack = $("seek-track");
    var seekFill = $("seek-fill");
    var timeCur = $("time-cur");
    var timeDur = $("time-dur");

    function buildPlaylist() {
        var titleDiv = plContainer.querySelector(".playlist-title");
        plContainer.innerHTML = "";
        if (titleDiv) plContainer.appendChild(titleDiv);

        songs.forEach(function (song, idx) {
            var item = document.createElement("div");
            item.className = "playlist-item" + (idx === currentSong ? " active" : "");

            var num = document.createElement("span");
            num.className = "playlist-item-index";
            num.textContent = (idx + 1) + ".";

            var name = document.createElement("span");
            name.className = "playlist-item-name";
            name.textContent = song.title;

            item.appendChild(num);
            item.appendChild(name);
            item.addEventListener("click", function (e) {
                e.stopPropagation();
                currentSong = idx;
                playSong();
            });
            plContainer.appendChild(item);
        });
    }

    function updateUI() {
        var items = plContainer.querySelectorAll(".playlist-item");
        Array.prototype.forEach.call(items, function (it, i) {
            it.classList.toggle("active", i === currentSong);
        });
        nowName.textContent = songs[currentSong].title;

        playBtn.textContent = playing ? "⏸" : "▶";
        playBtn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát");
        eqEl.classList.toggle("on", playing);
        if (artDisc) artDisc.classList.toggle("spinning", playing);
        musicFab.classList.toggle("playing", playing);
    }

    function playSong() {
        audio.src = songs[currentSong].src;
        audio.load();
        audio.play().then(function () {
            playing = true;
            updateUI();
        }).catch(function (err) {
            playing = false;
            updateUI();
            toast("⚠️ Không phát được nhạc");
            if (window.console) console.warn("Play failed:", err && err.message);
        });
    }

    function togglePlayPause() {
        if (!audio.src) { playSong(); return; }
        if (playing) {
            audio.pause();
            playing = false;
            updateUI();
        } else {
            audio.play().then(function () {
                playing = true;
                updateUI();
            }).catch(function () { toast("⚠️ Không phát được nhạc"); });
        }
    }

    function goNext() { currentSong = (currentSong + 1) % songs.length; playSong(); }
    function goPrev() { currentSong = (currentSong - 1 + songs.length) % songs.length; playSong(); }

    audio.addEventListener("ended", goNext);
    audio.addEventListener("pause", function () { playing = false; updateUI(); });
    audio.addEventListener("play", function () { playing = true; updateUI(); });

    function stopProp(e) { e.stopPropagation(); }

    playBtn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); togglePlayPause(); });
    nextBtn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); goNext(); });
    prevBtn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); goPrev(); });

    /* --- Seek bar --- */
    function fmtTime(sec) {
        if (!isFinite(sec) || sec < 0) return "0:00";
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        return m + ":" + (s < 10 ? "0" : "") + s;
    }

    audio.addEventListener("loadedmetadata", function () { timeDur.textContent = fmtTime(audio.duration); });
    audio.addEventListener("timeupdate", function () {
        if (!audio.duration) return;
        seekFill.style.width = ((audio.currentTime / audio.duration) * 100) + "%";
        timeCur.textContent = fmtTime(audio.currentTime);
    });

    function seekFromEvent(e) {
        if (!audio.duration) return;
        var r = seekTrack.getBoundingClientRect();
        var clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
        var ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
        audio.currentTime = ratio * audio.duration;
        seekFill.style.width = (ratio * 100) + "%";
    }

    seekTrack.addEventListener("click", function (e) { e.stopPropagation(); seekFromEvent(e); });
    seekTrack.addEventListener("mousedown", stopProp);
    seekTrack.addEventListener("touchstart", function (e) { e.stopPropagation(); seekFromEvent(e); }, { passive: true });

    /* --- Volume --- */
    var savedVol = 0.5;

    function onVolumeChange() {
        var val = parseInt(volSlider.value, 10);
        audio.volume = val / 100;
        volValue.textContent = val + "%";
        volIcon.textContent = val === 0 ? "🔇" : (val < 50 ? "🔉" : "🔊");
        try { localStorage.setItem("volume", String(val)); } catch (e) {}
    }

    volSlider.addEventListener("input", onVolumeChange);
    volSlider.addEventListener("change", onVolumeChange);
    volSlider.addEventListener("mousedown", stopProp);
    volSlider.addEventListener("touchstart", stopProp, { passive: true });
    volSlider.addEventListener("click", stopProp);

    volIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        if (audio.volume > 0) {
            savedVol = audio.volume;
            audio.volume = 0;
            volSlider.value = 0;
        } else {
            audio.volume = savedVol || 0.5;
            volSlider.value = Math.round((savedVol || 0.5) * 100);
        }
        onVolumeChange();
    });

    (function restoreVolume() {
        var v = null;
        try { v = localStorage.getItem("volume"); } catch (e) {}
        if (v !== null) { volSlider.value = v; onVolumeChange(); }
    })();

    /* --- Minimize / close / FAB --- */
    var minimized = false;

    function toggleMinimize() {
        minimized = !minimized;
        mPlayer.classList.toggle("minimized", minimized);
        mMinIcon.textContent = minimized ? "▲" : "▼";
    }

    mMinBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleMinimize(); });
    mHeader.addEventListener("click", function (e) {
        if (e.target.closest(".music-header-controls")) return;
        toggleMinimize();
    });

    mCloseBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        mPlayer.classList.add("hidden");
        musicFab.classList.add("show");
        toast("🎵 Nhấn nút nhạc để mở lại");
    });

    musicFab.addEventListener("click", function () {
        if (mPlayer.classList.contains("hidden")) {
            mPlayer.classList.remove("hidden");
            if (minimized) toggleMinimize();
        } else {
            mPlayer.classList.add("hidden");
            musicFab.classList.add("show");
        }
    });

    // Start collapsed on small screens so it doesn't cover content
    if (window.innerWidth <= 560) {
        mPlayer.classList.add("hidden");
    }

    buildPlaylist();
    updateUI();

    /* =====================================================
       14. KEYBOARD SHORTCUTS
       ===================================================== */
    document.addEventListener("keydown", function (e) {
        var t = e.target.tagName;
        if (t === "INPUT" || t === "TEXTAREA") return;

        if (e.code === "Space") { e.preventDefault(); togglePlayPause(); }
        else if (e.key === "ArrowRight" && e.shiftKey) goNext();
        else if (e.key === "ArrowLeft" && e.shiftKey) goPrev();
    });
})();
