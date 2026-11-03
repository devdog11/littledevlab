// Blueprint theme: fill decorative dimension labels with the real rendered size.
// <span class="bp-dim bp-dim--x" data-bp-measure=".about-image-stack img:first-child"><span></span></span>
// --x labels show width, --y labels show height, in CSS pixels. The labels are
// aria-hidden, so this only affects what sighted visitors see.
(function () {
  var dims = document.querySelectorAll('.bp-dim[data-bp-measure]');
  if (!dims.length) return;

  function update() {
    dims.forEach(function (dim) {
      var target = document.querySelector(dim.getAttribute('data-bp-measure'));
      var label = dim.querySelector('span');
      if (!target || !label) return;
      var box = target.getBoundingClientRect();
      var size = dim.classList.contains('bp-dim--y') ? box.height : box.width;
      label.textContent = Math.round(size);
    });
  }

  update();
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(update);
    dims.forEach(function (dim) {
      var target = document.querySelector(dim.getAttribute('data-bp-measure'));
      if (target) observer.observe(target);
    });
  } else {
    window.addEventListener('resize', update);
  }
})();
