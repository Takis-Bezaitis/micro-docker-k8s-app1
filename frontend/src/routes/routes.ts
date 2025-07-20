import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
//import GlobalSpinner from '../components/GlobalSpinner';
//HydrateFallback
import { lazy } from 'react';
import { ARTISTS_API, ALBUMS_API } from "../utils/config";

const HomePage = lazy(() => import('../pages/HomePage'));
const ArtistsPage = lazy(() => import('../pages/ArtistsPage'));
const ArtistDetailsPage = lazy(() => import('../pages/ArtistDetailsPage'));


export const router = createBrowserRouter([
    {
        path:'/',
        Component: Layout,
        children: [
            { index: true, Component: HomePage },
            { path:'artists', Component: ArtistsPage },
            { path:'artists/:artistId', 
              Component: ArtistDetailsPage,
              loader: async ({ params }) => {
                const [albumsRes, artistRes] = await Promise.all([
                    fetch(`${ALBUMS_API}/${params.artistId}/albums`),
                    fetch(`${ARTISTS_API}/${params.artistId}`)
                ]);

                if (!albumsRes.ok || !artistRes.ok) throw new Error("Failed to load artist data");

                const [albums, artist] = await Promise.all([
                    albumsRes.json(),
                    artistRes.json()
                ]);

                return { albums, artist };
              }
            }
        ]
    }
]);