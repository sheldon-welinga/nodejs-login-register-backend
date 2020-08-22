module.exports = (req, res, next) => {
  const { firstname, lastname, email, phone, password } = req.body;

  //   if (req.path === "/register") {
  //     if (![firstname, lastname,  email, phone, password].every(Boolean)) {
  //       return res.status(400).json({
  //         error: "Missing credentials",
  //       });
  //     }
  //   }

  if (req.path === "/register") {
    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({
        error: "Missing credentials",
      });
    }
  }

  if (req.path === "/login") {
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
      });
    }
  }
  next();
};
