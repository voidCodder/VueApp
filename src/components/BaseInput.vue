<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateEvent" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateEvent() {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
