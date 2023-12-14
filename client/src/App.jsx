import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddSong } from "./AddSong";
import { AddArtist } from "./AddArtist";
import { AddAlbum } from "./AddAlbum";
import { AddGenre } from "./AddGenre";
import { Player } from "./player";
function App() {
  return (
    // <div>
    //   Hello World
    // </div>
    <Router>
      <Routes>
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/player" element={<Player />} />
        <Route path="/addartist" element={<AddArtist />} />
        <Route path="/addalbum" element={<AddAlbum />} />
        <Route path="/addgenre" element={<AddGenre />} />
      </Routes>
    </Router>
  );
}

export default App;
