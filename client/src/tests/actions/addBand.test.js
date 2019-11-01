import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import addBand from '../../actions/addBand';

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

it('should dispatch correct actions for "computer"', async () => {
  const name = 'kiss';
  const url = 'www.img.com';

  fetchMock.get(`/api/getimg?name=${name}`, JSON.stringify('www.img.com'));

  const computerActions = [
    { type: 'ADD_BAND', name, url },
    { type: 'SUBMITTED:_FALSE' },
    { type: 'SET_MESSAGE', payload: '' }
  ];

  await store.dispatch(addBand(name, url, 'computer'));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(computerActions);
});

it('should dispatch correct actions for "user"', async () => {
  const name = 'kiss';
  const url = 'www.img.com';

  fetchMock.get(`/api/getimg?name=${name}`, JSON.stringify('www.img.com'));

  const userActions = [
    { type: 'ADD_BAND', name: 'kiss', points: 26, url: 'www.img.com' },
    { type: 'SET_MESSAGE', payload: 'Good!' },
    { type: 'SET_MESSAGE', payload: 'Get ready...' }
  ];

  await store.dispatch(addBand(name, url, 'user', 26));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(userActions);
});

it('should call fetch(getImg) if "computer" turn', async () => {
  const name = 'kiss';
  const url = 'www.img.com';

  fetchMock.get(`/api/getimg?name=${name}`, JSON.stringify('www.img.com'));

  await store.dispatch(addBand(name, url, 'computer'));
  jest.runAllTimers();

  expect(fetchMock.called()).toBeTruthy();
});

it('should not call fetch(getImg) if "user" turn', async () => {
  const name = 'kiss';
  const url = 'www.img.com';

  fetchMock.get(`/api/getimg?name=${name}`, JSON.stringify('www.img.com'));

  await store.dispatch(addBand(name, url, 'user', 21));
  jest.runAllTimers();

  expect(fetchMock.called()).toBeFalsy();
});