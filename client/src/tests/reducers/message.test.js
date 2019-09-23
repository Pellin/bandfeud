import messageReducer from '../../reducers/message';

it('should default state to empty string', () => {
  const state = messageReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBe('');
});

it('should set message', () => {
  const message = 'This is the message';
  const state = messageReducer('', {
    type: 'SET_MESSAGE',
    payload: message
  });
  expect(state).toBe(message);
});
