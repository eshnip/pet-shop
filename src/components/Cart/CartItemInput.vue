<template>
  <div class="cart-item-input">
    <label>
      <input
        class="cart-item-input__qty"
        type="number"
        :value="qty"
        @input="updateValue"
        @blur="hideAlert"
      > шт.
    </label>
    <span class="cart-item-input__tooltip" v-if="alert">Количество ограничено</span>
  </div>
</template>

<script>
import {ref} from '@vue/composition-api'
import {useCartStore} from "@/stores/cart";

export default {
  name: 'CartItemInput',
  props: {
    qty: {
      type: Number,
    },
    available: {
      type: Number,
    },
    id: {
      type: Number,
    }
  },
  setup(props) {
    const { updateCartItem, removeItem } = useCartStore()

    const alert = ref(false)

    const updateValue = (e) => {
      if (e.target.value.length) {
        if (e.target.value < 1) removeItem(props.id)

        if (e.target.value > props.available) {
          showAlert()
          e.target.value = props.available
        } else {
          hideAlert()
        }
      } else {
        e.target.value = 1
      }

      updateCartItem(props.id, Number(e.target.value))
    }

    const showAlert = () => alert.value = true
    const hideAlert = () => alert.value = false

    return {
      updateValue,
      alert,
      showAlert,
      hideAlert
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/cart-item-input';
</style>
