const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Ruta para manejar la solicitud de eventos
app.post('/crearEvento', async (req, res) => {
  try {
    // Tu objeto de evento
    const event = {
      // ... (tu objeto de evento)
    };

    // Generar texto con la API de OpenAI
    const openAIResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Crear evento en Google Calendar: ${JSON.stringify(event)}`,
      // ... (otras opciones y autenticación de OpenAI)
    });

    const generatedText = openAIResponse.data.choices[0].text;

    // Crear evento en Google Calendar con el texto generado
    const googleCalendarResponse = await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      // ... (datos del evento según la API de Google Calendar)
      summary: generatedText,
      // ... (otros campos)
    });

    res.json({ success: true, event: googleCalendarResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
