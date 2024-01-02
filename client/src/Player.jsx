import React, { useEffect } from "react";
import logo from "./assets/logo.jpeg";
import title from "./assets/title.jpeg";
import pause from "./assets/pause.png";
import play from "./assets/play.png";
import prevtrack from "./assets/prevtrack.png";
import nexttrack from "./assets/nexttrack.png";
import repeatpng from "./assets/repeat.png";
import beforeLike from "./assets/beforeLike.png";
import afterLike from "./assets/afterLike.png";
import beforeRepeat from "./assets/beforeRepeat.png";
import repeatone from "./assets/repeatone.png";
import { Loader } from "./Loader";

import { useRef } from "react";
import { useState } from "react";
export const Player = ({
  song,
  nextsong,
  prevsong,
  repeatCurrent,
  repeat,
  playTillEnd,
  setRepeat,
  setRepeatCurrent,
  setPlayTillEnd,
  onEnd,
}) => {
  const [liked, setLiked] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  //   const [song, setSongs] = useState(currentSong);
  const [prevQueue, setPrevQueue] = useState([]);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //   useEffect(() => {
  //     console.log(song);
  //     setSongs(currentSong);
  //   }, []);
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  //   const handleTimeUpdate = () => {
  //     setCurrentTime(
  //       (audioRef.current.currentTime / audioRef.current.duration) * 100
  //     );
  //     // console.log(audioRef.current.currentTime);
  //   };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  //   const handleSeek = (e) => {
  //     // console.log(audioRef.current.duration,e)
  //     const newTime = parseFloat(e * audioRef.current.duration * 0.01);
  //     setCurrentTime(newTime);
  //     audioRef.current.currentTime = newTime;
  //   };
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const handlePlayMode = (e) =>{
    console.log(e.target.id);
    e.preventDefault();
    const playMode = e.target.id;
    if(playMode==="playtillend"){
      setRepeat(true);
      setPlayTillEnd(false);
      e.target.src = repeatpng;
    }
    else if(playMode==="repeat"){
      setRepeatCurrent(true);
      e.target.src = repeatone;
      setRepeat(false);
    }
    else if(playMode==="repeatcurrent"){
      setRepeatCurrent(false);
      e.target.src = beforeRepeat;
      setPlayTillEnd(true);
    }
  }
  return (
    <main className="w-[100%] h-[10vh] text-text bg-player relative   ">
      <input
        type="range"
        value={currentTime}
        min="0"
        max={audioRef.current?.duration || 0}
        step="0.1"
        onChange={handleSeek}
        className="custom-appearance w-[100%] h-0.5   absolute custom-thumb"
      />
      <div className="w-full flex p-2 justify-between">
        <audio
          ref={audioRef}
          src={song.songloc}
          onTimeUpdate={handleTimeUpdate}
          autoPlay
          onEnded={(e) => onEnd(e)}
          loop={repeatCurrent === true ? true : false}
        ></audio>
        <div className="flex gap-4 rounded-2xl  w-[25vw] ">
          <div className="flex w-16">
            <img src={song.albumcover} alt="" className="w-fit" />
          </div>
          <div className="flex flex-col player justify-center w-[70%] items-center">
            <div className="text-2xl w-full truncate">
              <span>{song.songname}</span>
            </div>
            <div className="text-lg w-full truncate">
              <span>{song.artistname}</span>
            </div>
          </div>
        </div>
        <div className="controls flex justify-center  first-letter: items-center gap-4 w-[25vw] ">
          <button onClick={(e)=>{handlePlayMode(e)}}>
            <img src={beforeRepeat} alt="" id={playTillEnd===true?"playtillend":repeat===true?"repeat":repeatCurrent===true?"repeatcurrent":null}/>
          </button>
          <button className="flex justify-center" onClick={(e) => prevsong(e)}>
            <span className="">
              <img src={prevtrack} alt="" className="w-8" />
            </span>
          </button>
          <button onClick={togglePlay} className="flex justify-center">
            <img src={isPlaying ? pause : play} alt="" className="w-8" />
          </button>
          <button onClick={(e) => nextsong(e)} className="flex justify-center">
            <span>
              <img src={nexttrack} alt="" className="w-8" />
            </span>
          </button>
          <button
            onClick={(e) => {
                setLiked(!liked);
            }}
          >
            <img src={liked===true?afterLike:beforeLike} alt="" />
          </button>
        </div>
        <div className="custom-appearance w-[25%] px-4 items-center flex  justify-end relative">
          <img src="./SOURCE/img/sound.png" alt="" className="w-[10%]" />
          <input
            type="range"
            value={volume}
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
            className="h-0.5 bg-gray1"
          />
        </div>
      </div>
    </main>
  );
};
