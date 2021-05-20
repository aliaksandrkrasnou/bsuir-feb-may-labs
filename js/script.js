const iconMenu = document.querySelector('.fa-bars');
if (iconMenu) {
    const menuNavigation = document.querySelector('.navigation');
    iconMenu.addEventListener('click', () => {
        document.body.classList.toggle('_lock')
        menuNavigation.classList.toggle('_active');
    });
}