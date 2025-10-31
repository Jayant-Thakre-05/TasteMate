import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../context/AuthContext";

const Create = () => {
    const navigate = useNavigate();
    const { addRecipe } = useContext(recipecontext);
    const { user } = useContext(authcontext);
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const SubmitHandler = async (recipe) => {
        // Client-side validations to match backend requirements
        if (!user?._id) {
            toast.error("Please log in to create a recipe");
            return;
        }
        const hasImages = recipe.images && recipe.images.length > 0;
        if (!hasImages) {
            toast.error("Please select at least one image");
            return;
        }
        if (!recipe.title?.trim()) {
            toast.error("Title is required");
            return;
        }
        if (!recipe.description?.trim()) {
            toast.error("Description is required");
            return;
        }
        if (!recipe.type?.trim()) {
            toast.error("Type is required");
            return;
        }
        const ingListPre = (recipe.ingredients || "").split(",").map((s) => s.trim()).filter(Boolean);
        const instListPre = (recipe.instructions || "").split(",").map((s) => s.trim()).filter(Boolean);
        if (ingListPre.length === 0) {
            toast.error("Please add at least one ingredient");
            return;
        }
        if (instListPre.length === 0) {
            toast.error("Please add at least one instruction");
            return;
        }

        // Build FormData to satisfy backend (multer expects images field)
        const fd = new FormData();
        if (recipe.images && recipe.images.length) {
            Array.from(recipe.images).forEach((file) => fd.append("images", file));
        }
        fd.append("title", recipe.title || "");
        // Chef must be user ObjectId per backend schema
        if (user?._id) {
            fd.append("chef", user._id);
        }
        // Type must match enum [Breakfast, Lunch, Dinner, Snack, Dessert]
        const mappedType = (recipe.type || "").trim();
        const capitalizedType = mappedType
            ? mappedType.charAt(0).toUpperCase() + mappedType.slice(1).toLowerCase()
            : "";
        fd.append("type", capitalizedType);
        // Convert comma-separated inputs into multiple fields for arrays
        const ingList = ingListPre;
        const instList = instListPre;
        if (ingList.length) {
            ingList.forEach((i) => fd.append("ingredients", i));
        }
        if (instList.length) {
            instList.forEach((i) => fd.append("instructions", i));
        }
        const res = await addRecipe(fd);
        if (res?.ok) {
            toast.success("New recipe created!");
            reset();
            navigate(-1);
        } else {
            toast.error(res?.data?.message || "Failed to create recipe");
        }
    };
    return (
        <form
            onSubmit={handleSubmit(SubmitHandler)}
            className="text-xl mt-5 p-5 shadow"
        >
            <div className="mb-5">
                <label className="block text-sm mb-1">Images</label>
                <input
                    className="block border p-2 w-full"
                    {...register("images")}
                    type="file"
                    multiple
                    accept="image/*"
                />
            </div>

            <input
                className="mb-5 block border-b p-1 outline-0"
                {...register("title")}
                type="text"
                placeholder="Title"
            />
            {/* chef is taken from logged in user; no manual input */}

            <textarea
                className="mb-5 block border-b p-1 outline-0"
                {...register("description")}
                placeholder="Recipe description..."
            ></textarea>
            <textarea
                className="mb-5 block border-b p-1 outline-0"
                {...register("ingredients")}
                placeholder="Recipe ingredients, separated by comma"
            ></textarea>
            <textarea
                className="mb-5 block border-b p-1 outline-0"
                {...register("instructions")}
                placeholder="Recipe instructions, separated by comma"
            ></textarea>

            <select
                className="mb-5 block border-b p-1 outline-0"
                {...register("type")}
            >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
            </select>

            <button className="bg-orange-400 px-4 py-2 rounded text-white font-semibold">
                Create Recipe
            </button>
        </form>
    );
};

export default Create;
