(function ($, jQuery) {
  /**
   *
   *
   * BOTON REGISTRARSE
   */
  // agregar estilo al botón "Registrarse":
  $("#block-scrd-theme-main-menu #navbarMainMenu ul li a")
    .last()
    .addClass("sign-up");

  /**
   *
   *
   * AJUSTE CENTRADO NAVBAR
   */
  $(
    "#block-scrd-theme-main-menu #navbarMainMenu ul li:nth-last-child(2), #block-scrd-theme-main-menu #navbarMainMenu ul li:nth-child(1)"
  ).addClass("mt-xl-0 ml-0 ml-xl-auto");

  /**
   *
   *
   * TABS PROGRAMAS DE FOMENTO
   */
  //Activar la primera tab
  $(
    "#views-bootstrap-tab-views-bootstrap-carousel-main-programs-block-1 li.active a"
  ).addClass("active");

  /**
   *
   *
   * EXPERIENCIAS GANADORAS
   */

  // agregar la clase "active" al primer item del carrusel de "Experiencias ganadoras"
  $("#block-views-block-winner-experiences .carousel-item")
    .first()
    .addClass("active");

  // agregar los indicadores de slider seleccionables al carrusel de "Experiencias ganadoras"
  var indicators = $("#experiencesCarousel .carousel-inner .carousel-item")
    .length;
  var i = 0;
  for (i; i < indicators; i++) {
    if (i == 0) {
      $("#indicatorsExperiencesCarousel").append(
        "<li data-target='#experiencesCarousel' data-slide-to='0' class='indicator active'></li>"
      );
    } else {
      $("#indicatorsExperiencesCarousel").append(
        "<li data-target='#experiencesCarousel' data-slide-to='" +
          i +
          "' class='indicator'></li>"
      );
    }
  }

  /**
   *
   *
   * BLOQUE DE NOTICIAS DESTACADAS
   */

  // contenedor de la noticia destacada para que ocupe todo el espacio
  $("#updatesSection")
    .parent()
    .removeClass("col-12 col-xl-4")
    .addClass("col-12");

  /**
   *
   *
   *  NOTICIAS RELACIONADAS
   */

  $("#relatedNews").find("div[class='field__item']").addClass("col-6");
  $("#relatedNews")
    .find(".field.field--name-title.field--type-string.field--label-hidden")
    .css("color", "white");
  $("#relatedNews")
    .find(
      ".field.field--name-field-news-date.field--type-datetime.field--label-hidden.field__item"
    )
    .css("color", "white");

  /**
   *
   *
   *  EVENTOS RELACIONADOS
   */

  $("#relatedEvents .view-content").addClass("row");
  $("#relatedEvents .views-row").addClass("col-12 col-md-6");

  /**
   *
   *
   *  INFORMACIÓN BANCO DE JURADOS
   */

  $(
    "#views-bootstrap-tab-views-bootstrap-informacion-banco-de-jurados-block-1"
  ).addClass("row");
  $(
    "#views-bootstrap-tab-views-bootstrap-informacion-banco-de-jurados-block-1 ul"
  ).addClass("col-12 col-md-4 px-3 px-md-auto flex-md-column");
  $(
    "#views-bootstrap-tab-views-bootstrap-informacion-banco-de-jurados-block-1 .tab-content"
  ).addClass("col-12 col-md-8");
  $(
    "#views-bootstrap-tab-views-bootstrap-informacion-banco-de-jurados-block-1 ul li.active a"
  ).addClass("active");

  /**
   *
   *
   *  MANUALES
   */

  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1"
  ).addClass("row");
  $("#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 ul")
    .addClass("side-menu col-lg-3 pl-3 flex-column")
    .attr("id", "sideMenuManuals");
  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 .tab-content"
  ).addClass("offset-lg-1 col-lg-8 col-12 ");
  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 ul li.active a"
  ).addClass("active");

  /**
   *
   *
   *  PREGUNTAS
   */

  $("#views-bootstrap-tab-views-bootstrap-questions-block-1").addClass("row");
  $("#views-bootstrap-tab-views-bootstrap-questions-block-1 > ul")
    .addClass("side-menu col-lg-3 pl-3 flex-column")
    .attr("id", "sideMenuQuestions");
  $(
    "#views-bootstrap-tab-views-bootstrap-questions-block-1 .tab-content"
  ).addClass("col-12 offset-lg-1 col-lg-8");
  $(
    "#views-bootstrap-tab-views-bootstrap-questions-block-1 > ul li.active a"
  ).addClass("active");

  /**
   *
   *
   *  MENU
   */

  // Mostrar en una pestaña nueva los pdfs del menu
  $(
    "#navbarMainMenu .custom__dropdown li.nav-item a.nav-link[href*='.pdf']"
  ).attr("target", "_blank");

  // Añadir icono de pestaña externa después de cada pdfs
  $("#navbarMainMenu li.nav-item a.nav-link[href*='.pdf']").wrapInner(
    "<p class='mb-0'></p>"
  );
  $("#navbarMainMenu li.nav-item a.nav-link[href*='.pdf'] p").append(
    "<span class='external'></span>"
  );

  // console.log($("#navbarMainMenu li.nav-item a.nav-link[href*='.pdf']").length);

  /**
   *
   *
   *  MAPA
   */

  // pintar localidad al estar hover

  $(".st0, .st1").mouseover(function () {
    var locationId = $(this).attr("id");
    if (locationId) {
      $("#views-view-exprience-seeker #" + locationId + ".st0")
        .removeClass("st0")
        .addClass("st2");
      $("#views-view-exprience-seeker #" + locationId + ".st1")
        .removeClass("st1")
        .addClass("st3");
      textTag = $("#locationSelect--" + locationId.split("--")[1]).text();
      $("#locationsSelected--default").remove();
      $("#locationsSelected").append(
        "<p class='f-20 text-dark-900 font-weight-bold mb-0'>" +
          textTag +
          "</p>"
      );
    }
  });

  $(".st0, .st1").mouseout(function () {
    var locationId = $(this).attr("id");
    if (locationId) {
      $("#views-view-exprience-seeker #" + locationId + ".st2")
        .removeClass("st2")
        .addClass("st0");
      $("#views-view-exprience-seeker #" + locationId + ".st3")
        .removeClass("st3")
        .addClass("st1");
    }
    $("#locationsSelected p").remove();
    $("#locationsSelected").append(
      "<p class='f-20 text-dark-700 mb-0' id='locationsSelected--default'>Selecciona una localidad</p>"
    );
  });

  var locationId = $(
    ".node--type-experience.node--view-mode-full p.locationText"
  ).attr("id");

  if (locationId) {
    locationId = locationId.split("--")[1];

    $(
      ".node--type-experience.node--view-mode-full #locationSelectSvg--" +
        locationId +
        ".st0"
    )
      .removeClass("st0")
      .addClass("st2");
    $(
      ".node--type-experience.node--view-mode-full #locationSelectSvg--" +
        locationId +
        ".st1"
    )
      .removeClass("st1")
      .addClass("st3");
  }

  /**
   *
   *
   *  BOTONES REDES SOCIALES
   */

  $("#block-addtoanybuttons").addClass("shareSocial");

  /**
   *
   *
   *  CONTACTO HOME
   */

  $("#block-views-block-contact-list")
    .find(".views-view-grid.horizontal.cols-2.clearfix")
    .addClass("w-100");

  /**
   *
   *
   *  BUSQUEDA GENERAL
   */

  if (window.location.href.includes("/search/node")) {
    $("#block-scrd-theme-content > h2").addClass(
      "container text-dark-800 font-weight-bold pt-5"
    );
  }
})(jQuery);
