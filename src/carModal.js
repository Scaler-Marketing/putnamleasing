function initCarModal(carModal, carModalTrigger) {
  const carModalGallery = carModal.querySelector(".car-gallery_imgs");
  const carModalThumbs = carModal.querySelector(".car-gallery_thumbs");
  const carModalClose = carModal.querySelector(".car-modal_close");
  const carGallerySource = carModal.querySelector(".car-gallery_source");

  if (!carModal || !carGallerySource) {
    console.error("One or more required elements are missing.");
    return;
  }

  setupCarGallery(carGallerySource, carModalThumbs, carModalGallery);

  // setup car modal gsap timeline
  const carModalTl = gsap.timeline({
    paused: true,
    onStart: () => {
      carModal.classList.add("is-active");
    },
    onReverseComplete: () => {
      carModal.classList.remove("is-active");
    },
  });

  carModalTl
    .fromTo(
      carModal,
      { maskPosition: "0% 0%" },
      { maskPosition: "50% 0%", duration: 1, ease: "expo.inOut" }
    )
    .fromTo(
      carModalClose,
      { y: "-8rem" },
      { y: "0rem", duration: 1, ease: "expo.inOut" },
      0.5
    )
    .fromTo(
      carModalGallery,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "expo.inOut" },
      0.5
    )
    .fromTo(
      carModalThumbs.querySelectorAll(".car-gallery_thumb-wrapper"),
      { y: "12rem" },
      {
        y: "0rem",
        duration: 1,
        stagger: 0.01,
        ease: "expo.inOut",
      },
      0.5
    );

  carModalTrigger.addEventListener("click", () => {
    if (carModalTl.progress() === 1) {
      carModalTl.reverse();
    } else {
      carModalTl.play();
    }
  });

  carModalClose.addEventListener("click", () => {
    carModalTl.reverse();
  });
}

function setupCarGallery(carGallerySource, thumbsEl, galleryEl) {
  // get the JSON values from the car gallery source
  const items = getJSONValues(carGallerySource);

  // if there are no items, return early
  if (!items) {
    return;
  }

  // create a new Swiper instances
  const thumbs = new Swiper(thumbsEl, {
    spaceBetween: 16,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
  });

  items.forEach((item) => {
    thumbs.appendSlide(
      `<div class="swiper-slide car-gallery_thumb-wrapper"><img src="${item.url}" class="car-gallery_thumb"></div>`
    );
  });

  thumbs.update();

  const gallery = new Swiper(galleryEl, {
    effect: "fade",
    thumbs: {
      swiper: thumbs,
    },
  });

  items.forEach((item) => {
    gallery.appendSlide(
      `<div class="swiper-slide car-gallery_img-wrapper"><img src="${item.url}" class="car-gallery_img"></div>`
    );
  });
  gallery.update();
}

function getJSONValues(el) {
  // Find the <script> tag inside the <a> tag
  const scriptElement = el.querySelector(
    'script[type="application/json"]'
  );

  if (scriptElement) {
    // Get the content of the <script> tag
    const jsonString = scriptElement.textContent.trim();

    try {
      // Parse the JSON string into a JavaScript object
      const jsonObject = JSON.parse(jsonString);

      // console.log("Extracted JSON Object:", jsonObject);

      return jsonObject.items;

      // Now you can use the jsonObject as needed
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.error(
      "No script tag with type application/json found inside the link element."
    );
  }
}

function initCarModals() {
  const carModals = document.querySelectorAll(".car-modal");

  if (!carModals) {
    console.error("No car modals found.");
    return;
  }

  carModals.forEach((carModal) => {
    // get car modal id
    const carModalId = carModal.dataset.carId;

    if (!carModalId) {
      console.error("No car id found.");
      return;
    }

    const trigger = document.querySelector(`[data-car-target="${carModalId}"]`);

    if (!trigger) {
      console.error("No trigger found.");
      return;
    }

    initCarModal(carModal, trigger);
  });
}

document.addEventListener("DOMContentLoaded", initCarModals);