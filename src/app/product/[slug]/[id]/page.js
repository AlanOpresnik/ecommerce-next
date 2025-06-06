import React from "react";
import { api } from "../../../../../api/api";
import ProductDetail from "@/components/product-detail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getServerSession } from "@/lib/getServerSession";

export async function generateMetadata({ params }) {
  const product = await api.getProductById(params.id);

  return {
    title: product?.title || "Producto",
    description: product?.description?.slice(0, 160) || "Detalles del producto",
  };
}

const ProductPage = async ({ params }) => {
  const params2 = await params;
  if (!params2) return <div>Loading...</div>;
  const product = await api.getProductById(params2.id);

  //ESTE ES UN EJEMPLO DE COMO OBTENER LA SESION DEL USUARIO DEL LADO DEL SERVIDOR
  const session = await getServerSession();
  console.log(session);

  return (
    <main className="container px-4 py-8 mx-auto">
      <ProductDetail product={product} />
    </main>
  );
};

export default ProductPage;
