// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC6 - Remove pizza from a cart', function() {
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
  it('TC6 - Remove pizza from a cart', async function() {
    await driver.get("http://onlinecafeteria.com//cart.html")
    await driver.setRect(791, 824)
    await driver.findElement(By.css("div:nth-child(3) .btn-default")).click()
    await driver.findElement(By.xpath("//ul[@id=\'cart\']/li/input")).click()
    {
      const elements = await driver.findElements(By.xpath("//li[contains(.,\'Item: Pizza\nQuantity: 1\n\n\')]"))
      assert(!elements.length)
    }
  })
})
