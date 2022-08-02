import React from "react";
import "./Discovers.css";
import {Link} from 'react-router-dom';
const base_url = "https://image.tmdb.org/t/p/original";

function Discovers({ banner, title, des, rate, Icon, release_date , type , id }) {
  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  const year = new Date(release_date);
  return (
    <>

      <div className="discovers">
        <div className="discover__img">
          <img src={`${base_url}${banner}`} alt={title} />
        </div>
        <div className="discover__content">
          <div className="discover__left">
            <h3>
              {title} - <span>( {year.getFullYear()} )</span>
            </h3>
            <div className="button__box">
              <Link to={`${type}/${id}`}><button className="btn1">Play</button></Link>
            </div>
            <p>{truncate(des, 120)}</p>
          </div>
          <div className="right__discover">
            <Icon />
            <span>{rate}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discovers;
