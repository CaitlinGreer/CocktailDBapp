'use strict';

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";


//generate search page
function generateSearchPage() {
    $('main').html(
      `<form class="js-form">
            <h2>Search for Drink Recipes By Alcohol </br> or Find a Random Drink</h2>
              <input type="text" class="booze-input" placeholder="What kind of alcohol?" required>
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
            $('.results').text('Something went wrong');
        });
}

//generates the display for the random cocktail search
function displayRandomCocktail(responseJson) {
    $('.results').empty();

    for (let i = 0; i < responseJson.drinks.length; i++) {
        $('.results').append(`
    <section class="drink-display-card">
      <article class="drink-display-container">
        <h3>${responseJson.drinks[i].strDrink}</h3>
        <div class="drink-img"><img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo"></div>
            <div class="recipe-toggle">Recipe
              <div class="recipe">
                </br> 
                  <div class="instructions">${responseJson.drinks[i].strInstructions}
                  </div>
                </br> 
                </br>
                  ${getIngredients(responseJson)}
              </div>
            </div>  
      </article>
    </section>  
    `);
    }
    handleShowRecipe();
}


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
        <ul>
        <li class="ingredient-list">${ingredient.measure} ${ingredient.ingredient}</li>
        </ul>
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
    let cocktails = null;
    try {
       cocktails = await response.json();
    } catch(e) {
      $('#error').removeClass('hidden')
      $('.js-form')[0].reset()
      throw new Error(`no content`)
    }


    return displaySearchedCocktail(cocktails);
}




//fetch call for lookup a drink by id number to find recipe and ingredients for cocktail search by ingredient
async function getRecipeIngredients(idDrink) {
    const urlDrinkId = baseUrl + 'lookup.php?i=' + idDrink;
    const response = await fetch(urlDrinkId);

    if (!response.ok) {
        const message = `Something Went Wrong`;
        throw new Error(message);
    }

    const ingredients = await response.json();

    
    return ingredients;

}



//displays list of cocktails containing specified ingredient, corresponding image and drink ID number

async function displaySearchedCocktail(responseJson) {
    $('.results').empty();
    $('.js-form')[0].reset();
    $('.results').hide();
    $('#error').addClass('hidden');
    $('#loading').show();
    
     for (let i = 0; i < responseJson.drinks.length; i++) {
        const idDrink = responseJson.drinks[i].idDrink;
        const ingredients = await getRecipeIngredients(idDrink);
        console.log
        $('.results').append(`
     
       <section class="drink-display-card">
        <article class="drink-display-container">  
          <h3>${responseJson.drinks[i].strDrink}</h3>
            <div class="drink-img"><img src="${responseJson.drinks[i].strDrinkThumb}" alt="drink photo"></div>
            <div class="recipe-toggle">Recipe 
                <div class="recipe">
                  </br>
                  ${getSpecifiedIngredients(ingredients)} 
                </div>
            </div>
        </article>  
      </section>
      
    `);
    
    }
    $('#loading').hide();
    $('.results').show();
    
    handleShowRecipe();
}


// generates array of ingredients/measurements for search by ingredient drinks
function getSpecifiedIngredients(responseJson) {
    let specifiedIngredients = [];
    let instructions = '';
    for (let i = 0; i < responseJson.drinks.length; i++) {
        for (let j = 1; j < 16; j++) {
            const drinkIngredients = {};
            if (responseJson.drinks[i][`strIngredient${j}`] == null)  {
                delete responseJson.drinks[i][`strMeasure${j}`];
                
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
      <ul>
      <li class="ingredient-list">${ingredient.measure} ${ingredient.ingredient}</li>
      </ul>
        `;
    });

    finalDisplay = instructions + `</br></br>` + searchedIngredients;

    return finalDisplay;

}

///////handlers/////

//handles the random drink button
function handleRandomDrinkButton() {

  $('.js-random-button').on('click', event => {
    getRandomCocktail();
  })
}

//handles the find a drink button
function handleFindDrinkButton() {
  
  $('.js-form').submit(event => {
    event.preventDefault();
    const boozeInput = $('.booze-input').val();

    getCocktailList(boozeInput);
  });
}

//handles show recipe button
function handleShowRecipe() {
  $('.recipe-toggle').click(function(){
    $(this).children().toggle('slow');
  });  
  $('.recipe').click(function ( event ) {
    event.stopPropagation();
  });
}



function handleCocktailApp() {
    $('#loading').hide();
    generateSearchPage();
    handleRandomDrinkButton();
    handleFindDrinkButton();
}

$(handleCocktailApp());