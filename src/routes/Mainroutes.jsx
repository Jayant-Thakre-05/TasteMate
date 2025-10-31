import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Favroite from "../pages/Favroite";
import About from "../pages/About";
import Create from "../pages/Create";
import Update from "../pages/Update";
import PageNotFound from "../pages/PageNotFound";
import Recipe from "../pages/Recipe";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/create-recipe" element={<Create />} />
                <Route path="/recipes/details/:id" element={<Recipe />} />
                <Route path="/recipes/update-recipe/:id" element={<Update />} />
                <Route path="/favroite" element={<Favroite />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Mainroutes;
