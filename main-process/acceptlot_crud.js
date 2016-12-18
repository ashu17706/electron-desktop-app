'use strict';

const Datastore = require('nedb');
let db = null;
const Q = require('q');

const AcceptLot = class AcceptLot {
  constructor() {
    db = new Datastore({
      filename: '/Users/ashuthezero8/work/medical-electron-app/acceptlot.db',
      autoload: true,
      timestampData: true,
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

  read(id) {
    let deferred = Q.defer();

    db.find({ _id: id }, (err, resDoc) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(resDoc);
      }
    });
    return deferred.promise;
  };

  // TODO: rewrite after checking the doc
  update(id, doc) {
    let deferred = Q.defer();

    db.update({ _id: id }, (err, updatedDoc) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(updatedDoc);
      }
    });
    return deferred.promise;
  };

  delete(id) {
    let deferred = Q.defer();

    db.remove({ _id: id }, (err, deleteCount) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(deleteCount);
      }
    });
    return deferred.promise;
  };

  search(searchField, searchTerm) {
    let regex = new RegExp(searchTerm);

    let searchObj = {};
    // { name: { $regex: /^as/ }}
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
  };
};

module.exports = AcceptLot;

if (require.main == module) {
  const ADDMEDCRUD = require('./addmed_crud');
  const addMed = new ADDMEDCRUD();

  let acceptlot = new AcceptLot();

  let lot = {
    lotnumber: 1,
    lotdate: '12/AUG/2016',
    medicines: [{ name: 'Paracetamol', expiry: '12/AUG/2016' }, { name: 'Paracetamol', expiry: '12/AUG/2016' }]
  };

  var promises = [];

  acceptlot.create(lot)
    .then((res) => {
      res.medicines.forEach((medicine) => {
        promises.push(addMed.update(medicine._id, { $push: { lotwiseQty: { lotNo: 1, qty: 10 } } }));
        // promises.push(addMed.create(medicine));
      });
      return Q.all(promises);
    })
    .spread((op1, op2) => {
      if (op1 === op2) {
        console.log("ALL MEDS HAVE BEEN UPDATED SUCCESSFULLY", op1, op2);
      };
    })
    .catch((err) => {
      console.log(err);
    });

    // check multi create with spread
    // var medicined = [
    //   { name: 'Paracetamol 11', expiry: '12/AUG/2016' },
    //   { name: 'Paracetamol 12', expiry: '12/AUG/2016' },
    // ];

    // var promiseMed = [];
    // function createMultiMeds() {
    //   medicined.forEach((medicine) => {
    //     promiseMed.push(addMed.create(medicine));
    //   });
    //   return Q.all(promiseMed);
    // }
    //
    // createMultiMeds.spread((arg1, arg2) => {
    //   console.log('newly created meds are', arg1 ,arg2);
    // });


}
