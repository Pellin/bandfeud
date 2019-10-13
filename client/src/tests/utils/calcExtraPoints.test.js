import calcExtraPoints from '../../utils/calcExtraPoints';

it('should return correct points with difficulty 20 and TimeLeft 17', () => {
  const oBandPoints = calcExtraPoints(17, 'obie', 20);
  const zBandPoints = calcExtraPoints(17, 'zion', 20);
  const longBandPoints = calcExtraPoints(17, 'stone temple pilots', 20);
  const yngwiePoints = calcExtraPoints(17, 'yngwie malmsteen', 20);

  expect(oBandPoints).toBe(7);
  expect(zBandPoints).toBe(9);
  expect(longBandPoints).toBe(19);
  expect(yngwiePoints).toBe(21);
});

it('should return correct points with difficulty 15 and TimeLeft 12', () => {
  const oBandPoints = calcExtraPoints(12, 'obie', 15);
  const zBandPoints = calcExtraPoints(12, 'zion', 15);
  const longBandPoints = calcExtraPoints(12, 'stone temple pilots', 15);
  const yngwiePoints = calcExtraPoints(12, 'yngwie malmsteen', 15);

  expect(oBandPoints).toBe(14);
  expect(zBandPoints).toBe(17);
  expect(longBandPoints).toBe(32);
  expect(yngwiePoints).toBe(35);
});

it('should return correct points with difficulty 10 and TimeLeft 7', () => {
  const oBandPoints = calcExtraPoints(7, 'obie', 10);
  const zBandPoints = calcExtraPoints(7, 'zion', 10);
  const longBandPoints = calcExtraPoints(7, 'stone temple pilots', 10);
  const yngwiePoints = calcExtraPoints(7, 'yngwie malmsteen', 10);

  expect(oBandPoints).toBe(22);
  expect(zBandPoints).toBe(26);
  expect(longBandPoints).toBe(46);
  expect(yngwiePoints).toBe(50);
});

it('should return correct points with difficulty 5 and TimeLeft 2', () => {
  const oBandPoints = calcExtraPoints(2, 'obie', 5);
  const zBandPoints = calcExtraPoints(2, 'zion', 5);
  const longBandPoints = calcExtraPoints(2, 'stone temple pilots', 5);
  const yngwiePoints = calcExtraPoints(2, 'yngwie malmsteen', 5);
  
  expect(oBandPoints).toBe(30);
  expect(zBandPoints).toBe(36);
  expect(longBandPoints).toBe(66);
  expect(yngwiePoints).toBe(72);
});
