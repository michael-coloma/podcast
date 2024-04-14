import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Podcasts from "./pages/Podcasts";
import { ROUTES_PATH } from "../../../config/routes/routes";

export const PodcastsRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES_PATH.PODCASTS} Component={Podcasts} />
      </Routes>
    </Router>
  );
};
