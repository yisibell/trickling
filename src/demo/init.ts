import { createTrickling } from 'trickling'

// Create a Trickling progress instance
const tricklingProgress = createTrickling({
  /* options */
})

// Shows the Trickling progress bar
tricklingProgress.start()

// Then, Completes the Trickling progress
tricklingProgress.done()
