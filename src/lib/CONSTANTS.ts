export enum CONSTANTS {
  wrapperSelectorId = 'trickling',
  customParentClassName = 'trickling-custom-parent',
  busyFlagClassName = 'trickling-busy',
  template = `
  <div class="bar" role="bar">
    <div class="peg"></div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>`,

  barSelector = '[role="bar"]',
  spinnerSelector = '[role="spinner"]',

  rtlClassName = 'rtl',
}
