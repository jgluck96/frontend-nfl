export default (state=false, action) => {
  switch (action.type) {
    case 'RANKINGS':
      return action.payload;

    default:
      return state
  }

}
