import React from 'react';
import { shallow } from 'enzyme';

import { Highscores } from '../../components/highscores/Highscores';

let highscores, onGetHighscoresSpy;

beforeEach(() => {
  highscores = [
    {
      _id: 'one',
      date: 1567247152162,
      score: 97,
      player: 'falle'
    },
    {
      _id: 'two',
      date: 1568387025126,
      score: 118,
      player: 'babs'
    },
    {
      _id: 'three',
      date: 1568447073138,
      score: 123,
      player: 'mob pete'
    },
    {
      _id: 'four',
      date: 1568734844461,
      score: 147,
      player: 'krille k'
    }
  ];
  onGetHighscoresSpy = jest.fn();
});

it('should render component correctly with highscores', () => {
  const wrapper = shallow(
    <Highscores highscores={highscores} onGetHighscores={onGetHighscoresSpy} />
  );
  
  expect(wrapper.find('HighscoreList').props().highscores.length).toBe(4);
  expect(wrapper.find('HighscoreList').props().highscores[0]).toEqual(highscores[0]);
  expect(wrapper.find('.load-message').length).toBe(0);
  expect(wrapper).toMatchSnapshot();
});

it('should render component correctly without highscores', () => {
  const wrapper = shallow(
    <Highscores highscores={[]} onGetHighscores={onGetHighscoresSpy} />
  );
  
  expect(wrapper.find('.load-message').props().children).toBe('Loading highscores...');
  expect(wrapper.find('.load-message').length).toBe(1);
  expect(wrapper).toMatchSnapshot();
});
