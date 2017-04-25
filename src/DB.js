import {
  MongoClient,
} from 'mongodb';

export default class DB {
  constructor(url) {
    this.dbUrl = url;
  }

  addSearchTerm(searchTerm) {
    MongoClient.connect(this.dbUrl, (err, db) => {
      if (err) {
        throw err;
      }

      db.collection('searchTerms').insert(searchTerm, (err, result) => {
        if (err) {
          throw err;
        }
      });
    });
  }
}
