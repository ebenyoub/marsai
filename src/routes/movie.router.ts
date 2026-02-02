const express = require('express');
const router = express.Router();

import { getAllMovies } from '../controllers/movie.controller';

router.get('/', getAllMovies);

export default router;
