document.body.addEventListener('click', function (event) {
  if (event.target.dataset.section) {
    event.target.classList.add('is-selected');
    handleSectionTrigger(event);
  }
});

function handleSectionTrigger(event) {
  hideAllSectionsAndDeselectButtons();

  event.target.classList.add('is-selected');

  const sectionId = event.target.dataset.section + '-section';
  document.getElementById(sectionId).classList.add('is-shown');
}

function hideAllSectionsAndDeselectButtons() {
  const sections = document.querySelectorAll('.js-section.is-shown');
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('is-shown');
  });

  const buttons = document.querySelectorAll('.nav-button.is-selected');
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('is-selected');
  });
}
