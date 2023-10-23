import { useEffect, useRef, useState } from "react";
import Style from "./home.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useClickOutSide from "../../helper";
// this variable is fetching data form the local storage 
var favMealArr  = (localStorage.getItem("favMealArr"))? localStorage.getItem("favMealArr") : "[]";
// parsing json object 
var parseFavMealArr = JSON.parse(favMealArr);

const Home = () => {
    const Navigate = useNavigate();
    const [recipe, setRecipe] = useState("");
    const [focus, setFocus] = useState(false);
    const [recipeArr, setRecipeArr] = useState([]);
    const searchBarRef  = useRef(null); 

    useClickOutSide(searchBarRef,  ()=> setFocus(false))

    useEffect(()=>{

        async function fetchData(){
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+recipe , {
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
                console.log(data.meals)
                if(data.meals != null){
                    // console.log(data.meals)
                    setRecipeArr(data.meals);
                }else{
                    setRecipeArr([]);

                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if(recipe != ""){
            
            fetchData();
        }else{
            
            setRecipeArr([]);
        }
    }, [recipe])
    return(
        <section className={Style.searchBarSection}>
        {/*  search bar for searching meals  */}
        

        <div className={Style.searchBar} ref={searchBarRef}>
             {/* search bar input element */}
            <input onFocus={(e)=> setFocus(true)}  className={Style.searchBarInput} onChange={(e)=> setRecipe(e.target.value)}  type="text" placeholder="Search your meal here"/>
            <div className={Style.searchBtn}>
                <img src="./img/pngtree-vector-search-icon-png-image_966647-removebg-preview (1).png" alt=""/>
            </div>
             {/* this is a container that stores search items */}
            <div style={{display: focus && recipe.length != 0 ? "block" : "none" }} className={Style.searchResult} >
                {
                    recipeArr == 0 ? "No Result Found" : recipeArr.map((rec)=>{
                        return(
                        
                            <div onClick={()=> Navigate(`/recipe-details/${rec.idMeal}`)} className={Style.resultItems}>
                        <img src={rec.strMealThumb} alt='img'/> <p>{rec.strMeal}</p><div ><img onClick={(e) => {
                            e.stopPropagation();
                            const userExists = parseFavMealArr.some(ele => ele.id === rec.idMeal);
                                // console.log(userExists);
                            // adding favourite meal item 
                            if(!userExists) {
                            
                              parseFavMealArr.push({id : rec.idMeal, name: rec.strMeal, img: rec.strMealThumb} );
                              favMealArr = JSON.stringify(parseFavMealArr);
                              localStorage.setItem("favMealArr", favMealArr);
                            }

                        }} className={Style.tool +" "+Style.favMeal} src="./img/favorites.png" /> </div>
                        </div>
                        
                        )
                        
                    })
                }
            </div>
        </div>
            
    </section>
    )
}

export default Home;