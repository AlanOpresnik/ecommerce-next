'use client'
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetailCarrusel = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };


  return (
    <div className="relative">
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          src={
            product.images[currentImageIndex].secure_url || "/placeholder.svg"
          }
          alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-all duration-300"
          priority
        />
      </div>

      {/* Controles del carrusel */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute transition-opacity -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 opacity-80 hover:opacity-100"
        onClick={prevImage}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="sr-only">Imagen anterior</span>
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute transition-opacity -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 opacity-80 hover:opacity-100"
        onClick={nextImage}
      >
        <ChevronRight className="w-5 h-5" />
        <span className="sr-only">Imagen siguiente</span>
      </Button>

      {/* Miniaturas */}
      <div className="flex justify-center gap-3 mt-6">
        {product.images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 rounded-lg overflow-hidden transition-all duration-200 ${
              index === currentImageIndex
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.secure_url || "/placeholder.svg"}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailCarrusel;
