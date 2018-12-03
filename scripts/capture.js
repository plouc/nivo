const puppeteer = require('puppeteer')
const chalk = require('chalk')
const config = require('@ekino/config')

const capture = async (browser, baseUrl, { path, selector, output }) => {
    const url = `${baseUrl}${path}?capture=1`

    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 4000 })

    console.log(chalk`{yellow Capturing {white ${path}}} {dim (selector: ${selector})}`)

    await page.goto(url)

    const element = await page.$(selector)
    if (element === null) {
        throw new Error(`Unable to find element matching selector: '${selector}' (url: ${url})`)
    }

    const clip = await element.boundingBox()

    await page.screenshot({
        path: output,
        clip,
        omitBackground: true,
    })

    console.log(chalk`  {green saved to {white ${output}}}`)
    console.log('')
}

const captureAll = async config => {
    console.log(chalk`{yellow Starting capture for ${config.pages.length} page(s)}`)
    console.log(chalk`  {dim baseUrl:   {white ${config.baseUrl}}}`)
    console.log('')

    try {
        const browser = await puppeteer.launch()
        for (let pageConfig of config.pages) {
            await capture(browser, config.baseUrl, pageConfig)
        }

        await browser.close()

        console.log(chalk`  {green done!}`)
    } catch (error) {
        console.log('')
        console.error(chalk`{red oops, something went wrong :(}`)

        throw error
    }
}

captureAll(config.get('capture'))