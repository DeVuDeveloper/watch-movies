import React from "react";
import "./SlideBar.css";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SideItem from "./SideItems/SideItem";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";


function SlideBar() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div className={show ? "sidebar side__show" : "sidebar"}>
        <Link to="/">
          {" "}
          <div className="logo">
            <img
              src="https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-6.png"
              alt="logo"
            />
          </div>
        </Link>
        <div className="side__box">
          <div className="box__one">
            <span className="heading">Menu</span>
            <SideItem Icon={HomeMaxIcon} Name="Home" active link="/" />
            <SideItem Icon={SearchIcon} Name="Search" link="/search" />
            <SideItem
              Icon={FavoriteBorderIcon}
              Name="Favorite"
              link="/favorite"
            />
          </div>
          
        </div>
        <div className="menu__icon" onClick={() => setShow(!show)}>
          <MenuIcon />
        </div>
      </div>
      <div className={show ? 'layer layer__show': 'layer'} onClick={() => setShow(false)}></div>
    </>
  );
}

export default SlideBar;
