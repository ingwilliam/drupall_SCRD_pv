/***************************************************************************************************
AjaxDownloader - A jQuery Plugin to perform Ajax style downloads
    Author          : Gaspare Sganga
    Version         : 1.1.0
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-ajax-downloader/
****************************************************************************************************/
!(function (a) {
  (a.AjaxDownloader = function (b) {
    var c = a.extend(
        !0,
        {},
        { data: a.ajaxSetup().data || {}, url: a.ajaxSetup().url },
        b
      ),
      d = a("<form>", {
        action: c.url,
        method: "POST",
        target: "AjaxDownloaderIFrame",
      }).appendTo("body");
    a.each(c.data, function (b, c) {
      a("<input>", {
        type: "hidden",
        name: b,
        value: "object" == typeof c ? JSON.stringify(c) : c,
      }).appendTo(d);
    }),
      d.submit(),
      d.remove();
  }),
    a(document).ready(function () {
      a("<iframe>", { name: "AjaxDownloaderIFrame" }).hide().appendTo("body");
    });
})(jQuery);
