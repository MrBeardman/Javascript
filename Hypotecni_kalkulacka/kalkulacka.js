// declare initial values
let velikostPujcky = 0;
let urok = 0;
let delkaSplatek = 0;
let frekvenceSplatek = 0;

// get final input fields
const poleMesicniSplatka = document.getElementById("monthly_payment");
const poleCelkemZaplaceno = document.getElementById("total_payment");
const poleZaplaceneUroky = document.getElementById("rate_payment");

//funkce na zaokrouhlovani
function zaokrouhlit(number) {
  let zaokrouhlit = Math.round((number + Number.EPSILON) * 100) / 100;
  return zaokrouhlit;
}
// get initial values and calculate
function calculate() {
  velikostPujcky = document.getElementById("price").value;
  urok = document.getElementById("rate").value;
  delkaSplatek = document.getElementById("length").value;
  frekvenceSplatek = document.getElementById("interval_select").value;
  console.log("velikost půjčky " + velikostPujcky);
  //get decimal from procentage
  console.log("frekvenceSplatek " + delkaSplatek);

  let urokovaMira = urok / 100;
  console.log("urokova míra " + urokovaMira);

  let miraPravidelneSplatka = urokovaMira / delkaSplatek;

  console.log("miraPravidelneSplatka " + miraPravidelneSplatka);
  let diskontiFaktor = 1 / (1 + urokovaMira);

  console.log("diskontiFaktor " + diskontiFaktor);
  let diskontiFaktorNaPocetSplatek = Math.pow(diskontiFaktor, delkaSplatek);

  console.log("diskontiFaktorNaPocetSplatek " + diskontiFaktorNaPocetSplatek);

  let rocniAnuita =
    (urokovaMira * velikostPujcky) / (1 - diskontiFaktorNaPocetSplatek);
  let intervalAnuita = rocniAnuita / frekvenceSplatek;
  let celkemZaplaceno = rocniAnuita * delkaSplatek;

  poleMesicniSplatka.setAttribute("value", zaokrouhlit(intervalAnuita));
  poleCelkemZaplaceno.setAttribute("value", zaokrouhlit(celkemZaplaceno));
  poleZaplaceneUroky.setAttribute(
    "value",
    zaokrouhlit(celkemZaplaceno - velikostPujcky)
  );
}

//troll alert
function troll() {
  let num = document.querySelector(".button").value;
  switch (num) {
    case "0":
      {
        alert("Co víc chceš počítat ?");
        num++;
        document.querySelector(".button").setAttribute("value", num);
      }
      break;
  }
}
