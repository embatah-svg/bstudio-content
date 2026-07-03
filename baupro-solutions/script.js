/* BauPro Solutions GmbH — interactions */
(function () {
  "use strict";

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
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

  /* ---------- Scroll reveal ---------- */
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

  /* ---------- Graceful image fallback (until real photos are in ./images/) ---------- */
  var bpFallback = function (img) {
    var wrap = img.closest(".frame, .svc__media, .gallery__item");
    if (!wrap) return;
    wrap.classList.add("img-missing");
    wrap.setAttribute("data-label", img.getAttribute("alt") || "BauPro Solutions");
    img.style.display = "none";
  };
  document.querySelectorAll(".frame img, .svc__media img, .gallery__item img").forEach(function (img) {
    if (img.complete) { if (img.naturalWidth === 0) bpFallback(img); }
    img.addEventListener("error", function () { bpFallback(img); });
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contactForm");
  if (!form) return;
  var success = document.getElementById("formSuccess");

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
    input.addEventListener("blur", function () {
      if (input.closest(".field").classList.contains("is-error")) validateField(input);
    });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("is-error")) validateField(input);
    });
  });

  var errorBox = document.getElementById("formError");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.innerHTML : "Anfrage senden";
  var endpoint = form.getAttribute("action") || "";
  // Formspree is "ready" once YOUR_FORM_ID is replaced with a real form id.
  var formspreeReady = /formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) && endpoint.indexOf("YOUR_FORM_ID") === -1;

  var lockForm = function (locked) {
    form.querySelectorAll("input, textarea, select, button").forEach(function (el) { el.disabled = locked; });
  };
  var showSuccess = function () {
    if (errorBox) errorBox.hidden = true;
    success.hidden = false;
    lockForm(true);
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  var resetBtn = function () {
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitLabel;
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

    // No Formspree id configured yet → show a demo confirmation so the UI is never broken.
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
