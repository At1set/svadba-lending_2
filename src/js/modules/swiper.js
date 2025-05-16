import Swiper,  { Navigation, Pagination, Parallax, Autoplay } from 'swiper';
if (document.querySelector(".NameOfSlider")) {
  const NameOfSlider = new Swiper(".NameOfSlider", {
    modules: [Navigation, Pagination, Parallax, Autoplay],

    parallax: true,
    loop: true,
    loopAdditionalSlides: 1,
    watchOverflow: true,
    spaceBetween: 25,
    slidesPerView: "auto",
    observer: true,
    observeParents: true,
    preloadImages: false,
    speed: 800,
    touchRatio: 0.8,

    //Стрелки
    navigation: {
      nextEl: ".",
      prevEl: ".",
    },
    
    //Пагинация
    pagination: {
      el: ".", // Указываем класс
      clickable: true,
    },

    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },

    // breakpoints: {
    //   width: {
    //     propeties
    //   },
    // }
  })
}