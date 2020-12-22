'use strict';

const baseUrl= "https://www.thecocktaildb.com/api/json/v1/1/";

//generate's a random drink w/ photo and instructions
function getRandomCocktail(){
  const urlRandom = baseUrl + 'random.php'

  fetch(urlRandom)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })  
  .then(responseJson => console.log(responseJson))
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });
}

function displayRandomCocktail(){  
  $('main').html(
    `<h3>${responseJson.drinks.strDrink}</h3>`
  )

}

//generate's list of cocktails containing specified ingredient
function getCocktailList(boozeInput){
  
  //
}

//handles the random drink button
function randomDrinkButton(){
  console.log ('randomDrinkButton is working');
  $('.js-random-button').on('click', event => {
    console.log('random drink button clicked')
    getRandomCocktail();
  })
}

//handles the find a drink button
function findDrinkButton(){
  console.log('findDrinkButton is working');
    $('.js-form').submit(event => {
      event.preventDefault();
      console.log('find drink recipe clicked');
      const boozeInput = $('booze-input').val();
      getCocktailList(boozeInput);
    })
  }

$(randomDrinkButton);
$(findDrinkButton);