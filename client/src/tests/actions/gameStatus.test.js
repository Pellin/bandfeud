import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { gameOn, gameOver, gameAborted } from '../../actions/gameStatus';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  jest.useFakeTimers();
  store = mockStore({
    inGame: true,
    score: 50
  });
});

afterEach(() => {
  jest.useRealTimers();
  fetchMock.restore();
});

it('(gameOn) should dispatch expected actions', async () => {
  await store.dispatch(gameOn());
  expect(store.getActions()[0].type).toMatch('RESET_BANDS');
  expect(store.getActions()[1].type).toMatch('SET_PREVIOUS');
  expect(store.getActions()[1].payload).toMatch(/[a-z]/);
  expect(store.getActions()[2].type).toMatch('GAME_ON');
  expect(store.getActions()[3].type).toMatch('SUBMITTED:_FALSE');
});

it('(gameOver) should dispatch expected actions', async () => {
  const message = 'a message from test';
  const score = 123;
  const expectedActions = [
    { type: 'SET_MESSAGE', payload: message },
    { type: 'SHOW_GAME_OVER' },
    { type: 'RESET_USED' },
    { type: 'SET_MESSAGE', payload: '' },
    { type: 'HIDE_GAME_OVER' },
    { type: 'GAME_OVER' },
    { type: 'RESET_SCORE' },
    { type: 'RESET_DIFFICULTY' }
  ];

  fetchMock.get(`/api/checkhighscore?score=${score}`, 204);

  await store.dispatch(gameOver(message, score));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});

it('(gameOver) should dispatch expected actions if highscore === true', async () => {
  const message = 'a message from test';
  const score = 123;
  const expectedActions = [
    { type: 'SET_MESSAGE', payload: 'a message from test' },
    { type: 'SHOW_GAME_OVER' },
    { type: 'RESET_USED' },
    { type: 'HIDE_GAME_OVER' },
    { type: 'HIGHSCORE:_TRUE' }
  ];

  fetchMock.get(`/api/checkhighscore?score=${score}`, 202);

  await store.dispatch(gameOver(message, score));
  jest.runAllTimers();

  expect(store.getActions()).toEqual(expectedActions);
});

it('(gameAborted) should dispatch expected actions', async () => {
  const expectedActions = [
    { type: 'SET_MESSAGE', payload: '' },
    { type: 'RESET_BANDS' },
    { type: 'GAME_OVER' },
    { type: 'RESET_USED' },
    { type: 'RESET_SCORE' },
    { type: 'RESET_DIFFICULTY' }
  ];
  await store.dispatch(gameAborted());

  expect(store.getActions()).toEqual(expectedActions);
});
