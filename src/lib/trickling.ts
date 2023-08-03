import type { TricklingOptions, TricklingInstance } from './interfaces/core'
import { clamp, toBarPerc } from './utils'
import { queue } from './queue'
import { css, removeClass, removeElement, addClass } from 'fourdom'
import { CONSTANTS } from './CONSTANTS'
import { ERRORS } from './ERRORS'

class Trickling implements TricklingInstance {
  static instance?: Trickling
  progressOffsetWidth = 0

  status: number | null = null

  positionUsing = ''

  options: Required<TricklingOptions> = {
    speed: 200,
    easing: 'ease',
    appendTo: 'body',
    customWrapperClassName: '',
    minimum: 0.08,
    maximum: 0.994,
    showSpinner: true,
    trickleSpeed: 1000,
    trickle: true,
    color: '#2299dd',
    progressBarHeight: '2px',
    spinnerOpacity: 1,
    spinnerSize: '18px',
    spinnerStrokeWidth: '2px',
    zIndex: 1031,
    rtl: false,
    removeFromDOMWhenDone: true,
    trickleIncrementalCurve: [
      { from: 0, to: 0.2, value: 0.1 },
      { from: 0.2, to: 0.5, value: 0.04 },
      { from: 0.5, to: 0.8, value: 0.02 },
      { from: 0.8, to: 0.99, value: 0.005 },
    ],
  }

  constructor(opts?: TricklingOptions) {
    this.options = Object.assign(this.options, opts)
    this.setPercent(null)
  }

  setOptions(opts: TricklingOptions) {
    this.options = Object.assign(this.options, opts)

    return this
  }

  setCSSVars(target: HTMLElement) {
    css(target, {
      '--trickling-color': this.options.color,
      '--trickling-progress-bar-height': this.options.progressBarHeight,
      '--trickling-spinner-opacity': this.options.spinnerOpacity,
      '--trickling-spinner-size': this.options.spinnerSize,
      '--trickling-spinner-stroke-width': this.options.spinnerStrokeWidth,
      '--trickling-progress-bar-z-index': this.options.zIndex,
    })
  }

  render(fromStart?: boolean): HTMLElement {
    if (this.isRendered()) {
      return this.getWrapperElement() as HTMLElement
    }

    addClass(document.documentElement, CONSTANTS.busyFlagClassName)

    const tricklingElement = document.createElement('div')

    tricklingElement.id = CONSTANTS.wrapperSelectorId

    tricklingElement.innerHTML = CONSTANTS.template

    if (this.options.rtl) {
      addClass(tricklingElement, CONSTANTS.rtlClassName)
    }

    if (this.options.customWrapperClassName) {
      addClass(tricklingElement, this.options.customWrapperClassName)
    }

    this.setCSSVars(tricklingElement)

    const bar = this.getBarElement(tricklingElement)
    const parentElement = this.getAppendToElement()

    this.translateProgressBar(bar, fromStart)

    if (!this.options.showSpinner) {
      const spinner = tricklingElement.querySelector(CONSTANTS.spinnerSelector)
      spinner && removeElement(spinner as HTMLElement)
    }

    if (parentElement != document.body) {
      addClass(parentElement, CONSTANTS.customParentClassName)
    }

    if (parentElement) {
      parentElement.appendChild(tricklingElement)
    }

    return tricklingElement
  }

  triggerRepaint() {
    const el = this.getWrapperElement()

    if (el) {
      this.progressOffsetWidth = el.offsetWidth /* Repaint */
    }
  }

  set(barStatus: number) {
    const started = this.isStarted()

    !started && this.visible()

    barStatus = clamp(barStatus, this.options.minimum, 1)

    this.setPercent(barStatus === 1 ? null : barStatus)

    const progressElement = this.render(!started)
    const bar = this.getBarElement(progressElement)
    const speed = this.options.speed
    const ease = this.options.easing

    this.triggerRepaint()

    queue((next) => {
      // Set positionUsing if it hasn't already been set
      if (this.positionUsing === '')
        this.positionUsing = this.getPositioningCSS()

      // Add transition
      css(bar, this.barPositionCSS(barStatus, speed, ease))

      if (barStatus === 1) {
        // Fade out
        css(progressElement, {
          transition: 'none',
          opacity: 1,
        })

        this.triggerRepaint()

        setTimeout(() => {
          css(progressElement, {
            transition: `all ${speed}ms linear`,
            opacity: 0,
          })
          setTimeout(() => {
            this.remove()
            next()
          }, speed)
        }, speed)
      } else {
        setTimeout(next, speed)
      }
    })

    return this
  }

