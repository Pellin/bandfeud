import React from 'react';
import { shallow } from 'enzyme';

import BandItem from '../../components/home/play/BandItem';

it('should render BandItem correctly', () => {
  const wrapper = shallow(<BandItem name="one" url="www.1img.com" />);

  expect(wrapper.find('.band-item-title').text()).toBe('one');
  expect(wrapper.find('.band-item-title').children().length).toBe(1);
  expect(wrapper.find('img').prop('src')).toBe('www.1img.com');
  expect(wrapper).toMatchSnapshot();
});
