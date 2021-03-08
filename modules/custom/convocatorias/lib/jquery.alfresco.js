(function ($, jQuery) {
  /**
   *
   *
   *  DESCARGA ALFRESCO
   */

  $("#call-detail a[data-document]").click(function (e) {
    e.preventDefault();
    // $.AjaxDownloader({
    //   url: "/api/getDocumentAlfresco",
    //   data: {
    //     cod: $(this).data("document"),
    //   },
    // });
    var doc = $(this).data("document");

    $.when(
      $.ajax({
        type: "GET",
        url: "/api/getDocumentAlfresco",
      })
    ).done(function (result) {
      console.log(doc);
      $.AjaxDownloader({
        url:
          "https://sicon.scrd.gov.co/crud_SCRD_pv/api/DrupalWS/download_file",
        data: {
          token: result.data,
          cod: doc,
        },
      });
    });
  });
})(jQuery);
