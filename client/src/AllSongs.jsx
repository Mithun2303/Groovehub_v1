import prev from "./assets/prev.png";
import next from "./assets/next.png";
export const AllSongs = ({ songs, setShowPopUp,setCurrentSong }) => {

  return (
    <div className="w-[100%] absolute  h-fit ">
      <button
        className="rounded-[50%] w-12 h-12 hover:bg-[rgb(255,255,255,0.2)] p-2"
        onClick={(e) => setShowPopUp(null)}
      >
        <img src={prev} alt="" />
      </button>
      <button className="rounded-[50%] w-12 h-12 hover:bg-[rgb(255,255,255,0.2)] p-2">
        <img src={next} alt="" />
      </button>
      <div className="flex flex-col overflow-x-auto scrollbar mt-[10vh] gap-2">
        <div className="text-white flex  justify-between items-end  ">
          <span className="text-2xl mx-2  font-semibold ">Jump Back In</span>
        </div>
        <ul className="text-text flex  flex-wrap   gap-4  ">
          {songs.map((song, index) => (
            <li
              className="w-[15vw] h-[35vh] flex justify-center bg-[rgb(255,255,255,0.2)] rounded-2xl"
              key={index}
              onClick={(e)=>setCurrentSong(song)}
            >
              <button className="p-4">
                <img
                  src={song.albumcover}
                  alt=""
                  className="w-[100%] h-[25vh] truncate rounded-2xl"
                />
                <div
                  key={index}
                  className="flex flex-col text-left mt-[0%] truncate  gap-1"
                >
                  <div className=" w-48 truncate">

                  <span className="text-lg  ">
                    {song.songname}
                  </span>
                  </div>
                  <div className=" w-48 truncate">

                  <span className="mt-0 text-xs ">{song.artistname}</span>
                </div>
                  </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
