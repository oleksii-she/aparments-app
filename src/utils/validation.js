export const validationName = (value) => {
  if (value.length < 3) {
    return 'ім’я має бути більше ніж три букви'
  }
  return true
}

export const validationEmail = (value) => {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
  let message = ''
  if (!emailRegex.test(value)) {
    return (message = 'Електронна пошта написана не вірно')
  }
  return message
}

export const validationPassword = (value) => {
  const password = /^(?=.*[A-Za-z])(?=.*[\d])[a-zA-Z0-9]{7,256}$/

  if (!password.test(value)) {
    return 'введіть більш складний пароль'
  }
  return
}

export const isRequired = (val) => ({
  hasPassed: !!val,
  message: val ? '' : 'Поле обов’язкове для заповнення'
})

export const charLimit = (val, limitMin, limitMax) => ({
  hasPassed: val.length > limitMin && val.length < limitMax,
  message:
    val.length < limitMin ? 'Поле має містити більше символів' : 'Поле має містити менше символів'
})

export const passwordValidation = (val) => {
  const lengthValidation = charLimit(val, 8, 256)
  if (!lengthValidation.hasPassed) {
    return lengthValidation
  }

  return {
    hasPassed: /^(?=.*[A-Za-z])(?=.*[\d])[a-zA-Z0-9]{7,256}$/.test(val),
    message: 'Придумайте складніший пароль'
  }
}

export const emailValidation = (val) => ({
  hasPassed: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val),
  message: 'Невірно написаний email'
})
