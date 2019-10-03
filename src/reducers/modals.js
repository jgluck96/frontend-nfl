export default (state={}, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return {loginModal: action.payload, signupModal: false, pickemModal: false, rankingsModal: false};
    case 'OPEN_SIGNUP':
      return {loginModal: false, signupModal: true, pickemModal:false, rankingsModal: false};
    case 'CLOSE_MODAL':
      return {rankingsModal: false, loginModal: action.payload, signupModal: action.payload, pickemModal: false};
    case 'OPEN_PICKEM':
      return {loginModal: false, signupModal: false, pickemModal: action.payload};
    case 'OPEN_RANKINGS':
      return {loginModal: false, signupModal: false, pickemModal: false, rankingsModal:action.payload};

    default:
      return state
  }

}
