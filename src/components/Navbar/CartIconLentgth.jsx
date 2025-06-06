"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CartIconLentgth() {
  const [carrito, setCarrito] = useState([]);
  const cart = localStorage.getItem("cart");
  useEffect(() => {
    setCarrito(JSON.parse(cart));
  }, [cart]);

  return (
    <div className="relative">
      <Link href={"/order/cart"}>
        <ShoppingBag className="w-5 h-5 font-light text-white" />
      </Link>
      <div className="absolute top-[-5px] right-[-6px] flex items-center justify-center p-2 w-3 h-3 text-xs bg-white rounded-full">
        {carrito && carrito.length ? carrito.length : 0}
      </div>
    </div>
  );
}
