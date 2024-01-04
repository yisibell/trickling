<template>
  <div>
    <DemoHeader
      logoText="Tr"
      title="Trickling"
      :title-link="LINKS.repo"
      :right-links="rightLinks"
    >
    </DemoHeader>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LINKS } from '@/settings'

import type { DemoHeader } from 'demoify'

const rightLinks = [
  { href: LINKS.repo, title: 'Documentation' },
  { href: LINKS.changelog, title: 'Changelog' },
  { href: LINKS.repo, title: 'Github' },
]
</script>
