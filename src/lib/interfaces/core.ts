import type { Trickling } from '../trickling'

export interface TricklingOptions {
  /**
   * trickling speed
   */
  speed?: number

  trickle?: boolean

  trickleSpeed?: number

  wrapperSelectorId?: string

  appendTo?: string | HTMLElement

  minimum?: number

  easing?: string

  showSpinner?: boolean
}

export type CreateTrickling = (opts?: TricklingOptions) => Trickling

export { Trickling }
