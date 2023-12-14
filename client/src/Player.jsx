import React from "react";
import song from "./assets/hi.mp3";
export const Player = () => {
  return (
    <main className="w-screen  absolute top-[50%] flex justify-evenly">
      <div>
        hello
        {/* <audio src="https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2FEnnai-Vittu-(Yuvanshankar-Raja-Version)-MassTamilan.dev.mp3?alt=media&token=06466b02-14fd-45a5-9c48-81d8721c8530"></audio> */}
      </div>
      <div>
        <audio controls src={"https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2FEnnai-Vittu-(Yuvanshankar-Raja-Version)-MassTamilan.dev.mp3?alt=media&token=06466b02-14fd-45a5-9c48-81d8721c8530"} type="audio/mpeg" />{" "}
      </div>
    </main>
  );
};
