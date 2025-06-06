"use client";
import { FavoritesProvider } from "@/context/FavoritesContext/FavoritesContext";

const WrapperProviders = ({ children }) => {
  return (
    <>
      <FavoritesProvider>{children}</FavoritesProvider>
    </>
  );
};
export default WrapperProviders;
