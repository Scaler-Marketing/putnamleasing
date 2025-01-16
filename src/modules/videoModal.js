export function setVideosModal() {
  const items = document.querySelectorAll(".video-player-full");

  if (!items) {
    return;
  }

  items.forEach((item) => {
    const trigger = item.querySelector(".video-player-full_trigger"),
      modal = item.querySelector(".video-player-full_modal");

    if (!trigger || !modal) {
      return;
    }

    const close = modal.querySelector(".video-player-full_modal-close");
    const tl = setVideoModal(modal);

    let player;
    if (typeof Vimeo !== "undefined") {
      player = new Vimeo.Player(modal.querySelector('iframe'));
      tl.eventCallback("onComplete", () => {
        player.play();
      });
      tl.eventCallback("onReverseComplete", () => {
        player.setCurrentTime(0);
      });
    }
    
    trigger.addEventListener("click", () => {
      openModal(tl)
    });
    close.addEventListener("click", () => {
      if (player) {
        player.pause();
      }
      closeModal(tl)
    });
  });
}

function setVideoModal(modal) {
    videoPlayer = modal.querySelector(".video-player-full_modal-inner"),
    videoClose = modal.querySelector(".video-player-full_modal-close");

  gsap.set(modal, { visibility: "hidden", maskPosition: "0% 0%" });
  gsap.set(videoClose, { y: "-10rem" });

  const tl = gsap.timeline({ paused: true });

  tl
    .to(
      modal,
      {
        maskPosition: "100% 0%",
        visibility: "visible",
        duration: 1,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      videoClose,
      {
        y: "0rem",
        duration: 1,
        ease: "expo.inOut",
      },
      0.2
    );

  return tl;
}

async function openModal(tl) {
  tl.play();
}

function closeModal(tl) {
  tl.reverse();
}
