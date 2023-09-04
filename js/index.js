// // $('#offline-message').css("display","none")

// $(window).on('offline', function() {
//   // Internet connection is offline
//   displayOfflineMessage();
// });

// $(window).on('online', function() {
//   // Internet connection is back online
//   hideOfflineMessage();
//   // $('body').show();
 
// });

// function displayOfflineMessage() {
//   $('#offline-message').show();
//   // $('body').hide();

// }

// function hideOfflineMessage() {
//   $('#offline-message').hide();
// }
// >=============> html elements 
const main = document.getElementById("main");
const mainHome = document.getElementById("mainHome");
const details = document.getElementById("details");
const detailsContainer = document.querySelector("#details .container");
const hideDetails = document.getElementById("hideDetails");
const showSearch = document.getElementById("showSearch");
const showCategories = document.getElementById("showCategories");
const showAreas = document.getElementById("showAreas");
const showIngredients = document.getElementById("showIngredients");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const ageInput = document.getElementById("ageInput");
const passwordInput = document.getElementById("passwordInput");
const repasswordInput = document.getElementById("repasswordInput");
const inputs = document.querySelectorAll(".contact input");
const loading = document.querySelector(".loading");
// >=============> open & close sidebar 
let widthSlider = $(".nav-slider").innerWidth();
$("#open").click(open);
function open() {
  $(".side-bar").animate({ left: "0px" }, 500);
  $("#open").css("display", "none");
  $("#close").css("display", "block");
  $(".side-bar ul li:nth-child(1)").animate({ top: "0px" }, 500);
  $(".side-bar ul li:nth-child(2)").animate({ top: "0px" }, 600);
  $(".side-bar ul li:nth-child(3)").animate({ top: "0px" }, 700);
  $(".side-bar ul li:nth-child(4)").animate({ top: "0px" }, 800);
  $(".side-bar ul li:nth-child(5)").animate({ top: "0px" }, 900);
}
$("#close").click(close);
function close() {
  $(".side-bar").animate({ left: -`${widthSlider}` },500);
  $("#close").css("display", "none");
  $("#open").css("display", "block");
  $(".side-bar ul li:nth-child(1)").animate({ top: "300px" }, 900);
  $(".side-bar ul li:nth-child(2)").animate({ top: "300px" }, 800);
  $(".side-bar ul li:nth-child(3)").animate({ top: "300px" }, 700);
  $(".side-bar ul li:nth-child(4)").animate({ top: "300px" }, 600);
  $(".side-bar ul li:nth-child(5)").animate({ top: "300px" }, 500);
}
$(document).ready(function () {
  $(".loading").fadeOut(500);
});
function toggleSpinner() {
  $(".loading").fadeToggle(500);
}
// >=============> get random data 
async function getMainData(apiUrl, idContainer) {
  toggleSpinner();
  const res = await fetch(apiUrl);
  let data = await res.json();
  meal = data.meals;
  displayMeals(data.meals, idContainer);
  toggleSpinner();
}
getMainData("https://www.themealdb.com/api/json/v1/1/search.php?s=", mainHome);
// >=============> display random meals 
function displayMeals(meal, idContainer) {
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `
  <div class="col-xl-3 col-lg-4 col-md-6">
    <div  onclick="displayDetails('${i}','${meal}') "  class="card-content rounded-3 overflow-hidden position-relative">
        <img src="${meal[i].strMealThumb}" class="w-100" alt="">
        <div class="layer">
            <h4 class="title">${meal[i].strMeal}</h4>
        </div>
    </div>
  </div>`;
  }
  idContainer.innerHTML = box;
}
// >=============> show details of selected image
function displayDetails(index) {
  $("section").addClass("d-none");
  mainHome.classList.add("d-none");
  // ==========> destructing the array 
  details.classList.replace("d-none", "d-block");
  const {
    strMealThumb,
    strMeal,
    strInstructions,
    strArea,
    strCategory,
    strSource,
    strYoutube,
    strTags,
  } = meal[index];
  let showDetails = `
            <div class="row my-5 gx-lg-5 gy-5 gy-lg-0 text-white">
                <div class="col-lg-4">
                    <picture>
                        <img src="${strMealThumb}" class="w-100 rounded-3" alt="">
                    </picture>
                    <h2>${strMeal}</h2>
                </div>
                <div class="col-lg-8">
                    <h2>Instructions</h2>
                    <p>${strInstructions}</p>
                    <h3><span>Area : </span>${strArea}</h3>
                    <h3><span>Category : </span>${strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="recipes list-unstyled"></ul>
                    <h3>Tags :</h3>
                    <ul class="tags list-unstyled"></ul>
                    <a href="${strSource}" class="btn btn-success" target="_blank">Source</a>
                    <a href="${strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                </div>
            </div>
  `;
  detailsContainer.innerHTML = showDetails;
  // =========loop to get recipes
  if ($(".recipes") != null) {
    let lisRecipes = ``;
    for (let i = 1; i <= 20; i++) {
      if (meal[index][`strMeasure${i}`] != " ") {
        if (
          meal[index][`strIngredient${i}`] == "" ||
          meal[index][`strIngredient${i}`] == null
        ) {
          break;
        }
        lisRecipes += `<li>${meal[index][`strMeasure${i}`]} ${
          meal[index][`strIngredient${i}`]
        }</li>`;
      }
    }
    $(".recipes").append(lisRecipes);
  }
  // ========>loop to get tags
  if ($(".tags") != null) {
    if (strTags != null) {
      let arr = strTags.split(",");
      let lisTags = ``;
      for (let i = 0; i < arr.length; i++) {
        lisTags += `<li>${arr[i]}</li>`;
      }
      $(".tags").append(lisTags);
    }
  }
}
// >=============> hide Details 
let currentSection = main;
if (hideDetails != null) {
  hideDetails.addEventListener("click", function () {
    if (currentSection == main) {
      mainHome.classList.replace("d-none", "d-flex");
      details.classList.replace("d-block", "d-none");
    } else {
      currentSection.classList.replace("d-none", "d-flex");
      details.classList.replace("d-block", "d-none");
    }
  });
}
// >=============> routing between sections 
$(".nav-links ul li").click(function (e) {
  let id = e.target.dataset.value;
  let htmlSection = document.getElementById(`${id}`);
  currentSection = htmlSection;
  $("section").addClass("d-none");
  mainHome.classList.add("d-none");
  htmlSection.classList.replace("d-none", "d-block");
  close();
});
// >=============> search section 
// by name
$("#searchByName").keyup(function (e) {
  $("#searchByLetter").val("");
  let mealName = e.target.value;
  getMainData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
    showSearch
  );
});
// >=============> search
// by letter
$("#searchByLetter").keyup(function (e) {
  $("#searchByName").val("");
  let mealLetter = e.target.value;
  getMainData(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`,
    showSearch
  );
});
// >=============> main category  
let mealCategory = "";
async function getCategoryData(apiUrl, idContainer) {
  toggleSpinner();
  const res = await fetch(apiUrl);
  let data = await res.json();
  mealCategory = data.categories;
  displayCategories(mealCategory, idContainer);
  toggleSpinner();
}
getCategoryData(
  `https://www.themealdb.com/api/json/v1/1/categories.php`,
  showCategories
);
// >=============> display main categories 
function displayCategories(mealCategory, idContainer) {
  let box = "";
  for (let i = 0; i < mealCategory.length; i++) {
    let desc = `${mealCategory[i].strCategoryDescription}`;
    box += `
    <div class="col-xl-3 col-lg-4 col-md-6">
      <div  onclick="getCatDetails(${i})" 
      class="card-content rounded-3 overflow-hidden position-relative">
          <img src="${mealCategory[i].strCategoryThumb}" class="w-100" alt="">
          <div class="layer">
              <h3>${mealCategory[i].strCategory}</h3>
              <h6 class="description text-center">${desc
                .split(" ", 20)
                .join(" ")}</h6>
          </div>
      </div>
    </div>`;
  }
  idContainer.innerHTML = box;
}
// >=============> display meals of categories 
let mealsId = ``;
async function getCatDetails(index) {
  let cateName = mealCategory[index].strCategory;
  toggleSpinner();
  let myHttp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateName}`
  );
  let data = await myHttp.json();
  mealsId = data.meals;
  displayRelatedMeals(mealsId, showCategories);
  toggleSpinner();
}

function displayRelatedMeals(meal, idContainer) {
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `
  <div class="col-xl-3 col-lg-4 col-md-6">
    <div  onclick="getCateMeals(${i})"  class="card-content rounded-3 overflow-hidden position-relative">
        <img src="${meal[i].strMealThumb}" class="w-100" alt="">
        <div class="layer">
            <h4 class="title">${meal[i].strMeal}</h4>
        </div>
    </div>
  </div>`;
  }
  idContainer.innerHTML = box;
}

let dataCat = ``;
async function getCateMeals(index) {
  let mealId = mealsId[index].idMeal;
  toggleSpinner();
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let d = await res.json();
  dataCat = d.meals;
  dDetails(0, dataCat);
  toggleSpinner();
}
//======== display meal details
function dDetails(index, x) {
  $("section").addClass("d-none");
  mainHome.classList.add("d-none");
  details.classList.replace("d-none", "d-block");
  //====== destructing meals details and display
  const {
    strMealThumb,
    strMeal,
    strInstructions,
    strArea,
    strCategory,
    strSource,
    strYoutube,
    strTags,
  } = x[index];
  let showDetails = `
            <div class="row my-5 gx-lg-5 gy-5 gy-lg-0 text-white">
                <div class="col-lg-4">
                    <picture>
                        <img src="${strMealThumb}" class="w-100 rounded-3" alt="">
                    </picture>
                    <h2>${strMeal}</h2>
                </div>
                <div class="col-lg-8">
                    <h2>Instructions</h2>
                    <p>${strInstructions}</p>
                    <h3><span>Area : </span>${strArea}</h3>
                    <h3><span>Category : </span>${strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="recipes list-unstyled"></ul>
                    <h3>Tags :</h3>
                    <ul class="tags list-unstyled"></ul>
                    <a href="${strSource}" class="btn btn-success" target="_blank">Source</a>
                    <a href="${strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                </div>
            </div>
  `;
  detailsContainer.innerHTML = showDetails;
  if ($(".recipes") != null) {
    let lisRecipes = ``;
    for (let i = 1; i <= 20; i++) {
      if (meal[index][`strMeasure${i}`] != " ") {
        if (meal[index][`strIngredient${i}`] == "") {
          break;
        }
        lisRecipes += `<li>${meal[index][`strMeasure${i}`]} ${
          meal[index][`strIngredient${i}`]
        }</li>`;
      }
    }
    $(".recipes").append(lisRecipes);
  }
  if ($(".tags") != null) {
    if (strTags != null) {
      let arr = strTags.split(",");
      let lisTags = ``;
      for (let i = 0; i < arr.length; i++) {
        lisTags += `<li>${arr[i]}</li>`;
      }
      $(".tags").append(lisTags);
    }
  }
}


// >=============> area section 
let mealArea = "";
async function getAreaData(apiUrl, idContainer) {
  toggleSpinner();
  const res = await fetch(apiUrl);
  let data = await res.json();
  mealArea = data.meals;
  displayAreas(mealArea, idContainer);
  toggleSpinner();
}
getAreaData(
  `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
  showAreas
);
// >=============> display area 
function displayAreas(meal, idContainer) {
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `
    <div class="col-md-3">
      <div onclick="displayRelated(${i})" class="country text-center text-white">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${meal[i].strArea}</h3>
      </div>
    </div>`;
  }
  idContainer.innerHTML = box;
}
// >=============> display  meals of area
async function displayRelated(country) {
  let name = mealArea[country].strArea;
  toggleSpinner();
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  let data = await res.json();
  mealsId = data.meals;
  displayRelatedMeals(mealsId, showAreas);
  toggleSpinner();
}
// >=============> ingredients section 
let mealIngredients = "";
async function getIngredientsData(apiUrl, idContainer) {
  toggleSpinner();
  const res = await fetch(apiUrl);
  let data = await res.json();
  mealIngredients = data.meals;
  displayIngredients(mealIngredients, idContainer);
  toggleSpinner();
}
getIngredientsData(
  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
  showIngredients
);
// >=============> display Ingredients 
function displayIngredients(meal, idContainer) {
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div onclick="displayRel(${i})" class="content text-center text-white">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3 class="mt-2">${meal[i].strIngredient}</h3>
          <p>${meal[i].strDescription.split(" ", 20).join(" ")}</p>
      </div>
    </div>`;
  }
  idContainer.innerHTML = box;
}
// >=============>meals of Ingredients  
async function displayRel(k) {
  let name = mealIngredients[k].strIngredient;
  toggleSpinner();
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  let data = await res.json();
  mealsId = data.meals;
  displayRelatedMeals(mealsId, showIngredients);
  toggleSpinner();
}
// >=============> contact us section 
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", validation);
}
let nameFocused =
  (emailFocused =
  phoneFocused =
  agFocused =
  passwordFocused =
  repasswordFocused =
    false);
nameInput.addEventListener("focus", function () {
  nameFocused = true;
});
emailInput.addEventListener("focus", function () {
  emailFocused = true;
});
phoneInput.addEventListener("focus", function () {
  phoneFocused = true;
});
ageInput.addEventListener("focus", function () {
  agFocused = true;
});
passwordInput.addEventListener("focus", function () {
  passwordFocused = true;
});
repasswordInput.addEventListener("focus", function () {
  repasswordFocused = true;
});
function validation() {
  if (nameFocused == true) {
    if (validateName()) {
      $("#nameAlert").addClass("d-none");
    } else {
      $("#nameAlert").removeClass("d-none");
    }
  }
  if (emailFocused == true) {
    if (validateEmail()) {
      $("#emailAlert").addClass("d-none");
    } else {
      $("#emailAlert").removeClass("d-none");
    }
  }
  if (phoneFocused == true) {
    if (validatePhone()) {
      $("#phoneAlert").addClass("d-none");
    } else {
      $("#phoneAlert").removeClass("d-none");
    }
  }
  if (agFocused == true) {
    if (validateAge()) {
      $("#ageAlert").addClass("d-none");
    } else {
      $("#ageAlert").removeClass("d-none");
    }
  }
  if (passwordFocused == true) {
    if (validatePassword()) {
      $("#PasswordAlert").addClass("d-none");
    } else {
      $("#PasswordAlert").removeClass("d-none");
    }
  }
  if (repasswordFocused == true) {
    if (validateRePassword()) {
      $("#rePasswordAlert").addClass("d-none");
    } else {
      $("#rePasswordAlert").removeClass("d-none");
    }
  }
  // =================validation

  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePassword() &&
    validateRePassword() &&
    passwordInput.value == repasswordInput.value
  ) {
    btnSubmit.removeAttribute("disabled");
  } else {
    btnSubmit.setAttribute("disabled", true);
  }
}
function validateName() {
  let regex = /^(?!.* .* )[a-zA-Z ]{2,25}$/;
  return regex.test(nameInput.value);
}
function validateEmail() {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(emailInput.value);
}
function validatePhone() {
  let regex = /^[0-9]{11}$/;
  return regex.test(phoneInput.value);
}
function validateAge() {
  let regex = /^\d{1,3}$/;
  return regex.test(ageInput.value);
}
function validatePassword() {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(passwordInput.value);
}
function validateRePassword() {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(repasswordInput.value);
}
