const router = require("express").Router();
const Songs = require("../../crud/songs");
const { response } = require("express");

const songs = new Songs();

router.get("/songs",async (req,res)=>{
    const response = await songs.displaySongs();
    console.log(response.rows);
    res.status(200).jsonp(response.rows);
})

router.get('/albums',async (req,res)=>{
    const response = await songs.displayAlbums();
    console.log(response.rows);
    res.status(200).jsonp(response.rows);
})

router.get('/artists',async (req,res)=>{
    const response = await songs.displayArtists();
    console.log(response.rows);
    res.status(200).jsonp(response.rows);
})

module.exports = router