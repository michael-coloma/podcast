import React from "react";
import * as styles from "./Loader.module.css";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return isLoading ? <div data-testid='loader' className={styles.loader} /> : <></>;
};

export default Loader;
