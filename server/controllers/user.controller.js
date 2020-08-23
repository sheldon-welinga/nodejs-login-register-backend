const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

//USER REGISTRATION CONTROLLER
module.exports.user_register = async (req, res) => {
  try {
    //1. destructure the values from req.body
    let { firstname, lastname, email, phone, password } = req.body;

    //2. Get the user from the users database
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    //3. check if user already exists and return an error else register the user
    if (user.rows.length !== 0) {
      res.status(409).json({
        error: "Sorry! An account with that email address already exists!",
      });
    } else {
      //encrypt the password before writing/saving it in the database
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        //check if an error occurs while encrypting and return an error else  return the hashedPassword and write/save it in the database
        if (err) {
          res.status(500).json({
            error: err.message,
          });
        } else {
          //convert the firstname and lastname to be capitalized i.e  (first letter capital and the rest small letters)
          firstname = firstname[0].toUpperCase() + firstname.slice(1);
          lastname = lastname[0].toUpperCase() + lastname.slice(1);

          const newUser = await pool.query(
            "INSERT INTO users (firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [firstname, lastname, email, phone, hashedPassword]
          );

          //generate a token
          const token = jwtGenerator(newUser.rows[0].user_id);

          res.status(200).json({
            message: `Account created successfully!`,
            token,
          });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

//USER LOGIN CONTROLLER

module.exports.user_login = async (req, res) => {
  try {
    //1. destructure the user details
    const { email, password } = req.body;

    //1. Get the user from the database
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    //2. check if user does not exist and return an error else login the user
    if (user.rows.length === 0) {
      res.status(404).json({
        error: "Sorry! An account with that email doesn't exist!",
      });
    } else {
      //check if the password entered matches the one in the database
      bcrypt.compare(password, user.rows[0].password, (err, validPassword) => {
        if (err) {
          res.status(401).json({
            error: "Sorry! Email or password is incorrect",
          });
        } else if (validPassword) {
          //generate a token
          const token = jwtGenerator(user.rows[0].user_id);

          res.json({
            message: "Login successfully!",
            token,
          });
        } else {
          res.status(401).json({
            error: "Sorry! Email or password is incorrect",
          });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

//USER TOKEN VERIFY

module.exports.user_token_verify = async (req, res) => {
  try {
    //return response if authorization is met else return an error
    res.status(200).json({ authorized: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
