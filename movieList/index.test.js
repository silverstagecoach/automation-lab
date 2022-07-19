const { Builder, Capabilities, By } = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get(`http://127.0.0.1:5501/movieList/index.html`)
})

afterAll(async () => {
    await driver.quit()
})

describe('add and remove movies from the list, and cross off a movie', () => {


    test('type in the input field', async () => {
        const inputField = await driver.findElement(By.xpath('//input'))
        const inputText = "Harry Potter and the Sorcerer's Stone"
        await inputField.sendKeys(inputText)
        await driver.sleep(1000)
        const inputField1 = await driver.findElement(By.xpath('//input')).getAttribute('value')
        expect(inputField1).toBe(inputText)
    });

    test('add movie to list using button', async () => {
        const inputText = "Harry Potter and the Sorcerer's Stone"
        const acceptButton = await driver.findElement(By.css('button'))

        await acceptButton.click()
        await driver.sleep(1000)
        const checkMovie = await driver.findElement(By.css('span')).getText();

        expect(checkMovie).toBe(inputText)
    });

    test('cross off a movie from the list', async () => {
        const crossOffMovie = await driver.findElement(By.xpath('//span'))
        await crossOffMovie.click()
        const crossOffCheck = await driver.findElement(By.xpath('//span')).getCssValue('class')
        await driver.sleep(1000)
        expect(crossOffCheck).toBe('checked')
    })
    
    test('uncross off a movie from the list', async () => {
        const crossOffMovie = await driver.findElement(By.xpath('//body/main/ul/li/span'))
        await crossOffMovie.click()
        await driver.sleep(1000)
        expect(crossOffMovie.class).toBe(undefined)
    })

    test('delete movie from list', async () => {
        const inputText = "Harry Potter and the Sorcerer's Stone"
        const crossOffMovie = await driver.findElement(By.xpath('//body/main/ul/li/span'))
        const deleteButton = await driver.findElement(By.css('#' + inputText))

        await deleteButton.click()
        await driver.sleep(1000)
        expect(crossOffMovie).toBe(undefined)
    });
});