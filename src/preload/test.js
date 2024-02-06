const { chromium } = require('playwright') //引用模拟浏览器

;(async () => {
  const browser = await chromium.launch() //模拟打开浏览器,设置有头模式，并通过slowMo属性减慢浏览器的每一步操作
  const context = await browser.newContext() //建立context
  const page = await context.newPage() //模拟打开一个浏览器的标签页
  await page.goto('https://www.baidu.com/') //模拟访问网站url
  await page.screenshot({ path: `example.png` }) //对网页进行截图并保存为example.png
  await page.close() //关闭网页
  await context.close() //关闭context
  await browser.close() //关闭浏览器
})()
