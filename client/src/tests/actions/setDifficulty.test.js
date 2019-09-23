import { setDifficulty, resetDifficulty } from '../../actions/setDifficulty';

it('should setup set difficulty action', () => {
  const usedLength = 24;
  const action = setDifficulty(usedLength);

  expect(action).toEqual({
    type: 'SET_DIFFICULTY',
    payload: usedLength
  });
});

it('should setup reset difficulty action', () => {
  const action = resetDifficulty();

  expect(action).toEqual({
    type: 'RESET_DIFFICULTY'
  });
});