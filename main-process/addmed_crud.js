'use strict';

const Datastore = require('nedb');
let db = null;
const Q = require('q');

const Medicine = class Medicine {
  constructor() {
    db = new Datastore({
      filename: 'C:\\Users\\ashish.a.tripathi\\Documents\\Projects\\electron-desktop-app\\medicine.db',
      autoload: true,
    });
  };

  create(doc) {
    let deferred = Q.defer();

    db.insert(doc, (err, newDoc) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(newDoc);
      }
    });
    return deferred.promise;
  };

  // find details of any medicine by id
  read(id) {
    let deferred = Q.defer();
    db.findOne({ _id: id }, (err, resDoc) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(resDoc);
      }
    });
    return deferred.promise;
  };

  //update medicine details
  update(id, update) {
    let deferred = Q.defer();

    db.update({ _id: id }, update, {}, (err, numUpdated) => {
      console.log('CRUD update', err, numUpdated);
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(numUpdated);
      }
    });

    return deferred.promise;
  };

  // delete any medicine by _id
  delete(id) {
    let deferred = Q.defer();

    db.remove({ _id: id }, {}, (err, deleteCount) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(deleteCount);
      }
    });

    return deferred.promise;
  };

  // perform search on medicine searchField with provided searchTerm
  search(searchField, searchTerm) {
    let deferred = Q.defer();
    let regex = new RegExp(searchTerm);

    let searchObj = {};
    searchObj[searchField] = { $regex: regex };

    console.log(searchObj);
    db.find(searchObj, (err, results) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(results);
      }
    });
    return deferred.promise;
  }

};

module.exports =  Medicine;

if (require.main == module) {
  console.log('this module called');
  let med = new Medicine();

  med.create({ name: 'paracetamol' });
  med.create({ name: 'paracetamol 2' });
  med.create({ name: 'paracetamol 3' });

  med.search('name', 'para')
  .then((res) => {
    console.log(res);
  });
}
