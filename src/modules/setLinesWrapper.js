export function setLinesWrapper(lines, callback) {
  // Wrap each line in a .line-wrapper span
  lines.forEach(line => {
    const wrapper = document.createElement('span');
    wrapper.classList.add('line-wrapper');
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  if (typeof callback === 'function') {
    callback();
  }
}