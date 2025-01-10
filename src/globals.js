import { setLoadingStates } from "./modules/setLoadingStates";
import { setRevealHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { setStaggerElements } from "./modules/staggerElements";
// import { initButtonStates } from "./modules/buttonStates";
// import { playVideoOnScroll, setTransparentVideo } from "./modules/playVideoOnScroll";
import { initMenu } from "./modules/menu";
// import { setImageMasks } from "./modules/setImageMasks";
// import { initFormSubmit } from "./modules/formSubmit";
// import { initContactForm } from "./modules/contactForm";
// import { setVideosModal } from "./modules/videoModal";

// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  // initButtonStates();
  // playVideoOnScroll();
  // setImageMasks();
  setStaggerElements();
  // initFormSubmit();
  // initContactForm();
  // setVideosModal();
});

document.fonts.ready.then(() => {
  setStaggerText();
  setRevealHeading();
  setLoadingStates();
});
