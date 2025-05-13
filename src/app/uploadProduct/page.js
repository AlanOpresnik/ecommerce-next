import ProductForm from '@/components/product-form'
import PruebaForm from '@/components/dashboard/products/NewProductForm/prueba-form'
import React from 'react'

const page = () => {
    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Cargar Nuevo Producto</h1>
            <PruebaForm />
        </main>
    )
}

export default page