<template>
  <TableData :form :gales />
</template>

<script lang="ts">
import TableData from '@/components/Table/TableData.vue'
import type { FormValue } from '@/entities/form-value'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ResultTable',
  components: { TableData },
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
  setup() {},
})
</script>
