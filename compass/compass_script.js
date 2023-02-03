const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");
const longitude = document.querySelector(".longitude");
const latitude = document.querySelector(".latitude");
const coordinates = document.querySelector(".coordinates");
const compassTab = document.querySelector("#compass");

if (compassTab.classList.contains("_active")) {
  navigator.geolocation.watchPosition(
    (data) => {
      console.log(data);
      if (data) {
        if (data.coords.speed === null) {
          speed.textContent = "0";
        } else {
          speed.textContent = data.coords.speed;
        }
        if (data.coords.longitude && data.coords.latitude) {
          longitude.textContent = data.coords.longitude;
          latitude.textContent = data.coords.latitude;
          coordinates.style.opacity = "1";
        } else {
          coordinates.style.opacity = "0";
        }
        if (data.coords.heading === null) {
          arrow.style.transform = `rotate(360deg)`;
        } else {
          arrow.style.transform = `rotate(${data.coords.heading}deg)`;
        }
      }
    },
    (err) => {
      console.error(err);
    }
  );
}
