import { Router } from 'express';
import { PreguntaService } from '../services/preguntaService.js';

const router = Router();
const preguntaService = new PreguntaService();

router.get('', async (req, res) => {
    console.log(`This is a get operation`);

    const preguntas = await preguntaService.getAllPreguntas();
  
    return res.status(200).json(preguntas);
  });

router.get('/azar', async (req, res) => {
  console.log(`This is a get operation`);

  const pregunta = await preguntaService.getPreguntaRandom();

  return res.status(200).json(pregunta);
});

router.post('', async (req, res) => {
    console.log(`This is a post operation`);

    const pregunta = await preguntaService.createPregunta(req.body);
    return res.status(201).json(pregunta);
});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const pregunta = await preguntaService.updatePreguntaById(req.params.id, req.body);

  return res.status(200).json(pregunta);
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const pregunta = await preguntaService.deletePreguntaById(req.params.id);

  return res.status(200).json(pregunta);
});

export default router;