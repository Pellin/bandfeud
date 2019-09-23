import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import getBand from '../../actions/checkBand';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  store = mockStore({
    submitted: false,
    highscore: false,
    currentPoints: 16,
    score: 0
  });
  jest.useFakeTimers();
});

afterEach(() => {
  fetchMock.restore();
  jest.useRealTimers();
});

it('should dispatch expected actions if "band" matches', async () => {
  const band = 'seven';
  const previous = { previous1: 's', previous2: '' };
  const used = ['one', 'two', 'three'];
  const bandBank = [
    { name: 'four', url: 'www.4img.com' },
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' }
  ];
  const score = 23;
  const checkbandURL = `/api/checkband?name=${band}`;
  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  const reply = {
    answer: { name: 'one', url: 'www.1img.com' },
    serverBandBank: [
      { name: 'two', url: 'www.2img.com' },
      { name: 'three', url: 'www.3img.com' }
    ]
  };

  const expectedActions = [
    { type: 'SUBMITTED:_TRUE' },
    { type: 'SET_MESSAGE', payload: 'Checking...' },
    { type: 'ADD_TO_SCORE', payload: 19 },
    { type: 'ADD_BAND', name: 'seven', url: 'www.7img.com' },
    { type: 'SET_MESSAGE', payload: 'Correct!' },
    { type: 'SET_MESSAGE', payload: 'Get ready...' }
  ];
  fetchMock
    .post(checkbandURL, { name: 'seven', imgUrl: 'www.7img.com' })
    .get(checkhighscoreURL, 204)
    .get(
      `/api/getband?previous=n&used=${JSON.stringify([...used, band])}`,
      JSON.stringify(reply)
    );

  await store.dispatch(getBand(band, previous, used, bandBank, score));
  jest.runAllTimers();
 
  expect(store.getActions()).toEqual(expectedActions);
});

it("should dispatch expected actions if 'band' doesn't match", async () => {
  const band = 'seven';
  const previous = { previous1: 's', previous2: '' };
  const used = ['one', 'two', 'three'];
  const bandBank = [
    { name: 'four', url: 'www.4img.com' },
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' }
  ];
  const score = 23;
  const checkbandURL = `/api/checkband?name=${band}`;
  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  const expectedActions = [ { type: 'SUBMITTED:_TRUE' },
  { type: 'SET_MESSAGE', payload: 'Checking...' },
  { type: 'SET_MESSAGE', payload: 'Not in database! GAME OVER.' },
  { type: 'RESET_USED' },
  { type: 'RESET_BANDS' } ]

  fetchMock.post(checkbandURL, 200).get(checkhighscoreURL, 204);

  await store.dispatch(getBand(band, previous, used, bandBank, score));
  jest.runAllTimers();
 
  expect(store.getActions()).toEqual(expectedActions);
});

it('should dispatch game over if band was already used', async () => {
  const band = 'seven';
  const previous = { previous1: 's', previous2: '' };
  const used = ['one', 'two', 'three', 'seven'];
  const bandBank = [
    { name: 'four', url: 'www.4img.com' },
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' }
  ];
  const score = 23;

  const expectedActions = [
    { type: 'SUBMITTED:_TRUE' },
    { type: 'SET_MESSAGE', payload: "Already used! You're out, Einstein" },
    { type: 'RESET_USED' },
    { type: 'RESET_BANDS' }
  ];

  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  fetchMock.get(checkhighscoreURL, 204);

  await store.dispatch(getBand(band, previous, used, bandBank, score));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});

it('should dispatch game over if band has incorrect first letter', async () => {
  const band = 'seven';
  const previous = { previous1: 'm', previous2: '' };
  const used = ['one', 'two', 'three'];
  const bandBank = [
    { name: 'four', url: 'www.4img.com' },
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' }
  ];
  const score = 23;

  const expectedActions = [
    { type: 'SUBMITTED:_TRUE' },
    { type: 'SET_MESSAGE', payload: 'Wrong letter! You lose, punk' },
    { type: 'RESET_USED' },
    { type: 'RESET_BANDS' }
  ];

  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  fetchMock.get(checkhighscoreURL, 204);

  await store.dispatch(getBand(band, previous, used, bandBank, score));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});

it('should dispatch expected actions if highscore', async () => {
  const band = 'seven';
  const previous = { previous1: 'm', previous2: '' };
  const used = ['one', 'two', 'three'];
  const bandBank = [
    { name: 'four', url: 'www.4img.com' },
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' }
  ];
  const score = 23;

  const expectedActions = [
    { type: 'SUBMITTED:_TRUE' },
    { type: 'SET_MESSAGE', payload: 'Wrong letter! You lose, punk' },
    { type: 'RESET_USED' },
    { type: 'RESET_BANDS' }
  ];

  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  fetchMock.get(checkhighscoreURL, 202);

  await store.dispatch(getBand(band, previous, used, bandBank, score));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});
