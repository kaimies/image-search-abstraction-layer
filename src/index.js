import express from 'express';
import ImageSearchApi from './ImageSearchApi';
import DB from './DB';

const app = express();
const searchApi = new ImageSearchApi(process.env.BING_API_KEY);
const db = new DB(process.env.MONGODB_URL || 'mongodb://localhost:27017/imagesearch');

const bingResponseToApiResponse = (value) => {
  return {
    alt: value.name,
    imageUrl: value.contentUrl,
    pageUrl: value.hostPageUrl,
  };
};

app.get('/api/imagesearch/:searchTerm', (req, res) => {
  const offset = req.query.offset || 0;
  const searchTerm = req.params.searchTerm;

  db.addSearchTerm(searchTerm);

  searchApi.search(searchTern, { offset })
    .then((response) => {
      const results = response.values.map(bingResponseToApiResponse);
      res.json(results);
    })
    .catch(err => res.end(err));
});

app.get('/api/latest/imagesearch', (req, res) => {
  //
});

const port = process.env.PORT || 8080;

app.listen(port);
