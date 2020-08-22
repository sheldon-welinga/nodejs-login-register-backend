const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.secret, { expiresIn: "1hr" });
};
