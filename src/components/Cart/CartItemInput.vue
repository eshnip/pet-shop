<template>
  <div class="cart-item-input">
    <label>
      <input
        v-model.number="quantity"
        class="cart-item-input__qty"
        type="number"
        @input="updateValue"
        @blur="hideAlert"
      > шт.
    </label>
    <span
      v-if="alert"
      class="cart-item-input__tooltip"
    >Количество ограничено</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from '@vue/composition-api'
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
    const alert = ref(false)
    const quantity = ref(1)
    const { updateCartItemQty } = useCartStore()

    const updateValue = (event: Event & {target: HTMLInputElement}) => {
      if (Number(event.target.value) < 1) {
        quantity.value = 0
        return
      }

      if (Number(event.target.value) > props.available) {
        showAlert()
        quantity.value = props.available
        return
      }

      updateCartItemQty(props.id, quantity.value)
    }

    watch(() => props.qty, () => quantity.value =  props.qty)

    const showAlert = () => alert.value = true
    const hideAlert = () => alert.value = false

    return {
      updateValue,
      alert,
      showAlert,
      hideAlert,
      quantity
    }
  }
})
</script>

<style scoped lang="scss">
@import './styles/cart-item-input';
</style>
