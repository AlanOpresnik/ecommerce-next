"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButtonComponent({ prod, setProductsInCart }) {
  const router = useRouter();
  const onDelete = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const updatedCart = cart.filter((item) => item !== prod._id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setProductsInCart(updatedCart);

      router.refresh();
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };
  return (
    <Button
      onClick={onDelete}
      variant="ghost"
      size="sm"
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
