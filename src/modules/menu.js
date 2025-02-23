export function initMenu() {
  // apply a ".is-active" class to the ".navbar_component" element if the user has scrolled past the top of the page,
  // otherwise remove the ".is-active" class. Also, apply a ".is-active" class to the ".navbar_component" element if the user
  // clicks on any elements with the ".navbar_link.is-dropdown" class, otherwise remove the ".is-active" class.
  const navbar = document.querySelector(".navbar_component");
  const dropdowns = document.querySelectorAll(".navbar_link.is-dropdown");
  const mobileTrigger = document.querySelector(".navbar_mobile-trigger");
  const mobileMenu = document.querySelector(".navbar_menu");

  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        isDropdownOpen();
        isScrolling = false;
      });
    }
    isScrolling = true;
  });

  isDropdownOpen();

  let currentDropdown = null;

  // checks if there's any dropdown open, and if so, keeps the navbar active. Otherwise, removes the active class
  function isDropdownOpen() {
    const isOpen = Array.from(dropdowns).some((dropdown) =>
      dropdown.classList.contains("is-active")
    );

    // only remove the active class if the user has not scrolled to the top of the page, none of the dropdowns are open, and the mobile menu is not open
    if (!isOpen && window.scrollY === 0 && !mobileMenu.classList.contains("is-active")) {
      navbar.classList.remove("is-active");
    } else {
      navbar.classList.add("is-active");
    }
  }

  const dropdownsTimelines = [];

  dropdowns.forEach((dropdown, i) => {
    const submenu = dropdown.nextElementSibling;
    const icon = dropdown.querySelector(".navbar_link-icon");

    if (!submenu) {
      return;
    }

    // create a timeline for each submenu. Execute the isDropdownOpen function if the submenu timeline is reversed, once it's completed.
    const submenuTl = gsap.timeline({
      paused: true,
      onStart: isDropdownOpen,
      onReverseComplete: isDropdownOpen,
    });

    submenuTl.fromTo(
      submenu,
      { height: 0 },
      { height: "auto", duration: 0.5, ease: "expo.inOut" }
    );

    if (icon) {
      submenuTl.to(icon, {
        rotate: -180,
        duration: 0.5,
        ease: "expo.inOut",
      }, 0);
    }

    if (submenu.querySelector(".big-links_list")) {
      submenuTl.from(
        submenu.querySelectorAll(".big-links_list a"),
        { yPercent: 10, opacity: 0, duration: 0.2, stagger: 0.1 },
        0
      );
    }

    dropdownsTimelines.push(submenuTl);

    // closes all submenus (playing their respective timelines) and opens the submenu that was clicked
    function toggleSubmenu() {
      if (currentDropdown && currentDropdown !== dropdown) {
        dropdownsTimelines.forEach((timeline) => timeline.reverse());
        currentDropdown.classList.remove("is-active");
      }

      if (submenuTl.progress() === 1) {
        submenuTl.reverse();
      } else {
        submenuTl.play();
      }

      if (currentDropdown === dropdown) {
        currentDropdown.classList.remove("is-active");
        currentDropdown = null;
      } else {
        currentDropdown = dropdown;
        currentDropdown.classList.add("is-active");
      }
    }

    dropdown.addEventListener("click", toggleSubmenu);
  });

  // close the submenu if the user clicks outside of the navbar
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      dropdownsTimelines.forEach((timeline) => timeline.reverse());
      currentDropdown?.classList.remove("is-active");
      currentDropdown = null;
    }
  });

  //if browser is mobile (max-width: 991px), add logic to make the .navbar_mobile-trigger element toggle the .is-active class on the .navbar_menu element.
  // Use GSAP to also animate the .navbar_menu element height from 0 to auto when the .is-active class is added, and from auto to 0 when the .is-active class is removed.

  //set gsap.matchMedia instance to detect mobile breakpoint
  const mm = gsap.matchMedia();

  mm.add(
    {
      small: "(max-width: 991px)",
    },
    (ctx) => {
      if (ctx.conditions.small) {
        initializeMobileMenu();
      }
    }
  );

  function initializeMobileMenu() {
    // To calculate the max-height of the mobile menu, we need to get the .navbar_component and subtract from the window.innerHeight
    const navbarHeight = navbar.offsetHeight;
    // set the navbar height as a CSS variable
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbarHeight}px`
    );

    if (mobileTrigger && mobileMenu) {
      const pathOpen = mobileTrigger.querySelectorAll(".menu-path-open");
      const pathClose = mobileTrigger.querySelectorAll(".menu-path-close");
      const triggerLabels = mobileTrigger.querySelectorAll(".navbar_mobile-trigger-label");

      gsap.set(pathClose, { drawSVG: "0% 0%" });
      gsap.set(pathOpen, { drawSVG: "0% 100%" });

      const mobileMenuTl = gsap.timeline({
        paused: true,
      });

      mobileMenuTl
        .to(pathOpen, {
          drawSVG: "100% 100%",
          duration: 0.3,
          stagger: 0.1,
          ease: "expo.inOut",
        })
        .to(pathClose, {
          drawSVG: "100% 0%",
          duration: 0.5,
          ease: "expo.inOut",
        });
      
      mobileMenuTl.to(triggerLabels, {
        yPercent: -100,
        duration: 0.3,
        stagger: 0.1,
        ease: "expo.inOut",
      }, 0);

      mobileTrigger.addEventListener("click", () => {
        mobileMenu.classList.toggle("is-active");

        gsap.to(mobileMenu, {
          height: mobileMenu.classList.contains("is-active") ? "auto" : 0,
          duration: 0.5,
          ease: "expo.inOut",
        });

        if (mobileMenu.classList.contains("is-active")) {
          mobileMenuTl.play();
        } else {
          mobileMenuTl.reverse();
        }
      });
    }
    // close the mobile menu if the user clicks outside of it
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove("is-active");
        gsap.to(mobileMenu, {
          height: 0,
          duration: 0.5,
          ease: "expo.inOut",
        });
      }
    });

    // add the .is-active class to the .navbar_component element if .navbar_mobile-trigger is clicked and the scroll position is at the top of the page
    mobileTrigger.addEventListener("click", () => {
      if (window.scrollY === 0) {
        navbar.classList.toggle("is-active");
      }
    });  

  }
}