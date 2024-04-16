import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePodcastDetail } from "../hooks/usePodcastDetails";
import Header from "../components/Header";

import * as styles from "./PodcastDetails.module.css";
import {
  convertFormatZuluToFormatDateView,
  convertMilisecondstoFormatHoursMinutes,
} from "../utils/utilsTimer";

const PodcastDetail = () => {
  const { podcastId } = useParams();

  const { podcastDetails, isLoading, isError, error } = usePodcastDetail(
    podcastId || ""
  );

  return (
    <>
      <Header isLoading={isLoading} />
      {!isError && !isLoading && podcastDetails && (
        <div className={styles.container}>
          <div className={styles.lateral}>Lateral WIP</div>
          <div className={styles.containerEpisodes}>
            <div className={`${styles.totalEpisodes} ${styles.page}`}>
              Episodes: {podcastDetails.numberEpisodes}
            </div>
            <table className={`${styles.page} ${styles.containerTable}`}>
              <thead className={styles.headTable}>
                <tr className={styles.containerRowHead}>
                  <th className={styles.headTitle}>Title</th>
                  <th className={styles.columDate}>Date</th>
                  <th className={styles.columnDuration}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {podcastDetails.episodes.map(
                  ({ title, duration, publicationDate }, index) => (
                    <tr
                      className={`${styles.containerRow} ${index % 2 === 0 && styles.rowColor}`}
                      key={index}
                    >
                      <td className={styles.columTitle}>{title}</td>
                      <td className={styles.columDate}>
                        {convertFormatZuluToFormatDateView(publicationDate)}
                      </td>
                      <td className={styles.columnDuration}>
                        {convertMilisecondstoFormatHoursMinutes(duration)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isError && (
        <>
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </>
      )}
    </>
  );
};

export default PodcastDetail;
