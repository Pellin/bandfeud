import React from 'react';
import { shallow } from 'enzyme';

import HighscoreList from '../../components/highscores/HighscoreList';

let highscores = [
  {
    date: 1567247152162.0,
    score: 97,
    player: 'falle'
  },
  {
    date: 1568387025126.0,
    score: 118,
    player: 'babs'
  },
  {
    date: 1568447073138.0,
    score: 123,
    player: 'mob pete'
  },
  {
    date: 1568734844461.0,
    score: 147,
    player: 'krille k'
  }
];

beforeEach(() => {});

it('should render HighscoreList correctly', () => {
  const wrapper = shallow(<HighscoreList highscores={highscores} />);

  expect(wrapper).toMatchSnapshot();
});
