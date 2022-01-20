export const forceDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
}

export const getSvgElement = (element: HTMLElement) =>
    element.tagName.toLowerCase() === 'svg'
        ? (element as unknown as SVGSVGElement)
        : element.querySelector('svg')

export const createSvgUrl = (svg: SVGElement): [url: string, release: () => void] => {
    const serializedSvg = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([serializedSvg], {
        type: 'image/svg+xml;charset=utf-8',
    })

    const url = URL.createObjectURL(svgBlob)
    const release = () => {
        URL.revokeObjectURL(url)
    }

    return [url, release]
}

export const exportSvgToSvg = (svg: SVGElement, name: string) => {
    const [url, release] = createSvgUrl(svg)
    forceDownload(url, `${name}.svg`)
    release()
}

export const exportCanvas = (canvas: HTMLCanvasElement, name: string, format = 'png') => {
    const dataUrl = canvas.toDataURL(`image/${format}`)
    forceDownload(dataUrl, `${name}.${format}`)
}

export const exportSvgToImage = (svg: SVGElement, name: string, format = 'png', dpr = 2) => {
    const [url, release] = createSvgUrl(svg)

    const canvas = document.createElement('canvas')
    canvas.height = svg.clientHeight * dpr
    canvas.width = svg.clientWidth * dpr

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    const img = new Image()
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
        exportCanvas(canvas, name, format)
        release()
    }
    img.src = url
}
