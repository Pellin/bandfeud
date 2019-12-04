import addBand from '../actions/addBand';

const getBand = (previous, used) => async dispatch => {
  try {
    const reply = await fetch(
      `/api/getband?previous=${previous}&used=${JSON.stringify(used)}`
    );
    const answer = await reply.json();

    setTimeout(() => {
      dispatch(addBand(answer.name, answer.url, undefined, 'computer'));
      dispatch({ type: 'ADD_TO_USED', payload: answer.name });
      dispatch({
        type: 'SET_PREVIOUS',
        payload: answer.name
      });
    }, 2000);
  } catch (e) {
    console.log(e.message);
  }
};

export default getBand;
