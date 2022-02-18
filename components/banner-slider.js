import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerSlider({ children, banners }) {
  return (
    <div className="swiper-container-banner-slider">
      <style jsx global>{`
        .swiper-container-banner-slider {
          padding: 1.5rem 0;
          width: 100%;
          .swiper {
            padding: 0 1.5rem !important;
            margin: auto;
            height: 40vw;
            img {
              height: 100%;
              width: 100%;
              border-radius: 1.5rem;
            }
            @media (min-width: 1024px) {
              height: 10vw;
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              height: 18vw;
            }
          }
        }
      `}</style>
      <Swiper
        loop={true}
        autoplay={true}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {banners.map((item) => (
          <SwiperSlide>
            <a
              href={item.link}
              key={`banner-slide-item-${item.id}`}
              target="_blank"
              className="block w-full h-full"
            >
              <img src={item.image} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
