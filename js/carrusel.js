// Actualizado hasta 3 de abril de 2026: pausa/reanudar slider con modal
window.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const carousel = document.querySelector(".carousel");
  const list = document.querySelector(".list");
  const runningTime = document.querySelector(".carousel .timeRunning");
  const modal = document.getElementById("modal");
  const btnOpen = document.getElementById("open");
  const btnClose = document.getElementById("close");
  const seeMoreButtons = Array.from(document.querySelectorAll("button")).filter(
    (button) => button.textContent.trim() === "See More",
  );

  let timeRunning = 3000;
  let timeAutoNext = 7000;
  let runTimeOut;
  let runNextAuto;
  let autoStartTime = 0;
  let remainingAutoTime = timeAutoNext;

  if (!nextBtn || !prevBtn || !carousel || !list || !runningTime) {
    return;
  }

  function resetTimeAnimation() {
    runningTime.style.animation = "none";
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = "runningTime 7s linear 1 forwards";
  }

  function showSlider(type) {
    const sliderItemsDom = list.querySelectorAll(".item");
    if (sliderItemsDom.length === 0) return;

    if (type === "next") {
      list.appendChild(sliderItemsDom[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carousel.classList.add("prev");
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    remainingAutoTime = timeAutoNext;
    autoStartTime = Date.now();
    runNextAuto = setTimeout(() => {
      nextBtn.click();
    }, remainingAutoTime);

    resetTimeAnimation();
  }

  function pauseSlider() {
    if (autoStartTime) {
      const elapsed = Date.now() - autoStartTime;
      remainingAutoTime = Math.max(0, remainingAutoTime - elapsed);
    }

    clearTimeout(runNextAuto);
    clearTimeout(runTimeOut);
    runningTime.style.animationPlayState = "paused";
  }

  function resumeSlider() {
    runningTime.style.animationPlayState = "running";
    clearTimeout(runNextAuto);
    autoStartTime = Date.now();
    runNextAuto = setTimeout(() => {
      nextBtn.click();
    }, remainingAutoTime);
  }

  nextBtn.onclick = () => showSlider("next");
  prevBtn.onclick = () => showSlider("prev");

  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  resetTimeAnimation();

  if (btnOpen && modal) {
    btnOpen.onclick = () => {
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.style.display = "block";
      }
      pauseSlider();
    };
  }

  if (seeMoreButtons.length > 0 && modal) {
    seeMoreButtons.forEach((button) => {
      button.onclick = () => {
        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.style.display = "block";
        }
        pauseSlider();
      };
    });
  }

  if (btnClose && modal) {
    btnClose.onclick = () => {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.style.display = "none";
      }
      resumeSlider();
    };
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        if (typeof modal.close === "function") {
          modal.close();
        } else {
          modal.style.display = "none";
        }
        resumeSlider();
      }
    });
  }
});
