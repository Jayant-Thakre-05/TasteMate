import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Recipe = () => {
    const navigate = useNavigate();
    const { data, setdata, favroite, setfavroite } = useContext(recipecontext);
    const { id } = useParams();
    const recipe = data.find((r) => r.id == id);
    console.log(favroite.find((r) => r.id == recipe.id));
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            image: recipe.image,
            title: recipe.title,
            chef: recipe.chef,
            desc: recipe.desc,
            ingr: recipe.ingr,
            inst: recipe.inst,
        },
    });

    const SubmitHandler = (updatedRecipe) => {
        const i = data.findIndex((r) => r.id == id);
        // code to update recipe
        console.log(data[i]);
        const copydata = [...data];
        copydata[i] = { ...recipe, ...updatedRecipe };
        setdata(copydata);
        window.localStorage.setItem("recipes", JSON.stringify(copydata));
        toast.success("recipe updated!");
        reset();
    };

    const DeleteHandler = () => {
        const filterData = data.filter((r) => r.id != id);
        setdata(filterData);
        window.localStorage.setItem("recipes", JSON.stringify(filterData));
        // remove the recipe from favroite as well if exist
        toast.success("Recipe Deleted");
        navigate("/recipes");
    };

    const FavroiteHandler = () => {
        let copyfavroite = [...favroite];
        copyfavroite.push(recipe);
        setfavroite(copyfavroite);
        window.localStorage.setItem("favroite", JSON.stringify(copyfavroite));
    };

    const UnFavroiteHandler = () => {
        const filteredfavroite = favroite.filter((f) => f.id != id);
        setfavroite(filteredfavroite);
        window.localStorage.setItem(
            "favroite",
            JSON.stringify(filteredfavroite)
        );
    };

    return recipe ? (
        <div className="max-w-6xl mx-auto px-6 mt-8 grid md:grid-cols-2 gap-8">
            <div>
                <img className="w-full h-80 object-cover rounded-xl" src={recipe.image} alt="" />
                <h1 className="mt-4 text-3xl font-bold">{recipe.title}</h1>
                <p className="text-gray-500">{recipe.chef}</p>
                <div className="mt-4 flex gap-3">
                    {favroite.find((r) => r.id == recipe.id) ? (
                        <button onClick={UnFavroiteHandler} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">Unfavorite</button>
                    ) : (
                        <button onClick={FavroiteHandler} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Favorite</button>
                    )}
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{recipe.desc}</p>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipe.ingr.split(',').map((i, idx) => <li key={idx}>{i.trim()}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Instructions</h3>
                        <ul className="list-decimal list-inside text-gray-700">
                            {recipe.inst.split(',').map((i, idx) => <li key={idx}>{i.trim()}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(SubmitHandler)} className="bg-white border rounded-xl p-5 h-max">
                <h2 className="text-xl font-bold mb-4">Quick Edit</h2>
                <input className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("image")} type="url" placeholder="Image url" />
                <input className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("title")} type="text" placeholder="Title" />
                <input className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("chef")} type="text" placeholder="Chef" />
                <textarea className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("desc")} placeholder="recipe description..."></textarea>
                <textarea className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("ingr")} placeholder="recipe ingredients, seperated by comma"></textarea>
                <textarea className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("inst")} placeholder="recipe instructions, seperated by comma"></textarea>
                <select className="w-full mb-4 block border rounded px-3 py-2 text-sm outline-0" {...register("category")}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="supper">Supper</option>
                    <option value="dinner">Dinner</option>
                </select>
                <div className="flex gap-3">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">Update Recipe</button>
                    <button onClick={DeleteHandler} type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm">Delete</button>
                </div>
            </form>
        </div>
    ) : (
        "Loading"
    );
};

export default Recipe;