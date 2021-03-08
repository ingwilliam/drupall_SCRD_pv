(function ($, jQuery) {
  /**
   *
   *
   *
   * BOTON VOLVER
   */
  $("#goBack").click(function () {
    window.history.back();
  });

  /**
   *
   *
   *  PDF EMBEBIDO EN LOS MANUALES
   */

  var links = $(".pdf-link span a");
  var viewers = $(".pdf-viewer");
  var j = 0;
  for (j = 0; j < links.length; j++) {
    const link = links[j].href;
    viewers[j].innerHTML +=
      '<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=' +
      link +
      '" width="100%" height="600">';
  }

  /**
   *
   *
   *  LEER MÁS
   */

  var showChar = 365;
  var ellipsestext = "...";

  var content = $(".see-more p").text();

  if (content.length > showChar) {
    var contentTrimmed = content.substr(0, showChar);
    $("#trimmedText").text(contentTrimmed + ellipsestext);
  }

  $(".see-more__link").on("click", function () {
    if ($(this).text() === "Leer menos") {
      $("#trimmedText").text(contentTrimmed + ellipsestext);
      $(this).text("Leer más");
    } else {
      $("#trimmedText").text(content);
      $(this).text("Leer menos");
    }
    $(".experiences-header__image img").css(
      "height",
      $(".experiences-header__right").css("height")
    );
  });

  $(window).resize(function () {
    $(".experiences-header__image img").css(
      "height",
      $(".experiences-header__right").css("height")
    );
  });

  /**
   *
   *
   *  MENU
   */

  if ($("#filtersResponsiveButtons").css("display") !== "none") {
    $("#filtersDiv").addClass("sidenav");
  } else {
    $("#filtersDiv").removeClass("sidenav");
  }

  $("#filtersButton").click(function () {
    $("#filtersDiv").css("width", "300px");
    $("#filtersDiv").css("padding", "35px 24px");
    $("#filtersDiv").css("border", "1px solid #7C5CBC");
  });

  $("#filtersButtonClose").click(function () {
    $("#filtersDiv").css("width", "0px");
    $("#filtersDiv").css("padding", "35px 0px");
    $("#filtersDiv").css("border", "none");
  });

  /**
   *
   *
   *  MENU LATERAL PREGUNTAS FRECUENTES
   */

  //Añadir el boton responsive
  $(
    "#views-bootstrap-tab-views-bootstrap-questions-block-1 .tab-content.col-12.offset-lg-1.col-lg-8"
  ).prepend(
    '<div class="d-flex d-lg-none justify-content-center"><span id="openSideMenuQuestions" class="text-center d-block px-3 py-1 radius-5 border-primary-500 filter-icon--after font-weight-bold f-18 mb-5" style="border: 2px solid">PREGUNTAS</span></div>'
  );
  $(
    "#views-bootstrap-tab-views-bootstrap-questions-block-1 ul.nav.nav-tabs"
  ).prepend(
    '<div class="d-flex justify-content-between py-5 px-3 p-lg-0"><h2 class="text-primary-700 font-weight-semibold f-16 text-uppercase d-lg-none">Preguntas</h2><span id="closeSideMenuQuestions" class="close-cross d-lg-none"></span></div>'
  );
  $("#openSideMenuQuestions").click(function () {
    $("#sideMenuQuestions").css("width", "300px");
  });
  $("#closeSideMenuQuestions").click(function () {
    $("#sideMenuQuestions").css("width", "");
  });
  $(
    "#views-bootstrap-tab-views-bootstrap-questions-block-1 ul.nav.nav-tabs li a"
  ).click(function () {
    $("#sideMenuQuestions").css("width", "");
  });

  /**
   *
   *
   *  MENU LATERAL MANUALES
   */

  //Añadir el boton responsive
  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 .tab-content.col-12.offset-lg-1.col-lg-8"
  ).prepend(
    '<div class="d-flex d-lg-none justify-content-center"><span id="openSideMenuManuals" class="text-center d-block px-3 py-1 radius-5 border-primary-500 filter-icon--after font-weight-bold f-18 mb-5" style="border: 2px solid">MANUALES</span></div>'
  );
  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 ul.nav.nav-tabs"
  ).prepend(
    '<div class="d-flex justify-content-between py-5 px-3 p-lg-0"><h2 class="text-primary-700 font-weight-semibold f-16 text-uppercase d-lg-none">Manuales</h2><span id="closeSideMenuManuals" class="close-cross d-lg-none"></span></div>'
  );
  $("#openSideMenuManuals").click(function () {
    $("#sideMenuManuals").css("width", "300px");
  });
  $("#closeSideMenuManuals").click(function () {
    $("#sideMenuManuals").css("width", "");
  });
  $(
    "#views-bootstrap-tab-views-bootstrap-documents-and-manuals-block-1 ul.nav.nav-tabs li a"
  ).click(function () {
    $("#sideMenuManuals").css("width", "");
  });

  /**
   *
   *
   *  SUBMIT DE LA BUSQUEDA
   */
  $("#search-bar").submit(function (e) {
    e.preventDefault();
    window.location.href =
      "/search/node?keys=" +
      $("input.search-input").val() +
      "&f%5B0%5D=type%3Aevent&f%5B1%5D=type%3Aexperience&f%5B2%5D=type%3Anoticia&f%5B3%5D=type%3Apage&advanced-form=1";
  });
})(jQuery);
