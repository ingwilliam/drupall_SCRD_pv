(function ($, jQuery) {
  //
  //
  //
  // MENU LATERAL DE BUSQUEDA DE CONVOCATORIAS

  $("#openSideMenuCallsPdec").click(function () {
    $("#sideMenuCallsPdec").css({
      width: "300px",
      overflowX: "visible",
      overflowY: "auto",
    });
  });

  $("#closeSideMenuCallsPdec").click(function () {
    $("#sideMenuCallsPdec").css({
      width: "",
      overflowX: "hidden",
      overflowY: "hidden",
    });
  });

  $("#openSideMenuCallsPdac").click(function () {
    $("#sideMenuCallsPdac").css({
      width: "300px",
      overflowX: "visible",
      overflowY: "auto",
    });
  });

  $("#closeSideMenuCallsPdac").click(function () {
    $("#sideMenuCallsPdac").css({
      width: "",
      overflowX: "hidden",
      overflowY: "hidden",
    });
  });

  //
  //
  //
  // MENU LATERAL DEL DETALLE DE UNA CONVOCATORIA

  $("#openSideMenuCallDetail").click(function () {
    $("#sideMenuCallDetail").css("width", "300px");
  });

  $("#closeSideMenuCallDetail").click(function () {
    $("#sideMenuCallDetail").css("width", "");
  });
})(jQuery);
