export function initMenu() {
  // apply a ".is-active" class to the ".navbar_component" element if the user has scrolled past the top of the page,
  // otherwise remove the ".is-active" class. Also, apply a ".is-active" class to the ".navbar_component" element if the user
  // clicks on any elements with the ".navbar_link.is-dropdown" class, otherwise remove the ".is-active" class.
  const navbar = document.querySelector(".navbar_component");
  const dropdowns = document.querySelectorAll(".navbar_link.is-dropdown");
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

    if (!isOpen && window.scrollY === 0) {
      navbar.classList.remove("is-active");
    } else {
      navbar.classList.add("is-active");
    }
  }

  const dropdownsTimelines = [];

  dropdowns.forEach((dropdown, i) => {
    const submenu = dropdown.nextElementSibling;

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
}