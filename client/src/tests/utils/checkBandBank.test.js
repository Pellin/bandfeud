import checkBandBank from '../../utils/checkBandBank';

let bandBank;
let used;

beforeEach(() => {
  bandBank = [
    { name: 'one', url: 'www.one.com' },
    { name: 'two', url: 'www.two.com' },
    { name: 'three', url: 'www.three.com' },
    { name: 'four', url: 'www.four.com' }
  ];
  used = ['four', 'five', 'six', 'seven'];
});

it('should return one matching band if it matches previous and is not in used', () => {
  const previous = 't';
  const response = checkBandBank(bandBank, previous, used);

  expect(typeof response).toBe('object');
  expect(typeof response.name).toBe('string');
  expect(response.name[0]).toBe(previous);
});

it('should not return a band if it matches previous but is in used', () => {
  const previous = 'f';
  const response = checkBandBank(bandBank, previous, used);

  expect(response).toBeFalsy();
});

it('should not return a band if it is not in used but does not match previous', () => {
  const previous = 'l';
  const response = checkBandBank(bandBank, previous, used);

  expect(response).toBeFalsy();
});
