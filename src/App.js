import './App.css';
import { Navbar } from './Component/Navbar/navbar';
import Home from './Screen/Home/home';
import { BrowserRouter ,Routes, Route } from 'react-router-dom'; 
import React from 'react';
import RecipeDetails from './Screen/RecipeDetails/recipeDetails';
import FavRecipe from './Screen/FavRecipe/favRecipe';

function App() {


  return (
        <BrowserRouter>
    <div className="App">

          <Navbar />
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/recipe-details/:recipeId' element={< RecipeDetails />}></Route>
            <Route exact path='/fav-recipe' element={< FavRecipe />}></Route>
          </Routes>

      </div>
          </BrowserRouter>

  );
}

export default App;
