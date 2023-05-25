<p align="center">:construction: Developing... :construction:</p>

# OProgress

A progress bar for web. Featuring realistic trickle animations to convince your users that something is happening!

# Features

- Progress bar style supports customization.
- Support Typescript.

# Installation

```bash
$ pnpm add oprogress
$ yarn add oprogress
$ npm i oprogress
```

# Usage

```ts
import { createOProgress } from 'oprogress'

const oprogress = createOProgress()

// shows the progress bar
oprogress.start()

// completes the progress
oprogress.done()
```

