const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./psql");
const populate_db = require("./src/v1/populate_db");
const user = require("./src/v1/user");
const songs = require("./src/v1/songs");

app.use(cors());

app.use(express.json());

app.use("/api",populate_db);
app.use("/api",user);
app.use("/api",songs);

app.listen(8000,()=>{
    console.log("listening on port 8000")
})