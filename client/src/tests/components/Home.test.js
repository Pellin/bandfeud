import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { Home } from '../../components/home/Home';

let onGetHighscoresSpy,
  onSetMessageSpy,
  onGameOnSpy,
  onSetOsSpy,
  bands

beforeEach(() => {
  onGetHighscoresSpy = jest.fn();
  onSetMessageSpy = jest.fn();
  onGameOnSpy = jest.fn();
  onSetOsSpy = jest.fn();
  bands = [
    { name: 'one', url: 'www.1img.com' },
    { name: 'two', url: 'www.2img.com' },
    { name: 'three', url: 'www.3img.com' }
  ];
});

it('should render with PLAY <button> when inGame is false', () => {
  const wrapper = shallow(
    <Home
      bands={[]}
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

it('should render with PLAY <button> and Review... <button> when inGame is false and bands.length > 0', () => {
  const wrapper = shallow(
    <Home
      bands={bands}
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

it('should call onSetMessage and onGameOn correctly when "PLAY" button is clicked', () => {
  jest.useFakeTimers();
  const wrapper = shallow(
    <Home
      bands={[]}
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
