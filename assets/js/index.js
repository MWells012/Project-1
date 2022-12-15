//query selector variables
var searchBtn = document.querySelector('#searchButton');
var modal = document.querySelector('#modalBox');
var modalCloseBtn = document.querySelector('#modalClose');
var searchField = document.querySelector('#searchBar');

var exchangeRate = 0

onePrice();

//Search button functionality
searchBtn.addEventListener('click', function() {

    var searchInput = $('#searchBar').val().trim();
    var usdCheck = $('usdCheck');
    var eurCheck = $('eurCheck');

    //check for appropriate input fire warning modal if not.
    if (searchInput === '' || searchInput === undefined) {

        event.preventDefault();
        modal.classList.add('is-active');

    } else {

        event.preventDefault();
        //correct string format for scryfall api
        searchInput = searchInput.replace(/\s/g, '+');

        //pass search info to local storage
        localStorage.setItem('indexSearch', searchInput);
        localStorage.setItem('indexUsdCheck', usdCheck);
        localStorage.setItem('indexEurCheck', eurCheck);
        //test storage
        console.log(localStorage.getItem('indexSearch', searchInput));


        //link to pricing page
        window.location.replace('./assets/html/Pricing.html');

    }
    
});

function onePrice(){

  if (exchangeRate === 0){
  var myHeaders = new Headers();
  myHeaders.append("apikey", "rOwRbB3RBQuPN114biA4gCi5Nru0kSw8");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch("https://api.apilayer.com/currency_data/live?source=USD&currencies=EUR", requestOptions)
    .then((response) => response.json())
    .then((data) => {
    exchangeRate = data.quotes.USDEUR

    localStorage.setItem('Exchange', exchangeRate)
    })}
  
}


// modal close button functionality
modalCloseBtn.addEventListener('click', function() {

    modal.classList.remove('is-active');

});

//Card name Suggestions
function cardNameSuggestions() {
    //Stores API URL
    var cardName = encodeURI(`https://api.scryfall.com/catalog/card-names`);
  
    fetch(cardName, {

      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      cache: 'reload'  // Refresh the cache

    })

      .then(response => {

        return response.json();

      })

      .then(data => {
        
        //Stores the data to be used later on
       cardNamesAuto = data.data

       $('#searchBar').autocomplete({

        maxResults: 10,
        source: function(request, response) {

          var results = $.ui.autocomplete.filter(cardNamesAuto, request.term);
  
          response(results.slice(0, 10));

        }

       });
  
      })
      
    return;

}

var today = (moment().format("MMMM D, YYYY"))
$("#date").text(today);

searchField.addEventListener('click', cardNameSuggestions());
