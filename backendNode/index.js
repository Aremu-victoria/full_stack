const express = require('express');
const userModel = require("./model/user.model")
const app = express();
const userRouter = require('./routes/user.route');
const cors = require('cors');
app.use(cors());
app.use(express.json());



app.use("/", userRouter);
let PORT = 4000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

