import sql from 'mssql'
import config from '../../dbconfig.js'
import 'dotenv/config'

const preguntaTabla=process.env.DB_TABLA_PREGUNTA;

export class PreguntaService {
    
    getAllPreguntas = async () => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * FROM ${preguntaTabla}`)

        console.log(response)
        return response.recordset;
    }

    getPreguntaRandom = async () => {
        console.log('This is a function on the service');
        
        const pool = await sql.connect(config);  
        const response = await pool.request()
            .query(`SELECT TOP 1 * FROM ${preguntaTabla} ORDER BY NewId()`);
        return response.recordset;
    }

    createPregunta = async (pregunta) => {
        console.log('This is a function on the service');
        
        let FechaCreacion = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(FechaCreacion)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Pregunta',sql.VarChar, pregunta?.Pregunta ?? '')
            .input('Respuesta01',sql.VarChar, pregunta?.Respuesta01 ?? '')
            .input('Respuesta02',sql.VarChar, pregunta?.Respuesta02 ?? '')
            .input('Respuesta03',sql.VarChar, pregunta?.Respuesta03 ?? '')
            .input('Respuesta04',sql.VarChar, pregunta?.Respuesta04 ?? '')
            .input('RespuestaCorrecta',sql.Int, pregunta?.RespuestaCorrecta ?? 0)
            .input('PalabraClave',sql.VarChar, pregunta?.PalabraClave ?? '')
            .input('Peso',sql.Int, pregunta?.Peso ?? 0)
            .query(`INSERT INTO ${preguntaTabla}(Pregunta, Respuesta01, Respuesta02, Respuesta03, Respuesta04, RespuestaCorrecta, PalabraClave, Peso, FechaCreacion) VALUES (@Pregunta, @Respuesta01, @Respuesta02, @Respuesta03, @Respuesta04, @RespuestaCorrecta, @PalabraClave, @Peso, '${FechaCreacion}')`);
        console.log(response)

        return response.recordset;
    }

    updatePreguntaById = async (id, pregunta) => {
        console.log('This is a function on the service');

        let FechaCreacion = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id',sql.Int, id)
        .input('Pregunta',sql.VarChar, pregunta?.Pregunta ?? '')
        .input('Respuesta01',sql.VarChar, pregunta?.Respuesta01 ?? '')
        .input('Respuesta02',sql.VarChar, pregunta?.Respuesta02 ?? '')
        .input('Respuesta03',sql.VarChar, pregunta?.Respuesta03 ?? '')
        .input('Respuesta04',sql.VarChar, pregunta?.Respuesta04 ?? '')
        .input('RespuestaCorrecta',sql.Int, pregunta?.RespuestaCorrecta ?? 0)
        .input('PalabraClave',sql.VarChar, pregunta?.PalabraClave ?? '')
        .input('Peso',sql.Int, pregunta?.Peso ?? 0)
        .query(`UPDATE ${preguntaTabla} SET Pregunta = @Pregunta, Respuesta01 = @Respuesta01, Respuesta02 = @Respuesta02, Respuesta03 = @Respuesta03, Respuesta04 = @Respuesta04, RespuestaCorrecta = @RespuestaCorrecta, PalabraClave = @PalabraClave, Peso = @Peso, FechaCreacion = '${FechaCreacion}' WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    deletePreguntaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${preguntaTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}