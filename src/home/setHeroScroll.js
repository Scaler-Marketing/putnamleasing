export function setHeroScroll() {
  const triggers = document.querySelectorAll(".home-header_spacer");
  const steps = document.querySelectorAll(".home-header_step");

  if (!triggers || !steps) {
    return;
  }

  steps.forEach((el, i) => {
    const trigger = triggers[i];
    const isFirst = i === 0;
    const isLast = i === steps.length - 1;
    createTransition(el, trigger, isFirst, isLast);
  });
}

// Link timelines to scroll position
function createTransition(el, triggerElement, isFirst, isLast) {
  const bg = el.querySelector(".home-header_bg");
  const content = el.querySelector(".home-header_inner-content");

  if (!isFirst) {
    gsap.set(bg, { xPercent: -10 });
    gsap.set(el, { maskPosition: "0% 0%" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        scrub: true,
        start: "top bottom",
        end: "35% center",
        // markers: true,
        pin: false,
      },
    });

    tl.fromTo(
      el,
      {
        maskPosition: "0% 0%",
      },
      {
        maskPosition: "50% 0%",
      }
    );

    tl.fromTo(
      bg,
      {
        xPercent: -10,
      },
      {
        xPercent: 0,
      },
      0
    );
  }

  if (!isLast) {
    gsap.set(bg, { opacity: 1 });
    gsap.set(content, { opacity: 1 });

    const endTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        scrub: true,
        start: "60% center",
        end: "center top",
        // markers: true,
        pin: false,
      },
    });

    endTl.fromTo(
      content,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        immediateRender: false,
      }
    );
    endTl.fromTo(
      bg,
      {
        opacity: 1,
      },
      {
        opacity: 0.2,
        immediateRender: false,
      }, 0
    );
  }
}
