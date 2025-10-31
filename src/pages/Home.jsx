import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";

const Home = () => {
    const navigate = useNavigate();
    const { data } = useContext(recipecontext);
    const featured = data.slice(0, 4);

    return (
        <div>
            <section className="mt-6 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-orange-400 text-white">
                <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black leading-tight">Discover the best recipes around you</h1>
                        <p className="mt-4 text-white/90 text-lg">From quick bites to gourmet meals—search, save, and cook your favorites.</p>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => navigate('/recipes')} className="bg-white text-purple-700 rounded-full px-6 py-3 font-semibold hover:bg-white/90">Explore Recipes</button>
                            <Link to="/recipes/create-recipe" className="rounded-full border border-white/70 px-6 py-3 font-semibold hover:bg-white/10">Share a Recipe</Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <img className="w-full h-72 object-cover rounded-xl shadow-lg shadow-black/20" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop" alt="food hero" />
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 mt-10">
                <h2 className="text-2xl font-bold mb-4">Browse by Categories</h2>
                <div className="flex flex-wrap gap-3">
                    {['Breakfast','Lunch','Supper','Dinner'].map((c) => (
                        <button key={c} onClick={() => navigate('/recipes')} className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100">{c}</button>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 mt-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Trending dishes</h2>
                    <Link to="/recipes" className="text-purple-700 font-medium">See all</Link>
                </div>
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                    {featured.map((r) => {
                        const rid = r._id || r.id;
                        const img = r.image || (Array.isArray(r.images) ? r.images[0] : undefined) || "";
                        return (
                        <Link key={rid} to={`/recipes/details/${rid}`} className="group rounded-xl overflow-hidden border hover:shadow-lg transition">
                            <img src={img} alt="" className="h-44 w-full object-cover group-hover:scale-105 transition" />
                            <div className="p-3">
                                <h3 className="font-semibold text-gray-800 truncate">{r.title}</h3>
                                <p className="text-sm text-gray-500 truncate">{r.chef}</p>
                            </div>
                        </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;
