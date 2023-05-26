export const createQueue = () => {
  const pending: Function[] = []

  function next() {
    const fn = pending.shift()
    if (fn) {
      fn(next)
    }
  }

  return function (fn: (next: () => any) => void) {
    pending.push(fn)
    if (pending.length == 1) next()
  }
}

/**
 * (Internal) Queues up an action. Doesn't execute actions unless others have finished.
 */
export const queue = createQueue()
