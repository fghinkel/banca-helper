<template>
  <div @keypress.enter.prevent="onEnter" class="input-container" :style="customStyle">
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      v-if="mask"
      v-mask="mask"
      :class="['styled_input_bar', customClass, { 'is-invalid': !!error }]"
      placeholder=""
    />
    <input
      v-else
      :id="id"
      :type="type"
      v-model="inputValue"
      :class="['styled_input_bar', customClass, { 'is-invalid': !!error }]"
      placeholder=""
    />
    <label class="input-label" :for="id">{{ placeholder }}</label>

    <slot v-if="!error" name="icon" class="icon-wrapper" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
    },
    modelValue: {
      required: false,
      type: null as unknown as PropType<Partial<string | number | null>>,
      validator: (v) => ['string', 'number'].includes(typeof v) || v === null,
    },
    labelBackgroundColor: {
      type: String as PropType<'light' | 'dark'>,
      default: 'dark',
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
  emits: ['onEnter', 'update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    const onEnter = (value: Event) => emit('onEnter', value)

    const customStyle = computed(() => ({
      '--label-bg':
        props.labelBackgroundColor == 'light'
          ? 'var(--light-background-color)'
          : 'var(--dark-background-color)',
      '--font-color':
        props.fontColor == 'light' ? 'var(--light-font-color)' : 'var(--dark-font-color)',
    }))

    return { inputValue, customStyle, onEnter }
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
  background-color: var(--label-bg);
  padding: 0 0.5em;
}

.styled_input_bar:not(:focus):not(:placeholder-shown) + .input-label {
  color: var(--font-color);
  border-radius: 2rem;
}
</style>
