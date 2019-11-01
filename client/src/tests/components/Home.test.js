import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../../components/home/Home';

let onGetHighscoresSpy, onSetMessageSpy, onGameOnSpy, onSetOsSpy, bands;

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

  wrapper.find('.new-game-button').simulate('click', { button: 0 });
  jest.runAllTimers();

  expect(onSetMessageSpy).toHaveBeenCalled();
  expect(onGameOnSpy).toHaveBeenCalled();

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

it('should render ShowBandlistModal when "REVIEW LAST ROUND" button is clicked', () => {
  const wrapper = shallow(
    <Home
      bands={bands}
      inGame={false}
      onGetHighscores={onGetHighscoresSpy}
      onSetMessage={onSetMessageSpy}
      onSetOs={onSetOsSpy}
      onGameOn={onGameOnSpy}
    />
  );
  expect(wrapper.find('ShowBandlistModal').props().showModal).toBeFalsy();
  wrapper.find('button.show-modal-button').simulate('click', { button: 0 });
  expect(wrapper.find('ShowBandlistModal').props().showModal).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
});
