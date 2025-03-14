export function setLinesWrapper(lines, callback) {
  // Wrap each line in a .line-wrapper span
  lines.forEach(line => {
    // add a space right after the last word to prevent the line from collapsing
    const innerHTML = line.innerHTML;
    // add space after the last word
    const newInnerHTML = innerHTML.replace(/(\w+)(\s*)$/, "$1 $2");
    line.innerHTML = newInnerHTML;

    const wrapper = document.createElement("span");
    wrapper.classList.add("line-wrapper");
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  if (typeof callback === 'function') {
    callback();
  }
}