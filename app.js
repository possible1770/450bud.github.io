// 450·BUD — contact form opens the visitor's mail client (mailto), no backend.
(function () {
  "use strict";

  var INBOX = "hello@450bud.com"; // test recipient — change to the real inbox later

  // Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Contact form -> mailto ---
  var form = document.getElementById("request-form");
  var hint = document.getElementById("form-hint");
  var defaultHint = hint ? hint.textContent : "";

  function setHint(msg, state) {
    if (!hint) return;
    hint.textContent = msg;
    hint.classList.toggle("is-error", state === "error");
    hint.classList.toggle("is-ok", state === "ok");
  }

  function fieldWrap(input) { return input.closest(".field"); }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var phone = form.elements.phone.value.trim();
      var type = form.elements.type.value;
      var message = form.elements.message.value.trim();

      // reset error states
      Array.prototype.forEach.call(form.querySelectorAll(".field--bad"), function (f) {
        f.classList.remove("field--bad");
      });

      var bad = [];
      if (!name) bad.push(form.elements.name);
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) bad.push(form.elements.email);

      if (bad.length) {
        bad.forEach(function (el) {
          var w = fieldWrap(el);
          if (w) w.classList.add("field--bad");
        });
        bad[0].focus();
        setHint("Вкажіть, будь ласка, імʼя та коректний email.", "error");
        return;
      }

      // Build the email
      var subject = "Запит з сайту — " + type + (name ? " (" + name + ")" : "");
      var lines = [
        "Доброго дня! Хочу залишити запит.",
        "",
        "Імʼя: " + name,
        "Email: " + email,
        "Телефон: " + (phone || "—"),
        "Напрям: " + type,
        "",
        "Деталі:",
        (message || "—"),
        "",
        "— Надіслано з сайту 450·BUD"
      ];
      var href =
        "mailto:" + INBOX +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\r\n"));

      setHint("Відкриваємо вашу пошту… Якщо нічого не зʼявилось, напишіть на " + INBOX, "ok");
      window.location.href = href;
    });

    // clear error styling as the user fixes things
    form.addEventListener("input", function (e) {
      var w = e.target.closest && e.target.closest(".field--bad");
      if (w) w.classList.remove("field--bad");
      if (hint && hint.classList.contains("is-error")) setHint(defaultHint, "");
    });
  }

  // --- Hero entrance on load ---
  function markLoaded() { document.body.classList.add("loaded"); }
  if (document.readyState === "complete") markLoaded();
  else window.addEventListener("load", markLoaded);
  // safety net so content never stays hidden if 'load' is delayed
  setTimeout(markLoaded, 1200);

  // --- One orchestrated reveal on scroll ---
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".sec-head, .card, .steps li, .tile, .form, .subhero, .checklist li, .cta-band__inner, .next-service");
  Array.prototype.forEach.call(targets, function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + "ms";
  });

  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  // --- Subtle parallax on the hero monogram ---
  var mono = document.querySelector(".hero__monogram");
  if (mono && !reduce) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY * 0.08;
        mono.style.setProperty("transform", "translateY(calc(-50% + " + y + "px))");
        ticking = false;
      });
    }, { passive: true });
  }
})();
