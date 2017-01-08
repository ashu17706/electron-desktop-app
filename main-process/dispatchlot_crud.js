'use strict';

const Q = require('q');
const Datastore = require('nedb');

let db = null;

const DispatchLot = class DispatchLot {
  constructor() {
    db = new Datastore({
      filename: '/Users/ashuthezero8/work/medical-electron-app/dispatchlot.db',
      autoload: true,
      timestampData: true,
    });
  }

  // create dispatch lot
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
  }

  // read
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
  }

  update(id, update) {
    let deferred = Q.defer();

    db.update({ _id: id }, update, { returnUpdatedDocs: true }, (err, numUpdated, updatedDoc) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(updatedDoc);
      }
    });

    return deferred.promise;
  }

}

module.exports = DispatchLot;

if (require.main == module) {
  console.log('test');

  const dispatchLot = new DispatchLot();

  let lot = {
    lotno : 2,
    medicines: [
      { id: 1, name: 'Paracetamol 1', qty: 999 },
      { id: 2, name: 'Paracetamol 2', qty: 1 },
      { id: 3, name: 'Paracetamol 3', qty: 50 }
    ]
  };

  dispatchLot.create(lot)
  .then((res) => {
    // console.log('created', res);
    res.lotno = 2;

    dispatchLot.update(res._id, { $set: { lotno: 4 } })
    .then((res) => {
      dispatchLot.read(res._id)
      .then((res) => {
        console.log('read', res);
      })
    })
    .then((res) => {

    });
  });
}
