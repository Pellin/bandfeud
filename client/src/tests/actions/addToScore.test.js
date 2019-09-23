import { addToScore, resetScore } from '../../actions/addToScore';

it('should create add to score action', () => {
  const timeLeft = 23;
  const action = addToScore(timeLeft);

  expect(action).toEqual({
    type: 'ADD_TO_SCORE',
    payload: timeLeft
  });
});

it('should create reset score action', () => {
  const action = resetScore();

  expect(action).toEqual({
    type: 'RESET_SCORE'
  });
});
