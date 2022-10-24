import { LitElement, html, css } from "lit";
import { installRouter } from "pwa-helpers/router.js";

import "./pages/gameclicker-page";
import "./pages/loginclicker-page";
import "./pages/rankingclicker-page"

export class AutoclickerApp extends LitElement {
  static get properties() {
    return {
      page: { type: String },
      currentUser: { type: Object },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.page = 'home';
    this.currentUser = {};

    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  logInEvent(event) {
    this.goToPage(event.detail);
  }

  goToPage(detail) {
    window.history.pushState({}, "", detail.view);
    this.handleNavigation(window.location);
    this.currentUser = detail.currentuser;
    localStorage.setItem("currentUser", this.currentUser.name);
  }

  handleNavigation(location) {
    const path = location.pathname;
    this.page = path === "/" ? "home" : path.slice(1);
  }

  handlerPages() {
    switch (this.page) {
      case "home": 
        return html`<loginclicker-page
          @handle-navigator=${this.logInEvent}
          @goTo-ranking=${this.logInEvent}
        ></loginclicker-page>`;
      
      case "game": 
        return html`<gameclicker-page
          .currentUser=${this.currentUser}
       @game-navigator=${this.logInEvent} ></gameclicker-page>`;

      case "ranking":
        return html `<rankingclicker-page></rankingclicker-page>`
    
      default:  
      window.history.pushState({}, "", "/");
      return html `<loginclicker-page
      @handle-navigator=${this.logInEvent}
      @goTo-ranking=${this.logInEvent}
    ></loginclicker-page>`
    }
  }

  render() {
    return html`
     ${this.handlerPages()} `;
  }
}
