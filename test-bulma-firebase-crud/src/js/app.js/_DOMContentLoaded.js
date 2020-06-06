document.addEventListener("DOMContentLoaded", function() {
  // Init Pjax instance
  pjax = new Pjax({
    elements: [".js-Pjax"],
    selectors: ["title", ".body"],
    cacheBust: true
  });
  console.log("Pjax initialized.", pjax);

  // Init page content
  // initButtons();
});
