import { Router } from 'express';
import { PeliculaService } from '../services/peliculaService.js';

const router = Router();
const peliculaService = new PeliculaService();

router.get('/', async (req, res) => {
    console.log(`This is a get operation`);
    let Titulo=req.query.Titulo
    let Orden=req.query.Orden

    const peliculas = await peliculaService.getAllMovies(Titulo, Orden);
  
    return res.status(200).json(peliculas);
  });

router.get('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const pelicula = await peliculaService.getMovieById(req.params.id);

  return res.status(200).json(pelicula);
});

router.get('/:titulo', async (req, res) => {
  console.log(`Request URL Param: ${req.params.titulo}`);
  console.log(`This is a get operation`);

  const pelicula = await peliculaService.getMovieByTitulo(req.params.titulo);

  return res.status(200).json(pelicula);
});

router.post('', async (req, res) => {
  console.log(`This is a post operation`);
  if(req.body.Calificacion>5 || req.body.Calificacion<1){
    console.log("Calificacion invalida, ingresar entre 1 y 5")
    return res.status(400)
  }else{
    const pelicula = await peliculaService.createMovie(req.body);
    return res.status(201).json(pelicula);
  }

});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const pelicula = await peliculaService.updateMovieById(req.params.id, req.body);

  return res.status(200).json(pelicula);
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const pelicula = await peliculaService.deleteMovieById(req.params.id);

  return res.status(200).json(pelicula);
});

export default router;