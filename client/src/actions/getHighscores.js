const getHighscores = () => async dispatch => {
  const reply = await fetch('/api/gethighscores');
  const highscores = await reply.json();
 
  dispatch({ type: 'SET_HIGHSCORES', payload: highscores });
};

export default getHighscores;
