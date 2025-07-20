import { Link } from 'react-router';
import type { ArtistType } from "../types/artistType"

const ArtistCard = ({ artist }: { artist: ArtistType }) => {
  return (
    <Link to={`/artists/${artist._id}`}>
        <div className="card bg-base-100 w-96 shadow-sm hover:shadow-md transition">
            <div className="card-body">
                <h2 className="card-title">{artist.name}</h2>
            </div>
        </div>
    </Link>
  )
}

export default ArtistCard;