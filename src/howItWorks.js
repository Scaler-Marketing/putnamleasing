function setHowItWorksSections() {
  const mm = gsap.matchMedia(); // Create a matchMedia instance

  mm.add({
    // Breakpoint for desktop
    "(min-width: 992px)": () => {
      console.log("Desktop breakpoint active");
      initializeSections(".how-it-works_mask_desktop", false);
    },
    // Breakpoint for mobile
    "(max-width: 991px)": () => {
      console.log("Mobile breakpoint active");
      initializeSections(".how-it-works_mask_mobile", true);
    },
  });

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

      // Initial setup for paths
      gsap.set(maskPath, { drawSVG: "0% 100%" });

      // Timeline for mask animation
      const maskTl = gsap.timeline({
        paused: true,
      });

      maskTl.to(maskPath, {
        drawSVG: "100% 0%",
        duration: 1,
        ease: "expo.inOut",
      });

      if (isMobile) {
        // Mobile: Only trigger onEnter and only once
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            markers: true,
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
    console.log("Reverting previous logic");
    mm.revert(); // Clean up GSAP timelines and ScrollTriggers before reinitializing
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setHowItWorksSections();
});
