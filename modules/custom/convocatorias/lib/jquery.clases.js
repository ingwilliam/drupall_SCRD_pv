(function ($, jQuery) {
  /**
   *
   *
   *  DETALLE DE LA CONVOCATORIA
   */
  $("#call-detail-menu-tab .nav-link").click(function () {
    $("#call-detail-participants-submenu .nav-link.submenu-link").removeClass(
      "active"
    );
    $("#call-detail-documents-submenu .nav-link.submenu-link").removeClass(
      "active"
    );
    $("#call-detail-rights-submenu .nav-link.submenu-link").removeClass(
      "active"
    );
    $("#call-detail-appendix-submenu .nav-link.submenu-link").removeClass(
      "active"
    );
    // cerrar sidebar
    $("#sideMenuCallDetail").css("width", "");
  });

  // scroll al tope del contenido
  $(
    "#call-detail-menu-information-tab, #call-detail-menu-dates-tab, #call-detail-menu-justification-tab, #call-detail-menu-object-tab, #call-detail-menu-participant-tab, #call-detail-menu-administrative-tab, #call-detail-menu-evaluation-tab, #call-detail-menu-rights-tab, #call-detail-menu-appendix-tab, #call-detail-menu-formats-tab, #call-detail-menu-resolutions-tab, #call-detail-menu-list-tab, #call-detail-menu-notice-tab"
  ).click(function () {
    // scroll a la posicion
    document.getElementById("scroll-to-this").scrollIntoView();
  });

  // scroll a los segundos contenidos
  $("#call-detail-menu-unallowed-tab").click(function () {
    // scroll a la posicion
    document.getElementById("scroll-to-this-participants").scrollIntoView();
  });
  $("#call-detail-menu-duties-tab").click(function () {
    // scroll a la posicion
    document.getElementById("scroll-to-this-duties").scrollIntoView();
  });
  $("#call-detail-menu-technical-tab").click(function () {
    // scroll a la posicion
    document.getElementById("scroll-to-this-documents").scrollIntoView();
  });
})(jQuery);
