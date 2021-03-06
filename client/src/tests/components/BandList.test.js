import React from 'react';
import { shallow } from 'enzyme';

import BandList from '../../components/home/play/BandList';

let oneBand, threeBands, sixBands;

beforeEach(() => {
  oneBand = [{ name: 'one', url: 'wwww.1img.com' }];
  threeBands = [
    { name: 'one', url: 'wwww.1img.com' },
    { name: 'two', url: 'wwww.2img.com' },
    { name: 'three', url: 'wwww.3img.com' }
  ];
  sixBands = [
    { name: 'one', url: 'wwww.1img.com' },
    { name: 'two', url: 'wwww.2img.com' },
    { name: 'three', url: 'wwww.3img.com' },
    { name: 'four', url: 'wwww.4img.com' },
    { name: 'five', url: 'wwww.5img.com' },
    { name: 'six', url: 'wwww.6img.com' }
  ];
});

it('should render component correctly with 0 bands', () => {
  const wrapper = shallow(<BandList bands={[]} />);

  expect(wrapper).toMatchSnapshot();
});

it('should render correct number of BandItem components when new bands are added', () => {
  let wrapper = shallow(<BandList bands={oneBand} />);
  expect(wrapper.find('BandItem').length).toBe(1);

  wrapper = shallow(<BandList bands={threeBands} />);
  expect(wrapper.find('BandItem').length).toBe(3);

  wrapper = shallow(<BandList bands={sixBands} />);
  expect(wrapper.find('BandItem').length).toBe(6);
});
