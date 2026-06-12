document.addEventListener("DOMContentLoaded", () => {
  const menuOpciones = document.querySelector(".menu_opciones");
  const header = document.querySelector("header");
  const contenedor = document.querySelector(".contenedor");
  const button = document.querySelector(".menu");

  if (!menuOpciones || !header || !contenedor || !button) {
    console.warn("Elementos del menú no encontrados");
    return;
  }

  button.addEventListener("click", () => {
    menuOpciones.classList.toggle("active");
    button.classList.toggle("active");
  });

  const responsive = () => {
    if (window.innerWidth <= 520) {
      header.appendChild(menuOpciones);
    } else {
      contenedor.appendChild(menuOpciones);
    }
  };

  responsive();
  window.addEventListener("resize", responsive);
});
