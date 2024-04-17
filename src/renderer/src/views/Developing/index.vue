<script setup>
const open = async () => {
  const { chromium } = require('playwright')
  console.log('preload.js loaded', chromium)
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  // 打开当前页面
  await page.goto('https://www.baidu.com')
}
</script>

<template>
  <div>开发中功能</div>
  <a-button type="outline" @click="open">open</a-button>
</template>

<style scoped></style>
