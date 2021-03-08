(function ($, jQuery) {
  /**
   *
   *
   *  CALENDARIO
   */

  function requestCloseCalls(thisObj) {
    var dateSelected = thisObj.data("date");
    var currentDate = new Date();
    var dayDate = new Date(thisObj.data("date"));
    if (thisObj.hasClass("fc-day-today")) {
      dateSelected =
        dateSelected +
        " " +
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds();
    } else {
      dateSelected = dateSelected + " 00:00:01";
    }

    $("#calendarDiv").find("td.active-day").removeClass("active-day");
    thisObj.addClass("active-day");
    var dayDate = new Date(thisObj.data("date"));
    var dateText =
      dayDate.toLocaleDateString("es-CO", {
        month: "long",
        timeZone: "UTC",
      }) +
      " " +
      dayDate.toLocaleDateString("es-CO", {
        day: "numeric",
        timeZone: "UTC",
      });
    $("#calendarDayText").text(dateText);
    $.ajax({
      //Autenticación
      // la URL para la petición
      url: "/api/getCallsByDate",
      data: {
        fecha: dateSelected,
      },
      type: "GET",
      success: function (response) {
        if (response.data.respuesta) {
          $("div.close-announcement").remove();
          response.data.respuesta.forEach(function (convocatoria) {
            var dateText = dayDate.toLocaleDateString("es-CO", {
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            });

            $("#noResultsCloseCalls").removeClass("d-block").addClass("d-none");
            $("#callsToClose").append(
              "<div class='col-12 mt-3 p-3 close-announcement'> \
                <p class='text-primary-800 f-18 d-flex'> \
                  <span class='blue-bell'> \
                  </span> \
                  <strong>" +
                convocatoria.convocatoria +
                "</strong> \
                </p> \
                <p class='text-dark-800 f-14 d-flex'> \
                  <span class='date-icon'> \
                  </span>" +
                "Cierra el " +
                dateText +
                "</p> \
              </div>"
            );
          });
        } else {
          $("#noResultsCloseCalls").removeClass("d-none").addClass("d-block");
          $("#callsToClose div.close-announcement").remove();
        }
      },

      // complete: function () {

      // },
    });
  }

  function upcomingMaturities(date) {
    var dates = [];
    var dateFull = new Date(date);
    var month = dateFull.getMonth();
    var year = dateFull.getFullYear();
    var dateMonth = new Date(year, month + 1, 0).getDate();
    var dateParam = year + "-" + (month + 1) + "-" + dateMonth + " 00:00:01";

    $.ajax({
      //Autenticación
      // la URL para la petición
      url: "/api/getCallsByMonth",
      data: {
        fecha: dateParam,
      },
      type: "GET",
      success: function (response) {
        if (response.data.respuesta) {
          response.data.respuesta.forEach(function (convocatoria) {
            if (!dates.includes(convocatoria.fecha_cierre.slice(0, 10))) {
              dates.push(convocatoria.fecha_cierre);
              var dateObject =
                "td.fc-daygrid-day.fc-day[data-date=" +
                convocatoria.fecha_cierre.slice(0, 10) +
                "]";
              $("#calendarDiv").find(dateObject).addClass("close-call-day");
            }
          });
        }
      },
    });
  }

  $("#calendarDiv").ready(function () {
    if (window.location.href.includes("/cierre-convocatorias")) {
      var today = $(this).find(".fc-daygrid-day.fc-day.fc-day-today");
      today.addClass("active-day");
      requestCloseCalls(today);
      var date = $("#calendarDiv h2.fc-toolbar-title").text();
      upcomingMaturities(date);
    }
    $(this).find(".fc-toolbar-chunk").first().addClass("order-2");
    $(this).find(".fc-toolbar-chunk").last().addClass("order-1");
  });

  $("#calendarDiv").on("click", "td.fc-day", function () {
    requestCloseCalls($(this));
  });

  $("#calendarDiv").on(
    "click",
    "button.fc-prev-button, button.fc-next-button",
    function () {
      var date = $("#calendarDiv h2.fc-toolbar-title").text();
      upcomingMaturities(date);
    }
  );
})(jQuery);
