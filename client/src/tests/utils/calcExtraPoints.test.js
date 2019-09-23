import calcExtraPoints from '../../utils/calcExtraPoints';

it('should return correct points with difficulty 20', () => {
  const oBandPoints = calcExtraPoints('obie', 20);
  const zBandPoints = calcExtraPoints('zion', 20);

  expect(oBandPoints).toBe(5);
  expect(zBandPoints).toBe(7)
});

it('should return correct points with difficulty 15', () => {
  const oBandPoints = calcExtraPoints('obie', 15);
  const zBandPoints = calcExtraPoints('zion', 15);

  expect(oBandPoints).toBe(8);
  expect(zBandPoints).toBe(11)
});

it('should return correct points with difficulty 10', () => {
  const oBandPoints = calcExtraPoints('obie', 10);
  const zBandPoints = calcExtraPoints('zion', 10);

  expect(oBandPoints).toBe(10);
  expect(zBandPoints).toBe(14)
});

it('should return correct points with difficulty 5', () => {
  const oBandPoints = calcExtraPoints('obie', 5);
  const zBandPoints = calcExtraPoints('zion', 5);

  expect(oBandPoints).toBe(15);
  expect(zBandPoints).toBe(21)
});