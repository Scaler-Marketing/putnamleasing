function initAboutModal(trigger) {
  const managerId = trigger.getAttribute("data-modal");
  const el = document.querySelector(`[data-id="${managerId}"]`);

  if (!el) {
    return;
  }

  const aboutModalImg = el.querySelector(".manager-modal .manager-card_img");
  const aboutModalClose = el.querySelector(".manager-modal_close");

  // setup car modal gsap timeline
  const aboutModalTl = gsap.timeline({
    paused: true,
    onStart: () => {

      el.classList.add("is-active");
    },
    onReverseComplete: () => {
      el.classList.remove("is-active");
    },
  });

  aboutModalTl
    .fromTo(
      el,
      { maskPosition: "0% 0%" },
      { maskPosition: "50% 0%", duration: 1, ease: "expo.inOut" }
    )
    .fromTo(
      aboutModalClose,
      { y: "-8rem" },
      { y: "0rem", duration: 1, ease: "expo.inOut" },
      0.5
    )
    .fromTo(
      aboutModalImg,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "expo.inOut" },
      0.5
    );

  trigger.addEventListener("click", () => {
    if (aboutModalTl.progress() === 1) {
      aboutModalTl.reverse();
    } else {
      aboutModalTl.play();
    }
  });

  aboutModalClose.addEventListener("click", () => {
    aboutModalTl.reverse();
  });
}

function initAboutModals() {
  const managersTrigger = document.querySelectorAll("[data-modal]");

  if (!managersTrigger) {
    return;
  }

  managersTrigger.forEach((el) => {
    initAboutModal(el);
  });
}

document.addEventListener("DOMContentLoaded", initAboutModals);