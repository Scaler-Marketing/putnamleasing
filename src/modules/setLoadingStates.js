export function setLoadingStates() {
  const loading = document.querySelector(".loading-wrapper");
  if (!loading) {
    return;
  }

  const logo = loading.querySelector(".loading_logo");
  const logoCircle = logo.querySelector("circle");
  const logoPath = logo.querySelector("path");

  gsap.set(logoCircle, { drawSVG: "0 100% live" });
  gsap.set(logoPath, { drawSVG: "0 100% live" });

  gsap.to(logoCircle, {
    drawSVG: "100% 100% live",
    duration: 1,
    ease: "expo.out",
  });
  gsap.to(logoPath, {
    drawSVG: "100% 100% live",
    duration: 1,
    ease: "expo.out",
  });
  gsap.to(loading, {
    maskPosition: "100% 100%",
    duration: 1,
    delay: 0.5,
    ease: "expo.out",
    onComplete: () => {
      loading.style.display = "none";
      gsap.set(logoCircle, { drawSVG: "0% 0% live" });
      gsap.set(logoPath, { drawSVG: "0% 0% live" });
      gsap.set(loading, { maskPosition: "0% 100%" });
    },
  });

  // Loading animation
  const links = document.querySelectorAll("a");
  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      // e.preventDefault();
      const href = l.href;
      const url = new URL(href);

      if (
        window.location.origin === url.origin &&
        window.location.pathname !== url.pathname &&
        l.target !== "_blank"
      ) {
        e.preventDefault();

        loading.style.display = "block";
        gsap.to(logoCircle, {
          drawSVG: "0% 100% live",
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(logoPath, {
          drawSVG: "0% 100% live",
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(loading, {
          maskPosition: "50% 100%",
          duration: 1,
          delay: 0.5,
          ease: "expo.out",
          onComplete: () => {
            window.location.href = href;
          },
        });

        // setTimeout(() => {
        //   window.location.href = href;
        // }, 500);
      }
    });
  });
}
