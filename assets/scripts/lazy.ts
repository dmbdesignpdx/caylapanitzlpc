import {
  IO,
  IOC,
  IOE,
  IOI,
} from 'types';


const hasIO: boolean = 'IntersectionObserver' in window;
const collection = <Array<HTMLElement>>[...document.querySelectorAll('.__lazy')];

if (hasIO) {
  const threshold = [0.4, 0.8];
  const settings: IOI = { threshold };

  let observer: IO;

  const callback: IOC = (entries: Array<IOE>) => {
    const desktop = innerWidth >= 1024;

    entries.forEach(({ intersectionRatio, target }) => {
      const animate = (): void => {
        target.classList.remove('__start');
        observer.unobserve(target);
      };

      if (
        (desktop && intersectionRatio > threshold[1]) ||
        (!desktop && intersectionRatio > threshold[0])
      ) {
        requestAnimationFrame(animate);
      }
    });
  };

  observer = new IntersectionObserver(callback, settings);

  collection.forEach(item => {
    item.classList.add('__start');
    observer.observe(item);
  });
}
