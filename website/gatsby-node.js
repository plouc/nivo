const replacePath = (_path) =>
    _path === `/` ? _path : _path.replace(/\/$|$/, `/`)

const excludedPaths = [`/404.html`]

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage, deletePage } = actions

    return new Promise(resolve => {
        if(!excludedPaths.includes(page.path)) {
            const oldPage = Object.assign({}, page)
            page.path = replacePath(page.path)
            if (page.path !== oldPage.path) {
                deletePage(oldPage)
                createPage(page)
            }
        }

        resolve()
    })
}
