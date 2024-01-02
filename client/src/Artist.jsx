import prev from "./assets/prev.png";
import next from "./assets/next.png";
import play from "./assets/play.png";
import shuffle from "./assets/shuffle.png";
import queue from "./assets/addtoqueue.png";

export const Artist = ({
  setShowPopUp,
  currentArtist,
  setCurrentSong,
  addToQueue,
}) => {
  return (
    <div className="w-[100%] absolute  h-fit">
      <button
        className="rounded-[50%] w-12 h-12 hover:bg-[rgb(255,255,255,0.2)] p-2"
        onClick={(e) => {
          setShowPopUp(null);
        }}
      >
        <img src={prev} alt="" />
      </button>
      <button className="rounded-[50%] w-12 h-12 hover:bg-[rgb(255,255,255,0.2)] p-2">
        <img src={next} alt="" />
      </button>
      <div className="mt-8">
        <div className="flex justify-between  border-b-2 sticky top-12 z-50  border-highlight">
          <div className="flex gap-8 py-2">
            <img
              src={currentArtist.artistprofile}
              alt=""
              className="w-64 h-64 rounded-xl"
            />
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-3xl">
                {currentArtist.artistname}
              </span>
              {/* <span className="text-lg">{currentArtist.description}</span> */}
            </div>
          </div>
          <div className="flex justify-center items-center mx-8 gap-16">
            <button>
              <img src={play} alt="" className="w-12 h-12" />
            </button>
            <button>
              <img src={shuffle} alt="" className="w-12 h-12" />
            </button>
          </div>
        </div>
        <div className="z-10 mt-2 overflow-y-auto overflow-x-hidden h-[50vh] ">
          <ul className="">
            {currentArtist.songs.map((song, index) => (
              <li
                key={index}
                className=" h-[10vh] items-center flex m-5  shadow hover:bg-glassbg"
              >
                <img
                  src={song.albumcover}
                  alt=""
                  className="w-[60px] ml-2 h-[60px]"
                />
                <div className="flex flex-col text-left truncate w-[60%]">
                  <span className=" ml-5 hover:max-w-200 transition-max-w-0.5s">
                    {song.songname}
                  </span>
                  <span className="ml-5 text-primarytext">
                    by {currentArtist.artistname}
                  </span>
                </div>
                <div className=" left-8 relative">
                    <button onClick={(e) => {
                      song.artistname = currentArtist.artistname;
                      addToQueue(e,song);
                    }}>

                <img
                      src={queue}
                      className=" hover:bg-black w-8 h-8"
                      alt="helo"
                      />
                      </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
