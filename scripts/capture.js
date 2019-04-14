const puppeteer = require('puppeteer')
const chalk = require('chalk')
const config = require('@ekino/config')

const capture = async (page, baseUrl, { path, selector, output, theme }) => {
    const url = `${baseUrl}${path}?capture=1`

    console.log(chalk`{yellow Capturing {white ${path}}} {dim (selector: ${selector})}`)

    if (path.indexOf('/icons') !== -1) {
        await page.setViewport({ width: 1400, height: 4000 })
    } else {
        await page.setViewport({ width: 1400, height: 900 })
    }

    await page.goto(url)

    if (theme !== undefined) {
        const themeSelector = `#${theme}Theme`
        await page.waitFor(themeSelector)
        await page.click(themeSelector)
    }

    await page.waitFor(selector)
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
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()

        for (let pageConfig of config.pages) {
            await capture(page, config.baseUrl, pageConfig)
        }

        await browser.close()

        console.log(chalk`  {green done!}`)
    } catch (error) {
        console.log('')
        console.error(chalk`{red oops, something went wrong :(}`)
        console.error(error)

        process.exit(1)
    }
}

captureAll(config.get('capture'))