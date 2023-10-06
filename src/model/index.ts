import { postService } from "../service/post-service"
import { Model, store } from "./model"

export { Post } from "./post"
export { Album } from "./album"
export { store }

console.log("index.ts")
async function initialize() {
    console.log("initialize")
    const posts = await postService.all()
    const state: Model = {
        albums: [],
        posts
    }
    console.log("posts loaded", posts)
    store.next(state)
}

initialize()