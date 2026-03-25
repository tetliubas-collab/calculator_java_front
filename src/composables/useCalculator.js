import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useCalculator() {
  const display = ref('0')
  const expression = ref('')
  const history = ref([])
  const isError = ref(false)

  let previous = null
  let operation = null
  let shouldReset = false

  const operationSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    modulo: '%',
    power: '^'
  }

  function appendNum(num) {
    if (shouldReset) {
      display.value = num
      shouldReset = false
    } else {
      display.value = display.value === '0' ? num : display.value + num
    }
    isError.value = false
  }

  function appendDot() {
    if (shouldReset) {
      display.value = '0.'
      shouldReset = false
    } else if (!display.value.includes('.')) {
      display.value += '.'
    }
  }

  function setOperation(op) {
    if (previous !== null && operation && !shouldReset) {
      compute(false)
    }
    operation = op
    previous = parseFloat(display.value)
    shouldReset = true
    expression.value = `${previous} ${operationSymbols[op] || op}`
  }

  function clearAll() {
    display.value = '0'
    expression.value = ''
    previous = null
    operation = null
    shouldReset = false
    isError.value = false
  }

  function backspace() {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1)
    } else {
      display.value = '0'
    }
  }

  function toggleSign() {
    display.value = String(parseFloat(display.value) * -1)
  }

  async function sqrtOperation() {
    const result = await apiCalculate(parseFloat(display.value), 0, 'sqrt')
    handleResult(result)
  }

  async function calculate() {
    await compute(true)
  }

  async function compute(isFinal) {
    if (!operation || previous === null) return
    const a = previous
    const b = parseFloat(display.value)
    const result = await apiCalculate(a, b, operation)
    if (isFinal) {
      handleResult(result)
    } else if (!result.error) {
      display.value = String(result.result)
      previous = result.result
    }
  }

  async function apiCalculate(a, b, op) {
    try {
      const response = await fetch(`${API_URL}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b, operation: op })
      })
      return await response.json()
    } catch {
      return { error: true, errorMessage: 'Помилка з\'єднання з сервером' }
    }
  }

  function handleResult(data) {
    if (data.error) {
      isError.value = true
      display.value = data.errorMessage
      expression.value = ''
    } else {
      isError.value = false
      display.value = String(data.result)
      expression.value = data.expression
      addHistory(data.expression)
    }
    operation = null
    previous = null
    shouldReset = true
  }

  function addHistory(expr) {
    history.value.unshift(expr)
    if (history.value.length > 5) {
      history.value.pop()
    }
  }

  return {
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
