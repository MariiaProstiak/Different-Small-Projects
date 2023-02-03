const drumsTab = document.querySelector("#drums");
const keys = Array.from(document.querySelectorAll(".key"));
const keysForTouch = document.querySelectorAll(".key");

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function playSound(e) {
  if (drumsTab.classList.contains("_active")) {
    console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
  }
}

keysForTouch.forEach((keyDiv) => {
  keyDiv.addEventListener("touchstart", (e) => {
    let dataKey = e.target;
    if (!dataKey.hasAttribute("key")) {
      const parentDiv = dataKey.closest(".key");
      dataKey = parentDiv.dataset.key;
    }
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const key = document.querySelector(`div[data-key="${dataKey}"]`);

    if (!audio) return;

    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
  });
});
