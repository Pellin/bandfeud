import setMessage from '../../actions/setMessage';

it('should setup set message action', () => {
  const message = 'Get ready...';
  const action = setMessage(message);

  expect(action).toEqual({
    type: 'SET_MESSAGE',
    payload: message
  });
});
