(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var burger = document.querySelector(".burger");
  var mobile = document.querySelector(".nav-mobile");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function closeMenu() {
    if (!burger || !mobile) return;
    mobile.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    document.body.style.overflow = "";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll(".faq details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      detail.parentElement.querySelectorAll("details[open]").forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });

  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var company = String(data.get("company") || "").trim();
      var profile = String(data.get("profile") || "").trim();
      var message = String(data.get("message") || "").trim();
      var body = [
        "Nom : " + name,
        "Email : " + email,
        "Téléphone : " + phone,
        "Entreprise : " + company,
        "Parcours : " + profile,
        "",
        message
      ].join("\n");
      var href = "mailto:ericseutet@seutetavocats.fr?subject=" +
        encodeURIComponent("Demande de contact — Cession & Reprise — " + profile) +
        "&body=" + encodeURIComponent(body);

      var ok = document.querySelector(".form-ok");
      if (ok) ok.classList.add("is-on");
      window.location.href = href;
    });
  }
})();
