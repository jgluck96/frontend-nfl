export default (state={}, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return {loginModal: action.payload, signupModal: false, pickemModal: false};
    case 'OPEN_SIGNUP':
      return {loginModal: false, signupModal: true, pickemModal:false};
    case 'CLOSE_MODAL':
      return {loginModal: action.payload, signupModal: action.payload, pickemModal: false};
    case 'OPEN_PICKEM':
      return {loginModal: false, signupModal: false, pickemModal: action.payload};

    default:
      return state
  }

}
