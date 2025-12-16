<template>
  <div class="wrapper">
    <div class="container">
      <div class="box-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BoxWrapper',
  setup() {},
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in-up 1s ease forwards;

  .box-wrapper {
    min-height: 90vh;
    padding: 1rem;
    border-radius: 2rem;
    background-color: #fff;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}
</style>
