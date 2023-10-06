import {html, render} from "lit-html"
import { Album, Post as Photo, store } from "../model"
import { map } from "rxjs"
import { Model } from "../model"
import { produce } from "immer"

interface TableLine {
    photo: Photo
    album: Album
}
interface ViewModel {
    lines: TableLine[]
}
function viewModel(model: Model) {
    const lines = model.posts.map(photo => {
        const tl: TableLine = {
            photo: photo,
            album: model.albums.get(photo.albumId)
        }
        return tl
    })
    const vm: ViewModel = {
        lines
    }
    return vm
}

const rowTemplate = (line: TableLine) => html`
    <tr @click=${() => rowSelected(line)} ?hidden=${line.photo.id % 3 == 0}>
    <td>${line.photo.id}</td>
    <td>${line.photo.title}</td>
    <td>${line.album.title}</td>
</tr>
`

const tableTemplate = (viewModel: ViewModel) => {
    const rows = viewModel.lines.map(rowTemplate)
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
    <th>Album</th>
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
                map(viewModel)
            )
            .subscribe(posts => this.render(posts))
    }
    private render(viewModel: ViewModel) {
        render(tableTemplate(viewModel), this.shadowRoot)
    }
}
function rowSelected(line: TableLine) {
    const title = line.photo.title.toLocaleUpperCase()
    const previousState = store.getValue()
    const nextState = produce(previousState, model => {
        const index = model.posts.findIndex(p => p.id == line.photo.id)
        model.posts[index].title = title // TODO: find correct index!!!
    })
    store.next(nextState)
}

customElements.define("post-table", PostTableComponent)