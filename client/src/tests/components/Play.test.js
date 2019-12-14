import React from 'react';
import { shallow } from 'enzyme';

import { Play } from '../../components/home/play/Play';

let used, previous;

beforeEach(() => {
  used = ['one', 'two', 'three'];
  previous = 'a';
});

it('should render Play correctly with get ready message', () => {
  const wrapper = shallow(
    <Play
      used={[]}
      submitted={true}
      previous={previous}
      inGame={true}
      isHighscore={false}
      difficulty={20}
      score={0}
      bands={[]}
      message={'Get ready...'}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('should show submitform when submitted is falsy', () => {
  const wrapper = shallow(
    <Play
      used={[]}
      submitted={false}
      previous={previous}
      inGame={true}
      isHighscore={false}
      difficulty={20}
      score={0}
      bands={[]}
      message={''}
    />
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.submit-band').children().length).toBe(1);
});

it('should not show submitform and counter when submitted is true', () => {
  const wrapper = shallow(
    <Play
      used={[]}
      submitted={true}
      previous={previous}
      inGame={true}
      isHighscore={false}
      difficulty={20}
      score={0}
      bands={[]}
      message={''}
    />
  );

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.submit-band').children().length).toBe(0);
  expect(wrapper.find('.counter-container').children().length).toBe(0);
});

it('should show bands in band-list', () => {
  const wrapper = shallow(
    <Play
      used={used}
      submitted={false}
      previous={'r'}
      inGame={true}
      isHighscore={false}
      difficulty={20}
      score={76}
      bands={[
        { name: 'one', url: 'www.1img.com' },
        { name: 'two', url: 'www.2img.com' },
        { name: 'three', url: 'www.3img.com' },
        { name: 'four', url: 'www.4img.com' }
      ]}
      message={''}
    />
  );

  expect(wrapper).toMatchSnapshot();
  expect(
    wrapper
      .find('.band-list')
      .children()
      .props('bands')
      .bands
  ).toEqual([
    { name: 'one', url: 'www.1img.com' },
    { name: 'two', url: 'www.2img.com' },
    { name: 'three', url: 'www.3img.com' },
    { name: 'four', url: 'www.4img.com' }
  ]);
});

it('should show SubmitHighscore instead if state is right', () => {
  const wrapper = shallow(
    <Play
      history={() => {}}
      used={used}
      submitted={false}
      previous={'r'}
      inGame={true}
      isHighscore={true}
      difficulty={20}
      score={76}
      bands={[
        { name: 'one', url: 'www.1img.com' },
        { name: 'two', url: 'www.2img.com' },
        { name: 'three', url: 'www.3img.com' },
        { name: 'four', url: 'www.4img.com' }
      ]}
      message={''}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
