import React from "react";
import * as styles from "./Filter.module.css";
import IconNumber from "./IconNumber";

interface FilterProps {
  onChange: (value: string) => void;
}

const Filter = ({ onChange }: FilterProps) => {
  return (
    <div className={styles.container}>
      <IconNumber />
      <input
        type="text"
        className={styles.input}
        placeholder="Filter podcast..."
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default Filter;
