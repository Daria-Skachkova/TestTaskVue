const USER_NAME_REGEX = /^\p{L}+[\p{L}\s\-._]*$/u
const PHONE_REGEX = /^[0-9+,.()\-\s[x]*$/

export const validateUserName = (userName: string): boolean => {
  if (userName.length === 0) return true

  return USER_NAME_REGEX.test(userName)
}

export const validatePhone = (phone: string): boolean => {
  if (phone.length === 0) return true

  return PHONE_REGEX.test(phone)
}