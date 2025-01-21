export function setPathAnimations() {
  const paths = document.querySelectorAll("[path-animation]");

  if (!paths) {
    return;
  }

  // set svg path animation using GSAP, ScrollTrigger and DrawSVG plugins
  paths.forEach((path) => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 1, ease: "expo.inOut" },
    });

    tl.fromTo(path.querySelector("path"), 
      { drawSVG: "0%" },
      { drawSVG: "100%" },
    );

    ScrollTrigger.create({
      trigger: path,
      start: "top center",
      animation: tl,
      toggleActions: "play none none none",
    });
  });
}