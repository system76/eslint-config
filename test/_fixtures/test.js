/**
 * test/_fixtures/test.js
 * Tests Ava rules
 */

// eslint-disable-next-line
import test from 'ava'

import { setMeta } from '../../../utility/meta'

test('sets the page title', (t) => {
  const output = setMeta({ title: 'test' })

  t.is(output.title, 'test')
})

test('sets the itemprop name', (t) => {
  const output = setMeta({ title: 'test' })

  const title = output.meta.find(m => (m.itemprop === 'name'))
  t.truthy(title)
  t.is(title.content, 'test')
})

test('sets the twitter title', (t) => {
  const output = setMeta({ title: 'test' })

  const title = output.meta.find(m => (m.name === 'twitter:title'))
  t.truthy(title)
  t.is(title.content, 'test')
})

test('sets the og title', (t) => {
  const output = setMeta({ title: 'test' })

  const title = output.meta.find(m => (m.property === 'og:title'))
  t.truthy(title)
  t.is(title.content, 'test')
})

test('sets the description', (t) => {
  const output = setMeta({ description: 'test' })

  const description = output.meta.find(m => (m.name === 'description'))
  t.truthy(description)
  t.is(description.content, 'test')
})

test('sets the itemprop description', (t) => {
  const output = setMeta({ description: 'test' })

  const description = output.meta.find(m => (m.itemprop === 'description'))
  t.truthy(description)
  t.is(description.content, 'test')
})

test('sets the twitter description', (t) => {
  const output = setMeta({ description: 'test' })

  const description = output.meta.find(m => (m.name === 'twitter:description'))
  t.truthy(description)
  t.is(description.content, 'test')
})

test('sets the og description', (t) => {
  const output = setMeta({ description: 'test' })

  const description = output.meta.find(m => (m.property === 'og:description'))
  t.truthy(description)
  t.is(description.content, 'test')
})

test('sets the itemprop image', (t) => {
  const output = setMeta({ image: 'test' })

  const image = output.meta.find(m => (m.itemprop === 'image'))
  t.truthy(image)
  t.is(image.content, 'test')
})

test('sets the twitter image', (t) => {
  const output = setMeta({ image: 'test' })

  const image = output.meta.find(m => (m.name === 'twitter:image:src'))
  t.truthy(image)
  t.is(image.content, 'test')
})

test('sets the og image', (t) => {
  const output = setMeta({ image: 'test' })

  const image = output.meta.find(m => (m.property === 'og:image'))
  t.truthy(image)
  t.is(image.content, 'test')
})

test('sets the theme-color', (t) => {
  const output = setMeta({ color: '#000' })

  const color = output.meta.find(m => (m.name === 'theme-color'))
  t.truthy(color)
  t.is(color.content, '#000')
})

test('merges given meta fields', (t) => {
  const output = setMeta({
    title: 'test',
    meta: [
      { hid: 'test', name: 'test', content: 'test' }
    ]
  })

  t.truthy(output.meta.find(m => (m.hid === 'test')))
})

test('merges given top level fields', (t) => {
  const output = setMeta({
    title: 'test',
    test: 'value'
  })

  t.is(output.test, 'value')
})
