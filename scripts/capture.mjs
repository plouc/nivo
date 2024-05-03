#!/usr/bin/env node
import Path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import puppeteer from 'puppeteer'
import chalk from 'chalk-template'
import _ from 'lodash'
import config from '@ekino/config'

const HEADLESS = 'new' // 'new'
const DEFAULT_FLAVOR = 'svg'
const CHART_SELECTOR = '#chart'
const VIEWPORT = {
    chart: { width: 1400, height: 900 },
    icons: { width: 1400, height: 4000 },
    homeDemos: { width: 1800, height: 6000 },
}
const ICON_VARIANTS = ['light-neutral', 'light-colored', 'dark-neutral', 'dark-colored']

const projectDir = process.cwd()
const websiteDir = Path.join(projectDir, 'website')
const websiteCapturesDir = Path.join(websiteDir, 'src', 'assets', 'captures')
const websiteIconsDir = Path.join(websiteDir, 'src', 'assets', 'icons')
const websiteHomeDemosDir = Path.join(websiteCapturesDir, 'home')
const websitePagesDir = Path.join(websiteCapturesDir, 'pages')
const getChartFileName = (chart, flavor) =>
    `${chart}${flavor !== DEFAULT_FLAVOR ? `-${flavor}` : ''}.png`
const getChartWebsiteFilePath = (chart, flavor) =>
    Path.join(websiteCapturesDir, getChartFileName(chart, flavor))
const getChartUrl = (baseUrl, chart, flavor) => {
    const chunks = [baseUrl, chart]
    if (flavor !== DEFAULT_FLAVOR) {
        chunks.push(flavor)
    }

    return `${Path.join(...chunks)}/?capture=1`
}
const getChartIconFilePath = (chart, variant) =>
    Path.join(websiteIconsDir, `${chart}-${variant}.png`)
const getHomeDemoFilePath = id => Path.join(websiteHomeDemosDir, `${id}.png`)
const getPageUrl = path => `${Path.join(config.get('baseUrl'), path)}/?capture=1`
const getPageFilePath = id => Path.join(websitePagesDir, `${id}.png`)

const allPackages = _.uniq(config.get('capture.charts').map(chart => chart.pkg))
const allCharts = config.get('capture.charts')

const delay = time =>
    new Promise(resolve => {
        setTimeout(resolve, time)
    })

const captureChart = async (baseUrl, page, { pkg, chart, flavor, theme }) => {
    const url = getChartUrl(baseUrl, chart, flavor)

    console.log(
        chalk`{yellow Capturing chart {white ${chart}}} {dim (package: @nivo/${pkg}, flavor: ${flavor}, url: ${url})}`
    )

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

    const websiteFilePath = getChartWebsiteFilePath(chart, flavor)
    const clip = await element.boundingBox()

    await page.screenshot({
        path: websiteFilePath,
        clip,
        omitBackground: true,
    })

    console.log(chalk`{green saved to {white ${websiteFilePath}}}`)
    console.log('')
}

const captureCharts = async ({ baseUrl, packages }) => {
    const charts = allCharts.filter(chart => packages.includes(chart.pkg))

    console.log(chalk`{yellow Starting capture for ${charts.length} chart(s)}`)
    console.log('')

    try {
        const browser = await puppeteer.launch({
            headless: HEADLESS,
        })
        const page = await browser.newPage()

        for (let chart of charts) {
            for (let flavor of chart.flavors) {
                await captureChart(baseUrl, page, { ...chart, flavor })
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

const captureIcons = async ({ baseUrl, packages }) => {
    const icons = allCharts.filter(chart => packages.includes(chart.pkg)).map(chart => chart.chart)

    const iconsUrl = `${Path.join(baseUrl, 'internal', 'icons')}/?capture=1`
    console.log(
        chalk`{yellow Starting capture for ${icons.length} chart icon(s)} {dim url: ${iconsUrl}}`
    )

    try {
        const browser = await puppeteer.launch({
            headless: HEADLESS,
        })
        const page = await browser.newPage()
        await page.setViewport(VIEWPORT.icons)
        await page.goto(iconsUrl)

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
        await page.goto(`${Path.join(config.get('baseUrl'), 'internal', 'home-demos')}/?capture=1`)

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

            console.log(
                chalk`{yellow Capturing page {white ${pageConfig.id}}} {dim (url: ${url}, selector: ${selector})}`
            )

            await page.setViewport({
                width: pageConfig.viewport[0],
                height: pageConfig.viewport[1],
            })
            await page.goto(url)

            await page.waitForSelector(selector)
            const element = await page.$(selector)
            if (element === null) {
                throw new Error(
                    `Unable to find element matching selector: ${selector} (url: ${url})`
                )
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
    // const argv = yargs(hideBin(process.argv)).parse()

    // console.log(argv)
    // await capturePages()
    // await captureHomeDemos()

    yargs(hideBin(process.argv))
        .command(
            'all',
            'capture everything',
            yargs => {
                return yargs
            },
            async argv => {
                await captureIcons({
                    baseUrl: argv.baseUrl,
                    packages: argv.pkg,
                })
                await captureCharts({
                    baseUrl: argv.baseUrl,
                    packages: argv.pkg,
                })
            }
        )
        .command(
            'icons',
            'capture icons for the website',
            yargs => {
                return yargs
            },
            async argv => {
                await captureIcons({
                    baseUrl: argv.baseUrl,
                    packages: argv.pkg,
                })
            }
        )
        .command(
            'charts',
            'capture charts for package readmes',
            yargs => {
                return yargs
            },
            async argv => {
                await captureCharts({
                    baseUrl: argv.baseUrl,
                    packages: argv.pkg,
                })
            }
        )
        .command(
            'home',
            'capture charts for the website home page',
            yargs => {
                return yargs.positional('port', {
                    describe: 'port to bind on',
                    default: 5000,
                })
            },
            argv => {
                if (argv.verbose) console.info(`start server on :${argv.port}`)
                serve(argv.port)
            }
        )
        .option('baseUrl', {
            alias: 'u',
            type: 'string',
            default: config.get('baseUrl'),
        })
        .option('pkg', {
            alias: 'p',
            describe: 'only capture icons for specific packages',
            choices: allPackages,
            default: allPackages,
        })
        .coerce('pkg', arg => {
            if (Array.isArray(arg)) return arg
            return [arg]
        })
        .demandCommand(1)
        .parse()
}

run()
