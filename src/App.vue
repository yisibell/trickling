<template>
  <RouterView />

  <div class="footer">
    <span>
      <a
        href="https://github.com/yisibell/trickling/blob/main/CHANGELOG.md"
        target="_blank"
      >
        CHANGE LOG
      </a>
    </span>
    <span class="divider">|</span>
    <span>
      <a href="https://github.com/yisibell/trickling" target="_blank">Github</a>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;

  .divider {
    display: inline-block;
    color: var(--color--info);
    padding: 0 14px;
  }
}
</style>
