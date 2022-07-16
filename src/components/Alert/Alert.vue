<template>
  <div
    class="alert"
    :class="alertClasses"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from '@vue/composition-api'

export default defineComponent({
  name: 'AppAlert',
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: ''
    },
  },
  setup(props) {
   const alertClasses = computed(() => `alert--${props.theme}`)

    return {
      alertClasses
    }
  }
})
</script>

<style scoped lang="scss">
@import "./styles/alert";
</style>
