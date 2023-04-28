const express = require('express');
const app = express();
const dotenv = require('dotenv')

const cors = require('cors');
app.use(cors());

dotenv.config();
const port = 3000 || process.env.PORT;

// middleware for parsing form value
app.use(express.json({ extended: false }));

// database connection
const connectToDb = require("./config/connectDb");
connectToDb(process.env.MONGO_URI);

// train api
const train = require("./routes/api/Train");
app.use("/api/train", train);

// coach api
const coach = require("./routes/api/Coach");
app.use("/api/coach", coach);

// booking api
const booking = require("./routes/api/Booking");
app.use("/api/booking", booking);

app.get("/",(req,res)=>{
    res.json({Message: "Hello there !"});
})




app.listen(port, () => console.log(`app listening on port ${port}!`))
