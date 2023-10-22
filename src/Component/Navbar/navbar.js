import { Link } from "react-router-dom"
import Style from "./navbar.module.css"

export  const Navbar = () => {

    return(
        <>
         {/* this is the header of the website  */}
            <header>
                {/* <!-- this is the logo  --> */}
                <div className={Style.logo}> Recipe</div>
                {/* <!-- right section in header for holding header links */}
                <div className={Style.headerLinks}>
                    {/*  home link  */}
                    <Link to="/">Home</Link>
                    {/* my favourite meal page link .  */}
                    <Link to="./fav-recipe">Favourite</Link>
                </div>

            </header>
        </>
    )
}

