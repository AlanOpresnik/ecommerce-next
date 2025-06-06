"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function QuantityProduct({prod}) {
  const [quantity, setQuantity] = useState(1);
  const [errorStock, setErrorStock] = useState("");

  const incremetQuiantity = () => {
    console.log(prod.stock);
    if (prod.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      setErrorStock("Superaste la cantidad de productos disponibles");
      setTimeout(() => {
        setErrorStock("");
      }, 2000);
      return;
    }
  };

  const decrementQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };
  return (
    <div className="flex items-center gap-2">
      <Button onClick={decrementQuantity} variant="outline" size="sm">
        <Minus className="w-3 h-3" />
      </Button>
      <span className="w-12 font-medium text-center">{quantity}</span>
       <span className="text-red-500">{errorStock}</span>
      <Button onClick={incremetQuiantity} variant="outline" size="sm">
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
