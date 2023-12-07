const swiperThumb = new Swiper('.gift__swipper--thumb', {
spaceBetween: 16,
slidesPerView: 5,
freeMode: true,
watchSlidesProgress: true,
});

const swiperMain = new Swiper('.gift__swipper--card', {
spaceBetween: 20,
thumbs: {
    swiper: swiperThumb
}
});