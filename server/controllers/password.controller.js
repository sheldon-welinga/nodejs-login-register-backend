const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

//FORGOT PASSWORD CONTROLLER
module.exports.forgot_password = async (req, res) => {
  //1. destructure the email from the req.body
  const { email } = req.body;

  //2. get the user from the database
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  //3. check if doesn't exist and return an error else return the email of the user as response
  if (user.rows.length === 0) {
    return res.status(404).json({
      error: "Sorry! An account with that email address doesn't exist",
    });
  } else {
    return res.status(200).json({
      email: user.rows[0].email,
    });
  }
};

//RESET PASSWORD CONTROLLER
module.exports.reset_password = async (req, res) => {
  try {
    //1. destructure the email and  new password from the req.body
    const { email, password } = req.body;

    //2. get the user from the database
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    //3. check if user doesn't exists and return an error else reset the password
    if (user.rows.length === 0) {
      return res.status(404).json({
        error: "Sorry! An account with that email address doesn't exist",
      });
    } else {
      //encrypt the new password
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        //check if an error occurs during encryption and return it else update the database with the new password
        if (err) {
          return res.status(500).json({
            error:
              "An error occured while reseting your password. Please try again!",
          });
        } else {
          await pool.query("UPDATE users SET password=$2 WHERE email=$1", [
            email,
            hashedPassword,
          ]);

          //generate a token
          const token = jwtGenerator(user.rows[0].user_id);

          res.status(200).json({
            password: "Password updated successfully!",
            token,
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
