import type { AlbumProps } from "./albumType";
import type { ArtistType } from "./artistType";

export interface ArtistAlbumsLoaderData {
  albums: AlbumProps[];
  artist: ArtistType;
}
