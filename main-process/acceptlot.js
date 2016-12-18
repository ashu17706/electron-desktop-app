const { ipcMain } = require('electron');
const Q = require('q');

const ADDMEDCRUD = require('./addmed_crud');
const addMed = new ADDMEDCRUD();

const AcceptLot = require('./acceptlot_crud');
const acceptLot = new AcceptLot();

// onadd of accept lot.
ipcMain.on('add-new-lot', (event, args) => {
  let promises = [];
  acceptLot.create(args)
    .then((newDoc) => {
      newDoc.medicines.forEach((medicine) => {
        promises.push(addMed.update({ _id: medicine._id, $push: { /**TODO: **/} }));
      });
      return Q.all(promises);
    })
    .then(() => {
      event.sender.send('add-new-lot-res', 'Lot have been created successfully.');
    });
});

// delete particular lot detail
ipcMain.on('delete-lot', (event, args) => {
  acceptLot.delete(args)
  .then(() => {
    event.sender.send('delete-lot-res', 'Lot has been deleted successfully.');
  })
});

// get all the lot details

ipcMain.on('get-all-lot', (event, args) => {
  acceptLot.
});
