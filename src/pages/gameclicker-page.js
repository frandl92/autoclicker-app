import { LitElement, html, css } from "lit";

export class GamePage extends LitElement {
    static get properties() {
        return {
          
        };
      }

      static get styles() {
        return css`
         
        `;
      }

      constructor() {
        super();
        
      }

      render() {
        return html`
          <div>HOLAAAAAAAAAA</div>
        `;
      }
}

customElements.define("gameclicker-page", GamePage);