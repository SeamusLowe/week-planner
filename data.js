// =====================================================================
//  Week Planner data
//  Edit this file to add, change or remove events and to-dos,
//  then refresh the page (F5).
//
//  EVENTS
//    date      "YYYY-MM-DD" (for repeating events: the first date)
//    start     "HH:MM" (24-hour clock)
//    duration  length in minutes (e.g. 90 = 1h 30m)
//    title     what it is
//    location  optional
//    color     optional: "blue", "green", "orange", "pink", "purple", "teal"
//    repeat    optional: "weekly" or "daily"
//    until     optional, with repeat: last possible date "YYYY-MM-DD"
//              (leave out to repeat for one year)
//
//  TO-DOS
//    text      what needs doing
//    done      true or false
//    due       optional "YYYY-MM-DD"
//
//  Keep the commas between items, and the quotes around text.
// =====================================================================

window.PLANNER_DATA = {
  events: [
    { date: "2026-10-26", start: "12:30", duration: 30,  title: "Meeting with Antoine", color: "blue",   repeat: "weekly", until: "2026-12-20" },
    { date: "2026-10-26", start: "19:00", duration: 60,  title: "Precept TA",           color: "purple", repeat: "weekly", until: "2026-12-20" },
    { date: "2026-10-27", start: "13:00", duration: 60,  title: "Meeting with Jason",   color: "teal" },
  ],

  todos: [
    { text: "Pack for move",                  done: false, due: "2026-11-02" },
    { text: "Buy flights for Christmas",      done: false },
  ],
};
