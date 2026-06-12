import "../components/header.js";
import "../components/footer.js";

// Modal para explorar.html
window.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("open");
  const modal = document.getElementById("modal");
  const btnClose = document.getElementById("close");

  if (!btnOpen || !modal || !btnClose) return;

  btnOpen.addEventListener("click", () => {
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.style.display = "block";
    }
  });

  btnClose.addEventListener("click", () => {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.style.display = "none";
    }
  });

  if (typeof modal.showModal === "function") {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });
  }
});
