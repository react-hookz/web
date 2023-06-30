export const setupNavigatorVibrate = () => {
  navigator.vibrate = (() => true) as typeof navigator.vibrate;
};
