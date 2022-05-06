import React, { PropsWithChildren } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import { Navigation } from 'swiper';

const Carousel: React.FC<PropsWithChildren<any>> = ({points, children }) => {
 
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={1}
        navigation={true}
        breakpoints={points}
        modules={[Navigation]}
        className="mySwiper"
      >
        {children &&
          children.map((item: any, index: any) => (
            <SwiperSlide key={index}>
                {item}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Carousel;
