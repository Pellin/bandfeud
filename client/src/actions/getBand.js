import checkBandBank from '../utils/checkBandBank';
import addBand from '../actions/addBand';

const getBand = (previous, used, bandBank) => async dispatch => {
  let answer = {};
  const bankBand = checkBandBank(bandBank, previous, used);

  if (bankBand) {
    answer = bankBand;
    dispatch({ type: 'UPDATE_BANDBANK', payload: bandBank });
  } else {
    try {
      const reply = await fetch(
        `/api/getband?previous=${previous}&used=${JSON.stringify(used)}`
      );
      const parsedResponse = await reply.json();
      answer = parsedResponse.answer;
      const serverBandBank = parsedResponse.serverBandBank;
      if (serverBandBank.length) {
        dispatch({ type: 'ADD_TO_BANDBANK', payload: serverBandBank });
      } 
    } catch (e) {
      console.log(e.message);
    }
  }
  setTimeout(() => {
    dispatch(addBand(answer.name, answer.url, 'computer'));
    dispatch({ type: 'ADD_TO_USED', payload: answer.name });
    dispatch({
      type: 'SET_PREVIOUS',
      payload: answer.name
    });
  }, 2000);
};

export default getBand;
