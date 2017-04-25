import express from 'express';

const app = express();

app.get('/api/imagesearch/:searchTerm', (req, res) => {
  //
});

app.get('/api/latest/imagesearch', (req, res) => {
  //
});

const port = process.env.PORT || 8080;

app.listen(port);
