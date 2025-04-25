import React from 'react'
import { api } from '../../../../../api/api'
import ProductDetail from '@/components/product-detail'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getServerSession } from '@/lib/getServerSession'

const ProductPage = async ({ params }) => {
    const params2 = await params
    if (!params2) return <div>Loading...</div>
    const product = await api.getProductById(params2.id)


    //ESTE ES UN EJEMPLO DE COMO OBTENER LA SESION DEL USUARIO DEL LADO DEL SERVIDOR
    const session = await getServerSession()
    console.log(session)


    return (
        <main className="container mx-auto py-8 px-4">
            <ProductDetail product={product} />
        </main>
    )
}

export default ProductPage