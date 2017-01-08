document.body.addEventListener('click', function (event) {
  if (event.target.dataset.section) {
    hideAllSectionsAndDeselectButtons();

    event.target.classList.add('btn-primary');

    handleSectionTrigger(event);
  }
});

function handleSectionTrigger(event) {
  const sectionId = event.target.dataset.section + '-section';
  document.getElementById(sectionId).classList.add('is-shown');
}

function hideAllSectionsAndDeselectButtons() {
  const sections = document.querySelectorAll('.js-section.is-shown');
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('is-shown');
  });

  const buttons = document.querySelectorAll('.btn.nav-btn');
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('btn-primary');
  });
}
