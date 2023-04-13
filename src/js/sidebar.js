const bsOffcanvases = document.querySelectorAll('.offcanvas');
bsOffcanvases.forEach(sidebar => {
    sidebar.addEventListener('show.bs.offcanvas', () => {
        document.querySelector('main').classList.add('z-n1');
        document.querySelector('footer').classList.add('z-n1');
    });
    sidebar.addEventListener('hidden.bs.offcanvas', () => {
        document.querySelector('main').classList.remove('z-n1');
        document.querySelector('footer').classList.remove('z-n1');
    });
});