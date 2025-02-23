export function initButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    // if button doesn't include a .button_icon, return
    if (!button.querySelectorAll('.button_icon')) return;

    // use GSAP + DrawSVG plugin to animate the button icon path with mouse hover
    const icon = button.querySelectorAll('.button_icon');
    const isVertical = button.classList.contains('animate-vertical');

    button.addEventListener('mouseenter', () => {
      if (isVertical) {
        gsap.to(icon, { duration: 0.5, y: "100%", ease: 'expo.out' });
      } else {
        gsap.to(icon, { duration: 0.5, x: "100%", ease: 'expo.out' });
      }
    });

    button.addEventListener('mouseleave', () => {
      if (isVertical) {
        gsap.to(icon, { duration: 0.5, y: "0%", ease: 'expo.out' });
      } else {
        gsap.to(icon, { duration: 0.5, x: "0%", ease: 'expo.out' });
      }
    });
  });
}