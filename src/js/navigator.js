import Navigo from "navigo";

const router = new Navigo('/', {
    strategy: "ONE",
    hash: true,
});

const getAllPages = document.querySelectorAll(".page");
console.log(getAllPages);
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
            // const links = currentPage.querySelector('#navigate-links');

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
        const listNavigateLinks = document.querySelector('#page-content').querySelectorAll("[data-link]");
        const navigateLinks = document.querySelector('#navigate-links');
        const currentPage = findCurrentPage(match.route.name);
        const currentPageList = document.querySelector('#page-content').querySelector("#current-page");
        const currentPageCollapse = document.querySelector('#page-content').querySelector("#list-pages");
        const currentPageHtml = navigateLinks.querySelector(`[data-page='/${match.route.name}']`);

        Array.from(navigateLinks.children).forEach(link => link.classList.remove('active'));
        Array.from(listNavigateLinks).forEach(link => link.classList.remove('active'));
        Array.from(listNavigateLinks).find(link => link.dataset.link === `/${match.route.name}`).classList.add('active');
        
        currentPageList.textContent = "test";
        currentPageList.textContent = document.querySelector('#page-content').querySelector("#page-title").textContent;

        navigateLinks.querySelector(`[data-page='/${match.route.name}']`).classList.add('active');
        currentPageText.classList.add('animate__slideInRight');
        currentPageText.addEventListener('animationstart', e => currentPageText.textContent = currentPage.dataset.name);
        currentPageText.addEventListener('animationend', e => currentPageText.classList.remove('animate__slideInRight'));
        
        currentPageCollapse.classList.remove("show");
        return;
    },
});

// Авторегистрация маршрутов
getAllPages.forEach(page => {
    if(page.id.indexOf('page') >= 0) {
        return router.on(`/${page.id.split("page-")[1]}`, (e) => {
            let { data } = e;   
            routerContent.innerHTML = data

            routerContent.classList.add("animate__backInRight");
            routerContent.addEventListener('animationend', () => routerContent.classList.remove("animate__backInRight"));
        });
    };
    
    if(page.id === 'index') return;

    console.error(`
        Страница: ${page},
        Не имеет ид, страница не определена, добавте ид
    `);
});

export default router;