import { useLoaderData } from 'react-router';
import type { ArtistAlbumsLoaderData } from '../types/loaderTypes';

const ArtistDetailsPage = () => {
  const { albums, artist } = useLoaderData() as ArtistAlbumsLoaderData;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{artist.name}</h1>
      <h1 className="text-2xl font-bold mb-4">Albums</h1>
      <ul className="space-y-2">
        {albums.map(album => (
          <li key={album._id} className="p-4 bg-base-200 rounded">
            {album.name} — {album.year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistDetailsPage;