// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC4 - View order history', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('TC4 - View order history', async function() {
    await driver.get("http://onlinecafeteria.com//cart.html")
    await driver.setRect(791, 824)
    await driver.findElement(By.css("div:nth-child(6) .btn-default")).click()
  })
})
