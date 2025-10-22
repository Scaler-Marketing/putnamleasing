/*
 * ========================================
 * FANCYBOX + THUMBNAIL CAROUSEL INTEGRATION
 * ========================================
 *
 * A complete image gallery solution for Webflow with:
 * - Swiper.js-style thumbnail carousel with touch/drag support
 * - Fancybox lightbox integration
 * - Main image navigation arrows
 * - Synchronized carousel scrolling
 * - Keyboard navigation support
 *
 * Author: AI Assistant
 * Version: 2.0
 * Compatible with: Fancybox 5.0+, Webflow CMS
 */

// ========================================
// CONFIGURATION & SELECTORS
// ========================================

const CONFIG = {
  // Main selectors (update these if your Webflow classes are different)
  SELECTORS: {
    mainImage: '[data-fancybox-main="true"]', // Main large image element
    thumbnailContainer: ".lightbox_mini-image-wrapper-collection-list", // Thumbnail container
    thumbnailItem: ".lightbox_mini-image", // Individual thumbnail containers (divs)
    thumbnailImage: 'img[data-fancybox="car-gallery"]', // Thumbnail image elements
  },

  // Gallery settings
  GALLERY: {
    name: "car-gallery", // Fancybox gallery group name
    dragThreshold: 5, // Minimum pixels to drag before scrolling starts (desktop)
    mobileDragThreshold: 5, // Lower threshold for better mobile swipe response
    momentumMultiplier: {
      mouse: 200, // Mouse momentum strength
      touch: 300, // Touch momentum strength
    },
  },

  // Thumbnail styling
  THUMBNAILS: {
    minWidth: "80px", // Minimum thumbnail width
    gap: "10px", // Space between thumbnails
    borderRadius: "8px", // Rounded corners
    // activeBorder: "2px solid rgb(224, 236, 0)", // Active thumbnail border
    // inactiveBorder: "2px solid #e41837", // Inactive thumbnail border
    activeOpacity: "1", // Active thumbnail opacity
    inactiveOpacity: "0.7", // Inactive thumbnail opacity
    activeScale: "scale(1.05)", // Active thumbnail scale
    inactiveScale: "scale(1)", // Inactive thumbnail scale
    hoverOpacity: "0.9", // Hover state opacity
    hoverScale: "scale(1.02)", // Hover state scale
    // Border options (set to true to enable borders)
    // enableBorders: true, // Enable/disable thumbnail borders
    // borderWidth: "2px", // Border width for thumbnails
    // borderStyle: "solid", // Border style (solid, dashed, dotted, etc.)
    // activeBorderColor: "#e41837", // Active thumbnail border color
    // inactiveBorderColor: "transparent", // Inactive thumbnail border color
    // hoverBorderColor: "#0056b3", // Hover state border color
  },

  // Navigation arrows
  ARROWS: {
    size: "40px", // Arrow button size
    position: "15px", // Distance from image edges
    background: "rgba(0, 0, 0, 0.6)", // Arrow background color
    backgroundHover: "#e41837", // Arrow hover background
    color: "white", // Arrow icon color
    fontSize: "24px", // Arrow icon size
    activeOpacity: "1", // Active arrow opacity
    disabledOpacity: "0.3", // Disabled arrow opacity
    transition: "opacity 0.3s ease, background 0.3s ease", // CSS transitions
  },

  // Animation settings
  ANIMATIONS: {
    fadeTransition: "0.3s ease", // Main image fade speed
    scrollBehavior: "smooth", // Carousel scroll behavior
    dragTransition: "none", // Disable transitions during drag
    momentumDuration: "0.6s", // Momentum scroll duration
    momentumEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Momentum easing curve
    // Cross-fade settings for main image
    crossFadeEnabled: true, // Enable cross-fade effect for main image
    crossFadeDuration: "400ms", // Duration of cross-fade transition
    crossFadeEasing: "ease-in-out", // Easing function for cross-fade
    crossFadeOpacity: 0.3, // Minimum opacity during transition (0-1)
  },

  // Fancybox configuration
  FANCYBOX: {
    toolbar: {
      left: ["infobar"],
      middle: [
        "zoomIn",
        "zoomOut",
        "toggle1to1",
        "rotateCCW",
        "rotateCW",
        "flipX",
        "flipY",
      ],
      right: ["slideshow", "thumbs", "close"],
    },
    thumbsAutoStart: false, // Don't auto-show Fancybox thumbnails
    enableZoom: true, // Enable image zoom
    showClass: "fancybox-fadeIn", // Fancybox open animation
    hideClass: "fancybox-fadeOut", // Fancybox close animation
    overlayColor: "rgba(0, 0, 0, 0.95)", // Dark overlay color (supports rgba, hex, hsl, etc.)
  },
};

