import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Podcasts from "./podcasts/adapters/primary/ui/pages/Podcasts";
import { ROUTES_PATH } from "./podcasts/config/routes/routes";
import PodcastDetail from "./podcasts/adapters/primary/ui/pages/PodcastDetails";
import EpisodeDetails from "./podcasts/adapters/primary/ui/pages/EpisodeDetails";

export const AppRouter: React.FC = () => {
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
