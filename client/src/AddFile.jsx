import React, { useEffect, useState } from "react";
import {fb,storage} from "./firebase";
import { ref ,uploadBytes} from "firebase/storage";

export const AddFile = () => {
    const [file,setFile] = useState(null);
    // useEffect(()=>{
    //     if(file!=null){
    //         console.log(file);
    //         const mountainsRef = ref(storage, ``);

    //     }
    // },[file])

    const uploadFile = (e) =>{
        e.preventDefault();
        const imageRef = ref(storage,`images/${file.name}`);
        uploadBytes(imageRef,file).then(()=>{
            alert("image uploaded");
        })
    }
    return(
        <main>
            <div>
                <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
                <button onClick={(e)=> uploadFile(e)}>
                    submit
                </button>
            </div>
        </main>
    )
}

