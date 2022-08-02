import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar/SearchBar";

import PopularMovies from "./PopularMovies/PopularMovies";
import { useGetPopularQuery } from "../../features/Api";

function Widgets() {
  const { data } = useGetPopularQuery();
  const res = data?.results;

  return (
    <>
      <div className="widgets">
        <SearchBar Icon={SearchIcon} />
        

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
