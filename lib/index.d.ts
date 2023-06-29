interface TrickleIncrementalCurveRecord {
  from: number
  to: number
  value: number
}

type TrickleIncrementalCurveFunc = (
  currentStatus: number
) => TrickleIncrementalCurveRecord[]

interface TricklingOptions {
  speed?: number
  easing?: string
  minimum?: number
  maximum?: number
  showSpinner?: boolean

  trickle?: boolean

  /**
   * trickling speed
   */
  trickleSpeed?: number

  appendTo?: string | HTMLElement

  customWrapperClassName?: string

  color?: string
  progressBarHeight?: string
  spinnerOpacity?: number
  spinnerSize?: string
  spinnerStrokeWidth?: string
  zIndex?: number | string

  rtl?: boolean

  removeFromDOMWhenDone?: boolean

  trickleIncrementalCurve?:
    | TrickleIncrementalCurveFunc
    | TrickleIncrementalCurveRecord[]
}

interface TricklingInstance {
  status: number | null
  positionUsing: string
  progressOffsetWidth: number
  options: Required<TricklingOptions>
  setOptions(opts: TricklingOptions): TricklingInstance
  render: (fromStart?: boolean) => HTMLElement
  start: () => TricklingInstance
  set: (barStatus: number) => TricklingInstance
  inc: (amount?: number) => TricklingInstance
  trickle: () => TricklingInstance
  done: (force?: boolean) => TricklingInstance
  remove: (force?: boolean) => void
  isRendered: () => boolean
  isStarted: () => boolean
  barPositionCSS: (
    barStatus: number,
    speed: number,
    ease: string
  ) => Record<string, string>
  getPositioningCSS: () => 'translate3d' | 'translate' | 'margin'
  setPercent: (value: number | null) => void
  getPercent: () => number | null
  setCSSVars: (target: HTMLElement) => void
  getAppendToElement: () => HTMLElement
  getBarElement: (target: HTMLElement) => HTMLElement
  getWrapperElement(): HTMLElement | null
  getBarPercentage(barStatus: number): string
  visible(): void
  hidden(): void
  translateProgressBar(barEl: HTMLElement, fromStart?: boolean): void
}

type CreateTrickling = (opts?: TricklingOptions) => TricklingInstance

declare const createTrickling: CreateTrickling

export { TricklingInstance, TricklingOptions, createTrickling };
