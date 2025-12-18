<template>
  <BoxWrapper>
    <FormWrapper>
      <div class="centralize row">
        <div class="col-md-3">
          <NumericInput
            label-background-color="light"
            font-color="dark"
            id="numeric"
            placeholder="Banca"
            v-model="form.value"
            :decimal-precision="2"
            currency-display="symbol"
          />
        </div>
        <div class="col-md-3">
          <NumericInput
            label-background-color="light"
            font-color="dark"
            id="numeric"
            placeholder="Gales"
            :decimal-precision="0"
            v-model="form.gales"
            :range="{ max: 10, min: 1 }"
          />
        </div>
        <div class="col-md-3">
          <NumericInput
            label-background-color="light"
            font-color="dark"
            id="numeric"
            placeholder="% máxima de perca"
            :decimal-precision="2"
            v-model="form.maxLost"
            :range="{ max: 100, min: 0 }"
          />
        </div>
      </div>
    </FormWrapper>

    <div class="result-wrapper">
      <ResultTable :form="form" :gales="galesPercent" />
    </div>
  </BoxWrapper>
</template>

<script lang="ts">
import BoxWrapper from '@/components/Box/BoxWrapper.vue'
import FormWrapper from '@/components/Form/FormWrapper.vue'
import NumericInput from '@/components/Input/NumericInput.vue'
import { computed, defineComponent, ref } from 'vue'
import ResultTable from '../Result/ResultTable.vue'

export default defineComponent({
  name: 'CalculatorForm',
  components: {
    NumericInput,
    ResultTable,
    FormWrapper,
    BoxWrapper,
  },
  setup() {
    const form = ref({
      value: 0,
      gales: 0,
      maxLost: 0,
      odd: 0,
    })

    const galesPercent = computed(() => {
      return Array.from({ length: form.value.gales }, (_, i) => {
        const galeIndex = i + 1
        const value = (form.value.maxLost / Math.pow(2, form.value.gales - galeIndex)).toFixed(2)
        return parseFloat(value)
      })
    })

    return { form, galesPercent }
  },
})
</script>

<style lang="scss" scoped>
.result-wrapper {
  max-height: 60vh;
  overflow-y: auto;
  margin-top: 1rem;
}
</style>
