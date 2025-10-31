import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authcontext } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(authcontext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    return (
        <div className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-black text-purple-800">TasteMate</Link>
                    <nav className="hidden md:flex items-center gap-6 text-base font-medium">
                        <NavLink className={(e) => (e.isActive ? "text-purple-800" : "text-gray-700 hover:text-purple-800")} to="/">Home</NavLink>
                        <NavLink className={(e) => (e.isActive ? "text-purple-800" : "text-gray-700 hover:text-purple-800")} to="/recipes">Recipes</NavLink>
                        <NavLink className={(e) => (e.isActive ? "text-purple-800" : "text-gray-700 hover:text-purple-800")} to="/about">About</NavLink>
                        <NavLink className={(e) => (e.isActive ? "text-purple-800" : "text-gray-700 hover:text-purple-800")} to="/favroite">Favroite</NavLink>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <input placeholder="Search dishes or chefs" className="hidden md:block w-72 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    {isAuthenticated ? (
                        <>
                            <span className="hidden sm:block text-sm text-gray-700">{user?.name || user?.email}</span>
                            <button onClick={onLogout} className="bg-purple-700 text-white rounded-full px-4 py-2 text-sm hover:bg-purple-800">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm px-4 py-2">Login</Link>
                            <Link to="/register" className="text-sm bg-purple-700 text-white rounded-full px-4 py-2 hover:bg-purple-800">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
