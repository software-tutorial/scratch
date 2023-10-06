import { html, render } from "lit-html"
import "./post-table-component"

const template = html`
    <div>
        Posts
    </div>
    <post-table></post-table>
`

class AppComponent extends HTMLElement {
    async connectedCallback() {
        render(template, this)
    }
}
customElements.define("app-component", AppComponent)