import React from "react";
import * as styles from "./Filter.module.css";
import IconNumber from "./IconNumber";

const Filter = () => {
  return (
    <div className={styles.container}>
      <IconNumber />
      <input className={styles.input} placeholder="Filter podcast..." />
    </div>
  );
};

export default Filter;
