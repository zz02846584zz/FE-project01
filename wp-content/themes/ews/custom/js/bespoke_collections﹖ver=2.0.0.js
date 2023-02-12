$(window).on("load", function () {
  bannerWaveUpSet()
  bannerWaveUpStart()
  swiperInit()
})

function swiperInit() {
  const swiper = []
  const swiperContainer = $('.swiper-container')
  swiperContainer.each((index, item) => {
    const slidesPerView = 1

    swiper.push(new Swiper(item, {
      slidesPerView: slidesPerView,
      spaceBetween: 10,
      freeMode: 1025 > window.innerWidth > 767 || window.innerWidth < 768 ? true : false,
      navigation: {
        nextEl: $(item).parent().parent().find('.swiper-button-next'),
        prevEl: $(item).parent().parent().find('.swiper-button-prev'),
      },
    }))
  })
}

$(window).on('resize', function(){
  swiperInit();     
});