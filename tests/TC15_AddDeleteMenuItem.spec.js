// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC15 - Add/Delete Menu Item', function() {
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
  it('TC15 - Add/Delete Menu Item', async function() {
    await driver.get("http://onlinecafeteria.com/place_order.html")
    await driver.findElement(By.id("admin")).click()
    await driver.findElement(By.xpath("//input[@value=\'Add menu item\']")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("ItemToDelete")
    await driver.findElement(By.id("price")).click()
    await driver.findElement(By.id("price")).sendKeys("20")
    await driver.findElement(By.id("SubmitNewItemBtn")).click()
    await driver.findElement(By.id("delete50")).click()
    await driver.sleep(2000)
    {
      const elements = await driver.findElements(By.id("delete50"))
      assert(!elements.length)
    }
  })
})
