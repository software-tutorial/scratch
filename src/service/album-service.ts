import { Album } from "../model"

const url = "https://jsonplaceholder.typicode.com/albums"

class AlbumService {
    async all() {
        const response = await fetch(url)
        return await response.json() as Album[]
    }
}
const service = new AlbumService()

export { service }
