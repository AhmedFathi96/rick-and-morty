
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import CharacterView from "./features/characters/components/characterView";
import CharactersList from "./features/characters/components/charactersList";
import EpisodesList from "./features/episodes/components/episodesList";
import EpisodeView from "./features/episodes/components/episodesView";
import LocationsList from "./features/location/components/LocationsList";
import LocationView from "./features/location/components/LocationView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: '/', element: <CharactersList /> },
      { path: 'character-details/:id', element: <CharacterView /> },

      { path: '/episodes', element: <EpisodesList /> },
      { path: '/episode-details/:id', element: <EpisodeView /> },

      { path: '/locations', element: <LocationsList /> },
      { path: '/location-details/:id', element: <LocationView /> },
    ]
  }
]);

export const App = () => (
  <RouterProvider router={router} />
)
