/**
 * Retorna una cadena de redireccion de acuerdo a un parametro y un valor,
 * reemplazando el parametro existente o eliminandolo si el valor es cero
 */

// paramName: nombre del query param
// value: valor del query param
// unique: booleano que indica si el filtro es único (por ejemplo los filtros de checkboxes son multivalor, por lo que sería false)
function stringRedirection(paramName, value, unique) {
  // url completa
  var completePath = window.location.href;
  // obtener un arreglo con cada uno de los parametros
  var params =
    completePath.indexOf("?") === -1
      ? []
      : completePath.slice(completePath.indexOf("?") + 1).split("&");

  // variable para verificar la presencia del param
  var noParamPresent = true;
  // verifica si existe el param (lo cambia mientras su valor sea diferente a "0", de lo contrario lo elimina)

  if (unique) {
    for (var i = 0; i < params.length; i++) {
      if (params[i].indexOf(paramName) !== -1) {
        noParamPresent = false;
        if (value !== "0") {
          params[i] = paramName + "=" + value;
        } else {
          params.splice(i, 1);
          continue; // si se elimina, el if de abajo no encuentra params[i]
        }
      }

      if (params[i].indexOf("page") !== -1) {
        params.splice(i, 1);
      }
    }
  } else {
    var completeParam = paramName + "=" + value;
    if (params.includes(completeParam)) {
      var index = params.indexOf(completeParam);
      params.splice(index, 1);
      noParamPresent = false;
    }
    for (var i = 0; i < params.length; i++) {
      if (params[i].indexOf("page") !== -1) {
        params.splice(i, 1);
      }
    }
  }

  // crea el param si no existe y su valor es diferente a "0"
  if (noParamPresent && value !== "0") {
    params.push(paramName + "=" + value);
  }

  return window.location.pathname + "?" + params.join("&");
}

