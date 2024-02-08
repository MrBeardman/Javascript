$(document).ajaxComplete(function () {
  var dataLayer = window.dataLayer || [];
  if (dataLayer[0].shoptet.pageType === "productDetail") {
    var favouriteDiv = document.getElementById("dkLabFavouriteDiv").innerHTML;
    var listIcons = document.querySelector(".link-icons");
    var shareIcon = document.querySelector(".link-icon share");
    var favouriteIcon = `<a href="#" id="dkLabFavouriteDiv" class="link-icon favourite" title="Sdílet produkt"><span>Přidat do oblýbených</span></a>`;
    if (shareIcon) {
      shareIcon.insertAdjacentHTML("afterend", favouriteIcon);
    }

    console.log(`favourite Div ${favouriteDiv}`);
  }
});
