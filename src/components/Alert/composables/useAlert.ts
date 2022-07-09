import {ref} from '@vue/composition-api'

export const useAlert = () => {
  const alertIsActive = ref(false);

  const showAlert = () => {
    alertIsActive.value = true
    setTimeout(() => closeAlert(), 1500)
  }

  const closeAlert = () => {
    alertIsActive.value = false
  }

  return {
    alertIsActive,
    showAlert,
    closeAlert,
  }
}
