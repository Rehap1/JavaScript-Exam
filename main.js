const searchInputOne = document.getElementById('searchInputONE')
const searchInputTwo = document.getElementById('searchInputTWO')
const mealList = document.getElementById('rowData');
const bigcontainer = document.getElementById('bigcontainer')


// Search by Name
async function getMealByName(currentMeal = '') {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${currentMeal}`)
    response = await response.json();
    displayMeals(response.meals)
}
searchInputOne.addEventListener('keyup', function () {
    let currentMeal = searchInputOne.value;
    console.log(currentMeal);
    getMealByName(currentMeal);
})
getMealByName()

// Search by Letter
async function getMealByFirstLetter(currentMeal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${currentMeal}`)
    response = await response.json();
    displayMeals(response.meals)
}
searchInputTwo.addEventListener('keyup', function () {
    let currentMeal = searchInputTwo.value;
    console.log(currentMeal);
    getMealByFirstLetter(currentMeal);

})

// Display Search Result
function displayMeals(data) {
    let htmlContainer = '';
    if (data) {
        data.forEach(meal => {
            // console.log(meal.idMeal);
            htmlContainer +=
                `
                <div onclick="getDetails('${meal.idMeal}')"  class="col-md-3">
                  <div class="meal position-relative overflow-hidden rounded-2" data-id = "${meal.idMeal}">
                    <img class="w-100" src="${meal.strMealThumb}" alt="meals" />
        
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${meal.strMeal}</h3>
                    </div>
                  </div>
                </div>
              
            `;

        });


    }
    else {
        htmlContainer = "Sorry, we didn't find any meals!"
    }

    mealList.innerHTML = htmlContainer;

}

// Meals Details
async function getDetails(currentID) {
    mealList.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentID}`);
    console.log(response);
    response = await response.json();
    displayMealDetails(response.meals[0]);
}
function displayMealDetails(meal) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let htmlContainer = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    mealList.innerHTML = htmlContainer
}


// Meals Categories
async function getCategories() {
    mealList.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategories(response.categories)
}
function displayCategories(arr) {
    let htmlContainer = "";

    for (let i = 0; i < arr.length; i++) {
        htmlContainer += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    mealList.innerHTML = htmlContainer
}
async function getCategoryMeals(category) {
    mealList.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json();
    displayMeals(response.meals.slice(0, 20))
}


// Meals Areas
async function getAreas() {
    mealList.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals)
}
function displayArea(arr) {
    let htmlContainer = "";

    for (let i = 0; i < arr.length; i++) {
        htmlContainer += `
        <div class="col-md-3">
                <div onclick=getAreaMeals('${arr[i].strArea}') class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = htmlContainer
}
async function getAreaMeals(area) {
    mealList.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}


// Meals Ingredients
async function getIngredients() {
    mealList.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20))
}
function displayIngredients(arr) {
    let htmlContainer = "";

    for (let i = 0; i < arr.length; i++) {
        htmlContainer += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    mealList.innerHTML = htmlContainer
}

async function getIngredientsMeals(ingredients) {
    mealList.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}

// Contact US
function contacts() {
    mealList.innerHTML = "";
    bigcontainer.innerHTML = ` <section id="signup">
    <div class="container">
      <div class="signup-content text-center w-75 m-auto my-5 p-5">
        <div class="content">

          <input type="text" id="userNameInput" class="form-control text-black mb-3 bg-white"
            placeholder="Enter Your Name" onkeyup="inputsValidation()" />

          <input type="email" id="emailInput" class="form-control text-black mb-3 bg-white"
            placeholder="Enter Your Email" />

          <input type="text" id="phoneInput" class="form-control text-black mb-3 bg-white"
            placeholder="Enter Your Phone" />

          <input type="number" id="ageInput" class="form-control text-black mb-3 bg-white"
            placeholder="Enter Your Age" />

          <input type="password" id="passwordInput" class="form-control text-black mb-4 bg-white"
            placeholder="Enter your password" />

          <input type="password" id="repasswordInput" class="form-control text-black mb-4 bg-white"
            placeholder="Enter your password" />

          <p id="alertMassage" class="d-none"></p>
        </div>
        <div class="submit-btn">
          <button id="submitBtn" class="btn w-100">Submit</button>
        </div>
      </div>
    </div>
  </section>`
    let userNameInput = document.getElementById('userNameInput');
    let emailInput = document.getElementById('emailInput');
    let phoneInput = document.getElementById('phoneInput');
    let ageInput = document.getElementById('ageInput');
    let passwordInput = document.getElementById('passwordInput');
    let repasswordInput = document.getElementById('repasswordInput');
    let submitbtn = document.getElementById('submitBtn');
    let alertMassage = document.getElementById('alertMassage');
    let userContainer = [];

    if (localStorage.getItem('Users') != null) {
        userContainer = JSON.parse(localStorage.getItem('Users'));
    }
    if (submitbtn != null) {
        submitbtn.addEventListener('click', submit)
    }
    function submit() {
        let user = {
            Name: userNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            age: ageInput.value,
            password: passwordInput.value,
            repassword: repasswordInput.value
        }
        if (userNameInput.value == '' || emailInput.value == '' || passwordInput.value == '' || checkEmailExist() != -1) {
            if (userNameInput == '' || emailInput.value == '' || passwordInput.value == '') {
                getAlertMessage('All inputs required', '#ff4742');
            }
            if (checkEmailExist() != -1) {
                getAlertMessage('Email  already exists', '#ff4742');
            }
        }
        else {
            getAlertMessage('Submited', '#ff4742')
            userContainer.push(user);
            localStorage.setItem('Users', JSON.stringify(userContainer));
        }
    }
    function getAlertMessage(str, color) {
        alertMassage.innerHTML = str;
        alertMassage.classList.replace('d-none', 'd-block');
        alertMassage.style.color = color;
    }
    function checkEmailExist() {
        let res = userContainer.findIndex(ele => ele.email == emailInput.value);
        return res;
    }

}





