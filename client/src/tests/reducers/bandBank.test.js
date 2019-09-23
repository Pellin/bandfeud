import bandBankReducer from '../../reducers/bandBank';

let bandBank = [];

beforeEach(() => {
  bandBank = [
    { name: 'one', url: null },
    { name: 'two', url: null },
    { name: 'three', url: null }
  ];
});

it('should default state to empty array', () => {
  const state = bandBankReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('should add bands to bandBank', () => {
  const newBands = [{ name: 'four', url: null }, { name: 'five', url: null }];
  const state = bandBankReducer(bandBank, {
    type: 'ADD_TO_BANDBANK',
    payload: newBands
  });
  expect(state).toEqual([...bandBank, ...newBands]);
});

it('should update bandBank to new bandBank array', () => {
  const newBandBank = [{ name: 'five', url: null }, { name: 'six', url: null }];
  const state = bandBankReducer(bandBank, {
    type: 'UPDATE_BANDBANK',
    payload: newBandBank
  });
  expect(state).toEqual([...newBandBank]);
});

it('should reset bandBank to empty array', () => {
  const state = bandBankReducer(bandBank, {
    type: 'RESET_BANDBANK'
  });
  expect(state).toEqual([]);
});
