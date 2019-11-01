import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Points from '../../components/home/play/Points';

it('should render Points correctly', () => {
  const wrapper = mount(<Points points={23} />);
  expect(wrapper.find('div').text()).toBe('+23');
  expect(wrapper).toMatchSnapshot();
});