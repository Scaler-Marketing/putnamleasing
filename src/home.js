function createHeroSlider() {
  const slider = document.querySelector(".home-slider_list");
  const slides = [...slider.querySelectorAll(".home-slider_item")];
  const bullets = [...document.querySelectorAll(".hero-slider_bullet")];
  const nextBtn = document.querySelector(".is-slider-nav.next");
  const prevBtn = document.querySelector(".is-slider-nav.prev");

  let current = 0;
  let autoplayTimer;
  const interval = 6; // seconds

  // Utility to get video inside a slide
  function getVideo(slide) {
    return slide.querySelector(".bg-video");
  }

  // Step 1: Split all [data-hero-stagger] elements
  slides.forEach((slide) => {
    const targets = slide.querySelectorAll("[data-hero-stagger]");
    targets.forEach((el) => {
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

  function animateTextIn(slide) {
    const targets = slide.querySelectorAll("[data-hero-stagger] .line");
    gsap.to(targets, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.06,
    });
  }

  function resetText(slide) {
    const targets = slide.querySelectorAll("[data-hero-stagger] .line");
    gsap.set(targets, { yPercent: 100 });
  }

  function animateBulletFill(index) {
    const fills = document.querySelectorAll(".hero-slider_bullet-fill");
    fills.forEach((fill, i) => {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      if (i === index) {
        gsap.to(fill, {
          scaleX: 1,
          duration: interval,
          ease: "none",
        });
      }
    });
  }

  function goToSlide(index) {
    if (index === current || gsap.isTweening(slides[current])) return;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    const currentVideo = getVideo(currentSlide);
    const nextVideo = getVideo(nextSlide);

    // Kill active tweens
    gsap.killTweensOf([currentSlide, nextSlide, ".hero-slider_bullet-fill"]);

    slides.forEach((slide) => slide.classList.remove("is-current"));
    bullets.forEach((b) => b.classList.remove("is-current"));

    gsap.set(nextSlide, { autoAlpha: 0, zIndex: 2 });

    // Play next slide's video immediately
    if (nextVideo && nextVideo.paused) nextVideo.play();

    gsap.to(currentSlide, { autoAlpha: 0, duration: 0.6 });
    gsap.to(nextSlide, {
      autoAlpha: 1,
      duration: 0.6,
      onStart: () => {
        nextSlide.classList.add("is-current");
        bullets[index].classList.add("is-current");
        animateBulletFill(index);
      },
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 1 });

        // Pause previous slide's video
        if (currentVideo && !currentVideo.paused) currentVideo.pause();

        resetText(currentSlide);
        animateTextIn(nextSlide);
        current = index;
      },
    });
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  function startAutoplay() {
    autoplayTimer = gsap.delayedCall(interval, () => {
      nextSlide();
      startAutoplay();
    });
  }

  function resetAutoplay() {
    if (autoplayTimer) autoplayTimer.kill();
    startAutoplay();
  }

  // Bullet navigation
  bullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  // Arrow navigation
  nextBtn?.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  // Initial setup
  gsap.set(slides, { autoAlpha: 0, zIndex: 1 });
  gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 });
  slides[0].classList.add("is-current");
  bullets[0].classList.add("is-current");
  animateBulletFill(0);
  animateTextIn(slides[0]);

  // Play first slide's video
  const initialVideo = getVideo(slides[0]);
  if (initialVideo) initialVideo.play();

  startAutoplay();
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", createHeroSlider);
