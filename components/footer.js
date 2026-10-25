import { baseStyles } from "./base-styles.js";

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
        const url = new URL("../assets/css/footer.css", import.meta.url);
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
                <p>El Peñol, Antioquia</p>
                <hr>
                <p class="tel">3134800474</p>
            </div>
            <div class="redes">
                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="3 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M16.5 7.5v.01"/></svg></a>

                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="2 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"/></svg></a>

                <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 10c-2 0 -3 1 -3 3c0 1.5 1.494 3.535 3 5.5c1 1 1.5 1.5 2.5 2s2.5 1 4.5 -.5s1.5 -3.5 .5 -6s-2.333 -5.5 -5 -9.5c-.834 -1 -1.5 -1.5 -2.503 -1.5c-1 0 -1.623 .45 -2.497 1.5c-2.667 4 -4 7 -5 9.5s-1.5 4.5 .5 6s3.5 1 4.5 .5s1.5 -1 2.5 -2c1.506 -1.965 3 -4 3 -5.5c0 -2 -1 -3 -3 -3"/></svg></a>

                <hr>
                <a class="wpp" href="https://wa.me/573247823989" target="_blank" rel="noopener noreferrer">
                    <button type="button">
                        <p>contactanos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/></svg>
                    </button>
                </a>
            </div>
            <p class="derechos">© ${new Date().getFullYear()} La Choza Hotel & Hospedaje. Todos los derechos reservados.</p>
        </div>

        <div class="derecha">
    <h2>Déjanos un mensaje</h2>

    <form id="formulario" novalidate>
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" autocomplete="name" minlength="3" required aria-describedby="form-feedback">

        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" name="correo" autocomplete="email" required aria-describedby="form-feedback">

        <label for="motivo">Motivo de contacto</label>
        <select id="motivo" name="motivo" required aria-describedby="form-feedback">
            <option value="">Selecciona una opción</option>
            <option value="Reserva de alojamiento">Reserva de alojamiento</option>
            <option value="Consulta de habitaciones">Consulta de habitaciones</option>
            <option value="Evento">Evento</option>
            <option value="Otro">Otro</option>
        </select>

        <label for="mensaje">Mensaje (mínimo 20 caracteres)</label>
        <textarea id="mensaje" name="mensaje" minlength="20" required aria-describedby="form-feedback"></textarea>

        <label class="consent">
            <input type="checkbox" id="consentimiento" name="consentimiento" required aria-describedby="form-feedback">
            <span>Acepto que La Choza use estos datos para responder mi consulta.</span>
        </label>

        <p id="form-feedback" class="form-feedback" role="status" aria-live="polite"></p>
        <a id="whatsapp-send" class="whatsapp-send" target="_blank" rel="noopener noreferrer" hidden>Continuar en WhatsApp</a>
        <button type="submit">Enviar</button>
    </form>
    </div>
      </footer>
    `;

    const wppButton = this.shadowRoot.querySelector(".wpp");
    if (wppButton) {
      wppButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.open("https://wa.me/573247823989", "_blank", "noopener,noreferrer");
      });
    }

    const formulario = this.shadowRoot.querySelector("#formulario");
    if (!formulario) return;

    formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombreInput = this.shadowRoot.getElementById("nombre");
      const correoInput = this.shadowRoot.getElementById("correo");
      const motivoInput = this.shadowRoot.getElementById("motivo");
      const mensajeInput = this.shadowRoot.getElementById("mensaje");
      const consentimientoInput = this.shadowRoot.getElementById("consentimiento");
      const feedback = this.shadowRoot.getElementById("form-feedback");
      const whatsappLink = this.shadowRoot.getElementById("whatsapp-send");
      const nombre = nombreInput.value.trim();
      const correo = correoInput.value.trim();
      const mensaje = mensajeInput.value.trim();
      const errores = [];

      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      const campos = [
        { input: nombreInput, invalido: nombre.length < 3, mensaje: "El nombre debe tener al menos 3 caracteres." },
        { input: correoInput, invalido: !correoValido, mensaje: "Escribe un correo electrónico válido." },
        { input: motivoInput, invalido: !motivoInput.value, mensaje: "Selecciona el motivo de contacto." },
        { input: mensajeInput, invalido: mensaje.length < 20, mensaje: "El mensaje debe tener al menos 20 caracteres." },
        { input: consentimientoInput, invalido: !consentimientoInput.checked, mensaje: "Debes aceptar el uso de tus datos para continuar." },
      ];

      whatsappLink.hidden = true;
      campos.forEach(({ input, invalido }) => {
        input.setAttribute("aria-invalid", String(invalido));
      });
      errores.push(...campos.filter(({ invalido }) => invalido).map(({ mensaje: error }) => error));

      if (errores.length > 0) {
        feedback.textContent = errores.join(" ");
        feedback.classList.add("is-error");
        campos.find(({ invalido }) => invalido).input.focus();
        return;
      }

      const numeroWhatsApp = "573247823989";
      const texto = `Nuevo mensaje desde la página web:\n\nNombre: ${nombre}\nCorreo: ${correo}\nMotivo: ${motivoInput.value}\n\nMensaje:\n${mensaje}`;
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      whatsappLink.href = url;
      whatsappLink.hidden = false;
      feedback.textContent = "Formulario válido. Selecciona el enlace para enviar tu consulta por WhatsApp.";
      feedback.classList.remove("is-error");
      campos.forEach(({ input }) => input.removeAttribute("aria-invalid"));
    });
  }
}

customElements.define("app-footer", AppFooter);
