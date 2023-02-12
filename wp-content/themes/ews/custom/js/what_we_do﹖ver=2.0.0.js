$(window).on("load", function () {
  bannerWaveUpSet()
  bannerWaveUpStart()

  setTimeout(() => {
    const desktop = [scrollInit]
    const mobile = [scrollInit]
    
    init(window.innerWidth > 767 && window.innerHeight > 600 ? desktop : mobile)
  }, 3000);
  
  
  $(window).resize(function() {
    generateItem()
  })
});

function init(arr) {
  arr.forEach(item => {
    item()
  });
}

function mouseInit() {
  $('.section-3 .item .item-container').mouseenter(function () {
    $('.section-3 .item').addClass('unactive')
    $(this).parent().removeClass('unactive')
    $(this).parent().addClass('active')
  })
  $('.section-3 .item .item-container').mouseleave(function () {
    $('.section-3 .item').removeClass('active')
    $('.section-3 .item').removeClass('unactive')
  })
}

let offset__top = []
let offset__bottom = []
let windowTop = $('#main').scrollTop()
let offset = window.innerWidth > 767 ? window.innerHeight * 1/2 : window.innerHeight * 4/5

function generateItem () {
  const scrollItem = $('.section-3 .item')
  offset__top = []
  offset__bottom = []
  offset = window.innerWidth > 767 ? window.innerHeight * 1/2 : window.innerHeight * 1/5

  scrollItem.each(function(index, item) {
    offset = window.innerWidth > 767 ? window.innerHeight * 1/2 : window.innerHeight * 1/5
    const target = $(item)
    const itemOffsetTop = target.offset().top - offset

    console.log(itemOffsetTop)
    if(itemOffsetTop < 0) {
      offset__top.push({
        target: target,
        top: itemOffsetTop
      })
    } else {
      offset__bottom.push({
        target: target,
        top: itemOffsetTop
      })
    }
  })
}

function scrollInit() {
  generateItem()
  
  $('#main').scroll(function(e) {
    const delta = windowTop < e.currentTarget.scrollTop ? 1 : -1
    windowTop = $('#main').scrollTop()

    // console.log(offset__top, offset__bottom)

    if(delta > 0 && offset__bottom.length && offset__bottom[0].target.offset().top - offset < 0) {
      console.log(offset__bottom[0].target.offset().top, offset)
      // 向下滾動
      offset__top.push(offset__bottom.shift())
    }
    
    if(delta < 0 && offset__top.length && offset__top[offset__top.length - 1].target.offset().top > offset) {
      // 向上滾動
      offset__bottom.unshift(offset__top.pop())
    }

    if(offset__top.length) {
      $('.section-3 .item').removeClass('active')
      $('.section-3 .item').addClass('unactive')
      $(offset__top[offset__top.length - 1].target).addClass('active')
      $(offset__top[offset__top.length - 1].target).removeClass('unactive')
    }
  });
} 