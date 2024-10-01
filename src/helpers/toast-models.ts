import sanitizeHtml from 'sanitize-html'
import { toast } from 'vue3-toastify'

export const showDefaultToast = (message: string, autoCloseTime = 5000) => {
  message = sanitizeHtml(message)

  toast(message, {
    autoClose: autoCloseTime,
    theme: 'dark',
    type: 'default',
    position: 'bottom-center',
    hideProgressBar: true
  })
}

export const showSuccessToast = (message: string, autoClose: boolean = true) => {
  message = sanitizeHtml(message)

  toast(message, {
    autoClose: autoClose ? 5000 : undefined,
    theme: 'dark',
    type: 'success',
    position: 'bottom-center',
    hideProgressBar: true
  })
}

export const showErrorToast = (message: string, autoClose: boolean = true) => {
  message = sanitizeHtml(message)

  toast(message, {
    autoClose: autoClose ? 5000 : undefined,
    theme: 'dark',
    type: 'error',
    position: 'bottom-center',
    hideProgressBar: true
  })
}
