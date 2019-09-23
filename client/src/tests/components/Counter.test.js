import React from 'react';
import { shallow } from 'enzyme';

import { Counter } from '../../components/home/play/Counter';

let onSetCurrentPointsSpy, onGameOverSpy;

beforeEach(() => {
  jest.useFakeTimers();
  onGameOverSpy = jest.fn();
  onSetCurrentPointsSpy = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should render correctly with different difficulty props', () => {
  let wrapper = shallow(
    <Counter
      onGameOver={onGameOverSpy}
      onSetCurrentPoints={onSetCurrentPointsSpy}
      difficulty={20}
      inGame={true}
      submitted={false}
    />
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.state().timeLeft).toBe(20);
  wrapper.unmount();

  wrapper = shallow(
    <Counter
      onGameOver={onGameOverSpy}
      onSetCurrentPoints={onSetCurrentPointsSpy}
      difficulty={15}
      inGame={true}
      submitted={false}
    />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.state().timeLeft).toBe(15);
  wrapper.unmount();
});

it('should start counting when mounted', () => {
  const wrapper = shallow(
    <Counter
      submitted={false}
      inGame={true}
      onGameOver={onGameOverSpy}
      difficulty={20}
      onSetCurrentPoints={onSetCurrentPointsSpy}
    />
  );   
  expect(wrapper.state().timeLeft).toBe(20);

  jest.advanceTimersByTime(1000);

  expect(wrapper.state().timeLeft).toBe(19);
  expect(wrapper).toMatchSnapshot();
 
  jest.advanceTimersByTime(10000);

  expect(wrapper.state().timeLeft).toBe(9);
  expect(wrapper).toMatchSnapshot();
});

it('should dispatch gameOver when time is out', () => {
  const wrapper = shallow(
    <Counter
      submitted={false}
      inGame={true}
      onGameOver={onGameOverSpy}
      difficulty={20}
      onSetCurrentPoints={onSetCurrentPointsSpy}
    />
  );
  expect(wrapper.state().timeLeft).toBe(20);

  jest.runAllTimers();

  expect(wrapper.state().timeLeft).toBe(0);
  expect(onGameOverSpy).toHaveBeenCalled();
});

it('should set current points before unmounting', () => {
  const wrapper = shallow(
    <Counter
      submitted={false}
      inGame={true}
      onGameOver={onGameOverSpy}
      difficulty={20}
      onSetCurrentPoints={onSetCurrentPointsSpy}
    />
  );
  jest.advanceTimersByTime(4000);

  expect(wrapper.state().timeLeft).toBe(16);

  wrapper.unmount();

  expect(onSetCurrentPointsSpy).toHaveBeenCalledWith(16);
});
