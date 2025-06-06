import React from 'react'
import { api } from '../../../api/api'
import ProductCard from './ProductCard'

const FeaturedProducts = async () => {
    const products = await api.getAllProducts()
    return (
        <div className='mt-12'>
            <p className='text-3xl font-bold'>Productos Destacados</p>
            <div className='flex gap-4'>
                {products.map((p) => (
                    <div key={p._id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProducts