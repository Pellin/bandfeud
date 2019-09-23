import submittedReducer from '../../reducers/submitted';

it('should default state to false', () => {
  const state = submittedReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toBeFalsy();
});

it('should set state to true', () => {
  const state = submittedReducer(false, {
    type: 'SUBMITTED:_TRUE'
  });
  expect(state).toBeTruthy();
});

it('should set state to false', () => {
  const state = submittedReducer(true, {
    type: 'SUBMITTED:_FALSE'
  });
  expect(state).toBeFalsy();
});