// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC_2.0', function() {
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
  it('TC_2.0', async function() {
    await driver.get("http://70.37.77.126/cart.html")
    await driver.setRect(887, 824)
    await driver.findElement(By.css("div:nth-child(3) .btn-default")).click()
    await driver.findElement(By.xpath("//li[2]/input")).click()
    await driver.sleep(3)
    {
      const elements = await driver.findElements(By.css("li:nth-child(2)"))
      assert(!elements.length)
    }
  })
})
