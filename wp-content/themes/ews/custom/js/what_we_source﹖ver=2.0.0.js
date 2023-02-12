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