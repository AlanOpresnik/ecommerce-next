import HeaderSideBar from "@/components/dashboard/sidebar/HeaderSideBar"
import ProductsTable from "@/components/dashboard/products/productsTable/ProductsTable"
import { api } from "../../../api/api";

export default async function ProductsPage() {
    const products = await api.getAllProducts()
  return (
    <div className="w-[88vw] bg-background">

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <HeaderSideBar />

        {/* Contenido de la página de productos */}
        <main className="flex-1 p-4 space-y-6 md:p-6">
          <div
            className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
              <p className="text-muted-foreground">Gestiona el inventario y los productos de tu tienda</p>
            </div>
          </div>

          {/* Tabla de productos */}
          <ProductsTable products={products} />
        </main>
      </div>
    </div>
  );
}
