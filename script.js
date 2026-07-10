(function () {
  var comparison = document.getElementById("comparison");
  var range = document.getElementById("comparison-range");
  if (comparison && range) {
    range.addEventListener("input", function () {
      comparison.style.setProperty("--reveal", range.value + "%");
      range.setAttribute("aria-valuetext", range.value + "% of the AI concept visible");
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
      try {
        localStorage.setItem("garden:last-store-click", JSON.stringify({
          store: link.getAttribute("data-store"), source: source, campaign: campaign,
          clickedAt: new Date().toISOString()
        }));
      } catch (_error) {}
    });
  });
})();

