<template>
  <div class="display">
    <div class="expression">
      {{ expression }}
    </div>
    <div :class="['main-display', { 'error': isError }]">
      {{ display }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorDisplay',
  props: {
    display: {
      type: String,
      required: true
    },
    expression: {
      type: String,
      default: ''
    },
    isError: {
      type: Boolean,
      default: false
    }
  }
}
</script>
