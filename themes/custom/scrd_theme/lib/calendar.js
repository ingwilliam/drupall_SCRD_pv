document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendarDiv");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
  });
  calendar.render();
});
