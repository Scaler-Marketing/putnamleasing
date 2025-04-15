import { setLoadingStates } from "./modules/setLoadingStates";
import { setRevealHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { setStaggerElements } from "./modules/staggerElements";
import { initButtons } from "./modules/buttons";
import { initMenu } from "./modules/menu";
import { setPathAnimations } from "./modules/setPathAnimation";
import { initFormSubmit } from "./modules/formSubmit";
import { setVideosModal } from "./modules/videoModal";

window.addEventListener("beforeunload", () => {
  console.log("beforeunload");
  setLoadingStates();
});

window.addEventListener("popstate", () => {
  console.log("popstate");
  setLoadingStates();
});

document.addEventListener("pageshow", (event) => {
  console.log("pageshow", event);
  // Check if the page was restored from the bfcache
  if (event.persisted) {
    // Re-run your loading animation
    setLoadingStates();
  }
});

// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  initButtons();
  setStaggerElements();
  setPathAnimations();
  initFormSubmit();
  setVideosModal();
  setLoadingStates();
});

document.fonts.ready.then(() => {
  setStaggerText();
  setRevealHeading();
});