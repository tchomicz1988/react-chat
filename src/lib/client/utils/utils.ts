export const stringToColour = (value: string) => {
  if (!value) {
    return '#000'
  }

  let hash = 0
  let colour = '#'
  value.split('').map((char, i) => {
    hash = value.charCodeAt(i) + ((hash << 10) - hash)
  })

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export const randomId = (length = 20) => {
  const dec2hex = (dec: number) => {
    return dec.toString(16).padStart(2, '0')
  }
  const array: Uint8Array = new Uint8Array(length / 2)
  global.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join('')
}

export const scrollToElement = (to: HTMLElement | null) => {
  setTimeout(() => {
    to?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  })
}
