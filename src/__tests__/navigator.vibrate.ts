export const NavigatorVibrateSetup = () => {
  navigator.vibrate = (_: number[]): boolean => true;
};
