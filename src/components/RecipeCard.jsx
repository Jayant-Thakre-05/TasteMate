import { Link } from "react-router-dom";

const RecipeCard = (props) => {
    const { id, image, title, chef, desc } = props.recipe;
    return (
        <Link to={`/recipes/details/${id}`} className="group rounded-xl overflow-hidden border bg-white hover:shadow-xl transition block">
            <div className="relative">
                <img className="w-full h-48 object-cover group-hover:scale-105 transition" src={image} alt="" />
                <span className="absolute top-2 left-2 text-xs bg-white/90 rounded-full px-2 py-1">Popular</span>
            </div>
            <div className="p-3">
                <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
                <p className="text-sm text-gray-500 truncate">{chef}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{desc.slice(0, 100)}...</p>
            </div>
        </Link>
    );
};

export default RecipeCard;
