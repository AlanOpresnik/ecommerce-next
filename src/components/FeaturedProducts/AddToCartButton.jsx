"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";

export default function AddToCartButton({ id }) {
  const handleClick = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.includes(id)) {
      cart.push(id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
    >
      <ShoppingCart size={18} className="mr-2" />
      Añadir al carrito
    </button>
  );
}
