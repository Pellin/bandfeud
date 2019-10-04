import React from 'react';
import { shallow } from 'enzyme';
import ShowBandListModal from '../../components/highscores/ShowBandlistModal';

let bands, playerInfo, wrapper;

beforeEach(() => {
  bands = [
    { name: 'one', url: 'www.1img.com', points: 12 },
    { name: 'two', url: 'www.2img.com' },
    { name: 'three', url: 'www.3img.com', points: 31 },
    { name: 'four', url: 'www.4img.com' }
  ];
  playerInfo = {
    player: 'Falle',
    date: 1570214169008,
    score: 297
  };
});

it('should render component correctly', () => {
  const onClick = () => {};
  const wrapper = shallow(
    <ShowBandListModal showModal={true} playerInfo={playerInfo} bands={bands} onClick={onClick} />
  );
  expect(wrapper.find('img').length).toBe(4);
  expect(wrapper.find({ alt: bands[2].name }).props()).toMatchObject({
    alt: 'three',
    className: 'band-image',
    src: 'www.3img.com',
    title: 'Open Discogs page for THREE '
  });
  expect(wrapper).toMatchSnapshot();
});

it('should open discogs page when band image is clicked', () => {
  global.open = jest.fn();
  const wrapper = shallow(
    <ShowBandListModal showModal={true} playerInfo={playerInfo} bands={bands} />
  );
  wrapper.find({ alt: bands[0].name }).simulate('click', { button: 0 });
  expect(global.open).toHaveBeenCalledWith(
    `https://www.discogs.com/artist/${bands[0].name}`
  );
});
