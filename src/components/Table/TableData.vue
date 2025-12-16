<template>
  <div class="centralize wrapper">
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="first-header">Gale</th>
            <th scope="col" class="text-end">Porcentagem</th>
            <th scope="col" class="text-end">Entrada</th>
            <th scope="col" class="text-end">Banca (Green)</th>
            <th scope="col" class="last-header text-end">Banca (Red)</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(gale, i) in gales" :key="i">
            <tr>
              <td>{{ i + 1 }}</td>
              <td class="text-end">{{ gale }}%</td>
              <td class="text-end">R$ {{ findGaleValue(gale, form.value) }}</td>
              <td class="text-end text-success fw-semibold">
                R$ {{ sumValueFromTotal(gale, form.value, i - 1) }}
              </td>
              <td class="text-end text-danger fw-semibold">R$ {{ subtractValueFromTotal(i) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import type { FormValue } from '@/entities/form-value'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TableData',
  props: {
    form: {
      type: Object as PropType<FormValue>,
      required: true,
    },
    gales: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props) {
    const findGaleValue = (percentage: number, value: number) =>
      parseFloat((value * (percentage / 100)).toFixed(2))

    const subtractValueFromTotal = (currentGale: number) => {
      let totalValueForSubtract = 0
      const total = props.form.value
      for (let galeIndex = currentGale; galeIndex >= 0; galeIndex--) {
        const gale = props.gales[galeIndex] ?? 0

        const value = (total * (gale / 100)).toFixed(2)

        totalValueForSubtract += parseFloat(value)
      }

      return (total - totalValueForSubtract).toFixed(2)
    }

    const sumValueFromTotal = (percentage: number, value: number, currentGale: number) => {
      let totalValueForSubtract = 0
      const total = props.form.value
      for (let galeIndex = currentGale; galeIndex >= 0; galeIndex--) {
        const gale = props.gales[galeIndex] ?? 0

        const value = (total * (gale / 100)).toFixed(2)

        totalValueForSubtract += parseFloat(value)
      }

      const galeValue = findGaleValue(percentage, value)
      const odd = props.form.odd / 100
      const valueToSum = galeValue * (odd * 100)

      const newTotal = (total - galeValue - totalValueForSubtract + valueToSum).toFixed(2)

      return parseFloat(newTotal)
    }

    return { findGaleValue, subtractValueFromTotal, sumValueFromTotal }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 100%;
  max-height: 100%;
}
.table-responsive {
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

  width: 95%;
  max-height: 100%;
  .table {
    background-color: var(--light-background-color) !important;
  }
}
.last-header {
  padding-right: 2rem;
}
.first-header {
  padding-left: 2rem;
}
</style>
