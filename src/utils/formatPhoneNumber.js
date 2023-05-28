export const formatPhoneNumber = (phoneNumber) => {
  // Видаляємо всі знаки крім цифр
  const cleaned = phoneNumber.replace(/\D/g, '')

  // Визначаємо код країни, місцевий код і сам номер
  const country = cleaned.slice(0, 2)
  const localCode = cleaned.slice(2, 5)
  const firstPart = cleaned.slice(5, 8)
  const secondPart = cleaned.slice(8, 10)
  const thirdPart = cleaned.slice(10, 12)

  // Форматуємо номер у потрібний формат
  const formattedPhoneNumber = `+${country}(${localCode})${firstPart}-${secondPart}-${thirdPart}`

  return formattedPhoneNumber
}

export const convertPhoneNumber = (phoneNumber) => {
  const digitsOnly = phoneNumber.replace(/\D/g, '')

  // Додаємо префікс "+380"
  const formattedNumber = '+380' + digitsOnly.slice(-9)

  return formattedNumber
}
