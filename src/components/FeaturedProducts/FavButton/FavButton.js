"use client";
import React, { use, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { UseFavoritesContext } from "@/context/FavoritesContext/FavoritesContext";

const FavButton = ({ productId }) => {
  const { fetchFavs, onClickFavs, getFavorites, userId, favs } =
    UseFavoritesContext();

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (favs && productId) {
      setIsWishlisted(favs.includes(productId));
    }
  }, [favs, productId]);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    fetchFavs();
  }, [userId, productId]);

  const handleToggle = async () => {
    await onClickFavs(productId);
    fetchFavs(); 
  };

  return (
    <button
      onClick={() => handleToggle(productId)}
      className="absolute z-40 p-2 bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100"
    >
      <Heart
        size={18}
        className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
    </button>
  );
};

export default FavButton;
