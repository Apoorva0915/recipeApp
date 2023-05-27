const Searchbox=document.querySelector('.Searchbox');
const searchBtn=document.querySelector('.searchBtn');
const recipecontainer =document.querySelector('.recipe-container');
const recipeCloseBtn =document.querySelector('.recipe-close');
const recipeContent =document.querySelector('.recipe-details-content');

const fetchRecipe=async (query)=>{
    recipecontainer.innerHTML="<h2>Fetching the recipes...</h2>"
    
    try{
        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response= await data.json();
        recipecontainer.innerHTML=""
        // console.log(response)
        response.meals.forEach(meal=>{
            const recipeDiv=document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}<span> Dish</p>
            <p>Belongs To <span>${meal.strCategory}</span> Category</p>
            `
            const button=document.createElement("button");
            button.textContent="View Recipe";
            recipeDiv.appendChild(button);
    
            // add event listener in button
            button.addEventListener("click",()=>
            openRecipePopup(meal));
    
            recipecontainer.appendChild(recipeDiv);
        });
    }
    catch(error){

        recipecontainer.innerHTML="<h2>Error in Fetching the recipes...</h2>"
    }



}

const openRecipePopup=(meal)=>{
    recipeContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <br>
    <ul class="ingredientsList">${fetchIngredients(meal)}
    <div class="instruction">
    <h3>Intruction:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `

    recipeContent.parentElement.style.display="block";

}

const fetchIngredients=(meal)=>{
    let Ingredients_list="";
    for(let i=1;i<=20;i++){
        const Ingredients=meal[`strIngredient${i}`];
        if(Ingredients){
            const measure=meal[`strMeasure${i}`];
            Ingredients_list+=`<li>${measure} ${Ingredients}</li>`
        }
        else{
            break;
        }

    }
    return Ingredients_list;

}

recipeCloseBtn.addEventListener("click",(e)=>{
    recipeContent.parentElement.style.display="none"
})

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput=Searchbox.value.trim();
    fetchRecipe(searchInput);
    // console.log("click");
    if(!searchInput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box.</h2>`
        return;
    }
    fetchRecipe(searchInput);
});

