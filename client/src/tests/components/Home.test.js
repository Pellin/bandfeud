import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../../components/home/Home';

let onGetHighscoresSpy, onSetMessageSpy, onGameOnSpy, onSetOsSpy;

beforeEach(() => {
  onGetHighscoresSpy = jest.fn();
  onSetMessageSpy = jest.fn();
  onGameOnSpy = jest.fn();
  onSetOsSpy = jest.fn();
});

it('should render with <button> when inGame is false', () => {
  const wrapper = shallow(
    <Home
      inGame={false}
      onGetHighscores={onGetHighscoresSpy}
      onSetMessage={onSetMessageSpy}
      onSetOs={onSetOsSpy}
      onGameOn={onGameOnSpy}
      window={window}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should call onGetHighscores and onSetOs when rendered', () => {
  shallow(
    <Home
      inGame={false}
      onGetHighscores={onGetHighscoresSpy}
      onSetMessage={onSetMessageSpy}
      onSetOs={onSetOsSpy}
      onGameOn={onGameOnSpy}
    />
  );
  expect(onGetHighscoresSpy).toHaveBeenCalled();
  expect(onSetOsSpy).toHaveBeenCalled();
});

it('should call onSetMessage and onGameOn correctly when "PLAY" button is clicked', () => {
  jest.useFakeTimers();
  const wrapper = shallow(
    <Home
      inGame={false}
      onGetHighscores={onGetHighscoresSpy}
      onSetMessage={onSetMessageSpy}
      onSetOs={onSetOsSpy}
      onGameOn={onGameOnSpy}
    />
  );

  wrapper.find('button').simulate('click', { button: 0 });
  jest.runAllTimers();

  expect(onSetMessageSpy).toHaveBeenCalledWith('Get ready...');
  expect(onGameOnSpy).toHaveBeenCalled();
  expect(onSetMessageSpy).toHaveBeenCalledWith('');
  
  jest.useRealTimers();
});

it('should render with <Play /> when inGame is true', () => {
  const wrapper = shallow(
    <Home
      inGame={true}
      onGetHighscores={onGetHighscoresSpy}
      onSetMessage={onSetMessageSpy}
      onSetOs={onSetOsSpy}
      onGameOn={onGameOnSpy}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
