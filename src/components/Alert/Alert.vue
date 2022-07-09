<template>
  <div class="alert" :class="alertClasses">
     {{ label }}
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
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
}
</script>

<style scoped lang="scss">
@import "./styles/alert";
</style>
