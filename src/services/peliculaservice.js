import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import { request } from 'express';

const peliculaTabla=process.env.DB_TABLA_PELICULA;

export class PeliculaService {
    
    getAllMovies = async () => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * FROM ${peliculaTabla}`)

        console.log(response)
        return response.recordset;
    }

    getMovieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
                .input('id',sql.Int, id)
                .query(`SELECT * FROM ${peliculaTabla} WHERE idPelicula=@id`);
        return response.recordset[0];
    }

    getMovieByTitulo = async (titulo) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
                .input('id',sql.VarChar, titulo)
                .query(`SELECT * FROM ${peliculaTabla} WHERE TituloPelicula=@titulo`);
        return response.recordset[0];
    }

    createMovie = async (pelicula) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('ImagenPelicula',sql.VarChar, pelicula?.ImagenPelicula ?? '')
            .input('Titulo',sql.VarChar, pelicula?.Titulo ?? '')
            .input('FechaCreacion',sql.VarChar, pelicula?.FechaCreacion ?? 0)
            .input('Calificacion',sql.Int, pelicula?.Calificacion ?? 0)
            .query(`INSERT INTO ${peliculaTabla}(ImagenPelicula, Titulo, FechaCreacion, Calificacion) VALUES (@ImagenPelicula, @Titulo, @FechaCreacion, @Calificacion)`);
        console.log(response)

        return response.recordset;
    }

    updateMovieById = async (id, pelicula) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('ImagenPelicula',sql.VarChar, pelicula?.ImagenPelicula ?? '')
            .input('Titulo',sql.VarChar, pelicula?.Titulo ?? '')
            .input('FechaCreacion',sql.VarChar, pelicula?.FechaCreacion ?? 0)
            .input('Calificacion',sql.Int, pelicula?.Calificacion ?? 0)
            .query(`UPDATE ${peliculaTabla} SET ImagenPelicula = @ImagenPelicula, Titulo = @Titulo, FechaCreacion = @FechaCreacion, Calificacion = @Calificacion WHERE idPelicula = @id`);
        console.log(response)

        return response.recordset;
    }

    deleteMovieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${peliculaTabla} WHERE idPelicula = @id`);
        console.log(response)

        return response.recordset;
    }
}