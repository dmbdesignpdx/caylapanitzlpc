import SmoothScroll from 'smooth-scroll';

import 'author';
import 'lazy';
import 'nav';
import { KAO } from 'types';


const RED_DIV = <HTMLDivElement>document.getElementById('red');
const TEAL_DIV = <HTMLDivElement>document.getElementById('teal');
const YELLOW_DIV = <HTMLDivElement>document.getElementById('yellow');
const YELLOW_SVG = <SVGSVGElement>YELLOW_DIV.querySelector('svg');
const RED_SVG = <SVGSVGElement>RED_DIV.querySelector('svg');
const TEAL_SVG = <SVGSVGElement>TEAL_DIV.querySelector('svg');
const reduce: boolean = matchMedia('(prefers-reduced-motion)').matches;

const triProps: KAO = {
  fill: 'forwards',
  duration: 100,
};

const parallax = (): void => {
  if (pageYOffset < (innerHeight * 0.9)) {
    const fastY: number = Math.ceil(pageYOffset * 0.6);
    const midY: number = Math.ceil(pageYOffset * 0.3);
    const slowY: number = Math.ceil(pageYOffset * 0.1);

    YELLOW_DIV.animate([{ transform: `translateY(-${fastY}px)` }], triProps);
    RED_DIV.animate([{ transform: `translateY(-${midY}px)` }], triProps);
    TEAL_DIV.animate([{ transform: `translateY(-${slowY}px)` }], triProps);
    YELLOW_SVG?.animate([{ transform: `rotate(${slowY}deg)` }], triProps);
    RED_SVG?.animate([{ transform: `rotate(-${slowY}deg)` }], triProps);
    TEAL_SVG?.animate([{ transform: `rotate(-${slowY}deg)` }], triProps);
  }
};

if (!reduce) {
  const smooth = new SmoothScroll('a[href*=\'#\']');

  smooth.init;
  addEventListener('scroll', parallax, { passive: true });
}
