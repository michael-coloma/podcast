import React from "react";
import { Link } from "react-router-dom";
import * as style from "./Header.module.css";
import Loader from "./Loader";

interface HeaderProps {
  isLoading: boolean;
}

const Header = ({ isLoading }: HeaderProps) => {
  return (
    <div className={style.container}>
      <Link className={style.title} to="/">
        Podcaster
      </Link>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Header;
