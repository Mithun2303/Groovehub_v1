import { useState } from "react";
import { AllArtists } from "./AllArtists";
import { AllSongs } from "./AllSongs";
import { AllAlbums } from "./AllAlbums";
import prev from "./assets/prev.png";
import next from "./assets/next.png";
import play from "./assets/play.png";
import shuffle from "./assets/shuffle.png";
import options from "./assets/options.png";
import { Album } from "./Album";
import { Artist } from "./Artist";

export const Home = ({
  cookie,
  songs,
  albums,
  artists,
  setCurrentSong,
  addToQueue,
}) => {
  const [showPopUp, setShowPopUp] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
  return showPopUp === "All Songs" ? (
    <AllSongs
      songs={songs}
      setShowPopUp={setShowPopUp}
      setCurrentSong={setCurrentSong}
    />
  ) : showPopUp === "All Albums" ? (
    <AllAlbums
      albums={albums}
      setShowPopUp={setShowPopUp}
      setCurrentAlbum={setCurrentAlbum}
      setCurrentSong={setCurrentSong}
    />
  ) : showPopUp === "All Artists" ? (
    <AllArtists
      artists={artists}
      setShowPopUp={setShowPopUp}
      setCurrentSong={setCurrentSong}
    />
  ) : showPopUp === "Album" ? (
    <Album
      setShowPopUp={setShowPopUp}
      currentAlbum={currentAlbum}
      setCurrentSong={setCurrentSong}
      addToQueue={addToQueue}
    />
  ) : showPopUp === "Artist" ? (
    <Artist
      setShowPopUp={setShowPopUp}
      currentArtist={currentArtist}
      setCurrentSong={setCurrentSong}
      addToQueue={addToQueue}
    />
  ) : (
    <div className="home w-full h-full flex flex-col">
      <div className="bg-padding text-text relative h-fit mt-12 rounded-2xl p-4 w-[20vw]">
        <span className="text-3xl font-semibold">Good Morning,</span>
        <br />
        <span className="text-lg italic font-extralight ">
          {cookie.userName}
        </span>
      </div>
      <div className="w-[80%] bg-highlight p-4 relative mt-2 rounded-2xl text-xl font-bold italic text-text">
        <span className="">
          Play the music you like, explore songs
          <br />
          listen anytime and anywhere and now it’s easier
        </span>
      </div>
      <div className="flex flex-col overflow-x-auto scrollbar mt-[10vh] gap-2">
        <div className="text-white flex  justify-between items-end  ">
          <span className="text-2xl mx-2  font-semibold ">Jump Back In</span>
          <button
            className="hover:underline mx-8"
            onClick={(e) => setShowPopUp("All Songs")}
          >
            Show all
          </button>
        </div>
        <ul className="text-text inline-grid grid-flow-col  gap-4  ">
          {songs.map((song, index) => (
            <li
              className="w-[15vw] flex justify-center bg-[rgb(255,255,255,0.2)] h-fit rounded-2xl"
              key={index}
              onClick={(e) => {
                console.log(song);
                addToQueue(e, song);
              }}
            >
              <button className="p-4">
                <img
                  src={song.albumcover}
                  alt=""
                  className="w-[100%] rounded-2xl"
                />
                <div className="flex justify-between ">
                  <div
                    key={index}
                    className="flex flex-col text-left mt-[0%] gap-1"
                  >
                    <div className="truncate w-48">
                      <span className="text-lg truncate w-full">
                        {song.songname}
                      </span>
                    </div>
                    <div className="w-48 truncate">
                      <span className="text-primarytext truncate mt-0 text-xs ">
                        {song.artistname}
                      </span>
                    </div>
                  </div>
                  {/* <div className="">
                    <img src={options} alt="" className=""/>
                </div> */}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col overflow-x-auto scrollbar mt-12 gap-2">
        <div className="text-white flex  justify-between items-end  ">
          <span className="text-2xl mx-2  font-semibold ">Top Albums</span>
          <button
            className="hover:underline mx-8"
            onClick={(e) => setShowPopUp("All Albums")}
          >
            Show all
          </button>
        </div>
        <ul className="text-text inline-grid grid-flow-col   gap-4  ">
          {albums.map((album, index) => (
            <li
              className="w-[15vw] flex justify-center bg-[rgb(255,255,255,0.2)] h-fit rounded-2xl"
              key={index}
              onClick={(e) => {
                setShowPopUp("Album");
                setCurrentAlbum(album);
              }}
            >
              <button className="p-4">
                <img
                  src={album.albumcover}
                  alt=""
                  className="w-[100%] rounded-2xl"
                />
                <div
                  key={index}
                  className="flex flex-col  text-left mt-[0%] gap-1"
                >
                  <div className="truncate w-48">
                    <span className="text-lg  ">{album.albumname}</span>
                  </div>
                  <div className="w-48 truncate">
                    <span className="text-primarytext  text-xs ">
                      {album.description}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col overflow-x-auto scrollbar mt-12 gap-2">
        <div className="text-white flex  justify-between items-end  ">
          <span className="text-2xl mx-2  font-semibold ">Top Artists</span>
          <button
            className="hover:underline mx-8"
            onClick={(e) => setShowPopUp("All Artists")}
          >
            Show all
          </button>
        </div>
        <ul className="text-text inline-grid grid-flow-col   gap-4  ">
          {artists.map((artist, index) => (
            <li
              className="w-[15vw] flex justify-center bg-[rgb(255,255,255,0.2)] h-fit rounded-2xl"
              key={index}
              onClick={(e) => {
                setShowPopUp("Artist");
                setCurrentArtist(artist);
              }}
            >
              <button className="p-4">
                <img
                  src={artist.artistprofile}
                  alt=""
                  className="w-[100%] rounded-2xl"
                />
                <div
                  key={index}
                  className="flex flex-col  text-left mt-[0%] gap-1"
                >
                  <span className="text-lg truncate w-48 ">
                    {artist.artistname}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
