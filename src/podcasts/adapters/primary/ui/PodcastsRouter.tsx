import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Podcasts from "./pages/Podcasts";
import { ROUTES_PATH } from "../../../config/routes/routes";
import PodcastDetail from "./pages/PodcastDetails";
import EpisodeDetails from "./pages/EpisodeDetails";

export const PodcastsRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES_PATH.PODCASTS} Component={Podcasts} />
        <Route path={ROUTES_PATH.PODCAST_DETAIL} Component={PodcastDetail} />
        <Route path={ROUTES_PATH.EPISODE_DETAILS} Component={EpisodeDetails} />
      </Routes>
    </Router>
  );
};
