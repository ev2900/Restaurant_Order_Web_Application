// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC17 - See all orders being cooked', function() {
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
  it('TC17 - See all orders being cooked', async function() {
    await driver.get("http://onlinecafeteria.com/")
    await driver.get("http://onlinecafeteria.com/cooking_orders.html")
    await driver.sleep(2000)
    {
      const elements = await driver.findElements(By.xpath("//td[contains(.,\'Cooking\')]"))
      assert(elements.length)
    }
  })
})