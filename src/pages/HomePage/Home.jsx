import AllProduct from "./AllProduct/AllProduct";
import ProductsSlider from "./ProductsSlider/ProductsSlider";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <AllProduct></AllProduct>
            <ProductsSlider></ProductsSlider>
        </div>
    );
};

export default Home;