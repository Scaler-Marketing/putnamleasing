// Link timelines to scroll position
export function createScrollTrigger(el, triggerEl, start, end, delay, withScroll) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("reveal-heading_wrapper");
  el.parentNode.insertBefore(wrapper, el);
  const transparent = el.cloneNode(true);
  wrapper.appendChild(el);
  wrapper.appendChild(transparent);
  transparent.classList.add('transparent');
  // transparent.removeAttribute('revealHeading');

  gsap.set(el, { opacity: 0 });
  gsap.set(transparent, { backgroundPositionX: "0%" });

  const trigger = {
    trigger: triggerEl,
    scrub: true,
    once: true,
    start,
    fastScrollEnd: 500,
    preventOverlaps: "scroll-headings",
  };

  if (!withScroll) {
    const tl = gsap.timeline({ paused: true });

    trigger.onEnter = () => {
      tl
      .to(transparent, {
        backgroundPositionX: "50%",
        delay,
        duration: 0.5,
        overwrite: "auto",
        ease: "expo.out",
        onComplete: () => {
          gsap.set(el,{ opacity: 1 })
        }
      })
        .to(transparent, {
          backgroundPositionX: "100%",
          duration: 0.5,
          overwrite: "auto",
          ease: "expo.out",
          onComplete: () => {
            transparent.remove();
          },
        });

      tl.play();
    };

    gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    gsap
      .timeline({
        scrollTrigger: trigger,
      })
      .to(transparent, {
        backgroundPositionX: "50%",
        delay,
        duration: 0.3,
        overwrite: "auto",
        ease: "expo.out",
        onComplete: () => {
          gsap.set(el, { opacity: 1 });
        },
      })
      .to(transparent, {
        backgroundPositionX: "100%",
        duration: 0.3,
        overwrite: "auto",
        ease: "expo.out",
        onComplete: () => {
          transparent.remove();
        },
      });
  }
}

export function setRevealHeading() {
  const blocks = document.querySelectorAll("[reveal-heading]");

  blocks.forEach((el) => {
    el.classList.add('init');
    const startVal = el.dataset.startPos || "center bottom",
      endVal = el.dataset.endPos || "bottom center",
      delay = el.dataset.delay || 0.2,
      withScrollTrigger = el.dataset.withScroll || false;
    createScrollTrigger(el, el, startVal, endVal, delay, withScrollTrigger);
  });
}
