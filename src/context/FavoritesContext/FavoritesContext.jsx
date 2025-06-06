"use client";

import { useSession } from "@/lib/auth-client";
import axios from "axios";
import { api } from "../../../api/api";
import { useRouter } from "next/navigation";

const { createContext, useState, useContext } = require("react");

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const user = useSession();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [favs, setFavs] = useState([]);
  const [favProducts, setFavProducts] = useState([]);
  const userId = user.data?.user.id;
  const router = useRouter();
  if (!userId) {
    return <div></div>;
  }

  async function getFavorites() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/favs/${userId}`
    );
    console.log(res);
    return res.data;
  }

  async function toggleUserFavs(productId) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/toggleFav`,
      {
        userId,
        productId,
      }
    );
    return res.data;
  }

  async function fetchFavs(productId) {
    const res = await getFavorites(user.data.user.id);
    setFavs(res.favorites);
    const favIds = res.favorites.map((fav) => fav);
    setIsWishlisted(favIds.includes(productId));
  }

  const onClickFavs = async (productId) => {
    try {
      const data = await toggleUserFavs(productId);
      const favIds = data.favorites.map((fav) => fav);
      setIsWishlisted(favIds.includes(productId));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

    const fetchProductsInFavorites = async () => {
      const products = await api.getAllProducts();
      const { favorites } = await api.getFavorites(userId);
      const products2 = products.filter((prod) => favorites.includes(prod._id));
      setFavProducts(products2);
      router.refresh();
    };

  return (
    <FavoritesContext.Provider
      value={{
        isWishlisted,
        setIsWishlisted,
        favs,
        setFavs,
        fetchFavs,
        onClickFavs,
        getFavorites,
        toggleUserFavs,
        favProducts,
        fetchProductsInFavorites,
        userId: user.data?.user.id,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const UseFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "UseFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
