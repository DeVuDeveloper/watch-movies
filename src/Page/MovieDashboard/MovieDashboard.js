import React, { useState } from 'react';
import axios from 'axios';
import './MovieDashboard.css';
import { useParams } from 'react-router-dom';
import { useGetByIdQuery } from '../../features/Api';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { makeStyles, Dialog } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReactPlayer from 'react-player';
import Jurassic from './titles/jurassic.vtt';
import Gabriel from './titles/gabriel.vtt';
import Gabriel2 from './titles/gabriel2.vtt';
import Gabriel3 from './titles/gabriel3.vtt';
import GabrielRapture from './titles/gabrielRapture.vtt';
import Marry from './titles/marry.vtt';
import Dont from './titles/dont.vtt';
import Strange from './titles/strange.vtt';
import Back from './titles/back.vtt';
import Lost from './titles/lost.vtt';
import The355 from './titles/the355.vtt';
import Moonfall from './titles/moonfall.vtt';
import Fantastic from './titles/fantastic.vtt';

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    left: 'auto',
    right: 'auto',
    top: 50,
  },
});
const base_url = 'https://image.tmdb.org/t/p/original';

const films = [
  {
    Title: 'Jurassic World Dominion',
    link: 'https://enxa.vizcloud.site/simple/EqPFI_gQBAro1HhYl67rC5suqFwBsL3oT0x7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Jurassic,
  },
  {
    Title: 'The Gray Man',
    link: 'https://ngjx.vizcloud.site/simple/EqPFI_MQBAro1HhYl67rC5UuqVwHuLfyAwZ7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: '',
  },
  {
    Title: 'The Valet',
    link: 'https://andn.vizcloud.site/simple/EqPFIPoQBAro1HhYl67rC8Iu+VxY5OS6Ax97rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: '',
  },
  {
    Title: 'Doctor Strange in the Multiverse of Madness',
    link: 'https://kadk.vizcloud.site/simple/EqPFI_MQBAro1HhYl67rC5Eur1wCuOX7CB97rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Strange,
  },
  {
    Title: 'Dog',
    link: 'https://gzlk.vizcloud.site/simple/EqPFI_wQBAro1HhYl67rC8cu+lxfu_mzSEZ7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: '',
  },
  {
    Title: 'Gabriel\'s Inferno',
    link: 'https://nqvx.vizcloud.site/simple/EqPFI_wQBAro1HhYl67rC8IuqVxV8vy3Fhp7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Gabriel,
  },
  {
    Title: 'Gabriel\'s Inferno: Part II',
    link: 'https://v58rt6.serversicuro.cc/hls/dnzpefna3dg4a3gyvaih73tqytt7sbfnnhnxbxn34nb3yxgy7cf5xtfeiozq/index-v1-a1.m3u8',
    vtt: Gabriel2,
  },
  {
    Title: 'Gabriel\'s Inferno: Part III',
    link: 'https://c-1.mzzcloud.life/_v8/2a2bd55e55b1ddde5d917ff337d7a9091f141aca2555f2090b35ac4c1620de0a50184b7a66d4adb69edbcde0a02fb592b43bb9e3b23fc6ba64f8ec3c7230d1be6c38771ba3aad0cb6bab798171f2b8153ea5e86cc9c7abb539a77e080a54e357dbedff9f635884f87f9f527848454a847d60fe2efad89c0731a2797f17c4b226/1080/index.m3u8',
    vtt: Gabriel3,
  },
  {
    Title: 'Gabriel\'s Rapture',
    link: 'https://zqdd.vizcloud.site/simple/EqPFIPsQBAro1HhYl67rC8YuoVwa5fz1TEZ7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: GabrielRapture,
  },
  {
    Title: 'Marry Me',
    link: 'https://kadk.vizcloud.site/simple/EqPFI_IQBAro1HhYl67rC5curFwa4uWwDUJ7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Marry,
  },
  {
    Title: 'Don\'t Look Up',
    link: 'https://kelk.vizcloud.site/simple/EqPFI_wQBAro1HhYl67rC5YurFwBvr7yTAR7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Dont,
  },
  {
    Title: 'I Want You Back',
    link: 'https://nnyo.vizcloud.site/simple/EqPFI_wQBAro1HhYl67rC5Quqlxbu+DxCw17rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Back,
  },
  {
    Title: 'The Lost City',
    link: 'https://gzmk.vizcloud.site/simple/EqPFI_IQBAro1HhYl67rC5Qu_lwBsOPyF0x7rqk+wYMnU94US2El/br/H3/v.m3u8',
    vtt: Lost,
  },
  {
    Title: 'The355',
    link: 'https://vlgm.vizcloud.site/simple/EqPFI_0QBAro1HhYl67rC5Mu_lxau+O7F0N7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: The355,
  },
  {
    Title: "Moonfall",
    link: 'https://ajae.vizcloud.site/simple/EqPFI_8QBAro1HhYl67rC5cu_Fxeu_y3Shh7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Moonfall,
  },
  {
    Title: "Fantastic Beasts: The Secrets of Dumbledore",
    link: 'https://gwpq.vizcloud.site/simple/EqPFI_kQBAro1HhYl67rC5IuoFxV+b77TwV7rqk+wYMnU94US2El/br/H4/v.m3u8',
    vtt: Fantastic,
  },
];

