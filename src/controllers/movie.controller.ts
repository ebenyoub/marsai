import { Request, Response } from 'express';
import Movie from '../models/movie.model';
import { MovieType } from '../types/movie.type';

const getAllMovies = async (req: Request, res: Response) => {
  
  try {
    const results =  await Movie.findAll() as MovieType[];
    
    if (results.length === 0) {
        res.status(200).json({
          success: true,
          message: "Aucune video n'a ete trouve."
        });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  }  catch {
    res.status(500).json({
      success: false,
      message: "Erreur interne survenue sur le serveur."
    })
  }
}

// const getMovieById = (req: Request, res: Response) => {
//   const { id } = req.params;
//   console.log('In controller');

//   Movie.getById(id, (error: Error | null, result: QueryResult[]) => {
//     if (error) {
//       console.error('❌ Erreur lors de la requête SQL:', error.message);
//       return res.status(500).send('Erreur serveur');
//     }
//     if (result.length === 0) {
//       return res.status(404).send('Movie non trouvé');
//     }
//     res.json(result[0]);
//   });
// };

// const createMovie = (req: Request, res: Response) => {
//   const movie = {
//     title: req.body.title,
//     yt_url: req.body.yt_url,
//     thumbnail: req.body.thumbnail,
//     subtitles: req.body.subtitles,
//     stack: req.body.stack,
//     ia_type: req.body.ia_type,
//     status: req.body.status,
//     director_id: req.body.director_id,
//   };

//   Movie.create(movie, (error: Error | null, result) => {
//     if (error) {
//       console.error('❌ SQL Error:', error.message);
//       return res.status(500).send('Erreur serveur');
//     }

//     res.status(201).json({
//       id: result.insertId,
//       ...movie,
//     });
//   });
// };

// const updateMovie = (req: Request, res: Response) => {
//   const { id } = req.params;

//   const movie = {
//     title: req.body.title,
//     yt_url: req.body.yt_url,
//     thumbnail: req.body.thumbnail,
//     subtitles: req.body.subtitles,
//     stack: req.body.stack,
//     ia_type: req.body.ia_type,
//     status: req.body.status,
//     director_id: req.body.director_id,
//   };

//   Movie.edit(id, movie, (error: Error | null, result: ResultSetHeader) => {
//     if (error) {
//       console.error('❌ Erreur SQL:', error.message);
//       return res.status(500).send('Erreur serveur');
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).send('Movie non trouvé');
//     }

//     res.status(200).json({ id: Number(id), ...movie });
//   });
// };

// const deleteMovie = (req: Request, res: Response) => {
//   const { id } = req.params;

//   Movie.deleteMovie(id, (error: Error | null, result: ResultSetHeader) => {
//     if (error) {
//       console.error('❌ Erreur SQL:', error.message);
//       return res.status(500).send('Erreur serveur');
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).send('Movie non trouvé');
//     }

//     res.status(204).send();
//   });
// };

// export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
export { getAllMovies,  }