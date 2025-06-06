import { api } from "../../../api/api";
import SwiperFeaturedProducts from "./SwiperFeaturedProducts";

const FeatuedServerWrapper = async () => {
  const products = await api.getAllProducts();
  return (
    <div className="mt-12 ">
      <p className="mb-12 text-3xl font-bold">Productos Destacados</p>
        <SwiperFeaturedProducts products={products} />
    </div>
  );
};

export default FeatuedServerWrapper;
