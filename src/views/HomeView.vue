<template>
  <main class="home">
    <div class="demo">
      <div class="demo-header">
        <h1 class="demo-header__title">
          Trickling <span class="demo-header__title--tag">(progress bar)</span>
        </h1>
        <p class="demo-header__sub-title">
          A nanoscopic progress bar. Featuring realistic trickle animations to
          convince your users that something is happening!
        </p>

        <div class="demo-header__basic-usage">
          <pre class="language-js"><code>{{ initDemoRaw }}</code></pre>
        </div>
      </div>

      <div class="demo-content">
        <div class="demo-item">
          <div class="demo-item__action" @click="handleStart">
            <PlayIcon font-size="18px" fill="currentColor" />
          </div>
          <code class="language-js"> trickling.start() </code>
          <span class="gap-arrow">---></span>
          <span> Shows the progress bar </span>
        </div>

        <div class="demo-item">
          <div class="demo-item__action" @click="handleSet">
            <PlayIcon font-size="18px" fill="currentColor" />
          </div>
          <code class="language-js"> trickling.set(0.4) </code>
          <span class="gap-arrow">---></span>
          <span> Sets a percentage </span>
        </div>

        <div class="demo-item">
          <div class="demo-item__action" @click="handleInc">
            <PlayIcon font-size="18px" fill="currentColor" />
          </div>
          <code class="language-js"> trickling.inc() </code>
          <span class="gap-arrow">---></span>
          <span> Increments by a little </span>
        </div>

        <div class="demo-item">
          <div class="demo-item__action" @click="handleDone">
            <PlayIcon font-size="18px" fill="currentColor" />
          </div>
          <code class="language-js"> trickling.done() </code>
          <span class="gap-arrow">---></span>
          <span> Completes the progress </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import 'prismjs'

import { createTrickling } from '@/lib/main'
import PlayIcon from '@/icons/play.svg?component'
import initDemoRaw from '@/demo/init?raw'

const trickling = createTrickling({
  color: '#409EFF',
})

const handleStart = () => {
  trickling.start()
}

const handleSet = () => {
  trickling.set(0.4)
}

const handleInc = () => {
  trickling.inc()
}

const handleDone = () => {
  trickling.done()
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  height: 100%;
}

.gap-arrow {
  padding: 0 12px;
}

.demo-header {
  margin-bottom: 80px;

  &__title {
    text-align: center;
    font-size: 48px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: var(--text-color-primary);

    &--tag {
      font-size: 22px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--color--info);
    }
  }

  &__sub-title {
    text-align: center;
    font-size: 18px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    color: var(--text-color--secondary);
  }

  &__basic-usage {
    padding: 16px 0;
  }
}

.demo-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &__action {
    margin-right: 16px;
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: var(--text-color--dark-2);
    color: var(--color--primary);

    &:hover {
      background-color: var(--color--primary);
      color: #fff;
    }
  }
}
</style>
