import { LitElement, html, css } from "lit";

export class GamePage extends LitElement {
  static get properties() {
    return {
      currentUser: { type: Object },
      counter: { type: Number },
      buyClicks: { type: Number },
      autoClickerBaseCost: {type: Number},
    };
  }

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-around;
      }
      .app-title-game {
        font-family: "Alfa Slab One", cursive;
      }

      .game-display {
      }
    `;
  }

  constructor() {
    super();
    this.currentUser = {};
    this.counter = 0;
    this.buyClicks = 50;
    this.autoClickerBaseCost = 1;

  }

  firstUpdated() {
    this.currentUser = JSON.parse(
      localStorage.getItem("user" + localStorage.getItem("currentUser"))
    );
    console.log(this.currentUser);
  }

  _incrementClicker() {
    this.currentUser.clicks += 1;
    localStorage.setItem(
      "user" + this.currentUser.name,
      JSON.stringify(this.currentUser)
    );
    
    this.requestUpdate()
  }


  _boostClicks(){
    this.currentUser.clicks = this.currentUser.clicks - this.buyClicks;
    this.currentUser.clickerbasecost = this.currentUser.clickerbasecost + 1;
    this.buyClicks = this.buyClicks * this.currentUser.clickerbasecost;
    localStorage.setItem("user" + this.currentUser.name, JSON.stringify(this.currentUser))
  }


  render() {
    return html`
      <header>
        <h2 class="app-title-game">CLICKER</h2>
        <p>LOG OUT</p>
      </header>
      <div class="game-display">
        <p>Hi, ${this.currentUser.name}</p>
        <p>${this.currentUser.clicks}</p>
        <button @click="${this._incrementClicker}">COLLECT CLICKS</button>
        ${this.currentUser.clicks >= 50
          ? html`<button @click="${this._boostClicks}">
              COMPRAR CLICKS ${this.buyClicks}
            </button>`
          : ""}
      </div>
    `;
  }
}

customElements.define("gameclicker-page", GamePage);
