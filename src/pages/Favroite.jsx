import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Favroite = () => {
    const { favroite } = useContext(recipecontext);
    console.log(favroite);
    const reciperender = favroite.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    return (
        <div className="max-w-6xl mx-auto px-6 mt-8">
            <h1 className="text-3xl font-bold mb-4">Your favorites</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {favroite.length > 0 ? reciperender : <div className="text-gray-500">No favorites yet.</div>}
            </div>
        </div>
    );
};

export default Favroite;