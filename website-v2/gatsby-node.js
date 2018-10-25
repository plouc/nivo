const yaml = require('js-yaml')
const fs = require('fs')
const path = require(`path`)
const remark = require('remark')
const remarkHtml = require('remark-html')

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

const markdown = remark().use(remarkHtml)
const toMarkdown = async raw => new Promise((resolve, reject) => {
    remark().use(remarkHtml).process(raw, (err, file) => {
        if (err) reject(err)
        else resolve(String(file))
    })
})

exports.onCreateNode = async ({ node, actions }) => {
    const { createNode, createNodeField } = actions
    if (node.internal && node.internal.type === 'PropsYaml') {
        node.crap = true
        for (let i = 0; i < node.props.length; i++) {
            const prop = node.props[i]
            if (prop.description) {
                prop.description = await toMarkdown(prop.description)
            }
        }
    }
    if (node.internal && node.internal.type === 'ComponentsYaml') {
        if (node.description) {
            node.description = await toMarkdown(node.description)
        }
    }
}
