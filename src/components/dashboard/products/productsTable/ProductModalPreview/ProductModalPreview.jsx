import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function ProductModalPreview({
  openPreview,
  setOpenPreview,
  product,
}) {
  return (
    <Dialog open={openPreview} onOpenChange={setOpenPreview}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-xl font-semibold">
              Vista Previa del Producto
            </DialogTitle>
            <DialogClose className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted">
              <span className="sr-only">Cerrar</span>
            </DialogClose>
          </div>
        </DialogHeader>

        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
            {/* Imágenes del producto */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg aspect-square bg-muted">
                <img
                  src={product.images[0].secure_url || "/placeholder.svg"}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden border rounded-md cursor-pointer aspect-square hover:border-primary"
                  >
                    <img
                      src={img.secure_url || "/placeholder.svg"}
                      alt={`${product.title} - vista ${i + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{product.title}</h2>
              </div>
              <div className="flex flex-col justify-between pb-1 border-b">
                <span className="font-semibold text-black">Stock:</span>
                <span
                  className={` font-semibold
                    ${product.stock > 10 ? "text-green-600" : "text-red-600"}`}
                >
                  {product.stock} unidades
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Descripción</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Detalles</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col justify-between pb-1 border-b">
                    <span className="text-muted-foreground">Categoría:</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                  <div className="flex flex-col justify-between pb-1 border-b">
                    <span className="text-2xl font-bold">${product.price}</span>
                  </div>
                </div>
              </div>
            </div>
        ) : (
          <div className="p-6 text-sm text-muted-foreground">
            Cargando producto...
          </div>
        )}

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Vista previa del artículo como aparecerá en la tienda
            </div>
            <div className="flex gap-2">
              {product && (
                <Link href={"/"}>
                  <Button variant="outline">Editar Artículo</Button>
                </Link>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
