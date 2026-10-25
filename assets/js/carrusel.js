// 1) Espera a que cargue el DOM para inicializar el carrusel y los modales.
window.addEventListener("DOMContentLoaded", () => {
  // 2) Selecciona los controles principales del slider.
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const carousel = document.querySelector(".carousel");
  const list = document.querySelector(".list");
  const runningTime = document.querySelector(".carousel .timeRunning");

  // 3) Configuración del tiempo de cambio automático.
  let timeRunning = 3000;
  let timeAutoNext = 7000;
  let runTimeOut;
  let runNextAuto;
  let autoStartTime = 0;
  let remainingAutoTime = timeAutoNext;

  // 4) Si faltan elementos del slider, no se ejecuta nada.
  if (!nextBtn || !prevBtn || !carousel || !list || !runningTime) {
    return;
  }

  // 5) Reinicia la barra de progreso visual del carrusel.
  function resetTimeAnimation() {
    runningTime.style.animation = "none";
    runningTime.offsetHeight;
    runningTime.style.animation = null;
    runningTime.style.animation = "runningTime 7s linear 1 forwards";
  }

  // 6) Mueve el carrusel al siguiente o anterior slide.
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

  // 7) Pausa el avance automático cuando se abre un modal.
  function pauseSlider() {
    if (autoStartTime) {
      const elapsed = Date.now() - autoStartTime;
      remainingAutoTime = Math.max(0, remainingAutoTime - elapsed);
    }

    clearTimeout(runNextAuto);
    clearTimeout(runTimeOut);
    runningTime.style.animationPlayState = "paused";
  }

  // 8) Reanuda el tiempo del slider cuando se cierra el modal.
  function resumeSlider() {
    runningTime.style.animationPlayState = "running";
    clearTimeout(runNextAuto);
    autoStartTime = Date.now();
    runNextAuto = setTimeout(() => {
      nextBtn.click();
    }, remainingAutoTime);
  }

  // 9) Botones de navegación del carrusel.
  nextBtn.onclick = () => showSlider("next");
  prevBtn.onclick = () => showSlider("prev");

  // 10) Inicia el avance automático del carousel.
  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  resetTimeAnimation();

  // 11) Abre el modal correcto de cada slide sin repetir IDs.
  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".item")?.querySelector(".modal");
      if (!modal) return;

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.style.display = "block";
      }

      modal.scrollTop = 0;
      pauseSlider();
    });
  });

  // 12) Cierra el modal y vuelve a activar el avance del slider.
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (!modal) return;

      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.style.display = "none";
      }

      resumeSlider();
    });
  });

  // 13) Cierra el modal si el usuario hace clic fuera del contenido.
  document.querySelectorAll(".modal").forEach((modal) => {
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
  });
});
