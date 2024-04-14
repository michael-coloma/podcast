import React from "react";
import * as styles from "./IconNumber.module.css";

const IconNumber = ({ number = 100 }: { number?: number }) => {
  return (
    <div className={styles.container}>
      <span className={styles.number}>{number}</span>
    </div>
  );
};

export default IconNumber;
