function dragMoveListener (event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

interact('#dropzone-romaine').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.5,
  ondrop: function (event) {
    if (event.relatedTarget.id === "colonne-romaine") {
      event.relatedTarget.classList.remove('drag-drop');
      event.relatedTarget.style.zIndex = "-1";
      event.target.classList.add('dropzone-active');
      gameLauncher();
    }
    else {
      event.target.classList.add('dropzone-wrong');
    }
  },
  ondragleave: function (event) {
    event.target.classList.remove('dropzone-wrong');
  }
});

interact('#dropzone-grecque').dropzone({
  // only accept elements matching this CSS selector
  accept: '#colonne-grecque',
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.5,
  ondrop: function (event) {
    event.relatedTarget.classList.remove('drag-drop');
    event.relatedTarget.style.zIndex="-1";
    event.target.classList.add('dropzone-active');
    gameLauncher();
  }
});

interact('#dropzone-medievale').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.5,
  ondrop: function (event) {
    if (event.relatedTarget.id === "colonne-medievale") {
      event.relatedTarget.classList.remove('drag-drop');
      event.relatedTarget.style.zIndex = "-1";
      event.target.classList.add('dropzone-active');
      gameLauncher();
    }
    else {
      event.target.classList.add('dropzone-wrong');
    }
  },
  ondragleave: function (event) {
    event.target.classList.remove('dropzone-wrong');
  }
});

interact('#dropzone-renaissance').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.5,
  ondrop: function (event) {
    if (event.relatedTarget.id === "colonne-renaissance") {
      event.relatedTarget.classList.remove('drag-drop');
      event.relatedTarget.style.zIndex = "-1";
      event.target.classList.add('dropzone-active');
      gameLauncher();
    }
    else {
      event.target.classList.add('dropzone-wrong');
    }
  },
  ondragleave: function (event) {
    event.target.classList.remove('dropzone-wrong');
  }
});

interact('.drag-drop')
  .draggable({
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    onmove: dragMoveListener
  });

