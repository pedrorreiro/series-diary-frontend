<template>
  <div class="relative w-full">
    <input
      v-if="!!masks"
      :type="password && !showPassword ? 'password' : keyboardType"
      class="w-full border p-3 pr-10 focus:border-black focus:outline-none focus:ring-0"
      :class="[
        isInputValid ? 'border-gray-400 bg-gray-100' : 'border-red-600 bg-red-50',
        input?.length ? 'pb-1 pt-5' : ''
      ]"
      :placeholder="label"
      v-model="input"
      @input="handleInputChange"
      @focus="onFocus"
      @blur="onBlur"
      autocomplete="off"
      ref="inputRef"
    />
    <input
      v-else
      :type="password && !showPassword ? 'password' : keyboardType"
      class="w-full border p-3 pr-10 focus:border-black focus:outline-none focus:ring-0"
      :class="[
        isInputValid ? 'border-gray-400 bg-gray-100' : 'border-red-600 bg-red-50',
        input?.length ? 'pb-1 pt-5' : ''
      ]"
      :placeholder="label + (required ? ' *' : '')"
      v-model="input"
      @input="handleInputChange"
      @focus="onFocus"
      @blur="onBlur"
      autocomplete="off"
    />
    <div v-if="input?.length" class="absolute inset-y-1 left-3 flex text-xs">
      <p>
        {{ label }}
        <span class="font-bold text-red-800">{{ required ? '*' : '' }}</span>
      </p>
    </div>
    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
      <IconExclamationCircleFilled v-if="!isInputValid && !password" class="h-5 w-5 text-red-600" />
      <IconEye
        v-if="password && !showPassword"
        class="h-5 w-5 cursor-pointer text-gray-500"
        @click="turnOnShowPassword"
      />
      <IconEyeOff
        v-if="password && showPassword"
        class="h-5 w-5 cursor-pointer text-gray-500"
        @click="turnOffShowPassword"
      />
    </div>
  </div>
  <p class="ml-3 mt-1 w-full text-sm text-red-600" :class="{ 'opacity-0': isInputValid }">
    {{ errorMessage ? $t(`InputValidation["${errorMessage}"]`) : undefined }}
  </p>
</template>

<script setup lang="ts">
import { IconExclamationCircleFilled, IconEye, IconEyeOff } from '@tabler/icons-vue'
import IMask, { type FactoryArg } from 'imask'
import { onMounted, ref, type InputTypeHTMLAttribute } from 'vue'
import { testPassword } from './utils'

export interface TextInputProps {
  label: string
  required?: boolean
  validation?: ValidationProp[]
  password?: boolean
  validatePassword?: boolean
  masks?: (string | RegExp)[]
  placeholder?: string
  keyboardType?: InputTypeHTMLAttribute
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface ValidationProp {
  check: (value: string) => boolean
  message: string
}

const props = withDefaults(defineProps<TextInputProps>(), {
  password: false,
  required: false,
  validatePassword: true,
  keyboardType: 'text',
  onFocus: () => {},
  onBlur: () => {}
})

const input = defineModel<string>()
const isInputValid = ref(true)
const showPassword = ref(false)
const errorMessage = ref('')

const inputRef = ref<HTMLInputElement | null>(null)

const mappedMasks = props.masks?.map((mask) => {
  return { mask }
})

onMounted(() => {
  if (inputRef.value) {
    IMask(inputRef.value, {
      mask: mappedMasks
    } as FactoryArg).on('accept', () => {
      input.value = inputRef.value?.value || ''
    })
  }
})

const emit = defineEmits(['input-validation'])

function handleInputChange() {
  if (props.validation) {
    for (let v of props.validation) {
      emit('input-validation', isInputValid.value)
      if (!v.check(input.value || '')) {
        isInputValid.value = false
        errorMessage.value = v.message
        return
      }
    }
  } else if (props.password && props.validatePassword) {
    const passwordError = testPassword(input.value || '')

    if (passwordError) {
      isInputValid.value = false
      errorMessage.value = passwordError
      emit('input-validation', isInputValid.value)
      return
    }
  }

  isInputValid.value = true
  emit('input-validation', isInputValid.value)
}

function turnOffShowPassword() {
  showPassword.value = false
}

function turnOnShowPassword() {
  showPassword.value = true
}
</script>
