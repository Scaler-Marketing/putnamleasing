function setHowItWorksSections() {
  console.log("setHowItWorksSections");
  let mm = gsap.matchMedia(); // Create a matchMedia instance

  mm.add(
    {
      small: '(max-width: 991px)',
      large: '(min-width: 992px)',
    },
    (ctx) => {  
      if (ctx.conditions.large){
        initializeSections(".image-mask_desktop", false);
      }
    }
  );

  function initializeSections(maskSelector, isMobile) {
    console.log("initializeSections", maskSelector, isMobile);
    const howItWorksSections = document.querySelectorAll(
      ".how-it-works_section"
    );
    const howItWorksMask = document.querySelector(maskSelector);

    if (!howItWorksSections || !howItWorksMask) {
      return;
    }

    howItWorksSections.forEach((section, i) => {  
      console.log(howItWorksMask, howItWorksMask.querySelectorAll("img")[i]);
      const image = howItWorksMask.querySelectorAll("img")[i];

      if (isMobile) {
        // Mobile: Only trigger onEnter and only once
        // Initial setup for paths
        gsap.set(image, { opacity: 0, scale: 1.1 });

        // Timeline for mask animation
        const maskTl = gsap.timeline({
          paused: true,
        });

        maskTl.to(image, {
          opacity: 1,
          scale: 1,
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

        if (!isFirst) {
          gsap.set(image, { opacity: 0, scale: 1.1 });
        }

        // Timeline for mask animation
        const maskTl = gsap.timeline({
          paused: true,
        });

        maskTl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "expo.inOut",
        });

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
            // onEnterBack: () => {
            //   if (!isLast) {
            //     maskTl.progress(1).reverse();
            //   }
            // },
            // onLeave: () => {
            //   if (!isLast) {
            //     maskTl.seek("out").play();
            //   }
            // },
            onLeaveBack: () => {
              if (!isFirst) {
                maskTl.progress(1).reverse();
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
