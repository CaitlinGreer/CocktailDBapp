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
        <input type="text" class="booze-input" placeholder="ex: Vodka" required>
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

////////random cocktail section////////


//fetch call for the url for random cocktail search
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

//generates the display for the random cocktail search
function displayRandomCocktail(responseJson){  
  $('.results').empty();
  
  for (let i = 0; i < responseJson.drinks.length; i++){
    $('.results').append(`
    <div class="drink-display">
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo">
      <p>${responseJson.drinks[i].strInstructions}</p>
      <p>${getIngredients(responseJson)}</p>
      </div>  
      `);
      }
    }

// finds the Ingredients and Measurements and sets the template for them to be displayed
 function getIngredients(responseJson) {
      let ingredients = [];
      for (let i = 0; i < responseJson.drinks.length; i++){
      for(let j = 1; j < 16; j++) {
        const ingredientMeasure = {};
        if (responseJson.drinks[i][`strIngredient${j}`] == null || responseJson.drinks[i][`strMeasure${j}`] == null){
          delete responseJson.drinks[i][`strIngredient${j}`];
        }
          else if (responseJson.drinks[i][`strIngredient${j}`] !== '' ) {
                ingredientMeasure.ingredient = responseJson.drinks[i][`strIngredient${j}`];
                ingredientMeasure.measure = responseJson.drinks[i][`strMeasure${j}`];
                ingredients.push(ingredientMeasure);
           } 
      }
           console.log(ingredients)
}
// Build the template for measurements/ingredients
      let ingredientsTemplate = '';
      ingredients.forEach(ingredient => {
        ingredientsTemplate += `
          <li class="ingredient-list">${ingredient.measure} ${ingredient.ingredient}</li>
          `;
      });
      
      return ingredientsTemplate;
  }


///////search by ingredient section/////////

  //fetch call for drink containing specified ingredient (only displays drink name and img and id)
function getCocktailList(boozeInput){
  
  const urlSpecified = baseUrl + 'filter.php?i=' + boozeInput;
  
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

//fetch call for lookup a drink by id number to find recipe and ingredients for cocktail search by ingredient
function getRecipeDetails(idDrink){
  
  const urlDrinkId = baseUrl + 'lookup.php?i=' + idDrink;

  fetch(urlDrinkId)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })  
  .then(responseJson => getSpecifiedIngredients(responseJson))
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });

}

//displays list of cocktails containing specified ingredient, corresponding image, ingredients and instructions
function displaySearchedCocktail(responseJson){
    $('.results').empty();
    
    for (let i = 0; i < responseJson.drinks.length; i++){
    const idDrink = responseJson.drinks[i].idDrink;
    
      $('.results').append(`
    <div class="drink-display">
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo">
      <p>${getRecipeDetails(idDrink)}</p>
    </div>  
      `);
   }
 
}

// generates array of ingredients/measurements for search by ingredient drinks
function getSpecifiedIngredients(responseJson) {
  //console.log('getSpecifiedIngredients is working');
 
  let specifiedIngredients = [];
  for(let i = 0; i < responseJson.drinks.length; i++){
  for(let j = 1; j < 16; j++) {
    const drinkIngredients = {};
    if (responseJson.drinks[i][`strIngredient${j}`] == null || responseJson.drinks[i][`strMeasure${j}`] == null){
      delete responseJson.drinks[i][`strIngredient${j}`];
    }
      else if (responseJson.drinks[i][`strIngredient${j}`] !== '' ) {
        drinkIngredients.ingredient = responseJson.drinks[i][`strIngredient${j}`];
        drinkIngredients.measure = responseJson.drinks[i][`strMeasure${j}`];
            specifiedIngredients.push(drinkIngredients);
       } 
    }
console.log(specifiedIngredients);
}  
// Build the template for measurements/ingredients
  let searchedIngredients= '';
  drinkIngredients.forEach(drinkIngredients => {
      searchedIngredients += `
      <li class="ingredient-list">${drinkIngredients.measure} ${drinkIngredients.ingredient}</li>
      `;
  });
  
  return searchedIngredients;
}





///////handlers/////

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