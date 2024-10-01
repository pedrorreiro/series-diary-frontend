<template>
  <button
    @click="handleClick"
    @contextmenu.prevent
    :class="style"
    :disabled="disabled"
    :style="fill ? { backgroundColor: accentColor } : {}"
  >
    <component
      v-if="prependIcon && (!isLoading || loadingPosition === 'right')"
      :is="prependIcon"
      stroke="1.5"
      class="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 transform"
    />
    <IconLoader2
      v-if="isLoading && loadingPosition === 'left' && prependIcon"
      stroke="1.5"
      class="custom-spin-center absolute left-6 h-5 w-5"
    />
    <slot></slot>
    <component
      v-if="appendIcon && (!isLoading || loadingPosition === 'left')"
      :is="appendIcon"
      stroke="1.5"
      class="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 transform"
    />
    <IconLoader2
      v-if="isLoading && loadingPosition === 'right' && appendIcon"
      stroke="1.5"
      class="custom-spin-center absolute right-6 h-5 w-5"
    />
  </button>
</template>

<script setup lang="ts">
import { type Icon, IconLoader2 } from '@tabler/icons-vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, ref } from 'vue'

const emit = defineEmits(['button:enterLoading', 'button:leaveLoading'])

export interface TemplateButtonProps {
  fullWidth?: boolean
  displayBorder?: boolean
  fill?: boolean
  theme?: 'light' | 'dark'
  accentColor?: string
  appendIcon?: Icon
  prependIcon?: Icon
  loadingPosition?: 'left' | 'right'
  centralizedText?: boolean
  disabled?: boolean
  callback: () => Promise<unknown>
}

const props = withDefaults(defineProps<TemplateButtonProps>(), {
  fullWidth: false,
  displayBorder: true,
  fill: false,
  theme: 'light',
  loadingPosition: 'right',
  disabled: false,
  centralizedText: false
})

const isLoading = ref(false)

async function handleClick() {
  if (isLoading.value === true) {
    return
  }

  isLoading.value = true
  emit('button:enterLoading')

  await props.callback()

  isLoading.value = false
  emit('button:leaveLoading')
}

const buttonStyles = cva(
  ['cursor-pointer', 'relative', 'flex', 'p-2.5', 'rounded-full', 'font-bold', 'select-none'],
  {
    variants: {
      width: {
        full: ['w-full', 'justify-center', 'min-w-[15em]'],
        regular: ['pl-6', 'min-w-[10em]'],
        centralizedText: ['justify-center', 'px-6']
      },
      fill: {
        fill: ['fill'],
        fillDarkBackground: ['fill-dark-background'],
        fillDisabled: ['fill-disabled', 'opacity-50'],
        none: []
      },
      borderWidth: {
        thick: ['border-thick'],
        thin: ['border-thin'],
        none: []
      },
      borderColor: {
        light: ['border-light-color'],
        dark: ['border-dark-color'],
        regular: ['border-regular-color'],
        disabled: ['border-disabled-color']
      },
      textColor: {
        light: ['light-text-color'],
        dark: ['dark-text-color'],
        pressed: ['opacity-80'],
        disabled: ['opacity-40']
      },
      spacing: {
        centralizedText: ['justify-center'],
        regular: ['pr-6'],
        regularWithLeftIcon: ['pl-14', 'pr-8'],
        regularWithRightIcon: ['pr-14'],
        regularWithLeftAndRightIcon: ['pl-14', 'pr-14'],
        none: []
      },
      animation: {
        animated: [
          'transition',
          'duration-50',
          'transform',
          'active:scale-95',
          'focus:outline-none'
        ],
        none: []
      },
      pressedState: {
        active: ['active:opacity-85'],
        none: []
      }
    }
  }
)

const customStyleRef = computed(() => {
  let width: VariantProps<typeof buttonStyles>['width'] = 'regular'

  if (props.fullWidth) {
    width = 'full'
  } else if (props.centralizedText) {
    width = 'centralizedText'
  } else {
    width = 'regular'
  }

  let fill: VariantProps<typeof buttonStyles>['fill'] = 'none'

  if (props.accentColor && props.fill) {
    fill = 'none'
  } else if (!props.disabled && props.fill) {
    if (props.theme === 'light') {
      fill = 'fill'
    } else if (props.theme === 'dark') {
      fill = 'fillDarkBackground'
    }
  } else if (props.disabled && props.fill) {
    fill = 'fillDisabled'
  }

  let borderWidth: VariantProps<typeof buttonStyles>['borderWidth'] = 'none'
  if (props.displayBorder && !props.fill) {
    if (props.fullWidth) {
      borderWidth = 'thick'
    } else {
      borderWidth = 'thin'
    }
  }

  let borderColor: VariantProps<typeof buttonStyles>['borderColor'] = 'disabled'
  if (!props.disabled) {
    if (props.fullWidth) {
      if (props.theme === 'light') {
        borderColor = 'dark'
      } else if (props.theme === 'dark') {
        borderColor = 'light'
      }
    } else {
      borderColor = 'regular'
    }
  }

  let textColor: VariantProps<typeof buttonStyles>['textColor'] = 'disabled'
  if (!props.disabled) {
    if (props.fill) {
      if (props.theme === 'light') {
        textColor = 'light'
      } else if (props.theme === 'dark') {
        textColor = 'dark'
      }
    } else {
      if (props.theme === 'light') {
        textColor = 'dark'
      } else if (props.theme === 'dark') {
        textColor = 'light'
      }
    }
  }

  let spacing: VariantProps<typeof buttonStyles>['spacing'] = 'none'
  if (!props.fullWidth) {
    if (props.prependIcon && props.appendIcon) {
      spacing = 'regularWithLeftAndRightIcon'
    } else if (props.prependIcon) {
      spacing = 'regularWithLeftIcon'
    } else if (props.appendIcon) {
      spacing = 'regularWithRightIcon'
    } else if (props.centralizedText) {
      spacing = 'centralizedText'
    } else {
      spacing = 'regular'
    }
  }

  const customStyle: VariantProps<typeof buttonStyles> = {
    width,
    fill,
    borderWidth,
    borderColor,
    textColor,
    spacing,
    animation: !props.disabled ? 'animated' : 'none',
    pressedState: !props.disabled ? 'active' : 'none'
  }

  return customStyle
})

const style = computed(() => {
  return buttonStyles(customStyleRef.value)
})
</script>

<style scoped lang="scss">
$not-full-width-not-pressed-border-light: #ccd1d5;

$dark-primary-color: #292a2c;
$light-primary-color: #fdfeff;

$disabled-primary-color-light: #bdbdbd;
$disabled-primary-color-light: #7c7c7c;

.fill {
  background-color: $dark-primary-color;
}

.fill-dark-background {
  background-color: $light-primary-color;
}

.fill-disabled {
  background-color: $disabled-primary-color-light;
}

.fill-disabled-dark {
  background-color: $disabled-primary-color-light;
}

.border-thin {
  border: 1px solid transparent;
}

.border-thick {
  border: 2px solid transparent;
}

.border-dark-color {
  border-color: $dark-primary-color;
}

.border-light-color {
  border-color: $light-primary-color;
}

.border-regular-color {
  border-color: $not-full-width-not-pressed-border-light;
}

.border-disabled-color {
  border-color: $disabled-primary-color-light;
}

.dark-text-color {
  color: $dark-primary-color;
}

.light-text-color {
  color: $light-primary-color;
}

.custom-spin-center {
  top: 25%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
