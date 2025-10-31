import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";

const Recipes = () => {
    const { data } = useContext(recipecontext);

    const reciperender = data.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    return (
        <div className="max-w-6xl mx-auto px-6 mt-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Explore recipes</h1>
                <Link className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800" to="/recipes/create-recipe">Create Recipe</Link>
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
                <input placeholder="Search recipes" className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
                <div className="flex flex-wrap gap-2">
                    {['All','Breakfast','Lunch','Supper','Dinner'].map(x => (
                        <button key={x} className="px-3 py-1.5 rounded-full border text-sm hover:bg-gray-100">{x}</button>
                    ))}
                </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {data.length > 0 ? reciperender : <div className="text-gray-500">No recipe found!</div>}
            </div>
        </div>
    );
};

export default Recipes;
