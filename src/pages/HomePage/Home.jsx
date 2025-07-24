import ContactIcon from "../../Shared/ContactIcon";
import AllProduct from "./AllProduct/AllProduct";
import Banner from "./Banner/Banner";
import Marquee from "./Marquee/Marquee";
import ProductsSlider from "./ProductsSlider/ProductsSlider";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Banner></Banner>
            <Marquee></Marquee>
            <ProductsSlider></ProductsSlider>
            <AllProduct></AllProduct>
            <ContactIcon></ContactIcon>
        </div>
    );
};

export default Home;