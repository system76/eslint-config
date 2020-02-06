/**
 * test/index.js
 * Ensures our code lints correctly
 */

const test = require('ava')
const eslint = require('eslint')
const path = require('path')

const IGNORED_RULES = [
  // Impossible to test these ava rules in an ava test...
  'ava/no-ignored-test-files',
  'ava/no-import-test-files'
]

function lint (file) {
  const cli = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  })

  const results = cli.executeOnFiles([file]).results[0].messages
    .filter((res) => !IGNORED_RULES.includes(res.ruleId))

  return results
}

function successfulLint(t, results) {
  const errors = results.filter((res) => (res.severity === 2))
  const warnings = results.filter((res) => (res.severity === 1))

  t.deepEqual(errors, [], 'Non 0 error count')
  t.deepEqual(warnings, [], 'Non 0 warning count')
}

function lintIncludesError(t, results, rule, line) {
  const matchingErrors = results
    .filter((res) => (res.ruleId === rule))
    .filter((res) => (line != null) ? (res.line === line) : true)

  t.notDeepEqual(matchingErrors, [], 'No matching errors found')
}

test('lints javascript files correctly', (t) => {
  successfulLint(t, lint(path.join(__dirname, '_fixtures/file.js')))
})

test('lints vue files correctly', (t) => {
  successfulLint(t, lint(path.join(__dirname, '_fixtures/file.vue')))
})

test('detects vue file script indentation', (t) => {
  const results = lint(path.join(__dirname, '_fixtures/error.vue'))
  lintIncludesError(t, results, 'vue/script-indent', 114)
})

test('detects vue file template indentation', (t) => {
  const results = lint(path.join(__dirname, '_fixtures/error.vue'))
  lintIncludesError(t, results, 'vue/html-indent', 7)
})

test('sorts import lines correctly', (t) => {
  successfulLint(t, lint(path.join(__dirname, '_fixtures/files.js')))
})

test('lints Ava test files correctly', (t) => {
  successfulLint(t, lint(path.join(__dirname, '_fixtures/test.js')))
})
