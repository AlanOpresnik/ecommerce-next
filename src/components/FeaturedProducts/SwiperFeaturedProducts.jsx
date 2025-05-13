'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';


export default function SwiperFeaturedProducts({ products }) {
    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                spaceBetween={8}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                    },
                    320: {
                        slidesPerView: 1.5
                    },
                    640: {
                        slidesPerView: 2.5
                    },
                    768: {
                        slidesPerView: 3.5
                    },
                    1024: {
                        slidesPerView: 4.5
                    },
                    1280: {
                        slidesPerView: 5.5
                    },


                }}
                slidesPerView={6}
                loop={true}
                modules={[Pagination]}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );
}