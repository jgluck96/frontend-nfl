export default (state=false, action) => {
  switch (action.type) {
    case 'WEEK':
      return action.payload;

    default:
      return state
  }

}
