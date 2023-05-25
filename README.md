<p align="center">:construction: Developing... :construction:</p>

# Trickling

A progress bar for web. Featuring realistic trickle animations to convince your users that something is happening!

# Features

- Progress bar style supports customization.
- Support Typescript.

# Installation

```bash
# pnpm
$ pnpm add trickling

# yarn
$ yarn add trickling

# npm
$ npm i trickling
```

# Usage

```ts
import { createTrickling } from 'trickling'

const trickling = createTrickling()

// shows the progress bar
trickling.start()

// completes the progress
trickling.done()
```

