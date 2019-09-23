import React from 'react';
import { shallow } from 'enzyme';

import { SubmitBand } from '../../components/home/play/SubmitBand';

let onCheckBandSpy, onSetDifficultySpy;
let previous, used, bandBank, score, difficulty;
let wrapper;

beforeEach(() => {
  onCheckBandSpy = jest.fn();
  onSetDifficultySpy = jest.fn();
  previous = {previous1: 'o', previous2: ''};
  used = ['two', 'three', 'four'];
  bandBank = [
    { name: 'five', url: 'www.5img.com' },
    { name: 'six', url: 'www.6img.com' },
    { name: 'seven', url: 'www.7img.com' }
  ];
  score = 23;
  difficulty = 20;

  wrapper = shallow(
    <SubmitBand
      onCheckBand={onCheckBandSpy}
      onSetDifficulty={onSetDifficultySpy}
      previous={previous}
      used={used}
      bandBank={bandBank}
      score={score}
      difficulty={difficulty}
    />
  );
});

it('should render component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should render component correctly with value for previous2', () => {
  previous = {previous1: '13', previous2: 'n'};
  wrapper = shallow(
    <SubmitBand
      onCheckBand={onCheckBandSpy}
      onSetDifficulty={onSetDifficultySpy}
      previous={previous}
      used={used}
      bandBank={bandBank}
      score={score}
      difficulty={difficulty}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('should update state.band and rerender input value when band-input changes', () => {
  expect(wrapper.state().band).toBeFalsy();

  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one'
    }
  });
  
  expect(wrapper.state().band).toBe('one');
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
    bandBank,
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

it('should reset state.band after submission and call onSetDifficulty with used lenght', () => {
  wrapper.find('.band-input').simulate('change', {
    target: {
      value: 'one'
    }
  });
  wrapper.find('.band-input-form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state().band).toBeFalsy();
  expect(onSetDifficultySpy).toHaveBeenCalledWith(used.length);
});
