require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const movieRouter = require('./routes/movie.router');

app.use(express.json());

app.use('/movies', movieRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
