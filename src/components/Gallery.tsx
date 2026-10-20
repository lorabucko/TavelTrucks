"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GalleryImage } from "@/lib/types";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import s from "./Gallery.module.css";

export default function Gallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [main, setMain] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const sorted = [...images].sort((a, b) => a.order - b.order);
  if (!sorted.length) return <div className={s.noImage}>No photos available</div>;
  return <section className={s.gallery} aria-label={`${name} image gallery`}>
    <Swiper modules={[Thumbs, Keyboard, Navigation, A11y]} navigation={sorted.length > 1} thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }} keyboard={{ enabled: true, onlyInViewport: true }} onSwiper={setMain} onSlideChange={swiper => setActive(swiper.activeIndex)} className={s.main}>
      {sorted.map((image, i) => <SwiperSlide key={image.id}><img src={image.original} alt={`${name}, view ${i + 1}`} fetchPriority={i === 0 ? "high" : "auto"} /></SwiperSlide>)}
    </Swiper>
    <Swiper modules={[Thumbs, A11y]} onSwiper={setThumbs} watchSlidesProgress slidesPerView={Math.min(4, sorted.length)} spaceBetween={24} className={s.thumbs}>
      {sorted.map((image, i) => <SwiperSlide key={image.id}>
        <button type="button" onClick={() => main?.slideTo(i)} aria-label={`Show photo ${i + 1} of ${sorted.length}`} aria-pressed={i === active} className={s.thumb}>
          <img src={image.thumb} alt="" loading="lazy" />
        </button>
      </SwiperSlide>)}
    </Swiper>
    <span className="visually-hidden" role="status" aria-live="polite">Photo {active + 1} of {sorted.length}</span>
  </section>;
}
