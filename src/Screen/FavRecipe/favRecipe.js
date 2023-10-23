import { useEffect, useState } from "react";
import Style from "./favRecipe.module.css"
import { useNavigate } from "react-router-dom";

let parseFavMealArr = [];




const FavRecipe = () => {
    const Navigate = useNavigate();
    const [favRecipes, setFavRecipe] = useState([]);


    function handleDelete(e, id) {
        e.stopPropagation();
        // console.log(id)
         parseFavMealArr = parseFavMealArr.filter((e) => {
            return e.id != id;
        })


        let favMealArr = JSON.stringify(parseFavMealArr);
        localStorage.setItem("favMealArr", favMealArr);
        setFavRecipe(parseFavMealArr);
    }

    useEffect(() => {

        // this variable is fetching data form the local storage 
        var favMealArr = localStorage.getItem("favMealArr")
            ? localStorage.getItem("favMealArr")
            : "[]";
        // parsing json object 
         parseFavMealArr = JSON.parse(favMealArr);
        setFavRecipe(parseFavMealArr)
    }, [])

    return (
        //  this section contains information about meal
        <section className={Style.myFavMeals}>
            <div className={Style.favMealCont}>
                {
                    favRecipes.map((i) => {
                        return (<>
                            < div  onClick={()=> Navigate(`/recipe-details/${i.id}`)} className={Style.favMealItems}>

                                <div className={Style.favMealImg}><img className={Style.favMealImg} src={i.img} />
                                </div> <div className={Style.favMealName}> {i.name} </div><div className={Style.removeMeal}> <img onClick={(e) => { handleDelete(e, i.id) }} className={Style.remMeal} src="./img/download.png" alt="" /> </div>`
                            </div>
                        </>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default FavRecipe;