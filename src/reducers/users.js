export default (state=false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'UPDATE_USER':
      return action.payload;
    case 'LOGOUT':
      return false;

    default:
      return state
  }

}
