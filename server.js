const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{console.log("Connected to MongoDB");
  app.listen(PORT,()=>console.log(`server is running on port ${PORT}`);
})
.catch((error)=>{
  console.log(`Error connecting to MongoDB`,error)
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
