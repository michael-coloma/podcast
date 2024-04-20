import React, { useState } from "react";
import * as styles from "./Filter.module.css";
import IconNumber from "./IconNumber";

interface FilterProps<T> {
  data: T[];
  byFields: (keyof T)[];
  onDataFiltered: (data: T[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Filter = <T extends Record<string, any>>({ data, byFields, onDataFiltered }: FilterProps<T>) => {
  const [numberFilter, setnumberFilter] = useState(data.length);

  const handleFilter = (valueFilter: string) => {
    const resultFilter = data.filter((dataItem) =>
      byFields.some((byField) => dataItem[byField].toLowerCase().includes(valueFilter.toLowerCase())),
    );
    if (valueFilter.length) {
      setnumberFilter(resultFilter.length);
      onDataFiltered(resultFilter);
    } else {
      setnumberFilter(data.length);
    }
  };

  return (
    <div className={styles.container}>
      <IconNumber number={numberFilter} />
      <input
        type='text'
        className={styles.input}
        placeholder='Filter podcast...'
        onChange={(event) => handleFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
