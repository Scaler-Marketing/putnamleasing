function initCarModal() {
  const carModal = document.querySelector(".car-modal");
  const carModalGallery = document.querySelector(".car-gallery_imgs");
  const carModalThumbs = document.querySelector(".car-gallery_thumbs");

  const carModalClose = document.querySelector(".car-modal_close");
  const carModalTrigger = document.querySelector(".car-modal_trigger");
  
  const carGallerySource = document.querySelector(".car-gallery_source");

  if (!carModal || !carGallerySource) {
    console.error("One or more required elements are missing.");
    return;
  }

  setupCarGallery(carGallerySource);

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

  carModalTl.fromTo(
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
    .5
  )
  .fromTo(
    carModalThumbs.querySelectorAll(".car-gallery_thumb-wrapper"),
    { y: "12rem" },
    {
      y: "0rem",
      duration: 1,
      stagger: 0.01,
      ease: "expo.inOut"
    },
    .5
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

function setupCarGallery(carGallerySource) {
  // get the JSON values from the car gallery source
  const items = getJSONValues(carGallerySource);

  // if there are no items, return early
  if (!items) {
    return;
  }

  // create a new Swiper instances
  const thumbs = new Swiper(".swiper.car-gallery_thumbs", {
    spaceBetween: 16,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
  });
  const gallery = new Swiper(".swiper.car-gallery_imgs", {
    effect: "fade",
    thumbs: {
      swiper: thumbs,
    },
  });

  // add the items to the Swiper instances
  items.forEach((item) => {
    thumbs.appendSlide(`<div class="swiper-slide car-gallery_thumb-wrapper"><img src="${item.url}" class="car-gallery_thumb"></div>`);
    gallery.appendSlide(
      `<div class="swiper-slide car-gallery_img-wrapper"><img src="${item.url}" class="car-gallery_img"></div>`
    );
  });
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

      console.log("Extracted JSON Object:", jsonObject);

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

document.addEventListener("DOMContentLoaded", initCarModal);