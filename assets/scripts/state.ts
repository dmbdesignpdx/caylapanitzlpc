type State = {
  initY: number;
  navShowing: boolean;
  availHeight: number;
}

export const state: State = {
  initY: pageYOffset,
  navShowing: true,
  availHeight: 0,
};
