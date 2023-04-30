import Path from 'path'
import fs from 'fs/promises'
import puppeteer from 'puppeteer'
import chalk from 'chalk-template'
import _ from 'lodash'
import config from '@ekino/config'

const HEADLESS = false // 'new'
const DEFAULT_FLAVOR = 'svg'
const CHART_SELECTOR = '#chart'
const VIEWPORT = {
    chart: { width: 1400, height: 900 },
    icons: { width: 1400, height: 4000 },
    homeDemos: { width: 1800, height: 6000 },
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
const websiteHomeDemosDir = Path.join(websiteCapturesDir, 'home')
const websitePagesDir = Path.join(websiteCapturesDir, 'pages')
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
const getHomeDemoFilePath = (id) => Path.join(websiteHomeDemosDir, `${id}.png`)
const getPageUrl = (path) => {
    return `${Path.join(config.get('baseUrl'), path)}/?capture=1`
}
const getPageFilePath = (id) => Path.join(websitePagesDir, `${id}.png`)

const delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time)
})

const captureChart = async (page, { pkg, chart, flavor, theme }) => {
    const url = getChartUrl(chart, flavor)

    console.log(chalk`{yellow Capturing chart {white ${chart}}} {dim (package: @nivo/${pkg}, flavor: ${flavor}, url: ${url})}`)

    await page.setViewport(VIEWPORT.chart)
    await page.goto(url)

    if (theme !== undefined) {
        console.log(chalk`{dim changing theme to: ${theme}}`)
        const themeSelector = `#${theme}Theme`
        await page.waitForSelector(themeSelector)
        await page.click(themeSelector)
    }

    await page.waitForSelector(CHART_SELECTOR)
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
            headless: HEADLESS,
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
            headless: HEADLESS,
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

                await page.waitForSelector(selector)
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

const captureHomeDemos = async () => {
    const demos = config.get('capture').home

    console.log(chalk`{yellow Starting capture for ${demos.length} demo(s)}`)
    console.log('')

    try {
        const browser = await puppeteer.launch({
            headless: HEADLESS,
        })
        const page = await browser.newPage()
        await page.setViewport(VIEWPORT.homeDemos)
        await page.goto(`${Path.join(
            config.get('baseUrl'),
            'internal',
            'home-demos'
        )}/?capture=1`)

        for (let demo of demos) {
            console.log(chalk`{yellow Capturing {white ${demo.id}} demo}`)
            const selector = `#${demo.id}`
            console.log(chalk`{dim selector: ${selector}}`)

            await page.waitForSelector(selector)
            const element = await page.$(selector)
            if (element === null) {
                throw new Error(`Unable to find element matching selector: ${selector}`)
            }

            const demoFilePath = getHomeDemoFilePath(demo.id)
            const clip = await element.boundingBox()
            await page.screenshot({
                path: demoFilePath,
                clip,
                omitBackground: true,
            })

            console.log(chalk`{green saved to {white ${demoFilePath}}}`)
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

const capturePages = async () => {
    const pages = config.get('capture').pages

    console.log(chalk`{yellow Starting capture for ${pages.length} page(s)}`)
    console.log('')

    try {
        const browser = await puppeteer.launch({
            headless: HEADLESS,
        })
        const page = await browser.newPage()

        for (let pageConfig of pages) {
            const url = getPageUrl(pageConfig.path)
            const selector = pageConfig.selector

            console.log(chalk`{yellow Capturing page {white ${pageConfig.id}}} {dim (url: ${url}, selector: ${selector})}`)

            await page.setViewport({
                width: pageConfig.viewport[0],
                height: pageConfig.viewport[1],
            })
            await page.goto(url)

            await page.waitForSelector(selector)
            const element = await page.$(selector)
            if (element === null) {
                throw new Error(`Unable to find element matching selector: ${selector} (url: ${url})`)
            }

            const clip = await element.boundingBox()
            const pageFilePath = getPageFilePath(pageConfig.id)

            await page.screenshot({
                path: pageFilePath,
                clip,
                omitBackground: true,
            })

            console.log(chalk`{green saved to {white ${pageFilePath}}}`)
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

const run = async () => {
    await capturePages()
    await captureHomeDemos()
    await captureCharts()
    await captureIcons()
}

run()
