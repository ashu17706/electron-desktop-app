const { ipcMain } = require('electron');
const Q = require('q');

const AddMedCrud = require('./addmed_crud');
const AcceptLot = require('./acceptlot_crud');

const addMed = new AddMedCrud();
const acceptLot = new AcceptLot();

// onadd of accept lot.
ipcMain.on('add-new-lot', (event, args) => {
  let promises = [];
  acceptLot.create(args)
    // .then((newDoc) => {
    //   newDoc.medicines.forEach((medicine) => {
    //     promises.push(addMed.update({ _id: medicine._id }));
    //   });
    //   return Q.all(promises);
    // })
    .then((newDoc) => {
      console.log('newDoc is', newDoc);
      event.sender.send('add-new-lot-res', newDoc);
    });
});

// delete particular lot
ipcMain.on('delete-lot', (event, args) => {
  acceptLot.delete(args)
  .then(() => {
    event.sender.send('delete-lot-res', 'Lot has been deleted successfully.');
  })
});

// get all the lot details
ipcMain.on('get-all-lot', (event, args) => {
  acceptLot.search()
  .then((results) => {
    event.sender.send('get-all-lot-res', results);
  });
});

// get lot details with lot id
ipcMain.on('get-lot-detail', (event, args) => {
  acceptLot.read(args)
  .then((result) => {
    event.sender.send('get-lot-detail-res', result);
  });
});
