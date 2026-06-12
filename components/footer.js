import { baseStyles } from "../styles/base-styles.js";

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.footerCss = "";
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    if (!this.footerCss) {
      try {
        const url = new URL("../styles/footer.css", import.meta.url);
        const res = await fetch(url.href);
        if (res.ok) {
          this.footerCss = await res.text();
        } else {
          console.warn("No se pudo cargar footer.css:", res.status);
        }
      } catch (err) {
        console.warn("Error cargando footer.css:", err);
      }
    }
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${baseStyles}
        ${this.footerCss}
      </style>

      <footer>
        <div class="izquierda">
            <div class="direccion">
                <p>Calle falsa 123</p>
                <hr>
                <p class="tel">3134800474</p>
            </div>
            <div class="redes">
                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="3 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M16.5 7.5v.01"/></svg></a>

                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="2 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"/></svg></a>

                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 10c-2 0 -3 1 -3 3c0 1.5 1.494 3.535 3 5.5c1 1 1.5 1.5 2.5 2s2.5 1 4.5 -.5s1.5 -3.5 .5 -6s-2.333 -5.5 -5 -9.5c-.834 -1 -1.5 -1.5 -2.503 -1.5c-1 0 -1.623 .45 -2.497 1.5c-2.667 4 -4 7 -5 9.5s-1.5 4.5 .5 6s3.5 1 4.5 .5s1.5 -1 2.5 -2c1.506 -1.965 3 -4 3 -5.5c0 -2 -1 -3 -3 -3"/></svg></a>

                <hr>
                <a class="wpp" href="">
                    <button type="button">
                        <p>contactanos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/></svg>
                    </button>
                </a>
            </div>
            <p class="derechos">© 2035 La Choza Hotel & Hospedaje. Todos los derechos reservados.</p>
        </div>

        <div class="derecha">
            Dejanos un mensaje<br>
            <form action="">
                <input type="text" placeholder="Nombre">
                <input type="email" placeholder="Correo">
                <textarea placeholder="Mensaje"></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
