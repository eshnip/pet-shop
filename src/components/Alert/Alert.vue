<template>
  <div
    class="alert"
    :class="alertClasses"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from '@vue/composition-api'
import {AlertTheme} from '@/types/Alerts'

export default defineComponent({
  name: 'AppAlert',
  props: {
    theme: {
      type: String as PropType<AlertTheme>,
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
