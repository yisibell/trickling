interface TricklingOptions {
  speed?: number
  easing?: string
  minimum?: number
  showSpinner?: boolean

  trickle?: boolean

  /**
   * trickling speed
   */
  trickleSpeed?: number

  wrapperSelectorId?: string

  appendTo?: string | HTMLElement
}

interface TricklingInstance {
  template: string
  barSelector: string
  spinnerSelector: string
  busyFlagClassName: string
  customParentClassName: string
  status: number | null
  positionUsing: string
  options: Required<TricklingOptions>
  render: (fromStart?: boolean) => HTMLElement
  start: () => TricklingInstance
  set: (n: number) => TricklingInstance
  inc: (amount?: number) => TricklingInstance
  trickle: () => TricklingInstance
  done: (force?: boolean) => TricklingInstance
  remove: () => void
  isRendered: () => boolean
  isStarted: () => boolean
  barPositionCSS: (
    n: number,
    speed: number,
    ease: string
  ) => Record<string, string>
  getPositioningCSS: () => 'translate3d' | 'translate' | 'margin'
}

type CreateTrickling = (opts?: TricklingOptions) => TricklingInstance

declare const createTrickling: CreateTrickling

export { TricklingInstance, TricklingOptions, createTrickling };
