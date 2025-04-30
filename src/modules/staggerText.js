// Link timelines to scroll position
function createScrollTrigger(triggerElement, elements, start, end, stagger, delay, withScroll) {
  const trigger = {
    trigger: triggerElement,
    scrub: true,
    start,
    fastScrollEnd: 500,
    preventOverlaps: "scroll-text",
  };

  if (!withScroll) {
    trigger.onEnter = () => {
      gsap.to(elements, {
        yPercent: 0,
        stagger: stagger,
        ease: "power4.out",
        delay: Number(delay),
      });
    };

    return gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    return gsap
      .timeline({
        scrollTrigger: trigger,
      })
      .to(words, {
        yPercent: 0,
        stagger: stagger,
        ease: "none",
      });
  }
}

export function setStaggerText() {
  // Split all words on the brand core section
  const textEls = document.querySelectorAll('[stagger-text]');

  textEls.forEach((el) => {
    el.classList.add("init");
    const startVal = el.dataset.startPos || "center bottom",
      endVal = el.dataset.endPos || "bottom center",
      stagger = el.dataset.stagger || 0.05,
      delay = el.dataset.delay || 0,
      withScrollTrigger = el.dataset.withScroll || false;

    if (el.classList.contains('w-richtext')) {
      const staggerTextEls = SplitText.create(
        el.querySelectorAll("p, li, h2, h3"),
        {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.lines, { yPercent: 100 });
            return createScrollTrigger(
              el,
              self.lines,
              startVal,
              endVal,
              stagger,
              delay,
              withScrollTrigger
            );
          }
        }
      );
    } else {
      const staggerTextEls = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(self.lines, { yPercent: 100 });
          return createScrollTrigger(
            el,
            self.lines,
            startVal,
            endVal,
            stagger,
            delay,
            withScrollTrigger
          );
        },
      });
    }
  })
}