// ========================================
// MAIN SCRIPT INITIALIZATION
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // console.log("🚀 Fancybox Gallery Script Starting...");
  // console.log("📋 Configuration loaded:", CONFIG);

  // Detect if we're on mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
  // console.log("📱 Mobile device detected:", isMobile);

  // ========================================
  // FANCYBOX INITIALIZATION
  // ========================================

  // Check if Fancybox library is loaded
  if (typeof Fancybox === "undefined") {
    // console.error(
    //   "❌ Fancybox library not found! Make sure to include Fancybox JS before this script."
    // );
    return;
  }
  // console.log("✅ Fancybox library loaded successfully");

  // Note: We don't use Fancybox.bind() because we manually control when to open Fancybox
  // This prevents duplicate images in the lightbox
  // console.log("✅ Fancybox library ready - using manual control");

  // ========================================
  // DOM ELEMENT DETECTION
  // ========================================

  // console.log("🔍 Locating gallery elements using configured selectors...");

  // Find main image element
  const mainImage = document.querySelector(CONFIG.SELECTORS.mainImage);
  // console.log("🖼️ Main image element:", mainImage);

  // Find thumbnail container
  const thumbnailContainer = document.querySelector(
    CONFIG.SELECTORS.thumbnailContainer
  );
  // console.log("📁 Thumbnail container:", thumbnailContainer);

  // Validate required elements
  if (!mainImage) {
    // console.error(
    //   `❌ Main image not found! Looking for: ${CONFIG.SELECTORS.mainImage}`
    // );
    // console.log(
    //   "💡 Available elements with data attributes:",
    //   document.querySelectorAll("[data-fancybox-main]")
    // );
  }

  if (!thumbnailContainer) {
    // console.error(
    //   `❌ Thumbnail container not found! Looking for: ${CONFIG.SELECTORS.thumbnailContainer}`
    // );
    // console.log(
    //   "💡 Available containers:",
    //   document.querySelectorAll('[class*="lightbox"]')
    // );
    return;
  }

  // ========================================
  // THUMBNAIL DETECTION & VALIDATION
  // ========================================

  // Find all thumbnail elements within the container
  // console.log("🔍 Looking for thumbnail elements...");
  const thumbnails = thumbnailContainer.querySelectorAll(
    CONFIG.SELECTORS.thumbnailItem
  );
  // console.log(
  //   `📸 Found ${thumbnails.length} thumbnail elements using selector: ${CONFIG.SELECTORS.thumbnailItem}`
  // );

  if (thumbnails.length === 0) {
    // console.error(
    //   `❌ No thumbnails found with selector: ${CONFIG.SELECTORS.thumbnailItem}`
    // );
    // console.log(
    //   "💡 All elements with data-fancybox:",
    //   document.querySelectorAll("[data-fancybox]")
    // );
    // console.log("💡 All elements in container:", thumbnailContainer.children);
    return;
  }

  // ========================================
  // AUTO-FIX IMAGE URLS FROM WEBFLOW CMS
  // ========================================

  // console.log("🔧 Auto-fixing image URLs from Webflow CMS src attributes...");
  thumbnails.forEach((thumbnail, index) => {
    const img = thumbnail.querySelector("img");
    if (img && img.src) {
      // Get the actual image URL from the img src
      const actualImageUrl = img.src;

      // Update data-src on the parent div
      thumbnail.setAttribute("data-src", actualImageUrl);
      thumbnail.setAttribute("data-fancybox", CONFIG.GALLERY.name);

      // Try to get a smaller version for data-thumb from srcset
      const srcset = img.getAttribute("srcset");
      let thumbUrl = actualImageUrl; // fallback to main image

      if (srcset) {
        // Try to extract a 500w version from srcset for thumbnail
        const srcsetEntries = srcset.split(",");
        const thumb500 = srcsetEntries.find((entry) => entry.includes("500w"));
        if (thumb500) {
          thumbUrl = thumb500.trim().split(" ")[0];
        }
      }

      thumbnail.setAttribute("data-thumb", thumbUrl);

      // Add data-thumbnail attribute to img for CSS targeting
      img.setAttribute("data-thumbnail", "true");

      // console.log(`✅ Auto-fixed thumbnail ${index}:`, { "data-src": actualImageUrl, "data-thumb": thumbUrl });
    } else {
      // console.warn(`⚠️ No img element or src found in thumbnail ${index}`);
    }
  });
  // console.log("🎉 Auto-fix complete!");

  // ========================================
  // GALLERY STATE MANAGEMENT
  // ========================================

  // Current image index tracker
  let currentIndex = 0;

  /**
   * Updates the main image display
   * @param {number} index - Index of the image to display
   */
  function updateMainImage(index) {
    // console.log(`🔄 Updating main image to index ${index}`);

    if (!mainImage) {
      // console.error(
      //   "❌ Cannot update main image - main image element not found"
      // );
      return;
    }

    const thumbnail = thumbnails[index];
    if (!thumbnail) {
      // console.error(`❌ Thumbnail at index ${index} not found`);
      return;
    }

    // Get image source - prefer data-src (which we auto-fixed), fallback to img src
    const newImageSrc =
      thumbnail.getAttribute("data-src") || thumbnail.querySelector("img")?.src;

    // console.log(`📸 New image source: ${newImageSrc}`);

    if (!newImageSrc) {
      // console.error("❌ No image source found for thumbnail");
      return;
    }

    // Apply cross-fade effect if enabled (simplified for mobile)
    if (CONFIG.ANIMATIONS.crossFadeEnabled && !isMobile) {
      // console.log("🎭 Applying cross-fade effect...");

      // Set up CSS transition for smooth cross-fade
      mainImage.style.transition = `opacity ${CONFIG.ANIMATIONS.crossFadeDuration} ${CONFIG.ANIMATIONS.crossFadeEasing}`;

      // Fade out to minimum opacity
      mainImage.style.opacity = CONFIG.ANIMATIONS.crossFadeOpacity;

      // Preload the new image to ensure smooth transition
      const newImg = new Image();
      newImg.onload = () => {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          // Update the source
          mainImage.src = newImageSrc;

          // Force reflow to ensure the image loads
          void mainImage.offsetWidth;

          // Fade back in
          mainImage.style.opacity = "1";
          // console.log("✅ Cross-fade completed successfully");
        }, 50);
      };

      newImg.onerror = () => {
        // console.error("❌ Failed to load new image, reverting opacity");
        mainImage.src = newImageSrc; // Try to load anyway
        mainImage.style.opacity = "1";
      };

      // Start loading the new image
      newImg.src = newImageSrc;
    } else {
      // Simple instant update for mobile or when cross-fade is disabled
      // console.log("🎭 Applying instant image update (mobile mode)...");
      mainImage.src = newImageSrc;
      // Force reflow
      void mainImage.offsetWidth;
      // console.log("✅ Main image updated successfully");
    }

    // Update active thumbnail styling
    updateActiveThumbnail(index);

    // Update current index
    currentIndex = index;
  }

  /**
   * Updates the visual state of thumbnails (active/inactive)
   * @param {number} activeIndex - Index of the active thumbnail
   */
  function updateActiveThumbnail(activeIndex) {
    // console.log(`🎨 Updating thumbnail states, active: ${activeIndex}`);

    // Update all thumbnail states using CSS class only
    thumbnails.forEach((thumb, index) => {
      const img = thumb.querySelector("img");
      if (index === activeIndex) {
        // Add is-active class to both parent and image
        thumb.classList.add("is-active");
        img.classList.add("is-active");
      } else {
        // Remove is-active class from both parent and image
        thumb.classList.remove("is-active");
        img.classList.remove("is-active");
      }
    });

    // Auto-scroll thumbnail carousel to keep active thumbnail visible
    scrollToActiveThumbnail(activeIndex);
  }

  /**
   * Scrolls the thumbnail carousel to keep the active thumbnail visible
   * @param {number} activeIndex - Index of the active thumbnail
   */
  function scrollToActiveThumbnail(activeIndex) {
    if (!thumbnailContainer || !thumbnails[activeIndex]) return;

    const activeThumbnail = thumbnails[activeIndex];
    const containerRect = thumbnailContainer.getBoundingClientRect();
    const thumbnailRect = activeThumbnail.getBoundingClientRect();

    // Check if thumbnail is visible in the container
    const isVisible =
      thumbnailRect.left >= containerRect.left &&
      thumbnailRect.right <= containerRect.right;

    if (!isVisible) {
      // console.log(`📍 Scrolling carousel to show thumbnail ${activeIndex}`);

      // Calculate the scroll position to center the active thumbnail
      const containerWidth = containerRect.width;
      const thumbnailWidth = thumbnailRect.width;
      const thumbnailOffsetLeft = activeThumbnail.offsetLeft;

      // Center the thumbnail in the container
      const targetScrollLeft =
        thumbnailOffsetLeft - containerWidth / 2 + thumbnailWidth / 2;

      // Smooth scroll to the target position
      thumbnailContainer.scrollTo({
        left: Math.max(0, targetScrollLeft), // Don't scroll past the beginning
        behavior: CONFIG.ANIMATIONS.scrollBehavior,
      });

      // console.log(`✅ Scrolled to position: ${targetScrollLeft}`);
    } else {
      // console.log(
      //   `👁️ Thumbnail ${activeIndex} already visible, no scroll needed`
      // );
    }
  }

  /**
   * Helper function to open Fancybox with event listeners for syncing main image
   * @param {Array} items - Array of Fancybox items
   * @param {number} startIndex - Starting index
   */
  function openFancyboxWithSync(items, startIndex) {
    const fancyboxInstance = Fancybox.show(items, {
      startIndex: startIndex,
      Toolbar: {
        display: CONFIG.FANCYBOX.toolbar,
      },
      on: {
        "Carousel.change": (fancybox, carousel, slideIndex) => {
          // console.log(`🔄 Fancybox slide changed to index: ${slideIndex}`);
          updateMainImage(slideIndex);
        },
        close: (fancybox) => {
          const currentSlide = fancybox.getSlide();
          if (currentSlide) {
            // console.log(`🔒 Fancybox closed at index: ${currentSlide.index}`);
            updateMainImage(currentSlide.index);
          }
        },
      },
    });
    return fancyboxInstance;
  }

  // ========================================
  // INITIAL GALLERY SETUP
  // ========================================

  // console.log("🎬 Initializing gallery with first image...");
  if (thumbnails.length > 0 && mainImage) {
    const firstThumbnail = thumbnails[0];
    // Use the auto-fixed data-src or fallback to img src
    const firstImageSrc =
      firstThumbnail.getAttribute("data-src") ||
      firstThumbnail.querySelector("img")?.src;

    // console.log(`🖼️ First image source: ${firstImageSrc}`);

    if (firstImageSrc) {
      mainImage.src = firstImageSrc;
      updateActiveThumbnail(0);
      // console.log("✅ Initial image set successfully");
    } else {
      // console.error("❌ Could not get first image source");
    }
  } else {
    // console.warn("⚠️ Cannot initialize - no thumbnails or main image found");
  }

  // ========================================
  // DRAG STATE VARIABLES (for carousel)
  // ========================================

  // These variables track drag state for both mouse and touch interactions
  // They need to be declared here so thumbnail click handlers can access them
  let hasDragged = false; // Mouse drag state
  let hasTouchDragged = false; // Touch drag state

  // ========================================
  // THUMBNAIL CLICK HANDLERS
  // ========================================

  // console.log("🖱️ Adding click handlers to thumbnails...");
  thumbnails.forEach((thumbnail, index) => {
    // console.log(`🔗 Adding click handler to thumbnail ${index}:`, thumbnail);

    // Handle thumbnail click/tap
    thumbnail.addEventListener("click", function (e) {
      // console.log(
      //   `🖱️ Thumbnail ${index} clicked! hasDragged: ${
      //     hasDragged || false
      //   }, hasTouchDragged: ${hasTouchDragged || false}`
      // );

      // If we just finished dragging (mouse or touch), ignore click
      if (
        (typeof hasDragged !== "undefined" && hasDragged) ||
        (typeof hasTouchDragged !== "undefined" && hasTouchDragged)
      ) {
        // console.log("🚫 Ignoring click because we were dragging");
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Prevent default behavior
      e.preventDefault();
      e.stopPropagation();

      // Update main image only (no lightbox opening)
      // console.log(`🖼️ Updating main image to index ${index}`);
      updateMainImage(index);

      // Update arrow states if arrows exist
      if (typeof updateArrowStates === "function") {
        updateArrowStates();
      }

      // Note: Lightbox opening removed per client request
      // Thumbnails now only update the main image display
    });

    // Add double-click handler to open Fancybox
    thumbnail.addEventListener("dblclick", function (e) {
      // console.log(`🖱️ Thumbnail ${index} double-clicked! Opening Fancybox...`);
      e.preventDefault();
      e.stopPropagation();

      // Create array of all images for Fancybox
      const fancyboxItems = Array.from(thumbnails).map((thumb, i) => {
        const src =
          thumb.getAttribute("data-src") || thumb.querySelector("img")?.src;
        return {
          src: src,
          type: "image",
        };
      });

      // Open Fancybox starting at clicked image with sync
      openFancyboxWithSync(fancyboxItems, index);
    });

    // Add touch-specific handler for better mobile support
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };

    thumbnail.addEventListener(
      "touchstart",
      function (e) {
        touchStartTime = Date.now();
        touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      },
      { passive: true }
    );

    thumbnail.addEventListener(
      "touchend",
      function (e) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        // If touch was quick (< 200ms) and didn't move much, treat as tap
        if (touchDuration < 200 && !hasTouchDragged) {
          // console.log(`📱 Quick tap detected on thumbnail ${index}`);
          // Trigger the click handler
          thumbnail.click();
        }
      },
      { passive: true }
    );

    // Note: Hover effects are now handled entirely by CSS
    // No JavaScript hover listeners needed!
  });

  // console.log("✅ All thumbnail click handlers added");

  // ========================================
  // MAIN IMAGE NAVIGATION ARROWS
  // ========================================

  // Add navigation arrows and click handler to main image
  if (mainImage) {
    // console.log(
    //   "🖼️ Adding navigation arrows and click handler to main image..."
    // );

    const mainImageWrapper = mainImage.parentElement;

    // Make wrapper relative for absolute positioning of arrows
    mainImageWrapper.style.position = "relative";
    mainImageWrapper.style.overflow = "hidden";

    // Create left arrow
    const leftArrow = document.createElement("div");
    leftArrow.innerHTML = "&#8249;"; // Left chevron
    leftArrow.className = "main-image-arrow main-image-arrow-left";
    leftArrow.style.cssText = `
        position: absolute;
        left: ${CONFIG.ARROWS.position};
        top: 50%;
        transform: translateY(-50%);
        background: ${CONFIG.ARROWS.background};
        color: ${CONFIG.ARROWS.color};
        width: ${CONFIG.ARROWS.size};
        height: ${CONFIG.ARROWS.size};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${CONFIG.ARROWS.fontSize};
        font-weight: bold;
        cursor: pointer;
        opacity: ${CONFIG.ARROWS.activeOpacity};
        transition: ${CONFIG.ARROWS.transition};
        z-index: 10;
        user-select: none;
      `;

    // Create right arrow
    const rightArrow = document.createElement("div");
    rightArrow.innerHTML = "&#8250;"; // Right chevron
    rightArrow.className = "main-image-arrow main-image-arrow-right";
    rightArrow.style.cssText = `
        position: absolute;
        right: ${CONFIG.ARROWS.position};
        top: 50%;
        transform: translateY(-50%);
        background: ${CONFIG.ARROWS.background};
        color: ${CONFIG.ARROWS.color};
        width: ${CONFIG.ARROWS.size};
        height: ${CONFIG.ARROWS.size};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${CONFIG.ARROWS.fontSize};
        font-weight: bold;
        cursor: pointer;
        opacity: ${CONFIG.ARROWS.activeOpacity};
        transition: ${CONFIG.ARROWS.transition};
        z-index: 10;
        user-select: none;
      `;

    // Add arrows to wrapper
    mainImageWrapper.appendChild(leftArrow);
    mainImageWrapper.appendChild(rightArrow);

    /**
     * Updates arrow states based on current gallery position
     */
    function updateArrowStates() {
      if (thumbnails.length <= 1) {
        leftArrow.style.opacity = "0";
        rightArrow.style.opacity = "0";
        return;
      }

      // Left arrow: disabled at first image
      leftArrow.style.opacity =
        currentIndex > 0
          ? CONFIG.ARROWS.activeOpacity
          : CONFIG.ARROWS.disabledOpacity;
      leftArrow.style.cursor = currentIndex > 0 ? "pointer" : "not-allowed";

      // Right arrow: disabled at last image
      rightArrow.style.opacity =
        currentIndex < thumbnails.length - 1
          ? CONFIG.ARROWS.activeOpacity
          : CONFIG.ARROWS.disabledOpacity;
      rightArrow.style.cursor =
        currentIndex < thumbnails.length - 1 ? "pointer" : "not-allowed";
    }

    // Initialize arrow states
    updateArrowStates();

    // Arrow hover effects
    leftArrow.addEventListener("mouseenter", () => {
      leftArrow.style.background = CONFIG.ARROWS.backgroundHover;
    });

    leftArrow.addEventListener("mouseleave", () => {
      leftArrow.style.background = CONFIG.ARROWS.background;
    });

    rightArrow.addEventListener("mouseenter", () => {
      rightArrow.style.background = CONFIG.ARROWS.backgroundHover;
    });

    rightArrow.addEventListener("mouseleave", () => {
      rightArrow.style.background = CONFIG.ARROWS.background;
    });

    // Variable to track if main image was dragged (declared here for click handler access)
    let mainImageDragged = false;

    // Arrow click handlers
    leftArrow.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent main image click
      if (currentIndex > 0) {
        // console.log("⬅️ Left arrow clicked");
        updateMainImage(currentIndex - 1);
        updateArrowStates(); // Update arrow states after navigation
      }
    });

    rightArrow.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent main image click
      if (currentIndex < thumbnails.length - 1) {
        // console.log("➡️ Right arrow clicked");
        updateMainImage(currentIndex + 1);
        updateArrowStates(); // Update arrow states after navigation
      }
    });

    // Main image click handler (for Fancybox)
    mainImage.addEventListener("click", function (e) {
      // Don't open Fancybox if we just finished dragging
      if (mainImageDragged) {
        // console.log("🚫 Ignoring click because main image was dragged");
        return;
      }

      // console.log("🖱️ Main image clicked! Opening Fancybox...");
      e.preventDefault();

      // Create array of all images for Fancybox
      const fancyboxItems = Array.from(thumbnails).map((thumb, i) => {
        const src =
          thumb.getAttribute("data-src") || thumb.querySelector("img")?.src;
        return {
          src: src,
          type: "image",
        };
      });

      // Open Fancybox starting at current image with sync
      openFancyboxWithSync(fancyboxItems, currentIndex);
    });

    // Add cursor pointer to main image
    mainImage.style.cursor = "pointer";

    // ========================================
    // MAIN IMAGE SWIPE/DRAG FUNCTIONALITY
    // ========================================

    // Variables for main image swipe/drag
    let mainImageIsDown = false;
    let mainImageStartX = 0;
    let mainImageCurrentX = 0;
    let mainImageStartTime = 0;
    let mainImageIsDragging = false;

    // Touch variables for mobile
    let mainImageTouchStartX = 0;
    let mainImageTouchCurrentX = 0;
    let mainImageTouchStartTime = 0;
    let mainImageIsTouching = false;
    let mainImageHasTouchSwiped = false;

    // console.log("👆 Adding swipe/drag functionality to main image...");

    // Desktop mouse events for main image
    mainImage.addEventListener("mousedown", (e) => {
      // Don't interfere with arrow clicks
      if (
        e.target.classList.contains("main-image-arrow") ||
        e.target.closest(".main-image-arrow")
      ) {
        return;
      }

      mainImageIsDown = true;
      mainImageDragged = false;
      mainImageIsDragging = false;
      mainImage.style.cursor = "grabbing";

      mainImageStartX = e.pageX;
      mainImageCurrentX = e.pageX;
      mainImageStartTime = Date.now();

      // console.log("🖱️ Main image drag started");
      e.preventDefault();
    });

    // Global mouse move for main image
    document.addEventListener("mousemove", (e) => {
      if (!mainImageIsDown) return;

      mainImageCurrentX = e.pageX;
      const distance = Math.abs(mainImageCurrentX - mainImageStartX);

      // Start dragging if moved more than threshold
      if (distance > CONFIG.GALLERY.dragThreshold && !mainImageIsDragging) {
        mainImageIsDragging = true;
        mainImageDragged = true;
        // console.log("🎯 Main image dragging started");
      }

      if (mainImageIsDragging) {
        e.preventDefault();
        // Visual feedback - slightly reduce opacity while dragging
        mainImage.style.opacity = "0.8";
      }
    });

    // Global mouse up for main image
    document.addEventListener("mouseup", (e) => {
      if (!mainImageIsDown) return;

      mainImageIsDown = false;
      mainImageIsDragging = false;
      mainImage.style.cursor = "pointer";
      mainImage.style.opacity = "1";

      // Handle swipe navigation if we dragged
      if (mainImageDragged) {
        const endTime = Date.now();
        const timeDiff = endTime - mainImageStartTime;
        const totalDistance = mainImageCurrentX - mainImageStartX;
        const velocity = Math.abs(totalDistance) / timeDiff;

        // console.log(`🖱️ Main image drag ended: distance=${totalDistance}, time=${timeDiff}, velocity=${velocity}`);

        // Navigate based on swipe direction and velocity
        if (
          Math.abs(totalDistance) > 50 ||
          (velocity > 0.5 && timeDiff < 300)
        ) {
          if (totalDistance > 0 && currentIndex > 0) {
            // Swiped right - go to previous image
            // console.log("⬅️ Swiped right on main image - previous");
            updateMainImage(currentIndex - 1);
            updateArrowStates();
          } else if (
            totalDistance < 0 &&
            currentIndex < thumbnails.length - 1
          ) {
            // Swiped left - go to next image
            // console.log("➡️ Swiped left on main image - next");
            updateMainImage(currentIndex + 1);
            updateArrowStates();
          }
        }
      }

      // Reset drag state after delay
      setTimeout(() => {
        mainImageDragged = false;
      }, 150);
    });

    // Touch events for main image (mobile)
    mainImage.addEventListener(
      "touchstart",
      (e) => {
        // Don't interfere with arrow clicks
        if (
          e.target.classList.contains("main-image-arrow") ||
          e.target.closest(".main-image-arrow")
        ) {
          return;
        }

        mainImageIsTouching = true;
        mainImageHasTouchSwiped = false;

        mainImageTouchStartX = e.touches[0].pageX;
        mainImageTouchCurrentX = e.touches[0].pageX;
        mainImageTouchStartTime = Date.now();

        // console.log("📱 Main image touch started");
      },
      { passive: false }
    );

    mainImage.addEventListener(
      "touchmove",
      (e) => {
        if (!mainImageIsTouching) return;

        mainImageTouchCurrentX = e.touches[0].pageX;
        const distance = Math.abs(
          mainImageTouchCurrentX - mainImageTouchStartX
        );

        // Use mobile drag threshold
        if (distance > CONFIG.GALLERY.mobileDragThreshold) {
          mainImageHasTouchSwiped = true;
          e.preventDefault(); // Prevent page scroll

          // Visual feedback
          mainImage.style.opacity = "0.8";

          // console.log(`📱 Main image touch swiping: distance=${distance}`);
        }
      },
      { passive: false }
    );

    mainImage.addEventListener(
      "touchend",
      (e) => {
        if (!mainImageIsTouching) return;

        mainImageIsTouching = false;
        mainImage.style.opacity = "1";

        // Handle swipe navigation
        if (mainImageHasTouchSwiped) {
          const endTime = Date.now();
          const timeDiff = endTime - mainImageTouchStartTime;
          const totalDistance = mainImageTouchCurrentX - mainImageTouchStartX;
          const velocity = Math.abs(totalDistance) / timeDiff;

          // console.log(`📱 Main image touch ended: distance=${totalDistance}, time=${timeDiff}, velocity=${velocity}`);

          // Navigate based on swipe direction and velocity
          if (
            Math.abs(totalDistance) > 30 ||
            (velocity > 0.3 && timeDiff < 300)
          ) {
            if (totalDistance > 0 && currentIndex > 0) {
              // Swiped right - go to previous image
              // console.log("⬅️ Touch swiped right on main image - previous");
              updateMainImage(currentIndex - 1);
              updateArrowStates();
            } else if (
              totalDistance < 0 &&
              currentIndex < thumbnails.length - 1
            ) {
              // Swiped left - go to next image
              // console.log("➡️ Touch swiped left on main image - next");
              updateMainImage(currentIndex + 1);
              updateArrowStates();
            }
          }

          // Update mainImageDragged to prevent click handler
          mainImageDragged = true;
        }

        // Reset touch swipe state after delay
        setTimeout(() => {
          mainImageHasTouchSwiped = false;
          mainImageDragged = false;
        }, 150);

        // console.log("📱 Main image touch ended");
      },
      { passive: false }
    );

    // console.log("✅ Main image swipe/drag functionality added");
    // console.log("💡 Swipe left/right on main image to navigate, or use arrow buttons/keyboard");
  }

  // ========================================
  // THUMBNAIL CAROUSEL NAVIGATION ARROWS
  // ========================================

  // Add navigation arrows to thumbnail carousel
  if (thumbnailContainer && thumbnails.length > 4) {
    // console.log("🎠 Adding navigation arrows to thumbnail carousel...");

    const thumbnailWrapper = thumbnailContainer.parentElement;

    // Make wrapper relative for absolute positioning of arrows
    thumbnailWrapper.style.position = "relative";

    // Create left arrow for thumbnails
    const thumbnailLeftArrow = document.createElement("div");
    thumbnailLeftArrow.innerHTML = "&#8249;"; // Left chevron
    thumbnailLeftArrow.className =
      "thumbnail-carousel-arrow thumbnail-carousel-arrow-left";
    thumbnailLeftArrow.style.cssText = `
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        background: ${CONFIG.ARROWS.background};
        color: ${CONFIG.ARROWS.color};
        width: ${CONFIG.ARROWS.size};
        height: ${CONFIG.ARROWS.size};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${CONFIG.ARROWS.fontSize};
        font-weight: bold;
        cursor: pointer;
        opacity: ${CONFIG.ARROWS.activeOpacity};
        transition: ${CONFIG.ARROWS.transition};
        z-index: 15;
        user-select: none;
      `;

    // Create right arrow for thumbnails
    const thumbnailRightArrow = document.createElement("div");
    thumbnailRightArrow.innerHTML = "&#8250;"; // Right chevron
    thumbnailRightArrow.className =
      "thumbnail-carousel-arrow thumbnail-carousel-arrow-right";
    thumbnailRightArrow.style.cssText = `
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background: ${CONFIG.ARROWS.background};
        color: ${CONFIG.ARROWS.color};
        width: ${CONFIG.ARROWS.size};
        height: ${CONFIG.ARROWS.size};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${CONFIG.ARROWS.fontSize};
        font-weight: bold;
        cursor: pointer;
        opacity: ${CONFIG.ARROWS.activeOpacity};
        transition: ${CONFIG.ARROWS.transition};
        z-index: 15;
        user-select: none;
      `;

    // Add arrows to wrapper
    thumbnailWrapper.appendChild(thumbnailLeftArrow);
    thumbnailWrapper.appendChild(thumbnailRightArrow);

    /**
     * Updates thumbnail carousel arrow states based on scroll position
     */
    function updateThumbnailArrowStates() {
      const scrollLeft = thumbnailContainer.scrollLeft;
      const maxScroll =
        thumbnailContainer.scrollWidth - thumbnailContainer.clientWidth;

      // Left arrow: disabled when at start
      thumbnailLeftArrow.style.opacity =
        scrollLeft > 10
          ? CONFIG.ARROWS.activeOpacity
          : CONFIG.ARROWS.disabledOpacity;
      thumbnailLeftArrow.style.cursor =
        scrollLeft > 10 ? "pointer" : "not-allowed";

      // Right arrow: disabled when at end
      thumbnailRightArrow.style.opacity =
        scrollLeft < maxScroll - 10
          ? CONFIG.ARROWS.activeOpacity
          : CONFIG.ARROWS.disabledOpacity;
      thumbnailRightArrow.style.cursor =
        scrollLeft < maxScroll - 10 ? "pointer" : "not-allowed";
    }

    // Initialize thumbnail arrow states
    updateThumbnailArrowStates();

    // Update arrow states on scroll
    thumbnailContainer.addEventListener("scroll", updateThumbnailArrowStates);

    // Thumbnail arrow hover effects
    thumbnailLeftArrow.addEventListener("mouseenter", () => {
      thumbnailLeftArrow.style.background = CONFIG.ARROWS.backgroundHover;
    });

    thumbnailLeftArrow.addEventListener("mouseleave", () => {
      thumbnailLeftArrow.style.background = CONFIG.ARROWS.background;
    });

    thumbnailRightArrow.addEventListener("mouseenter", () => {
      thumbnailRightArrow.style.background = CONFIG.ARROWS.backgroundHover;
    });

    thumbnailRightArrow.addEventListener("mouseleave", () => {
      thumbnailRightArrow.style.background = CONFIG.ARROWS.background;
    });

    // Thumbnail arrow click handlers
    thumbnailLeftArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (thumbnailContainer.scrollLeft > 10) {
        // console.log("⬅️ Thumbnail left arrow clicked");
        const scrollAmount = thumbnailContainer.clientWidth * 0.8; // Scroll 80% of visible width
        thumbnailContainer.scrollTo({
          left: Math.max(0, thumbnailContainer.scrollLeft - scrollAmount),
          behavior: CONFIG.ANIMATIONS.scrollBehavior,
        });
      }
    });

    thumbnailRightArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      const maxScroll =
        thumbnailContainer.scrollWidth - thumbnailContainer.clientWidth;
      if (thumbnailContainer.scrollLeft < maxScroll - 10) {
        // console.log("➡️ Thumbnail right arrow clicked");
        const scrollAmount = thumbnailContainer.clientWidth * 0.8; // Scroll 80% of visible width
        thumbnailContainer.scrollTo({
          left: Math.min(
            maxScroll,
            thumbnailContainer.scrollLeft + scrollAmount
          ),
          behavior: CONFIG.ANIMATIONS.scrollBehavior,
        });
      }
    });

    // console.log("✅ Thumbnail carousel navigation arrows added");
  } else if (thumbnails.length <= 4) {
    // console.log("ℹ️ Skipping thumbnail arrows - not enough thumbnails to require scrolling");
  }

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Only handle keys when Fancybox is not open
    if (document.querySelector(".fancybox__container")) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (currentIndex > 0) {
          // console.log("⌨️ Left arrow key pressed");
          updateMainImage(currentIndex - 1);
          if (typeof updateArrowStates === "function") updateArrowStates();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentIndex < thumbnails.length - 1) {
          // console.log("⌨️ Right arrow key pressed");
          updateMainImage(currentIndex + 1);
          if (typeof updateArrowStates === "function") updateArrowStates();
        }
        break;
      case " ": // Spacebar to open Fancybox
        e.preventDefault();
        if (thumbnails[currentIndex]) {
          // console.log("⌨️ Spacebar pressed - opening Fancybox");
          // Create array of all images for Fancybox
          const fancyboxItems = Array.from(thumbnails).map((thumb, i) => {
            const src =
              thumb.getAttribute("data-src") || thumb.querySelector("img")?.src;
            return {
              src: src,
              type: "image",
            };
          });
          openFancyboxWithSync(fancyboxItems, currentIndex);
        }
        break;
    }
  });

  // console.log("✅ Keyboard navigation added");

  // ========================================
  // THUMBNAIL CAROUSEL STYLING & BEHAVIOR
  // ========================================

  // console.log("🎠 Setting up swipeable thumbnail carousel...");

  // Add CSS for horizontal scrolling with custom styling
  if (thumbnailContainer) {
    thumbnailContainer.style.display = "flex";
    thumbnailContainer.style.overflowX = "auto";
    thumbnailContainer.style.scrollBehavior = CONFIG.ANIMATIONS.scrollBehavior;
    thumbnailContainer.style.gap = CONFIG.THUMBNAILS.gap;
    thumbnailContainer.style.padding = "10px 0";
    thumbnailContainer.style.touchAction = "pan-x"; // Allow horizontal touch scrolling
    thumbnailContainer.style.webkitOverflowScrolling = "touch"; // Smooth scrolling on iOS
    // Hide scrollbar but keep functionality
    thumbnailContainer.style.scrollbarWidth = "none"; // Firefox
    thumbnailContainer.style.msOverflowStyle = "none"; // IE/Edge

    // Add webkit scrollbar hiding and thumbnail styling
    const scrollbarStyle = document.createElement("style");
    scrollbarStyle.textContent = `
        .lightbox_mini-image-wrapper-collection-list::-webkit-scrollbar {
          display: none;
        }
        
        /* Enable smooth touch scrolling on mobile */
        .lightbox_mini-image-wrapper-collection-list {
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-x !important;
        }
        
        /* Force thumbnail images to cover full container */
        .lightbox_mini-image {
          overflow: hidden !important;
          border-radius: ${CONFIG.THUMBNAILS.borderRadius} !important;
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          touch-action: manipulation !important;
        }
        
        .lightbox_mini-image img {
          object-fit: cover !important;
          border-radius: ${CONFIG.THUMBNAILS.borderRadius} !important;
          display: block !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.3s ease !important;
        }
        
        /* Thumbnail Border States - Using is-active class */
        .lightbox_mini-image img {
          border: ${CONFIG.THUMBNAILS.borderWidth} ${CONFIG.THUMBNAILS.borderStyle} ${CONFIG.THUMBNAILS.inactiveBorderColor} !important;
          transition: all 0.3s ease !important;
        }
        
        .lightbox_mini-image img.is-active {
          border: ${CONFIG.THUMBNAILS.borderWidth} ${CONFIG.THUMBNAILS.borderStyle} ${CONFIG.THUMBNAILS.activeBorderColor} !important;
        }
        
        /* Hover state for inactive thumbnails only */
        .lightbox_mini-image:hover img:not(.is-active) {
          border: ${CONFIG.THUMBNAILS.borderWidth} ${CONFIG.THUMBNAILS.borderStyle} ${CONFIG.THUMBNAILS.hoverBorderColor} !important;
        }
        
        /* Fancybox Overlay Color Customization */
        .fancybox__backdrop {
          background-color: ${CONFIG.FANCYBOX.overlayColor} !important;
        }
      `;
    document.head.appendChild(scrollbarStyle);

    // Minimal styling - let CSS handle the rest
    thumbnails.forEach((thumb, index) => {
      thumb.style.flexShrink = "0";
      thumb.style.minWidth = CONFIG.THUMBNAILS.minWidth;
      thumb.style.cursor = "pointer";

      // console.log(`✅ Thumbnail ${index} initialized`);
    });

    // ========================================
    // SWIPER.JS-STYLE TOUCH/DRAG FUNCTIONALITY
    // ========================================

    // Swiper.js-like touch/swipe functionality variables
    let isDown = false;
    let startX;
    let currentX;
    let scrollLeft;
    let startTime;
    let startScrollLeft;
    // hasDragged is now declared at the top of the script
    let isDragging = false;

    // console.log("👆 Adding Swiper.js-like touch/swipe handlers...");

    // Mouse events for desktop - Swiper.js style
    thumbnailContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      hasDragged = false;
      isDragging = false;
      thumbnailContainer.style.cursor = "grabbing";
      thumbnailContainer.style.transition = CONFIG.ANIMATIONS.dragTransition; // Disable smooth scrolling during drag

      startX = e.pageX;
      currentX = e.pageX;
      scrollLeft = thumbnailContainer.scrollLeft;
      startTime = Date.now();
      startScrollLeft = thumbnailContainer.scrollLeft;

      // console.log("🖱️ Swiper drag started");
      e.preventDefault(); // Prevent text selection
    });

    // Global mouse events to handle dragging outside container
    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      currentX = e.pageX;
      const distance = Math.abs(currentX - startX);

      // Start dragging if moved more than configured threshold
      if (distance > CONFIG.GALLERY.dragThreshold && !isDragging) {
        isDragging = true;
        hasDragged = true;
        // console.log("🎯 Started dragging");
      }

      if (isDragging) {
        e.preventDefault();
        const walk = startX - currentX; // Reversed for natural feel
        const newScrollLeft = scrollLeft + walk;

        // Apply the scroll immediately for real-time feedback
        thumbnailContainer.scrollLeft = newScrollLeft;

        // console.log(`📱 Dragging: ${walk}px, scrollLeft: ${newScrollLeft}`);
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (!isDown) return;

      isDown = false;
      isDragging = false;
      thumbnailContainer.style.cursor = "grab";
      thumbnailContainer.style.transition = `scroll-behavior ${CONFIG.ANIMATIONS.fadeTransition}`; // Re-enable smooth scrolling

      // Add momentum scrolling if we dragged
      if (hasDragged) {
        const endTime = Date.now();
        const timeDiff = endTime - startTime;
        const totalDistance = currentX - startX;
        const velocity = totalDistance / timeDiff; // pixels per ms

        // Apply momentum based on velocity
        if (Math.abs(velocity) > 0.5 && timeDiff < 300) {
          const momentum = velocity * CONFIG.GALLERY.momentumMultiplier.mouse; // Use configured multiplier
          const targetScroll = thumbnailContainer.scrollLeft - momentum;

          thumbnailContainer.style.transition = `scroll-behavior ${CONFIG.ANIMATIONS.momentumDuration} ${CONFIG.ANIMATIONS.momentumEasing}`;
          thumbnailContainer.scrollTo({
            left: targetScroll,
            behavior: CONFIG.ANIMATIONS.scrollBehavior,
          });

          // console.log(
          //   `🚀 Momentum scroll: velocity=${velocity.toFixed(
          //     2
          //   )}, momentum=${momentum.toFixed(2)}`
          // );
        }
      }

      // Reset hasDragged after a short delay
      setTimeout(() => {
        hasDragged = false;
        thumbnailContainer.style.transition = ""; // Reset transition
      }, 150);

      // console.log("🖱️ Swiper drag ended");
    });

    // Handle mouse leave
    thumbnailContainer.addEventListener("mouseleave", () => {
      if (isDown) {
        // Treat as mouseup when leaving container
        isDown = false;
        isDragging = false;
        thumbnailContainer.style.cursor = "grab";
        thumbnailContainer.style.transition = "";

        setTimeout(() => {
          hasDragged = false;
        }, 150);
      }
    });

    // Touch events for mobile - Swiper.js style
    let touchStartX = 0;
    let touchCurrentX = 0;
    let touchScrollLeft = 0;
    let carouselTouchStartTime = 0;
    let isTouching = false;
    // hasTouchDragged is now declared at the top of the script

    thumbnailContainer.addEventListener(
      "touchstart",
      (e) => {
        isTouching = true;
        hasTouchDragged = false;
        thumbnailContainer.style.transition = CONFIG.ANIMATIONS.dragTransition;
        thumbnailContainer.style.cursor = "grabbing";

        touchStartX = e.touches[0].pageX;
        touchCurrentX = e.touches[0].pageX;
        touchScrollLeft = thumbnailContainer.scrollLeft;
        carouselTouchStartTime = Date.now();

        // console.log("📱 Swiper touch started at:", touchStartX);
      },
      { passive: false } // Changed to false to work with preventDefault
    );

    thumbnailContainer.addEventListener(
      "touchmove",
      (e) => {
        if (!isTouching) return;

        touchCurrentX = e.touches[0].pageX;
        const distance = Math.abs(touchCurrentX - touchStartX);

        // Use higher threshold for mobile to distinguish between tap and drag
        if (distance > CONFIG.GALLERY.mobileDragThreshold) {
          hasTouchDragged = true;
          e.preventDefault(); // Prevent page scroll while swiping

          const walk = touchStartX - touchCurrentX;
          const newScrollLeft = touchScrollLeft + walk;

          // Apply scroll immediately for real-time feedback
          thumbnailContainer.scrollLeft = newScrollLeft;

          // console.log(
          //   `📱 Touch dragging: ${walk}px, scrollLeft: ${newScrollLeft}, distance: ${distance}px`
          // );
        }
      },
      { passive: false } // Allow preventDefault
    );

    thumbnailContainer.addEventListener(
      "touchend",
      () => {
        if (!isTouching) return;

        isTouching = false;
        thumbnailContainer.style.cursor = "grab";
        thumbnailContainer.style.transition = `scroll-behavior ${CONFIG.ANIMATIONS.fadeTransition}`;

        // console.log("📱 Touch ended, hasTouchDragged:", hasTouchDragged);

        // Add momentum scrolling for touch
        if (hasTouchDragged) {
          const endTime = Date.now();
          const timeDiff = endTime - carouselTouchStartTime;
          const totalDistance = touchCurrentX - touchStartX;
          const velocity = totalDistance / timeDiff;

          if (Math.abs(velocity) > 0.3 && timeDiff < 300) {
            const momentum = velocity * CONFIG.GALLERY.momentumMultiplier.touch; // Use configured multiplier
            const targetScroll = thumbnailContainer.scrollLeft - momentum;

            thumbnailContainer.style.transition = `scroll-behavior ${CONFIG.ANIMATIONS.momentumDuration} ${CONFIG.ANIMATIONS.momentumEasing}`;
            thumbnailContainer.scrollTo({
              left: targetScroll,
              behavior: CONFIG.ANIMATIONS.scrollBehavior,
            });

            // console.log(
            //   `🚀 Touch momentum: velocity=${velocity.toFixed(
            //     2
            //   )}, momentum=${momentum.toFixed(2)}`
            // );
          }
        }

        // Reset after delay to allow click events
        setTimeout(() => {
          // console.log("📱 Resetting hasTouchDragged to false");
          hasTouchDragged = false;
          thumbnailContainer.style.transition = "";
        }, 100);

        // console.log("📱 Swiper touch ended");
      },
      { passive: false } // Changed to false for consistency
    );

    // Set cursor style - only show grab cursor when there are many thumbnails
    if (thumbnails.length > 4) {
      thumbnailContainer.style.cursor = "grab";
    } else {
      thumbnailContainer.style.cursor = "default";
    }
    thumbnailContainer.style.userSelect = "none"; // Prevent text selection during drag

    // console.log("✅ Swipeable thumbnail carousel setup complete");
  }

  // ========================================
  // FINAL INITIALIZATION SUMMARY
  // ========================================

  // console.log(
  //   "🎉 Fancybox Carousel initialized successfully with",
  //   thumbnails.length,
  //   "thumbnails"
  // );

  // Final debug info
  // console.log("📊 Gallery Initialization Summary:");
  // console.log("- Main image element:", !!mainImage);
  // console.log("- Thumbnail container:", !!thumbnailContainer);
  // console.log("- Number of thumbnails:", thumbnails.length);
  // console.log("- Fancybox loaded:", typeof Fancybox !== "undefined");
  // console.log("- Current index:", currentIndex);
  // console.log("- Gallery name:", CONFIG.GALLERY.name);
  // console.log("✅ Gallery ready for use!");

  // ========================================
  // UTILITY FUNCTIONS (GLOBAL ACCESS)
  // ========================================

  // Expose utility functions globally for external access
  window.FancyboxCarousel = {
    // Go to specific image by index
    goToImage: function (index) {
      const thumbnails = document.querySelectorAll(
        CONFIG.SELECTORS.thumbnailItem
      );
      if (thumbnails[index]) {
        thumbnails[index].click();
      }
    },

    // Get current image index
    getCurrentIndex: function () {
      return currentIndex || 0;
    },

    // Open Fancybox at current image
    openLightbox: function () {
      const thumbnails = document.querySelectorAll(
        CONFIG.SELECTORS.thumbnailItem
      );
      const current = currentIndex || 0;
      if (thumbnails[current]) {
        const fancyboxItems = Array.from(thumbnails).map((thumb, i) => ({
          src: thumb.getAttribute("data-src"),
          type: "image",
        }));
        openFancyboxWithSync(fancyboxItems, current);
      }
    },

    // Get current configuration
    getConfig: function () {
      return CONFIG;
    },

    // Update configuration (for advanced users)
    updateConfig: function (newConfig) {
      Object.assign(CONFIG, newConfig);
      // console.log("📋 Configuration updated:", CONFIG);
    },
  };

  // console.log("🔧 Utility functions exposed as window.FancyboxCarousel");
});

