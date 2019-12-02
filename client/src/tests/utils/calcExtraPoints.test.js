import calcExtraPoints from '../../utils/calcExtraPoints';

it('should return correct points with difficulty 20', () => {
  const oBandPoints = calcExtraPoints(19, 'the orb', 20, 'desktop');
  const oBandPointsIos = calcExtraPoints(17, 'the orb', 20, 'ios');
  const zBandPoints = calcExtraPoints(19, 'zz top', 20, 'desktop');
  const zBandPointsIos = calcExtraPoints(17, 'zz top', 20, 'ios');
  const onlyOnesPoints = calcExtraPoints(16, 'the only ones', 20, 'desktop');
  const onlyOnesPointsIos = calcExtraPoints(13, 'the only ones', 20, 'ios');
  const yellowMagicPoints = calcExtraPoints(15, 'yellow magic orchestra', 20, 'desktop');
  const yellowMagicPointsIos = calcExtraPoints(11, 'yellow magic orchestra', 20, 'ios');
  const andYouWillKnowUsPoints = calcExtraPoints(13, '...and you will know us by the trail of dead', 20, 'desktop');
  const andYouWillKnowUsPointsIos = calcExtraPoints(8, '...and you will know us by the trail of dead', 20, 'ios');

  expect(oBandPoints).toBe(10); // 29
  expect(oBandPointsIos).toBe(13); // 30

  expect(zBandPoints).toBe(11); // 30
  expect(zBandPointsIos).toBe(13); // 30

  expect(onlyOnesPoints).toBe(16); // 32
  expect(onlyOnesPointsIos).toBe(18); // 31

  expect(yellowMagicPoints).toBe(27); // 42
  expect(yellowMagicPointsIos).toBe(29); // 40

  expect(andYouWillKnowUsPoints).toBe(44); // 57
  expect(andYouWillKnowUsPointsIos).toBe(50); // 58
});

it('should return correct points with difficulty 15', () => {
  const oBandPoints = calcExtraPoints(14, 'the orb', 15, 'desktop');
  const oBandPointsIos = calcExtraPoints(12, 'the orb', 15, 'ios');
  const zBandPoints = calcExtraPoints(14, 'zz top', 15, 'desktop');
  const zBandPointsIos = calcExtraPoints(12, 'zz top', 15, 'ios');
  const onlyOnesPoints = calcExtraPoints(11, 'the only ones', 15, 'desktop');
  const onlyOnesPointsIos = calcExtraPoints(8, 'the only ones', 15, 'ios');
  const yellowMagicPoints = calcExtraPoints(10, 'yellow magic orchestra', 15, 'desktop');
  const yellowMagicPointsIos = calcExtraPoints(6, 'yellow magic orchestra', 15, 'ios');
  const andYouWillKnowUsPoints = calcExtraPoints(8, '...and you will know us by the trail of dead', 15, 'desktop');
  const andYouWillKnowUsPointsIos = calcExtraPoints(3, '...and you will know us by the trail of dead', 15, 'ios');
  
  expect(oBandPoints).toBe(19); // 33
  expect(oBandPointsIos).toBe(21); // 34

  expect(zBandPoints).toBe(21); // 35
  expect(zBandPointsIos).toBe(22); // 34

  expect(onlyOnesPoints).toBe(27); // 38
  expect(onlyOnesPointsIos).toBe(29); // 37

  expect(yellowMagicPoints).toBe(44); // 54
  expect(yellowMagicPointsIos).toBe(46) // 52

  expect(andYouWillKnowUsPoints).toBe(68); // 76
  expect(andYouWillKnowUsPointsIos).toBe(72); // 78
});

it('should return correct points with difficulty 10', () => {
  const oBandPoints = calcExtraPoints(9, 'the orb', 10, 'desktop');
  const oBandPointsIos = calcExtraPoints(7, 'the orb', 10, 'ios');
  const zBandPoints = calcExtraPoints(9, 'zz top', 10, 'desktop');
  const zBandPointsIos = calcExtraPoints(7, 'zz top', 10, 'ios');
  const onlyOnesPoints = calcExtraPoints(6, 'the only ones', 10, 'desktop');
  const onlyOnesPointsIos = calcExtraPoints(3, 'the only ones', 10, 'ios');
  const yellowMagicPoints = calcExtraPoints(5, 'yellow magic orchestra', 10, 'desktop');
  const yellowMagicPointsIos = calcExtraPoints(1, 'yellow magic orchestra', 10, 'ios');
  const andYouWillKnowUsPoints = calcExtraPoints(4, '...and you will know us by the trail of dead', 10, 'desktop');
  const andYouWillKnowUsPointsIos = calcExtraPoints(1, '...and you will know us by the trail of dead', 10, 'ios');

  expect(oBandPoints).toBe(31); // 40
  expect(oBandPointsIos).toBe(32); // 39

  expect(zBandPoints).toBe(33); // 42
  expect(zBandPointsIos).toBe(37); // 44

  expect(onlyOnesPoints).toBe(39); // 45
  expect(onlyOnesPointsIos).toBe(42); // 45

  expect(yellowMagicPoints).toBe(60); // 65
  expect(yellowMagicPointsIos).toBe(66) // 67

  expect(andYouWillKnowUsPoints).toBe(93); // 97
  expect(andYouWillKnowUsPointsIos).toBe(96); // 97
});

it('should return correct points with difficulty 5', () => {
  const anthraxPoints = calcExtraPoints(4, 'anthrax', 5, 'desktop');
  const anthraxPointsIos = calcExtraPoints(2, 'anthrax', 5, 'ios');
  const oBandPoints = calcExtraPoints(4, 'the orb', 5, 'desktop');
  const oBandPointsIos = calcExtraPoints(2, 'the orb', 5, 'ios');
  const zBandPoints = calcExtraPoints(4, 'zz top', 5, 'desktop');
  const zBandPointsIos = calcExtraPoints(2, 'zz top', 5, 'ios');

  expect(anthraxPoints).toBe(42); // 46
  expect(anthraxPointsIos).toBe(43); // 45

  expect(oBandPoints).toBe(48); // 52
  expect(oBandPointsIos).toBe(51); // 53

  expect(zBandPoints).toBe(51); // 55
  expect(zBandPointsIos).toBe(53); // 55


});
