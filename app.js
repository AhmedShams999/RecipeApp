const search = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const mainDisplay = document.querySelector('.display');
const overlayDisplay = document.querySelector('.meal-detailes');
const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
const detailsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
searchBtn.addEventListener('click',async ()=>{

const value = search.value.trim();
if(value === ""){
  alert("please enter an item");
  return;
}
try {
  fetch(url + value)
  .then(res => res.json())
  .then((data) => {
    let html = "";
    if (data.meals === null){
      alert('there is no food with that name BITCH!!!!!');
      search.value = "";
      return;
    }
    else if(data){
         data.meals.forEach((meals)=>{
           html +=`
           <div class="meal" data-id = ${meals.idMeal} >
         <div class="meal-img">
         <img class="food-img" src= ${meals.strMealThumb} alt="food"/>
         </div>
         <div class="meal-name">
         <h2>${meals.strMeal}</h2>
         <button class="show-meal-recipe-btn">Show recipe</button>
         </div>
         </div>
         `
        })
      }
      search.value = "";
      mainDisplay.innerHTML = html;
    });
  } catch (error) {
   console.log(error)  
  }
})

// Show recipe
mainDisplay.addEventListener('click',async (e)=>{
  e.preventDefault();
  const meal = e.target;
  const parentEl = meal.parentElement.parentElement;
  
  if(meal.classList.contains('show-meal-recipe-btn')){
     fetch(detailsUrl + parentEl.getAttribute('data-id'))
    .then( res => res.json())
    .then((data)=>{
      let html = "";
    
      const recipe = data.meals[0];

      html +=
      `
      <div class="overlay">
        <h2>${recipe.strMeal}</h2>
        <h3>Racipe is :</h3>
        <p class="text">${recipe.strInstructions}</p>
        <img class="recipe-img" src= ${recipe.strMealThumb} alt="food"/>
        <a href= ${recipe.strYoutube} target="_blank" >Watch video</a>
        <button class="close" id ="close-btn">x</button>
      </div>
      `
      overlayDisplay.innerHTML = html;
      document.querySelector('.overlay').classList.add('show-overlay');
      document.querySelector('.overlay').addEventListener('click',(e)=>{
        if(e.target.classList.contains('close')){
          document.querySelector('.overlay').classList.remove('show-overlay');
        }
      })
    })
  }
    
})
