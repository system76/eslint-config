/**
 * test/index.js
 * Ensures our code lints correctly
 */

const eslint = require('eslint')
const path = require('path')
const test = require('ava')

const IGNORED_RULES = [
  // Some Ava rules are impossible to test in tests
  'ava/no-ignored-test-files',
  'ava/no-import-test-files'
]

function lint (t, file) {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  })

  const results = cli.executeOnFiles([file]).results[0].messages
    .filter((result) => !IGNORED_RULES.includes(result.ruleId))

  t.log(results)

  const errors = results.filter((res) => res.severity === 2)
  const warnings = results.filter((res) => res.severity === 1)

  t.deepEqual(errors, [], 'Non 0 error count')
  t.deepEqual(errors, [], 'Non 0 warning count')
}

test('lints javascript files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixtures/file.js'))
})

test('lints ava test files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixtures/test.js'))
})

test('lints vue files correctly', (t) => {
  return lint(t, path.join(__dirname, '_fixtures/file.vue'))
})
