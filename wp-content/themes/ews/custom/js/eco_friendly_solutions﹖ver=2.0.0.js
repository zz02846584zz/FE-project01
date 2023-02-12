$(window).on("load", function() {
  bannerWaveUpSet()
  bannerWaveUpStart()
  swiperInit()
  clickInit()
})

function swiperInit() {
  const swiper = []
  const swiperContainer = $('.swiper-container')
  swiperContainer.each((index, item) => {
    if ($(item).hasClass('special')) {
      const slidesPerView =
        window.innerHeight < 480 && window.innerWidth < 768 ? 3
        : window.innerWidth > 1480 ? 3
          : window.innerWidth > 1280 ? 2.4
          : window.innerWidth > 1024 ? 1.8
            : window.innerWidth > 1000 ? 2.35
            : window.innerWidth > 979 ? 2.25
            : window.innerWidth > 833 ? 2.2
            : window.innerWidth > 767 ? 1.9
            : window.innerWidth > 480 ? 2.35
            : 1.6

      const spaceBetween =
        window.innerWidth > 1024 ? 10
          : window.innerWidth > 767 ? 10
            : 10

      swiper.push(new Swiper(item, {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        navigation: {
          nextEl: $(item).parent().find('.swiper-button-next'),
          prevEl: $(item).parent().find('.swiper-button-prev'),
        }
      }))
    } else {
      const slidesPerView =
      window.innerHeight < 480 && window.innerWidth < 768 ? 3
      : window.innerWidth > 767 ? 3
      : window.innerWidth > 480 ? 2.35
      : 1.6

      const spaceBetween =
        window.innerWidth > 1024 ? 10
          : window.innerWidth > 767 ? 10
            : 10

      swiper.push(new Swiper(item, {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        navigation: {
          nextEl: $(item).parent().find('.swiper-button-next'),
          prevEl: $(item).parent().find('.swiper-button-prev'),
        },
      }))
    }
  })
}

function clickInit() {
  $('.icon-container .item').mouseenter(function () {
    $(this).parent().find('.item').removeClass('active')
    $(this).parent().find('.item').addClass('unactive')
    $(this).removeClass('unactive')
    $(this).addClass('active')
  })
  // $('.icon-container .item').click(function() {
  //   // setTimeout(() => {
  //     $(this).addClass('active')
  //     $(this).removeClass('unactive')
  //   // }, 100);
  // })
}

$(window).on('resize', function(){
  swiperInit();     
});