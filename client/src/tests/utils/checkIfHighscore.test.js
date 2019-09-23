import fetchMock from 'fetch-mock';
import checkIfHighscore from '../../utils/checkIfHighscore';

it('should send a call to the backend with great score and get true back', async () => {
  const score = 198;
  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  fetchMock.get(checkhighscoreURL, 202);

  const highscore = await checkIfHighscore(score);

  expect(highscore).toBeTruthy();

  fetchMock.restore();
});

it('should send a call to the backend with really bad score and get false back', async () => {
  const score = 25;
  const checkhighscoreURL = `/api/checkhighscore?score=${score}`;

  fetchMock.get(checkhighscoreURL, 204);

  const highscore = await checkIfHighscore(score);

  expect(highscore).toBeFalsy();

  fetchMock.restore();
});
