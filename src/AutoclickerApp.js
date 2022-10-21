import { LitElement, html, css } from 'lit';
import { installRouter } from 'pwa-helpers/router.js';

import './pages/gameclicker-page'

export class AutoclickerApp extends LitElement {
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
    <gameclicker-page></gameclicker-page>
    `;
  }
}
