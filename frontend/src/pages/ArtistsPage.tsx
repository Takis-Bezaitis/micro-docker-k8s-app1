import { useState, useEffect } from "react"
import ArtistCard from "../components/ArtistCard";
import type { ArtistType } from "../types/artistType";
import { ARTISTS_API } from "../utils/config";

const ArtistsPage = () => {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch(`${ARTISTS_API}`);
      if (!response.ok) {
        console.log("Something went wrong.");
      }
      const results = await response.json();
      setArtists(results);
    };
    fetchArtists();
  },[])

  return (
    <div className="flex gap-5 justify-center">
      {artists?.map((artist) => (
        <div key={artist._id}>
          <ArtistCard artist={artist} />
        </div>
      ))}
    </div>
  )
}

export default ArtistsPage