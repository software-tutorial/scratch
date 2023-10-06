import {html, render} from "lit-html"
import { postService } from "../post-service"
import { Post } from "../model"

const rowTemplate = (post:Post) => html`
    <tr @click=${() => rowSelected(post)} ?hidden=${post.id % 3 == 0}>
    <td>${post.id}</td>
    <td>${post.title}</td>
</tr>
`

const tableTemplate = (posts: Post[]) => {
    const rows = posts.map(rowTemplate)
    return html`
    <style>
        body {
            color: red
        }
    </style>
<table>
<thead>
    <th>Id</th>
    <th>Title</th>
</thead>
<tbody>
${rows}
</tbody>
</table>
`
}
class PostTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        console.log("PostTable connected")
        const posts = await postService.all()
        console.log("post loaded", posts)
        this.render(posts)
        
    }
    private render(posts: Post[]) {
        render(tableTemplate(posts), this.shadowRoot)
    }
}
function rowSelected(post: Post) {
    alert(`post selected ${post.title}`)
}

customElements.define("post-table", PostTableComponent)