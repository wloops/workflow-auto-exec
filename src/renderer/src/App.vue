<script setup lang="ts">
import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')

const testFun = async () => {
  const { chromium } = require('playwright')
  console.log('preload.js loaded', chromium)
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  // 打开当前页面
  await page.goto('https://www.baidu.com')
  // const page = await window.startPage() // 调用预加载脚本中暴露的函数。
  // console.log('test', window.chromium)
  // const filePath = window.electronAPI.openFile()
  // console.log('test', filePath)
  //  const webdriver = require('selenium-webdriver')
  // const driver = new webdriver.Builder()
  //   // 端口号 "9515" 是被 ChromeDriver 开启的.
  //   .usingServer('http://localhost:9515')
  //   .withCapabilities({
  //     'goog:chromeOptions': {
  //       // 这里填您的Electron二进制文件路径。
  //       binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
  //     }
  //   })
  //   .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  //   .build()
  // driver.get('https://www.google.com')
  // driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
  // driver.findElement(webdriver.By.name('btnG')).click()
  // driver.wait(() => {
  //   return driver.getTitle().then((title) => {
  //     return title === 'webdriver - Google Search'
  //   })
  // }, 1000)
  // driver.quit()
}
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="testFun">test</a>
    </div>
  </div>
  <Versions />
</template>
