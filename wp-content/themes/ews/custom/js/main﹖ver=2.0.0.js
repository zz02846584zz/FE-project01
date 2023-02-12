$(document).ready(function () {
  eventInit()
  const cookieAccept = $.cookie('cookie_notice_accepted') === 'true'
  if(cookieAccept) {
    $('div#cookie-notice').fadeOut(300)
  }

  $('.header-mobile .menu').click(() => {
    $('body').css({
      'overflow': 'hidden'
    })
    $('.header-mobile-menu').fadeIn(300)
    gsap.to('.header-mobile .menu', { scale: 0, duration: 0.3 })
    gsap.fromTo('.header-mobile-menu .close', { scale: 0 }, { scale: 1, duration: 0.3 })
  })
  $('.header-mobile-menu .close').click(() => {
    $('body').css({
      'overflow': 'unset'
    })
    $('.header-mobile-menu').fadeOut(300)
    gsap.to('.header-mobile-menu .close', { scale: 0, duration: 0.3 })
    gsap.fromTo('.header-mobile .menu', { scale: 0 }, { scale: 1, duration: 0.3 })
  })

  $('.flow-btn #hi').click(function () {
    $(this).toggleClass('open')
    $('.box').fadeToggle(300)
  })

  $(document).on("click",".search-box",function() {
    $('.products-categories').fadeIn(300)
  });

  $(document).on("click",".products-categories .category",function() {
    const id = $(this).data('id')
    const offset = window.innerWidth > 1024 ? 160 : window.innerWidth > 767 ? 120 : 60 
    $('#main').animate({
      scrollTop: $('main').scrollTop() + $(`#${id}`).offset().top - offset
    }, 1000);

    $('.products-categories').fadeOut(300)
  });

  $(document).on("click",".products-categories .arrow",function() {
    $('.products-categories').fadeOut(300)
  });
})


$(window).on("load", function() {
	console.log('main load')

  gsap.to('body', { opacity: 1 })

  let scrollTop = $('#main').scrollTop()
  const parallax = () => {
    const percent = window.innerHeight / $('#main')[0].scrollHeight
    const scrollTopPercent = scrollTop / $('#main')[0].scrollHeight * 100
    
    $('.scrollbar .line').height(window.innerHeight * percent)
    $('.scrollbar .line').css({
      top: `${scrollTopPercent}%`
    })
    if(scrollTop === $('#main').scrollTop()) {
      $('.scrollbar').addClass('opacity-0')
    } else {
      $('.scrollbar').removeClass('opacity-0')
    }
    scrollTop = $('#main').scrollTop()
    window.requestAnimationFrame(parallax);
  }

  window.requestAnimationFrame(parallax);

  detectWaveTop()
});

let height
function bannerWaveUpSet() {
  gsap.registerPlugin(CustomEase);
  height = $('.banner').innerHeight()
  if (!height) setTimeout(() => bannerWaveUpSet(), 100)
  
  const bannerHeight = window.innerWidth > 1024 ? height + 0.105 * window.innerWidth : window.innerHeight / 4 + height
  gsap.set('.banner', { height: bannerHeight })

  gsap.set('.banner_image', { opacity: 0 })
  gsap.set('.banner_overlay', { opacity: 0 })
  gsap.set('.banner_slogan', { opacity: 0, y: 20 })
}

function bannerWaveUpStart() {
  const tl = gsap.timeline()
  tl.to('.banner_image, .banner_overlay', { opacity: 1, delay: 0.3, duration: 0.7, ease: 'inOut' })
  tl.to('.banner_image, .banner_overlay', { ease: CustomEase.create("custom", "M0,0 C0.23,1 0.32,1 1,1 "), duration: 0.7 }, '-0.3')
  tl.to('.banner', { height: height, duration: 0.7, ease: 'inOut' }, "-=0.6")
  tl.to('.banner_slogan', { opacity: 1, y: 0, ease: 'in' })
}


function eventInit() {
  $('.header-menu li.menu-item').mouseleave(function () {
    $('.header-menu li.menu-item').removeClass('opacity-20')
  })
  $('.header-menu li.menu-item').mouseenter(function () {
    $('.header-menu li.menu-item').addClass('opacity-20')
    $(this).removeClass('opacity-20')
  })
}

let resFun

function detectWaveTop () {
  const headerHeight = $('header').height()
  const waveTop = $('.top-wave')
  if(waveTop) {
    waveTop.css({
      top: headerHeight - 1
    })
    if(!resFun) {
      resFun = resizeWaveTop()
    }
  }
}

function resizeWaveTop() {
  return $(window).resize(detectWaveTop)
}