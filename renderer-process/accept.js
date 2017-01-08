const { ipcRenderer } = require('electron');

const $ = (identifier) => {
  if(identifier.startsWith('#')) {
       return document.getElementById(identifier.substr(1));
  }
}

const acceptAddBtn = $('#acceptAddBtn');

// get the new medicin details from the form
const form = $('#acceptForm');

acceptAddBtn.addEventListener('click', function(event) {

  var newMed = {
    pnsono: form.pmsono.value,
    expiry: form.expiry.value,
    quantity: form.quantity.value,
    medicinename: form.medicineName.value
  };

  // send the lot object to main process
  ipcRenderer.send('add-new-lot', newMed);

  // prevent further navigation
  event.preventDefault();
  event.stopPropagation();
});

ipcRenderer.on('add-new-lot-res', function(event, args) {
  alert('got the response');
});
