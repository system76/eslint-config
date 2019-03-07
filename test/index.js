/**
 * test/index.js
 * Ensures our code lints correctly
 */

const eslint = require('eslint')
const path = require('path')
const test = require('ava')

function lint (file) {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: '.eslintrc.yml'
  })

  const result = cli.executeOnFiles([file])

  if (result.errorCount > 0 || result.warningCount > 0) {
    throw new Error(`${result.errorCount} error/s and ${result.warningCount} warnings/s`)
  } else {
    return result
  }
}

test('lints javascript files correctly', (t) => {
  return t.notThrows(() => lint(path.join(__dirname, '_fixture.js')))
})

test('lints vue files correctly', (t) => {
  return t.notThrows(() => lint(path.join(__dirname, '_fixture.vue')))
})
