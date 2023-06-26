export enum CONSTANTS {
  wrapperSelectorId = 'trickling',
  customParentClassName = 'trickling-custom-parent',
  busyFlagClassName = 'trickling-busy',
  template = `
  <div class="trickling-progress-bar" role="bar">
    <div class="trickling-progress-peg"></div>
  </div>
  <div class="trickling-progress-spinner" role="spinner">
    <div class="trickling-progress-spinner__spinner-icon"></div>
  </div>`,

  barSelector = '[role="bar"]',
  spinnerSelector = '[role="spinner"]',

  rtlClassName = 'rtl',
}
