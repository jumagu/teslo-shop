"use client";

import { useState } from "react";

import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions, PaginationOptions } from "swiper/types";
import {
  Thumbs,
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./ProductSlideShow.css";
import { ProductImage } from "../image/ProductImage";

interface Props {
  title: string;
  images: string[];
  inStockLabel: boolean;
}

export const ProductSlideShow = ({ title, images, inStockLabel }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  const pagination: PaginationOptions = {
    enabled: true,
    type: "bullets",
    renderBullet(index, className) {
      return `<span class="${className}"></span>`;
    },
  };

  const navigation: NavigationOptions = {
    enabled: false,
  };

  return (
    <div>
      <Swiper
        style={
          {
            "--swiper-navigation-size": "16px",
            "--swiper-navigation-sides-offset": "18px",
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#5c5e62",
          } as React.CSSProperties
        }
        spaceBetween={0}
        navigation={navigation}
        pagination={pagination}
        autoplay={{ delay: 5000 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay]}
        breakpoints={{
          960: { navigation: { enabled: true }, spaceBetween: 1 },
        }}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="relative">
            {inStockLabel && (
              <div className="out-of-stock-label-slides">Out Of Stock</div>
            )}
            <ProductImage src={image} width={2000} height={2000} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper my-[14px] !hidden xm:!block"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage src={image} width={1024} height={1024} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
