/**
 * test/index.js
 * Ensures our code lints correctly
 */

const test = require('ava')
const eslint = require('eslint')
const path = require('path')

const IGNORED_RULES = [
  // Impossible to test these ava rules in an ava test...
  'ava/no-import-test-files'
]

function lint (t, file) {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  })

  const results = cli.executeOnFiles([file]).results[0].messages
    .filter((res) => !IGNORED_RULES.includes(res.ruleId))

  t.log(results)

  const errors = results.filter((res) => (res.severity === 2))
  const warnings = results.filter((res) => (res.severity === 1))

  t.deepEqual(errors, [], 'Non 0 error count')
  t.deepEqual(warnings, [], 'Non 0 warning count')
}

test('lints javascript files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixtures/file.js'))
})

test('lints vue files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixtures/file.vue'))
})
