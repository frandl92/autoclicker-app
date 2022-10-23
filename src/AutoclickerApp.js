import { LitElement, html, css } from "lit";
import { installRouter } from "pwa-helpers/router";

import "./pages/gameclicker-page";
import "./pages/loginclicker-page";

export class AutoclickerApp extends LitElement {
  static get properties() {
    return {
      view: { type: String },
      currentUser: { type: Object },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.view = "home";
    this.currentUser = {};

    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  logInEvent(event) {
    console.log(event.detail);
    this.goToPage(event.detail);
  }

  goToPage(detail) {
    console.log(detail);
    window.history.pushState({}, "", detail.view);
    this.handleNavigation(window.location);
    this.currentUser = detail.currentuser;
    localStorage.setItem("currentUser", this.currentUser.name);
  }

  handleNavigation(location) {
    console.log(location);
    const path = location.pathname;
    console.log(path.slice(1));
    this.view = path === "/" ? "home" : path.slice(1);
  }

  handlerPages() {
    switch (this.view) {
      case "home": {
        return html`<loginclicker-page
          @handle-navigator=${this.logInEvent}
        ></loginclicker-page>`;
      }
      case "game": {
        return html`<gameclicker-page
          .currentUser=${this.currentUser}
        ></gameclicker-page>`;
      }
      default: {
        this.goToPage({ view: "home", currentUser: {} });
        return html`<loginclicker-page
          @handle-navigator=${this.logInEvent}
        ></loginclicker-page>`;
      }
    }
  }

  render() {
    return html` <div>${this.handlerPages()}</div> `;
  }
}
