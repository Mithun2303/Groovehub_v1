const router = require("express").Router()
const db = require("../../psql")
const PopulateDB = require('../../crud/populate_db')
const { response } = require("express")

let populateDB = new PopulateDB();

router.post("/addartist",async(req,res)=>{
    try {
        console.log(req);
        const response = await populateDB.addArtist(req.body)
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
    }
})

router.post("/addalbum",async(req,res)=>{
    try {
        const response = await populateDB.addAlbum(req.body)
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
    }
})

router.post("/addsong",async(req,res)=>{
    try {
        const response = await populateDB.addSong(req.body)
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
    }
})

router.post("/addgenre",async(req,res)=>{
    try {
        console.log(req.body)
        const response = await populateDB.addGenre(req.body);
        // console.log(response);
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
    }
})


module.exports = router