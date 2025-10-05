/**
 * Gentle Autocomplete Disabler
 * Targets forms with autocomplete="off" attribute
 *
 * This script uses targeted techniques to disable autocomplete
 * without interfering with other page functionality.
 */

(function () {
  "use strict";

  // Target all forms with autocomplete="off" instead of specific ID
  const FORM_SELECTOR = 'form[autocomplete="off"]';

  /**
   * Generate a unique random string
   */
  function generateRandomString() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Gentle autocomplete disabling for a single input
   */
  function disableInputAutocomplete(input) {
    // Store original attributes
    const originalName = input.name || input.id || "input";
    const originalId = input.id;

    // Set multiple conflicting autocomplete attributes (aggressive but targeted)
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocomplete", "new-password");
    input.setAttribute("autocomplete", "nope");
    input.setAttribute("autocomplete", "false");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");

    // Password manager ignore attributes
    input.setAttribute("data-lpignore", "true");
    input.setAttribute("data-form-type", "other");
    input.setAttribute("data-1p-ignore", "true");
    input.setAttribute("data-bwignore", "true");

    // Only use name randomization on focus/blur, not constantly
    let nameRandomized = false;

    // Gentle focus handling - only randomize name when needed
    input.addEventListener("focus", function () {
      // Only randomize name for text inputs, not radio/checkbox buttons
      if (
        !nameRandomized &&
        this.type !== "radio" &&
        this.type !== "checkbox" &&
        this.type !== "button" &&
        this.type !== "submit"
      ) {
        const randomSuffix = generateRandomString();
        this.setAttribute("data-original-name", originalName);
        this.setAttribute("data-original-id", originalId);
        this.name = `${originalName}_${randomSuffix}`;
        if (originalId) {
          this.id = `${originalId}_${randomSuffix}`;
        }
        nameRandomized = true;
      }

      // Refresh autocomplete attribute
      this.setAttribute("autocomplete", "off");
    });

    input.addEventListener("blur", function () {
      // Restore original name/id for form submission
      if (this.getAttribute("data-original-name")) {
        this.name = this.getAttribute("data-original-name");
      }
      if (this.getAttribute("data-original-id")) {
        this.id = this.getAttribute("data-original-id");
      }
      nameRandomized = false;
    });

    // Aggressive input handling - cycle through autocomplete values
    input.addEventListener("input", function () {
      // Constantly change autocomplete attribute to confuse browsers
      const randomAutocomplete = [
        "new-password",
        "off",
        "nope",
        "false",
        "one-time-code",
        "new-username",
        "chrome-off",
      ];
      this.setAttribute(
        "autocomplete",
        randomAutocomplete[
          Math.floor(Math.random() * randomAutocomplete.length)
        ]
      );
    });

    // Add keyboard event handling to block autocomplete triggers
    input.addEventListener("keydown", function (e) {
      // Only block arrow keys that might trigger autocomplete within our targeted forms
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.stopPropagation();
      }
    });

    // Periodically re-apply attributes (every 3 seconds) for targeted inputs only
    setInterval(() => {
      if (input.closest(FORM_SELECTOR)) {
        input.setAttribute("autocomplete", "off");
        input.setAttribute("data-lpignore", "true");
      }
    }, 3000);
  }

  /**
   * Disable autocomplete for the entire form
   */
  function disableFormAutocomplete(form) {
    // Set form-level autocomplete attributes
    form.setAttribute("autocomplete", "off");
    form.setAttribute("novalidate", "novalidate");

    // Find all input, select, and textarea elements
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      // Skip buttons and submit inputs
      if (
        input.type === "button" ||
        input.type === "submit" ||
        input.type === "reset"
      ) {
        return;
      }

      disableInputAutocomplete(input);
    });

    // Observe for dynamically added inputs
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            // Element node
            const newInputs = node.querySelectorAll
              ? node.querySelectorAll("input, select, textarea")
              : [];

            newInputs.forEach((input) => {
              if (
                input.type !== "button" &&
                input.type !== "submit" &&
                input.type !== "reset"
              ) {
                disableInputAutocomplete(input);
              }
            });

            // Check if the node itself is an input
            if (node.matches && node.matches("input, select, textarea")) {
              if (
                node.type !== "button" &&
                node.type !== "submit" &&
                node.type !== "reset"
              ) {
                disableInputAutocomplete(node);
              }
            }
          }
        });
      });
    });

    observer.observe(form, {
      childList: true,
      subtree: true,
    });

    const formId = form.id || form.className || "unnamed-form";
    // console.log(`✅ Autocomplete disabled for form: ${formId}`);
    // console.log(`📊 Processed ${inputs.length} form elements`);
  }

  /**
   * Initialize the autocomplete disabler for all matching forms
   */
  function initializeAutocompleteDisabler() {
    const forms = document.querySelectorAll(FORM_SELECTOR);

    if (forms.length > 0) {
      forms.forEach((form) => {
        disableFormAutocomplete(form);
      });
      // console.log(
      //   `🎯 Found and processed ${forms.length} form(s) with autocomplete="off"`
      // );
    } else {
      // console.warn(
      //   `⚠️ No forms with autocomplete="off" found. Waiting for them to appear...`
      // );

      // Wait for forms to appear in the DOM
      const observer = new MutationObserver(function (mutations) {
        const newForms = document.querySelectorAll(FORM_SELECTOR);
        if (newForms.length > 0) {
          newForms.forEach((form) => {
            // Check if this form hasn't been processed yet
            if (!form.hasAttribute("data-autocomplete-disabled")) {
              form.setAttribute("data-autocomplete-disabled", "true");
              disableFormAutocomplete(form);
            }
          });
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  /**
   * Aggressive CSS to disable autocomplete - but ONLY for targeted forms
   */
  function injectAntiAutocompleteCSS() {
    const style = document.createElement("style");
    style.textContent = `
            /* Target autofill ONLY in forms with autocomplete="off" */
            form[autocomplete="off"] input:-webkit-autofill,
            form[autocomplete="off"] input:-webkit-autofill:hover,
            form[autocomplete="off"] input:-webkit-autofill:focus,
            form[autocomplete="off"] input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
                -webkit-text-fill-color: inherit !important;
                transition: background-color 5000s ease-in-out 0s !important;
            }
            
            /* Hide ALL browser suggestion UI elements in targeted forms */
            form[autocomplete="off"] input[list]::-webkit-calendar-picker-indicator,
            form[autocomplete="off"] input::-webkit-contacts-auto-fill-button,
            form[autocomplete="off"] input::-webkit-credentials-auto-fill-button,
            form[autocomplete="off"] input::-webkit-strong-password-auto-fill-button,
            form[autocomplete="off"] input::-webkit-caps-lock-indicator,
            form[autocomplete="off"] input::-webkit-list-button {
                visibility: hidden !important;
                display: none !important;
                pointer-events: none !important;
                height: 0 !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                opacity: 0 !important;
            }
            
            /* Hide dropdown suggestions in targeted forms */
            form[autocomplete="off"] datalist,
            form[autocomplete="off"] datalist option {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                max-height: 0 !important;
                overflow: hidden !important;
                pointer-events: none !important;
            }
            
            /* Prevent dropdown positioning in targeted forms */
            form[autocomplete="off"] input {
                position: relative !important;
            }
            
            form[autocomplete="off"] input::after,
            form[autocomplete="off"] input::before {
                display: none !important;
            }
            
            /* Hide Chrome's address autofill in targeted forms */
            form[autocomplete="off"] input[type="text"]::-webkit-contacts-auto-fill-button {
                position: absolute !important;
                right: -1000px !important;
                visibility: hidden !important;
            }
        `;
    document.head.appendChild(style);

    // Add a second style element for additional browser-specific rules
    const backupStyle = document.createElement("style");
    backupStyle.textContent = `
        /* Additional targeted rules for forms with autocomplete="off" */
        form[autocomplete="off"] input,
        form[autocomplete="off"] textarea {
            -webkit-user-modify: read-write-plaintext-only !important;
        }
        
        /* Hide any autocomplete suggestion containers that appear near targeted forms */
        form[autocomplete="off"] ~ div[style*="position: absolute"],
        form[autocomplete="off"] ~ div[style*="position: fixed"] {
            display: none !important;
        }
    `;
    document.head.appendChild(backupStyle);
  }

  /**
   * Targeted aggressive event handling - only for forms with autocomplete="off"
   */
  function setupTargetedEventHandling() {
    // Handle focus events for targeted forms only
    document.addEventListener("focusin", function (e) {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(FORM_SELECTOR) &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        // Aggressively reset autocomplete attributes
        target.setAttribute("autocomplete", "off");
        target.setAttribute("autocomplete", "new-password");
      }
    });

    // Handle keydown events but only for targeted forms
    document.addEventListener(
      "keydown",
      function (e) {
        const target = e.target;
        if (target && target.closest && target.closest(FORM_SELECTOR)) {
          // Block arrow keys that trigger autocomplete, but only in our targeted forms
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          }
        }
      },
      true
    );

    // Handle input events for targeted forms
    document.addEventListener("input", function (e) {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(FORM_SELECTOR) &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        // Constantly reset autocomplete for targeted inputs
        target.setAttribute("autocomplete", "off");
        target.setAttribute("autocomplete", "new-password");
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeAutocompleteDisabler();
      injectAntiAutocompleteCSS();
      setupTargetedEventHandling();
    });
  } else {
    initializeAutocompleteDisabler();
    injectAntiAutocompleteCSS();
    setupTargetedEventHandling();
  }

  // Also run immediately in case the script loads after DOMContentLoaded
  setTimeout(() => {
    initializeAutocompleteDisabler();
  }, 100);

  // Run periodically to catch any new elements (back to 5s for effectiveness)
  setInterval(() => {
    initializeAutocompleteDisabler();
  }, 5000);
})();
