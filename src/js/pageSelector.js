// import router from "./navigator";

// let page = localStorage.getItem('page');
// page ?? localStorage.setItem('page', 0);
// page = localStorage.getItem('page');
// let pagePath = router.routes[+page].path;


// const pageLabel = document.querySelector("[for='page-range']");
// const pageRange = document.querySelector('input[type=range]#page-range');
// const maxPageCounter = document.querySelector("#max-page");

// // Постановка на нужную точку

// router.navigate(`/${pagePath}`);
// pageRange.value = +page;
// pageLabel.insertBefore(document.createTextNode(+pageRange.value), pageLabel.firstChild);


// pageRange.max = router.routes.length-1;
// maxPageCounter.textContent = `/ ${router.routes.length-1}`;


// pageRange.addEventListener('input', e => {
//     pagePath = router.routes[+e.target.value];
//     console.log(+e.target.value, `/${pagePath.path}`);
    
//     const pageOvers = document.createTextNode(+e.target.value);

//     e.target.value <= 0 ? localStorage.setItem('page', 0): localStorage.setItem('page', +e.target.value-1);


//     pageLabel.replaceChild(pageOvers, pageLabel.firstChild);
//     // console.log(router.resolve(pagePath.path));
//     // router.navigate(`/${pagePath.path}`);
// });