import React from 'react';
import { useEffect, useState } from 'react';
import SlideCard from './SlideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import newRequest from "../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";
import 'swiper/css';
import './Slide.scss';


const Slide = ({ currentProductId }) => {
    const [shuffledData, setShuffledData] = useState([]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => newRequest.get("/products").then(res => res.data)
    });

    useEffect(() => {
        if (!isLoading && !error && data) {
            const shuffled = [...data].sort(() => Math.random() - 0.5);
            setShuffledData(shuffled);
        }
    }, [isLoading, error, data]);

    return (
        <div className='slide'>
            <div className="container">
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={6}
                        direction="horizontal"
                        navigation={true}
                        loop={true}
                        className="mySwiper"
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {shuffledData
                        .filter(card => card._id !== currentProductId)
                        .map(card => (
                            <SwiperSlide key={card._id}>
                                <SlideCard item={card} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

            </div>
        </div>
    )
}

export default Slide;