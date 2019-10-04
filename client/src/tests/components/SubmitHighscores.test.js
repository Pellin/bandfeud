import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';

import { SubmitHighscore } from '../../components/highscores/SubmitHighscore';

let bands,
  score,
  onGetHighscoresSpy,
  onHighscoreSetSpy,
  onResetUsedSpy,
  onResetScoreSpy,
  onResetBandBankSpy,
  onResetDifficultySpy,
  onGameOverSpy,
  history,
  wrapper;

beforeEach(() => {
  (bands = [
    { name: 'one', url: 'www.1img.com' },
    { name: 'two', url: 'www.2img.com' },
    { name: 'three', url: 'www.3img.com' },
    { name: 'four', url: 'www.4img.com' }
  ]),
    (score = 123);
  onGetHighscoresSpy = jest.fn();
  onHighscoreSetSpy = jest.fn();
  onResetUsedSpy = jest.fn();
  onResetScoreSpy = jest.fn();
  onResetBandBankSpy = jest.fn();
  onResetDifficultySpy = jest.fn();
  onGameOverSpy = jest.fn();
  history = jest.fn();
  history.push = jest.fn();

  wrapper = shallow(
    <SubmitHighscore
      bands={bands}
      score={score}
      onGetHighscores={onGetHighscoresSpy}
      onHighscoreSet={onHighscoreSetSpy}
      onResetUsed={onResetUsedSpy}
      onResetScore={onResetScoreSpy}
      onResetBandBank={onResetBandBankSpy}
      onResetDifficulty={onResetDifficultySpy}
      onGameOver={onGameOverSpy}
      history={history}
    />
  );
});

afterEach(() => {
  fetchMock.restore();
});

it('should render component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should set highscore and render confirmation', async () => {
  fetchMock.post('/api/sethighscore', 200);

  await act(async () => {
    wrapper.find('input').simulate('change', { target: { value: 'Falle' } });
    wrapper.find('.submit-form').simulate('submit', {
      preventDefault: () => {}
    });
  });

  expect(wrapper).toMatchSnapshot();
  expect(onGetHighscoresSpy).toHaveBeenCalled();
  expect(wrapper.find('.highscore-message').text()).toBe('Highscore set!');
});

it('should call the right methods when goToHighscores button is clicked', async () => {
  fetchMock.post('/api/sethighscore', 200);

  await act(async () => {
    wrapper.find('input').simulate('change', { target: { value: 'Falle' } });
    wrapper.find('.submit-form').simulate('submit', {
      preventDefault: () => {}
    });
  });

  wrapper.find('.highscore-link-container').childAt(0).simulate('click', { button: 0 });
  expect(onHighscoreSetSpy).toHaveBeenCalled();
  expect(onGameOverSpy).toHaveBeenCalled();
});

it('should call the right methods when goToPlay button is clicked', async () => {
  fetchMock.post('/api/sethighscore', 200);

  await act(async () => {
    wrapper.find('input').simulate('change', { target: { value: 'Falle' } });
    wrapper.find('.submit-form').simulate('submit', {
      preventDefault: () => {}
    });
  });

  wrapper.find('.highscore-link-container').childAt(1).simulate('click', { button: 0 });
  expect(onHighscoreSetSpy).toHaveBeenCalled();
  expect(history.push).toHaveBeenCalledWith('/highscores');
});