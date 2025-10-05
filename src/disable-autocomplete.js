/**
 * ULTRA-AGGRESSIVE Autocomplete/Autosuggestion Disabler
 * Targets ALL forms with autocomplete="off" attribute
 *
 * This script uses EXTREME techniques to ensure browsers don't show
 * autocomplete dropdowns or suggestions on form inputs.
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
   * ULTRA-AGGRESSIVE autocomplete disabling for a single input
   */
  function disableInputAutocomplete(input) {
    // Store original attributes
    const originalName = input.name || input.id || "input";
    const originalId = input.id;

    // Set MULTIPLE conflicting autocomplete attributes
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocomplete", "new-password");
    input.setAttribute("autocomplete", "nope");
    input.setAttribute("autocomplete", "false");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");

    // Additional aggressive attributes
    input.setAttribute("data-lpignore", "true");
    input.setAttribute("data-form-type", "other");
    input.setAttribute("data-1p-ignore", "true");
    input.setAttribute("data-bwignore", "true");

    // Randomize name and id frequently (but NOT for radio/checkbox buttons!)
    const randomizeName = () => {
      // Skip name randomization for radio/checkbox buttons to preserve grouping
      if (input.type === "radio" || input.type === "checkbox") {
        return;
      }

      const randomSuffix = generateRandomString();
      input.setAttribute("data-original-name", originalName);
      input.setAttribute("data-original-id", originalId);
      input.name = `${originalName}_${randomSuffix}`;
      if (originalId) {
        input.id = `${originalId}_${randomSuffix}`;
      }
    };

    // Only randomize if not a radio or checkbox button
    if (input.type !== "radio" && input.type !== "checkbox") {
      randomizeName();
    }

    // Readonly technique with multiple triggers
    const makeReadonly = () => {
      input.setAttribute("readonly", "readonly");
      input.readOnly = true;
    };

    const removeReadonly = () => {
      input.removeAttribute("readonly");
      input.readOnly = false;
    };

    // Gentle focus handling (no more stuttering!)
    input.addEventListener("focus", function () {
      // Only randomize name once per focus, not constantly (and not for radio/checkbox buttons)
      if (
        !this.hasAttribute("data-name-randomized") &&
        this.type !== "radio" &&
        this.type !== "checkbox"
      ) {
        randomizeName();
        this.setAttribute("data-name-randomized", "true");
      }
    });

    input.addEventListener("blur", function () {
      // Restore original name/id for form submission
      if (this.getAttribute("data-original-name")) {
        this.name = this.getAttribute("data-original-name");
      }
      if (this.getAttribute("data-original-id")) {
        this.id = this.getAttribute("data-original-id");
      }
      // Reset randomization flag for next focus
      this.removeAttribute("data-name-randomized");
    });

    // Aggressive input handling
    input.addEventListener("input", function () {
      // Constantly change autocomplete attribute
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

      // Only re-randomize name occasionally, not constantly (and not for radio/checkbox buttons)
      if (
        Math.random() > 0.95 &&
        this.type !== "radio" &&
        this.type !== "checkbox"
      ) {
        randomizeName();
      }
    });

    // Prevent right-click context menu autocomplete
    input.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });

    // Keyboard event interference
    input.addEventListener("keydown", function (e) {
      // Prevent arrow keys that might trigger autocomplete
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.stopPropagation();
      }
    });

    // Skip initial readonly to prevent stuttering
    // The other techniques should be sufficient

    // Periodically re-apply attributes (every 2 seconds)
    setInterval(() => {
      input.setAttribute("autocomplete", "off");
      input.setAttribute("data-lpignore", "true");
    }, 2000);
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
   * ULTRA-AGGRESSIVE CSS to obliterate any autocomplete UI
   */
  function injectAntiAutocompleteCSS() {
    const style = document.createElement("style");
    style.textContent = `
            /* NUCLEAR OPTION: Hide ALL possible autocomplete dropdowns */
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
                -webkit-text-fill-color: inherit !important;
                transition: background-color 5000s ease-in-out 0s !important;
            }
            
            /* Hide ALL browser suggestion UI elements */
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
            
            /* Hide dropdown suggestions globally */
            [role="listbox"],
            [role="option"],
            .autocomplete-suggestion,
            .autocomplete-suggestions,
            .ui-autocomplete,
            .ui-menu,
            datalist,
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
            
            /* Prevent any dropdown positioning */
            form[autocomplete="off"] input {
                position: relative !important;
            }
            
            form[autocomplete="off"] input::after,
            form[autocomplete="off"] input::before {
                display: none !important;
            }
            
            /* Hide Chrome's address autofill */
            input[type="text"]::-webkit-contacts-auto-fill-button {
                position: absolute !important;
                right: -1000px !important;
                visibility: hidden !important;
            }
            
            /* Aggressive z-index manipulation */
            form[autocomplete="off"] {
                position: relative !important;
            }
            
            /* Hide any floating suggestion panels */
            div[style*="position: absolute"],
            div[style*="position: fixed"] {
                z-index: -1 !important;
            }
            
            /* Target specific browser suggestion classes */
            .chrome-autofill-suggestion,
            .firefox-autofill-suggestion,
            .safari-autofill-suggestion,
            .edge-autofill-suggestion {
                display: none !important;
            }
        `;
    document.head.appendChild(style);

    // Also inject a second style element as backup
    const backupStyle = document.createElement("style");
    backupStyle.textContent = `
        /* BACKUP NUCLEAR CSS - Only target form inputs, not all elements */
        form[autocomplete="off"] input,
        form[autocomplete="off"] textarea {
            -webkit-user-modify: read-write-plaintext-only !important;
            -webkit-appearance: none !important;
        }
    `;
    document.head.appendChild(backupStyle);
  }

  /**
   * NUCLEAR OPTION: Global event interception
   */
  function interceptAutocompleteEvents() {
    // Intercept all keydown events globally
    document.addEventListener(
      "keydown",
      function (e) {
        const target = e.target;
        if (target && target.closest && target.closest(FORM_SELECTOR)) {
          // Block arrow keys that trigger autocomplete
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

    // Intercept focus events (gentler approach)
    document.addEventListener(
      "focusin",
      function (e) {
        const target = e.target;
        if (
          target &&
          target.closest &&
          target.closest(FORM_SELECTOR) &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
        ) {
          // Just reset autocomplete attributes, no blur/focus disruption
          target.setAttribute("autocomplete", "off");
          target.setAttribute("autocomplete", "new-password");
        }
      },
      true
    );

    // Block all autocomplete-related events
    ["input", "change", "keyup", "keypress"].forEach((eventType) => {
      document.addEventListener(
        eventType,
        function (e) {
          const target = e.target;
          if (
            target &&
            target.closest &&
            target.closest(FORM_SELECTOR) &&
            (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
          ) {
            // Constantly reset autocomplete
            target.setAttribute("autocomplete", "off");
            target.setAttribute("autocomplete", "new-password");
          }
        },
        true
      );
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeAutocompleteDisabler();
      injectAntiAutocompleteCSS();
      interceptAutocompleteEvents();
    });
  } else {
    initializeAutocompleteDisabler();
    injectAntiAutocompleteCSS();
    interceptAutocompleteEvents();
  }

  // Also run immediately in case the script loads after DOMContentLoaded
  setTimeout(() => {
    initializeAutocompleteDisabler();
    interceptAutocompleteEvents();
  }, 100);

  // Run periodically to catch any new elements
  setInterval(() => {
    initializeAutocompleteDisabler();
  }, 5000);
})();
