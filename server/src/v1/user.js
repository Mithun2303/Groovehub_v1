const router = require("express").Router();
const db = require("../../psql");
const User = require("../../crud/user");
const { response } = require("express");

let user = new User();

router.post("/checkusername", async (req, res) => {
  try {
    // console.log(req.body);
    // res.json(req.body)
    const response = await user.check_username(req.body);
    if (response.details === "username taken") {
      res.status(400).json("Username taken");
      //User not found
    } 
    else if (response.details == "email taken") {
      res.status(400).jsonp("Email taken");
      // User Found
    }
    else{
      res.status(200).jsonp(response.details);
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const response = await user.register_user(req.body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const response = await user.login_user(req.body);
    if(response === "User not found."){

      res.status(404).jsonp(response);
    }
    else if (response === "Incorrect password."){
      res.status(400).jsonp(response);
    }
    else{
      res.jsonp(response)
    }
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
