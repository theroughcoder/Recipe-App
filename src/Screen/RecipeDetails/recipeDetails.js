import { useParams } from "react-router-dom";
import Style from "./recipeDetails.module.css";
import { useEffect, useState } from "react";

const  RecipeDetails = () => {
      const [recipe, setRecipe] = useState({});
      let { recipeId } = useParams();
      // console.log(recipeId)
      useEffect(()=>{

        async function fetchData(){
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+recipeId , {
                  method: 'GET',
                //   headers: {
                //     'X-RapidAPI-Key': 'your-api-key',
                //     'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
                //   }
                });
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if(data.meals != null){
                  // console.log(data.meals[0]);
                  setRecipe(data.meals[0])
                }
              } catch (error) {
                console.error('Error:', error);
              }
            }
            fetchData();
            
    }, [])

    return(
        <section className={Style.container}>
        {/*  this section contains info about meal  */}
        <div className={Style.mealInfo}>
          <img className={Style.mealImg +" "+Style.mealImage} src={recipe.strMealThumb} alt=""  />
          
          <p className={recipe.mealDescription}></p>
          <p className={recipe.mealArea}></p>
          <p className={recipe.mealWebsiteLink}></p>
        
        </div>
         {/* content about meal  */}
        <div className={Style.mealContent}>
          <h1 className={Style.mealTitle}>{recipe.strMeal}</h1>
          <p>
            {recipe.strInstructions}
          </p>
        </div>
      </section>
    )
}

export default RecipeDetails;