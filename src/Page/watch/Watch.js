/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
import { useParams } from 'react-router-dom';
import { useGetByIdQuery } from '../../features/Api';
import './watch.css';

const base_url = 'https://image.tmdb.org/t/p/original';

export default function Watch() {
  const films = [
    {
      Title: 'Jurasic World Dominion',
      Year: '1977',
      imdbID: 'tt0076759',
      Type: 'movie',
      link: 'https://enxa.vizcloud.site/simple/EqPFI_gQBAro1HhYl67rC5suqFwBsL3oT0x7rqk+wYMnU94US2El/br/H4/v.m3u8',
    },
    {
      Title: 'The Gray Man',
      Year: '1980',
      imdbID: 'tt0080684',
      Type: 'movie',
      link: 'https://ngjx.vizcloud.site/simple/EqPFI_MQBAro1HhYl67rC5UuqVwHuLfyAwZ7rqk+wYMnU94US2El/br/H4/v.m3u8',
    },
    {
      Title: 'The Valet',
      Year: '1983',
      imdbID: 'tt0086190',
      Type: 'movie',
      link: 'https://andn.vizcloud.site/simple/EqPFIPoQBAro1HhYl67rC8Iu+VxY5OS6Ax97rqk+wYMnU94US2El/br/H4/v.m3u8 ',
    },
  ];

 const film = films.filter(myFun);
  function myFun(film) {
    return film.link;
  }

  console.log(film)

  return (
    <div className="App">
      <ReactHlsPlayer
        src={film[2].link}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
}
