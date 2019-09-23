import setCurrentPoints from '../../actions/setCurrentPoints';

it('should create set current points action', () => {
  const timeLeft = 15;
  const action = setCurrentPoints(timeLeft);

  expect(action).toEqual({
    type: 'SET_CURRENT_POINTS',
    payload: timeLeft
  });
});
