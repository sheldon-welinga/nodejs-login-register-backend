//IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");

//CONSTANTS
const PORT = process.env.PORT || 8000;

//MIDDLEWARES
app.use(express.json()); //to return files as json
app.use(cors()); //for cross origin  files

//ROUTES
app.use("/auth", require("./routes/userAuth"));

//SERVER PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
