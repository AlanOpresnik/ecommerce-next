'use client'
import { useState } from 'react';

const ImageProduct = ({ images }) => {
    const [imageSrc, setImageSrc] = useState(images[0]?.secure_url || 'https://via.placeholder.com/300');
    const [fade, setFade] = useState(false);

    const handleMouseEnter = () => {
        setFade(true); // baja opacidad
        setTimeout(() => {
            setImageSrc(images[1]?.secure_url || imageSrc);
            setFade(false); // vuelve opacidad
        }, 300); // tiempo que dura el fade out antes de cambiar
    };

    const handleMouseLeave = () => {
        setFade(true);
        setTimeout(() => {
            setImageSrc(images[0]?.secure_url || imageSrc);
            setFade(false);
        }, 300);
    };

    return (
        <img
            src={imageSrc}
            alt="imagen producto"
            className={`w-full h-64 object-cover transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );
};

export default ImageProduct;