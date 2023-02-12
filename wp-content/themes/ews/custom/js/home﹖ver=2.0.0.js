$(document).ready(function () {
  swiperInit()
  gsapInit()
})

function swiperInit() {
  const windowWidth = window.innerWidth
  const view = windowWidth > 767 ? 2.25
  : windowWidth > 599 ? 2.025
  : window.innerHeight < 480 ? 1.8
  : windowWidth > 350 ? 1.25
  : 1.15

  var section_2_swiper = new Swiper('.section-2 .swiper-container', {
    slidesPerView: view,
    // spaceBetween: 0.0533 * windowWidth,
    spaceBetween: 20,
    centeredSlides: true,
    navigation: {
      nextEl: '.section-2 .swiper-button-next',
      prevEl: '.section-2 .swiper-button-prev',
    },
  });

  if(window.innerHeight < 481) {
    section_2_swiper.slideTo(1, false, false);
  }

  var section_4_swiper = new Swiper('.section-4 .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    navigation: {
      nextEl: '.section-4 .swiper-button-next',
      prevEl: '.section-4 .swiper-button-prev',
    },
  });
}

function gsapInit() {
  gsap.set('.header', { y: '-100%' })
}