import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authcontext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useContext(authcontext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await login(email, password);
        if (!res.ok) {
            toast.error(res.message || "Login failed");
            return;
        }
        toast.success("Logged in successfully");
        navigate("/", { replace: true });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-lg bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-purple-700 text-white rounded p-2 hover:bg-purple-800">
                    Login
                </button>
            </form>
            <p className="mt-4 text-sm">
                Don't have an account? <Link className="text-purple-700 underline" to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
