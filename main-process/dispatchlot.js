const { ipcMain } = require('electron');
const DispatchLotCrud = require('./dispatchlot_crud');
const AddMedCrud = require('./addmed_crud');

const dispatchLot = new DispatchLotCrud();
const addMed = new AddMedCrud();

ipcMain.on('add-dispatch-lot', (event, args) => {
  let promises = [];

  dispatchLot.create(args)
  .then((newDoc) => {
    newDoc.medicines.forEach((medicine) => {
      promises.push(addMed.update( /**TODO**/));
    });
    return Q.all(promises);
  }).then((res) => {
    event.sender.send('add-dispatch-res', 'Dispatch Lot has been created successfully.');
  });
});

ipcMain.on('delete-dispatch-lot', (event, args) => {
  let promises = [];

  // get the dispatchlot details to be deleted
  let docToBeDeleted = {};

  dispatchLot.read({ _id: args.id })
    .then((resDoc) => {
      docToBeDeleted = resDoc;
      console.log(docToBeDeleted);
    })
    .then(() => {
      // dispatchLot.delete(args);
      docToBeDeleted.medicines.forEach((medicine) => {
        //promises.push(addMed.update({ _id: medicine._id }))
      })
    });
});
