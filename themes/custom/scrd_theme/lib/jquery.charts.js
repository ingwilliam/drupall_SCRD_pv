(function ($, jQuery) {
  // Datos de cada gráfica
  var chartInfo = {
    1: {
      title: "Recursos asignados por entidad",
      description:
        "Nos muestra el total de recursos asignados al programa por entidad.",
      tableHead: ["Entidad", "Ofertado ($)"],
      label: "Cantidad ofertada",
      id: "table_valor_ofertado_entidad",
    },
    2: {
      title: "Recursos adjudicados por tipo de participante",
      description:
        "Nos muestra el total de recursos adjudicados a partir de los tipos de participantes de las propuestas.",
      tableHead: [
        "Tipo de participante",
        "No propuestas ganadoras",
        "Suma de monto asignado ($)",
      ],
      label: "Suma monto asignado",
      id: "table_valor_eje_tipo_participante",
    },
    3: {
      title: "Recursos adjudicados por entidad",
      description:
        "Nos muestra el total de recursos adjudicados por entidad a lo largo de la vigencia.",
      tableHead: [
        "Entidad",
        "No propuestas ganadoras",
        "Suma de monto asignado ($)",
      ],
      label: "Suma monto asignado",
      id: "table_valor_entidadeje_anio",
    },
    4: {
      title: "Recursos adjudicados por localidad",
      description:
        "Nos muestra el total de recursos adjudicados a partir de la localidad de ejecución de las propuestas.",
      tableHead: [
        "Localidad de ejecución",
        "No propuestas ganadoras",
        "Suma de monto asignado ($)",
      ],
      label: "Suma monto asignado",
      id: "table_valor_localidadeje_anio",
    },
    5: {
      title: "Recursos adjudicados por área",
      description:
        "Nos muestra el total de recursos adjudicados a partir del Área de la convocatoria.",
      tableHead: [
        "Área",
        "No propuestas ganadoras",
        "Suma de monto asignado ($)",
      ],
      label: "Suma monto asignado",
      id: "table_valor_eje_area",
    },
    6: {
      title: "Estado de convocatorias",
      description:
        "Nos muestra los estados sobre el total de convocatorias ofertadas.",
      tableHead: ["Estado de la convocatoria", "No Convocatorias"],
      label: "Número de convocatorias",
      id: "tabla_convocatoria_propuestas_anio",
    },
    7: {
      title: "Convocatorias publicadas",
      description:
        "Nos muestra el total de convocatorias ofertadas y publicadas por entidad.",
      tableHead: ["Entidad", "No Convocatorias"],
      label: "Número de convocatorias",
      id: "tabla_estados_convocatoria_anio",
    },
    8: {
      title: "Propuestas inscritas por línea estratégica",
      description:
        "Nos muestra el total de propuestas inscritas a las líneas estratégicas que reconocen y promueven los programas institucionales de fomento.",
      tableHead: ["Línea estratégica", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "table_propuestas_lineaestrategica_anio",
    },
    9: {
      title: "Propuestas inscritas por enfoque",
      description:
        "Nos muestra el total de propuestas inscritas a los enfoques incorporados a la oferta de convocatorias y que responden a la estructura Distrital de implementación de políticas.",
      tableHead: ["Enfoque", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "table_propuestas_enfoque_anio",
    },
    10: {
      title: "Propuestas inscritas por tipo de participante",
      description:
        "Nos muestra el total de propuestas inscritas por tipo de participante al programa.",
      tableHead: ["Tipo de participante", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "table_propuestas_tipoparticipante_anio",
    },
    11: {
      title: "Propuestas inscritas por localidad de ejecución",
      description:
        "Nos muestra el total de propuestas inscritas por localidad en la cual se va a ejecutar la propuesta.",
      tableHead: ["Localidad de ejecución", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "table_propuestas_localidadeje_anio",
    },
    12: {
      title: "Propuestas inscritas por entidad",
      description:
        "Nos muestra el total de propuestas inscritas a las convocatorias ofertadas por entidad.",
      tableHead: ["Entidad", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "tabla_propuestas_entidad_anio",
    },
    13: {
      title: "Propuestas inscritas por área",
      description:
        "Nos muestra el total de propuestas inscritas al conjunto de áreas que conforman el programa.",
      tableHead: ["Área", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "table_propuestas_area_anio",
    },
    14: {
      title: "Rango etario del representante",
      description:
        "Nos muestra el total de propuestas inscritas al programa por rango etario del representante.",
      tableHead: ["Rango etareo	", "No propuestas inscritas"],
      label: "Número de propuestas",
      id: "tabla_propuestas_rango_etareo_anio",
    },
  };

  var completePath = window.location.href;
  // Obtener un arreglo con cada uno de los parametros
  var params =
    completePath.indexOf("?") === -1
      ? []
      : completePath.slice(completePath.indexOf("?") + 1).split("&");

  var anio = 2021;
  var tipo_programa = 1;
  var entidad = [];
  var tipo_grafica = [];

  // Se obtienen los datos de los query params
  params.forEach(function (param) {
    paramArr = param.split("=");
    if (paramArr[0] === "anio") {
      anio = paramArr[1];
    } else if (paramArr[0] === "tipo_programa") {
      tipo_programa = paramArr[1];
    } else if (paramArr[0] === "tipo_grafica[]") {
      tipo_grafica.push(paramArr[1]);
    } else if (paramArr[0] === "entidad[]") {
      entidad.push(paramArr[1]);
    }
  });

  $.ajax({
    //Autenticación
    // la URL para la petición
    url: "/api/getDataNumbersCharts",
    data: {
      anio: anio,
      tipo_programa: tipo_programa,
      entidad: entidad,
      tipo_grafica: tipo_grafica.length > 0 ? tipo_grafica : 1,
    },
    type: "GET",
    success: function (response) {
      $("#chartsDiv div.loading").remove();
      var ctx = $("#chartsDiv");
      today = new Date();

      // Se arma la fecha de corte de la descripción
      var dateDescription =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.toString().slice(16, -37);

      // Si la petición no responde nada, mostrar esto
      if (response.data.respuesta.length === 0) {
        ctx.append(
          "<div class='d-flex flex-column align-items-center  pt-8'> \
            <img class='mb-3' src='/themes/custom/scrd_theme/images/sin-resultados.png' style='max-width: 383px; width: 100%;'></img> \
            <p class='f-20 text-dark-800 font-weight-bold' style='text-align: center;'>No se encontraron resultados</p> \
            <p class='f-16 text-dark-800' style='max-width: 344px; text-align: center;'>No podemos encontrar ninguna gráfica que coincida con tus filtros de búqueda, por favor escoge mínimo un <strong>TIPO DE PROGRAMA</strong> y una <strong>CATEGORÍA</strong>.</p> \
          </div>"
        );
      }

      // Se recorre cada gráfica que haya devuelto la petición
      Object.keys(response.data.respuesta).forEach(function (grafica, index) {
        var valuesChart = response.data.respuesta[grafica].data;
        var labels = valuesChart.map(function (data) {
          return data.label;
        });
        var data = valuesChart.map(function (data) {
          return data.total_propuestas;
        });

        idCanvas = "canvas--" + index;
        idRow = "row--" + index;

        // Si la gŕafica tiene datos
        if (valuesChart.length > 0) {
          // Se crea el div que va a ocupar la gráfica, y la tabla de la gráfica, pero sin datos todavía.
          ctx.append(
            "<div class='row mb-6' id=" +
              idRow +
              ">\
              <p class='text-primary-900 f-36 font-weight-bold mb-5 pl-3'>" +
              chartInfo[response.data.respuesta[grafica].id].title +
              "</p>\
              <div class='col-12 col-md-8'>\
                <canvas class='mb-4' id=" +
              idCanvas +
              " style='height:400px;width:100%;'>\
                </canvas>\
                <p class='text-dark-900 f-16'><strong>Descripción:</strong> " +
              chartInfo[response.data.respuesta[grafica].id].description +
              "</p> \
                <p class='text-dark-900 f-16'><strong>Fuente:</strong> SICON</p> \
                <p class='text-dark-900 f-16'><strong>Fecha de corte:</strong> " +
              dateDescription +
              "</p> \
              </div>\
              <div class='col-12 col-md-4'>\
                <table class='table'><thead><tr></tr></thead><tbody></tbody></table>\
              </div>\
            </div>"
          );

          var canvas = $("#" + idCanvas);

          // Se crea el chart
          var myChart = new Chart(canvas, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: chartInfo[response.data.respuesta[grafica].id].label,
                  data: data,
                  backgroundColor: "rgba(93, 66, 148, 0.5)",
                  borderColor: "rgba(93, 66, 148, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });

          // Se crea la tabla
          var tableBody = $("#" + idRow).find(".col-md-4 table tbody");
          var tableHead = $("#" + idRow).find(".col-md-4 table thead tr");
          for (
            var i = 0;
            i < chartInfo[response.data.respuesta[grafica].id].tableHead.length;
            i++
          ) {
            tableHead.append(
              "<th scope='col'>" +
                chartInfo[response.data.respuesta[grafica].id].tableHead[i] +
                "</th>"
            );
          }

          // Acumuladores para el total final, si es una tabla de dos columnas
          // se usa solo total, si por el contratio es de tres columnas,
          // se usan los dos acumuladores
          var total = 0;
          var totalMiddle = 0;
          valuesChart.forEach(function (rowGrafica, index) {
            tableBody.append("<tr></tr>");
            var actualTr = tableBody.find("tr").eq(index);
            Object.values(rowGrafica).forEach(function (val, indexVal) {
              if (indexVal === Object.values(rowGrafica).length - 1) {
                actualTr.append(
                  "<td class='f-14'>" +
                    new Intl.NumberFormat("es-CO").format(val) +
                    "</td>"
                );

                total = total + parseInt(val);
              } else {
                if (
                  indexVal === 1 &&
                  chartInfo[response.data.respuesta[grafica].id].tableHead
                    .length === 3
                ) {
                  totalMiddle = totalMiddle + val;
                }
                actualTr.append("<td class='f-14'>" + val + "</td>");
              }
            });
          });

          if (
            chartInfo[response.data.respuesta[grafica].id].tableHead.length ===
            3
          ) {
            tableBody.append(
              "<tr>\
              <td><strong>Total<strong></td> \
              <td><strong>" +
                new Intl.NumberFormat("es-CO").format(totalMiddle) +
                "</strong></td> \
              <td><strong>" +
                new Intl.NumberFormat("es-CO").format(total) +
                "</strong></td> \
            </tr>"
            );
          } else {
            tableBody.append(
              "<tr>\
              <td><strong>Total:<strong></td> \
              <td><strong>" +
                new Intl.NumberFormat("es-CO").format(total) +
                "</strong></td> \
            </tr>"
            );
          }
        } else {
          // si la gŕafica no tiene datos, mostrar este mensaje
          ctx.append(
            "<div class='row mb-6' id=" +
              idRow +
              ">\
              <p class='text-primary-900 f-36 font-weight-bold mb-5 pl-3'>" +
              chartInfo[response.data.respuesta[grafica].id].title +
              "</p>\
              <p class='f-16 col-12 text-dark-900'>No hay datos para mostrar, intenta cambiando el <strong>TIPO DE PROGRAMA</strong></p>"
          );
        }
      });
    },
  });
})(jQuery);
