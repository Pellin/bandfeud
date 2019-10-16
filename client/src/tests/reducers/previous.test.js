import previousReducer from '../../reducers/previous';

it('should default state to a random letter between a and z', () => {
  const state = previousReducer(undefined, {
    type: '@@INIT'
  });
  expect(typeof state).toBe('object');
  expect(state.previous1.match(/[a-z]/)).toBeTruthy();
  expect(state.previous2).toBeFalsy();
});

it('should set previous1 to correct letter', () => {
  const previous = 'underworld';
  const state = previousReducer(
    { previous1: 'a', previous2: '' },
    {
      type: 'SET_PREVIOUS',
      payload: previous
    }
  );
  expect(state.previous1).toBe('d');
});

it('should set previous 1 to number and previous2 to letter (one digit)', () => {
  const previous = 'mick 6';
  const state = previousReducer(
    { previous1: 'a', previous2: '' },
    {
      type: 'SET_PREVIOUS',
      payload: previous
    }
  );
  expect(state).toEqual({ previous1: '6', previous2: 'x' });
});

it('should set previous 1 to number and previous2 to letter (two digits)', () => {
  const previous = 'state 25';
  const state = previousReducer(
    { previous1: '6', previous2: 'x' },
    {
      type: 'SET_PREVIOUS',
      payload: previous
    }
  );
  expect(state).toEqual({ previous1: '5', previous2: 'e' });
});
