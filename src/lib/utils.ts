export function clamp(n: number, min: number, max: number) {
  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * (Internal) converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 * @param {Number} n
 */
export function toBarPerc(n: number) {
  return ((-1 + n) * 100).toFixed(4)
}

export function css(
  el: HTMLElement | Element,
  styleMap: Record<string, string | number>
) {
  const existStyles = el.getAttribute('style') || ''

  const styleRecords = existStyles.split(';').filter((v) => !!v.trim())

  const existStyleMap = styleRecords.reduce((res, v) => {
    const item = v.split(':').map((str) => str.trim())

    const key = item[0]
    const value = item[1]

    res[key] = value

    return res
  }, {} as Record<string, string>)

  const finalStyleMap = Object.assign(existStyleMap, styleMap)

  const styles = Object.keys(finalStyleMap)
    .filter((v) => !!v.trim())
    .reduce((res, key) => {
      res += `${key}: ${finalStyleMap[key]};`

      return res
    }, '')

  el.setAttribute('style', styles)
}

export const createQueue = () => {
  const pending: Function[] = []

  function next() {
    const fn = pending.shift()
    if (fn) {
      fn(next)
    }
  }

  return function (fn: (next: () => void) => void) {
    pending.push(fn)
    if (pending.length == 1) next()
  }
}

/**
 * (Internal) Queues a function to be executed.
 */
export const queue = createQueue()

/**
 * (Internal) Determines if an element or space separated list of class names
 * contains a class name.
 * @param {Node} element
 * @param {string} name
 */
export function hasClass(element: HTMLElement | string, name: string) {
  const list = typeof element == 'string' ? element : classList(element)
  return list.indexOf(' ' + name + ' ') >= 0
}

/**
 * (Internal) Adds a class to an element.
 * @param {Node} element
 * @param {string} name
 */
export function addClass(element: HTMLElement, name: string) {
  const oldList = classList(element)
  const newList = oldList + name

  if (hasClass(oldList, name)) return

  // Trim the opening space.
  element.className = newList.substring(1)
}

/**
 * (Internal) Removes a class from an element.
 */
export function removeClass(element: HTMLElement, name: string) {
  const oldList = classList(element)

  if (!hasClass(element, name)) return

  // Replace the class name.
  const newList = oldList.replace(' ' + name + ' ', ' ')

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1)
}

/**
 * (Internal) Gets a space separated list of the class names on the element.
 * The list is wrapped with a single space on each end to facilitate finding
 * matches within the list.
 */
export function classList(element: HTMLElement) {
  return (' ' + ((element && element.className) || '') + ' ').replace(
    /\s+/gi,
    ' '
  )
}

/**
 * (Internal) Removes an element from the DOM.
 */
export function removeElement(element: HTMLElement) {
  element && element.parentNode && element.parentNode.removeChild(element)
}
