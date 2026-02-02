import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import movieRouter from './routes/movie.router';
import { testDbConnection } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/movies', movieRouter)

const startServer = async () => {
  try {
    await testDbConnection(); 
    
    app.listen(port, () => {
      console.log(`🚀 Serveur prêt sur http://localhost:${port}`);
    }).on('error', (err: Error) => {
        console.error("❌ Impossible de lancer le serveur Express:", err.message);
        process.exit(1);
    });

  } catch (error) {
    console.error("💥 Erreur fatale lors du démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();

app.get('/', (req: Request, res: Response) => {
  res.send('Serveur MarsAI en mode ESM (EcmaScript Modules) !');
});
