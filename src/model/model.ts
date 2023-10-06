import { Album } from "./album"
import { Photo } from "./photo"
import { BehaviorSubject } from "rxjs"

export type AlbumId = number
export type AlbumMap = Map<AlbumId, Album>

export interface Model {
    readonly albums: AlbumMap,
    readonly posts: Photo[]
}
const initialState: Model = {
    albums: new Map(),
    posts: []
}

const store = new BehaviorSubject(initialState)

export { store }
