<template>
  <div class="form-wrapper">
    <div class="form">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormWrapper',
  setup() {},
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    padding: 2rem;
  }
}
</style>
