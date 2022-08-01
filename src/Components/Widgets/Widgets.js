import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar/SearchBar";
import Tag from "./Tags/Tag";
import PopularMovies from "./PopularMovies/PopularMovies";
import { useGetPopularQuery } from "../../features/Api";

function Widgets() {
  const { data } = useGetPopularQuery();
  const res = data?.results;

  return (
    <>
      <div className="widgets">
        <SearchBar Icon={SearchIcon} />
        <div className="tag__box">
          <Tag tag="Action" active />
          <Tag tag="Advanture" />
          <Tag tag="SI-FI" />
          <Tag tag="Hulu" />
          <Tag tag="Technology" />
          <Tag tag="Hollywood" />
          <Tag tag="Marvel" />
          <Tag tag="SuperHero" />
          <Tag tag="Disney" />
          <Tag tag="Netflix" />
          <Tag tag="Animation" />
        </div>

        <div className="popular__box">
          <div className="heading">Popular Movies</div>
          {res &&
            res.map((data) => (
              <PopularMovies
                Banner={data?.backdrop_path}
                title={data?.original_title || data?.original_name}
                id={data.id}
                description={data?.overview}
                type="movie"
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Widgets;
