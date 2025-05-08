export function initHomeSlider() {
  const heroSlider = new Swiper(".swiper.home_hero", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 500,
    grabCursor: true,
    simulateTouch: true,
    effect: "creative",
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
        // Split and hide all lines
        swiper.slides.forEach((slide) => {
          slide.querySelectorAll("[data-hero-stagger]").forEach((el) => {
            SplitText.create(el, {
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
        // Animate in the active slide's text
        const activeSlide = swiper.slides[swiper.activeIndex];
        const activeEls = activeSlide.querySelectorAll(
          "[data-hero-stagger] .line"
        );
        gsap.to(activeEls, {
          yPercent: 0,
          stagger: 0.05,
          ease: "expo.out",
          duration: 1,
        });
        // Play video for the initial slide
        handleVideo();
      },
    },
  });
  function handleVideo() {
    document
      .querySelectorAll(".swiper.home_hero video")
      .forEach((v) => v.pause());
    const activeSlide = document.querySelector(
      ".swiper.home_hero .swiper-slide-active"
    );
    if (!activeSlide) return;
    const vid = activeSlide.querySelector("video");
    if (!vid) return;
    vid.muted = true;
    vid.play().catch((e) => console.error("Video play failed:", e));
  }
  function handleStaggerText() {
    const activeSlide = heroSlider.slides[heroSlider.activeIndex];
    const previousSlide = heroSlider.slides[heroSlider.previousIndex];
    const activeEls = activeSlide.querySelectorAll("[data-hero-stagger] .line");
    const previousEls = previousSlide.querySelectorAll(
      "[data-hero-stagger] .line"
    );
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
  }
  function handleSlideChange() {
    handleVideo();
    handleStaggerText();
  }
  // Only need to hook into slideChangeTransitionEnd
  heroSlider.on("slideChangeTransitionEnd", handleSlideChange);
}
