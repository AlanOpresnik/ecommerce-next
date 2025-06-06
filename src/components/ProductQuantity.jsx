'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("42");

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium">Cantidad</h2>
      </div>
      <div className="flex items-center border border-gray-200 rounded-lg w-fit">
        <Button
          variant="ghost"
          size="icon"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className="h-12 rounded-none"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 font-medium text-center">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={increaseQuantity}
          className="h-12 rounded-none"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantity;
