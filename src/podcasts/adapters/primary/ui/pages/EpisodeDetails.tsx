import React, { useState } from "react";
import DOMPurify from "dompurify";

import Header from "../components/Header";
import PodcastDetailLateral from "../components/PodcastDetaillsLateral";
import { RootState } from "../../../secondary/redux/store";
import { useSelector } from "react-redux";

import * as styles from "./EpisodeDetails.module.css";

const EpisodeDetails = () => {
  const selectedEpisode = useSelector((state: RootState) => state.episodeDetails.selectedEpisode);
  const [isLoading, setIsLoading] = useState(true);
  const cleanDescription = DOMPurify.sanitize(selectedEpisode?.description || "");

  return (
    <>
      <Header isLoading={isLoading} />

      <div className={styles.container}>
        <div className={styles.containerLateral}>
          <PodcastDetailLateral enableLinksPodcastDetails={true} />
        </div>
        <div className={`${styles.containerEpisodes} ${styles.page}`}>
          <span className={styles.title}>{selectedEpisode?.title}</span>
          <span className={styles.paragraph} dangerouslySetInnerHTML={{ __html: cleanDescription }} />

          <div className={`${styles.containerAudio} ${styles.pagePlayer}`}>
            <audio onLoadedData={() => setIsLoading(false)} controls className={styles.player}>
              <source src={selectedEpisode?.audioUrl} type='audio/mp3' />
            </audio>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetails;
