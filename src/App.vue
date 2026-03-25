<template>
  <div class="app">
    <header class="app-header">
      <h1>☕ Java Calculator</h1>
      <p class="subtitle">
        Vue 3 + Spring Boot
      </p>
      <!-- Крок 2: VITE_APP_STATUS відображається в хедері -->
      <span :class="['env-badge', appStatus === 'Development' ? 'badge-dev' : 'badge-prod']">
        {{ appStatus }}
      </span>
    </header>

    <main class="calculator">
      <CalculatorDisplay
        :display="display"
        :expression="expression"
        :is-error="isError"
      />

      <CalculatorHistory :history="history" />

      <div class="buttons">
        <CalculatorButton
          label="AC"
          variant="clear"
          @click="clearAll"
        />
        <CalculatorButton
          label="+/-"
          variant="fn"
          @click="toggleSign"
        />
        <CalculatorButton
          label="√"
          variant="fn"
          @click="sqrtOperation"
        />
        <CalculatorButton
          label="÷"
          variant="op"
          @click="setOperation('divide')"
        />

        <CalculatorButton
          label="7"
          variant="number"
          @click="appendNum('7')"
        />
        <CalculatorButton
          label="8"
          variant="number"
          @click="appendNum('8')"
        />
        <CalculatorButton
          label="9"
          variant="number"
          @click="appendNum('9')"
        />
        <CalculatorButton
          label="×"
          variant="op"
          @click="setOperation('multiply')"
        />

        <CalculatorButton
          label="4"
          variant="number"
          @click="appendNum('4')"
        />
        <CalculatorButton
          label="5"
          variant="number"
          @click="appendNum('5')"
        />
        <CalculatorButton
          label="6"
          variant="number"
          @click="appendNum('6')"
        />
        <CalculatorButton
          label="−"
          variant="op"
          @click="setOperation('subtract')"
        />

        <CalculatorButton
          label="1"
          variant="number"
          @click="appendNum('1')"
        />
        <CalculatorButton
          label="2"
          variant="number"
          @click="appendNum('2')"
        />
        <CalculatorButton
          label="3"
          variant="number"
          @click="appendNum('3')"
        />
        <CalculatorButton
          label="+"
          variant="op"
          @click="setOperation('add')"
        />

        <CalculatorButton
          label="0"
          variant="number"
          :span="2"
          @click="appendNum('0')"
        />
        <CalculatorButton
          label="."
          variant="number"
          @click="appendDot"
        />
        <CalculatorButton
          label="xʸ"
          variant="fn"
          @click="setOperation('power')"
        />

        <CalculatorButton
          label="%"
          variant="fn"
          @click="setOperation('modulo')"
        />
        <CalculatorButton
          label="⌫"
          variant="clear"
          @click="backspace"
        />
        <CalculatorButton
          label="="
          variant="equals"
          :span="2"
          @click="calculate"
        />
      </div>
    </main>

    <footer class="app-footer">
      <span>Java Calculator © 2025</span>
      <span class="footer-env">Режим: <strong>{{ appStatus }}</strong></span>
      <span>API: {{ apiUrl }}</span>
    </footer>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import CalculatorDisplay from './components/CalculatorDisplay.vue'
import CalculatorButton from './components/CalculatorButton.vue'
import CalculatorHistory from './components/CalculatorHistory.vue'
import { useCalculator } from './composables/useCalculator.js'

export default {
  name: 'App',
  components: {
    CalculatorDisplay,
    CalculatorButton,
    CalculatorHistory
  },
  setup() {
    const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const {
      display,
      expression,
      history,
      isError,
      appendNum,
      appendDot,
      setOperation,
      clearAll,
      backspace,
      toggleSign,
      sqrtOperation,
      calculate
    } = useCalculator()

    function handleKeyboard(e) {
      if (e.key >= '0' && e.key <= '9') appendNum(e.key)
      else if (e.key === '.') appendDot()
      else if (e.key === '+') setOperation('add')
      else if (e.key === '-') setOperation('subtract')
      else if (e.key === '*') setOperation('multiply')
      else if (e.key === '/') { e.preventDefault(); setOperation('divide') }
      else if (e.key === '%') setOperation('modulo')
      else if (e.key === 'Enter' || e.key === '=') calculate()
      else if (e.key === 'Backspace') backspace()
      else if (e.key === 'Escape') clearAll()
    }

    onMounted(() => window.addEventListener('keydown', handleKeyboard))
    onUnmounted(() => window.removeEventListener('keydown', handleKeyboard))

    return {
      appStatus,
      apiUrl,
      display,
      expression,
      history,
      isError,
      appendNum,
      appendDot,
      setOperation,
      clearAll,
      backspace,
      toggleSign,
      sqrtOperation,
      calculate
    }
  }
}
</script>
