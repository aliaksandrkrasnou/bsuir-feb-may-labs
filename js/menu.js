document.addEventListener('DOMContentLoaded', () => {
  const BUTTON_CLASS = 'navigation__menu-button'
  const BUTTON_ACTIVE_CLASS = 'navigation__menu-button_active';
  const MENU_CLASS = 'navigation__menu';
  const MENU_ACTIVE_CLASS = 'navigation__menu_active';

  const navigationMenuButton = document.querySelector(`.${BUTTON_CLASS}`);
  const navigationMenu = document.querySelector(`.${MENU_CLASS}`);

  if (!navigationMenuButton || !navigationMenu) {
    return;
  }

  const clickOutsideMenu = (e) => {
    if (e.target !== navigationMenu) {
      hideMenu();
    }
  };

  const hideMenu = () => {
    navigationMenu.classList.remove(MENU_ACTIVE_CLASS);
    document.removeEventListener('click', clickOutsideMenu);
    navigationMenuButton.classList.remove(BUTTON_ACTIVE_CLASS);
    navigationMenuButton.addEventListener('click', showMenu);
    navigationMenuButton.removeEventListener('click', hideMenu);
  }
  const showMenu = (e) => {
    e.stopPropagation();
    navigationMenu.classList.add(MENU_ACTIVE_CLASS);
    navigationMenuButton.classList.add(BUTTON_ACTIVE_CLASS);
    navigationMenuButton.removeEventListener('click', showMenu);
    navigationMenuButton.addEventListener('click', hideMenu);
    document.addEventListener('click', clickOutsideMenu)
  }

  navigationMenuButton.addEventListener('click', showMenu);
});
