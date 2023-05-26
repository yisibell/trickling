<template>
  <main>
    <div class="demo">
      <div class="demo-item">
        <PlayIcon
          font-size="26px"
          fill="currentColor"
          class="demo-item__action"
          @click="handleStart"
        />
        <span> shows the progress bar </span>
      </div>

      <div class="demo-item">
        <PlayIcon
          font-size="26px"
          fill="currentColor"
          class="demo-item__action"
          @click="handleSet"
        />
        <span> sets a percentage </span>
      </div>

      <div class="demo-item">
        <PlayIcon
          font-size="26px"
          fill="currentColor"
          class="demo-item__action"
          @click="handleInc"
        />
        <span> increments by a little </span>
      </div>

      <div class="demo-item">
        <PlayIcon
          font-size="26px"
          fill="currentColor"
          class="demo-item__action"
          @click="handleDone"
        />
        <span> completes the progress </span>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { createTrickling } from '@/lib/main'
import type { TricklingInstance } from '@/lib/interfaces/core'
import { onMounted, ref } from 'vue'
import PlayIcon from '@/icons/play.svg?component'

const trickling = ref<TricklingInstance>()

const handleStart = () => {
  trickling.value?.start()
}

const handleSet = () => {
  trickling.value?.set(0.4)
}

const handleInc = () => {
  trickling.value?.inc()
}

const handleDone = () => {
  trickling.value?.done()
}

onMounted(() => {
  trickling.value = createTrickling({
    // trickleSpeed: 1000,
    // easing: 'ease',
    // showSpinner: false,
    color: 'red',
  })
})
</script>

<style lang="scss" scoped>
.demo-item {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  margin-bottom: 20px;

  &__action {
    margin-right: 16px;
    cursor: pointer;
  }
}
</style>
