const swiperThumb = new Swiper('.gift__swipper--thumb', {
spaceBetween: 16,
slidesPerView: "auto",
freeMode: true,
watchSlidesProgress: true,
breakpoints: {
    320: {
        spaceBetween: 12,
    },
    1141: {
        spaceBetween: 16,
    }
}
});

const swiperMain = new Swiper('.gift__swipper--card', {
spaceBetween: 20,
thumbs: {
    swiper: swiperThumb
}
});