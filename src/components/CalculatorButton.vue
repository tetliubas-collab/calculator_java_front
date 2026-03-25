<template>
  <button
    :class="['btn', `btn-${variant}`]"
    :style="span > 1 ? { gridColumn: `span ${span}` } : {}"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'CalculatorButton',
  props: {
    label: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'number'
    },
    span: {
      type: Number,
      default: 1
    }
  },
  emits: ['click']
}
</script>
