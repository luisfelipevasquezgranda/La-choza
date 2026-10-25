import { baseStyles } from "./base-styles.js";
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.initMenu();
    this.responsive();
    this.setActiveLink();
    window.addEventListener("resize", () => this.responsive());
  }

  initMenu() {
    const menuOpciones = this.shadowRoot.querySelector(".menu_opciones");
    const header = this.shadowRoot.querySelector("header");
    const contenedor = this.shadowRoot.querySelector(".contenedor");
    const button = this.shadowRoot.querySelector(".menu");

    if (!menuOpciones || !header || !contenedor || !button) {
      console.warn("Elementos del menú no encontrados");
      return;
    }

    button.addEventListener("click", () => {
      menuOpciones.classList.toggle("active");
      button.classList.toggle("active");
      button.setAttribute("aria-expanded", String(button.classList.contains("active")));
      button.setAttribute(
        "aria-label",
        button.classList.contains("active") ? "Cerrar menú" : "Abrir menú",
      );
    });
  }

  setActiveLink() {
    const links = this.shadowRoot.querySelectorAll(".menu_opciones a");
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    links.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      // Normalizar la comparación
      const normalizedHref = href.replace("./", "");

      if (
        normalizedHref === currentPage ||
        (normalizedHref === "index.html" && currentPage === "")
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  responsive() {
    const menuOpciones = this.shadowRoot.querySelector(".menu_opciones");
    const header = this.shadowRoot.querySelector("header");
    const contenedor = this.shadowRoot.querySelector(".contenedor");

    if (window.innerWidth <= 760) {
      header.appendChild(menuOpciones);
    } else {
      contenedor.appendChild(menuOpciones);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
    
      ${baseStyles}

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

        header{
          position: fixed;
          top: 0;
          z-index: 100;
          width: 100%;
          height: 120px;
          background: var(--background-color);
        }

        .contenedor{
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1000px;
          height: 100%;
          margin: 0 auto;
          width: min(100%, 1000px);
          padding: 0 16px;
        }

        hr{
          width: 2px;
          background: black;
          border: none;
        }

        .logo{
          margin-left: 10px;
          display: flex;
          font-size: 30px;
        }

        .logo svg{
          width: 50px;
          height: 50px;
        }

        .letra{
          line-height: 28px;
        }

        .menu_opciones ul{
          display: flex;
          list-style: none;
        }

        .menu_opciones li{
          margin: 12px;
        }

        .menu_opciones a{
          text-decoration: none;
          color: var(--primary-color);
          padding: 8px 12px;
          border-radius: 4px;
        }

        .menu_opciones a:hover{
          color: #FFD700;
          transition: all 0.3s ease;
          
          
        }

        .menu_opciones a.active{
         color: #FFD700;
          
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease;
        }

        button{
          display: none;
          flex-direction: column;
          width: 3rem;
          height: 3rem;
          background: transparent;
          border: none;
          gap: .65rem;
          cursor: pointer;
        }

        button div{
          background: black;
          height: 2px;
          width: 100%;
          border-radius: 5px;
          transition: .5s;
          transform-origin: left;
        }

        @media (max-width:760px){
          header{
            height: 76px;
          }

          .contenedor{
            height: 76px;
          }

          .logo{
            font-size: 24px;
          }

          .logo svg{
            width: 42px;
            height: 42px;
          }

          button{
            display: flex;
            margin-right: 10px;
          }

          button.active div:first-child{
            transform: rotate(32deg);
          }

          button.active div:nth-child(2){
            opacity: 0;
          }

          button.active div:last-child{
            transform: rotate(-32deg);
          }

          .menu_opciones{
            position: absolute;
            top: 76px;
            left: 0;
            width: 100%;
            height: auto;
            display: none;
            overflow: hidden;
            border-bottom: 2px solid var(--primary-color);
            background: var(--background-color);
          }

          .menu_opciones.active{
            display: block;
            max-height: calc(100vh - 76px);
            overflow-y: auto;
          }

          .menu_opciones ul{
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }

          .menu_opciones li{
            margin: 8px;
          }

          .menu_opciones a{
            display: block;
            padding: 8px 16px;
          }
        }
      </style>

      <header>
        <div class="contenedor">
          <div class="logo">
            <hr>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h6"/>
            </svg>
            <div class="letra">
              <p>La</p>
              <p>Choza</p>
            </div>
          </div>

          <nav class="menu_opciones" aria-label="Navegación principal">
            <ul>
              <li><a href="./index.html">Principal</a></li>
              <li><a href="./explorar.html">Explorar</a></li>
              <li><a href="./eventos.html">Eventos</a></li>
              <li><a href="./servicios.html">Servicios</a></li>
              <li><a href="./contacto.html">Contacto</a></li>
            </ul>
          </nav>

          <button class="menu" type="button" aria-label="Abrir menú" aria-expanded="false">
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
