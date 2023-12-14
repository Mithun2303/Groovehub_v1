const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./psql");
const song = require("./src/v1/populate_db");

app.use(cors());

app.use(express.json());

app.use("/api",song);

app.listen(8000,()=>{
    console.log("listening on port 8000")
})