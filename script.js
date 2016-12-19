(function() {
  document.querySelector("#img").src = src[Math.floor(Math.random() * src.length)]
})()

// updateClock by tayumpee
function updateClock() {
  var days = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  var months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  var date = new Date();
  var dateString =
    (days[date.getDay()]) + " " +
    ("0" + date.getDate()).slice(-2) + " DE " +
    (months[date.getMonth()]) + " DE " +
    date.getFullYear() +" "+
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
  
  document.getElementById("time").innerHTML = dateString;
  setTimeout(updateClock, 1000);
}
updateClock();

document.getElementById("form").onsubmit = function() {
  var search = document.getElementById("search");
  var query  = search.value;
  if (query.charAt(0) != "-" || query.charAt(2) != " ") {
    this.setAttribute("action", "https://www.google.com.mx/search?q=search");
    return true;
  }
  var command = query.charAt(1);
      query   = query.substring(3, query.length);
  if (command == "c") {
    window.location.assign("https://" + query + ".com/");
    return false;
  }
  if (command == "u") {
    window.location.assign("https://" + query);
    return false;
  }
  if (command == "h") {
    window.location.assign("http://" + query);
    return false;
  }
  if (command == "4") {
    window.location.assign("https://boards.4chan.org/" + query);
    return false;
  }
  if (command == "3") {
    query += " site:http://www.w3schools.com/";
    this.setAttribute("action", "https://www.google.com.mx/search?q=search");
    search.value = query;
    return true;
  }
  if (command == "g") {
    this.setAttribute("action", "https://www.google.com.mx/search?q=search");
    search.value = query;
    return true;
  }
  alert("command not found");
  return false;
};