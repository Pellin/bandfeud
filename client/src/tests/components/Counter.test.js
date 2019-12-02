import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Counter } from '../../components/home/play/Counter';

let onSetCurrentPointsSpy, onGameOverSpy, addFailedBandSpy;

beforeEach(() => {
  jest.useFakeTimers();
  onGameOverSpy = jest.fn();
  onSetCurrentPointsSpy = jest.fn();
  addFailedBandSpy = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should render correctly with different difficulty props', () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Counter
        addFailedBand={addFailedBandSpy}
        onGameOver={onGameOverSpy}
        onSetCurrentPoints={onSetCurrentPointsSpy}
        difficulty={20}
        inGame={true}
        score={45}
        submitted={false}
      />
    );
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.counter').text()).toBe('20');

  wrapper.unmount();

  act(() => {
    wrapper = mount(
      <Counter
        addFailedBand={addFailedBandSpy}
        onGameOver={onGameOverSpy}
        onSetCurrentPoints={onSetCurrentPointsSpy}
        difficulty={15}
        inGame={true}
        score={45}
        submitted={false}
      />
    );
  });
  expect(onSetCurrentPointsSpy).toHaveBeenCalled();
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.counter').text()).toBe('15');
  wrapper.unmount();
});

it('should start counting when mounted', () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Counter
        addFailedBand={addFailedBandSpy}
        submitted={false}
        inGame={true}
        onGameOver={onGameOverSpy}
        difficulty={20}
        score={45}
        onSetCurrentPoints={onSetCurrentPointsSpy}
      />
    );
  });

  expect(wrapper.find('.counter').text()).toBe('20');

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(wrapper.find('.counter').text()).toBe('19');
  expect(wrapper).toMatchSnapshot();

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  expect(wrapper.find('.counter').text()).toBe('9');
  expect(wrapper).toMatchSnapshot();
});

it('should dispatch gameOver when time is out', () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Counter
        addFailedBand={addFailedBandSpy}
        submitted={false}
        inGame={true}
        onGameOver={onGameOverSpy}
        difficulty={20}
        score={45}
        onSetCurrentPoints={onSetCurrentPointsSpy}
      />
    );
  })

  expect(wrapper.find('.counter').text()).toBe('20');

  act(() => {
    jest.runAllTimers();
  })
  
  expect(onGameOverSpy).toHaveBeenCalled();
});

it('should set current points before unmounting', () => {
  let wrapper;

  act(() => {
    wrapper = mount(
      <Counter
        addFailedBand={addFailedBandSpy}
        submitted={false}
        inGame={true}
        onGameOver={onGameOverSpy}
        difficulty={20}
        score={45}
        onSetCurrentPoints={onSetCurrentPointsSpy}
      />
    );
    jest.advanceTimersByTime(4000);
  })


  expect(wrapper.find('.counter').text()).toBe('16');

  wrapper.unmount();

  expect(onSetCurrentPointsSpy).toHaveBeenCalledWith(16);
});
