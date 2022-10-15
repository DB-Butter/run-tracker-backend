const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || "mongodb+srv://db:db@tracker.l3ovcx3.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB db connection success")
})

const excercisesRouter = require('./routes/excercises');
const usersRouter = require('./routes/users');

app.use('/excercises', excercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});