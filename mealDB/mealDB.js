document.getElementById("error").style.display = 'none'

const searchFood = () => {
    const searchField = document.getElementById("input-field")
    const seachResult = document.getElementById("search-result");
    const mealDetailsField = document.getElementById("meal-details");


    const searchText = searchField.value;

    console.log(searchText);
    searchField.value = '';


    document.getElementById("error").style.display = 'none'
    if (searchText == "") {
        document.getElementById("error").style.display = 'block'
        seachResult.textContent = '';
        mealDetailsField.innerHTML = '';



    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(response => response.json())
            .then(data => displaySearch(data.meals))

    }




}


const displaySearch = (meals) => {
    //console.log(meals);
    const seachResult = document.getElementById("search-result");
    const mealDetailsField = document.getElementById("meal-details");

    //seachResult.innerHTML = '';
    mealDetailsField.innerHTML = '';

    seachResult.textContent = '';
    meals.forEach(meal => {
        //console.log(meal);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = ` 
        <div onclick="loadMealDetail(${meal?.idMeal})" class="card">
                    <img  src="${meal?.strMealThumb}" class=" img-fluid card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal?.strMeal}</h5>
                        <p class="card-text">${meal?.strInstructions.slice(0, 100)}</p>
                        <a class="common-btn btn btn-primary" target="_blank" href="${meal.strYoutube}">Meal Video</a>
                    </div>
                </div>
        `

        seachResult.appendChild(div);

    });

}

const loadMealDetail = (id) => {
    //console.log(id);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))

}


const displayMealDetails = (meal) => {
    //console.log(meal);

    const mealDetailsField = document.getElementById("meal-details");
    const div = document.createElement("div");
    mealDetailsField.innerHTML = '';

    div.classList.add('card');
    div.innerHTML = ` 
    <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title">${meal?.strMeal}</h4>
        <h5 class="card-title">${meal?.strArea} ${meal.strCategory}</h5>
        <h6 class="card-title">${meal?.idMeal}</h6>
        <p class="card-text">${meal?.strInstructions}</p>
    </div>`

    mealDetailsField.appendChild(div);

}