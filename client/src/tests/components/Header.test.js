import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../components/Header';

it('should render Header correctly when inGame is true', () => {
  const wrapper = shallow(<Header inGame={true} used={['one', 'two']} />);

  expect(wrapper).toMatchSnapshot();
});

it('should render Header correctly when inGame is false', () => {
  const wrapper = shallow(<Header inGame={false} used={['one', 'two']} />);
  expect(wrapper).toMatchSnapshot();
});
