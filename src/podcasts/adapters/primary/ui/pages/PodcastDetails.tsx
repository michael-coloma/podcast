import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePodcastDetail } from "../hooks/usePodcastDetails";
import Header from "../components/Header";
import { convertFormatZuluToFormatDateView, convertMilisecondstoFormatHoursMinutes } from "../utils/utilsTimer";
import PodcastDetailLateral from "../components/PodcastDetaillsLateral";
import { useDispatch } from "react-redux";
import { setSelectedEpisode } from "../../../secondary/redux/episodeDetailsSlice";

import * as styles from "./PodcastDetails.module.css";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { podcastDetails, isLoading, isError, error } = usePodcastDetail(podcastId || "");

  return (
    <>
      <Header isLoading={isLoading} />
      {!isError && !isLoading && podcastDetails && (
        <div className={styles.container}>
          <div className={styles.containerLateral}>
            <PodcastDetailLateral />
          </div>
          <div className={styles.containerEpisodes}>
            <div className={`${styles.totalEpisodes} ${styles.page}`}>Episodes: {podcastDetails.numberEpisodes}</div>
            <table className={`${styles.page} ${styles.containerTable}`}>
              <thead className={styles.headTable}>
                <tr className={styles.containerRowHead}>
                  <th className={styles.headTitle}>Title</th>
                  <th className={styles.columDate}>Date</th>
                  <th className={styles.columnDuration}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {podcastDetails.episodes.map((episode, index) => (
                  <tr className={`${styles.containerRow} ${index % 2 === 0 && styles.rowColor}`} key={index}>
                    <td
                      className={styles.columTitle}
                      onClick={() => {
                        dispatch(setSelectedEpisode(episode));
                        navigate(`/podcast/${podcastId}/episode/${episode.id}`);
                      }}
                    >
                      {episode.title}
                    </td>
                    <td className={styles.columDate}>{convertFormatZuluToFormatDateView(episode.publicationDate)}</td>
                    <td className={styles.columnDuration}>
                      {convertMilisecondstoFormatHoursMinutes(episode.duration)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isError && <>Error: {error instanceof Error ? error.message : "An error occurred"}</>}
    </>
  );
};

export default PodcastDetail;
