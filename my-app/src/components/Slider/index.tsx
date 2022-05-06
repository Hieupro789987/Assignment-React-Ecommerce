import React, { PropsWithChildren } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import './style.css';

const Slider: React.FC<PropsWithChildren<any>> = ({ data, module }) => {
  return (
    <React.Fragment>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        
        modules={module}
        className="mySwiper"
      >
        {data &&
          data.map((item: any) => (
            <SwiperSlide key={item.id}>
              <img src={item.url} alt={item.url} style={{ width: '100%', borderRadius: '7px' }} />
            </SwiperSlide>
          ))}
      </Swiper>
    </React.Fragment>
  );
};

export default Slider;
