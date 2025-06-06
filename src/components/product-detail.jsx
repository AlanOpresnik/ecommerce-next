
import {Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductDetailCarrusel from "./Product-detail-carrusel";
import ProductQuantity from "./ProductQuantity";

export default function ProductDetail({ product }) {

  return (
    <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
      {/* Carrusel de imágenes (izquierda) */}
      <ProductDetailCarrusel product={product} />
      {/* Datos del producto (derecha) */}
      <div className="py-2 space-y-8">
        {/* Nombre y precio */}
        <div>
          <h1 className="text-3xl font-medium tracking-tight">
            {product.title}
          </h1>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(5)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < product.rating
                        ? "fill-yellow-400 text-yellow-400 fill-half"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(120 reseñas)</span>
            </div>
            <span className="text-3xl font-semibold">${product.price}</span>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <p className="leading-relaxed text-gray-600">{product.description}</p>
        </div>

        <Separator className="my-6" />

        {/* Selección de color */}
        <div>
         
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
            <div className="flex items-center justify-between mb-3">
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
          <div className="pt-4 space-y-6">
            <ProductQuantity/>

            <div className="flex gap-4">
              <Button className="flex-1 text-base font-medium h-14 rounded-xl">
                Añadir al carrito
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-base font-medium h-14 rounded-xl"
              >
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
