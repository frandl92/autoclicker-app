import { LitElement, html, css } from "lit";

export class RankingPage extends LitElement {
    static get properties() {
        return {
          users: {type: Array}
        };
      }

      static get styles() {
        return css`
        
        `;
      }

      constructor() {
        super();
      this.users = [];
      for (let i = 0; i < localStorage.length; i++ ) {
        if (/(user)+/.test(localStorage.key(i))){
          this.users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      console.log(this.users)
      }



      render() {
        return html`
          <div>
          ${this.users.map(user => html `<p>${user.name}</p>`)}
          </div>
        `;
      }
}

customElements.define("rankingclicker-page", RankingPage);