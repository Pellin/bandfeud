import bandsReducer from '../../reducers/bands';

let bands = [];

beforeEach(() => {
  bands = [
    { name: 'one', url: null },
    { name: 'two', url: null },
    { name: 'three', url: null }
  ];
});

it('should default state to empty array', () => {
  const state = bandsReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('should add a new band to bands array', () => {
  const newBand = {
    name: 'four',
    url: null
  };
  const state = bandsReducer(bands, {
    type: 'ADD_BAND',
    ...newBand
  });
  expect(state).toEqual([...bands, newBand]);
});

it('should reset bands to empty array', () => {
  const state = bandsReducer(bands, {
    type: 'RESET_BANDS'
  });
  expect(state).toEqual([]);
});
