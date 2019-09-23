import osReducer from '../../reducers/os';

// let osString;

// beforeEach(() => {
//   osString =
//     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36';
// });

it('should default state to empty string', () => {
  const state = osReducer(undefined, {
    type: 'SET_OS',
    payload: ''
  });
  expect(state).toBe('');
});

it('should set os to iOS', () => {
  const state = osReducer(undefined, {
    type: 'SET_OS',
    payload: 'iOS'
  });

  expect(state).toBe('iOS');
});
