'use client'
import React, { useState } from 'react'
import { Heart } from 'lucide-react';
const FavButton = () => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    return (
        <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
            <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
    )
}

export default FavButton