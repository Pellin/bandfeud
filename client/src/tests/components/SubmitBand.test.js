import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { SubmitBand } from '../../components/home/play/SubmitBand';

let onCheckBandSpy, onSetDifficultySpy;
let previous, used, score, difficulty;
let wrapper;

beforeEach(() => {
  onCheckBandSpy = jest.fn();
  onSetDifficultySpy = jest.fn();
  previous = { previous1: 'o', previous2: '' };
  used = ['two', 'three', 'four'];
  score = 23;
  difficulty = 20;

  wrapper = shallow(
    <SubmitBand
      onCheckBand={onCheckBandSpy}
      onSetDifficulty={onSetDifficultySpy}
      previous={previous}
      used={used}
      score={score}
      difficulty={difficulty}
    />
  );
});

it('should render component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should render component correctly with value for previous2', () => {
  previous = { previous1: '13', previous2: 'n' };
  wrapper = shallow(
    <SubmitBand
      onCheckBand={onCheckBandSpy}
      onSetDifficulty={onSetDifficultySpy}
      previous={previous}
      used={used}
      score={score}
      difficulty={difficulty}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should update state.band and rerender input value when band-input changes', () => {
  expect(wrapper.find('.band-input').props().value).toBe('');

  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one'
    }
  });

  expect(wrapper.find('.band-input').props().value).toBe('one');
  expect(wrapper).toMatchSnapshot();
});

it('should call onCheckBand if valid band name is submitted', () => {
  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one'
    }
  });
  wrapper.find('.band-input-form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(onCheckBandSpy).toHaveBeenCalledWith(
    'one',
    previous,
    used,
    score,
    difficulty
  );
});

it('should not call onCheckBand if band name is shorter than two letters', () => {
  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'o'
    }
  });
  wrapper.find('.band-input-form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(onCheckBandSpy).not.toHaveBeenCalled();
});

it('should not call onCheckBand if band name ends with a non-alphabet character', () => {
  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one.'
    }
  });
  wrapper.find('.band-input-form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(onCheckBandSpy).not.toHaveBeenCalled();
});

it('should reset state.band after submission and call onSetDifficulty with used length', () => {
  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one'
    }
  });
  wrapper.find('.band-input-form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.find('.band-input').props().value).toBeFalsy();
  expect(onSetDifficultySpy).toHaveBeenCalledWith(used.length);
});
