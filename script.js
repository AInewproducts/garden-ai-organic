(function () {
  var trackEvent = function (name, parameters) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, parameters);
    }
  };

  var comparison = document.getElementById("comparison");
  var range = document.getElementById("comparison-range");
  var comparisonStarted = false;
  if (comparison && range) {
    range.addEventListener("input", function () {
      comparison.style.setProperty("--reveal", range.value + "%");
      range.setAttribute("aria-valuetext", range.value + "% of the AI concept visible");
      if (!comparisonStarted) {
        comparisonStarted = true;
        trackEvent("comparison_interaction", {
          comparison_value: Number(range.value)
        });
      }
    });
    range.addEventListener("change", function () {
      trackEvent("comparison_complete", {
        comparison_value: Number(range.value)
      });
    });
  }

  var params = new URLSearchParams(window.location.search);
  var clean = function (value, fallback) {
    var result = (value || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 48);
    return result || fallback;
  };
  var source = clean(params.get("utm_source") || params.get("src"), "organic");
  var campaign = clean(params.get("utm_campaign") || params.get("campaign"), "before_after_v1");
  var referrer = encodeURIComponent("utm_source=" + source + "&utm_campaign=" + campaign);
  var androidUrl = "https://play.google.com/store/apps/details?id=com.genbitapp.garden&referrer=" + referrer;

  document.querySelectorAll('[data-store="android"]').forEach(function (link) {
    link.href = androidUrl;
  });

  document.querySelectorAll(".store-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var store = link.getAttribute("data-store");
      trackEvent("store_click", {
        store: store,
        source: source,
        campaign: campaign,
        link_url: link.href
      });
      try {
        localStorage.setItem("garden:last-store-click", JSON.stringify({
          store: store, source: source, campaign: campaign,
          clickedAt: new Date().toISOString()
        }));
      } catch (_error) {}
    });
  });
})();
