/**
 * test/_fixtures/files.js
 * Test file sort order
 */

import test from 'ava'
import express from 'express'
import zooloo from 'zooloo'

import { Component1, Component2 } from '@system76/components'
import lint from '@system76/standard'

import config from '~/config'
import { Mixin1, Mixin2 } from '~/mixins'

import local from '../../local'

// Export everything so we don't get unused variable errors
export {
  test,
  express,
  zooloo,
  Component1,
  Component2,
  lint,
  config,
  Mixin1,
  Mixin2,
  local
}
