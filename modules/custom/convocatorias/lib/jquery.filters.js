/**
 * Retorna una cadena de redireccion de acuerdo a un parametro y un valor,
 * reemplazando el parametro existente o eliminandolo si el valor es cero
 */

// paramName: nombre del query param
// value: valor del query param
// unique: booleano que indica si el filtro es único (por ejemplo los filtros de checkboxes son multivalor, por lo que sería false)
function stringRedirectionCalls(paramName, value, unique) {
  var completePath = window.location.href; // url completa
  var params =
    completePath.indexOf("?") === -1
      ? []
      : completePath.slice(completePath.indexOf("?") + 1).split("&"); // obtener un arreglo con cada uno de los parametros

  var noParamPresent = true; // variable para verificar la presencia del param
  var completeParam = paramName + "=" + value; // verifica si existe el param (lo cambia mientras su valor sea diferente a "0", de lo contrario lo elimina)

  if (unique) {
    for (var i = 0; i < params.length; i++) {
      if (params[i].indexOf(paramName) !== -1) {
        noParamPresent = false;
        if (value !== "0") {
          params[i] = completeParam;
        } else {
          params.splice(i, 1);
        }
      } else if (params[i].indexOf("pagina") !== -1) {
        // se elimina siempre el param "page" al cambiar el filtro
        params.splice(i, 1);
      }
    }
  } else {
    // Si se envia el parametro y no esta, se agrega.
    // Si se envia el parametro y ya esta se borra (checkbox)
    if (params.includes(completeParam)) {
      var index = params.indexOf(completeParam);
      params.splice(index, 1);
      noParamPresent = false;
    }
    for (var i = 0; i < params.length; i++) {
      if (params[i].indexOf("pagina") !== -1) {
        params.splice(i, 1);
      }
    }
  }

  // crea el param si no existe y su valor es diferente a "0"
  if (noParamPresent && value !== "0") {
    params.push(completeParam);
  }

  return (params.length > 0 ? "?" : "") + params.join("&");
}

(function ($, jQuery) {
  /**
   *
   *
   *
   * Parametro de display a cajas
   */
  $("#SquareDisplay").click(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("display", "short", true);
  });

  /**
   *
   *
   *
   * Parametro de display a filas
   */
  $("#RowsDisplay").click(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname + stringRedirectionCalls("display", "0", true);
  });

  /**
   *
   *
   *
   * BARRA DE BUSQUEDA DE CONVOCATORIAS RECIENTES
   */
  $("#search-recent-call-bar").submit(function (e) {
    e.preventDefault();
    if ($("#text-name-call").val() !== "") {
      window.location.href =
        window.location.href +
        "/convocatorias" +
        stringRedirectionCalls(
          "nombre",
          $("#text-name-recent-call").val(),
          true
        );
    }
  });

  /**
   *
   *
   *
   * BARRA DE BUSQUEDA DE CONVOCATORIAS
   */
  $("#search-call-bar").submit(function (e) {
    e.preventDefault();
    if ($("#text-name-call").val() !== "") {
      window.location.href =
        window.location.pathname +
        stringRedirectionCalls("nombre", $("#text-name-call").val(), true);
    }
  });

  /**
   *
   *
   *
   * Ordenar por año
   */
  $("#callYearSelect").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("anio", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por fecha desktop
   */
  $("#callOrderDateSelect1").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("orden_fecha", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por fecha responsive
   */
  $("#callOrderDateSelect2").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("orden_fecha", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por entidad
   */
  $("#entitesGroup input[type='checkbox']").change(function () {
    var value = this.id.split("-")[1];
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("entidad[]", value, false);
  });

  /**
   *
   *
   *
   * Ordenar por estado
   */
  $("#stateGroup input[type='checkbox']").change(function () {
    var value = this.id.split("-")[1];
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("estado[]", value, false);
  });

  /**
   *
   *
   *
   * Ordenar por perfil
   */
  $("#profileGroup input[type='checkbox']").change(function () {
    var value = this.id.split("-")[1];
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("perfil[]", value, false);
  });

  /**
   *
   *
   *
   * Ordenar por area
   */
  $("#callAreaSelect").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("area", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por enfoque
   */
  $("#callApproachSelect").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("enfoque", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por linea estrategica
   */
  $("#callStrategicLineSelect").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("linea_estrategica", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por modalidad
   */
  $("#callModalityLineSelect").change(function (e) {
    e.preventDefault();
    window.location.href =
      window.location.pathname +
      stringRedirectionCalls("modalidad", $(this).val(), true);
  });

  /**
   *
   *
   *
   * Ordenar por modalidad
   */
  $("#tagCallsGroup span").click(function (e) {
    switch ($(this).data("param")) {
      case "anio":
        window.location.href =
          window.location.pathname + stringRedirectionCalls("anio", "0", true);
        break;
      case "entidad":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("entidad[]", $(this).data("id"), false);
        break;
      case "area":
        window.location.href =
          window.location.pathname + stringRedirectionCalls("area", "0", true);
        break;
      case "linea_estrategica":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("linea_estrategica", "0", true);
        break;
      case "enfoque":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("enfoque", "0", true);
        break;
      case "modalidad":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("modalidad", "0", true);
        break;
      case "estado":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("estado[]", $(this).data("id"), false);
        break;
      case "perfil":
        window.location.href =
          window.location.pathname +
          stringRedirectionCalls("perfil[]", $(this).data("id"), false);
        break;
      default:
        break;
    }
  });
})(jQuery);
