import express from 'express';
import ImageSearchApi from './ImageSearchApi';
import DB from './DB';

const app = express();
const searchApi = new ImageSearchApi(process.env.BING_API_KEY || '');
const db = new DB(process.env.MONGODB_URL || 'mongodb://localhost:27017/imagesearch');

console.log(process.env.MONGODB_URL);
console.log(process.env.BING_API_KEY);

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

  db.addSearchTerm(searchTerm).catch(err => console.log(err));

  searchApi.search(searchTerm, { offset, count: 10 })
    .then((response) => {
      const results = response.value.map(bingResponseToApiResponse);
      res.json(results);
    })
    .catch(err => res.end(err.message));
});

app.get('/api/latest/imagesearch', (req, res) => {
  db.getLatestSearchTerms()
    .then(result => res.json(result))
    .catch(err => res.end(err));
});

const port = process.env.PORT || 8080;

app.listen(port);
