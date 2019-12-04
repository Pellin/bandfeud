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
  const getimgURL = `/api/getimg?name=${reply.name}`;

  fetchMock
    .get(getbandURL, JSON.stringify(reply))
    .get(getimgURL, JSON.stringify(reply.url));

  await store.dispatch(getBand(previous, used));
  jest.runAllTimers();

  expect(fetchMock.done(getbandURL, getimgURL)).toBeTruthy();
  expect(fetchMock.lastUrl()).toBe(getimgURL);
});

it('dispatches the expected actions ', async () => {
  const previous = 'o';
  const reply = { name: 'one', url: 'www.1img.com' };

  let used = [];

  const expectedActions = [
    { type: 'ADD_TO_USED', payload: 'one' },
    { type: 'SET_PREVIOUS', payload: 'one' }
  ];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;
  const getimgURL = `/api/getimg?name=${reply.name}`;

  fetchMock
    .get(getbandURL, JSON.stringify(reply))
    .get(getimgURL, JSON.stringify(reply.url));

  await store.dispatch(getBand(previous, used));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});
