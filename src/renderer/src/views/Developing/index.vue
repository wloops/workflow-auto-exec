<script setup>
const open = async () => {
  // openChrome()
  const { Builder } = require('selenium-webdriver')
  console.log('open chrome', Builder)
  const loginUrl = 'http://work.paytunnel.cn:19060/gms-v4/login.jsp?key=developmentServerTest121'
  const driver = await new Builder().forBrowser('chrome').build()
  driver.manage().window().maximize() //窗口最大化
  await driver.get(loginUrl)
  await driver.findElement({ id: 'userID' }).sendKeys('username')
  await driver.findElement({ id: 'hisu_password' }).sendKeys('password')
  // await driver.findElement({ id: 'submit' }).click()
}
</script>

<template>
  <div>开发中功能</div>
  <a-button type="outline" @click="open">open</a-button>
</template>

<style scoped></style>
