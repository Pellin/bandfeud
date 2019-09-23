import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import getHighscores from '../../actions/getHighscores';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  store = mockStore({ bands: [] });
});

afterEach(() => {
  fetchMock.restore();
});

it('should make a fetch request to api/gethighscores()', async () => {
  const highscores = [
    { date: 123, player: 'Kenta', score: 23 },
    { date: 234, player: 'Stoffe', score: 32 },
    { date: 321, player: 'Falle', score: 210 }
  ];
  fetchMock.get('/api/gethighscores', highscores);

  await store.dispatch(getHighscores());

  expect(fetchMock.called()).toBeTruthy();
});

it('should dispatch set highscores action with highscores', async () => {
  const highscores = [
    { date: 123, player: 'Kenta', score: 23 },
    { date: 234, player: 'Stoffe', score: 32 },
    { date: 321, player: 'Falle', score: 210 }
  ];
  fetchMock.get('/api/gethighscores', highscores);

  const expectedActions = [
    {
      type: 'SET_HIGHSCORES',
      payload: [
        { date: 123, player: 'Kenta', score: 23 },
        { date: 234, player: 'Stoffe', score: 32 },
        { date: 321, player: 'Falle', score: 210 }
      ]
    }
  ];
  await store.dispatch(getHighscores());

  expect(store.getActions()).toEqual(expectedActions);
});
