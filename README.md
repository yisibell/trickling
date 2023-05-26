<p align="center">
  <a href="https://www.npmjs.org/package/trickling">
    <img src="https://img.shields.io/npm/v/trickling.svg">
  </a>
  <a href="https://npmcharts.com/compare/trickling?minimal=true">
    <img src="https://img.shields.io/npm/dm/trickling.svg">
  </a>
  <br>
</p>

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

1. Imports style.

```ts
import 'trickling/lib/style.css'
```

2. Create a trickling progress instance.

```ts
import { createTrickling } from 'trickling'

const trickling = createTrickling({
  // Options
  // ...
})

// shows the progress bar
trickling.start()

// completes the progress
trickling.done()
```

# Options

| Key | Type | Default value | Description |
| :---: | :---: | :---: | :---: |
| `minimum` | `number` | `0.08` | Changes the minimum percentage used upon starting. |
| `easing` | `string` | `ease` | Adjust animation settings using easing (a CSS easing string). |
| `speed` | `number` | `200` | Adjust animation settings using speed (in ms). |
| `trickle` | `boolean` | `true` | Turn off the automatic incrementing behavior by setting this to `false`. |
| `trickleSpeed` | `number` | `1000` | Adjust how often to trickle/increment (in ms). |
| `showSpinner` | `boolean` | `true` | Turn off **loading spinner** by setting it to `false`. |
| `appendTo` | `string`, `HTMLElement` | `body` | Specify this to change the **parent container**. |
| `wrapperSelectorId` | `string` | `trickling` | Specify this to change the **id selector** of parent container. |
| `color` | `string` | `#29d` | Specify this to change **color** of the progress bar and spinner. |
| `progressBarHeight` | `string` | `2px` | Specify this to change **height** of the progress bar. |
| `spinnerOpacity` | `number` | `1` | Specify this to change **opacity** of the loading spinner. |
| `spinnerSize` | `string` | `18px` | Specify this to change **size** of the loading spinner. |
| `spinnerStrokeWidth` | `string` | `2px` | Specify this to change **stroke width** of the loading spinner. |


# Advanced usage

1. **Percentages**: To set a progress percentage, call `.set(n)`, where n is a number between `0..1`.

```ts
trickling.set(0.0);     // Sorta same as .start()
trickling.set(0.4);
trickling.set(1.0);     // Sorta same as .done()
```

2. **Incrementing**: To increment the progress bar, just use `.inc()`. This increments it with a random amount. This will never get to `100%`: use it for every image load (or similar).

```ts
trickling.inc();
```

3. If you want to increment by a specific value, you can pass that as a parameter:

```ts
trickling.inc(0.2);    // This will get the current status value and adds 0.2 until status is 0.994
```

4. **Force-done**: By passing true to `done()`, it will show the progress bar even if it's not being shown. (The default behavior is that `.done()` will not do anything if `.start()` isn't called).

```ts
trickling.done(true);
```

5. Get the status value: To get the status value, use `.status`.

```ts
trickling.status
```

# CHANGE LOG

see [CHANGE LOG](./CHANGELOG.md).