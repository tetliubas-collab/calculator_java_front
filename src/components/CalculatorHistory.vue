<template>
  <div class="history-block">
    <div class="history-title">
      Історія
    </div>
    <div
      v-if="history.length === 0"
      class="history-empty"
    >
      Тут з'являться обчислення
    </div>
    <div
      v-for="(item, index) in history"
      :key="index"
      class="history-item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorHistory',
  props: {
    history: {
      type: Array,
      default: () => []
    }
  }
}
</script>
