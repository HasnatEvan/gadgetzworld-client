import ContactIcon from "../../Shared/ContactIcon";
import AllProduct from "./AllProduct/AllProduct";
import Banner from "./Banner/Banner";
import ProductsSlider from "./ProductsSlider/ProductsSlider";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Banner></Banner>
            <ProductsSlider></ProductsSlider>
            <AllProduct></AllProduct>
            <ContactIcon></ContactIcon>
        </div>
    );
};

export default Home;