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

/**
 * (Internal) Determines if an element or space separated list of class names
 * contains a class name.
 */
export function hasClass(element: HTMLElement, name: string) {
  return element.classList.contains(name)
}

/**
 * (Internal) Adds a class to an element.
 */
export function addClass(element: HTMLElement, name: string | string[]) {
  const tokens = typeof name === 'string' ? [name] : name

  element.classList.add(...tokens)
}

/**
 * (Internal) Removes a class from an element.
 */
export function removeClass(element: HTMLElement, name: string | string[]) {
  const tokens = typeof name === 'string' ? [name] : name
  element.classList.remove(...tokens)
}

/**
 * (Internal) Removes an element from the DOM.
 */
export function removeElement(element: HTMLElement) {
  element && element.parentNode && element.parentNode.removeChild(element)
}
