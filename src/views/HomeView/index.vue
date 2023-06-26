<template>
  <main class="home">
    <div class="demo">
      <div class="demo-header">
        <h1 class="demo-header__title">
          Trickling <span class="demo-header__title--tag">(progress bar)</span>
        </h1>
        <p class="demo-header__sub-title">
          A modern nanoscopic progress bar for web APP. <br />
          Featuring realistic trickle animations to convince your users that
          something is happening!
        </p>

        <div class="demo-header__basic-usage">
          <pre class="language-js"><code>{{ initDemoRaw }}</code></pre>
        </div>
      </div>

      <div class="demo-options">
        <div class="demo-options-item">
          <label class="demo-options-item__label" for="">Color: </label>
          <input
            v-model="form.color"
            class="demo-options-item__control"
            type="color"
            @change="handleOptionsChange"
          />
        </div>
        <div class="demo-options-item">
          <label class="demo-options-item__label" for="">
            Progress bar height:
          </label>
          <input
            v-model="form.progressBarHeight"
            class="demo-options-item__control"
            type="number"
            :min="1"
            @change="handleOptionsChange"
          />
        </div>
        <div class="demo-options-item">
          <label class="demo-options-item__label" for=""> Spinner size: </label>
          <input
            v-model="form.spinnerSize"
            class="demo-options-item__control"
            type="number"
            :min="1"
            @change="handleOptionsChange"
          />
        </div>
        <div class="demo-options-item">
          <label class="demo-options-item__label" for="">
            Spinner stroke width:
          </label>
          <input
            v-model="form.spinnerStrokeWidth"
            class="demo-options-item__control"
            type="number"
            :min="1"
            @change="handleOptionsChange"
          />
        </div>
        <div class="demo-options-item">
          <label class="demo-options-item__label" for="">
            Spinner opacity:
          </label>
          <input
            v-model="form.spinnerOpacity"
            class="demo-options-item__control"
            type="number"
            :max="1"
            :min="0"
            :step="0.1"
            @change="handleOptionsChange"
          />
        </div>

        <div class="demo-options-item">
          <label class="demo-options-item__label" for=""> RTL: </label>
          <input
            v-model="form.rtl"
            class="demo-options-item__control"
            type="checkbox"
            @change="handleOptionsChange"
          />
        </div>

        <div class="demo-options-item">
          <label class="demo-options-item__label" for="">
            Remove from DOM:
          </label>
          <input
            v-model="form.removeFromDOM"
            class="demo-options-item__control"
            type="checkbox"
            @change="handleOptionsChange"
          />
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

import { onMounted, ref } from 'vue'
import type { TricklingOptions } from '@/lib/interfaces/core'
import { createTrickling } from '@/lib/main'
import PlayIcon from '@/icons/play.svg?component'
import initDemoRaw from '@/demo/init?raw'

const form = ref<TricklingOptions>({
  color: '#2299dd',
  progressBarHeight: '2',
  spinnerOpacity: 1,
  spinnerSize: '18',
  spinnerStrokeWidth: '2',
  rtl: false,
  removeFromDOM: true,
})

const trickling = createTrickling()

const handleOptionsChange = () => {
  trickling.setOptions({
    color: form.value.color,
    progressBarHeight: `${form.value.progressBarHeight}px`,
    spinnerOpacity: form.value.spinnerOpacity,
    spinnerSize: `${form.value.spinnerSize}px`,
    spinnerStrokeWidth: `${form.value.spinnerStrokeWidth}px`,
    rtl: form.value.rtl,
    removeFromDOM: form.value.removeFromDOM,
  })
}

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

onMounted(() => {
  handleOptionsChange()
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeView',
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.demo-options {
  padding: 16px 0;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.demo-options-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 12px 0;

  &__label {
    margin-right: 16px;
    color: #909399;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
}

.demo-header {
  margin-bottom: 50px;

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
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    color: var(--text-color--secondary);
    padding: 12px 200px;
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

.gap-arrow {
  padding: 0 12px;
}
</style>
