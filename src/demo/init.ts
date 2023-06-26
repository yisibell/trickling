import { createTrickling } from 'trickling'

// Create a Tricking progress instance
const tricklingProgress = createTrickling({
  /* options */
})

// Shows the Tricking progress bar
tricklingProgress.start()

// Then, Completes the Tricking progress
tricklingProgress.done()
