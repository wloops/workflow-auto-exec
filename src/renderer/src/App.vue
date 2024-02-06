<script setup lang="ts">
import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')

const testFun = () => {
  console.log('testFun', window.chromium)
  const browser = window.chromium.launch() //模拟打开浏览器,设置有头模式，并通过slowMo属性减慢浏览器的每一步操作
  const context = browser.newContext() //建立context
  const page = context.newPage() //模拟打开一个浏览器的标签页
  page.goto('https://www.baidu.com/') //模拟访问网站url
  page.screenshot({ path: `example.png` }) //对网页进行截图并保存为example.png
  page.close() //关闭网页
  context.close() //关闭context
  browser.close() //关闭浏览器
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
