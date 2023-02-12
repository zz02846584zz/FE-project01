(function () {
	var beforeWaveType = $('.slide-pagination-item').eq(0).data('wave').toLowerCase()
	gsap.set(`#wave-${beforeWaveType}`, {alpha: 1 })
	
	window.detectWave = (i) => {
    const waveType = $('.slide-pagination-item').eq(i).data('wave')
		if( beforeWaveType === waveType.toLowerCase() ) {
			const tl = gsap.timeline()
			tl.to('#wave-' + waveType.toLowerCase(), { alphㄑa: 0, y: window.innerWidth * 13 / 100, duration: 0.9, ease: 'Power3.inOut' })
			tl.to('#wave-' + waveType.toLowerCase(), { alpha: 1, y: 0, duration: 1, ease: 'Power3.inOut' })
			return
		}
		beforeWaveType = waveType.toLowerCase()
		const waveTl = gsap.timeline({})
		if( waveType === 'Normal' ) {
			waveTl.to('#wave-sand', { alpha: 0, y: window.innerWidth * 13 / 100, duration: 0.9, ease: 'Power3.inOut' })
			waveTl.fromTo('#wave-normal', { alpha: 0, y: window.innerWidth * 13 / 100 }, { alpha: 1, y: 0, duration: 1, ease: 'Power3.inOut' })
		} else {
			waveTl.to('#wave-normal', { alpha: 0, y: window.innerWidth * 13 / 100, duration: 0.9, ease: 'Power3.inOut' })
			waveTl.fromTo('#wave-sand', { alpha: 0, y: window.innerWidth * 13 / 100 }, { alpha: 1, y: 0, duration: 1., ease: 'Power3.inOut' })
		}
	}
	
  window.CanvasSlideshow = function (options) {
    //  SCOPE
    /// ---------------------------
    var that = this;

    //  OPTIONS
    /// ---------------------------
    options = options || {};
    options.stageWidth = options.hasOwnProperty("stageWidth")
      ? options.stageWidth
      : window.innerWidth;
    options.stageHeight = options.hasOwnProperty("stageHeight")
      ? options.stageHeight
      : window.innerHeight - $('.header').height();
    options.pixiSprites = options.hasOwnProperty("sprites")
      ? options.sprites
      : [];
    options.centerSprites = options.hasOwnProperty("centerSprites")
      ? options.centerSprites
      : true;
    options.texts = options.hasOwnProperty("texts") ? options.texts : [];
    options.autoPlay = options.hasOwnProperty("autoPlay")
      ? options.autoPlay
      : true;
    options.autoPlaySpeed = options.hasOwnProperty("autoPlaySpeed")
      ? options.autoPlaySpeed
      : [10, 3];
    options.fullScreen = options.hasOwnProperty("fullScreen")
      ? options.fullScreen
      : true;
    options.displaceScale = options.hasOwnProperty("displaceScale")
      ? options.displaceScale
      : [200, 70];
    options.displacementImage = options.hasOwnProperty("displacementImage")
      ? options.displacementImage
      : "";
    options.navElement = options.hasOwnProperty("navElement")
      ? options.navElement
      : document.querySelectorAll(".scene-nav");
    options.displaceAutoFit = options.hasOwnProperty("displaceAutoFit")
      ? options.displaceAutoFit
      : false;
    options.wacky = options.hasOwnProperty("wacky") ? options.wacky : false;
    options.interactive = options.hasOwnProperty("interactive")
      ? options.interactive
      : false;
    options.interactionEvent = options.hasOwnProperty("interactionEvent")
      ? options.interactionEvent
      : "";
    options.displaceScaleTo = options.autoPlay === false ? [0, 0] : [20, 20];
    options.textColor = options.hasOwnProperty("textColor")
      ? options.textColor
      : "#fff";
    options.displacementCenter = options.hasOwnProperty("displacementCenter")
      ? options.displacementCenter
      : false;
    options.dispatchPointerOver = options.hasOwnProperty("dispatchPointerOver")
      ? options.dispatchPointerOver
      : false;

    // custom
    options.target = options.hasOwnProperty("target")
      ? options.target
      : document.body;

    //  PIXI VARIABLES
    /// ---------------------------
    var renderer = new PIXI.autoDetectRenderer(
      options.stageWidth,
      options.stageHeight,
      { transparent: true }
    );
    renderer.autoResize = true;
    var stage = new PIXI.Container();
    var slidesContainer = new PIXI.Container();
    var displacementSprite = new PIXI.Sprite.fromImage(
      options.displacementImage
    );
    var displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    );

    //  TEXTS
    /// ---------------------------
    var style = new PIXI.TextStyle({
      fill: options.textColor,
      wordWrap: true,
      wordWrapWidth: 400,
      letterSpacing: 20,
      fontSize: 14,
    });

    //  SLIDES ARRAY INDEX
    /// ---------------------------
    this.currentIndex = 0;
    this.displacementFilter = displacementFilter;

    /// ---------------------------
    //  INITIALISE PIXI
    /// ---------------------------
    this.initPixi = function () {
      // Add canvas to the HTML
      options.target.appendChild(renderer.view);

      // Add child container to the main container
      stage.addChild(slidesContainer);

      // Enable Interactions
      stage.interactive = true;

      // Fit renderer to the screen
      if (options.fullScreen === true) {
        renderer.view.style.objectFit = "cover";
        renderer.view.style.width = "100%";
        renderer.view.style.height = "100%";
        renderer.view.style.top = "50%";
        renderer.view.style.left = "50%";
        if ( window.innerWidth < 768 || window.innerWidth < window.innerHeight ) {
          renderer.view.style.webkitTransform =
            "translate( -50%, -50% ) scale(1.3)";
          renderer.view.style.transform = "translate( -50%, -50% ) scale(1.3)";
        } else {
          renderer.view.style.webkitTransform =
            "translate( -50%, -50% ) scale(1)";
          renderer.view.style.transform = "translate( -50%, -50% ) scale(1)";
        }
      } else {
        renderer.view.style.maxWidth = "100%";
        renderer.view.style.top = "50%";
        renderer.view.style.left = "50%";
      }

      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

      // Set the filter to stage and set some default values for the animation
      stage.filters = [displacementFilter];

      // if ( options.autoPlay === false ) {
      //   displacementFilter.scale.x = 0;
      //   displacementFilter.scale.y = 0;
      // }

      if (options.wacky === true) {
        // displacementSprite.anchor.set(0.5);
        // displacementSprite.x = renderer.width / 2;
        // displacementSprite.y = renderer.height / 2;
      }

      displacementSprite.scale.x = 2;
      displacementSprite.scale.y = 2;

      // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
      displacementFilter.autoFit = options.displaceAutoFit;

      stage.addChild(displacementSprite);
    };

    /// ---------------------------
    //  LOAD SLIDES TO CANVAS
    /// ---------------------------
    let spritesLoading = false
    this.loadPixiSprites = function (sprites) {
      if(spritesLoading) return
      spritesLoading = true
      var rSprites = sprites || options.sprites;
      var rTexts = options.texts;


      for (let i = 0; i < rSprites.length; i++) {
        const url = rSprites[i];
        const loader = new PIXI.loaders.Loader();

        loader.add(url);
        loader.load(async (loader, resources) => {
          const image = new PIXI.Sprite(loader.resources[url].texture);

          if (rSprites.indexOf(url) !== that.currentIndex) {
            TweenMax.set(image, { alpha: 0 });
          }

          const size = {};
          size.id = rSprites.indexOf(url);
          size.imageWidth = image.width;
          size.imageHeight = image.height;
          size.windowWidth = window.innerWidth;

          if(i===0) {
            size.windowHeight = window.innerHeight;
          } else {
            size.windowHeight = window.innerHeight - $('header').height();
          }
          size.scaleX = size.windowWidth / size.imageWidth;
          size.scaleY = size.windowHeight / size.imageHeight;

          size.maxScale = Math.max(size.scaleX, size.scaleY);
          image.transform.scale.set(size.maxScale);
          
          if (options.centerSprites === true) {
            image.anchor.set(0.5);
            image.x = renderer.width / 2;
            image.y = renderer.height / 2;
          }

          image.id = rSprites.indexOf(url);
          slidesContainer.addChild(image);
          if(i === rSprites.length - 1) {
            spritesLoading = false
          }
        });
      }
    };

    /// ---------------------------
    //  DEFAULT RENDER/ANIMATION
    /// ---------------------------
    if (options.autoPlay === true) {
      var ticker = new PIXI.ticker.Ticker();

      ticker.autoStart = options.autoPlay;

      ticker.add(function (delta) {
        displacementSprite.x += options.autoPlaySpeed[0] * delta;
        displacementSprite.y += options.autoPlaySpeed[1];

        renderer.render(stage);
      });
    } else {
      var render = new PIXI.ticker.Ticker();

      render.autoStart = true;

      render.add(function (delta) {
        renderer.render(stage);
      });
    }
	  

    /// ---------------------------
    //  WAVE DETECT
    /// ---------------------------
	
	

    /// ---------------------------
    //  TRANSITION BETWEEN SLIDES
    /// ---------------------------
    var isPlaying = false;

    this.moveSlider = function (newIndex) {
		  if(isPlaying) return

      isPlaying = true;
	  	detectWave(newIndex)

      $('.slide-pagination-item').removeClass('active')
      $(`.slide-pagination-item:nth-child(${newIndex + 1})`).addClass('active')

      $('.slide-item').removeClass('active')
      $(`.slide-item:nth-child(${newIndex + 1})`).addClass('active')

      var baseTimeline = new TimelineMax({
        onComplete: function () {
          that.currentIndex = newIndex;
          isPlaying = false;

          if (options.wacky === true) {
            displacementSprite.scale.set(1);
          }
        },
        onUpdate: function () {
          if (options.wacky === true) {
            displacementSprite.rotation += baseTimeline.progress() * 0.02;
            displacementSprite.scale.set(baseTimeline.progress() * 3);
          }
        },
      });

      baseTimeline.clear();

      if (baseTimeline.isActive()) {
        return;
      }

      const slideOld = slidesContainer.children.find(
        (item) => item.id === that.currentIndex
      );

      const slideNew = slidesContainer.children.find(
        (item) => item.id === newIndex
      );
      const bannerContaienr = '.banner-content'

      baseTimeline
        .to(`.slide-item:nth-child(${that.currentIndex + 1}) .title`, 0.5, {
          alpha: 0,
          y: -35,
        })
        .to(
          `.slide-item:nth-child(${that.currentIndex + 1}) .content`,
          0.5,
          { alpha: 0, y: -35 },
          "-=0.3"
        )
        .to(slideOld, 0.5, { alpha: 0 }, "-=0.5")
        // .to(bannerContaienr, 0.8, { scaleX: 1.15, scaleY: 1.15 })
        .to(bannerContaienr, 0.01, { scale: 1.15 })
        .to(bannerContaienr, 0.8, { scale: 1 })
        .fromTo(slideNew, 0.4, { alpha: 0 }, { alpha: 1, ease: 'inOut' }, '-=0.8')
        .fromTo(
          `.slide-item:nth-child(${newIndex + 1}) .title`,
          0.4,
          { alpha: 0, y: 35 },
          { alpha: 1, y: 0, ease: "inOut" },
          '-=0.4'
        )
        .fromTo(
          `.slide-item:nth-child(${newIndex + 1}) .content`,
          0.4,
          { alpha: 0, y: 35 },
          { alpha: 1, y: 0, ease: "inOut" },
          "-=0.3"
        );
    };


    /// ---------------------------
    //  CLICK HANDLERS
    /// ---------------------------
    var nav = options.navElement;

    for (var i = 0; i < nav.length; i++) {
      var navItem = nav[i];

      navItem.onclick = function (event) {
        var slideImages = slidesContainer.children;

        // Make sure the previous transition has ended
        if (isPlaying) {
          return false;
        }

        if (this.getAttribute("data-nav") === "next") {
          if (
            that.currentIndex >= 0 &&
            that.currentIndex < slideImages.length - 1
          ) {
            that.moveSlider(that.currentIndex + 1);
          } else {
            // that.moveSlider(0);
          }
        } else {
          if (that.currentIndex > 0 && that.currentIndex < slideImages.length) {
            that.moveSlider(that.currentIndex - 1);
          } else {
            // that.moveSlider(slideImages.length - 1);
          }
        }

        return false;
      };
    }

    /// ---------------------------
    //  INIT FUNCTIONS
    /// ---------------------------

    this.init = function () {
      that.initPixi();
      that.loadPixiSprites(options.pixiSprites);
    };

    /// ---------------------------
    //  BREAK FUNCTIONS
    /// ---------------------------


    /// ---------------------------
    //  RESIZE FUNCTIONS
    /// ---------------------------

    this.resize = async function() {
      while(slidesContainer.children[0]) { 
        slidesContainer.removeChild(slidesContainer.children[0]);
      }

      var spriteImages 	= $( '.slide-wrapper .slide-item__image' );
      const spriteImagesSrc = []

      const status = window.innerWidth > 1024 || window.innerWidth > window.innerHeight ? 'desktop'
                   : window.innerWidth >= 480 ? 'tablet'
                   : 'mobile'
      
      spriteImages.each(function() {
        const src = $(this).data(status)
        spriteImagesSrc.push( src );
      })

      renderer.resize(window.innerWidth, window.innerHeight - $('.header').height())

      $("#banner-object").height(window.innerHeight - $('.header').height())
      
      if ( window.innerWidth < 640 || window.innerWidth < window.innerHeight ) {
        renderer.view.style.webkitTransform = "translate( -50%, -50% ) scale(1.3)";
        renderer.view.style.transform = "translate( -50%, -50% ) scale(1.3)";
        // renderer.view.style.webkitTransform =
        //   "translate( -50%, -50% ) scale(1)";
        // renderer.view.style.transform = "translate( -50%, -50% ) scale(1)";
      } else {
        renderer.view.style.webkitTransform = "translate( -50%, -50% ) scale(1)";
        renderer.view.style.transform = "translate( -50%, -50% ) scale(1)";
      }

      that.loadPixiSprites(spriteImagesSrc);
    }

    /// ---------------------------
    //  CENTER DISPLACEMENT
    /// ---------------------------
    if (options.displacementCenter === true) {
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = renderer.view.width / 2;
      displacementSprite.y = renderer.view.height / 2;
    }

    /// ---------------------------
    //  START
    /// ---------------------------
    this.init();

    /// ---------------------------
    //  HELPER FUNCTIONS
    /// ---------------------------
    function scaleToWindow(canvas, backgroundColor) {
      var scaleX, scaleY, scale, center;

      //1. Scale the canvas to the correct size
      //Figure out the scale amount on each axis
      scaleX = window.innerWidth / canvas.offsetWidth;
      scaleY = window.innerHeight / canvas.offsetHeight;

      //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
      scale = Math.min(scaleX, scaleY);
      canvas.style.transformOrigin = "0 0";
      canvas.style.transform = "scale(" + scale + ")";

      //2. Center the canvas.
      //Decide whether to center the canvas vertically or horizontally.
      //Wide canvases should be centered vertically, and
      //square or tall canvases should be centered horizontally
      if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) {
          center = "horizontally";
        } else {
          center = "vertically";
        }
      } else {
        if (canvas.offsetHeight * scale < window.innerHeight) {
          center = "vertically";
        } else {
          center = "horizontally";
        }
      }

      //Center horizontally (for square or tall canvases)
      var margin;
      if (center === "horizontally") {
        margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
        canvas.style.marginTop = 0 + "px";
        canvas.style.marginBottom = 0 + "px";
        canvas.style.marginLeft = margin + "px";
        canvas.style.marginRight = margin + "px";
      }

      //Center vertically (for wide canvases)
      if (center === "vertically") {
        margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
        canvas.style.marginTop = margin + "px";
        canvas.style.marginBottom = margin + "px";
        canvas.style.marginLeft = 0 + "px";
        canvas.style.marginRight = 0 + "px";
      }

      //3. Remove any padding from the canvas  and body and set the canvas
      //display style to "block"
      canvas.style.paddingLeft = 0 + "px";
      canvas.style.paddingRight = 0 + "px";
      canvas.style.paddingTop = 0 + "px";
      canvas.style.paddingBottom = 0 + "px";
      canvas.style.display = "block";

      //4. Set the color of the HTML body background
      document.body.style.backgroundColor = backgroundColor;

      //Fix some quirkiness in scaling for Safari
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
          // Chrome
        } else {
          // Safari
          //canvas.style.maxHeight = "100%";
          //canvas.style.minHeight = "100%";
        }
      }

      //5. Return the `scale` value. This is important, because you'll nee this value
      //for correct hit testing between the pointer and sprites
      return scale;
    } // http://bit.ly/2y1Yk2k
  };
})();

