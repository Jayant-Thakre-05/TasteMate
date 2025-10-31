import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RecipeContext from "./context/RecipeContext.jsx";
import AuthContext from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <RecipeContext>
        <AuthContext>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </AuthContext>
    </RecipeContext>
);
