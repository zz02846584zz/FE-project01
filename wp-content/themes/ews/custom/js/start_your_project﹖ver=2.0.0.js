$(window).on('load', function () {
  formRequire()
  formHover()
  formSubmit()

  gsap.set('.thanks-2', {opacity: 0, y: '-35%'})
  gsap.set('.back', {opacity: 0, y: 20})
	
  $('.back').click(function() {
	  $('.form-container .envelope').fadeOut(400)
    $('.envelope *').removeAttr("style")

    gsap.set('.thanks-2', {opacity: 0, y: 20})
    gsap.set('.back', {opacity: 0, y: 20})

    $('#reset').click()
  })

  document.addEventListener('wpcf7mailfailed', e => showDialog(e), false);
  document.addEventListener('wpcf7invalid', e => showDialog(e), false);
})

function formRequire() {
  $('input').each(function () {
    const is_required = $(this).attr('aria-required') === 'true'
    if (is_required) {
      $(this).parent().append('<span class="required-text">Required field</span>')
    }
  })
}

function formHover() {
  $("input:not([type='checkbox']):not([type='submit']), textarea").focusout(function (e) {
    const is_required = $(this).attr('aria-required') === 'true'
    if (!e.currentTarget.value.length && is_required) {
      $(this).parent().find('.required-text').fadeIn(300)
    }
    $("input:not([type='checkbox']):not([type='submit'])").each(function() {
      $(this).closest('.form-item').removeClass('opacity-30 active')
    })
    $('textarea').each(function() {
      $(this).closest('.form-item').removeClass('opacity-30 active')
    })
    $(this).parent().removeClass('active')
  })
  $("input:not([type='checkbox']):not([type='submit']), textarea").focus(function () {
    const is_required = $(this).attr('aria-required') === 'true'
    if (is_required) {
      $(this).parent().find('.required-text').fadeOut(300)
    }
    $("input:not([type='checkbox']):not([type='submit'])").each(function() {
      $(this).closest('.form-item').addClass('opacity-30 delay-0')
    })
    $('textarea').each(function() {
      $(this).closest('.form-item').addClass('opacity-30 delay-0')
    })
    $(this).closest('.form-item').removeClass('opacity-30')
    $(this).parent().addClass('active')
  })
}

function formSubmit() {
  document.addEventListener('wpcf7submit', function (event) {
    const status = event.detail.status // mail_sent, validation_failed

    if (status === 'mail_sent') {
      $('.form-container .envelope').fadeIn(400);
		const windowHeihgt = $(window).height() - $('.header').height();
		const scrollTop = $('#form-overlay')[0].offsetTop + $('.thanks-2')[0].offsetTop - windowHeihgt / 2;
		$('#main').animate({
		  scrollTop
		}, 1000);
      const tl = gsap.timeline()
      tl.to('.form-container .envelope svg', { width: window.innerWidth > 480 ? 315 : 150, duration: 1.2, delay: 0.5, ease: 'inOut' }) 
      gsap.to('.form-container .envelope svg *', { 'stroke-width': '5px', duration: 0.7, delay: 0.5 })
      tl.to('.form-container .envelope svg', { y: -30, duration: 0.3, repeat: 3, yoyo: true, ease: 'in' })
      tl.to('.form-container .envelope svg', { left: '24%', bottom: '15%', width: window.innerWidth > 480 ? 130 : 100, duration: 0.8, ease: 'in' })
      tl.to('.form-container .envelope svg *', { 'stroke-width': '10px', duration: 0.7 }, '-=0.8')
      tl.to('.form-container .envelope svg', { skewX: '-75deg', scaleY: 0, transformOrigin: "bottom left", duratoin: 0.6 }, '-=0.2')
      tl.to('.form-container .envelope .thanks-1', { opacity: 0, y: 20,duratoin: 0.3, ease: 'in' }, '-=0.4')
      tl.to('.form-container .envelope .thanks-2', { opacity: 1, y: '-50%', x: '-50%', duratoin: 0.3, ease: 'inOut' })
      tl.to('.form-container .envelope .back', { opacity: 1, y: 0, duratoin: 0.3, ease: 'inOut' }, '-=0.2')
    } else {
      setTimeout(() => {
        $('.wpcf7-validates-as-required').each(function () {
          const invalid = $(this).hasClass('wpcf7-not-valid')

          if (invalid) {
            $(this).parent().addClass('active')
          }
        })
      }, 100);
    }
  }, false );
}



function showDialog (event) {
  const feedback = event.detail.apiResponse.message
  $("#global-dialog").text(feedback).addClass('show')
  setTimeout(() => {
    $("#global-dialog").removeClass('show')
  }, 3000);
}
