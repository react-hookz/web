export const NavigatorVibrateSetup = () => {
  navigator.vibrate = (() => true) as typeof navigator.vibrate;
};
