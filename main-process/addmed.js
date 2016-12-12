const { ipcMain } = require('electron');
const ADDMEDCRUD = require('./addmed_crud');
const addMed = new ADDMEDCRUD();

ipcMain.on('add-medicine', (event, args) => {
  console.log('testing', args);
  addMed.create(args)
  .then((newDoc) => {
    event.sender.send('add-medicine-reply', JSON.stringify(newDoc));
  });
});

// onchange of medicine name
ipcMain.on('medicine-name-change', (event, args) => {
  addMed.search(args)
  .then((results) => {
    event.sender.send('medicine-name-change-reply', results);
  });
});
