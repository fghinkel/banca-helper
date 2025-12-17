<template>
  <div @keypress.enter.prevent="onEnter" class="input-container" :style="customStyle">
    <input
      :id="id"
      :type="type"
      v-if="mask"
      v-mask="mask"
      :class="['styled_input_bar', customClass, { 'is-invalid': !!error }]"
      placeholder=""
      ref="NumericInput"
    />
    <input
      v-else
      :id="id"
      :type="type"
      :class="['styled_input_bar', customClass, { 'is-invalid': !!error }]"
      placeholder=""
      ref="NumericInput"
    />
    <label class="input-label" :for="id">{{ placeholder }}</label>

    <slot v-if="!error" name="icon" class="icon-wrapper" />
  </div>
</template>

<script lang="ts">
import { isNumber } from '@/shared/is-number'
import { computed, defineComponent, watch, type PropType } from 'vue'
import type { CurrencyInputOptions } from 'vue-currency-input'
import { useCurrencyInput } from 'vue-currency-input'

export default defineComponent({
  name: 'NumericInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      required: false,
      type: null as unknown as PropType<Partial<string | number | null>>,
      validator: (v) => ['string', 'number'].includes(typeof v) || v === null,
    },
    decimalPrecision: {
      required: false,
      default: 2,
    },
    label: {
      type: String,
      required: false,
    },
    range: {
      type: Object as PropType<{ max: number; min: number }>,
      required: false,
    },
    currencyDisplay: {
      type: String as PropType<'hidden' | 'symbol'>,
      default: 'hidden',
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    customClass: {
      type: String,
      required: false,
    },
    labelBackgroundColor: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
    mask: {
      required: false,
    },
    error: {
      type: String,
      default: '',
    },
    fontColor: {
      type: String as PropType<'light' | 'dark'>,
      default: 'dark',
    },
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    const normalizedRange = computed(() => {
      if (!props.range) return undefined

      return {
        min: props.range.min,
        max: props.range.max,
      }
    })

    const options = computed(
      () =>
        ({
          locale: 'pt-BR',
          currency: 'BRL',
          currencyDisplay: props.currencyDisplay,
          hideCurrencySymbolOnFocus: false,
          hideGroupingSeparatorOnFocus: false,
          hideNegligibleDecimalDigitsOnFocus: false,
          autoDecimalDigits: true,
          accountingSign: true,
          precision: props.decimalPrecision,
          useGrouping: props.decimalPrecision !== 0,
          valueRange: normalizedRange.value,
        }) as CurrencyInputOptions,
    )
    const { inputRef: NumericInput, setValue, setOptions } = useCurrencyInput(options.value, true)
    watch(
      () => props.modelValue,
      (value) => {
        if (!isNumber(value)) return
        setValue(value)
      },
      { immediate: true },
    )

    watch(
      options,
      () => {
        setOptions(options.value)
      },
      { deep: true },
    )

    const onEnter = (value: Event) => emit('onEnter', value)

    const customStyle = computed(() => ({
      '--label-bg': props.labelBackgroundColor == 'light' ? '#fff' : 'var(--dark-background-color)',
      '--font-color':
        props.fontColor == 'light' ? 'var(--light-font-color)' : 'var(--dark-font-color)',
    }))

    return {
      NumericInput,
      customStyle,
      inputValue,

      onEnter,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  width: 100%;
}
.styled_input_bar {
  width: 100%;
  padding: 0.6rem;
  font-size: 0.8rem;
  border: 1px solid var(--font-color);
  margin: 0.75rem 0;
  border-radius: 1.25rem;
  background-color: transparent;
  color: var(--font-color);
  outline: none;
  transition: all 2ms ease;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--pm-button-color);
    transition: all 2ms ease;
  }
}
.styled_input_bar::placeholder {
  color: var(--font-color);
  transition: all 2ms ease;
}
.styled_input_bar:focus::placeholder {
  color: transparent;
}
.input-label {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1em;
  color: var(--font-color);
  pointer-events: none;
  transition: all 0.2s ease;
}
.styled_input_bar:focus + .input-label,
.styled_input_bar:not(:placeholder-shown) + .input-label {
  top: 1.1em;
  left: 5%;
  font-size: 0.8em;
  color: var(--pm-button-color);
  border-radius: 1.25rem;
  background-color: var(--label-bg);
  padding: 0 0.5em;
}

.styled_input_bar:not(:focus):not(:placeholder-shown) + .input-label {
  color: var(--font-color);
  border-radius: 2rem;
}
</style>
