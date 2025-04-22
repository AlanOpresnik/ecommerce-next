"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ProductDetail({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("Negro")
  const [selectedSize, setSelectedSize] = useState("42")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Carrusel de imágenes (izquierda) */}
      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={product.images[currentImageIndex].secure_url || "/placeholder.svg"}
            alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority />
        </div>

        {/* Controles del carrusel */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity"
          onClick={prevImage}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Imagen anterior</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity"
          onClick={nextImage}>
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Imagen siguiente</span>
        </Button>

        {/* Miniaturas */}
        <div className="flex justify-center gap-3 mt-6">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 rounded-lg overflow-hidden transition-all duration-200 ${index === currentImageIndex ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                }`}
              onClick={() => setCurrentImageIndex(index)}>
              <Image
                src={image.secure_url || "/placeholder.svg"}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover" />
            </button>
          ))}
        </div>
      </div>
      {/* Datos del producto (derecha) */}
      <div className="space-y-8 py-2">
        {/* Nombre y precio */}
        <div>
          <h1 className="text-3xl font-medium tracking-tight">{product.title}</h1>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(5)
                      ? "fill-yellow-400 text-yellow-400"
                      : i < product.rating
                        ? "fill-yellow-400 text-yellow-400 fill-half"
                        : "text-gray-200"
                      }`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">(120 reseñas)</span>
            </div>
            <span className="text-3xl font-semibold">${product.price}</span>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <Separator className="my-6" />

        {/* Selección de color */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-medium">Color</h2>
            <span className="text-sm text-gray-500">Seleccionado: {selectedColor}</span>
          </div>
          {/* <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`px-4 py-2 rounded-full border transition-all ${selectedColor === color
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setSelectedColor(color)}>
                {color}
              </button>
            ))}
          </div>}
        </div>

        {/* Selección de talla 
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Talla</h2>
              <span className="text-sm text-gray-500">Guía de tallas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 rounded-md flex items-center justify-center transition-all ${selectedSize === size
                    ? "bg-primary text-white font-medium"
                    : "border border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
          </div>
*/}
          {/* Cantidad y botón de compra */}
          <div className="space-y-6 pt-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-medium">Cantidad</h2>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="rounded-none h-12">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  className="rounded-none h-12">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-14 text-base font-medium rounded-xl">Añadir al carrito</Button>
              <Button
                variant="outline"
                className="flex-1 h-14 text-base font-medium rounded-xl">
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
