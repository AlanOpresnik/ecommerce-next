import React from 'react'
import { api } from '../../../../../api/api'
import ProductDetail from '@/components/product-detail'

const ProductPage = async ({ params }) => {
    const params2 = await params
    if (!params2) return <div>Loading...</div>
    const product = await api.getProductById(params2.id)
    console.log(product)
    return (
        <main className="container mx-auto py-8 px-4">
            <ProductDetail product={product} />
        </main>
    )
}

export default ProductPage