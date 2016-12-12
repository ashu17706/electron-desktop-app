const { ipcRenderer } = require('electron');

const medicinAddBtn = document.getElementById('medicinAddBtn');

// get the new medicin details from the form
const form = document.getElementById('medicineForm');
const medicineName = form.name;
const pmsoNo = form.pmsono;
const expiry = form.expiry;

// add new medicine
medicinAddBtn.addEventListener('click', function (event) {
  console.log(form.name.value);
  var newMed = {
    name: medicineName.value,
    pmsono: pmsoNo.value,
    expiry: expiry.value,
  };

  ipcRenderer.send('add-medicine', newMed);
  event.preventDefault();
  event.stopPropagation();
});

// onchange of name
medicineName.addEventListener('keyup', (event) => {
  if (event.target.value) {

    document.getElementById('show').classList.remove('search-result-hide');
    document.getElementById('show').classList.add('search-result-show');

    ipcRenderer.send('medicine-name-change', event.target.value);
  } else {
    document.getElementById('show').classList.add('search-result-hide');
    document.getElementById('show').classList.remove('search-result-show');
  }
});

ipcRenderer.on('add-medicine-reply', (event, args) => {
  console.log(`reply received ${args}`);
});

ipcRenderer.on('add-medicine-error', (event, args) => {
  console.log('Error happened while saving');
});

ipcRenderer.on('medicine-name-change-reply', (event, args) => {
  let resultTemplate = document.getElementById('result-template');
  let clone = document.importNode(resultTemplate.content, true);

  clone.innerText = 'Hello';
  document.getElementById('show').appendChild(clone);
  console.log('reply', args);
});
