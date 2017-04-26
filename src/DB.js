import {
  MongoClient,
} from 'mongodb';

export default class DB {
  constructor(url) {
    this.dbUrl = url;
  }

  addSearchTerm(searchTerm) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.dbUrl, (err, db) => {
        if (err) {
          return reject(err);
        }

        db.collection('searchTerms').insert({ searchTerm }, (err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        });
      });
    });
  }

  getLatestSearchTerms() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.dbUrl, (err, db) => {
        if (err) {
          return reject(err);
        }

        db.collection('searchTerms')
          .find()
          .sort({ _id: -1 })
          .limit(10)
          .toArray((err, result) => {
            if (err) {
              return reject(err);
            }

            return resolve(result);
          });
      });
    });
  }
}
