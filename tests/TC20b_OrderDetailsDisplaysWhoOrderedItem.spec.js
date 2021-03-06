// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC20b - Order details displays who ordered item', function() {
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
  it('TC20b - Order details displays who ordered item', async function() {
    await driver.get("http://onlinecafeteria.com/cart.html")
    await driver.findElement(By.id("SeeAllOrdersBtn")).click()
    await driver.findElement(By.linkText("View Order")).click()
    await driver.sleep(2000)
    {
      const elements = await driver.findElements(By.xpath("//b[contains(.,\'Contact Name:\')]"))
      assert(elements.length)
    }
  })
})
