import Navigo from "navigo";

const router = new Navigo('/', {
    strategy: "ONE",
    hash: true,
});

const getAllPages = document.querySelectorAll(".page");
const findCurrentPage = (pageName) => Array.from(getAllPages).find(page => page.id === `page-${pageName}`);
const routerContent = document.querySelector("#page-content");


document.addEventListener('DOMContentLoaded', e => {
    return router.navigate(router.getCurrentLocation().hashString);
});


router.on('/', (e) => {
    return routerContent.innerHTML = document.querySelector('#index').innerHTML;
}, {
    after(match) {
        const currentPageText = document.querySelector("#page-current");
        const navigateLinks = document.querySelector('#navigate-links');
        const currentPage = findCurrentPage(match.route.name);

        Array.from(navigateLinks.children).forEach(link => link.classList.remove('active'));
        navigateLinks.querySelector(`[data-page='/${match.route.name}']`).classList.add('active');

        return currentPageText.textContent = 'Главная';
    }
});

// хуки на все роуты
router.hooks({
    before(done, match) {
        console.log(done, match);

        const currentPage = findCurrentPage(match.route.name);

        if(!!currentPage) {
            // const links = currentPage.querySelectorAll('.page-link');
            // const findCurrentLink = Array.from(links).find(link => link.href.split(location.origin)[1] ===`/${match.route.name}`);

            // links.forEach(link => link.classList.remove('active'));
            // findCurrentLink.classList.add('active');
            

            match.data = currentPage.innerHTML;
            return done();
        };
        return router.navigate('/err');
    },
    after(match) {
        const currentPageText = document.querySelector("#page-current");
        const navigateLinks = document.querySelector('#navigate-links');
        const currentPage = findCurrentPage(match.route.name);

        Array.from(navigateLinks.children).forEach(link => link.classList.remove('active'));
        navigateLinks.querySelector(`[data-page='/${match.route.name}']`).classList.add('active');

        return currentPageText.textContent = currentPage.dataset.name;
    },
});

// Авторегистрация маршрутов
getAllPages.forEach(page => {


    if(page.id.indexOf('page') >= 0) {
        return router.on(`/${page.id.split("page-")[1]}`, (e) => {
            return routerContent.innerHTML = e.data;
        });
    }

    console.log(page, page.id.indexOf('page') >= 0);
    if(page.id === 'index') return;
    console.error(`
        Страница: ${page},
        Не имеет ид, страница не определена, добавте ид
    `);
});