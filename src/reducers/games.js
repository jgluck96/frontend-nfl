export default (state=false, action) => {
  switch (action.type) {
    case 'FETCH_GAMES':
      return action.payload;

    default:
      return state
  }

}
