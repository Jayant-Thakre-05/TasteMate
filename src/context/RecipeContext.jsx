import { createContext, useState, useEffect } from "react"; // Import createContext and useState from react for creating context and managing state.
import api from "../api/axios";
export const recipecontext = createContext(null); // Create a context named recipecontext and set its default value to null.
const RecipeContext = (props) => {
    // Initialize state for data with a default value of an array containing a single recipe object.
    // The recipe object includes properties like id, title, ingredients, instructions, image, chef, category, and description.
    // Additionally, it retrieves recipes from local storage if available, otherwise, it defaults to an empty array.
    const [data, setdata] = useState(() => {
        try {
            const raw = window.localStorage.getItem("recipes");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    // Initialize state for favorite recipes with a default value of an array.
    // It retrieves favorite recipes from local storage if available, otherwise, it defaults to an empty array.
    const [favroite, setfavroite] = useState(() => {
        try {
            const raw = window.localStorage.getItem("favroite");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    // Fetch recipes from backend and sync to local storage
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await api.get("/api/auth/recipe/allrecipes");
                const recipes = res.data?.recipe || res.data?.data || res.data || [];
                setdata(Array.isArray(recipes) ? recipes : []);
                window.localStorage.setItem("recipes", JSON.stringify(Array.isArray(recipes) ? recipes : []));
            } catch (e) {
                // no-op: keep any local storage data for offline
            }
        };
        fetchRecipes();
    }, []);

    // CRUD helpers
    const addRecipe = async (recipe) => {
        try {
            let payload;
            let config = {};
            if (recipe instanceof FormData) {
                payload = recipe;
                config.headers = { "Content-Type": "multipart/form-data" };
            } else {
                // Convert plain object to FormData to satisfy backend (images required)
                payload = new FormData();
                Object.entries(recipe || {}).forEach(([k, v]) => {
                    if (Array.isArray(v)) {
                        v.forEach((item) => payload.append(k, item));
                    } else {
                        payload.append(k, v);
                    }
                });
                config.headers = { "Content-Type": "multipart/form-data" };
            }
            const res = await api.post("/api/auth/recipe/create", payload, config);
            const created = res.data?.recipe || res.data?.data || res.data;
            const next = [created, ...data];
            setdata(next);
            window.localStorage.setItem("recipes", JSON.stringify(next));
            return { ok: true, data: created };
        } catch (err) {
            return { ok: false, data: err.response?.data || { message: "Create failed" } };
        }
    };

    const updateRecipe = async (id, updates) => {
        try {
            const res = await api.put(`/api/auth/recipe/update/${id}`, updates);
            const updated = res.data?.updatedRecipe || res.data?.data || res.data;
            const next = data.map((r) => (r._id === id || r.id === id ? updated : r));
            setdata(next);
            window.localStorage.setItem("recipes", JSON.stringify(next));
            return { ok: true, data: updated };
        } catch (err) {
            return { ok: false, data: err.response?.data || { message: "Update failed" } };
        }
    };

    const deleteRecipe = async (id) => {
        try {
            await api.delete(`/api/auth/recipe/delete/${id}`);
            const next = data.filter((r) => r._id !== id && r.id !== id);
            setdata(next);
            window.localStorage.setItem("recipes", JSON.stringify(next));
            return true;
        } catch (err) {
            return false;
        }
    };

    // Return the context provider with the value object containing data, setdata, favroite, and setfavroite.
    // This allows child components to access these values.
    return (
        <recipecontext.Provider
            value={{ data, setdata, favroite, setfavroite, addRecipe, updateRecipe, deleteRecipe }}
        >
            {props.children}
        </recipecontext.Provider>
    );
};

export default RecipeContext;