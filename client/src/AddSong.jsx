import React, { useEffect, useState } from "react";
import { fb, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
export const AddSong = () => {
  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [songName, setSongName] = useState(null);
  const [albumName, setAlbumName] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [genre, setGenre] = useState(null);
  const [message, setMessage] = useState(null);
  const handleFileAdd = async () => {
    if (file != null) {
      console.log(file);
      const imageRef = ref(storage, `songs/${file.name}`);
      await uploadBytes(imageRef, file).then((response) => {
        console.log(response);
      });
      try {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        setMessage("Got URL");
        setProfileUrl(downloadURL);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }
  };
  const addData = () => {
    let obj = {
      songName: songName,
      albumName: albumName,
      artistName: artistName,
      songLoc: profileUrl,
      genre: genre,
    };
    axios.post("http://127.0.0.1:8000/api/addsong", obj).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <main className="w-screen h-screen">
      <div className="relative top-[25%] flex flex-col text-center justify-evenly w-[50%] left-[25%] gap-4 ">
        Add Song
        <input
          type="text"
          name="name"
          id=""
          placeholder="Song Name"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setSongName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Album Name"
          onChange={(e) => setAlbumName(e.target.value)}
          className="border-4 border-black p-4 rounded-2xl"
        />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Artist Name"
          onChange={(e) => setArtistName(e.target.value)}
          className="border-4 border-black p-4 rounded-2xl"
        />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Genre"
          onChange={(e) => setGenre(e.target.value)}
          className="border-4 border-black p-4 rounded-2xl"
        />
        <div className="flex justify-evenly">
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
            className="border-4 border-black w-[50%] p-4 rounded-2xl"
            placeholder="Song Loc"
          />
          <button
            onClick={(e) => handleFileAdd()}
            className="w-[25%] border-black border-4 p-4 rounded-2xl"
          >
            Add file
          </button>
          <span className="p-4 w-[25%]">
            {/* hello */}
            {message===null?null:message}
          </span>
        </div>
        <div className="flex justify-evenly">
          <button
            className="border-4 p-4 enabled:border-black rounded-2xl \ 
            disabled:border-gray disabled:border-4"
            onClick={(e) => addData()}
            disabled={message===null?true:false}
          >
            Add Artist
          </button>
        </div>
      </div>
    </main>
  );
};
