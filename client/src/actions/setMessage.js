const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    payload: message
  }
}

export default setMessage;