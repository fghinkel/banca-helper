<template>
  <div class="centralize wrapper">
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" style="width: 5%" class="first-header">Gale</th>
            <th scope="col" style="width: 10%" class="text-center">Porcentagem</th>
            <th scope="col" style="width: 20%" class="text-center">Entrada</th>
            <th scope="col" style="width: 22%" class="text-center">Odd</th>
            <th scope="col" style="width: 10%" class="text-center">Ganho estimado</th>
            <th scope="col" style="width: 10%" class="text-center">Banca (Green)</th>
            <th scope="col" style="width: 10%" class="last-header text-center">Banca (Red)</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(gale, i) in gales" :key="i">
            <tr>
              <td class="text-center">{{ i + 1 }}</td>
              <td class="text-center">{{ gale }}%</td>
              <td class="text-center">R$ {{ findGaleValue(gale, form.value) }}</td>
              <td class="text-center d-flex justify-content-end">
                <div style="width: 100%">
                  <NumericInput
                    :id="`${i}-odd`"
                    :placeholder="`Odd gale ${i + 1}`"
                    v-model="galesOds[i]"
                  />
                </div>
              </td>
              <td class="text-center text-success fw-semibold">
                R$ {{ estimatedGain(gale, form.value, i) }}
              </td>
              <td class="text-center text-success fw-semibold">
                R$ {{ sumValueFromTotal(gale, form.value, i) }}
              </td>
              <td class="text-center text-danger fw-semibold">
                R$ {{ subtractValueFromTotal(i) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import type { FormValue } from '@/entities/form-value'
import { defineComponent, ref, type PropType } from 'vue'
import NumericInput from '../Input/NumericInput.vue'

export default defineComponent({
  name: 'TableData',
  components: { NumericInput },
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
    const galesOds = ref<number[]>([])

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

    const estimatedGain = (percentage: number, value: number, index: number): number => {
      const gain = findGaleValue(percentage, value) ?? 0
      const odd = galesOds.value[index] ?? 0
      if (!odd) return 0

      const estimatedGain = (gain * odd - gain).toFixed(2)
      return parseFloat(estimatedGain)
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
      const odd = (galesOds.value[currentGale] ?? 0) / 100
      const valueToSum = galeValue * (odd * 100)
      const newTotal = (total - totalValueForSubtract + valueToSum).toFixed(2)

      return parseFloat(newTotal)
    }

    return { galesOds, findGaleValue, estimatedGain, subtractValueFromTotal, sumValueFromTotal }
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
