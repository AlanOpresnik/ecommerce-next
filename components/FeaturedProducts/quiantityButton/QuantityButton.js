'use client'
import React, { useState } from 'react'

const QuantityButton = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
    return (
        <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">Cantidad:</p>
            <div className="flex items-center border border-gray-300 rounded-md">
                <button
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                    -
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default QuantityButton