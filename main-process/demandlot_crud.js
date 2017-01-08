'use strict';

const Q = require('q');
const Datastore = require('nedb');

let db = null;

const DemandLot = class DemandLot {
  constructor() {
    db = new Datastore({
      filename: '/Users/ashuthezero8/work/medical-electron-app/demandlot.db',
      autoload: true,
      timestampData: true,
    });
  }

  create(doc) {
    let deferred = Q.defer();

    db.insert(doc, (err, newDoc) => {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(newDoc);
      }
    });

    return deferred.promise;
  }

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

  update(id, doc) {
    let deferred = Q.defer();

    db.update({ _id: id }, update, {}, (err, numUpdated) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(numUpdated);
      }
    });

    return deferred.promise;
  }

}

module.exports = DemandLot;

if(require.main === module) {
  console.log('testing');

  var demandLot = new DemandLot();

  let lot = {
    lotnumber: 1,
    lotdate: '12/AUG/2016',
    medicines: [{ name: 'Paracetamol', expiry: '12/AUG/2016' }, { name: 'Paracetamol', expiry: '12/AUG/2016' }]
  };

  demandLot.create(lot)
  .then((res) => {
    console.log('Demand lot created Successfully', res);
    demandLot.read(res._id)
    .then((res) => {
      console.log('finding ', res);
    });
  });
}
