// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC5 - View cart', function() {
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
  it('TC5 - View cart', async function() {
    await driver.get("http://onlinecafeteria.com//cart.html")
    assert(await driver.findElement(By.css("li")).getText() == "Item: Pizza\\\\nQuantity: 1")
  })
})
