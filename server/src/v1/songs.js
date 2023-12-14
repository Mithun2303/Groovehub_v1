const router = require("express").Router()
const db = require("../../psql")


router.get("/songs",async(req,res)=>{
    try {
        const result = await db.query("select * from songdimension");
        // res.end();
        res.json("HELLO WORLD")

    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router