import SplitType from "split-type";
import { setLinesWrapper } from "../modules/setLinesWrapper";

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
    on: {
      afterInit(swiper) {
        const slides = swiper.slides;
        const currentSlide = slides[swiper.activeIndex];

        // initial split & hide off-screen slides
        slides.forEach((slide) => {
          slide.querySelectorAll("[data-hero-stagger]").forEach((el) => {
            SplitType.revert(el);
            const splitter = new SplitType(el, {
              types: "lines",
              tagName: "span",
            });
            setLinesWrapper(splitter.lines, () => {
              // only leave the active slide visible
              if (slide !== currentSlide) {
                gsap.set(splitter.lines, { yPercent: 100 });
              }
            });
          });
        });
      },
    },
  });

  // 2) Pause all videos & play only the active one
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

  // 3) Split & animate text on slide transitions
  function handleStaggerText() {
    const prevSlide = heroSlider.slides[heroSlider.previousIndex];
    const activeSlide = heroSlider.slides[heroSlider.activeIndex];

    // re-split both slides at their true widths
    [prevSlide, activeSlide].forEach((slide) => {
      slide.querySelectorAll("[data-hero-stagger]").forEach((el) => {
        SplitType.revert(el);
        const splitter = new SplitType(el, {
          types: "lines",
          tagName: "span",
        });
        setLinesWrapper(splitter.lines, () => {
          // hide all lines first
          gsap.set(splitter.lines, { yPercent: 100 });
        });
      });
    });

    // animate old slide lines out
    const prevLines = prevSlide.querySelectorAll(".line");
    gsap.to(prevLines, {
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
    });

    // animate new slide lines in
    const activeLines = activeSlide.querySelectorAll(".line");
    gsap.to(activeLines, {
      yPercent: 0,
      stagger: 0.05,
      duration: 1,
      ease: "expo.out",
    });

    // refresh triggers if you use ScrollTrigger elsewhere
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }

  // 4) Hook into Swiper events
  heroSlider.on("slideChange", handleVideo);
  heroSlider.on("slideChangeTransitionEnd", () => {
    handleVideo();
    handleStaggerText();
  });

  // 5) Kick off initial state
  handleVideo();
  handleStaggerText();
}
