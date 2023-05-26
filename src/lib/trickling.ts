import type { TricklingOptions, TricklingInstance } from './interfaces/core'
import {
  clamp,
  toBarPerc,
  css,
  queue,
  removeClass,
  removeElement,
  addClass,
} from './utils'

class Trickling implements TricklingInstance {
  static instance?: Trickling
  static progressOffsetWidth = 0

  template = `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`

  barSelector = '[role="bar"]'
  spinnerSelector = '[role="spinner"]'

  busyFlagClassName = 'trickling-busy'

  customParentClassName = 'trickling-custom-parent'

  status: number | null = null

  positionUsing = ''

  options: Required<TricklingOptions> = {
    speed: 200,
    wrapperSelectorId: 'trickling',
    appendTo: 'body',
    minimum: 0.08,
    easing: 'ease',
    showSpinner: true,
    trickleSpeed: 1000,
    trickle: true,
  }

  constructor(opts?: TricklingOptions) {
    this.options = Object.assign(this.options, opts)
    this.status = null
  }

  render(fromStart?: boolean): HTMLElement {
    if (this.isRendered())
      return document.getElementById(
        this.options.wrapperSelectorId
      ) as HTMLElement

    addClass(document.documentElement, this.busyFlagClassName)

    const tricklingElement = document.createElement('div')

    tricklingElement.id = this.options.wrapperSelectorId

    tricklingElement.innerHTML = this.template

    const bar = tricklingElement.querySelector(this.barSelector) as HTMLElement
    const perc = fromStart ? '-100' : toBarPerc(this.status || 0)
    const parentElement =
      typeof this.options.appendTo === 'string'
        ? (document.querySelector(this.options.appendTo) as HTMLElement)
        : this.options.appendTo

    css(bar, {
      transition: 'all 0 linear',
      transform: `translate3d(${perc}%, 0, 0)`,
    })

    if (!this.options.showSpinner) {
      const spinner = tricklingElement.querySelector(this.spinnerSelector)
      spinner && removeElement(spinner as HTMLElement)
    }

    if (parentElement != document.body) {
      addClass(parentElement, this.customParentClassName)
    }

    if (parentElement) {
      parentElement.appendChild(tricklingElement)
    }

    return tricklingElement
  }

  set(n: number) {
    const started = this.isStarted()

    n = clamp(n, this.options.minimum, 1)

    this.status = n === 1 ? null : n

    const progress = this.render(!started)
    const bar = progress.querySelector(this.barSelector) as HTMLElement
    const speed = this.options.speed
    const ease = this.options.easing

    Trickling.progressOffsetWidth = progress.offsetWidth /* Repaint */

    queue((next) => {
      // Set positionUsing if it hasn't already been set
      if (this.positionUsing === '')
        this.positionUsing = this.getPositioningCSS()

      // Add transition
      css(bar, this.barPositionCSS(n, speed, ease))

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1,
        })

        Trickling.progressOffsetWidth = progress.offsetWidth /* Repaint */

        setTimeout(() => {
          css(progress, {
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
    let n = this.status

    if (!n) {
      return this.start()
    } else if (n > 1) {
      return this
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) {
          amount = 0.1
        } else if (n >= 0.2 && n < 0.5) {
          amount = 0.04
        } else if (n >= 0.5 && n < 0.8) {
          amount = 0.02
        } else if (n >= 0.8 && n < 0.99) {
          amount = 0.005
        } else {
          amount = 0
        }
      }

      n = clamp(n + amount, 0, 0.994)

      return this.set(n)
    }
  }

  trickle() {
    return this.inc()
  }

  start() {
    if (!this.status) this.set(0)

    const work = () => {
      setTimeout(() => {
        if (!this.status) return
        this.trickle()
        work()
      }, this.options.trickleSpeed)
    }

    if (this.options.trickle) work()

    return this
  }

  done(force?: boolean) {
    if (!force && !this.status) return this

    return this.inc(0.3 + 0.5 * Math.random())?.set(1)
  }

  remove() {
    removeClass(document.documentElement, this.busyFlagClassName)
    const parent =
      typeof this.options.appendTo === 'string'
        ? document.querySelector(this.options.appendTo)
        : this.options.appendTo

    removeClass(parent as HTMLElement, this.customParentClassName)

    const progress = document.getElementById(this.options.wrapperSelectorId)
    progress && removeElement(progress)
  }

  isRendered() {
    return !!document.getElementById(this.options.wrapperSelectorId)
  }

  isStarted() {
    return typeof this.status === 'number'
  }

  barPositionCSS(n: number, speed: number, ease: string) {
    let barCSS: Record<string, string> = {}

    if (this.positionUsing === 'translate3d') {
      barCSS = { transform: `translate3d(${toBarPerc(n)}%,0,0)` }
    } else if (this.positionUsing === 'translate') {
      barCSS = { transform: `translate(${toBarPerc(n)}%,0)` }
    } else {
      barCSS = { 'margin-left': `${toBarPerc(n)}%` }
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
