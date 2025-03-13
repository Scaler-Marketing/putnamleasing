document.addEventListener("alpine:init", () => {
  Alpine.data("contactForm", () => ({
    step: 0,
    carMaker: null,
    leasePurpose: null,
    leaseTerms: null,
    budgetMin: null,
    budgetMax: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    totalSteps: document.querySelectorAll(".contact-form_step").length,
    carMakers: [],
    init() {
      const list = document.querySelector("[data-car-makers-list]");

      if (!list) {
        return;
      }

      const items = list.querySelectorAll("[data-car-makers-item]");
      items.forEach(item => {
        this.carMakers.push({
          name: item.querySelector("[data-car-makers-name]").textContent,
          src: item.querySelector("[data-car-makers-img]").src
        });
      });
    },
    nextStep(index) {
      if (this.step < this.totalSteps - 1 && this.checkConditions(0)) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 0) {
        this.step--;
      }
    },
    progressWidth() {
      return `${(((this.step + 1) / (this.totalSteps)) * 100)
        .toFixed(2)
        .toString()}%`;
    },
    budgetRange() {
      if (!this.budgetMin && !this.budgetMax) {
        return null;
      }
      if (this.budgetMin && !this.budgetMax) {
        return `${this.budgetMin}+`;
      }
      if (!this.budgetMin && this.budgetMax) {
        return `0 - ${this.budgetMax}`;
      }
      return `${this.budgetMin || 0} - ${this.budgetMax || 0}`;
    },
    currentCarMaker() {
      if (!this.carMaker) {
        return null;
      }
      return this.carMakers.find(carMaker => carMaker.name === this.carMaker);
    },
    checkConditions(index) {
      if (index === 0) {
        return this.carMaker && this.leasePurpose && this.budgetRange() && this.leaseTerms;
      }

      if (index === 1) {
        // check if email is valid using a regex pattern to check the email format
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
        return this.firstName && this.lastName && this.email && isEmailValid;
      }
    }
  }));
});

function initContactModal() {
  const modal = document.querySelector(".contact-modal");
  const triggers = document.querySelectorAll("[data-contact-trigger]");

  if (!modal || !triggers) {
    console.error("No contact modal found.");
    return;
  }

  const modalClose = modal.querySelector(".contact_close");

  if (!modalClose) {
    console.error("One or more required elements are missing.");
    return;
  }

  // setup contact modal gsap timeline
  const modalTl = gsap.timeline({
    paused: true,
    onStart: () => {
      modal.classList.add("is-active");
    },
    onReverseComplete: () => {
      modal.classList.remove("is-active");
    },
  });

  modalTl
    .fromTo(
      modal,
      { maskPosition: "0% 0%" },
      { maskPosition: "50% 0%", duration: 1, ease: "expo.inOut" }
    )
    .fromTo(
      modalClose,
      { y: "-8rem" },
      { y: "0rem", duration: 1, ease: "expo.inOut" },
      0.5
    );

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      if (modalTl.progress() === 1) {
        modalTl.reverse();
      } else {
        modalTl.play();
      }
    });
  });

  modalClose.addEventListener("click", () => {
    modalTl.reverse();
  });
}

initContactModal();