/**
 * test/index.js
 * Ensures our code lints correctly
 */

const eslint = require('eslint')
const path = require('path')
const test = require('ava')

function lint (t, file) {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  })

  const result = cli.executeOnFiles([file])

  result.results.map((res) => res.messages.forEach(t.log))

  t.is(result.errorCount, 0, 'Non 0 error count')
  t.is(result.warningCount, 0, 'Non 0 warning count')
}

test('lints javascript files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixture.js'))
})

test('lints vue files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixture.vue'))
})
