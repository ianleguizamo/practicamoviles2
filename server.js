// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Configuración de Supabase
const SUPABASE_URL = 'https://fzmdagmfergnxzhdkjnx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bWRhZ21mZXJnbnh6aGRram54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAyNjAsImV4cCI6MjA1ODUxNjI2MH0.2zPxZSethNAerHr4AUXho3yiKsJFNWS_tamAcD4bxVI';

// Middleware para permitir solicitudes CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir solicitudes de cualquier origen
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Ruta para obtener todos los usuarios
app.get('/get-users', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const users = await response.json();
    res.json(users); // Enviar los datos como JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
