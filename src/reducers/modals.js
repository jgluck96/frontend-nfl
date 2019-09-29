export default (state={}, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return {loginModal: action.payload, signupModal: false};
    case 'OPEN_SIGNUP':
      return {loginModal: false, signupModal: true};
    case 'CLOSE_MODAL':
      return {loginModal: action.payload, signupModal: action.payload};

    default:
      return state
  }

}
