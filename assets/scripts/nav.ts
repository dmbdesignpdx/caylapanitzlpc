import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { state } from 'state';


const NAV = <HTMLElement>document.getElementById('nav');
const OPEN_BUTTON = <HTMLButtonElement>document.querySelector('.--open');
const CLOSE_BUTTON = <HTMLButtonElement>document.querySelector('.--close');
const NAVMENU_DIV = <HTMLDivElement>document.querySelector('.nav-Menu');
const LINKS = <Array<HTMLAnchorElement>>[...NAVMENU_DIV.querySelectorAll('a')];

const toggleNav = (): void => {
  const update: number = pageYOffset;

  if (update > 10) {
    NAV.classList.add('__shadow');

    if (update > state.initY && state.navShowing) {
      NAV.classList.add('__hide');

      state.navShowing = false;
    }

    if (update < state.initY && !state.navShowing) {
      NAV.classList.remove('__hide');

      state.navShowing = true;
    }

  } else {
    NAV.classList.remove('__shadow');
  }

  state.initY = update;
};

const toggleMenu = ({ currentTarget }: Event): void => {
  const open: boolean = currentTarget === OPEN_BUTTON;

  NAVMENU_DIV.classList.toggle('__open');

  LINKS.forEach(LINK => {
    LINK.addEventListener('click', toggleMenu);
  });

  if (open) {
    CLOSE_BUTTON.addEventListener('click', toggleMenu);
    disableBodyScroll(NAV);
  } else enableBodyScroll(NAV);
};

OPEN_BUTTON.addEventListener('click', toggleMenu);
addEventListener('scroll', (): void => {
  requestAnimationFrame(toggleNav);
}, { passive: true });
