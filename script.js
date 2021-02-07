const searchResult = document.getElementById('search')
const searchMsg = document.getElementById('search-msg');
const mealElement = document.getElementById('meals')
const mealDetail = document.getElementById('meal-detail')

const searchValue = () => {
    const searchVal = searchResult.value
    console.log(searchVal);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            searchMsg.innerHTML = `<h3>Results for: ${searchVal} </h3>`
            if (data.meals === null) {
                searchMsg.innerHTML = `<h3>No result found.Try something else </h3>`
            } else {
                mealElement.innerHTML = data.meals
                    .map(meal => `
            <div class="meal" onclick="displayFoodIngredients('${meal.idMeal}')" >
            <img src="${meal.strMealThumb}"/>
            <h3>${meal.strMeal}</h3>
            </div>
            `).join("")

            }
        })
    mealDetail.style.display = 'none'
    search.value = "";
}

const displayFoodIngredients = id => {
    mealDetail.style.display = 'block'
    console.log(id);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const ingred = data.meals[0];
            renderIngredients(ingred)
        })
}

const renderIngredients = ingred => {
    mealDetail.innerHTML = `
    <div class="single-meal">
    <h1>${ingred.strMeal}</h1>
    <img src="${ingred.strMealThumb}"/>
    <h3>Ingredients</h3>
    <ul>
    <li>${ingred.strIngredient1}</li>
    <li>${ingred.strIngredient2}</li>
    <li>${ingred.strIngredient3}</li>
    <li>${ingred.strIngredient4}</li>
    <li>${ingred.strIngredient5}</li>
    <li>${ingred.strIngredient6}</li>
    <li>${ingred.strIngredient7}</li>
    <li>${ingred.strIngredient8}</li>
    <li>${ingred.strIngredient9}</li>
    <li>${ingred.strIngredient10}</li>
    </ul>
    </div>
    `
}

