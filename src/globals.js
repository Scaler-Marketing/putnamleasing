import { setLoadingStates } from "./modules/setLoadingStates";
import { setRevealHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { setStaggerElements } from "./modules/staggerElements";
import { initButtons } from "./modules/buttons";
import { initMenu } from "./modules/menu";
import { setPathAnimations } from "./modules/setPathAnimation";
import { initFormSubmit } from "./modules/formSubmit";
// import { initContactForm } from "./modules/contactForm";
import { setVideosModal } from "./modules/videoModal";

// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  initButtons();
  setStaggerElements();
  setPathAnimations();
  initFormSubmit();
  // initContactForm();
  setVideosModal();
});

document.fonts.ready.then(() => {
  setStaggerText();
  setRevealHeading();
  setLoadingStates();
});
