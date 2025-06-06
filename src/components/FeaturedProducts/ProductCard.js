import { ShoppingCart, Heart, Star } from "lucide-react";
import FavButton from "./FavButton/FavButton";
import QuantityButton from "./quiantityButton/QuantityButton";
import ImageProduct from "./ImageProduct/ImageProduct";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] relative rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Badge */}
      <div className="absolute top-0 right-0 z-30">
        <FavButton productId={product._id} />
      </div>
      <Link href={`/product/${product.slug}/${product._id}`}>
        <div className="relative">
          <span className="absolute px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-4 left-4">
            -20%
          </span>

          {/* Wishlist button */}

          {/* Product Image */}
          <ImageProduct images={product.images} />
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="mb-1 text-sm text-gray-500">{product.category}</p>
              <h3 className="mb-1 text-lg font-bold">{product.title}</h3>
              <p className="mb-1 text-sm text-gray-500">
                {product.description}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">(42)</span>
          </div>
          {/* Quantity */}
          <QuantityButton />

          <div>
            <p className="mb-6 text-xl font-bold text-gray-500 ">
              ${product.price}
            </p>
          </div>
          {/* Add to cart button */}
          <AddToCartButton id={product._id} />
        </div>
      </Link>
    </div>
  );
}
