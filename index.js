#!/usr/bin/env node

import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'

import { argv } from 'node:process'
import { readFileSync } from 'node:fs'
import { createGist, updateGist , getGists, getOrCreateGist, getUsername } from './gist.js'

const token = argv[2]
const file = argv[3]

const loginName = await getUsername(token)

const id = await getOrCreateGist(token, file)

const gistUrl = `https://gist.github.com/${loginName}/${id}`

const doc = readFileSync(file)
const ast = fromMarkdown(doc)

const transformType = (type, cb) => all => {
  if (all.type === type) return cb(all)
  else return all
}

const headingMaxDepth = transformType('heading', all => {
  if (all.depth > 2) all.depth = 2

  return all
})
let counter = 0
const createCodeName = lang => `code-${++counter}.${lang}`

const codeFiles = {}

const codeToGist = transformType('code', all => {
  const name = createCodeName(all.lang)

  codeFiles[name] = { content: all.value }

  return fromMarkdown(`${gistUrl}.js?file=${name}`)
    .children[0]
})

const firstHeadingIndex = ast.children.findIndex(
  ({ type, depth }) => type === 'heading' && depth === 1
)

const [heading] = ast.children.splice(firstHeadingIndex, 1)

const title = heading.children[0].value

ast.children = ast.children.map(headingMaxDepth).map(codeToGist)

await updateGist(token, id, title, {
  [file]: { content: toMarkdown(ast) },
  ...codeFiles
})
console.log('Successfully created gist, this url can be imported into medium.com:\n', gistUrl)
