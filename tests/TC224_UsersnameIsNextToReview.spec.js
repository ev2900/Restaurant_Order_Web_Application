// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC22.4 - Users name is next to review', function() {
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
  it('TC22.4 - Users name is next to review', async function() {
    await driver.get("http://onlinecafeteria.com/place_order.html")
    await driver.findElement(By.id("review 57")).click()
    await driver.sleep(3000)
    {
      const elements = await driver.findElements(By.xpath("//li[contains(.,\'Vanilla Ice says,\')]"))
      assert(elements.length)
    }
  })
})
