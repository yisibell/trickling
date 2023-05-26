import { createTrickling } from 'trickling'

// Create a progress instance
const trickling = createTrickling()

// Shows the progress bar
trickling.start()

// Then, Completes the progress
trickling.done()
