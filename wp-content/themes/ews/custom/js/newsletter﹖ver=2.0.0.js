$(window).on('load', function () {
  gsap.set('.form-container', { y: '-100%' })
  gsap.set('.thanks', { opacity: 0, y: 20 })
  setTimeout(() => {
    gsap.to('.form-container', { y: '-5%', duration: 1.6, ease: 'back.out(1.2)' })
  }, 300);
  formRequire()
  formHover()
  formEvent()

  gsap.set('.thanks-2', { opacity: 0, y: 20 })

  $('.back').click(function() {
    const tl = gsap.timeline()
    tl.to('.thanks', { y: -20, opacity: 0, duration: 0.3 })
    tl.to('.form-container', { y: '-5%', duration: 1.6, ease: 'back.out(1.2)' }, '-=0.3')

    $('#reset').click()
  })
})

function wpcf7invalid(e) {
  showDialog(e)
  setTimeout(() => {
    $('.wpcf7-validates-as-required').each(function () {
      const invalid = $(this).hasClass('wpcf7-not-valid')

      if (invalid) {
        $(this).parent().addClass('active')
      }
    })
  }, 100);
}

function showDialog (event) {
  const feedback = event.detail.apiResponse.message

  $("#global-dialog").text(feedback).addClass('show')

  setTimeout(() => {
    $("#global-dialog").removeClass('show')
  }, 3000);
}


function formRequire() {
  $('input').each(function () {
    const is_required = $(this).attr('aria-required') === 'true'
    if (is_required) {
      $(this).parent().append('<span class="required-text">Required field</span>')
    }
  })
}


function formHover() {
  $('input').focusout(function (e) {
    const is_required = $(this).attr('aria-required') === 'true'
    if (!e.currentTarget.value.length && is_required) {
      $(this).parent().find('.required-text').fadeIn(300)
    }
    $('input').parent().removeClass('active')
  })
  $('input').focus(function () {
    const is_required = $(this).attr('aria-required') === 'true'
    if (is_required) {
      $(this).parent().find('.required-text').fadeOut(300)
    }
    $(this).parent().addClass('active')
  })
}


function formEvent() {
  document.addEventListener('wpcf7mailfailed', e => showDialog(e), false);
//   document.addEventListener('wpcf7mailfailed', e => subcribe(e), false);
  document.addEventListener('wpcf7invalid', e => wpcf7invalid(e), false);
  document.addEventListener('wpcf7mailsent', e => subcribe(e), false );
}

function subcribe (e) {
  loading = true
  const data = {
    email: $('.form-group .email').find('input').val(),
    first_name: $('.form-group .first-name').find('input').val(),
    last_name: $('.form-group .last-name').find('input').val(),
    extra_fields: [
      {
        id: 1,
        name: "Company",
        value: $('.form-group .company').find('input').val(),
      }
    ]
  }

  $.ajax({
    type: 'post',
    url: '/wp-json/newsletter/v2/subscriptions?client_key=617aadcce8c2c727dd0cb9e8b86a7f68e288142a&client_secret=32ef30a59710c87e7c0463cbd8340cc031cca8ea',
    data: data,
    success: function (e) {
	  console.log('success', e)
      const tl = gsap.timeline()
      const translateY = window.innerWidth > 767 ? '-85%' : '-93%'
      tl.to('.form-container', { y: translateY, duration: 1.4, ease: 'back.inOut(1.4)' })
      tl.to('.thanks', { y: 0, delay: 0.2, opacity: 1, duration: 0.3 }, '-=0.2')
  	  $('.full-loading').removeClass('show')
		const windowHeihgt = $(window).height() - $('.header').height();
		const scrollTop = $('.thanks')[0].offsetTop - windowHeihgt / 2;
		$('#main').animate({
			scrollTop
		}, 1000);
    },
    error: function (err) {
      console.log('error', err)
      const tl = gsap.timeline()
      const translateY = window.innerWidth > 767 ? '-85%' : '-93%'
      tl.to('.form-container', { y: translateY, duration: 1.4, ease: 'back.inOut(1.4)' })
      tl.to('.thanks', { y: 0, delay: 0.2, opacity: 1, duration: 0.3 }, '-=0.2')
  	  $('.full-loading').removeClass('show')

		const windowHeihgt = $(window).height() - $('.header').height();
		const scrollTop = $('.thanks')[0].offsetTop - windowHeihgt / 2;
		$('#main').animate({
			scrollTop
		}, 1000);
    }
  })
}
