export const openLogin = () => {
  return {
    type: 'OPEN_LOGIN',
    payload: true
    }
}
export const openSignup = () => {
  return {
    type: 'OPEN_SIGNUP',
    payload: true
    }
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
    payload: false
    }
}
