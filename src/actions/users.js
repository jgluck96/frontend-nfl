export const login = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: 'LOGIN',
    payload: user
    }
}
export const logout = () => {
  localStorage.removeItem('user')
  return {
    type: 'LOGOUT',
    payload: ''
    }
}
export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    payload: user
    }
}