function MovieDashboard(props) {
  const classes = useStyles();
  const [string, setString] = useState(150);
  const [show, setShow] = useState('More');
  const navigate = useNavigate();
  const { id, type } = useParams();
  const info = {
    id: id,
    type: type,
  };
  const { data } = useGetByIdQuery(info);

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + '...' : string;
  };

  const stringHandler = () => {
    setString(1500);
    setShow('');
  };

  const backHandler = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const [openTrailer, setOpenTrailer] = React.useState(false);
  const [openMovie, setOpenMovie] = React.useState(false);
  const [ytlink, setytlink] = useState();

  const handleClickOpenTrailer = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${data?.imdb_id}/videos?api_key=d8bf019d0cca372bd804735f172f67e8`
      )
      .then((res) => {
        setytlink('https://www.youtube.com/embed/' + res.data.results[0].key);
        setOpenTrailer(true);
      })
      .catch((error) => {
        alert('No trailer found for this movie!!!');
      });
  };

  const handleCloseTrailer = () => {
    setOpenTrailer(false);
  };

  const handleClickOpenMovie = () => {
    if (!movieLink && ! movieVtt) {
      alert('There is no stream for this movie')
    }
    setOpenMovie(true);
  };
  const handleCloseMovie = () => {
    setOpenMovie(false);
  };

  const film = films.map(myFun);
  function myFun(f) {
    return f;
  }

  let movieVtt = '';
  let movieLink = '';
  for (let i = 0; i < film.length; i++) {
    if (film[i].Title === data?.original_title) {
      movieLink = film[i].link;
      movieVtt = film[i].vtt;
    }
  }

  window.alert = function (msg) {
    var id = 'alertBox',
      alertBox,
      closeId = 'alertClose',
      alertClose;
    alertBox = document.createElement('div');
    document.body.appendChild(alertBox);
    alertBox.id = id;
    alertBox.innerHTML = msg;
    alertClose = document.createElement('div');
    alertClose.id = closeId;
    alertBox.appendChild(alertClose);
    alertBox.style.visibility = 'visible';
    alertClose.style.visibility = 'visible';
  };

  return (
    <>
      <div
        className="movieDashboard"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${base_url}${data?.backdrop_path})`,
          backgroundPosition: 'center center',
        }}
      ></div>
      <div className="layer"></div>
      <div className="back__icon" onClick={() => backHandler()}>
        <span>Back</span>
      </div>

      <div className="movie__content">
        <div className="name">
        console.log({data?.name || data?.original_name || data?.original_title})
          <h3>{data?.name || data?.original_name || data?.original_title}</h3>
          
          <p>
            {truncate(data?.overview, string)}{' '}
            <span onClick={() => stringHandler()}>{show}</span>
          </p>
        </div>
        <div className="button__box">
          <IconButton
            onClick={handleClickOpenTrailer}
            style={{
              top: '5px',
              right: '5px',
              color: 'red',
              width: '50px',
              height: '40px',
              background: 'white',
            }}
          >
            <YouTubeIcon fontSize="large" />
          </IconButton>
          
          <Dialog
            classes={{
              paper: classes.dialog,
            }}
            open={openTrailer}
            onClose={handleCloseTrailer}
            aria-labelledby="responsive-dialog-title"
          >
            
            <span className="player">
              <ReactPlayer
                width={'100%'}
                height={'100%'}
                url={ytlink}
                muted={false}
                playing={true}
                controls
                config={{
                  file: {
                    attributes: {
                      controlsList: 'fullscreen',
                    },
                  },
                }}
              />
            </span>
        
            <IconButton
              onClick={handleCloseTrailer}
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                color: 'white',
                width: '60px',
                height: '60px',
                background: 'rgb(0,0,0,0.5)',
                borderRadius: '100%',
              }}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Dialog>

          <IconButton
            onClick={handleClickOpenMovie}
            style={{
              top: '5px',
              right: '-45px',
              color: 'red',
              width: '50px',
              height: '40px',
              background: 'white',
            }}
          >
            <button>
              <PlayArrowIcon /> Watch
            </button>
          </IconButton>
          {movieLink && (
          <Dialog
          
            classes={{
              paper: classes.dialog,
            }}
            open={openMovie}
            onClose={handleCloseMovie}
            aria-labelledby="responsive-dialog-title"
          >
            <span className="player">
           
              <ReactPlayer
                url={movieLink}
                controls={true}
                width={'100%'}
                height={'100%'}
                playing={true}
                muted={false}
                config={{
                  file: {
                    attributes: {
                      crossOrigin: 'true',
                      controlsList: 'fullscreen',
                    },
                    tracks: [
                      {
                        kind: 'subtitles',
                        src: movieVtt,
                        srcLang: 'sr',
                        default: true,
                      },
                    ],
                  },
                }}
              />
            </span>

            <IconButton
              onClick={handleCloseMovie}
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                color: 'white',
                width: '60px',
                height: '60px',
                background: 'rgb(0,0,0,0.5)',
                borderRadius: '100%',
              }}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Dialog>
          )}
        </div>
      </div>
    </>
  );
}
export default MovieDashboard;
