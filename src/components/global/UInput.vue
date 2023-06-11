<script setup>
import { ref, watch } from 'vue'
import { vMask } from '@opentf/vue-input-mask'
const emits = defineEmits(['update:modelValue', 'update:isValid'])

const props = defineProps(
  {
    defaultValidate: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    isValid: {
      type: Boolean,
      default: false
    },
    showPassword:{
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    placeholder: String,
    type: {
      type: [String, Number],
      default: 'text',
      validator: (value) =>
        ['text', 'textarea', 'email', 'password', 'tel', 'number'].includes(value)
    }
  },
  { raw: true, shallow: true }
)

const value = ref(props.modelValue)

const isValid = ref(props.isValid) // declare isValid as a ref variable

watch(value, () => {
  validate() // call validate function to update isValid

  if (props.type !== 'number') {
    if (value.value.trim()) {
      emits('update:isValid', isValid.value)
    }
  }
  emits('update:modelValue', value.value)
})

function validate() {
  if (props.defaultValidate) {
    return
  }

  if (!value.value ) {
    isValid.value = false // update the value of isValid
    // emit update event
    return 'поле обов’язкове'
  } else {
    isValid.value = true // update the value of isValid
    emits('update:isValid', isValid.value) // emit update event
    return props.errorMessage
  }
}

const handleInput = (e) => {
  if (props.type === 'number') {
    e.target.value = Math.max(0, e.target.value)
  }
}
</script>

<template>
  <label class="wrapper__input">
    <slot />
    <input
      v-if="type !== 'textarea' &&type !== 'password'&& type !== 'number' && type !== 'tel'"
      class="input__universal"
      :type="props.type"
      :placeholder="props.placeholder"
      v-model.trim="value"
      :value="modelValue"
    />

    <input
    v-if="type === 'password'"
      class="input__universal"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="props.placeholder"
      v-model.trim="value"
      :value="modelValue"
  
      
    />

    <input
      v-if="type === 'number'"
      type="number"
      :placeholder="props.placeholder"
      v-model.trim="value"
      class="input__universal input-number"
      @input="handleInput"
    />

    <input
      v-if="type === 'tel'"
      v-mask="{ mask: '+38(0##)###-##-##' }"
      :placeholder="props.placeholder"
      v-model.trim="value"
      class="input__universal"
      @input="handleInput"
    />

    <textarea
      v-if="type === 'textarea'"
      rows="3"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      class="textarea"
    ></textarea>
    <p  class="warning__text" v-if="!isValid">
      {{ validate() }}
    </p>
  </label>
</template>

<style scoped lang="scss">
.input__universal {
  border: 2px solid $secondary-color;
  outline: rgb(237, 88, 1);
  padding: 12px 31px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-color: rgb(237, 88, 1);
  }

  font-size: 18px;
  line-height: calc(22 / 18);
}

.textarea {
  @media screen and (min-width: 1280px) {
    width: 500px;
    height: 200px;
  }
  width: 284px;
  height: 170px;
  border: 2px solid $secondary-color;

  outline: rgb(237, 88, 1);
  padding: 8px 11px;
  cursor: pointer;
  resize: none;
  &:hover,
  &:focus {
    border-color: rgb(237, 88, 1);
  }

  font-size: 18px;
  line-height: calc(22 / 18);
}
.wrapper__input {
  position: relative;
}
.warning__text {
  color: $warning;
  position: absolute;
  font-size: 13px;
  line-height: 18px;
}

.input-number {
  padding: 10px 20px;
  height: 46px;
  width: 150px;
}
</style>
