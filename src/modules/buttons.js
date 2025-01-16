export function initButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    // if button doesn't include a .button_icon, return
    if (!button.querySelector('.button_icon')) return;

    console.log('button', button);

    // use GSAP + DrawSVG plugin to animate the button icon path with mouse hover
    const icon = button.querySelector('.button_icon');
    const path = icon.querySelector('path');

    const tl = gsap.timeline({ paused: true });
    tl
      .to(path, { duration: 0.3, ease: "expo.inOut", drawSVG: "100% 100%" })
      .set(path, { drawSVG: "0%" })
      .to(path, { duration: 0.3, ease: "expo.inOut", drawSVG: "100%" });

    button.addEventListener('mouseenter', () => {
      tl.play();
    });

    button.addEventListener('mouseleave', () => {
      tl.reverse();
    });
  });
}