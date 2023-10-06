const url = "https://jsonplaceholder.typicode.com/posts"

import { Post } from "./model"

class PostService {
    async all() {
        const response = await fetch(url)
        return await response.json() as Post[]
    }
}

const postService = new PostService()

export { postService }
