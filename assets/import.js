const links = document.querySelectorAll('link[rel="import"]');

Array.prototype.forEach.call(links, function (link) {
  let template = link.import.querySelector('.task-template');
  let clone = document.importNode(template.content, true);

  document.querySelector('.window-content').appendChild(clone);
});
