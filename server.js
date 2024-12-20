const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const Joi = require('joi');

const app = express();
const port = 3000;

// Configuración de PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'a123',
  port: 5432,
});

// Middleware para analizar JSON
app.use(bodyParser.json());

// Esquema de validación con Joi
const schema = Joi.object({
  nombre: Joi.string().min(3).max(255).required(),
  precio: Joi.number().positive().required(),
  categoria: Joi.string().min(3).max(100).required(),
});

app.post('/test', async (req, res) => {
    console.log(req.body); // Mostrar el contenido recibido en la consola
    res.json({ message: 'Solicitud POST recibida correctamente', data: req.body });
  });

// Endpoint para registrar datos
app.post('/productos', async (req, res) => {
    
  try {
    // Validar los datos del cuerpo de la solicitud
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Extraer datos validados
    const { nombre, precio, categoria } = value;

    // Insertar en la base de datos
    const query = `
      INSERT INTO productos (nombre, precio, categoria)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [nombre, precio, categoria];
    const result = await pool.query(query, values);

    // Responder con el registro creado
    res.status(201).json({ message: 'Producto registrado', data: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar producto:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});