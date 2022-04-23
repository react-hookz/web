export const NavigatorVibrateSetup = () => {
  navigator.vibrate = (_: VibratePattern): boolean => true;
};
