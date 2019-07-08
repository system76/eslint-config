/**
 * test/_fixtures/file.js
 * A basic cast and dump based on schema utility. Used in the store and in a
 * couple of other places to persist data locally. Copied from tachi.
 *
 * Every cast and dump function expects an object schema to use as reference.
 * This schema should look like one of the examples or a mix between them:
 *
 * @example ```
 *   const schema = {
 *     dump: {
 *       key: String
 *     }
 *   }
 * ```
 *
 * @example ```
 *   const schema = {
 *     defaults: (obj) => ({
 *       key: 'value'
 *     })
 *   }
 * ```
 *
 * @example ```
 *   const schema = {
 *     cast: (obj) => ({
 *       key: (originalKey) => 'newKey'
 *     })
 *   }
 * ```
 */

/**
 * These are the default options for casting and dumping.
 *
 * @var {String} [builtinPrefix] Any key started with this will be considered an
 *                               "internal" key. Any "internal" key will be
 *                               persisted between casts and dumps.
 *
 * @var {Boolean} [strict] If set to true, we only return the keys in the
 *                         schema. This will drop all "internal" keys as well.
 */
const DEFAULT_OPTS = {
  builtinPrefix: '$',
  strict: false
}

// TODO: This is a pollyfill of `Object.fromEntries`. Replace after babel update
function fromEntries (entries) {
  const obj = {}

  entries.forEach(([k, v]) => {
    obj[k] = v
  })

  return obj
}

function resolve (value, ...params) {
  if (typeof value === 'function') {
    return resolve(value(...params))
  } else {
    return value
  }
}

function resolvePath (path, value, paramGroups = []) {
  const [parentPath, ...childrenPath] = (path || '').split('.')
  const [parentParams = [], ...childrenParams] = paramGroups

  if (parentPath === '') {
    return resolve(value, ...parentParams)
  } else if (value && value[parentPath]) {
    const resolvedValue = resolve(value[parentPath], parentParams)
    return resolvePath(childrenPath.join('.'), resolvedValue, childrenParams)
  } else if (typeof value === 'function') {
    const resolvedValue = resolve(value, parentParams)
    return resolvePath(path, resolvedValue, childrenParams)
  } else {
    return null
  }
}

function resolveObject (obj, value) {
  if (obj != null && value != null) {
    const keys = [...Object.keys(obj), ...Object.keys(value)]
      .filter((v, i, a) => (a.indexOf(v) === i))
      .sort()

    const entries = keys.map((k) => {
      if (value[k] != null) {
        return [k, resolve(value[k], obj[k])]
      } else {
        return [k, obj[k]]
      }
    })

    return fromEntries(entries)
  } else {
    return {}
  }
}

function builtinEntries (obj, options) {
  return Object.entries(obj)
    .filter(([key]) => (typeof key === 'string'))
    .filter(([key]) => key.startsWith(options.builtinPrefix))
}

function strictFilter (path, obj, schema, options) {
  if (options.strict && obj != null && schema != null) {
    const resolvedSchema = resolvePath(path, schema, [undefined, obj])
    const strictSchemaKeys = Object.keys(resolvedSchema || {})
    const strictBuiltinKeys = builtinEntries(obj, options).map(([key]) => key)
    const strictKeys = [...strictSchemaKeys, ...strictBuiltinKeys]

    const strictEntries = Object.entries(obj)
      .filter(([key]) => strictKeys.includes(key))

    return fromEntries(strictEntries)
  } else {
    return obj
  }
}

export function resolveSchemaPath (path, obj, schema, opts) {
  const options = { ...DEFAULT_OPTS, ...opts }
  const values = resolvePath(path, schema, [undefined, obj])
  const resolvedValues = resolveObject(obj, values)

  return strictFilter(path, resolvedValues, schema, options)
}

export function defaults (obj, schema, opts) {
  return resolveSchemaPath('defaults', obj, schema, opts)
}

export function cast (obj, schema, opts = {}) {
  return resolveSchemaPath('cast', obj, schema, opts)
}

export function dump (obj, schema, opts = {}) {
  return resolveSchemaPath('dump', obj, schema, opts)
}
