// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('TC9 - Email Receipt', function() {
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
  it('TC9 - Email Receipt', async function() {
    await driver.get("http://onlinecafeteria.com/order_confirmation.html")
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("rosa.ciummo3@gmail.com")
    await driver.findElement(By.id("send")).click()
    await driver.wait(until.elementLocated(By.xpath("//input[@value=\'Edit cart\']")), 3000)
  })
})
