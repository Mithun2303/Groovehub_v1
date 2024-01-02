import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import logo from "./assets/logo.svg";
import user from "./assets/gh.jpeg";
import axios from "axios";
import { Home } from "./Home";
import { Player } from "./player";

export const Dashboard = ({ cookie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  const [dashboardOption, setDashboardOption] = useState(0);
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [prevQueue, setPrevQueue] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [playTillEnd, setPlayTillEnd] = useState(true);
  const [repeatCurrent, setRepeatCurrent] = useState(false);
  useEffect(() => {
    console.log(cookie);

    const fetchData = async () => {
      try {
        const songsResponse = await axios.get(
          "http://127.0.0.1:8000/api/songs"
        );
        setSongs(songsResponse.data);

        const albumsResponse = await axios.get(
          "http://127.0.0.1:8000/api/albums"
        );
        setAlbums(albumsResponse.data);

        const artistsResponse = await axios.get(
          "http://127.0.0.1:8000/api/artists"
        );
        setArtists(artistsResponse.data);

        // All requests are complete, set isLoading to false
        setIsLoading(false);

        // console.log(albumsResponse.data);
        // console.log(songsResponse.data);
        // console.log(artistsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if necessary
      }
    };

    fetchData();
  }, []);

  const addToQueue = (e, song) => {
    // if(!queue){
    //   console.log(song);
    //   setQueue(song);
    //   setCurrentSong(queue[0]);
    // }
    // else{
    //   setQueue((prev)=>[...prev,song]);

    //   setCurrentSong(queue[0]);
    // }
    e.preventDefault();
    setQueue((prev) => [...prev, song]);
    // if(a)
    console.log(queue);
    // queue.push(song);
    // setCurrentSong(queue[0]);
    //   console.log(queue);
  };

  useEffect(() => {
    setCurrentSong(queue[0]);
    console.log(queue);
  }, [queue]);

  const onEnd = (e) => {
    e.preventDefault();
    console.log(repeat);
    if (playTillEnd === true) {
      // const newArray = [...queue];
      // const q = newArray.shift();
      // console.log(q);
      if (newArray.length === 0) {
        setCurrentSong(null);
        setQueue([]);
        setPrevQueue([]);
      } else {
        nextsong(e);
        // setPrevQueue((prev) => [...prev, q]);
        // setQueue(newArray);
        // console.log(queue);
        // setCurrentSong(queue[0]);
      }
    } else if (repeatCurrent === true) {
      // const queue = [...queue];
      // setQueue(queue);
      // setQueue([]);
    } else if (repeat === true) {
      if (queue.length === 1) {
        setQueue(prevQueue);
        setCurrentSong(queue[0]);
        setPrevQueue([]);
      }
      // const newArray = [...queue];
      // const q = newArray.shift();
      // if (newArray.length === 0) {
      //   setQueue(prevQueue);
      //   setCurrentSong(queue[0]);
      //   setPrevQueue([]);
      // }
      else {
        nextsong(e);
        // setPrevQueue((prev) => [...prev, q]);
        // setQueue(newArray);
        // console.log(queue);
        // setCurrentSong(queue[0]);
      }
    }
  };

  const nextsong = (e) => {
    if (queue.length === 1) {
      console.log(queue.length)
      const newArray = [...queue];
      const q = newArray.shift(); // Remove the first element from the array
      setCurrentSong(null);
      setPrevQueue((prev) => [...prev, q]);
      setQueue(prevQueue);
      setPrevQueue([]);
      setCurrentSong(queue[0]);
    }
    else{
      const newArray = [...queue];
      const q = newArray.shift(); // Remove the first element from the array
      setPrevQueue((prev) => [...prev, q]);
      setQueue(newArray);
      console.log(queue);
      setCurrentSong(queue[0]);
    }
    // if (repeat === true) {
    //   console.log(prevQueue);
    //   if (queue.length === 1) {
    //     setQueue(prevQueue);
    //     setCurrentSong(queue[0]);
    //     setPrevQueue([]);
    //   } else {
    //     //   const newArray = [...queue];
    //     // const q = newArray.shift(); // Remove the first element from the array
    //     // setPrevQueue((prev) => [...prev, q]);
    //     setQueue(newArray);
    //     console.log(queue);
    //     setCurrentSong(queue[0]);
    //   }
    // const newArray = [...queue];
    // const q = newArray.shift();
    // if (newArray.length === 0) {
    //   setQueue(prevQueue);
    //   setCurrentSong(queue[0]);
    //   setPrevQueue([]);
    // }
    // else {
    //   setPrevQueue((prev) => [...prev, q]);
    //   setQueue(newArray);
    //   console.log(queue);
    //   setCurrentSong(queue[0]);
    // }
    // }
    // e.preventDefault();
    // else {
    // const newArray = [...queue];
    // const q = newArray.shift(); // Remove the first element from the array
    // setPrevQueue((prev) => [...prev, q]);
  };
  const prevsong = (e) => {
    e.preventDefault();
    const newArray = [...prevQueue];
    const q = newArray.pop(); // Remove the first element from the array
    setQueue((prev) => [q, ...prev]);
    setPrevQueue(newArray);
    console.log(queue);
    setCurrentSong(queue[0]);
  };

  return isLoading === true ? (
    <Loader />
  ) : (
    <main className="bg-background h-screen flex mb-5">
      <div
        className={`sidebar bg-padding ${
          currentSong === null ? "h-screen" : "h-screen"
        } w-[16.66vw] flex flex-col justify-evenly  fixed `}
      >
        <div className="p-4 h-[10%] ">
          <img src={logo} alt="" />
        </div>
        <div className="mt-6 gap-4 h-[80%] w-full  text-white">
          <div className="">
            <span className="mb-2 text-text p-2 text-sm">Menu</span>
          </div>
          <div
            className={`${dashboardOption === 0 ? "bg-padding" : ""} p-4 mt-2`}
          >
            <button>Home</button>
          </div>
          <div
            className={`${dashboardOption === 1 ? "bg-padding" : ""} p-4 mt-2`}
          >
            <button>Search</button>
          </div>
          <div
            className={`${dashboardOption === 2 ? "bg-padding" : ""} p-4 mt-2`}
          >
            <button>Space</button>
          </div>
          <div className="mt-4">
            <span className="mb-2 text-text p-2 text-sm ">My Playlist</span>
          </div>
          <div className=" bg-padding p-2 mt-2">
            <div className="flex gap-4">
              <img src={user} alt="" className="rounded-[50%] w-[40px] " />
              <span className="flex justify-center items-center">
                Playlist#1
              </span>
            </div>
          </div>
          <div className="  p-2 ">
            <div className="flex gap-4">
              <img src={user} alt="" className="rounded-[50%] w-[40px] " />
              <span className="flex justify-center items-center">
                Playlist#2
              </span>
            </div>
          </div>
          <div className="  p-2 ">
            <div className="flex gap-4">
              <img src={user} alt="" className="rounded-[50%] w-[40px] " />
              <span className="flex justify-center items-center">
                Playlist#3
              </span>
            </div>
          </div>
        </div>
        {/* <div className="py-4  text-white">
          <div className="p-4">
            <span>Settings</span>
          </div>
          <div className="p-4 text-red-700">
            <button>Logout</button>
          </div>
        </div> */}
      </div>
      <div className=" flex flex-col w-[80vw] bg-background m-[2vw] left-[16.66vw] absolute text-text">
        <div className="navbar">
          <div className="flex justify-end h-[5vh] gap-8">
            <div className="flex">
              <img
                src={cookie.profilepic}
                alt="Profile"
                className="rounded-[50%] w-[50px] h-[50px]"
              />
              <span className="flex justify-center items-center mx-4">
                {cookie.userName}
              </span>
            </div>
            <span className="flex justify-center items-center">
              Notification
            </span>
          </div>
        </div>
        {dashboardOption === 0 ? (
          <Home
            songs={songs}
            cookie={cookie}
            albums={albums}
            artists={artists}
            setCurrentSong={setCurrentSong}
            addToQueue={addToQueue}
          />
        ) : null}
      </div>
      <div className="fixed w-full top-[90vh] ">
        {currentSong && (
          <Player
            song={currentSong}
            nextsong={nextsong}
            prevsong={prevsong}
            setRepeat={setRepeat}
            setRepeatCurrent={setRepeatCurrent}
            setPlayTillEnd={setPlayTillEnd}
            onEnd={onEnd}
            repeatCurrent={repeatCurrent}
            repeat={repeat}
            playTillEnd={playTillEnd}
          />
        )}
      </div>
    </main>
  );
};
