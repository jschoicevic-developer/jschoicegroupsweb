(function () {
  if (typeof MutationObserver === "undefined") return;

  // Attributes injected by browser extensions that cause React hydration mismatches.
  // bis_*           = Bitdefender TrafficLight / Antivirus
  // data-gr-*       = Grammarly
  // data-new-gr-*   = Grammarly
  // data-darkreader = Dark Reader
  // cz-shortcut-*   = ColorZilla
  // data-lastpass-* = LastPass
  var BAD_ATTRS = [
    "bis_skin_checked",
    "bis_register",
    "__processed_",
    "data-gr-ext-installed",
    "data-gr-ext-disabled",
    "data-new-gr-c-s-check-loaded",
    "data-new-gr-c-s-loaded",
    "data-darkreader-mode",
    "data-darkreader-scheme",
    "cz-shortcut-listen",
    "data-lastpass-icon-root",
    "data-lpignore"
  ];

  function strip(el) {
    if (!el || el.nodeType !== 1) return;
    for (var i = 0; i < el.attributes.length; i++) {
      var name = el.attributes[i].name;
      for (var j = 0; j < BAD_ATTRS.length; j++) {
        if (name === BAD_ATTRS[j] || name.indexOf(BAD_ATTRS[j]) === 0) {
          el.removeAttribute(name);
          i--;
          break;
        }
      }
    }
  }

  function stripAll(root) {
    strip(root);
    if (root.querySelectorAll) {
      var els = root.querySelectorAll("*");
      for (var i = 0; i < els.length; i++) strip(els[i]);
    }
  }

  // Initial sweep
  stripAll(document.documentElement);

  // Keep stripping as extensions inject attributes during/after hydration.
  var obs = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.type === "attributes") {
        strip(m.target);
      } else if (m.type === "childList") {
        for (var j = 0; j < m.addedNodes.length; j++) {
          stripAll(m.addedNodes[j]);
        }
      }
    }
  });

  obs.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: BAD_ATTRS
  });
})();
