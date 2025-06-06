"use client";
import { useSession } from "@/lib/auth-client";
import { api } from "../../../../../api/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseFavoritesContext } from "@/context/FavoritesContext/FavoritesContext";

export default function FavoristList({ products }) {
  const session = useSession();
  if (!session) {
    return <div>Inicia sesion...</div>;
  }
  const userId = session.data.user.id;

  if (!userId) {
    return <div>Inicia sesion...</div>;
  }
  const {
    onClickFavs,
    fetchFavs,
    favs,
    fetchProductsInFavorites,
    favProducts
  } = UseFavoritesContext();
  
  useEffect(() => {
    fetchProductsInFavorites();
  }, [favs]);

  const handleToggle = async (productId) => {
    await onClickFavs(productId);
    fetchFavs(); 
  };

  return (
    <div>
      <div className="flex flex-col gap-12">
        {favProducts.length > 0 &&
          favProducts.map((product) => (
            <div
              className="relative flex justify-between list-none "
              key={product._id}
            >
              <div className="flex gap-4 ">
                <Image
                  src={product.images[0].secure_url}
                  width={100}
                  height={100}
                  className="max-h-[100px] object-cover rounded-md"
                  alt={product.title}
                />
                <div>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="absolute top-[-10px] left-[-10px]">
                    <Heart
                      onClick={() => handleToggle(product._id)}
                      className="text-red-500 fill-red-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
