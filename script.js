'use strict';

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";


//generate search page
<<<<<<< HEAD
<<<<<<< HEAD
function generateSearchPage(){
  console.log('generate search page is running');
  $('main').html(`<form class="js-form">
        <h2>Search for Drink Recipes By Ingredient</h2>
        <input type="text" class="booze-input" placeholder="ex: Vodka" required>
=======
=======
>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642
function generateSearchPage() {
    $('main').html(`<form class="js-form">
        <h2>Search for Drink Recipes By Ingredient </br> or Find a Random Drink</h2>
        <input type="text" class="booze-input" placeholder="Vodka" required>
<<<<<<< HEAD
>>>>>>> secondAttempt
=======
>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642
        </br>
        <div class="buttons">
          <input type="submit" class="js-find-drinks" value="Find Drinks!">
        </div>
      </form>
      <form class="js-random-form">
        <div class="buttons">
          <input type="button" id="js-random-button" class="js-random-button" value="Random Drink">
        </div>
      </form>
    </section>`);
}

////////random cocktail section////////
<<<<<<< HEAD
<<<<<<< HEAD


//fetch call for the url for random cocktail search
function getRandomCocktail(){
  const urlRandom = baseUrl + 'random.php'
=======
>>>>>>> secondAttempt
=======
>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642


//fetch call for the url for random cocktail search
function getRandomCocktail() {
    const urlRandom = baseUrl + 'random.php'

    fetch(urlRandom)
        .then(response => {
            if (response.ok) {
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
function displayRandomCocktail(responseJson) {
    $('.results').empty();

    for (let i = 0; i < responseJson.drinks.length; i++) {
        $('.results').append(`
    <div class="drink-display-card" id="drink-display-card">
      <div class="drink-display-container">
        <h3>${responseJson.drinks[i].strDrink}</h3>
        <div class="drink-img"><img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo"></div>
            <button class="show-recipe-button" onclick="handleShowRecipe()">Recipe</button>  
              <div class="recipe" id="recipe">
                 ${responseJson.drinks[i].strInstructions}
                 </br> </br>
                  ${getIngredients(responseJson)}
              </div>
      </div>
    </div>  
    `);
    }
}


<<<<<<< HEAD
<<<<<<< HEAD
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

  //fetch call for drink containing specified ingredient (only gets info drink name and img and id)
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
  let drinkInfo = '';

  fetch(urlDrinkId)
  .then(response => { 
    
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })  
  .then(responseJson => drinkInfo = getSpecifiedIngredients(responseJson))
  
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });
// console.log('============')
// console.log(idDrink);
// console.log('============')
return drinkInfo;
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
          ${getRecipeDetails(idDrink)}
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
          drinkIngredients.name = responseJson.drinks[i].strDrink;
            drinkIngredients.ingredient = responseJson.drinks[i][`strIngredient${j}`];
              drinkIngredients.measure = responseJson.drinks[i][`strMeasure${j}`];
                specifiedIngredients.push(drinkIngredients);
        } 
    }
//console.log(specifiedIngredients);
  }  
// Build the template for measurements/ingredients
  let searchedIngredients= '';
  specifiedIngredients.forEach(drinkIngredient => {
    searchedIngredients += `
      ${drinkIngredient.name} 
      <li class="ingredient-list">${drinkIngredient.measure} ${drinkIngredient.ingredient}</li>
      `;
  });
  //console.log(searchedIngredients)
  return searchedIngredients;
=======
=======
>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642
// Prints the Ingredients and Measurements
function getIngredients(responseJson) {
    let ingredients = [];
    for (let j = 1; j < 16; j++) {
        const ingredientMeasure = {};
        if (responseJson.drinks[0][`strIngredient${j}`] == null || responseJson.drinks[0][`strMeasure${j}`] == null) {
            delete responseJson.drinks[0][`strIngredient${j}`];
        } else if (responseJson.drinks[0][`strIngredient${j}`] !== '') {
            ingredientMeasure.ingredient = responseJson.drinks[0][`strIngredient${j}`];
            ingredientMeasure.measure = responseJson.drinks[0][`strMeasure${j}`];
            ingredients.push(ingredientMeasure);
        }
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

//fetch call for drink containing specified ingredient (only display's drink name and img)
async function getCocktailList(boozeInput) {

    const urlSpecified = baseUrl + 'filter.php?i=' + boozeInput;
    const response = await fetch(urlSpecified);

    if (!response.ok) {
        const message = `Something Went Wrong`;
        throw new Error(message);
    }

    const cocktails = await response.json();
    return displaySearchedCocktail(cocktails);
}
getCocktailList().catch(error => {
    error.message;

});


//fetch call for lookup a drink by id number to find recipe and ingredients for cocktail search by ingredient
async function getRecipeIngredients(idDrink) {
    console.log("getRecipeIngredients is working")

    const urlDrinkId = baseUrl + 'lookup.php?i=' + idDrink;
    const response = await fetch(urlDrinkId);

    if (!response.ok) {
        const message = `Something Went Wrong`;
        throw new Error(message);
    }

    const ingredients = await response.json();
    return ingredients;
}
getCocktailList().catch(error => {
    error.message;

});


//displays list of cocktails containing specified ingredient, corresponding image and drink ID number

async function displaySearchedCocktail(responseJson) {
    $('.results').empty();


    for (let i = 0; i < responseJson.drinks.length; i++) {
        const idDrink = responseJson.drinks[i].idDrink;
        const ingredients = await getRecipeIngredients(idDrink);
        $('.results').append(`
      <div class="drink-display-card" id="drink-display-card">
        <div class="drink-display-container">  
          <h3>${responseJson.drinks[i].strDrink}</h3>
            <div class="drink-img"><img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo"></div>
              <button class="recipe-button" id="recipe-button" onclick="handleShowRecipe()">Recipe</button>  
                <div class="recipe" id="recipe">
                  ${getSpecifiedIngredients(ingredients)} 
                </div>
        </div>  
      </div>
      
    `);
    }
}


// generates array of ingredients/measurements for search by ingredient drinks
function getSpecifiedIngredients(responseJson) {
    let specifiedIngredients = [];
    let instructions = '';
    for (let i = 0; i < responseJson.drinks.length; i++) {
        for (let j = 1; j < 16; j++) {
            const drinkIngredients = {};
            if (responseJson.drinks[i][`strIngredient${j}`] == null || responseJson.drinks[i][`strMeasure${j}`] == null) {
                delete responseJson.drinks[i][`strIngredient${j}`];
            } else if (responseJson.drinks[i][`strIngredient${j}`] !== '') {
                drinkIngredients.ingredient = responseJson.drinks[i][`strIngredient${j}`];
                drinkIngredients.measure = responseJson.drinks[i][`strMeasure${j}`];
                specifiedIngredients.push(drinkIngredients);
                instructions = responseJson.drinks[i].strInstructions;
            }
        }
    }
    // Build the template for measurements/ingredients
    let finalDisplay = ''
    let searchedIngredients = '';
    specifiedIngredients.forEach(ingredient => {
        searchedIngredients += `
      <li class="ingredient-list">${ingredient.measure} ${ingredient.ingredient}</li>
        `;
    });

    finalDisplay = instructions + searchedIngredients;

    return finalDisplay;

<<<<<<< HEAD
>>>>>>> secondAttempt
}




<<<<<<< HEAD

=======
>>>>>>> secondAttempt
=======
}




>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642
///////handlers/////

//handles the random drink button
function handleRandomDrinkButton() {

    $('.js-random-button').on('click', event => {
        console.log('random drink button clicked')
        getRandomCocktail();
    })
}

//handles the find a drink button
<<<<<<< HEAD
<<<<<<< HEAD
function handleFindDrinkButton(){
  console.log('findDrinkButton is working');
=======
function handleFindDrinkButton() {


>>>>>>> secondAttempt
=======
function handleFindDrinkButton() {


>>>>>>> a7d94ef5e5856861e46bedb5e10aaaa2f3d3d642
    $('.js-form').submit(event => {
        event.preventDefault();
        console.log('find drink recipe clicked');
        const boozeInput = $('.booze-input').val();
        getCocktailList(boozeInput);
    });
}

//handles show recipe button
function handleShowRecipe() {

    $(".recipe").slideToggle("slow");
}



function handleCocktailApp() {
    generateSearchPage();
    handleRandomDrinkButton();
    handleFindDrinkButton();
}

handleCocktailApp();
