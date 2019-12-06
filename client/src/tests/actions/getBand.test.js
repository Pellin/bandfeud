import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import getBand from '../../actions/getBand';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  jest.useFakeTimers();
  store = mockStore({ bands: [], inGame: true });
});

afterEach(() => {
  jest.useRealTimers();
  fetchMock.restore();
});

it('should call api/getband', async () => {
  const previous = 'o';
  const reply = {
    name: 'one',
    url: 'www.1img.com'
  };
  let used = [];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;

  fetchMock.get(getbandURL, JSON.stringify(reply));

  await store.dispatch(getBand(previous, used));
  jest.runAllTimers();

  expect(fetchMock.done(getbandURL)).toBeTruthy();
});

it('dispatches the expected actions ', async () => {
  const previous = 'o';
  const reply = { name: 'one', imgUrl: 'www.1img.com', discogsId: 12345 };

  let used = [];

  const expectedActions = [
    { type: 'ADD_TO_USED', payload: 'one' },
    { type: 'SET_PREVIOUS', payload: 'one' },
    { type: 'ADD_BAND', name: 'one', url: 'www.1img.com', discogsId: 12345 },
    { type: 'SUBMITTED:_FALSE' },
    { type: 'SET_MESSAGE', payload: '' }
  ];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;

  fetchMock.get(getbandURL, JSON.stringify(reply));

  await store.dispatch(getBand(previous, used));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});
