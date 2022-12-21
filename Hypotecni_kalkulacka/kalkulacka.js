//* show values already calculated
window.onload = calculate;
// *get final input fields
const poleMesicniSplatka = document.getElementById("monthly_payment");
const poleCelkemZaplaceno = document.getElementById("total_payment");
const poleZaplaceneUroky = document.getElementById("rate_payment");

// *function for rounding numbers
function zaokrouhlit(number) {
  let zaokrouhlit = Math.round((number + Number.EPSILON) * 100) / 100;
  return zaokrouhlit;
}

// *get initial values and calculate
function calculate() {

  //*remove all rows if exists
  let splatkovyKalendar = document.querySelector(".splatkovy_kalendar");
  if(splatkovyKalendar.querySelectorAll("tr:not(:first-child)")){
    let tableRows = splatkovyKalendar.querySelectorAll("tr:not(:first-child)");
    tableRows.forEach(tr => tr.remove());
  }
//* link elements
  let velikostPujcky = document.getElementById("price").value;
  let urok = document.getElementById("rate").value;
  let dobaSplatnosti = document.getElementById("length").value;
  let pocetSplatek = document.getElementById("interval_select").value;

  //* kalkulovat úrokovou míru
  let urokovaMira = urok / 100 / pocetSplatek;

   //* kalkulovat pravidelnou splátku
  let miraPravidelneSplatka = urokovaMira / dobaSplatnosti;

  //*kalkulovat diskotní faktor
  let diskontiFaktor = 1 / (1 + urokovaMira);

  //*kalkulovat diskotní faktor na počet splátek
  let diskontiFaktorNaPocetSplatek = Math.pow(diskontiFaktor, dobaSplatnosti);

//*kalkulovat roční anuitu
  let rocniAnuita =
    (urokovaMira * velikostPujcky) / (1 - diskontiFaktorNaPocetSplatek);

    //*kalkulovat interval Anuity
  let intervalAnuita = rocniAnuita / pocetSplatek;

  //*kalkulovat celkem zaplaceno
  let celkemSplatek = dobaSplatnosti * pocetSplatek;
 //*kalkulovat splátku
  let splatka = (urokovaMira * velikostPujcky) / (1- Math.pow(diskontiFaktor, celkemSplatek))
 //*kalkulovat úroyk celkem
  let celkemUrok = (splatka * celkemSplatek) - velikostPujcky;
   //*kalkulovat celkem zaplaceno
  let celkemZaplaceno =  splatka * celkemSplatek;
  //* set values to fields
  poleMesicniSplatka.setAttribute("value", zaokrouhlit(splatka));
  poleCelkemZaplaceno.setAttribute("value", zaokrouhlit(celkemZaplaceno));
  poleZaplaceneUroky.setAttribute(
    "value",
    zaokrouhlit(celkemUrok)
  );
  // * define initial stav dluhu
    let stavDluhu = velikostPujcky;
    //* iterate over how many payments the clietn will make
  for (let index = 1; index <= celkemSplatek; index++) {

    //*define single payment and calculate it
      let splatka =
      (urokovaMira * velikostPujcky) /
      (1 - Math.pow(diskontiFaktor, celkemSplatek));

    let splatkaRound = zaokrouhlit(splatka);
    let urokKalendar = stavDluhu * urokovaMira;
    let umorPredchozi = splatka - urokKalendar;
    stavDluhu -= umorPredchozi
    //addRows(splatkaRound,urok,umor,stavDluhu);
    let row = document.createElement('tr');
    for (let i = 1; i <= 5; i++) {
      let data = row.appendChild(document.createElement('td'));
      if (i === 1) data.innerHTML = [index];
      if (i === 2) data.innerHTML = splatkaRound;
      if (i === 3) data.innerHTML = zaokrouhlit(urokKalendar);
      if (i === 4) data.innerHTML = zaokrouhlit(umorPredchozi);
      if (i === 5) data.innerHTML =  zaokrouhlit(stavDluhu)
    }

    splatkovyKalendar.appendChild(row);
}
}
// scroll button
function scrollDown(className) {
  // Get the element to scroll to
  var element = document.querySelector('.'+className);
  //Get Header
  var header = document.querySelector(".header");
  // Calculate the scroll position
  var elementPosition = (element.offsetTop - header.offsetHeight) - 25; //substracting 25 so its not sitting right on the navbar
  // Smoothly scroll to the element
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
}

//PRELOADER
const preloader = document.querySelector('#preloader');
let fadeEffect = setInterval(() => {
  // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we   // check it
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    clearInterval(fadeEffect);
    preloader.remove()
  }
}, 10);

//function for showing and hiding flot button
function showHideButton() {
  // Get the position of the target element
  var targetPosition = document.getElementById("splatkovy_kalendar").offsetTop;

  // Get the current scroll position of the webpage
  var currentPosition = window.scrollY;

  // Show the button if the target element is in view
  if (currentPosition > targetPosition) {
    document.getElementById("float_button").style.display = "block";
  }
  // Hide the button if the target element is not in view
  else {
    document.getElementById("float_button").style.display = "none";
  }
}
 // Attach the scroll event to the window object
 window.addEventListener("scroll", showHideButton);
 
//Attach the load event with fade preloader
window.addEventListener('load', fadeEffect);

