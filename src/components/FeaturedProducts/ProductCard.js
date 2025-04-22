import { ShoppingCart, Heart, Star } from 'lucide-react';
import FavButton from './FavButton/FavButton';
import QuantityButton from './quiantityButton/QuantityButton';
import ImageProduct from './ImageProduct/ImageProduct';
import Link from 'next/link';

export default function ProductCard({ product }) {

    return (
        <div className="w-[300px] relative rounded-lg overflow-hidden shadow-lg bg-white">
            {/* Badge */}
            <div className='absolute z-30 top-0 right-0'>
                <FavButton />
            </div>
            <Link href={`/product/${product.slug}/${product._id}`}>
                <div className="relative">
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -20%
                    </span>

                    {/* Wishlist button */}

                    {/* Product Image */}
                    <ImageProduct images={product.images} />
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                            <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">{product.description}</p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={`${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(42)</span>
                    </div>
                    {/* Quantity */}
                    <QuantityButton />

                    <div>
                        <p className=" mb-6 font-bold text-xl text-gray-500">${product.price}</p>
                    </div>
                    {/* Add to cart button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center">
                        <ShoppingCart size={18} className="mr-2" />
                        Añadir al carrito
                    </button>
                </div>
            </Link>
        </div >
    );
}