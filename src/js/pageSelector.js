const pageLabel = document.querySelector("[for='page-range']");
const pageRange = document.querySelector('input[type=range]#page-range');


// Постановка на нужную точку
pageRange.value = 0;
pageLabel.insertBefore(document.createTextNode("0"), pageLabel.firstChild);


pageRange.addEventListener('input', e => {
    const pageOvers = document.createTextNode(e.target.value);


    pageLabel.replaceChild(pageOvers, pageLabel.firstChild);
});