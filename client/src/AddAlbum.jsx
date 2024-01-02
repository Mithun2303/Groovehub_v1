import React, { useEffect } from "react";
import { useState } from "react";
import { fb, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

export const AddAlbum = () => {
  const [name, setName] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  //   useEffect(() => {
  //     if (file != null) {
  //       const imageRef = ref(storage, `images/${name}`);
  //       uploadBytes(imageRef, file).then(() => {
  //         alert("image uploaded");
  //       });
  //     }
  //   }, [file]);

  //   const handleFileAdd = async() => {
  //     if (file != null) {
  //         console.log(file);
  //       const imageRef = await ref(storage, `images/${file.name}`).getDownloadURL();

  //         console.log(imageRef);
  //     // imageRef.getDownloadURL().then((url)=>{console.log(url)});

  //     }
  //   };
  const handleFileAdd = async () => {
    if (file != null) {
      console.log(file);

      // Create a reference to the storage location
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file).then((response) => {
        // alert("image uploaded");
        console.log(response);
      });

      try {
        // Get the download URL asynchronously
        const downloadURL = await getDownloadURL(imageRef);

        // Use the download URL
        console.log(downloadURL);
        setProfileUrl(downloadURL);
        setMessage("Got URL");
        

        // If you want to upload the file, uncomment the following lines:
        // await uploadBytes(imageRef, file);
        // console.log("Image uploaded successfully");
      } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error getting download URL:", error);
      }
    }
  };

  const addData = () => {
    if (profileUrl != null) {
      let obj = {
        albumName:name,
        description:description,
        artistName:artistName,
        albumCover:profileUrl
    }
      axios.post("http://127.0.0.1:8000/api/addalbum", obj).then((res) => {
        console.log(res.data);
      });
    }
  };
  return (
    <main className="w-screen h-screen">
      <div className="relative top-[25%] flex flex-col text-center justify-evenly w-[50%] left-[25%] gap-4 ">
        Add Album
        <input
          type="text"
          name="name"
          id=""
          placeholder="Album Name"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Description"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Artist Name"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setArtistName(e.target.value)}
        />
        <div className="flex">
          <div className="border-4 flex justify-evenly border-black rounded-2xl w-[75%]">
            <label htmlFor="Album cover" className=" p-4  text-gray-400">
              {" "}
              Cover picture
            </label>
            <input
              type="file"
              name=""
              id="ALbum cover"
              onChange={(e) => setFile(e.target.files[0])}
              className=" p-4 rounded-2xl "
              placeholder="Add Album Cover"
            />
          </div>
          <button
            onClick={(e) => handleFileAdd()}
            className="w-[25%] border-black border-4 p-5 rounded-2xl"
          >
            {message===null?"Add file":message}
          </button>
        </div>
        <div className="flex justify-evenly">
          <button className="border-4 p-4 rounded-2xl" onClick={addData}>
            Add Album
          </button>
        </div>
      </div>
    </main>
  );
};
