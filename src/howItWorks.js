function setHowItWorksSections() {
  let mm = gsap.matchMedia(); // Create a matchMedia instance

  mm.add(
    {
      small: '(max-width: 991px)',
      large: '(min-width: 992px)',
    },
    (ctx) => {  
      if (ctx.conditions.small) {
        initializeSections(".image-mask_mobile", true);
      }
      if (ctx.conditions.large){
        initializeSections(".image-mask_desktop", false);
      }
    }
  );

  function initializeSections(maskSelector, isMobile) {
    const howItWorksSections = document.querySelectorAll(
      ".how-it-works_section"
    );
    const howItWorksMasks = document.querySelectorAll(maskSelector);

    if (!howItWorksSections || !howItWorksMasks) {
      return;
    }

    howItWorksSections.forEach((section, i) => {
      const mask = howItWorksMasks[i];
      const maskPath = mask.querySelector("path");

      if (isMobile) {
        // Mobile: Only trigger onEnter and only once
        // Initial setup for paths
        gsap.set(maskPath, { drawSVG: "0%" });

        // Timeline for mask animation
        const maskTl = gsap.timeline({
          paused: true,
        });

        maskTl.to(maskPath, {
          drawSVG: "100%%",
          duration: 1,
          ease: "expo.inOut",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            // markers: true,
            once: true, // Ensure it only runs once
            onEnter: () => {
              maskTl.play();
            },
          },
        });
      } else {
        // Desktop: Full ScrollTrigger behavior
        const isFirst = i === 0;
        const isLast = i === howItWorksSections.length - 1;

        // Initial setup for paths
        gsap.set(maskPath, { drawSVG: "100% 100%" });

        // Timeline for mask animation
        const maskTl = gsap.timeline({
          paused: true,
        });

        maskTl.to(maskPath, {
          drawSVG: "100% 0%",
          duration: 1,
          ease: "expo.inOut",
        });
        maskTl.set(maskPath, { drawSVG: "0% 100%" });
        maskTl.to(maskPath, {
          drawSVG: "0% 0%",
          duration: 1,
          ease: "expo.inOut",
        });

        maskTl.addLabel("out", 1);
        maskTl.addPause(1);

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
            // markers: true,
            fastScrollEnd: 500,
            preventOverlaps: "how-it-works",
            onEnter: () => {
              if (!isFirst) {
                maskTl.play();
              }
            },
            onEnterBack: () => {
              if (!isLast) {
                maskTl.progress(1).reverse();
              }
            },
            onLeave: () => {
              if (!isLast) {
                maskTl.seek("out").play();
              }
            },
            onLeaveBack: () => {
              if (!isFirst) {
                maskTl.seek("out").reverse();
              }
            },
          },
        });
      }
    });
  }

  // Cleanup and reinitialize logic on breakpoint change
  mm.add("*", () => {
    mm.revert(); // Clean up GSAP timelines and ScrollTriggers before reinitializing
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setHowItWorksSections();
});
