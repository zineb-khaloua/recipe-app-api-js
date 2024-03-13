//www.themealdb.com/api/json/v1/1/filter.php?i={searchItem}
//www.themealdb.com/api/json/v1/1/lookup.php?i={id}

//setup vars 

let searchInputEl = document.querySelector('.search-input');
let searchBtnEl = document.querySelector('#search-btn');
let resultAreaEl = document.querySelector('.result-area');
let recipeDetails = document.querySelector('.recipe-details');
//Events

searchBtnEl.addEventListener('click', getRecipes);
resultAreaEl.addEventListener('click', getDetails);
recipeDetails.addEventListener('click',closeRecepeDetails)
function getRecipes() {
    let searchItem = searchInputEl.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;

    fetch(apiUrl)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            displayRecipes(data);
        })

}


function displayRecipes(recipes) {
    resultAreaEl.innerHTML = "";
    if (recipes.meals == null) {
        resultAreaEl.innerHTML = "Sorry , No Recipes ! ";
        return;
    }
    recipes.meals.forEach((recipe) => {
        resultAreaEl.innerHTML += `
        <div class="card">
        <div class="card-img">
            <img src="${recipe.strMealThumb}" alt>
        </div>
        <div class="card-info">
            <h2>${recipe.strMeal}</h2>
            <a href="#"  class="recipe-btn" data-id=${recipe.idMeal}>Get Recipe</a>
        </div>
    </div>
        `
    })
}

function getDetails(e) {
    if (e.target.classList.contains('recipe-btn')) {
        let id = e.target.getAttribute('data-id');
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(apiUrl)
            .then((res) => {
                if (res.ok) return res.json();

            })
            .then((data) => {
                displayRecipeDetails(data);
            })
    }
}

function displayRecipeDetails(recipeItem) {
    let item = recipeItem.meals[0];
    recipeDetails.classList.remove('showDetails');

    recipeDetails.innerHTML = `
        <i class="fas fa-times"></i>
        <h2 class="recipe-title">${item.strMeal}</h2>
        <p>Instructions:</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">watch video!</a>
        `

}
function closeRecepeDetails(e){
    if (e.target.classList.contains('fa-times')){
       e.target.parentElement.classList.add('showDetails');
    }
}