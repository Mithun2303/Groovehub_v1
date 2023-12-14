import React, { useEffect } from "react";
import { useState } from "react";
import { fb, storage } from "./firebase";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import axios from "axios";


export const AddArtist = () => {
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [profileUrl,setProfileUrl] = useState(null);
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
        console.log(response)
    });
  
      try {
        // Get the download URL asynchronously
        const downloadURL = await getDownloadURL(imageRef);
  
        // Use the download URL
        console.log(downloadURL);
        setProfileUrl(downloadURL);

        // If you want to upload the file, uncomment the following lines:
        // await uploadBytes(imageRef, file);
        // console.log("Image uploaded successfully");
      } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error getting download URL:", error);
      }
    }
  };

const addData = ()  =>{
    if(profileUrl!=null){
        let obj = {
            artistName:name,
            artistProfile:profileUrl
        };
        axios.post("http://127.0.0.1:8000/api/addartist",obj).then(
            (res) =>{
                console.log(res.data);
            }
        )
    }
}
  return (
    <main className="w-screen h-screen">
      <div className="relative top-[25%] flex flex-col text-center justify-evenly w-[50%] left-[25%] gap-4 ">
        Add Artist
        <input
          type="text"
          name="name"
          id=""
          placeholder="Artist Name"
          className="border-4 border-black p-4 rounded-2xl"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
            className="border-4 border-black w-[75%] p-4 rounded-2xl"
            placeholder="Add Image"
          />
          <button
            onClick={(e) => handleFileAdd()}
            className="w-[25%] border-black border-4 p-4 rounded-2xl"
          >
            Add file
          </button>
        </div>
        <div className="flex justify-evenly">
          <button className="border-4 p-4 rounded-2xl" onClick={addData}>Add Artist</button>
        </div>
      </div>
    </main>
  );
};