  inc(amount?: number) {
    let currentStatus = this.getPercent()

    if (!currentStatus) {
      return this.start()
    } else if (currentStatus > 1) {
      return this
    } else {
      if (typeof amount !== 'number') {
        const incCurveList =
          typeof this.options.trickleIncrementalCurve === 'function'
            ? this.options.trickleIncrementalCurve(currentStatus)
            : this.options.trickleIncrementalCurve

        if (typeof incCurveList === 'number') {
          amount = incCurveList || 0
        } else {
          const incCurveItem = incCurveList.find(
            (v) =>
              currentStatus !== null &&
              currentStatus >= v.from &&
              currentStatus < v.to
          )

          if (incCurveItem) {
            amount = incCurveItem.value
          } else {
            amount = 0
          }
        }
      }

      currentStatus = clamp(currentStatus + amount, 0, this.options.maximum)

      return this.set(currentStatus)
    }
  }

  trickle() {
    return this.inc()
  }

  start() {
    !this.isStarted() && this.visible()

    if (!this.getPercent()) this.set(0)

    const work = () => {
      setTimeout(() => {
        if (!this.getPercent()) return
        this.trickle()
        work()
      }, this.options.trickleSpeed)
    }

    if (this.options.trickle) work()

    return this
  }

  done(force?: boolean) {
    if (!force && !this.getPercent()) return this

    return this.inc(0.3 + 0.5 * Math.random()).set(1)
  }

  translateProgressBar(barEl: HTMLElement, fromStart?: boolean) {
    const perc = fromStart
      ? this.getBarPercentage(0)
      : this.getBarPercentage(this.getPercent() || 0)

    css(barEl, {
      transition: 'all 0 linear',
      transform: `translate3d(${perc}%, 0, 0)`,
    })
  }

  visible() {
    if (this.isRendered() && !this.options.removeFromDOMWhenDone) {
      const el = this.getWrapperElement()

      el && css(el, { display: 'block', opacity: 1 })

      this.setPercent(null)
    }
  }

  hidden() {
    const el = this.getWrapperElement()
    if (el) {
      css(el, { display: 'none' })
      this.setPercent(null)
      this.translateProgressBar(this.getBarElement(el), true)
    }
  }

  remove(force?: boolean) {
    removeClass(document.documentElement, CONSTANTS.busyFlagClassName)

    if (!this.options.removeFromDOMWhenDone && !force) {
      // hide rather than remove from DOM, as this is super expensive in IE
      this.hidden()
      return
    }

    const parent = this.getAppendToElement()
    removeClass(parent as HTMLElement, CONSTANTS.customParentClassName)

    const progress = this.getWrapperElement()
    progress && removeElement(progress)
  }

  getWrapperElement() {
    return document.getElementById(CONSTANTS.wrapperSelectorId)
  }

  getBarElement(target: HTMLElement) {
    const el = target.querySelector(CONSTANTS.barSelector) as HTMLElement
    if (!el) {
      throw new Error(ERRORS.queryBarElementError)
    }

    return el
  }

  getAppendToElement() {
    const el =
      typeof this.options.appendTo === 'string'
        ? (document.querySelector(this.options.appendTo) as HTMLElement)
        : this.options.appendTo

    if (!el) {
      throw new Error(ERRORS.queryAppendToElementError)
    }

    return el
  }

  setPercent(value: number | null) {
    this.status = value
  }

  getPercent() {
    return this.status
  }

  isRendered() {
    return !!this.getWrapperElement()
  }

  isStarted() {
    return typeof this.getPercent() === 'number'
  }

  getBarPercentage(barStatus: number) {
    return toBarPerc(barStatus, this.options.rtl)
  }

  barPositionCSS(barStatus: number, speed: number, ease: string) {
    let barCSS: Record<string, string> = {}

    if (this.positionUsing === 'translate3d') {
      barCSS = {
        transform: `translate3d(${this.getBarPercentage(barStatus)}%,0,0)`,
      }
    } else if (this.positionUsing === 'translate') {
      barCSS = {
        transform: `translate(${this.getBarPercentage(barStatus)}%,0)`,
      }
    } else {
      barCSS = { 'margin-left': `${this.getBarPercentage(barStatus)}%` }
    }

    barCSS.transition = `all ${speed}ms ${ease} 0s`

    return barCSS
  }

  getPositioningCSS() {
    // Sniff on document.body.style
    const bodyStyle = document.body.style

    // Sniff prefixes
    const vendorPrefix =
      'WebkitTransform' in bodyStyle
        ? 'Webkit'
        : 'MozTransform' in bodyStyle
        ? 'Moz'
        : 'msTransform' in bodyStyle
        ? 'ms'
        : 'OTransform' in bodyStyle
        ? 'O'
        : ''

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d'
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate'
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin'
    }
  }

  static createProgress(opts?: TricklingOptions) {
    if (Trickling.instance) return Trickling.instance
    Trickling.instance = new Trickling(opts)
    return Trickling.instance
  }
}

const createTrickling = function (opts?: TricklingOptions) {
  return Trickling.createProgress(opts)
}

export { Trickling, createTrickling }
