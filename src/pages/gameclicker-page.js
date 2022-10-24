import { LitElement, html, css } from "lit";

export class GamePage extends LitElement {
  static get properties() {
    return {
      currentUser: { type: Object },
      timeVariable: { type: Number },
      interval: { type: Array },
    };
  }

  static get styles() {
    return css`
      .container {
        background-color: #fff8ea;
      }
      header {
        display: flex;
        justify-content: space-around;
        background-color: rgb(155, 119, 119);
        align-items: center;
      }
      .app-title-game {
        font-family: "Alfa Slab One", cursive;
      }

      .game-display {
        margin-top: 3rem;
        display: flex;
        background-color: #fff8ea;
        height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
      }
    `;
  }

  constructor() {
    super();
    this.currentUser = {};
    this.timeVariable = 100;
    this.interval = [];
  }

  firstUpdated() {
    this.currentUser = JSON.parse(
      localStorage.getItem("user" + localStorage.getItem("currentUser"))
    );
  }

  _incrementClicker() {
    this.currentUser.clicks++;
    this.updateUser();
    this.currentUser = { ...this.currentUser };
  }

  updateUser() {
    localStorage.setItem(
      "user" + this.currentUser.name,
      JSON.stringify(this.currentUser)
    );
  }

  _navigateHome() {
    this.interval.forEach((item) => clearInterval(item));
    this.dispatchEvent(
      new CustomEvent("game-navigator", {
        detail: {
          view: "home",
          user: {},
        },
      })
    );
  }

  _buyClicks() {
    this.currentUser.clicks =
      this.currentUser.clicks - this.currentUser.clickerCost;
    this.currentUser.baseCost = this.currentUser.baseCost + 1;
    this.currentUser.clickerCost =
      this.currentUser.clickerCost + 50 * this.currentUser.baseCost;
    this.requestUpdate();
    this.updateUser();
    this._addInterval();
  }

  _addInterval() {
    this.timeVariable =
      this.currentUser.baseCost > 2 ? this.timeVariable + 100 : 100;
    const currentInterval = setInterval(
      this._incrementClicker.bind(this),
      this.timeVariable
    );
    this.interval.push(currentInterval);
  }

  render() {
    return html`
      <div class="container">
        <header>
          <h2 class="app-title-game">CLICKER</h2>
          <p @click=${this._navigateHome}>LOG OUT</p>
        </header>
        <div class="game-display">
          <p>Hi, ${this.currentUser.name}</p>
          <p>${this.currentUser.clicks}</p>
          <button @click="${this._incrementClicker}">COLLECT CLICKS</button>
          ${this.currentUser.baseCost > 1 || this.currentUser.clicks >= 50
            ? html`<button
                @click=${this._buyClicks}
                ?disabled=${this.currentUser.clicks <
                this.currentUser.clickerCost
                  ? true
                  : false}
                class=${this.currentUser.clicks < this.currentUser.clickerCost
                  ? "disabled"
                  : "active"}
              >
                Buy Clicks ${this.currentUser.clickerCost}
              </button>`
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("gameclicker-page", GamePage);
