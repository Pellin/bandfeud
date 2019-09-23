import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import getBand from '../../actions/getBand';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  jest.useFakeTimers();
  store = mockStore({ bands: [] });
});

afterEach(() => {
  jest.useRealTimers();
  fetchMock.restore();
});

it('should call api/getband if no matching band in bandBank', async () => {
  const previous = 'o';
  const reply = {
    answer: { name: 'one', url: 'www.1img.com' },
    serverBandBank: [
      { name: 'two', url: 'www.2img.com' },
      { name: 'three', url: 'www.3img.com' }
    ]
  };
  let used = [];
  let bandBank = [
    { name: 'four', url: 'wwww.4img.com' },
    { name: 'five', url: 'wwww.5img.com' },
    { name: 'six', url: 'wwww.6img.com' }
  ];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;
  const getimgURL = `/api/getimg?name=${reply.answer.name}`;

  fetchMock
    .get(getbandURL, JSON.stringify(reply))
    .get(getimgURL, JSON.stringify('reply.answer.url'));

  await store.dispatch(getBand(previous, used, bandBank));
  jest.runAllTimers();
  
  expect(fetchMock.done(getbandURL, getimgURL)).toBeTruthy();
  expect(fetchMock.lastUrl()).toBe(getimgURL);
});

it('should not call api/getband if matching band in bandBank', async () => {
  const previous = 'o';
  const reply = {
    answer: { name: 'one', url: 'www.1img.com' },
    serverBandBank: [
      { name: 'two', url: 'www.2img.com' },
      { name: 'three', url: 'www.3img.com' }
    ]
  };
  let used = [];
  let bandBank = [
    { name: 'orbital', url: 'wwww.4img.com' },
    { name: 'five', url: 'wwww.5img.com' },
    { name: 'six', url: 'wwww.6img.com' }
  ];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;
  const getimgURL = `/api/getimg?name=${bandBank[0].name}`;

  fetchMock
    .get(getbandURL, JSON.stringify(reply))
    .get(getimgURL, JSON.stringify('reply.answer.url'));

  await store.dispatch(getBand(previous, used, bandBank));
  jest.runAllTimers();

  expect(fetchMock.called(getbandURL)).toBeFalsy();
  expect(fetchMock.done(getimgURL)).toBeTruthy();
  expect(fetchMock.lastUrl()).toBe(getimgURL);
});

it('dispatches the expected actions if bankBand === true', async () => {
  const previous = 'o';

  let used = [];
  let bandBank = [
    { name: 'orbital', url: 'wwww.4img.com' },
    { name: 'five', url: 'wwww.5img.com' },
    { name: 'six', url: 'wwww.6img.com' }
  ];

  const expectedActions = [
    { type: 'UPDATE_BANDBANK', payload: bandBank },
    { type: 'ADD_TO_USED', payload: bandBank[0].name },
    {
      type: 'SET_PREVIOUS',
      payload: bandBank[0].name
    }
  ];

  const getimgURL = `/api/getimg?name=${bandBank[0].name}`;

  fetchMock.get(getimgURL, JSON.stringify('reply.answer.url'));

  await store.dispatch(getBand(previous, used, bandBank));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});

it('dispatches the expected actions if bankBand === false', async () => {
  const previous = 'o';
  const reply = {
    answer: { name: 'one', url: 'www.1img.com' },
    serverBandBank: [
      { name: 'two', url: 'www.2img.com' },
      { name: 'three', url: 'www.3img.com' }
    ]
  };
  let used = [];
  let bandBank = [
    { name: 'four', url: 'wwww.4img.com' },
    { name: 'five', url: 'wwww.5img.com' },
    { name: 'six', url: 'wwww.6img.com' }
  ];

  const expectedActions = [
    { type: 'ADD_TO_BANDBANK', payload: reply.serverBandBank },
    { type: 'ADD_TO_USED', payload: reply.answer.name },
    {
      type: 'SET_PREVIOUS',
      payload: reply.answer.name
    }
  ];

  const getbandURL = `/api/getband?previous=${previous}&used=${JSON.stringify(
    used
  )}`;
  const getimgURL = `/api/getimg?name=${reply.answer.name}`;

  fetchMock
    .get(getbandURL, JSON.stringify(reply))
    .get(getimgURL, JSON.stringify('reply.answer.url'));

  await store.dispatch(getBand(previous, used, bandBank));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});
