import { photoService } from "../service/photo-service"
import { service as albumService} from "../service/album-service"
import { AlbumId, Model, store } from "./model"
import { Album } from "./album"

export { Photo as Post } from "./photo"
export { Album } from "./album"
export { store, Model }

async function initialize() {
    const posts = await photoService.all()
    const loadedAlbums = await albumService.all()
    let albums = new Map<AlbumId, Album>()
    loadedAlbums.forEach(album => albums.set(album.id, album))
    const state: Model = {
        albums,
        posts
    }
    store.next(state)
}

initialize()