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

A modern progress bar for web APP. Featuring realistic trickle animations to convince your users that something is happening!

- [See Example here](https://hongwenqing.com/trickling/).
- [Release Notes](./CHANGELOG.md).

# Features

- Support **programmatically** modify the style of the progress bar.
- Support **RTL** languages.
- Support **Typescript**.

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

2. Create a trickling progress instance in a single file.

```ts
// @/plugins/trickling-progress.ts

import { createTrickling } from 'trickling'

// Create a Trickling progress instance
const tricklingProgress = createTrickling({
  // Options
  // ...
})

// You can also change options after creating a Trickling progress instance
tricklingProgress.setOptions({
  // ...
})

// Export the instance
export { tricklingProgress }
```

3. Using it where needed.

```ts
import { tricklingProgress } from '@/plugins/trickling-progress.ts'

// ...
// shows the Trickling progress bar
tricklingProgress.start()

// ...
// Then, completes the Trickling progress
tricklingProgress.done()
```

# Options

| Key | Type | Default value | Description |
| :---: | :---: | :---: | :---: |
| `minimum` | `number` | `0.08` | Changes the minimum percentage used upon starting. |
| `maximum` | `number` | `0.994` | Changes the maximum percentage used upon ending. |
| `easing` | `string` | `ease` | Adjust animation settings using easing (a CSS easing string). |
| `speed` | `number` | `200` | Adjust animation settings using speed (in ms). |
| `trickle` | `boolean` | `true` | Turn off the automatic incrementing behavior by setting this to `false`. |
| `trickleSpeed` | `number` | `1000` | Adjust how often to trickle/increment (in ms). |
| `showSpinner` | `boolean` | `true` | Turn off **loading spinner** by setting it to `false`. |
| `appendTo` | `string`, `HTMLElement` | `body` | Specify this to change the **parent container**. |
| `customWrapperClassName` | `string` | `''` | Specify this to add a class name into the parent container. |
| `color` | `string` | `#2299dd` | Specify this to change **color** of the progress bar and spinner. |
| `progressBarHeight` | `string` | `2px` | Specify this to change **height** of the progress bar. |
| `spinnerOpacity` | `number` | `1` | Specify this to change **opacity** of the loading spinner. |
| `spinnerSize` | `string` | `18px` | Specify this to change **size** of the loading spinner. |
| `spinnerStrokeWidth` | `string` | `2px` | Specify this to change **stroke width** of the loading spinner. |
| `rtl` <br /> (Added in v1.6.0) | `boolean` | `false` | Change the progress direction to right-to-left. |
| `removeFromDOMWhenDone` <br /> (Added in v1.9.0) | `boolean` | `true` | Remove the component from the DOM when done, re-add when needed. This can have performance implications on complex apps as style calculations are slow. If set to `false`, just hidden the DOM via `display: none` when progress done. |
| `zIndex` <br /> (Added in v1.8.0) | `number/string` | `1031` | Specify this to change progress bar **z-index**. |
| [trickleIncrementalCurve](https://github.com/yisibell/trickling#trickle-incremental-curve) <br /> (Added in v1.10.0) | `function/Array` | See below | You can use this option to configure the **incremental curve** of the trickle. |


# Trickle Incremental Curve

Using this configuration allows you to easily change the default trickle increasing curve. Thus, each Progress bar has different incremental expressions.

1. Default value

```ts
[
  { from: 0, to: 0.2, value: 0.1 },
  { from: 0.2, to: 0.5, value: 0.04 },
  { from: 0.5, to: 0.8, value: 0.02 },
  { from: 0.8, to: 0.99, value: 0.005 },
]
```

- **from**: This represents the starting range of the current progress status (including).
- **to**: This represents the end range of the current progress status (excluding).
- **value**: This represents the progress increment value of the current range.

2. Type definition see [here](./src/lib/interfaces/core.ts).

- **Function**: If you use it as a function, should returns a `number` or `array`.
- **Array**: Just set it via a `array`.

# Advanced usage

1. **Percentages**: To set a progress percentage, call `.set(n)`, where n is a number between `0..1`.

```ts
trickling.set(0.0);     // Just same as .start()
trickling.set(0.4);
trickling.set(1.0);     // Just same as .done()
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