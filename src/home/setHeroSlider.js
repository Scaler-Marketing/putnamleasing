export function initHomeSlider() {

// 1) Initialize Swiper
  const heroSlider = new Swiper(".swiper.home_hero", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 500,
    grabCursor: true,
    simulateTouch: true,
    effect: "creative",
    // fadeEffect: {
    //   crossFade: false,
    // },
    creativeEffect: {
      prev: { shadow: true, translate: ["0%", 0, -1] },
      next: { translate: ["100%", 0, 0] },
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-bullet-wrapper",
      bulletClass: "swiper-bullet",
      bulletActiveClass: "is-active",
      bulletElement: "div",
      clickable: true,
    },
    navigation: {
      nextEl: ".hero-slider_arrows .next",
      prevEl: ".hero-slider_arrows .prev",
    },
    on: {
      afterInit: function (swiper) {
        const slides = swiper.slides;
        const currentSlide = swiper[swiper.activeIndex];
        
        slides.forEach((slide, i) => {
          const staggerEls = slide.querySelectorAll('[data-hero-stagger]');

          staggerEls.forEach((el, i) => {
            const staggerTextEls = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "line",
              autoSplit: true,
              onSplit: (self) => {
                gsap.set(self.lines, { yPercent: 100 });
              },
            });            
            });
          });
      },
    },
  });

  // 2) Pause all videos & play only the active one
  function handleVideo() {
    // pause every video under the hero slider
    document
      .querySelectorAll(".swiper.home_hero video")
      .forEach((v) => v.pause());

    // find active slide and its video
    const activeSlide = document.querySelector(
      ".swiper.home_hero .swiper-slide-active"
    );
    if (!activeSlide) return;

    const vid = activeSlide.querySelector("video");
    if (!vid) return;

    vid.muted = true;
    vid.play().catch((e) => console.error("Video play failed:", e));
  }

  function handleStaggerText(swiper) {
    const activeSlide = heroSlider.slides[heroSlider.activeIndex];
    const previousSlide = heroSlider.slides[heroSlider.previousIndex];

    const activeEls = activeSlide.querySelectorAll('[data-hero-stagger] .line');
    const previousEls = previousSlide.querySelectorAll('[data-hero-stagger] .line');

    gsap.to(previousEls, {
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(activeEls, {
      yPercent: 0,
      stagger: 0.05,
      ease: "expo.out",
      duration: 1,
    });

    // updateMask();
  }

  function handleSlideChange() {
    handleVideo();
    handleStaggerText();
  }    

  // function updateMask() {
  //   const activeSlide = heroSlider.slides[heroSlider.activeIndex];
  //   const previousSlide = heroSlider.slides[heroSlider.previousIndex];
  //   gsap.fromTo(
  //     activeSlide,
  //     {
  //       maskPosition: "0%",
  //     },
  //     {
  //       maskPosition: "50%",
  //       duration: 1,
  //       ease: "expo.out",
  //       onComplete: () => {
  //         gsap.set(previousSlide, { maskPosition: "0%" });
  //       },
  //     }
  //   );  
  // }

  // 3) Hook into Swiper events
  heroSlider.on("slideChange", handleVideo);
  heroSlider.on("transitionEnd", handleSlideChange);
  // heroSlider.on("beforeTransitionStart", () => {
  //   const activeSlide = heroSlider.slides[heroSlider.activeIndex];
  //   const previousSlide = heroSlider.slides[heroSlider.previousIndex];

  //   gsap.set(previousSlide, { maskPosition: "50%" });
  //   gsap.set(activeSlide, { maskPosition: "0%" });
  // });

  // 4) Kick off initial video state
  handleSlideChange();    
}