(function ($, jQuery) {
  /**
   *
   *
   *
   * ORDENAR POR AÑO
   */
  $("#yearSelect").change(function () {
    window.location.href = stringRedirection("year", $(this).val(), true);
  });

  $("#yearSelectChart").change(function () {
    window.location.href = stringRedirection("anio", $(this).val(), true);
  });

  /**
   *
   *
   *
   * ORDENAR POR MES
   */
  $("#monthSelect").change(function () {
    window.location.href = stringRedirection("month", $(this).val(), true);
  });

  /**
   *
   *
   *
   * ORDENAR POR FECHA
   */
  $("#dateSelect, #Date--sort-by-date").change(function () {
    window.location.href = stringRedirection("sort_order", $(this).val(), true);
  });

  /**
   *
   *
   *
   * FILTRAR POR ENTIDAD
   */

  $("#entitySelect div.container__checkbox").click(function () {
    window.location.href = stringRedirection(
      "field_entity_value[]",
      $(this).attr("id"),
      false
    );
  });

  $("#entities-tabs li.nav-item").click(function () {
    var id = $(this).attr("id").split("--");
    var paramName = id[0] + "[]";
    var idParam = id[1];
    if (idParam !== "todas") {
      window.location.href = stringRedirection(paramName, idParam, true);
    } else {
      var completePath = window.location.href;
      var params =
        completePath.indexOf("?") === -1
          ? []
          : completePath.slice(completePath.indexOf("?") + 1).split("&");

      for (var i = 0; i < params.length; i++) {
        if (params[i].split("[]")[0] === "entidad") {
          params.splice(i, 1);
          break;
        }
      }
      window.location.href = window.location.pathname + "?" + params.join("&");
    }
  });
  /**
   *
   *
   *
   * FILTRAR POR LOCALIDAD
   */

  $("#locationSelect div.container__checkbox").click(function () {
    var location = $(this).attr("id").split("--")[1];
    window.location.href = stringRedirection(
      "field_locations_target_id[]",
      location,
      false
    );
  });

  /**
   *
   *
   *
   * FILTRAR POR LOCALIDAD SVG
   */

  $("#views-view-exprience-seeker #locationSelectSvg polygon").click(
    function () {
      var location = $(this).attr("id").split("--")[1];
      window.location.href = stringRedirection(
        "field_locations_target_id[]",
        location,
        false
      );
    }
  );

  $("#views-view-exprience-seeker #locationSelectSvg path").click(function () {
    var location = $(this).attr("id").split("--")[1];
    window.location.href = stringRedirection(
      "field_locations_target_id[]",
      location,
      false
    );
  });

  /**
   *
   *
   *
   * FILTRAR POR NOMBRE
   */

  $("#titleSearch a.search-call").click(function () {
    window.location.href = stringRedirection(
      "title",
      $("#titleSearch").find("input").val(),
      true
    );
  });

  /**
   *
   *
   *
   * FILTRAR POR PROGRAMA
   */

  $("#programSelect div.container__checkbox").click(function () {
    window.location.href = stringRedirection(
      "field_program_type_value[]",
      $(this).attr("id"),
      false
    );
  });

  $("#programSelectChart div.container__radio").click(function () {
    var id = $(this).attr("id").split("--");
    var paramName = id[0];
    var idParam = id[1];
    window.location.href = stringRedirection(paramName, idParam, true);
  });

  /**
   *
   *
   *
   * TAGS FILTROS
   */

  // obtiene la url actual
  var completePath = window.location.href;
  // obtener un arreglo con cada uno de los parametros
  var params =
    completePath.indexOf("?") === -1
      ? []
      : completePath.slice(completePath.indexOf("?") + 1).split("&");

  // obtiene el div donde van a ir los tags
  var divTags = $("#tagsFilters");

  for (var i = 0; i < params.length; i++) {
    var textTag;

    if (
      params[i] &&
      params[i].indexOf("page") === -1 &&
      params[i].indexOf("sort_order") === -1
    ) {
      var parAttr = params[i].split("="); // separa el parametro en una arreglo del tipo [parametro, valor]

      // se mira si el query params pertenece a un selector, es decir:
      // si el nombre del parámetro no tiene "[]" (ya que eso significa que no es multivalor)
      // y se mira también si no es el parámetro title
      if (!parAttr[0].includes("[]") && parAttr[0] !== "title") {
        // revisa que option tiene el value del query param
        textTag = $("option[value=" + parAttr[1] + "]").val();
      } else if (parAttr[0].includes("[]")) {
        if (parAttr[0] === "field_locations_target_id[]") {
          textTag = $("#locationSelect--" + parAttr[1]).text();
        } else {
          textTag = $("#" + parAttr[1]).text();
        }
      } else if (parAttr[0] === "title" && parAttr[1] && parAttr[1] !== "%20") {
        textTag = $("#titleSearch").find("input").val();
      }

      if (textTag) {
        divTags.append(
          "<div class='filter-tag radius-5 bg-dark-200 mb-1 px-2'><p class='f-14 text-dark-700 mb-0'>" +
            textTag +
            "<span class='close-icon' id=" +
            params[i] +
            "></span></p></div>"
        );
      }
    }
  }

  /**
   *
   *
   *
   * LIMPIAR FILTROS
   */

  // cuando se quita el tag, quitar el query param
  $("div.filter-tag span.close-icon").click(function () {
    var index = params.indexOf($(this).attr("id"));
    params.splice(index, 1);
    window.location.href = window.location.pathname + "?" + params.join("&");
  });

  // quitar todos los filtros
  $("#cleanFilters").click(function () {
    var pathWithoutFilters = window.location.href.split("?");
    window.location.href = pathWithoutFilters[0];
  });

  /**
   *
   *
   *
   * FILTROS TIPO DE GRAFICA
   */

  // checkear los checkboxes dentro del collapse si se checkea el checkbox padre

  $(
    "#resources--Checkbox, #proposals--Checkbox, #announcements--Checkbox, #population--Checkbox"
  )
    .find("input")
    .click(function () {
      var labelId = $(this).closest("label").attr("id");
      var collapseId = labelId.split("--")[0] + "--Collapse";
      var completePath = window.location.href;
      var params =
        completePath.indexOf("?") === -1
          ? []
          : completePath.slice(completePath.indexOf("?") + 1).split("&");

      var inputElem = "#" + labelId + " input";
      var collapseElem = "#" + collapseId + " label.container__checkbox";

      // console.log(inputElem);

      if ($(inputElem).prop("checked")) {
        $(collapseElem).each(function () {
          var id = $(this).attr("id").split("--");
          var element = id[0] + "[]=" + id[1];
          if (params.indexOf(element) === -1) {
            params.push(id[0] + "[]=" + id[1]);
          }
        });
      } else {
        $(collapseElem).each(function () {
          var id = $(this).attr("id").split("--");
          var index = params.indexOf(id[0] + "[]=" + id[1]);
          params.splice(index, 1);
          // console.log(element, index, params);
        });
      }

      window.location.href = window.location.pathname + "?" + params.join("&");
    });

  $(
    "#resources--Collapse, #proposals--Collapse, #population--Collapse, #announcements--Collapse"
  )
    .find("label.container__checkbox")
    .click(function () {
      var id = $(this).attr("id").split("--");
      var paramName = id[0] + "[]";
      var idParam = id[1];
      window.location.href = stringRedirection(paramName, idParam, false);
    });
})(jQuery);
