const yaml = require('js-yaml')
const fs = require('fs')
const path = require(`path`)
const nav = yaml.safeLoad(fs.readFileSync('./src/constants/nav.yml', 'utf8'))

exports.createPages = async ({ actions }) => {
    const { createPage } = actions

    nav.forEach(item => {
        if (item.type === 'package') {
            item.children.forEach((child, i) => {
                let pagePath = `/${item.id}`
                if (i > 0) {
                    pagePath += `/${child.id}`
                }

                let template = 'Chart'
                if (item.id === 'api') {
                    template = 'Api'
                }


                createPage({
                    path: pagePath,
                    component: path.resolve(`./src/templates/${template}Template.js`),
                    context: {
                        package: item.id,
                        component_id: child.id,
                        props_id: child.props_id,
                        data_key: child.data_key,
                    },
                })
            })
        }
    })
}
