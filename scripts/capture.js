const Path = require('path')
const fs = require('fs/promises')
const puppeteer = require('puppeteer')
const chalk = require('chalk')
const _ = require('lodash')
const config = require('@ekino/config')

const DEFAULT_FLAVOR = 'svg'
const CHART_SELECTOR = '#chart'
const VIEWPORT = {
    chart: { width: 1400, height: 900 },
    icons: { width: 1400, height: 4000 },
}
const ICON_VARIANTS = [
    'light-neutral',
    'light-colored',
    'dark-neutral',
    'dark-colored',
]

const projectDir = process.cwd()
const websiteDir = Path.join(projectDir, 'website')
const websiteCapturesDir = Path.join(websiteDir, 'src', 'assets', 'captures')
const websiteIconsDir = Path.join(websiteDir, 'src', 'assets', 'icons')
const getChartFileName = (chart, flavor) => `${chart}${flavor !== DEFAULT_FLAVOR ? `-${flavor}` : ''}.png`
const getChartWebsiteFilePath = (chart, flavor) => Path.join(
    websiteCapturesDir,
    getChartFileName(chart, flavor)
)
const getChartUrl = (chart, flavor) => {
    const baseUrl = config.get('baseUrl')

    const chunks = [baseUrl, chart]
    if (flavor !== DEFAULT_FLAVOR) {
        chunks.push(flavor)
    }

    return `${Path.join(...chunks)}/?capture=1`
}
const getChartIconFilePath = (chart, variant) => Path.join(
    websiteIconsDir,
    `${chart}-${variant}.png`
)


const captureChart = async (page, { pkg, chart, flavor, theme }) => {
    const url = getChartUrl(chart, flavor)

    console.log(chalk`{yellow Capturing chart {white ${chart}}} {dim (package: @nivo/${pkg}, flavor: ${flavor}, url: ${url})}`)

    await page.setViewport(VIEWPORT.chart)
    await page.goto(url)

    if (theme !== undefined) {
        console.log(chalk`{dim changing theme to: ${theme}}`)
        const themeSelector = `#${theme}Theme`
        await page.waitFor(themeSelector)
        await page.click(themeSelector)
    }

    await page.waitFor(CHART_SELECTOR)
    const element = await page.$(CHART_SELECTOR)
    if (element === null) {
        throw new Error(`Unable to find element matching selector: ${CHART_SELECTOR} (url: ${url})`)
    }

    const clip = await element.boundingBox()

    const websiteFilePath = getChartWebsiteFilePath(chart, flavor)

    // initially saved to the package doc dir
    await page.screenshot({
        path: websiteFilePath,
        clip,
        omitBackground: true,
    })

    // also save a copy in the website, for social images
    await fs.copyFile(docFilePath, websiteFilePath)

    console.log(chalk`{green saved to {white ${websiteFilePath}}}`)
    console.log('')
}

const captureCharts = async () => {
    const charts = config.get('capture').charts

    console.log(chalk`{yellow Starting capture for ${charts.length} chart(s)}`)
    console.log('')

    try {
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()

        for (let chart of charts) {
            for (let flavor of chart.flavors) {
                await captureChart(page, { ...chart, flavor })
            }
        }

        await browser.close()

        console.log(chalk`{green Done!}`)
    } catch (error) {
        console.log('')
        console.error(chalk`{red oops, something went wrong :(}`)
        console.error(error)

        process.exit(1)
    }
}

const captureIcons = async () => {
    const charts = config.get('capture').charts
    const icons = charts.map(chart => chart.chart)

    console.log(chalk`{yellow Starting capture for ${icons.length} chart icon(s)}`)
    console.log('')

    try {
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
        await page.setViewport(VIEWPORT.icons)
        await page.goto(`${Path.join(
            config.get('baseUrl'),
            'internal',
            'icons'
        )}/`)

        for (let icon of icons) {
            console.log(chalk`{yellow Capturing {white ${icon}} chart icons}`)
            for (let variant of ICON_VARIANTS) {
                const selector = `#${icon}-${_.camelCase(variant)}`
                console.log(chalk`{dim variant: ${variant}, selector: ${selector}}`)

                await page.waitFor(selector)
                const element = await page.$(selector)
                if (element === null) {
                    throw new Error(`Unable to find element matching selector: ${selector}`)
                }

                const iconFilePath = getChartIconFilePath(icon, variant)
                const clip = await element.boundingBox()
                await page.screenshot({
                    path: iconFilePath,
                    clip,
                    omitBackground: true,
                })

                console.log(chalk`{green saved to {white ${iconFilePath}}}`)
            }
            console.log('')
        }

        await browser.close()

        console.log(chalk`{green Done!}`)
    } catch (error) {
        console.log('')
        console.error(chalk`{red oops, something went wrong :(}`)
        console.error(error)

        process.exit(1)
    }
}

const captureAll = async () => {
    await captureCharts()
    await captureIcons()
}

captureAll()