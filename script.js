'use strict';

const baseUrl= "https://www.thecocktaildb.com/api/json/v1/1/";

//generate welcome page
// function generateWelcomePage(){
//   return `
//   <section class="welcome-page">
//     <div class="start-screen">
//     <form class="js-enter">
//      <h2>Be Your Own Bartender</h2>
//       <p>Find a Drink Recipe</p>
//     <div class="button-container">
//       <button type="submit">Show Me The Drinks</button>
//     </div>
//     </form>
//   </section>
//   `
// }

//generate search page
function generateSearchPage(){
  console.log('generate search page is running');
  $('main').html(`<form class="js-form">
        <h2>Search for Drink Recipes By Ingredient</h2>
        <input type="text" class="booze-input" placeholder="Vodka" required>
        </br>
        <div class="buttons">
          <input type="submit" class="js-find-drinks" value="Find Drinks!">
        </div>
      </form>
      <form class="js-random-form">
        <h3>Find a Random Drink</h3>
        <div class="buttons">
          <input type="button" id="js-random-button" class="js-random-button" value="Random Drink">
        </div>
      </form>
    </section>`);
}

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
  .then(responseJson => displayRandomCocktail(responseJson))
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });
}

function displayRandomCocktail(responseJson){  
  $('.results').empty();
   
  for (let i = 0; i < responseJson.drinks.length; i++){
    $('.results').append(`
    <div class="drink-thumb">
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo">
    </div>  
      `);
       
  }
}

//generate display for search by boozeInput
function displaySearchedCocktail(responseJson){
    $('.results').empty();
   

  for (let i = 0; i < responseJson.drinks.length; i++){
    $('.results').append(`
    <div class="drink-thumb">
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo">
    </div>  
      `);
       
  }
}

//generate's list of cocktails containing specified ingredient & corresponding image
function getCocktailList(boozeInput){
  
  const urlSpecified = baseUrl + 'filter.php?i=' + boozeInput;
  console.log(urlSpecified)

  fetch(urlSpecified)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })  
  .then(responseJson => displaySearchedCocktail(responseJson))
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });
}




//handles the random drink button
function handleRandomDrinkButton(){
  console.log ('randomDrinkButton is working');
  $('.js-random-button').on('click', event => {
    console.log('random drink button clicked')
    getRandomCocktail();
  })
}

//handles the find a drink button
function handleFindDrinkButton(){
  console.log('findDrinkButton is working');
    $('.js-form').submit(event => {
      event.preventDefault();
      console.log('find drink recipe clicked');
      const boozeInput = $('.booze-input').val();
      getCocktailList(boozeInput);
    })
  }

// function handleEnterButton(){
//   console.log('handleEnterButton is working');
//   $('.js-enter').submit(event => {
//     console.log('enter button clicked')
//     generateSearchPage();    
//   })
// }

function handleCocktailApp(){
    generateSearchPage();
    handleRandomDrinkButton();
    handleFindDrinkButton();
}

handleCocktailApp();