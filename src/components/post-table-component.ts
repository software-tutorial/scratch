import {html, render} from "lit-html"
import { Album, Post, store } from "../model"
import { map } from "rxjs"
import { Model } from "../model"
import { produce } from "immer"

interface TableLine {
    post: Post
    album: Album
}
interface ViewModel {
    lines: TableLine[]
}
function viewModel(model: Model) {
    const lines = model.posts.map(photo => {
        const tl: TableLine = {
            post: photo,
            album: model.albums.get(photo.albumId)
        }
        return tl
    })
    const vm: ViewModel = {
        lines
    }
    return vm
}

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
        store
            .pipe(
                map(model => model.posts)
            )
            .subscribe(posts => this.render(posts))
    }
    private render(posts: Post[]) {
        render(tableTemplate(posts), this.shadowRoot)
    }
}
function rowSelected(post: Post) {
    const title = post.title.toLocaleUpperCase()
    const previousState = store.getValue()
    const nextState = produce(previousState, model => {
        const index = model.posts.findIndex(p => p.id == post.id)
        model.posts[index].title = title // TODO: find correct index!!!
    })
    store.next(nextState)
}

customElements.define("post-table", PostTableComponent)