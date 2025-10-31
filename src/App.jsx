import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="font-thin px-[10%]">
            <Navbar />
            <Mainroutes />
            <Footer />
        </div>
    );
};

export default App;
