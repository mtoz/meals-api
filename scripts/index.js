const app = document.getElementById("app");
const form = document.querySelector("form");
const input = document.getElementById("search");
const result = document.getElementById("result");

let mealsData = [];

async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (mealsData = data.meals));
}

function mealsDisplay() {
  if (mealsData === null) {
    result.innerHTML = "<h2>Aucun résultat</<h2>";
  } else {
    mealsData.length = 12;

    result.innerHTML = mealsData
      .map((meal) => {
        let ingredients_array = [];

        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients_array.push(`<li>${ingredient} - ${measure} </li>`);
          }
        }
        return `
        <div class="meal-card">
        
            <div class="meal-card-header">
                <span>${meal.strMeal}</span>
                <br/>
                <span>${meal.strArea}</span>
            </div>
            
            <div class="meal-card-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            </div>
            
            <ul class="meal-card-ingredients">
                ${ingredients_array.join(" ")}
            </ul>
        
        </div>
        `;
      })
      .join(" ");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
