import React, { useEffect } from "react";
import { useState } from "react";
import { fb, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

export const AddGenre = () => {
  const [genre, setGenre] = useState(null);
  const addData = () => {
    let obj = {
      genre: genre,
    };
    axios.post("http://127.0.0.1:8000/api/addgenre", obj).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <main className="w-screen h-screen">
      <div className="relative top-[25%] flex flex-col text-center justify-evenly w-[50%] left-[25%] gap-4 ">
        Add Genre
        <input
          type="text"
          name="name"
          id=""
          placeholder="Artist Name"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setGenre(e.target.value)}
        />
        <div className="flex justify-evenly">
          <button className="border-4 p-4 rounded-2xl" onClick={addData}>
            Add Artist
          </button>
        </div>
      </div>
    </main>
  );
};
