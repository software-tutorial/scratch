import { postService } from "../service/post-service"
import { Album } from "./album"
import { Post } from "./post"
import { BehaviorSubject } from "rxjs"

export interface Model {
    albums: Album[],
    posts: Post[]
}
const initialState: Model = {
    albums: [],
    posts: []
}


const store = new BehaviorSubject(initialState)

export { store }
