import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddSong } from "./AddSong";
import { AddArtist } from "./AddArtist";
import { AddAlbum } from "./AddAlbum";
import { AddGenre } from "./AddGenre";
import { useCookies } from 'react-cookie';
import { Player } from "./player";
import { Loader } from "./Loader";
import { Login } from "./Login";
import { Dashboard } from "./dashboard";
import { Register } from "./Register";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['userId','userName','email','profilepic']);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard cookie={cookies}/>} />
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<Login setCookie={setCookie}/>} />
        <Route path="/addartist" element={<AddArtist />} />
        <Route path="/addalbum" element={<AddAlbum />} />
        <Route path="/addgenre" element={<AddGenre />} />
        <Route path="/player" element={<Player/>} />
        <Route path = "/register" element={<Register setCookie={setCookie} />} />
      </Routes>
    </Router>
  );
}

export default App;
