const db = require("../psql");
const uid = require("uid/secure").uid;
const bcrypt = require("bcrypt");
const salt_round = 10;
class Login_User {
  async login_user(req) {
    console.log(req);
    const result = await db.query(
      `select userid,username,email,profilepic from userdimension where username = '${req.username}'`
    );
    const hash = await db.query(
      `select password from userdimension where username = '${req.username}'`
    );
    // return hash
    // return result;
    if (result.rowCount === 0) {
      return "User not found.";
    } else {
      return bcrypt.compare(req.password, hash.rows[0].password).then((res) => {
        return res === true ? result : "Incorrect password.";
      });
      //   return result;
      //   await `insert into userdimension()`;
    }
  }

  async check_username(req) {
    const username = await db.query(
      `select userid from userdimension where username = '${req.username}'`
    );
    const email = await db.query(
      `select userid from userdimension where email= '${req.email}'`
    );
    if (username.rowCount != 0) {
      return {
        details: "username taken",
      };
    } else if (email.rowCount != 0) {
      return {
        details: "email taken",
      };
    } else {
      return {
        details: "good to go",
      };
    }
  }
  register_user(req) {
    let resp;
    return bcrypt.hash(req.password, salt_round).then(async (hash) => {
      console.log(hash);
      resp = await register(hash);
      return resp;
    });
    async function register(hash) {
      console.log(hash);
      const user_exist = await db.query(`select * from userdimension where username = '${req.username}'`);
      if(user_exist.rowCount!=0){
        return {details:"User exists"}
      }
      const result = await db.query(
        `insert into userdimension(userid,username,email,password,profilepic) values($1,$2,$3,$4,$5) RETURNING *`,
        [uid(16), req.username, req.email, hash, req.profilepic]
      );
      // resp = result;
      return result;
    }
  }
}

module.exports = Login_User;
