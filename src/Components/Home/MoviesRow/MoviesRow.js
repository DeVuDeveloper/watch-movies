/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./MoviesRow.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { favAdd } from "../../../features/favSlice";
import { Link } from "react-router-dom";
const base_url = "https://image.tmdb.org/t/p/original";

function MoviesRow({ img, id, title, type, release_date, rate, grid }) {
  const year = new Date(release_date);

  const [icon, setIcon] = React.useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  const FavHanlder = () => {
    setIcon(<FavoriteIcon />);
    dispatch(
      favAdd({
        id: id,
        img: img,
        title: title,
        type: type,
        release_date: release_date,
        rate: rate,
      })
      
    );
  };

  return (
    <>
      <div className={ grid ? 'moviesRow gridMovies' : 'moviesRow'} key={id}>
        <Link to={`/${type}/${id}`}>
          <img src={`${base_url}${img}`} />
        </Link>
        <div className="fav" onClick={() => FavHanlder()}>
          {icon}
        </div>

        <div className={grid ? 'movies__info inn' : 'movies_info'}>
          <div className="movie__name">
            <h3>{truncate(title, 18)}</h3>
          </div>
          <div className="movie__other">
            <p>
              {year?.getFullYear()}
              <span>
                {rate}
                <StarIcon />
              </span>
            </p>
            <p>{type}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviesRow;
