console.log("hello world");
console.log(getElement('[data-operation]'));
console.log(getElement('[data-equals]',false));

function getElement(element, all = true) {
  return all
    ? document.querySelectorAll(element)
    : document.querySelector(element);
}
