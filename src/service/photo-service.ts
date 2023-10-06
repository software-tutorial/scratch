const url = "https://jsonplaceholder.typicode.com/photos"

import { Post } from "../model"

class PostService {
    async all() {
        const response = await fetch(url)
        return await response.json() as Post[]
    }
}

const photoService = new PostService()

export { photoService }
