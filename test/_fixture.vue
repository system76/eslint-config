/**
 * standard/test/_fixture.vue
 * A simple vue component to style an html `input` tag. Copied from tachi.
 */

<template>
  <div :class="classes">
    <base-label
      v-if="label"
      :for="id"
      :disabled="localDisabled"
      :error="hasErrors"
      :required="localRequired"
    >
      {{ label }}
    </base-label>

    <input
      v-if="localEditing"
      :id="id"
      ref="input"
      v-validate="validate"
      :data-vv-name="(localName === '') ? label : undefined"
      :data-vv-scope="localScope"
      :disabled="localDisabled"
      :name="localName"
      :required="localRequired"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >

    <p
      v-else
      :class="{ empty: (value == null || value === '') }"
    >
      {{ value }}
    </p>

    <input-error
      v-if="hasErrors"
      class="error-text"
    >
      {{ errors[0] }}
    </input-error>
  </div>
</template>

<style scoped>
  .input {
    margin: 1rem 0;
    padding-bottom: 1.5rem;
    position: relative;
  }

  input,
  p {
    border-radius: 3px;
    border: 1px solid transparent;
    color: #000;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    height: 2.4rem;
    line-height: var(--base-line-height);
    margin: 0;
    padding: 0.5rem;
    vertical-align: middle;
    width: 100%;
  }

  input {
    background-color: var(--white);
    border-color: var(--base-font-color);
    box-shadow: inset 0 1px 4px color-mod(var(--black) a(0.06));
    transition: border-color 200ms ease;
  }

  p {
    border-color: color-mod(var(--base-font-color) a(0.7));
  }

  .error input {
    border-color: var(--error-color);
    box-shadow: none;
  }

  input:hover {
    border-color: var(--action-color);
  }

  input:focus,
  input:active {
    border-color: var(--action-color);
    box-shadow: 0 0 8px color-mod(var(--action-color) a(0.7)), 0 0 1px color-mod(var(--action-color) a(0.7));
    outline: none;
  }

  input:disabled {
    background-color: rgba(220, 220, 220, 0.35);
    border-color: rgba(120, 120, 120, 0.6);
    box-shadow: none;
  }

  .error-text {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
  }
</style>

<script>
import { FormInput } from '../mixins'
import InputError from './input-error'

export default {
  name: 'BaseInput',

  components: {
    InputError
  },

  mixins: [
    FormInput({
      type: [String, Number]
    })
  ],

  inheritAttrs: false
}
</script>
