import React from "react";

import Header from "../components/Header";
import PodcastDetailLateral from "../components/PodcastDetaillsLateral";
import { RootState } from "../../../secondary/redux/store";
import { useSelector } from "react-redux";

import * as styles from "./EpisodeDetails.module.css";

const EpisodeDetails = () => {
  const selectedEpisode = useSelector(
    (state: RootState) => state.episodeDetails.selectedEpisode
  );

  return (
    <>
      <Header isLoading={false} />

      <div className={styles.container}>
        <div className={styles.containerLateral}>
          <PodcastDetailLateral enableLinksPodcastDetails={true} />
        </div>
        <div className={`${styles.containerEpisodes} ${styles.page}`}>
          <span className={styles.title}>{selectedEpisode?.title}</span>
          <span className={styles.paragraph}>
            {selectedEpisode?.description}
          </span>
          <span className={styles.paragraph}>This episode is sponsered by</span>
          <div className={`${styles.containerAudio} ${styles.pagePlayer}`}>
            <audio controls className={styles.player}>
              <source src={selectedEpisode?.audioUrl} type="audio/mp3" />
            </audio>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetails;
