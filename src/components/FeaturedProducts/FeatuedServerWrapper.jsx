import { api } from "../../../api/api";
import SwiperFeaturedProducts from "./SwiperFeaturedProducts";

const FeatuedServerWrapper = async () => {
    const products = await api.getAllProducts();
    return (
        <div className="mt-12 ">
            <p className='text-3xl font-bold mb-12'>Productos Destacados</p>
            <SwiperFeaturedProducts products={products} />
        </div>
    )
}

export default FeatuedServerWrapper;
