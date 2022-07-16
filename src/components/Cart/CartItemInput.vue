<template>
  <div class="cart-item-input">
    <label>
      <input
        class="cart-item-input__qty"
        type="number"
        :value="qty"
        @input="updateValue"
        @blur="hideAlert"
        @click="modalIsOpen = true"
      > шт.
    </label>
    <span
      v-if="alert"
      class="cart-item-input__tooltip"
    >Количество ограничено</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api'
import {useCartStore} from '@/stores/cart'

export default defineComponent({
  name: 'CartItemInput',
  props: {
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    available: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const { updateCartItemQty } = useCartStore()

    const alert = ref(false)
    const updateValue = (e) => {

      if (e.target.value.length) {
        if (e.target.value < 1) {
          e.target.value = 0
        }

        if (e.target.value > props.available) {
          showAlert()
          e.target.value = props.available
        } else {
          hideAlert()
        }
      } else {
        e.target.value = 1
      }

      updateCartItemQty(props.id, Number(e.target.value))
    }

    const showAlert = () => alert.value = true
    const hideAlert = () => alert.value = false

    return {
      updateValue,
      alert,
      showAlert,
      hideAlert,
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/cart-item-input';
</style>
