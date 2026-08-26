/* Signature M Detailing — Interaktionen */
(function () {
  "use strict";

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile-Menü ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var setMenu = function (open) {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", function () {
    setMenu(!menu.classList.contains("is-open"));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Scroll-Reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { el.classList.add("is-in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Vorher/Nachher-Regler ---------- */
  var range = document.getElementById("baRange");
  if (range) {
    var clip = document.getElementById("baClip");
    var handle = document.getElementById("baHandle");
    var beforeImg = document.getElementById("baBefore");
    var afterImg = document.getElementById("baAfter");

    var setSplit = function (pct) {
      clip.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    };
    setSplit(parseFloat(range.value));
    range.addEventListener("input", function () { setSplit(parseFloat(range.value)); });

    /* Fallbeispiel wechseln */
    var cases = document.querySelectorAll(".ba__case");
    cases.forEach(function (btn) {
      btn.addEventListener("click", function () {
        cases.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        beforeImg.src = btn.getAttribute("data-before");
        afterImg.src = btn.getAttribute("data-after");
        range.value = 50;
        setSplit(50);
      });
    });
  }

  /* ---------- Bild-Fallback (bis echte Fotos in ./images/ liegen) ---------- */
  var markMissing = function (img) {
    var wrap = img.closest(".frame, .svc__media, .gallery__item, .ba__stage");
    if (!wrap) return;
    wrap.classList.add("img-missing");
    wrap.setAttribute("data-label", img.getAttribute("alt") || "Signature M Detailing");
    img.style.visibility = "hidden";
  };
  document.querySelectorAll(".frame img, .svc__media img, .gallery__item img, .ba__img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    img.addEventListener("error", function () { markMissing(img); });
    img.addEventListener("load", function () {
      if (img.naturalWidth > 0) img.style.visibility = "";
    });
  });

  /* ---------- Impressum / Datenschutz per Link öffnen ---------- */
  var openLegalFromHash = function () {
    var id = (location.hash || "").replace("#", "");
    if (id !== "impressum" && id !== "datenschutz") return;
    var el = document.getElementById(id);
    if (el && el.tagName.toLowerCase() === "details") {
      el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  window.addEventListener("hashchange", openLegalFromHash);
  openLegalFromHash();

  /* ---------- Jahr im Footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Kontaktformular ---------- */
  var form = document.getElementById("contactForm");
  if (!form) return;
  var success = document.getElementById("formSuccess");
  var errorBox = document.getElementById("formError");

  var validators = {
    name: function (v) { return v.trim().length >= 2; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    message: function (v) { return v.trim().length >= 5; }
  };

  var validateField = function (input) {
    var name = input.getAttribute("name");
    if (!validators[name]) return true;
    var ok = validators[name](input.value);
    input.closest(".field").classList.toggle("is-error", !ok);
    return ok;
  };

  form.querySelectorAll("input, textarea").forEach(function (input) {
    ["blur", "input"].forEach(function (evt) {
      input.addEventListener(evt, function () {
        if (input.closest(".field").classList.contains("is-error")) validateField(input);
      });
    });
  });

  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.innerHTML : "Offerte anfordern";
  var endpoint = form.getAttribute("action") || "";
  // Formspree ist aktiv, sobald YOUR_FORM_ID durch eine echte Form-ID ersetzt wurde.
  var formspreeReady = /formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) && endpoint.indexOf("YOUR_FORM_ID") === -1;

  var lockForm = function (locked) {
    form.querySelectorAll("input, textarea, select, button").forEach(function (el) { el.disabled = locked; });
  };
  var resetBtn = function () {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitLabel;
  };
  var showSuccess = function () {
    if (errorBox) errorBox.hidden = true;
    success.hidden = false;
    lockForm(true);
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  var showError = function () {
    resetBtn();
    if (!errorBox) return;
    errorBox.hidden = false;
    errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;
    ["name", "email", "message"].forEach(function (n) {
      var input = form.querySelector('[name="' + n + '"]');
      if (!validateField(input)) valid = false;
    });
    if (!valid) {
      var firstErr = form.querySelector(".field.is-error input, .field.is-error textarea");
      if (firstErr) firstErr.focus();
      return;
    }

    // Noch keine Formspree-ID hinterlegt → Demo-Bestätigung, damit die Oberfläche nie kaputt wirkt.
    if (!formspreeReady) { showSuccess(); return; }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = "Wird gesendet…"; }
    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    }).then(function (res) {
      if (res.ok) showSuccess();
      else showError();
    }).catch(showError);
  });
})();
