import React from 'react';
import { shallow } from 'enzyme';

import MessageBox from '../../components/home/MessageBox';

it('should render messageBox with set message', () => {
  const message = 'Get ready...';
  const wrapper = shallow(<MessageBox message={message} />);
  expect(wrapper.find('.message-box').text()).toBe(message);
  expect(wrapper).toMatchSnapshot();
});