import React from "react";
import { Link } from "react-router-dom";
import * as style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.container}>
      <Link className={style.header} to="/">
        Podcaster
      </Link>
    </div>
  );
};

export default Header;
