const express = require('express');
const fetch = require('node-fetch');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(`https://tera-api.sonzaixlab.workers.dev/api?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to fetch data from Terabox API' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/.netlify/functions/terabox-downloader', router);

module.exports = app;
module.exports.handler = serverless(app);
