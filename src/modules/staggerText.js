import { setLinesWrapper } from "./setLinesWrapper";

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

    gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    gsap
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
    if (el.classList.contains('w-richtext')) {
      const staggerTextEls = new SplitType(el.querySelectorAll('p, li, h2, h3'), {
        types: "lines",
        tagName: "span",
      });
      setLinesWrapper(staggerTextEls.lines, () => {
        gsap.set(staggerTextEls.lines, { yPercent: 100 });
      });
    } else {
      const staggerTextEls = new SplitType(el, {
        types: "lines",
        tagName: "span",
      });
      setLinesWrapper(staggerTextEls.lines, () => {
        gsap.set(staggerTextEls.lines, { yPercent: 100 });
      });
    }
  })

  const textBlocks = document.querySelectorAll("[stagger-text]");

  textBlocks.forEach((el) => {
    el.classList.add("init");
    const words = el.querySelectorAll(".line"),
      startVal = el.dataset.startPos || "center bottom",
      endVal = el.dataset.endPos || "bottom center",
      stagger = el.dataset.stagger || 0.05,
      delay = el.dataset.delay || 0,
      withScrollTrigger = el.dataset.withScroll || false;
    // let tl = gsap.timeline({ paused: true });
    createScrollTrigger(el, words, startVal, endVal, stagger, delay, withScrollTrigger);
  });
}
