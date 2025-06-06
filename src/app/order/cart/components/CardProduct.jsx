import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import QuantityProduct from "./QuantityProduct";
import DeleteButtonComponent from "./DeleteButtonComponent";

export default function CardProduct({ prod, setProductsInCart }) {
  return (
    <Card key={prod._id}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <Image
              src={prod.images[0].secure_url || "/no-image.png"}
              alt={prod.title}
              width={120}
              height={120}
              className="object-cover rounded-lg"
            />
            {prod.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <span className="text-xs font-medium text-white">
                  Sin stock
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{prod.title}</h3>
                <p className="text-sm text-gray-600">{prod.description}</p>
              </div>
              <DeleteButtonComponent setProductsInCart={setProductsInCart} prod={prod} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${prod.price}</span>
              </div>

              <QuantityProduct prod={prod} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
